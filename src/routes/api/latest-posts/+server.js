import Parser from 'rss-parser';
import { json } from '@sveltejs/kit';

export async function GET({ fetch }) {
    try {
        const parser = new Parser();
        const rssUrl = import.meta.env.DEV
            ? 'https://dozie.dev/rss.xml'  // In dev, use local endpoint
            : '/api/rss.xml';  // In prod, use redirected endpoint

        const response = await fetch(rssUrl);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const text = await response.text();
        const feed = await parser.parseString(text);

        const posts = feed.items.map(item => ({
            title: item.title,
            link: item.link,
            date: item.pubDate || item.isoDate,
            content: item.content
        }));

        return json(posts, {
            headers: {
                'Cache-Control': 'public, max-age=3600'
            }
        });
    } catch (error) {
        console.error('Error fetching RSS feed:', error);
        return new Response(
            JSON.stringify({ error: error.message }),
            {
                status: 500,
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
    }
}