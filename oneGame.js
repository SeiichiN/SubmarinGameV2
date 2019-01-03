;(function() {
    /**
     * DotCom
     */
    function DotCom() {
        this.locationCells = [];
        this.length = 0;
        this.numOfHits = 0;
    }

    DotCom.prototype =  {

        /**
         * Set locationCells
         *
         * @param: Array locs -- ['2', '3', '4']
         */
        setLocationCells: function(locs) {
            this.locationCells = locs;
            this.length = this.locationCells.length;
        },

        /**
         * Check User's attack
         *
         * @param: String guess -- ex.'2' also '3'
         */
        checkYourself: function(guess) {
            var result = "Fail",  // 'Hit', 'Sink'
                newCells = [];
            
            result = 'Fail';

            if (this.locationCells.length === 0) {
                result = 'dotCom has already Sinked.';
            } else {
                
                newCells = this.locationCells.filter(function(x) {
                    return x !== guess
                });

                if (newCells.length < this.locationCells.length) {
                    result = "Hit!";
                    this.numOfHits++;
                }

                if (newCells.length === 0) {
                    result = "Sink!";
                }

                this.locationCells = newCells;
            }

            return result;
            //        console.log(result);
            //        console.log(this.locationCells);
        }
    };

    function Robo() {
        this.area = [];
        this.setArea();
    }

    Robo.prototype = {

        setArea: function() {
            var i = 0;

            for (; i < areaMax; i++) {
                this.area[i] = (i+1).toString();
            }
        },

        attack: function(){
            console.log(this.area);
            var length = this.area.length;
            var index = Math.floor(Math.random() * length);  // 0 〜 length
            var target = this.area[index];
            console.log(target);
            var newArea = this.area.filter(x => x !== target);
            var result = dotCom.checkYourself(target);
            this.area = newArea;
            return result;
        }

    };

    var areaMax = 7;
    var dotCom = new DotCom;
    dotCom.setLocationCells(['2', '3', '4']);
    // console.log(dotCom.locationCells);

    var robo = new Robo();

    do {
        var result = robo.attack();
        console.log(result);
    } while(result === 'Fail' || result === 'Hit!');


})();
