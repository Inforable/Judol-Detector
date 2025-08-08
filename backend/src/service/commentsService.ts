const { google } = require('googleapis');
const { oauth2Client } = require('./youtubeAuth');
const { detectJudolComment } = require('../algorithm/detectAlgorithm');

async function insertComments(videoId: string, comments: string, accessToken: string) {
    oauth2Client.setCredentials({ access_token: accessToken });
    const youtube = google.youtube({ version: 'v3', auth: oauth2Client });

    const results = [];
    const commentList = comments.split(';').map(c => c.trim()).filter(Boolean);

    for (const comment of commentList) {
        try {
            const response = await youtube.commentThreads.insert({
                part: 'snippet',
                requestBody: {
                    snippet: {
                        videoId: videoId,
                        topLevelComment: {
                            snippet: {
                                textOriginal: comment,
                            },
                        },
                    },
                },
            });
            results.push({
                success: true,
                comment,
                id: response.data.id,
            });
        } catch (error) {
            results.push({
                success: false,
                comment,
                error: (error instanceof Error ? error.message : String(error))
            });
        }
    }
    return results;
}

async function deleteJudolComments(videoId: string, accessToken: string, algorithm: string, pattern?: string[]) {
    oauth2Client.setCredentials({ access_token: accessToken });
    const youtube = google.youtube({ version: 'v3', auth: oauth2Client });

    const deletedComments = [];
    let pageToken = '';

    do {
        try {
            const commentsResponse = await youtube.commentThreads.list({
                part: 'snippet',
                videoId: videoId,
                maxResults: 100,
                pageToken: pageToken || undefined,
            });

            if (!commentsResponse.data.items) {
                break;
            }

            for (const item of commentsResponse.data.items) {
                const comment = item.snippet.topLevelComment.snippet;
                const commentText = comment.textDisplay;

                // Check if comment contains judol using existing detection
                const result = detectJudolComment([commentText], algorithm, pattern);

                if (result.detectedCount > 0) {
                    console.log(`Deleting comment: ${commentText}`);
                    try {
                        await youtube.comments.delete({
                            id: item.snippet.topLevelComment.id,
                        });
                        deletedComments.push({
                            id: item.snippet.topLevelComment.id,
                            text: commentText,
                            success: true,
                        });
                    } catch (deleteError) {
                        deletedComments.push({
                            id: item.snippet.topLevelComment.id,
                            text: commentText,
                            success: false,
                            error: (deleteError instanceof Error ? deleteError.message : String(deleteError))
                        });
                    }
                }
            }

            pageToken = commentsResponse.data.nextPageToken;
        } catch (error) {
            console.error('Error fetching comments:', error);
            break;
        }
    } while (pageToken);

    return deletedComments;
}

module.exports = { insertComments, deleteJudolComments };