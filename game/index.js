
let score=0;
var generateRandom = function (min, max) {
    var ranNum = Math.floor(Math.random()*(max-min+1)) + min;
    return ranNum;
  }
var result = generateRandom(1, 9);
document.getElementById('div'+result).classList.add('black');
let i;
let time;

document.getElementById('start').onclick=function(){
    start();
}
document.getElementById('restart').onclick=function(){
    document.getElementById('over').classList.add('hidden');
    document.getElementById('start').classList.remove('hidden');
    document.getElementById('restart').classList.add('hidden');
    start();
}


function start(){
    
    i=0;
    time=10;
    document.getElementById("result").innerHTML=i;
    document.getElementById("time").innerHTML=time;
    setTimeout(timer, 1000);
}
function timer(){
    time--;
    error();
    tap();
    if(time<0){
        document.getElementById('over').classList.remove('hidden');
        document.getElementById('start').classList.add('hidden');
        document.getElementById('restart').classList.remove('hidden');
    }
    else{
        document.getElementById("time").innerHTML=time;
        setTimeout(timer, 1000);
    }
    
}
function error(){
    var whites=document.getElementsByClassName('white');
    var i;
    for(i=0;i<whites.length;i++){
        whites.item(i).onclick=function(){
            time=0;
            document.getElementById("result").innerHTML=i;
            document.getElementById("time").innerHTML=time;
            document.getElementById('over').classList.remove('hidden');
            document.getElementById('start').classList.add('hidden');
            document.getElementById('restart').classList.remove('hidden');
        }
    }
}
function tap(){
    document.getElementsByClassName('black').item(0).onclick=function(){
        console.log(this);
        this.classList.remove('black');
        var result = generateRandom(1, 9);
        document.getElementById('div'+result).classList.add('black');
        i++;
        delete this;
        document.getElementById("result").innerHTML=i;
        error();
        tap();
    }
}
