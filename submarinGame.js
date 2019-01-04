/**
 * Submarin -- 潜水艦ゲーム
 * @summery:
 *   7つのマス目に、3個の大きさで潜水艦を配置する。
 *   マス目の番号は、1, 2, 3, 4, 5, 6, 7 とする。
 *   そのうちの3つに潜水艦を配置する（連続）。
 *   それが潜水艦の大きさとなる。
 *   （例）[2, 3, 4]
 *   ユーザーは、何番目のマス目に潜水艦があるかを当てる。
 *   3つ当たれば「撃沈」となる。 * 
 */
class Submarin {
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

class GameHelper {
    
    constructor () {
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

        this.subcount++;

        let i = Math.floor(Math.random() * 30);
        if ((i % 2) === 1) {
            incr = GRID_LENGTH;
        } 

        // location には、0 〜 48 の数字がはいる。
        // coords は、潜水艦(セル３つ分)。候補となるlocation番号を保持する。
        while (success === false && attempts++ < 200) {
            // 0〜48のどれかをランダムに選ぶ
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
            // coords[x]には、0 〜 48 の数字が格納されている。
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

/**
 * @summery: 'B4'などのセル指定の結果を得る
 * @param: String guess -- セルの指定。例：'b4'
 * @return: result -- Map(3) { SeaTiger =>  "失敗", Papiyon => "命中", Mermaid => "撃沈"}
 */
function checkYourGuess(guess) {
    numOfGuess++;

    guess = guess.toUpperCase();

    let result = new Map();

    for (const s of submarinList) {
        result.set(s.getName(), s.checkYourself(guess));
    }

    // console.log(result);

    // result = submarinList.map(ship => ({ nam: ship.getName(), out: ship.checkYourself(guess) }));


    // numOfHitsが3であるもの（=3回命中したもの）がみつかったら、
    if (submarinList.find(s => s.numOfHits === 3)) {
        // numOfHitsが3でないもので配列を作り直す。
        submarinList = submarinList.filter(s => s.numOfHits !== 3);
        // 潜水艦の数を1つ減らす。
        numOfSubmarin--;
    }
    
    return result;
}

function checkUsedCell(cell) {

    if (usedCells.find(x => x === cell)) {
        // console.log('used!');
        return true;
    } else {
        // console.log('not used');
        usedCells.push(cell);
        return false;
    }
}


/**
 * @summery: セルを指定したあとの処理。
 *           画面に「命中」とかの表示をする。
 * @param: ユーザの入力したセル（文字列 ex.'B3'）
 */
function selection(cell) {

    if (numOfSubmarin === 0) return false;
    if (checkUsedCell(cell)) return false;

    // res -- Map(3) { SeaTiger → "失敗", Papiyon → "命中", Mermaid → "失敗" }
    const res = checkYourGuess(cell);
    roboResult = roboPlay();
    console.log(roboResult);

    // デバッグ用
    // console.log(submarinList.map(x => x.getLocationCells()));
    // console.log(res);
    
    // ドキュメントに表示する
	const ele = document.getElementById(cell);
    const message1 = document.getElementById('mes1');
    const message2 = document.getElementById('mes2');
    const hantei = document.getElementById('kekka');
    const replay = document.getElementById('replay');

    // 敵の攻撃
    const tekiMes1 = document.getElementById('teki-mes1');
    const tekiMes2 = document.getElementById('teki-mes2');
    const tekiKekka = document.getElementById('teki-kekka');

    replay.onclick = (() => {
        // location.reload();
        message1.textContent = "";
        message2.textContent = "";
        hantei.textContent = "";
        tekiMes1.textContent = "";
        tekiMes2.textContent = "";
        tekiKekka.textContent = "";
        replay.setAttribute("style", "display: none");
        init();
        roboInit();
    });

    let hit = false;
    for (const [k, v] of res) {
        switch(v) {
            case "命中":
 		        ele.textContent = "@";
                hantei.textContent = "命中";
                hit = true;
                break;
            case "撃沈":
 		        ele.textContent = "@";
                hantei.textContent = k + "を撃沈";
                hit = true;
                break;
            default:
                ele.textContent = "x";
                hantei.textContent = "失敗";
                break;
        }
        if (hit) break;
    }
                
    if (numOfSubmarin === 0) {
        message1.textContent = "おめでとう。全て撃沈しました。";
        message2.textContent = "あなたの攻撃回数は、" + numOfGuess + "回です。";
        replay.setAttribute("style", "display: block");
        return false;
    }


    // 敵の攻撃
    let tekiHit = false;
    for (const [n, s] of roboResult) {
        switch(s) {
            case "命中":
                tekiKekka.textContent = "敵の攻撃が命中。";
                tekiHit = true;
                break;
            case "撃沈":
                tekiKekka.textContent = n + "が敵に撃沈された。";
                tekiHit = true;
                break;
            default:
                tekiKekka.textContent = "敵の攻撃が失敗。";
                break;
        }
        if (tekiHit) break;
    }

    if (myNumOfSubmarin === 0) {
        tekiMes1.textContent = "敵の攻撃により、我が艦隊は全滅しました。";
        tekiMes2.textContent = "敵の攻撃回数は、" + roboNumOfGuess + "回です。";
        replay.setAttribute("style", "display: block");
        return false;
    }
                
}

/**
 * ここでonclickの設定をしてもうまくいかなかった。
 * しかたないので、htmlの中にonclickを入れた。
 * だから、この関数は使っていない。
 */
function play() {

    const alpha = "ABCDEFG";
    let al = "";

    for (let i = 0; i < 7; i++) {
        al = alpha.substr(i, 1);
        for (let j = 1; j <= 7; j++) {
            cell = al + j.toString();
            // console.log(cell);
            document.getElementById(cell).onclick = selection; // (cell);
        }
    }
}

/**
 * HTMLの<table>の<td>の'#A1'〜'#G7'までのセルに'.'を入れる
 */
function initCells() {
    const alpha = "ABCDEFG";
    let al = "";

    for (let i = 0; i < 7; i++) {
        al = alpha.substr(i, 1);
        for (let j = 1; j <= 7; j++) {
            cell = al + j.toString();
            // console.log(cell);
            document.getElementById(cell).textContent = '.';
        }
    }
    
}

function init() {
    usedCells.length = 0;
    let loc = [];
    numOfGuess = 0;    // 攻撃回数をゼロにセット
    submarinList.length = 0;    // 潜水艦リストを空にする
    numOfSubmarin = 3;

    initCells();
    
    const numOfCells = 3;             // 潜水艦の大きさ
    const submarin1 = new Submarin();
    const submarin2 = new Submarin();
    const submarin3 = new Submarin();

    const game = new GameHelper();

    loc = game.locateSubmarin(numOfCells);
    submarin1.setLocationCells(loc);
    submarin1.setName('SeaTiger');
    // console.log(submarin1.getName() + ":" + submarin1.getLocationCells());

    loc = game.locateSubmarin(numOfCells);
    submarin2.setLocationCells(loc);
    submarin2.setName('Papiyon');
    // console.log(submarin2.getName() + ":" + submarin2.getLocationCells());

    loc = game.locateSubmarin(numOfCells);
    submarin3.setLocationCells(loc);
    submarin3.setName('Mermaid');
    // console.log(submarin3.getName() + ":" + submarin3.getLocationCells());

    submarinList.push(submarin1);
    submarinList.push(submarin2);
    submarinList.push(submarin3);


}

function roboInit() {
    roboNumOfGuess = 0;    // 攻撃回数をゼロにセット
    mySubmarinList.length = 0;    // 潜水艦リストを空にする
    myNumOfSubmarin = 3;
    roboResult = null;
    mySubmarinList = [];
    robo = new Robo();

    const numOfCells = 3;
    const mySubmarin1 = new Submarin();
    const mySubmarin2 = new Submarin();
    const mySubmarin3 = new Submarin();

    const loc1 = ["C4", "C5", "C6"];
    mySubmarin1.setLocationCells(loc1);
    mySubmarin1.setName('Odyssey');

    const loc2 = ["E2", "F2", "G2"];
    mySubmarin2.setLocationCells(loc2);
    mySubmarin2.setName('Poseidon');

    const loc3 = ["A3", "A4", "A5"];
    mySubmarin3.setLocationCells(loc3);
    mySubmarin3.setName('Hermes');

    mySubmarinList.push(mySubmarin1);
    mySubmarinList.push(mySubmarin2);
    mySubmarinList.push(mySubmarin3);

}

function checkRoboGuess(guess) {
    roboNumOfGuess++;

    guess = guess.toUpperCase();

    let result = new Map();

    for (const s of mySubmarinList) {
        result.set(s.getName(), s.checkYourself(guess));
    }

    // console.log(result);

    // result = submarinList.map(ship => ({ nam: ship.getName(), out: ship.checkYourself(guess) }));


    // numOfHitsが3であるもの（=3回命中したもの）がみつかったら、
    if (mySubmarinList.find(s => s.numOfHits === 3)) {
        // numOfHitsが3でないもので配列を作り直す。
        mySubmarinList = mySubmarinList.filter(s => s.numOfHits !== 3);
        // 潜水艦の数を1つ減らす。
        myNumOfSubmarin--;
    }
    
    return result;
}

class Robo {

    constructor() {
        this.area = [];
        this.orgArea = [];
        this.setArea();
        this.newTarget = "";
        this.lockOnNum = 0;
        this.lockOnMode = false;
        this.orgTarget = "";
        this.secTarget = "";
        this.lockOnName = "";
    }

    setArea () {
        let al = "";
        let s = 0;

        for (let i = 0; i < 7; i++) {
            al = ALPHABET.substr(i, 1);
            for (let j = 1; j <= 7; j++) {
                this.orgArea[s] = al + j.toString();
                s++;
            }
        }

        this.area = this.orgArea;
    }

    attack () {
        let target = ""
        if (this.lockOnMode) {
            target = this.newTarget;
        } else {
            const length = this.area.length;                    // length = 49
            let index = Math.floor(Math.random() * length);   // 0 〜 48
            target = this.area[index];
        }
        console.log(target);
        let newArea = this.area.filter(x => x !== target);
        let result = checkRoboGuess(target);
        this.area = newArea;
        if (this.area.length < 40) {
            this.area = this.considerArea();
        }

        for (let [name, status] of result.entries()) {
            // console.log(`${name}: ${status}`);
            if (status === '命中' && this.lockOnName === "" && !this.lockOnMode) {
                this.lockOnNum++;
                this.lockOnMode = true;
                this.lockOnName = name;
                this.orgTarget = target;
            }

            else if (status === '命中' && name !== this.lockOnName) {
                console.log('別の船や');
            }

            else if (status === '撃沈') {
                this.lockOnNum = 0;
                this.lockOnMode = false;
                this.lockOnName = "";
            }

            else if (name === this.lockOnName && this.lockOnNum === 1) {
                if (status === '失敗') {
                    target = this.orgTarget;
                } else if (status === '命中') {
                    this.lockOnNum++
                    this.secTarget = target;
                }
            }
        }

        if (this.lockOnMode) {
            this.newTarget = this.thinkTarget(name, target);
//            console.log(this.newTarget);
        }
           
        console.log('this.area:' + this.area);
        return result;
    }

    thinkTarget(name, target) {
        let newTarget = "";
        switch (this.lockOnNum) {
            case 1:
                if (newTarget = this.getNextTarget(this.leftCell(target))) {
                    console.log('L' + this.lockOnNum +': ' + newTarget);
                    return newTarget;
                } 
                if (newTarget = this.getNextTarget(this.upperCell(target))) {
                    console.log('U' + this.lockOnNum +': ' + newTarget);
                    return newTarget;
                } 
                if (newTarget = this.getNextTarget(this.rightCell(target))) {
                    console.log('R' + this.lockOnNum +': ' + newTarget);
                    return newTarget;
                } 
                if (newTarget = this.getNextTarget(this.lowerCell(target))) {
                    console.log('D' + this.lockOnNum +': ' + newTarget);
                    return newTarget;
                }
                break;
            case 2:
                // console.log('1:' + this.orgTarget + ' 2:' + this.secTarget);
                let firstIndex = this.orgArea.indexOf(this.orgTarget);
                let secondIndex = this.orgArea.indexOf(this.secTarget);
                // console.log('1:' + firstIndex + ' 2:' + secondIndex);
                if (firstIndex - secondIndex === 1) {
                    if (newTarget = this.getNextTarget(this.upperCell(this.secTarget))) {
                        console.log('U' + this.lockOnNum +': ' + newTarget);
                        return newTarget;
                    }
                    if (newTarget = this.getNextTarget(this.lowerCell(this.orgTarget))) {
                        console.log('D' + this.lockOnNum +': ' + newTarget);
                        return newTarget;
                    }
                }
                else if (firstIndex - secondIndex === -1) {
                    if (newTarget = this.getNextTarget(this.upperCell(this.orgTarget))) {
                        console.log('U' + this.lockOnNum +': ' + newTarget);
                        return newTarget;
                    }
                    if (newTarget = this.getNextTarget(this.lowerCell(this.secTarget))) {
                        console.log('D' + this.lockOnNum +': ' + newTarget);
                        return newTarget;
                    }
                }
                else if (firstIndex - secondIndex === 7) {
                    if (newTarget = this.getNextTarget(this.leftCell(this.secTarget))) {
                        console.log('L' + this.lockOnNum +': ' + newTarget);
                        return newTarget;
                    }
                    if (newTarget = this.getNextTarget(this.rightCell(this.orgTarget))) {
                        console.log('L' + this.lockOnNum +': ' + newTarget);
                        return newTarget;
                    }
                }
                else if (firstIndex - secondIndex === -7) {
                    if (newTarget = this.getNextTarget(this.leftCell(this.orgTarget))) {
                        console.log('L' + this.lockOnNum +': ' + newTarget);
                        return newTarget;
                    }
                    if (newTarget = this.getNextTarget(this.rightCell(this.secTarget))) {
                        console.log('L' + this.lockOnNum +': ' + newTarget);
                        return newTarget;
                    }
                }
                break;
        }  
    }

    // this.area の中に target があるかどうか
    existTarget(target) {
        return this.area.find(x => x === target);
    }

    /**
     * Get Next Target -- 次の攻撃目標（セル）を得る
     *
     * 次の攻撃セルが this.area の中に存在していることが必要
     */
    getNextTarget(newTarget) {
        if (newTarget && this.existTarget(newTarget)) {
            return newTarget;
        } else {
            return false;
        }
    }

    leftCell(target) {
        const indexTarget = this.orgArea.indexOf(target);
        const newIndex = indexTarget - 7;
        if (newIndex >= 0) {
            return this.orgArea[newIndex];
        }
        return false;
    }

    rightCell(target) {
        const indexTarget = this.orgArea.indexOf(target);
        const newIndex = indexTarget + 7;
        if (newIndex < 49) {
            return this.orgArea[newIndex];
        }
        return false;
    }

    upperCell(target) {
        const indexTarget = this.orgArea.indexOf(target);
        const newIndex = indexTarget - 1;
        if (newIndex >= 0) {
            return this.orgArea[newIndex];
        }
        return false;
    }
        
    lowerCell(target) {
        const indexTarget = this.orgArea.indexOf(target);
        const newIndex = indexTarget + 1;
        if (newIndex < 49) {
            return this.orgArea[newIndex];
        }
        return false;
    }

    considerArea() {
        const area =
            this.area.filter(x => 
					(this.hasX(x) || this.hasL(x) ||
					 this.hasR(x) || this.hasY(x) ||
					 this.hasU(x) || this.hasD(x) )
			);
		console.log('consider:<' + area.length + "> " + area);
        return area;
    }

    hasX(ele) {
        const p = this.orgArea.indexOf(ele);
		if (p-7 < 0 || p+7 > 48) return false;
		//console.log(ele);
        //console.log(p + 'x' + this.orgArea[p-7]);
        //console.log(p + 'x' + this.orgArea[p+7]);
        //console.log(p + 'x' + this.area.indexOf(this.orgArea[p-7]));
        //console.log(p + 'x' + this.area.indexOf(this.orgArea[p+7]));
        if (this.area.indexOf(this.orgArea.indexOf(p-7)) &&
            this.area.indexOf(this.orgArea.indexOf(p+7))) {
            return true;
        } else {
            return false;
        }
    }
    hasL(ele) {
        const p = this.orgArea.indexOf(ele);
		if (p-7 < 0) return false;
		//console.log(ele);
        //console.log(p + 'L' + this.orgArea[p-7]);
        //console.log(p + 'L' + this.orgArea[p-14]);
        //console.log(p + 'L' + this.area.indexOf(this.orgArea[p-7]));
        //console.log(p + 'L' + this.area.indexOf(this.orgArea[p-14]));
        if (this.area.indexOf(this.orgArea[p-7]) &&
            this.area.indexOf(this.orgArea[p-14])) {
            return true;
        } else {
            return false;
        }
    }
    hasR(ele) {
        const p = this.orgArea.indexOf(ele);
		if (p+7 > 48) return false;
		//console.log(ele);
        //console.log(p + 'R' + this.orgArea[p+7]);
        //console.log(p + 'R' + this.orgArea[p+14]);
        //console.log(p + 'R' + this.area.indexOf(this.orgArea[p+7]));
        //console.log(p + 'R' + this.area.indexOf(this.orgArea[p+14]));
        if (this.area.indexOf(this.orgArea[p+7]) &&
            this.area.indexOf(this.orgArea[p+14])) {
            return true;
        } else {
            return false;
        }
    }
    hasY(ele) {
        const p = this.orgArea.indexOf(ele);
		if (p-1 < 0 || p+1 > 48) return false;
		//console.log(ele);
        //console.log(p + 'Y' + this.orgArea[p-1]);
        //console.log(p + 'Y' + this.orgArea[p+1]);
        //console.log(p + 'Y' + this.area.indexOf(this.orgArea[p-1]));
        //console.log(p + 'Y' + this.area.indexOf(this.orgArea[p+1]));
        if (this.area.indexOf(this.orgArea[p-1]) &&
            this.area.indexOf(this.orgArea[p+1])) {
            return true;
        } else {
            return false;
        }
    }
    hasU(ele) {
        const p = this.orgArea.indexOf(ele);
		if (p-1 < 0) return false;
		//console.log(ele);
        //console.log(p + 'U' + this.area.indexOf(this.orgArea[p-1]));
        //console.log(p + 'U' + this.area.indexOf(this.orgArea[p-2]));
        if (this.area.indexOf(this.orgArea[p-1]) &&
            this.area.indexOf(this.orgArea[p-2])) {
            return true;
        } else {
            return false;
        }
    }
    hasD(ele) {
        const p = this.orgArea.indexOf(ele);
		if (p+1 > 48) return false;
		//console.log(ele);
        //console.log(p + 'D' + this.area.indexOf(this.orgArea[p+1]));
        //console.log(p + 'D' + this.area.indexOf(this.orgArea[p+2]));
        if (this.area.indexOf(this.orgArea[p+1]) &&
            this.area.indexOf(this.orgArea[p+2])) {
            return true;
        } else {
            return false;
        }
    }

    
            
}

function roboPlay() {
    let result = robo.attack();
    return result;
}

function howto() {
    const openHowto = document.getElementById('howto-btn');
    const desBox = document.getElementsByClassName('des')[0];
    const closeDes = document.getElementById('close-des');
    
    openHowto.onclick = (() => {
        desBox.setAttribute("style", "display: block");
        openHowto.setAttribute("style", "display: none");
    });

    closeDes.onclick = (() => {
        desBox.setAttribute("style", "display: none");
        openHowto.setAttribute("style", "display: block");
    });
}


// 広域変数
const ALPHABET = "ABCDEFG";
const GRID_LENGTH = 7;
const GRID_SIZE = 49;
let cell = "";
let usedCells = [];       // そのセルが未使用かどうか

let numOfGuess = 0;       // 攻撃回数
let numOfSubmarin = 3;    // 潜水艦の数

/**
 * データのオブジェクト
 * submarinList
 * [{ locationCells: ['D2', 'E2', 'F2'] ,
 *    name:          'SeaTiger',
 *    numOfHits:     0,
 *    result:        '失敗''},
 *  { locationCells: ['C5', 'D5', 'E5'] ,
 *    name:          'Papiyon',
 *    numOfHits:     0,
 *    result:        '失敗''},
 *  { locationCells: ['C7', 'D7', 'E7'] ,
 *    name:          'MerMaid',
 *    numOfHits:     0,
 *    result:        '失敗''}]
 */
let submarinList = [];    // 潜水艦オブジェクトの配列

// プレーヤー側の潜水艦
let mySubmarinList = [];  // プレーヤーの潜水艦のリスト
let roboNumOfGuess = 0;   // 敵からの攻撃回数
let myNumOfSubmarin = 3;  // プレーヤーの潜水艦の数
let roboResult = {};      // 敵の攻撃結果（プレーヤーの状況）
let robo = {}; //  = new Robo();  // 敵ロボット作成

window.onload = (() => {
    init();               // プレーヤー側の攻撃準備
    roboInit();           // 敵（ロボ）の攻撃準備
    howto();
    // play(); //  <== onclickをスクリプト内に入れるにはどうすればいいか？
});


