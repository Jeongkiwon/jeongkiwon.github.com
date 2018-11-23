
let time;
let score;
let down;
let tempScore;
let Top1;
let Top2;
let Top3;
let gameCount;

const Score= document.querySelector("#score");
const Time= document.querySelector("#time");
const Blck= document.querySelector(".black");
const gameOver= document.querySelector("#over");


var generateRandom = function (min, max) {
    var ranNum = Math.floor(Math.random()*(max-min+1)) + min;
    return ranNum;
  }

function showScore(){
    Score.innerText=`${score}`;
    Time.innerText=`${time}`;
}

function countTime(){
    if(time>0){time--;}
    else{
        gameOver.classList.remove("hidden");
    }
}

function countDown(){
    if(down>0){down=down-0.01;}
    else{
        gameOver.classList.remove("hidden");
        
    }
}

function clearBlack(){
    var allBlack= document.getElementsByClassName("black");
    var i;
    for(i=0;i<allBlack.length;i++){
        allBlack.item(i).classList.remove("black");
    }
}

function putBlack(){
    clearBlack();
    score++;
    if(score<5){
        down=5.00;
    }else if(score<10){
        down=3.00;
    }else if(score<15){
        down=1.00;
    }else{
        down=0.8;
    }
    const black=generateRandom(1,9);
    const Pad=document.querySelector("#pad"+black);
    Pad.classList.remove("white");
    Pad.classList.add("black");
    clickWhite();
    setInterval(showDown,10);

    var getScore=document.querySelector(".black");
    getScore.onclick=function(){
        getScore.classList.add("white");
        putBlack();
    }
}

function showDown(){
    const blackPad=document.querySelector(".black");
    blackPad.innerHTML=`${down.toFixed(2)}`;
}

function clickWhite(){
    var whitePad=document.getElementsByClassName("white");
    var i;
    for(i=0;i<whitePad.length;i++){
        whitePad.item(i).onclick=function(){
            down=0;
            time=0;
        }
    }
}

function Rank(){
    tempScore=score;
    if(gameCount===1){
        Top1=tempScore;
    }else if(gameCount===2){
        if(Top1<tempScore){
            Top2=Top1;
            Top1=tempScore;
        }else if(Top2<tempScore<Top1){
            Top2=tempScore;
        }
    }else if(gameCount>2){
        if(Top1<tempScore){
            Top3=Top2;
            Top2=Top1;
            Top1=tempScore;
        }else if(Top2<tempScore){
            Top3=Top2;
            Top2=tempScore;
        }else if(Top3<tempScore){
            Top3=tempScore;
        }
    }
}

function showRank(){
    const gameNum=document.querySelector("#gamecount");
    const top1Tag= document.querySelector("#top1");
    const top2Tag= document.querySelector("#top2");
    const top3Tag= document.querySelector("#top3");

    gameNum.innerHTML=`${gameCount}`;
    top1Tag.innerHTML=`${Top1}`;
    top2Tag.innerHTML=`${Top2}`;
    top3Tag.innerHTML=`${Top3}`;
}

function clickStart(){
    down=0;
    time=0;
    time=100;
    Rank();
    gameCount++;
    
    if(!gameOver.classList.contains("hidden")){
        gameOver.classList.add("hidden");
    }
    
    score=-1;
    clearBlack();
    putBlack();
    setInterval(showScore,1000);
}
function init(){
    Top1=0;
    Top2=0;
    Top3=0;
    gameCount=0;
    setInterval(countDown,10);
    setInterval(countTime,1000);
    setInterval(showRank,1000);
    const startBtn= document.querySelector("#start");
    startBtn.addEventListener("click", clickStart);
}
init();