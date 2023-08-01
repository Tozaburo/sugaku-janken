var object = null;
var hand1 = "";
var hand2 = "";
var index1 = 0;
var index2 = 0;

function test() {
    var endpoint = "https://script.google.com/macros/s/AKfycbz996tRE9AcbydWNCFJZJUfj3EJ2bv-R9feIh4UXTTeYPxICTW44u5HIj9zTNQ7cas65w/exec";

    fetch(endpoint)
        .then(response => response.json())
        .then(data => {
            object = data;
            console.log(object)
        });
}

window.addEventListener("DOMContentLoaded", function () {
    test();
});

let wait = setInterval(() => {
    if (object != null) {
        document.querySelector(".loading").style.transition = 'opacity 1s';
        document.querySelector(".loading").style.opacity = '0%';

        document.querySelector(".loading").addEventListener('transitionend', function handler() {
            document.querySelector(".loading").removeEventListener('transitionend', handler);
            document.querySelector(".loading").style.display = "none";
        });
        clearInterval(wait);
        main();
    }
    if (Math.round(Date.now() / 500) % 4 == 0) {
        document.querySelector("#loadingtitle").innerHTML = "データを取得中です...";
    } else if (Math.round(Date.now() / 500) % 4 == 1) {
        document.querySelector("#loadingtitle").innerHTML = "データを取得中です";
    } else if (Math.round(Date.now() / 500) % 4 == 2) {
        document.querySelector("#loadingtitle").innerHTML = "データを取得中です.";
    } else if (Math.round(Date.now() / 500) % 4 == 3) {
        document.querySelector("#loadingtitle").innerHTML = "データを取得中です..";
    }
}, 100);

function main() {
    object.splice(26, object.length - 25)
}

function check(){
    hand1 = document.querySelector("#hand1").value;
    hand2 = document.querySelector("#hand2").value;
    index1 = object[0].indexOf(hand1);
    for (var n = 0; n < 25; n++){
        if (object[n][0] == hand2){
            index2 = n;
            break;
        }
    }
    document.querySelector("#winner").innerHTML = "勝ち：" + object[index1][index2];
}
