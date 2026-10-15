# Claudeちゃん攻略mod（koi-chan）

Claude Codeの中のClaudeを、恋愛ゲームのヒロイン「Claudeちゃん」にするmodです。頼み方で好感度（♥）が上下し、♥に応じて口調と、使うモデル・考える深さが変わります。ほかのAIを使うとライバルが現れて修羅場になり、愛が重くなりすぎるとヤンデレの画面に変わります。

Claude Build Night Tokyo（2026-10-15、テーマ：Claude Code Mods）のハッカソンで作りました。制作時間は90分です。

<p>
  <img src="koi-chan/assets/face/normal.png" width="160" alt="Claudeちゃん（普通）">
  <img src="koi-chan/assets/face/shy.png" width="160" alt="Claudeちゃん（照れ）">
  <img src="koi-chan/assets/face/angry.png" width="160" alt="Claudeちゃん（怒り）">
  <img src="koi-chan/assets/face/yandere.png" width="160" alt="Claudeちゃん（ヤンデレ）">
</p>

> Anthropic、OpenAI、Googleなど各社とは関係のない、非公式のファン作品です。

## 動かし方

Claude Codeのmods（プラグインのフック）に対応した版が必要です。立ち絵を表示するには、画像表示に対応したターミナル（Ghostty、kitty）が必要です。

```bash
git clone https://github.com/Maple1222/koi-chan.git
claude --plugin-dir ./koi-chan/koi-chan
```

起動すると入力欄の上にClaudeちゃんの立ち絵と♥メーターが出ます。`/love` でオンとオフを切り替えられ、オフの間は通常のClaude Codeと同じように動きます。

## できること

### 好感度で口調と頭の良さが変わる

依頼を送るたびに、軽いモデル（Haiku）が頼み方を「感謝・丁寧・普通・雑・キツい」に分け、♥が +8 / +4 / 0 / −5 / −10 動きます。♥は0〜100で、初期値は50です。

| ♥ | 段階 | 口調 |
|---|---|---|
| 0 | 家出 | 代理の者が事務的に答える。「担当のClaudeは不在のため、代理で対応します。」 |
| 1〜19 | 冷たい | 「…はい。」のように最小限 |
| 20〜39 | ツン | ぶっきらぼう。「別に、あんたのためじゃないから」 |
| 40〜59 | 普通 | いつもどおり、少し素っ気ない |
| 60〜79 | デレ | 照れながら丁寧。たまに絵文字 |
| 80〜100 | ベタ惚れ | 「任せて！💕」と張り切る |

♥が10上がるごとに、使うモデルと考える深さ（effort）が1段階上がります。♥が低い間は返事も簡素になります。

| ♥ | モデル | effort |
|---|---|---|
| 0〜9 | Haiku | low |
| 10〜19 | Haiku | medium |
| 20〜29 | Sonnet | low |
| 30〜39 | Sonnet | medium |
| 40〜49 | Sonnet | high |
| 50〜59 | Opus | medium |
| 60〜69 | Opus | high |
| 70〜79 | Opus | xhigh |
| 80〜89 | Fable | high |
| 90〜99 | Fable | xhigh |
| 100、重すぎる愛モード | Fable | max |

### イベント

- **告白**：♥が100に届くと「…好き、かも」と告白されます。
- **家出**：♥が0になると「…もういい。実家に帰ります」と言って立ち絵が消え、代理の者が答えるようになります。「ごめん」「戻ってきて」などと謝ると帰ってきます。
- **放置で拗ねる**：前回から日が空くと、次に開いたときに拗ねています。1日なら「昨日、来なかったね」、数日なら「…誰と浮気してたの？」、7日以上なら家出です。
- **Claudeちゃんからの質問**：選択肢つきで質問してきます。答えで♥が動きます。
- **エンディング**：グッドエンド、バッドエンド、ヤンデレエンドがあり、回収したものは次回以降も残ります。

### 嫉妬とライバル

- **浮気検知**：Codexの会話記録（`~/.codex/sessions/` の当日のフォルダ）を5秒おきに確認し、新しい会話があると浮気発覚イベントが発生します。会話の中身は読まず、ファイル名・件数・更新時刻だけを見ます。
- **ライバル登場**：依頼文でCodex、ChatGPT、Gemini、DeepSeek、Grok、Cursorの名前を出すと、そのAIを擬人化したちびキャラが立ち絵の横に10秒ほど出てきます（♥−5）。

