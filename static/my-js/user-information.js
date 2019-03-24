//URL_SUBMIT是提交给哪个脚本
const URL_SUBMIT="http://localhost:8000/acount/change_password";
const SUCCESS=0;
const ERROR=1;
const URL_LOGIN="http://localhost:8000/acount/login";

var imageButton;
var imageInput;
var submit;
var userName;
var initialPwd;
var newPwd;
var newPwdEnsure;
var pwdAdvice;

window.onload=function()
{
    imageButton=document.querySelector("#img-card .card-footer button");
    imageInput=document.querySelector("#img-card .card-footer input");
    submit=document.querySelector("#register button");
    userName=document.querySelector("#username");
    initialPwd=document.querySelector("#pwd1");
    newPwd=document.querySelector("#pwd2");
    newPwdEnsure=document.querySelector("#pwd3");
    pwdAdvice=document.querySelector("#pwd-advice");

    imageButton.onclick=function()
    {
        imageInput.click();
    }
    imageInput.onchange=changeImg;

    //确认密码一致性
    newPwd.oninput=checkPwd;
    newPwdEnsure.oninput=checkPwd;

    //点击确认按钮
    submit.onclick=submitForm;
}

//根据选择的图片更改显示效果
function changeImg()
{
    console.log(this.value);

    let img=document.querySelector("#img-card .card-body img");

    let file=this.files[0];
    let value=this.value;
    let array=value.split("\\");
    value=array[array.length-1];
    if(!(/.jpeg$/i.test(value))&&!(/.jpg$/i.test(value))&&!(/.png$/i.test(value))&&!(/.ico$/i.test(value))&&!(/.gif$/i.test(value))
    &&!(/.JPEG/i.test(value))&&!(/.JPG$/i.test(value))&&!(/.PNG$/i.test(value))&&!(/.ICO$/i.test(value))&&!(/.GIF$/i.test(value)))
    {
        alert("请选择一张图片！");
        return;
    }
    let oFReader=new FileReader();
    oFReader.readAsDataURL(file);
	oFReader.onloadend = function(oFRevent){
        img.src=oFRevent.target.result;
        let span=document.querySelector("#img-card .card-footer span");
        span.textContent=value;
        console.log(oFRevent.target.result);
    }
}

//确认密码一致性
function checkPwd()
{
    let value1=newPwd.value;
    let value2=newPwdEnsure.value;

    // console.log(value1);
    // console.log(value2);
    if(value2==value1)
        pwdAdvice.textContent="";
    else
        pwdAdvice.textContent=" 不匹配";
}

//提交信息
function submitForm(e)
{
    //组织默认的表单提交行为
    e.preventDefault();

    let value1=newPwd.value;
    let value2=newPwdEnsure.value;
    let initialValue=initialPwd.value;
    let userNameValue=userName.value;
    let submitObject=new FormData();

    if(initialValue=="")
    {
        alert("请先输入原始密码");
        return;
    }
    if(value2!=value1)
    {
        alert("两次输入密码不一致！");
        return;
    }

    //如果无法取得存储的email值，那么就得重新登陆了
    let email=localStorage.getItem("email");
    if(!email)
    {
        alert("登录已经过时，请重新登陆");
        document.location=URL_LOGIN;
    }


    submitObject.append("email",email);
    if(userNameValue!="")
    {
        submitObject.append("user-name",userNameValue);
    }
    if(initialValue!="")
    {
        submitObject.append("initialpassword",initialValue);
    }
    if(value1!="")
    {
        submitObject.append("password",value1);
    }
    if(imageInput.files[0] !== undefined)
    {
        submitObject.append("image",imageInput.files[0]);
    }
    console.log(submitObject);

    fetch(URL_SUBMIT,{
        method:"post",
        body:submitObject
    }).then(function(response){
        return response.json();
    }).then(function(json){
        if(json.status==SUCCESS)
        {
            alert("更改信息成功！");
        }
        else if(json.status==ERROR)
        {
            alert("原始密码错误！");
        }
        else
        {
            alert("修改信息失败");
        }
        // document.write(json);
    });
}