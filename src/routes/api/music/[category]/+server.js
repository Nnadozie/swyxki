import { error } from '@sveltejs/kit';
import fs from 'fs';
import path from 'path';
import { promisify } from 'util';

const readdir = promisify(fs.readdir);

export async function GET({ params }) {
    try {
        const category = params.category;
        const musicDir = path.join(process.cwd(), 'static', 'music', category);

        const files = await readdir(musicDir);

        return new Response(JSON.stringify(files), {
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'public, max-age=3600'
            }
        });
    } catch (err) {
        throw error(404, 'Music category not found');
    }
} 