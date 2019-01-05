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
                <section class="set-players-ship">
                    <p>
                        あなたの3隻の潜水艦を配置してください。<br>
                        1隻の潜水艦につき3つのセルが必要です。<br>
                        3つのセルは、縦でも横でもかまいません。
                    </p>
                    <form id="players-set">
                        <div class="clearfix">
                            <div class="ship-name">Odyssey:</div>
                            <div class="ship-cell">
                                <label for="ody1">1:</label><input type="text" id="ody1">
                                <label for="ody2">2:</label><input type="text" id="ody2">
                                <label for="ody3">3:</label><input type="text" id="ody3">
                            </div>
                        </div>
                        <div class="clearfix">
                            <div class="ship-name">Poseidon:</div>
                            <div class="ship-cell">
                                <label for="pos1">1:</label><input type="text" id="pos1">
                                <label for="pos2">2:</label><input type="text" id="pos2">
                                <label for="pos3">3:</label><input type="text" id="pos3">
                            </div>
                        </div>
                        <div class="clearfix">
                            <div class="ship-name">Hermes:</div>
                            <div class="ship-cell">
                                <label for="her1">1:</label><input type="text" id="her1">
                                <label for="her2">2:</label><input type="text" id="her2">
                                <label for="her3">3:</label><input type="text" id="her3">
                            </div>
                        </div>
                    </form>
                    <button id="set-ok">決定</button>
                </section>
                <section id="players-ship">
                    <div>Oddysey &nbsp;&nbsp;      : <span id="ship1"></span></div>
                    <div>Poseidon &nbsp;           : <span id="ship2"></span></div>
                    <div>Hermes &nbsp;&nbsp;&nbsp; : <span id="ship3"></span></div>
                </section>
            </article>
            <footer>
                <small>&copy; 2018 Seiichi Nukayama</small>
            </footer>
        </div>
    </body>
</html>

                        <!-- <p>Odyssey:<br>
                             <label for="ody1">cell-1:</label><input type="text" id="ody1">
                             <label for="ody2">cell-2:</label><input type="text" id="ody2">
                             <label for="ody3">cell-3:</label><input type="text" id="ody3">
                             </p>
                             <p>Poseidon:<br>
                             <label for="pos1">cell-1:</label><input type="text" id="pos1">
                             <label for="pos2">cell-2:</label><input type="text" id="pos2">
                             <label for="pos3">cell-3:</label><input type="text" id="pos3">
                             </p>
                             <p>Hermes:<br>
                             <label for="her1">cell-1:</label><input type="text" id="her1">
                             <label for="her2">cell-2:</label><input type="text" id="her2">
                             <label for="her3">cell-3:</label><input type="text" id="her3">
                             </p> -->