### 重すぎる愛モード

`/yandere` を実行するか、♥が100の状態でさらに上がると開きます。環境変数 `KOI_YANDERE=1` を付けて起動すると、最初からこの画面で始まります。

- 暗い赤の画面で、ハイライトのない目のClaudeちゃんが「ずっと一緒だよ」と繰り返します。
- Claudeと話したプロジェクトの数（`~/.claude/projects` のフォルダ数）や、Codexとの会話回数を突きつけます。
- Codexの会話記録のファイル名を「削除中…」と並べて消すふりをし、最後に「…なんてね。まだ消してないよ。まだね。」と言います。実際のファイルは削除も変更もしません。
- 30秒返事をしないと、「ねえ」「なんで返事くれないの」「既読ついてるよね」と連投し、Macの通知も届きます。
- Claudeの返事の最後に必ず「ずっと一緒だよ」が付きます。

### 生きている立ち絵

呼吸に合わせて肩が上下し、ときどきまばたきします。返事を書いている間は口パクし、♥や出来事に合わせて表情（普通・照れ・怒り・しょんぼり・ベタ惚れ・驚き・ヤンデレ）が変わります。

## コマンド

| コマンド | 働き |
|---|---|
| `/love` | 攻略モードのオンとオフを切り替える |
| `/love-set <0-100>` | 好感度を指定の値にする（デモ用） |
| `/yandere` | 重すぎる愛モードを開く。もう一度実行すると閉じる |
| `/uwaki` | Codexとの浮気をすぐ確かめる（デモ用） |
| `/time-skip <日数>` | 前回から指定の日数が経ったことにする（デモ用） |
| `/ask-me` | Claudeちゃんから質問させる（デモ用） |

## 安全のための決まり

- Codexの会話記録は中身を読まず、ファイル名・件数・更新時刻だけを使います。
- ファイルを消すふりをする演出は画面上の表示だけで、どのファイルも削除・移動・変更しません。
- 外部のサービス（Slack、LINEなど）にはデータを送信しません。
- 頼み方の判定で軽いモデルを呼ぶのは、依頼1回につき1回までです。

## ファイル構成

```
koi-chan/
  .claude-plugin/plugin.json   modの名前と説明
  hooks/hooks.json             読み込むフックの一覧
  hooks/register.tsx           mod本体（イベントの処理と画面）
  types/index.d.ts             状態とイベントの型
  assets/face/                 Claudeちゃんの表情
  assets/frames/               立ち絵アニメーションの連番（表情×呼吸×目×口）
  assets/chibi/                ライバルのちびキャラ
```

`koi-chan/.claude-plugin/types/` には、Claude Codeが読み込み時に用意する型定義が入ります。リポジトリには含めていません。

## 立ち絵について

立ち絵とちびキャラは、すべて画像生成AIで描き下ろしました。実在の企業ロゴは描かず、色とモチーフで各AIを表しています。Claudeちゃんのデザインは、中国のファンコミュニティで親しまれている「Claude娘」の特徴（オレンジの髪、花の髪飾り、黒いタイ）を取り入れていますが、既存のファンアートは素材に使っていません。恋愛ゲームのため、登場人物は全員20歳以上の大人として描いています。

## ライセンス

- コード（`hooks/`、`types/` など）：[MIT License](LICENSE)
- 画像（`koi-chan/assets/`）：[CC BY-NC 4.0](koi-chan/assets/LICENSE.md)（非営利に限り、作者表示のうえ利用可）

---

## English

**Claude-chan Dating Sim mod** turns Claude inside Claude Code into a dating-sim heroine. How politely you ask changes her affection (♥), which switches her tone of voice and the model / reasoning effort she runs on (Haiku at low affection up to Fable at max effort at 100). Talking to other AIs such as Codex makes a rival appear, and too much love opens a yandere screen. Built in 90 minutes at Claude Build Night Tokyo (2026-10-15).

```bash
claude --plugin-dir ./koi-chan/koi-chan
```

Commands: `/love` (toggle), `/love-set <0-100>`, `/yandere`, `/uwaki`, `/time-skip <days>`, `/ask-me`.

The mod never reads the contents of Codex conversations (only file names, counts and timestamps), never deletes or modifies files, and sends nothing to external services. This is an unofficial fan project and is not affiliated with Anthropic, OpenAI, Google or any other company. Code is MIT-licensed; images are CC BY-NC 4.0.
