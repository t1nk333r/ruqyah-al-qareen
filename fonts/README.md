# Fonts

Both fonts are published by the King Fahd Glorious Quran Printing Complex (KFGQPC) and are bundled unmodified. Their
end-user licence, embedded in each file (name record 13), grants free use, copying and distribution, and forbids
selling, modifying, translating or reverse engineering the font software.

| File | Font | Source | Used for |
|------|------|--------|----------|
| `kfgqpc-hafs-v30.ttf` | KFGQPC HAFS Uthmanic Script 3.0 | https://fonts.qurancomplex.gov.sa/hafs-reading/ | Basmala and ayat |
| `kfgqpc-uthman-taha-naskh.ttf` | KFGQPC Uthman Taha Naskh 2.0 | https://fonts.qurancomplex.gov.sa/ | Ayah markers ﴿ ﴾ |

Uthman Taha has no glyphs for several Uthmani marks the text uses; Safari sets such a letter in a fallback font and
breaks its join with the letter before. HAFS covers them but reads the King Fahd Complex's encoding, so
`kfgqpcEncoding` in `index.html` converts the text from `content.js` (generated from the athkar repository's
`content/ruqyah.v1.json`) at render time. The athkar repository's
`content/reference/kfgqpc-hafs.ruqyah.json` holds the Complex's text of every ayah, which the conversion matches.
