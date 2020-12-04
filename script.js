var s = 1;
var m = 1;
var h = 10;
var pomo;

window.addEventListener("load",function(){
    pomo = document.getElementById("pomo");
    pomo.innerHTML = convert(h);

    timer = setInterval(function(){
        h -= 1;
        pomo.innerHTML = convert(h);
        if(h = 0) clearInterval(timer);
    },1000);
},false);


function convert(n){
    return `0${n/60 ^ 0}`.slice(-2)+':'+`0${n % 60}`.slice(-2);
}