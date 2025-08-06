function rkSearch(text: string, pattern: string): boolean {
    // lowercase-kan semua untuk handle case insensitivity
    const txt = text.toLowerCase();
    const pat = pattern.toLowerCase();

    const d = 256;
    const q = 101;
    const m = pat.length;
    const n = txt.length;

    let p = 0; // hash value for pattern
    let t = 0; // hash value for text
    let h = 1;

    // Hitung h = d^(m-1) % q
    for (let i = 0; i < m - 1; i++) {
        h = (h * d) % q;
    }

    // Hitung hash untuk pattern dan text pertama
    for (let i = 0; i < m; i++) {
        p = (d * p + pat.charCodeAt(i)) % q;
        t = (d * t + txt.charCodeAt(i)) % q;
    }

    // Proses RK dengan sliding window
    for (let i = 0; i <= n - m; i++) {
        // Validasi apakah hash cocok
        if (p === t) {
            let j;
            for (j = 0; j < m; j++) {
                if (txt[i + j] !== pat[j]) {
                    break;
                }
            }
            if (j === m) {
                return true;
            }
        }

        // Menghitung hash untuk teks berikutnya
        if (i < n - m) {
            t = (d * (t - txt.charCodeAt(i) * h) + txt.charCodeAt(i + m)) % q;
            if (t < 0) {
                t += q;
            }
        }
    }
    return false;
}

module.exports = { rkSearch };