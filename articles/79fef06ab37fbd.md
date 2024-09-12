---
title: "Node.js + AWS Lambda (Serverless Framework) でTwitterに定期ツイートする"
emoji: "🐦"
type: "tech" # tech: 技術記事 / idea: アイデア
topics: ["serverlessframewor", "twitter"]
published: false
---

# 何がしたかったか

1. 自動でタスクの定期実行が出来たらなんかおもしろそう
2. それ系の題材を考える
3. TwitterでBotを作るかぁ
4. 定期実行が出来るサービスを調べる
5. いろいろあったが定期実行が正確なタイミングで保証されていてジョブの実行時間にも余裕があったのでAWS Lambdaにした

# 作ったもの

https://github.com/waonpad/ttddtdd

コードに関する解説等が必要な程の規模でもないので気になったら自分で見てくれ

# ゴミを垂れ流しているBot

[てんどんまん ランダム (@t_t_d_d_t_d_d_) / X](https://x.com/t_t_d_d_t_d_d_)

**「てんてんどんどん てんどんどん」** という文字列の組み合わせが発生したら自分宛にメールが飛ぶようになっているがまだ来ていない

![](/images/t_t_d_d_t_d_d_tweets.png)

# 感想

## DynamoDBがダルい

今回ツイートの内容を全てDBに保存してみたかった(データを使う予定は一切無いが)のでDBをどうするかとなり、AWSの枠内で完結してServerless Frameworkで勝手にリソースが管理されるためとりあえずDyanmoDBにした  
これがよくなくて、DynamoDBの仕様が謎すぎたのとNode.jsのSDKがかなり使いにくかった  
テーブルの型が無いので自分で頑張らないといけなくて、今回作ったレベルの小規模なもの以外では使いたくないなと思った  
ただLambdaでDrizzleやPrismaを使うのがちょっとめんどくさそうで、うげぇとなってしまった  
その場合はRDSなりをあれこれする必要が出てきて違うめんどくささがあるしな・・・ʅ（◞‿◟）ʃ  

## 定期実行楽しい

自分が操作していなくてもTwitterに1500ツイート以上勝手に投稿されていて面白いな(無邪気)  
実行自体もしっかりズレなく行われていてそこは満足

## Serverless Framework便利

クソめんどくさいAWSを自分で触らず、勝手に全部やってくれるので最高  
プラグインも充実していてよき

## Twitter API もっと使わせてくれ

無料だと月1500回のツイートと、削除の操作しかできなくて面白くない！  
どうにかしろイーロン！

# 余談

`TendonRhythmString` 型を正確な型にしようとしたらユニオンのパターンが多すぎてダメだった

```typescript
export const letters = [
  "あ", "い", "う", "え", "お",
  "か", "き", "く", "け", "こ",
  "さ", "し", "す", "せ", "そ",
  "た", "ち", "つ", "て", "と",
  "な", "に", "ぬ", "ね", "の",
  "は", "ひ", "ふ", "へ", "ほ",
  "ま", "み", "む", "め", "も",
  "や",       "ゆ",      "よ",
  "ら", "り", "る", "れ", "ろ",
  "わ",
  "が", "ぎ", "ぐ", "げ", "ご",
  "ざ", "じ", "ず", "ぜ", "ぞ",
  "だ", "ぢ", "づ", "で", "ど",
  "ば", "び", "ぶ", "べ", "ぼ",
  "ぱ", "ぴ", "ぷ", "ぺ", "ぽ"
] as const satisfies string[]

// 妥協
export type TendonRhythmString = `${string}ん${string}ん${string}ん${string}ん ${string}ん${string}ん${string}ん`;

type S = (typeof letters)[number];

// 正確にはこれだが、ユニオンのパターンが多すぎてTypeScriptが死ぬ
export type TS2590ErrorTendonRhythmString =
  `${S}ん${S}ん${S}ん${S}ん ${S}ん${S}ん${S}ん`;
```
