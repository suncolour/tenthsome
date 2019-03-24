const serverApp="something.py";

var agreeImg;
var agreeNum;
var id;

window.onload=function(){
    var mySchedule = new Schedule({
		el: '#schedule-box'
    });
    
    agreeImg=document.querySelector(".content .agree img");
    agreeNum=document.querySelector(".content .agree span");
    id=Number(document.querySelector("#order").value);
    agreeImg.onclick=function()
    {
        if(agreeImg.className=="agreed")
        {
            let email=localStorage.getItem("email");
            if(!email)
            {
                alert("请先登录！");
                window.location="/food/login.html";
            }

            agreeImg.className="notAgree";
            agreeNum.textContent=Number(agreeNum.textContent)-1;

            //然后发送消息告诉服务器该用户取消对该文章的点赞
            fetch(serverApp+"?email="+email+"&order="+id.toString()+"&agree=0",{
                method:"get"
            }).then(function(response){
                return response.text();
            }).then(function(text){
                //donothing
            });
        }
        else
        {
            let email=localStorage.getItem("email");
            if(!email)
            {
                alert("请先登录！");
                window.location="/food/login.html";
            }

            agreeImg.className="agreed";
            agreeNum.textContent=Number(agreeNum.textContent)+1;

            //然后发送消息告诉服务器该用户增加对该文章的点赞
            fetch(serverApp+"?email="+email+"&id="+id.toString()+"&agree=1",{
                method:"get"
            }).then(function(response){
                return response.text();
            }).then(function(text){
                //donothing
            });
        }
    }
}