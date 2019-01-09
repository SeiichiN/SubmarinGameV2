/**
 * Submarin
 *
 * @Method: set
 */
export class Submarin {
    constructor() {
        // 潜水艦の配置 -- ['B2', 'B3', 'B4']
        this.locationCells = [];
        // 潜水艦の大きさ -- 要素数
        this.length = 0;
        // 命中した数 -- 3で撃沈
        this.numOfHits = 0;   // 使っていない
        // 潜水艦の名前
        this.name = "none";
        // 反応
        this.result = "";
    }

    // @summery: 配置を決める
    // @param: locs -- ['B2', 'B3', 'B4'] などの配列
    setLocationCells(locs) {
        this.locationCells = locs;
        this.length = this.locationCells.length;
    }

    setName(name) {
        this.name = name;
    }

    getName() {
        return this.name;
    }

    // @ デバッグ用に潜水艦の位置を表示するメソッド
    getLocationCells() {
        return this.locationCells.reduce((a, x) => a += x, "");
    }

    // @summery: ユーザーからの攻撃に対する判定処理
    // @param:  String guess -- ユーザーからの攻撃。 2 とか、3とか。
    checkYourself(guess) {
        this.result = '失敗';

        let newCells = this.locationCells.map(x => {
            let s = "";
            if (x === guess) {
                this.result = '命中';
                this.numOfHits++;
            } else {
                s = x;
            }
            if (this.numOfHits === 3) {
                this.result = '撃沈';
            }
            return s;
        });
            
        this.locationCells = newCells;

        return this.result;
    }
}
