/**
 * Game Helper
 */
export class GameHelper {
    
    constructor () {
        const GRID_SIZE = 49;
        this.grid = [];
        for (let i=0; i < GRID_SIZE; i++) {
            this.grid[i] = 0;
        }
        this.subCount = 0;
    }

    // @summery: 潜水艦の配置セルを提案する
    // @param: int subSize -- 潜水艦の大きさ
    locateSubmarin(subSize) {
        let alphaCells = [];
        let alphaCoords = [];  // "a3"などのコードを保持する
        let success = false;   // 配置が適切かどうかを示す
        let attempts = 0;      // 試行回数のカウンタ
        let location = 0;      // 検討対象のセル
        let coords = [];       // 候補となる海域セル番号を保持する
                               // 潜水艦が保持
        let incr = 1;          // 配置を決めるときのセルの増加分
        let x = 0;             // 潜水艦の大きさ（カウンタ用）

        const GRID_SIZE = 49;
        const GRID_LENGTH = 7;
        const ALPHABET = "ABCDEFG";

        this.subcount++;

        let i = Math.floor(Math.random() * 30);
        if ((i % 2) === 1) {
            incr = GRID_LENGTH;
        } 

        // location には、0 ? 48 の数字がはいる。
        // coords は、潜水艦(セル３つ分)。候補となるlocation番号を保持する。
        while (success === false && attempts++ < 200) {
            // 0?48のどれかをランダムに選ぶ
            location = Math.floor(Math.random() * GRID_SIZE);
            success = true;
            x = 0;
            // 潜水艦の大きさが subSize -- 3 以下ならば
            while (success === true && x < subSize) {
                // その海域がまだ不使用ならば
                if (this.grid[location] === 0) {
                    coords[x] = location;  // この海域番号を保持する。
                    x++;
                    location += incr;      // 次の海域セル
                    // そのセルが全海域サイズよりも大きければ
                    if (location >= GRID_SIZE) {
                        success = false;
                    }
                    // そのセルが7で割り切れるということは、はみ出ているということ
                    if (x > 0 && location % GRID_LENGTH === 0) {
                                            success = false;
                    }
                } else {             // その海域は使用済み(1)
                    success = false;
                }
            }
        }

        x = 0;      // 潜水艦の大きさ（セルの数）
        let row = 0;
        let col = 0;
        while (x < subSize) {
            // coords[x]には、0 ? 48 の数字が格納されている。
            this.grid[coords[x]] = 1;  // そのセルを使用済みとする。
            row = Math.floor(coords[x] / GRID_LENGTH);   // 縦番号
            col = coords[x] % GRID_LENGTH;               // 横番号
            let alpha = ALPHABET.charAt(col);
            alphaCells[coords[x]] = alpha + (row + 1);
            alphaCoords[x] = alphaCells[coords[x]];
            x++;
        }
        return alphaCoords;
    }
}
