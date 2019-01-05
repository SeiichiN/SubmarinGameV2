/**
 *
 */
const setOk = document.getElementById("set-ok");

/* let ody1 = "";
 * let ody2 = "";
 * let ody3 = "";
 * let pos1 = "";
 * let pos2 = "";
 * let pos3 = "";
 * let her1 = "";
 * let her2 = "";
 * let her3 = "";*/

setOk.onclick = (() => { 

    ody1 = document.getElementById("ody1").value.toUpperCase();
    ody2 = document.getElementById("ody2").value.toUpperCase();
    ody3 = document.getElementById("ody3").value.toUpperCase();
    pos1 = document.getElementById("pos1").value.toUpperCase();
    pos2 = document.getElementById("pos2").value.toUpperCase();
    pos3 = document.getElementById("pos3").value.toUpperCase();
    her1 = document.getElementById("her1").value.toUpperCase();
    her2 = document.getElementById("her2").value.toUpperCase();
    her3 = document.getElementById("her3").value.toUpperCase();

});

let ody1 = "d2";
let ody2 = "e2";
let ody3 = "f2";
let pos1 = "g4";
let pos2 = "g5";
let pos3 = "g6";
let her1 = "b7";
let her2 = "c7";
let her3 = "d7";


export const odyssey = [ody1, ody2, ody3];
export const poseidon = [pos1, pos2, pos3];
export const hermes = [her1, her2, her3];

console.log(odyssey);
console.log(poseidon);
console.log(hermes);
