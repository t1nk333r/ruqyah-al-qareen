# رقية القرين

صارت رقية القرين تبويب «رقية» في تطبيق «أذكار المسلم»:
https://t1nk333r.github.io/athkar/#ruqyah

هذا التطبيق المستقل متوقف. صفحته https://t1nk333r.github.io/ruqyah-al-qareen/ تنقل التقدّم والسجلّ المحفوظين
في المتصفح إلى «أذكار المسلم»، ثم تفتح التبويب. روابط السور (`#qaf` و`#jinn` و`#takwir` و`#kafirun` و`#nas`)
تفتح السورة نفسها هناك.

## Retired

This standalone PWA is retired; رقية القرين is the «رقية» tab of the athkar PWA
([t1nk333r/athkar](https://github.com/t1nk333r/athkar)), whose `content/ruqyah.v1.json` is the source of the text.
Both apps are served from `t1nk333r.github.io`, so they share storage. `index.html` copies this app's IndexedDB records
(`ruqyah` → `state`: `daily`, `suwar`) to the localStorage keys the app mirrored them to (`ruqyah-daily-v1`,
`ruqyah-suwar-v1`); the athkar PWA reads them once, when it has no `athkar-ruqyah-v1` yet. `index.html` and `sw.js`
then remove this app's service worker and its `ruqyah-static-` caches. In a browser tab the page redirects straight
away; opened from a home-screen icon it first explains how to replace the icon. The manifest and icons stay so that
existing installs still open.
