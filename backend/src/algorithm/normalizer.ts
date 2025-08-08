// Mapping unicode ke ASCII untuk berbagai font Unicode
const unicodeMaps: [RegExp, number][] = [
    // 1. Fullwidth (！-～)
    [/[！-～]/g, 0xFF01 - 0x21],
    
    // 2. Mathematical Monospace (𝚄𝚗𝚒𝚌𝚘𝚍𝚎)
    [/\u{1D670}-\u{1D689}/gu, 0x1D670 - 0x41], // A-Z
    [/\u{1D68A}-\u{1D6A3}/gu, 0x1D68A - 0x61], // a-z
    [/\u{1D7F6}-\u{1D7FF}/gu, 0x1D7F6 - 0x30], // 0-9

    // 3. Mathematical Script (𝒰𝓃𝒾𝒸ℴ𝒹ℯ)
    [/\u{1D49C}-\u{1D4B5}/gu, 0x1D49C - 0x41], // Script A-Z
    [/\u{1D4B6}-\u{1D4CF}/gu, 0x1D4B6 - 0x61], // Script a-z

    // 4. Mathematical Double-Struck (𝕌𝕟𝕚𝕔𝕠𝕕𝕖)
    [/\u{1D538}-\u{1D551}/gu, 0x1D538 - 0x41], // Double-struck A-Z
    [/\u{1D552}-\u{1D56B}/gu, 0x1D552 - 0x61], // Double-struck a-z
    [/\u{1D7D8}-\u{1D7E1}/gu, 0x1D7D8 - 0x30], // Double-struck 0-9

    // 5. Mathematical Script Bold (𝓤𝓷𝓲𝓬𝓸𝓭𝓮)
    [/\u{1D4D0}-\u{1D4E9}/gu, 0x1D4D0 - 0x41], // Script Bold A-Z
    [/\u{1D4EA}-\u{1D503}/gu, 0x1D4EA - 0x61], // Script Bold a-z

    // 6. Mathematical Fraktur (𝔘𝔫𝔦𝔠𝔬𝔡𝔢)
    [/\u{1D504}-\u{1D51D}/gu, 0x1D504 - 0x41], // Fraktur A-Z
    [/\u{1D51E}-\u{1D537}/gu, 0x1D51E - 0x61], // Fraktur a-z

    // 7. Mathematical Fraktur Bold (𝖀𝖓𝖎𝖈𝖔𝖉𝖊)
    [/\u{1D56C}-\u{1D585}/gu, 0x1D56C - 0x41], // Fraktur Bold A-Z
    [/\u{1D586}-\u{1D59F}/gu, 0x1D586 - 0x61], // Fraktur Bold a-z

    // 8. Mathematical Sans-Serif
    [/\u{1D5A0}-\u{1D5B9}/gu, 0x1D5A0 - 0x41], // Sans-Serif A-Z
    [/\u{1D5BA}-\u{1D5D3}/gu, 0x1D5BA - 0x61], // Sans-Serif a-z

    // 9. Mathematical Sans-Serif Bold (𝗨𝗻𝗶𝗰𝗼𝗱𝗲)
    [/\u{1D5D4}-\u{1D5ED}/gu, 0x1D5D4 - 0x41],
    [/\u{1D5EE}-\u{1D607}/gu, 0x1D5EE - 0x61],

    // 10. Mathematical Sans-Serif Italic (𝖴𝗇𝗂𝖼𝗈𝖽𝖾)
    [/\u{1D608}-\u{1D621}/gu, 0x1D608 - 0x41], // Sans-Serif Italic A-Z
    [/\u{1D622}-\u{1D63B}/gu, 0x1D622 - 0x61], // Sans-Serif Italic a-z

    // 11. Mathematical Sans-Serif Bold Italic (𝙐𝙣𝙞𝙘𝙤𝙙𝙚)
    [/\u{1D63C}-\u{1D655}/gu, 0x1D63C - 0x41],
    [/\u{1D656}-\u{1D66F}/gu, 0x1D656 - 0x61],

    // 12. Mathematical Italic (𝒰𝓃𝒾𝒸ℴ𝒹ℯ)
    [/\u{1D434}-\u{1D44D}/gu, 0x1D434 - 0x41],
    [/\u{1D44E}-\u{1D467}/gu, 0x1D44E - 0x61],

    // 13. Mathematical Bold (𝐔𝐧𝐢𝐜𝐨𝐝𝐞)
    [/\u{1D400}-\u{1D419}/gu, 0x1D400 - 0x41], // Bold A-Z
    [/\u{1D41A}-\u{1D433}/gu, 0x1D41A - 0x61], // Bold a-z

    // 14. Mathematical Bold Italic (𝑼𝒏𝒊𝒄𝒐𝒅𝒆)
    [/\u{1D468}-\u{1D481}/gu, 0x1D468 - 0x41], // Bold Italic A-Z
    [/\u{1D482}-\u{1D49B}/gu, 0x1D482 - 0x61], // Bold Italic a-z
];

