var nthTabs;
var displayRegion;
var module;
var searchInput;
var searchButton;
var totalModule;
var counter;
var searchImg;
var tabLocation;
var tabCloseCurrent;
var tabCloseOther;
var link;
//初始状态处于未排序状态
var currentSort="none";

$(function () {
    //一个低门槛的演示,更多需求看源码
    //基于bootstrap tab的自定义多标签的jquery实用插件，滚动条依赖jquery.scrollbar，图标依赖font-awesome

    displayRegion=document.querySelector("#display-region");
    module=displayRegion.children;
    searchInput=document.querySelector("#search input");
    searchButton=document.querySelector("#search button");
    searchImg=document.querySelector("#search img");
    link=document.querySelectorAll("#display-region .module .article-group .article .content-box .title a");

    let email=localStorage.getItem("email");
    if(!email)
    {
        alert("您尚未登陆！");
        window.location="/food/login.html";
    }
    //更改点击文章之后的链接值
    for(let i=0;i<link.length;i++)
    {
        link[i].href=link[i].href+"?email="+email;
    }
    setSort();
    // tabLocation=document.querySelector(".tab-location");
    // tabCloseCurrent=document.querySelector(".tab-close-current");
    // tabCloseOther=document.querySelector(".tab-close-other");

    //创建一个分类模块
    nthTabs = $("#editor-tabs").nthTabs();
    let total="";
    for(let i =0;i<module.length;i++)
    {
        total+=module[i].children[1].innerHTML;
    }
    nthTabs.addTab({
        id:"a0",
        title:"全部",
        content:total,
        allowClose:false,
        active:true
    });
    totalModule=document.querySelector("#a0");
    // nthTabs.style.height=height.toString()+"px";

    let i = 0;
    for(;i<module.length;i++)
    {
        nthTabs.addTab({
            id:"a"+(i+1).toString(),
            title:module[i].children[0].textContent,
            content:module[i].children[1].innerHTML,
            allowClose:false
        });
    }
    counter=i+1;
    nthTabs.setActTab("#a0");

    searchButton.onclick=searchSomething;
    searchImg.onclick=function()
    {
        searchInput.focus();
    }
});

//返回搜索结果
function searchSomething()
{
    let value=searchInput.value;
    if(value=="")
        return;
    
    //搜索结果
    let final = "";
    for(let i = 0;i<totalModule.children.length;i++)
    {
        if(isIn(value,totalModule.children[i]))
        {
            // let article=document.createElement("div");
            // article.className="article";
            
            final+='<div class="article">'+totalModule.children[i].innerHTML+'</div>';
        }
    }
    if(final==="")
    {
        final='<div class="search-fail">糟了，找不到您搜索的内容...</div>';
    }
    final+='<div class="clear"></div>';
    nthTabs.addTab({
        id:"a" + counter.toString(),
        title:value,
        content:final,
        active:true
    });
    nthTabs.setActTab("#a" + counter.toString());
    counter++;
}

//搜索内容
function isIn(value,module)
{
    if(module.textContent.search(value)!==-1)
        return true;
    return false;
}

//设置排序事件
function setSort()
{
    tabLocation=document.querySelector(".tab-location");
    tabCloseCurrent=document.querySelector(".tab-close-current");
    tabCloseOther=document.querySelector(".tab-close-other");

    if(tabLocation!==null && tabCloseCurrent!==null && tabCloseOther!==null)
    {
        //三种方式进行排序
        tabLocation.onclick=sortByTime;
        tabCloseCurrent.onclick=sortByAgree;
        tabCloseOther.onclick=sortByChat;
    }
    else
    {
        // console.log("循环");
        setTimeout(setSort,100);
    }
}

//从一篇文章中取出其中的时间
function getTime(article)
{
    let timeLabel=article.querySelector(".content-box .content-left span");
    let value=timeLabel.textContent;
    let time=new Object();
    let array=value.split("年");
    time.year=Number(array[0]);
    array=array[1].split("月");
    time.month=Number(array[0]);
    array=array[1].split(" ");
    time.day=Number(array[0]);
    array=array[1].split(":");
    time.hour=Number(array[0]);
    time.minute=Number(array[1]);
    time.second=Number(array[2]);
    return time;
}

