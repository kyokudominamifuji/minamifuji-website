# Image assets

画像は用途別に整理します。

- `profile/` : 公式プロフィール、TOP、宣材写真
- `flyers/` : 公演チラシ
- `logos/` : ロゴ
- `og/` : SNSでシェアされたときの画像（1200×630）
- 今後、必要に応じて `stage/`（高座写真）を追加

## ファイル名ルール

- プロフィール: `minamifuji-用途.拡張子`
- チラシ: `YYYY-MM-DD-公演名.拡張子`
- 英数字・ハイフンを基本にし、日本語やIMG_****のまま保存しない

## 配信のしくみ

`assets/` フォルダの中身は Cloudflare がそのまま配信します（`wrangler.jsonc` の `assets` 設定）。
例: `assets/images/flyers/xxx.jpeg` → `https://kyokudominamifuji.com/images/flyers/xxx.jpeg`

サイトのHTMLやイベント情報（`src/events.json`）から画像を参照するときは、
`raw.githubusercontent.com` ではなく `/images/...` のパスを使ってください。

## 現在の整理済み画像

- `profile/minamifuji-main.webp` — 公式TOP・プロフィール用（サイトで使用、軽量版）
- `profile/minamifuji-main.png` / `.jpg` — 同じ写真の元データ・JPEG版
- `profile/minamifuji-senzai.jpg` — 宣材写真（赤い着物、プロフィール欄で使用）
- `logos/minamifuji-logo.webp` — ヘッダーのロゴ
- `og/minamifuji-og.jpg` — SNSシェア画像
- `flyers/2026-09-21-tenma-kodanseki.jpeg` — 天満講談席
- `flyers/2026-10-03-gannoji-kodankai.jpeg` — 願王寺講談会
- `flyers/2026-11-01-futari-kai-front.png` / `-back.png` — 11/1 特別公演
- `flyers/2026-11-21-fuji-to-ao-kodanseki.jpeg` — 第10回・第11回 富士と碧講談席

※ ルート直下の元画像（`9DE0…png` `IMG_0843.jpeg` など）は、サイトからは参照しなくなりました。
外部（SNS投稿など）から直接リンクしていなければ削除して構いません。
