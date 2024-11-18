import Parser from 'rss-parser';
import { json } from '@sveltejs/kit';

export async function GET() {
    try {
        const parser = new Parser();
        const response = await fetch('https://dozie.dev/rss.xml', {
            headers: {
                'Accept': 'application/rss+xml, application/xml, text/xml, */*',
                'User-Agent': 'Mozilla/5.0 (compatible; NnadozieBot/1.0)'
            }
        });

        if (!response.ok) {
            console.error(`RSS feed response not OK: ${response.status} ${response.statusText}`);
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const text = await response.text();
        if (!text) {
            console.error('RSS feed returned empty response');
            throw new Error('Empty RSS feed response');
        }

        console.log('RSS feed text received:', text.substring(0, 200) + '...'); // Log first 200 chars for debugging

        const feed = await parser.parseString(text);

        if (!feed || !feed.items) {
            console.error('Failed to parse RSS feed:', feed);
            throw new Error('Invalid RSS feed structure');
        }

        const posts = feed.items.map(item => ({
            title: item.title,
            link: item.link,
            date: item.pubDate || item.isoDate,
            content: item.content
        }));

        return json(posts, {
            headers: {
                'Cache-Control': 'public, max-age=3600',
                'Access-Control-Allow-Origin': '*'
            }
        });
    } catch (error) {
        console.error('Error fetching RSS feed:', error);
        console.error('Error stack:', error.stack);

        return new Response(
            JSON.stringify({
                error: error.message,
                stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
            }),
            {
                status: 500,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                }
            }
        );
    }
}