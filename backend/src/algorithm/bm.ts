function bmSearch(text: string, pattern: string): boolean {
    // lowercase-kan semua untuk handle case insensitivity
    const txt = text.toLowerCase();
    const pat = pattern.toLowerCase();

    // Bad character heuristic
    const badChar = new Array(256).fill(-1);
    for (let i = 0; i < pat.length; i++) {
        badChar[pat.charCodeAt(i)] = i;
    }

    let shift = 0; // shift untuk teks

    // Proses BM
    while (shift <= txt.length - pat.length) {
        let j = pat.length - 1;

        while (j >= 0 && pat[j] === txt[shift + j]) {
            j--;
        }
        if (j < 0) {
            return true;
        } else {
            const badCharShift = badChar[txt.charCodeAt(shift + j)];
            shift += Math.max(1, j - badCharShift);
        }
    }
    return false;
}

module.exports = { bmSearch };