// Mapping khusus untuk Circled, Squared, dan karakter special
const specialMaps: Record<string, string> = {
    // Circled Letters
    'Ⓐ': 'A', 'Ⓑ': 'B', 'Ⓒ': 'C', 'Ⓓ': 'D', 'Ⓔ': 'E', 'Ⓕ': 'F', 'Ⓖ': 'G', 'Ⓗ': 'H', 'Ⓘ': 'I', 'Ⓙ': 'J', 'Ⓚ': 'K', 'Ⓛ': 'L', 'Ⓜ': 'M', 'Ⓝ': 'N', 'Ⓞ': 'O', 'Ⓟ': 'P', 'Ⓠ': 'Q', 'Ⓡ': 'R', 'Ⓢ': 'S', 'Ⓣ': 'T', 'Ⓤ': 'U', 'Ⓥ': 'V', 'Ⓦ': 'W', 'Ⓧ': 'X', 'Ⓨ': 'Y', 'Ⓩ': 'Z',
    'ⓐ': 'a', 'ⓑ': 'b', 'ⓒ': 'c', 'ⓓ': 'd', 'ⓔ': 'e', 'ⓕ': 'f', 'ⓖ': 'g', 'ⓗ': 'h', 'ⓘ': 'i', 'ⓙ': 'j', 'ⓚ': 'k', 'ⓛ': 'l', 'ⓜ': 'm', 'ⓝ': 'n', 'ⓞ': 'o', 'ⓟ': 'p', 'ⓠ': 'q', 'ⓡ': 'r', 'ⓢ': 's', 'ⓣ': 't', 'ⓤ': 'u', 'ⓥ': 'v', 'ⓦ': 'w', 'ⓧ': 'x', 'ⓨ': 'y', 'ⓩ': 'z',
    
    // Circled Numbers
    '①': '1', '②': '2', '③': '3', '④': '4', '⑤': '5', '⑥': '6', '⑦': '7', '⑧': '8', '⑨': '9', '⓪': '0',
    '⑴': '1', '⑵': '2', '⑶': '3', '⑷': '4', '⑸': '5', '⑹': '6', '⑺': '7', '⑻': '8', '⑼': '9', '⑽': '10',
    
    // Negative Squared
    '🅰': 'A', '🅱': 'B', '🅲': 'C', '🅳': 'D', '🅴': 'E', '🅵': 'F', '🅶': 'G', '🅷': 'H', '🅸': 'I', '🅹': 'J', '🅺': 'K', '🅻': 'L', '🅼': 'M', '🅽': 'N', '🅾': 'O', '🅿': 'P',
    '🆀': 'Q', '🆁': 'R', '🆂': 'S', '🆃': 'T', '🆄': 'U', '🆅': 'V', '🆆': 'W', '🆇': 'X', '🆈': 'Y', '🆉': 'Z',

    // White on Black Square
    '🅐': 'A', '🅑': 'B', '🅒': 'C', '🅓': 'D', '🅔': 'E', '🅕': 'F', '🅖': 'G', '🅗': 'H', '🅘': 'I', '🅙': 'J', '🅚': 'K', '🅛': 'L', '🅜': 'M', '🅝': 'N', '🅞': 'O', '🅟': 'P',
    '🅠': 'Q', '🅡': 'R', '🅢': 'S', '🅣': 'T', '🅤': 'U', '🅥': 'V', '🅦': 'W', '🅧': 'X', '🅨': 'Y', '🅩': 'Z',

    // Regional Indicator Symbols
    '🇦': 'A', '🇧': 'B', '🇨': 'C', '🇩': 'D', '🇪': 'E', '🇫': 'F', '🇬': 'G', '🇭': 'H', '🇮': 'I', '🇯': 'J', '🇰': 'K', '🇱': 'L', '🇲': 'M', '🇳': 'N', '🇴': 'O', '🇵': 'P',
    '🇶': 'Q', '🇷': 'R', '🇸': 'S', '🇹': 'T', '🇺': 'U', '🇻': 'V', '🇼': 'W', '🇽': 'X', '🇾': 'Y', '🇿': 'Z',

    // Small Capitals
    'ᴀ': 'A', 'ʙ': 'B', 'ᴄ': 'C', 'ᴅ': 'D', 'ᴇ': 'E', 'ꜰ': 'F', 'ɢ': 'G', 'ʜ': 'H', 'ɪ': 'I', 'ᴊ': 'J', 'ᴋ': 'K', 'ʟ': 'L', 'ᴍ': 'M', 'ɴ': 'N', 'ᴏ': 'O', 'ᴘ': 'P',
    'Q': 'Q', 'ʀ': 'R', 's': 'S', 'ᴛ': 'T', 'ᴜ': 'U', 'ᴠ': 'V', 'ᴡ': 'W', 'x': 'X', 'ʏ': 'Y', 'ᴢ': 'Z',

    // Stylistic Numbers/Symbols
    '➊': '1', '➋': '2', '➌': '3', '➍': '4', '➎': '5', '➏': '6', '➐': '7', '➑': '8', '➒': '9', '➓': '10',
    '⓿': '0', '➀': '1', '➁': '2', '➂': '3', '➃': '4', '➄': '5', '➅': '6', '➆': '7', '➇': '8', '➈': '9',

    // Greek-style numbers
    'α': 'a', 'β': 'b', 'γ': 'c', 'δ': 'd', 'ε': 'e', 'ζ': 'f', 'η': 'g', 'θ': 'h', 'ι': 'i', 'κ': 'k', 'λ': 'l', 'μ': 'm', 'ν': 'n', 'ξ': 'x', 'ο': 'o', 'π': 'p',
    'ρ': 'r', 'σ': 's', 'τ': 't', 'υ': 'u', 'φ': 'f', 'χ': 'x', 'ψ': 'p', 'ω': 'w',

    // Special Symbols
    '！': '!', '？': '?', '。': '.', '，': ',', '：': ':', '；': ';', '（': '(', '）': ')',
};

function normalizeUnicode(str: string): string {
    // Fullwidth Characters ke ASCII
    str = str.replace(/[\uFF01-\uFF5E]/g, ch => 
        String.fromCharCode(ch.charCodeAt(0) - 0xFEE0)
    );

    // Mathematical Alphanumeric Symbols
    for (const [regex, offset] of unicodeMaps) {
        str = str.replace(regex, ch => {
            const code = ch.codePointAt(0)! - offset;
            return String.fromCharCode(code);
        });
    }

    // Special Characters (Circled, Squared, Small Caps, dll)
    for (const [unicode, ascii] of Object.entries(specialMaps)) {
        str = str.replaceAll(unicode, ascii);
    }

    // Remove combining diacriticals (accents)
    str = str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

    return str.toLowerCase();
}

module.exports = { normalizeUnicode };