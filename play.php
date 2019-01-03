<!doctype html>
<html lang="ja">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width,initial-scale=1">
        <title>潜水艦ゲーム</title>
        <link rel="stylesheet" href="submarin.css">
        <script src="submarinGame.js"></script>
    </head>
    <body>
        <div id="wrap">
			<aside class="des">
                <header class="clearfix">
                    <img id="close-des" src="close.gif" alt="close">
                    <h1>あそびかた</h1>
                </header>
				<p>この海域には、敵潜水艦が3隻潜んでいます。<br>
				潜水艦は、1隻で3つのセルを占有しています。<br>
				あなたに課せられた任務は、敵潜水艦を全隻撃沈することです。<br>
				49個の各セルをマウス（指）でクリックすることで、敵潜水艦を攻撃できます。
				もし、20回以下の攻撃で任務を完了することができれば、優秀といえます。<br>
				さあ、頑張ってください。</p>
			</aside>
            <header>
                <h1>潜水艦ゲーム</h1>
            </header>
            <article>
                <button id="howto-btn">あそびかた</button>
                <table>
                    <tr>
                        <th></th>
                        <th>A</th>
                        <th>B</th>
                        <th>C</th>
                        <th>D</th>
                        <th>E</th>
                        <th>F</th>
                        <th>G</th>
                    </tr>
                    <?php for ($i = 1; $i <= 7; $i++) { ?>
                        <tr>
                            <th><?php echo $i; ?></th>
                            <?php for ($j = 1; $j <= 7; $j++) {  ?>
                                <?php $idx = mb_substr("ABCDEFG", ($j-1), 1) . (String)$i; ?>
                                <td class="select" id="<?php echo $idx; ?>"
                                onclick="selection('<?php echo $idx; ?>')"></td>
                            <?php } ?>
                        </tr>
                    <?php } ?>

                </table>
                <section class="score">
                    <p id="kekka"></p>
                    <div id="mes1"></div>
                    <div id="mes2"></div>
                    <button id="replay">REPLAY</button>
                </section>
                <section class="teki">
                    <p id = "teki-kekka"></p>
                    <div id="teki-mes1"></div>
                    <div id="teki-mes2"></div>
                </section>
            </article>
            <footer>
                <small>&copy; 2018 Seiichi Nukayama</small>
            </footer>
        </div>
    </body>
</html>


