// Mapping unicode ke ASCII untuk 5 font wajib
const unicodeMaps: [RegExp, number][] = [
    // Fullwidth
    [/[！-～]/g, 0xFF01 - 0x21],
    // Monospace
    [/\u{1D670}-\u{1D689}/gu, 0x1D670 - 0x41],
    [/\u{1D68A}-\u{1D6A3}/gu, 0x1D68A - 0x61],
    [/\u{1D7F6}-\u{1D7FF}/gu, 0x1D7F6 - 0x30],
    // Mathematical Italic
    [/\u{1D434}-\u{1D44D}/gu, 0x1D434 - 0x41],
    [/\u{1D44E}-\u{1D467}/gu, 0x1D44E - 0x61],
    // Sans-Serif Bold
    [/\u{1D5D4}-\u{1D5ED}/gu, 0x1D5D4 - 0x41],
    [/\u{1D5EE}-\u{1D607}/gu, 0x1D5EE - 0x61],
    // Sans-Serif Bold Italic
    [/\u{1D63C}-\u{1D655}/gu, 0x1D63C - 0x41],
    [/\u{1D656}-\u{1D66F}/gu, 0x1D656 - 0x61],
];

function normalizeUnicode(str: string): string {
    str = str.replace(/[\uFF01-\uFF5E]/g, ch => String.fromCharCode(ch.charCodeAt(0) - 0xFEE0));

    for (const [regex, offset] of unicodeMaps) {
        str = str.replace(regex, ch => {
            const code = ch.codePointAt(0)! - offset;
            return String.fromCharCode(code);
        });
    }
    return str;
}

module.exports = { normalizeUnicode };