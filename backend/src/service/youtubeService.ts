const fetch = require("node-fetch");

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

async function getComment(videoId: string): Promise<string[]> {
    if (!YOUTUBE_API_KEY) {
        throw new Error("YouTube API key tidak ditemukan");
    }

    console.log(`Fetching comments for video ID: ${videoId}`);

    const comments: string[] = [];
    let nextPageToken = "";
    let count = 0;

    try {
        do {
            const url = `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${videoId}&key=${YOUTUBE_API_KEY}&maxResults=100${nextPageToken ? `&pageToken=${nextPageToken}` : ''}`;
            
            console.log(`Fetching comments for video: ${videoId}`);
            const response = await fetch(url);
            const data = await response.json();

            if (data.error) {
                console.error('YouTube API Error:', data.error);
                throw new Error(`YouTube API Error: ${data.error.message}`);
            }

            if (data.items && data.items.length > 0) {
                for (const item of data.items) {
                    const text = item.snippet.topLevelComment.snippet.textDisplay;
                    comments.push(text);
                    count++;
                    if (count >= 1000) break;
                }
            }
            
            nextPageToken = data.nextPageToken || "";
        } while (nextPageToken && count < 1000);

        console.log(`Total comments fetched: ${comments.length}`);
        return comments;
    } catch (error) {
        console.error('Error in getComment:', error);
        throw error;
    }
}

module.exports = { getComment };