function regexDetection(text: string): boolean {
    // Pattern: satu kata diikuti 2-3 angka
    const pattern = /\b\w+\d{2,3}\b/gi;
    return pattern.test(text);
}

module.exports = { regexDetection };