# AGENTS.md — 旭堂南不二 公式サイト

Codex と Claude が共通で読む引き継ぎメモ。作業の前に必ず読むこと。
サイト全体を読み直す前に、まずここに書いてあることを使う。

## 概要

- 本番: https://kyokudominamifuji.com/ （日本語 `/`、英語 `/en/`）
- Cloudflare Workers（`wrangler.jsonc`）。**`main` に入ると Workers Builds が自動でデプロイする**
- 画像などの静的ファイルは `assets/` から Cloudflare が直接配信する（`assets/images/x.jpeg` → `/images/x.jpeg`）

## 仕組み（重要）

入口は `src/seo-title-worker.js`。ゲーム・字幕ページはここで個別に返し、
それ以外は次の順にWorkerが重なってHTMLを書き換えていく（下が元のHTML）:

```
seo-title-worker → seo-worker → profile-photo-worker → site-worker → challenge-worker
→ final-polish-worker → repertoire-worker → copy-worker → kodan-copy-worker
→ type-worker → brand-worker → worker → index.js（元のHTML）
```

- 書き換えは文字列置換（`.replace`）なので、**元の文言を変えると上の層の置換が効かなくなる**ことがある。
  文言を直すときは `grep` で同じ文言が他のWorkerにないか確認する
- `homepage-upgrade.js` は seo-title-worker から呼ばれるトップページの最終仕上げ
- 未使用のファイル: `creative-title-worker.js` `finish-worker.js` `title-size-worker.js`（どこからも import されていない）
- 将来、この重ね構成は1本に整理したい（未着手。始める前にオーナーに確認）

## ページ一覧

| URL | 担当ファイル | 備考 |
|---|---|---|
| `/` `/en/` | Worker の重ね構成 | トップページ |
| `/events/2026-11-01` | brand-worker.js | 11/1 特別公演 |
| `/robots.txt` `/sitemap.xml` | seo-worker.js | |
| `/games/tono` | tono-game.js | 殿のお気持ち（大喜利）。**1.9MBあるので丸ごと読まない** |
| `/games/tono-paper` | tono-paper-game.js | 紙で回答版（試作） |
| `/games/arigato` | arigato-game.js | ありがとうシャワー |
| `/games/miyake` | miyake-game.js | 三宅組専用。**非公開のまま** |
| `/subtitles/iga` | iga-subtitles.js | 講談ライブ字幕スタジオ（本人用）。**非公開のまま** |
| `/subtitles/class` `/subtitles/m` | class-subtitles*.js | 授業ライブ字幕（PC版・スマホ版） |
| `/subtitles/api/translate` | subtitle-translate-api.js | Workers AI で翻訳。**利用回数に応じて費用がかかる** |

- **新しいページを追加したら、`src/seo-title-worker.js` の `KNOWN_PAGES` にも追加する**（追加しないと404になる）。
  ゲーム・字幕のように fetch() の先頭で個別に返すページは不要
- 存在しないURLは404ページ、`/index.html` は `/` へ301転送

## 公演情報

- `src/events.json` を編集する。worker.js が **GitHub の main から実行時に読み込む**（1分キャッシュ）ので、
  main にマージすれば反映される
- チラシ画像は `assets/images/flyers/YYYY-MM-DD-公演名.jpeg` に置き、`flyer_url` は `/images/flyers/...` と書く

## 画像

- 詳しいルールは `assets/images/README.md`
- `raw.githubusercontent.com` の画像URLは使わない。`/images/...` を使う
- 写真は WebP か JPEG に変換し、横幅2000px以下にしてから置く
- SNSシェア画像: `assets/images/og/minamifuji-og.jpg`（1200×630）

## 作業ルール

- **役割分担**: Codex = 実装担当。Claude = 企画・文章（日本語と英語）・プルリクエストの確認担当
- 1つの作業は1人だけが担当する。同じファイルを同時に触らない
- `main` に直接プッシュしない。ブランチ（`codex/...` または `claude/...`）を切ってプルリクエストを出す。
  オーナーがマージする
- 作業を始める前に `git pull` で最新の main を取り込む
- 変更したら、トップページ `/` `/en/` とゲーム・字幕ページが壊れていないか確認する
- 仕組みやルールが変わったら、このファイルも更新する

## 今後の予定（2026-11-08 時点）

1. `/games` ゲーム一覧ページ: 殿のお気持ち・紙で回答版・ありがとうシャワーを掲載。三宅組は載せない
2. `/tools` 字幕ツール紹介ページ: 授業ライブ字幕を公開（翻訳APIに1日の利用回数の上限をつけてから）。
   伊賀スタジオはツールを公開せず、「英語字幕講談の仕組み」を紹介する
3. 販売ページ: BOOTH へのリンク方式。候補は、殿のお気持ち印刷用お題カード（PDF）、学校向け教材パック、
   英語字幕付き講談動画、創作講談の音声。古典の台本は師匠・協会に確認するまで売らない
4. トップページの追加コンテンツ: メディア掲載（Yahoo!ニュース等。全文転載はしない）、動画、活動実績、
   英語字幕講談の専用セクション、出演依頼のプラン例・FAQ、お客様の声
