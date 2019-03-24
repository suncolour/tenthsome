//产生一个minNum到maxNum的随机整数
function random(minNum,maxNum)
{
    return Math.round(Math.random()*(maxNum-minNum)+minNum);
}

//产生一个minNum到maxNum的随机小数
function randomFloat(minNum,maxNum)
{
    return Math.random()*(maxNum-minNum)+minNum;
}

//产生一个随机透明度的随机颜色
function randomColor()
{
    return "rgba("+random(0,255)+","+random(0,255)+","+random(0,255)+","+Math.random()+")";
}