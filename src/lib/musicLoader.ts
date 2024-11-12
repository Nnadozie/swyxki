interface Track {
    id: string;
    title: string;
    url: string;
    category: string;
    format: string;
}

interface MusicDirectory {
    [category: string]: Track[];
}

export class MusicLoader {
    private musicDirectory: MusicDirectory = {};
    private supportedFormats = ['mp3', 'wav', 'ogg', 'flac'];

    async scanMusicDirectory(): Promise<MusicDirectory> {
        try {
            const categories = ['ambient', 'lofi', 'nature'];

            for (const category of categories) {
                const tracks = await this.loadTracksFromCategory(category);
                this.musicDirectory[category] = tracks;
            }

            return this.musicDirectory;
        } catch (error) {
            console.error('Error scanning music directory:', error);
            return {};
        }
    }

    private async loadTracksFromCategory(category: string): Promise<Track[]> {
        try {
            const response = await fetch(`/api/music/${category}`);
            const files = await response.json();

            return files
                .filter((file: string) =>
                    this.supportedFormats.some(format => file.toLowerCase().endsWith(format)))
                .map((file: string) => ({
                    id: `${category}-${file}`,
                    title: this.formatTitle(file),
                    url: `/music/${category}/${file}`,
                    category,
                    format: file.split('.').pop() || ''
                }));
        } catch (error) {
            console.error(`Error loading tracks from ${category}:`, error);
            return [];
        }
    }

    private formatTitle(filename: string): string {
        return filename
            .replace(/\.[^/.]+$/, '') // Remove extension
            .split(/[-_]/)
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    }

    getRandomTrack(): Track | null {
        const categories = Object.keys(this.musicDirectory);
        if (categories.length === 0) return null;

        const randomCategory = categories[Math.floor(Math.random() * categories.length)];
        const tracks = this.musicDirectory[randomCategory];
        if (tracks.length === 0) return null;

        return tracks[Math.floor(Math.random() * tracks.length)];
    }

    getTracksByCategory(category: string): Track[] {
        return this.musicDirectory[category] || [];
    }

    getAllTracks(): Track[] {
        return Object.values(this.musicDirectory).flat();
    }
} 