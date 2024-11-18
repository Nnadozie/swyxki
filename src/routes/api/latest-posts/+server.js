import Parser from 'rss-parser';
import { json } from '@sveltejs/kit';

export async function GET() {
    try {
        const parser = new Parser();
        const feed = await parser.parseURL('https://dozie.dev/rss.xml'); // Replace with your RSS feed URL

        const posts = feed.items.map(item => ({
            title: item.title,
            link: item.link,
            date: item.pubDate || item.isoDate,
            content: item.content
        }));

        return json(posts, {
            headers: {
                'Cache-Control': 'public, max-age=3600' // Cache for 1 hour
            }
        });
    } catch (error) {
        console.error('Error fetching RSS feed:', error);
        return new Response('Error fetching RSS feed', { status: 500 });
    }
}