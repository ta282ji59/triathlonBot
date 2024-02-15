# 部活動メール送信・練習メニューサイト表示自動化業務自動化システム
ここは私が所属する部活動のメール送信と練習メニューのサイト表示を自動化したシステムです。
下記に簡単にシステムの概要を説明します。

## 自動システムの概要
<img width="1440" alt="スクリーンショット 2024-02-15 11 00 46" src="https://github.com/ta282ji59/triathlonBot/assets/86834007/a47edeb2-2ce2-438e-8ab9-bec188b891fc">
◯自動化したもの
<ul>
  <li>練習メニューのサイト表示</li>
  <li>練習メニュー関連のメール送信（翌日・翌週の練習メニューの連絡）</li>
</ul>
うちの部の練習メニューに関しては事前にスプレッドシートで管理していたのでそれを活用。
GASを使用してスプレッドシートを取得して翌日、翌週の練習メニューの連絡、JSONを作成→<a href="https://web-ext.u-aizu.ac.jp/circles/triathlon/practice.html">サイト</a>に１週間分の練習メニューにサイト表示、毎週初めにスクレイピングをすることで<a href="https://web-ext.u-aizu.ac.jp/circles/triathlon/practice/menu/archive.html#2024-archive">アーカイブサイト</a>に表示をする。



<hr>

### ※参考資料

<p>コードの詳細な変更とか実装後に発生した問題点とかは以下のリンクに記入している<br>またはコードの履歴から確認して欲しい（GitHubのコミット内容も参考に）</p>

https://docs.google.com/spreadsheets/d/1-Bjl55NMAkChNceSfFEp3AuP3GTDF8owdtANj0UMFu4/edit#gid=1127882951


<p>このシート作成者からの閲覧許可が必要</p>
