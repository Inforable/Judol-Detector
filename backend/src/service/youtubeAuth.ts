const { google } = require('googleapis');

// Inisialisasi OAuth2 client
const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
);

// Atur client untuk menggunakan token yang sudah ada
function getAuthUrl() {
    if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
        throw new Error('Google OAuth credentials not configured');
    }
    
    const scopes = [
        'https://www.googleapis.com/auth/youtube.force-ssl',
        'https://www.googleapis.com/auth/youtube'
    ];
    return oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: scopes,
        prompt: 'consent'
    });
}

async function getTokens(code: string) {
    const { tokens } = await oauth2Client.getToken(code);
    return tokens;
}

module.exports = { oauth2Client, getAuthUrl, getTokens };