//比较时间
function compareTime(time1,time2)
{
    if(time1.year > time2.year)
        return 1;
    else if(time1.year < time2.year)
        return -1;
    else
    {
        if(time1.month>time2.month)
            return 1;
        else if(time1.month<time2.month)
            return -1;
        else
        {
            if(time1.day>time2.day)
                return 1;
            else if(time1.day<time2.day)
                return -1;
            else
            {
                if(time1.hour>time2.hour)
                    return 1;
                else if(time1.hour< time2.hour)
                    return -1;
                else
                {
                    if(time1.minute > time2.minute)
                        return 1;
                    else if(time1.minute<time2.minute)
                        return -1;
                    else
                    {
                        if(time1.second>time2.second)
                            return 1;
                        else if(time1.second > time2.second)
                            return -1;
                        else
                            return 0;
                    }
                }
            }
        }
    }
}

//比较时间，反向
function compareTimeSub(time1,time2)
{
    return compareTime(time2,time1);
}

//通过时间排序
function sortByTime()
{
    let sortFun;
    if(currentSort=="timeSub")
    {
        sortFun=compareTime;
        currentSort="timeAdd";
    }
    else
    {
        sortFun=compareTimeSub;
        currentSort="timeSub";
    }

    for(let i = 0;i<counter;i++)
    {
        let module=document.querySelector("#a"+i.toString());
        if(module==null)
        {
            continue;
        }
        let array=new Array();
        for(let j = 0;j<module.children.length;j++)
        {
            if(module.children[j].className=="clear")
            {
                // console.log("遇到clear类div");
                continue;
            }
            let time=getTime(module.children[j]);
            time.order=j;
            array.push(time);
        }
        array.sort(sortFun);
        // console.log(array);

        let content="";
        for(let j =0;j<array.length;j++)
        {
            content=content+'<div class="article">'+module.children[array[j].order].innerHTML+'</div>';
        }
        content+='<div class="clear"></div>';
        module.innerHTML=content;
    }
}

//获取一篇文章的点赞量
function getAgree(article)
{
    let span=article.querySelector(".content-box .content-right span:nth-of-type(3)");
    let value=new Object();
    value.number=Number(span.textContent);
    return value;
}

//获取一篇文章的评论量
function getChat(article)
{
    let span=article.querySelector(".content-box .content-right span:nth-of-type(2)");
    let value=new Object();
    value.number=Number(span.textContent);
    return value;
}

//比较大小
function compareNumber(num1,num2)
{
    if(num1.number>num2.number)
        return 1;
    else if(num1.number<num2.number)
        return -1;
    return 0;
}

//反向比较大小
function compareNumberSub(num1,num2)
{
    return compareNumber(num2,num1);
}

//通过点赞量排序
function sortByAgree()
{
    let sortFun;
    if(currentSort=="agreeSub")
    {
        sortFun=compareNumber;
        currentSort="agreeAdd";
    }
    else
    {
        sortFun=compareNumberSub;
        currentSort="agreeSub";
    }

    for(let i = 0;i<counter;i++)
    {
        let module=document.querySelector("#a"+i.toString());
        if(module==null)
        {
            continue;
        }
        let array=new Array();
        for(let j = 0;j<module.children.length;j++)
        {
            if(module.children[j].className=="clear")
            {
                // console.log("遇到clear类div");
                continue;
            }
            let time=getAgree(module.children[j]);
            time.order=j;
            array.push(time);
        }
        array.sort(sortFun);
        // console.log(array);

        let content="";
        for(let j =0;j<array.length;j++)
        {
            content=content+'<div class="article">'+module.children[array[j].order].innerHTML+'</div>';
        }
        content+='<div class="clear"></div>';
        module.innerHTML=content;
    }
}

//通过评论量排序
function sortByChat()
{
    let sortFun;
    if(currentSort=="chatSub")
    {
        sortFun=compareNumber;
        currentSort="chatAdd";
    }
    else
    {
        sortFun=compareNumberSub;
        currentSort="chatSub";
    }

    for(let i = 0;i<counter;i++)
    {
        let module=document.querySelector("#a"+i.toString());
        if(module==null)
        {
            continue;
        }
        let array=new Array();
        for(let j = 0;j<module.children.length;j++)
        {
            if(module.children[j].className=="clear")
            {
                // console.log("遇到clear类div");
                continue;
            }
            let time=getChat(module.children[j]);
            time.order=j;
            array.push(time);
        }
        array.sort(sortFun);
        // console.log(array);

        let content="";
        for(let j =0;j<array.length;j++)
        {
            content=content+'<div class="article">'+module.children[array[j].order].innerHTML+'</div>';
        }
        content+='<div class="clear"></div>';
        module.innerHTML=content;
    }
}