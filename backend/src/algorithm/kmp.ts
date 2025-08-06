function kmpSearch(text: string, pattern: string): boolean {
    // Membuat array LPS (Longest Prefix Suffix)
    const computeLPS = (pattern: string): number[] => {
        const lps = new Array(pattern.length).fill(0);
        let len = 0; // panjang dari prefix yang cocok
        let i = 1; // indeks untuk pattern

        while (i < pattern.length) {
            if (pattern[i] === pattern[len]) {
                len++;
                lps[i] = len;
                i++;
            } else if (len !== 0) {
                len = lps[len - 1]; // mengurangi panjang prefix
            } else {
                lps[i] = 0;
                i++;
            }
        }
        return lps;
    };

    // lowercase-kan semua untuk handle case insensitivity
    const lps = computeLPS(pattern.toLowerCase());
    const txt = text.toLowerCase();
    const pat = pattern.toLowerCase();

    let i = 0; // indeks untuk txt
    let j = 0; // indeks untuk pat

    // proses KMP
    while (i < txt.length) {
        if (pat[j] === txt[i]) {
            i++;
            j++;
        }
        if (j === pat.length) {
            return true;
        } else if (i < txt.length && pat[j] !== txt[i]) {
            if (j !== 0) {
                j = lps[j - 1] ?? 0;
            } else {
                i++;
            }
        }
    }
    return false;
}

module.exports = { kmpSearch };