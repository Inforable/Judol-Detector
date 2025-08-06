const { regexDetection } = require("./regex");
const { kmpSearch } = require("./kmp");
const { bmSearch } = require("./bm");
const { rkSearch } = require("./rk");

function detectJudolComment(comments: string[], algorithm: string, pattern?: string[]): any {
    const detectedComments: any[] = [];
    // Loop setiap komentar
    for (const comment of comments) {
        let isDetected = false;
        // Pilih algoritma
        switch (algorithm) {
            case 'regex':
                isDetected = regexDetection(comment);
                break;
            case 'kmp':
                if (pattern) isDetected = pattern.some(p => kmpSearch(comment, p));
                break;
            case 'bm':
                if (pattern) isDetected = pattern.some(p => bmSearch(comment, p));
                break;
            case 'rk':
                if (pattern) isDetected = pattern.some(p => rkSearch(comment, p));
                break;
        }
        // Jika terdeteksi, masukkan ke array hasil
        if (isDetected) detectedComments.push({ text: comment, algorithm });
    }
    // Return summary hasil deteksi
    return {
        totalComments: comments.length,
        detectedCount: detectedComments.length,
        detectedComments,
        percentage: comments.length > 0 ? ((detectedComments.length / comments.length) * 100).toFixed(2) : 0,
    };
}

module.exports = { detectJudolComment };