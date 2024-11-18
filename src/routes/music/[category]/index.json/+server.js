import { json } from '@sveltejs/kit';
import fs from 'fs';
import path from 'path';
import { promisify } from 'util';

const readdir = promisify(fs.readdir);

export async function GET({ params }) {
    try {
        const category = params.category;
        const musicDir = path.join(process.cwd(), 'static', 'music', category);

        const files = await readdir(musicDir);

        return json(files, {
            headers: {
                'Cache-Control': 'public, max-age=3600' // Cache for 1 hour
            }
        });
    } catch (error) {
        return new Response('Category not found', { status: 404 });
    }
} 