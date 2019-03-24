const SUCCESS=0;
const NOT_FOUND=1;
const EMAIL_REPEAT=1;
const PASSWORD_ERROR=2;
const LOGIN_URL="http://localhost:8000/acount/login";
const REGISTER_RUL="http://localhost:8000/acount/register";

var email;
var pwd;
var pwdRegister;
var pwdRegisterEnsure;
var userName;
var emailRegister;
var rememberPwd;
var autoLogin;
var agreeProtocol;
var loginEnsure;
var registerEnsure;
var loginChange;
var registerChange;
var pwdAdvice;

window.onload=function()
{
    email=document.querySelector("#email");
    pwd=document.querySelector("#pwd");
    rememberPwd=document.querySelector("#remember-pwd");
    autoLogin=document.querySelector("#auto-login");
    emailRegister=document.querySelector("#email-register");
    pwdRegister=document.querySelector("#pwd1");
    pwdRegisterEnsure=document.querySelector("#pwd2");
    userName=document.querySelector("#user-name");
    agreeProtocol=document.querySelector("#agree-protocol");
    loginEnsure=document.querySelector("#login-ensure");
    registerEnsure=document.querySelector("#register-ensure");
    loginChange=document.querySelector("#login-change");
    registerChange=document.querySelector("#register-change");
    pwdAdvice=document.querySelector("#pwd-advice");

    rememberPwd.onchange=function()
    {
        localStorage.setItem("remember-pwd",rememberPwd.checked);
        if(!rememberPwd.checked)
            localStorage.removeItem("pwd");
    }
    autoLogin.onchange=function()
    {
        localStorage.setItem("auto-login",autoLogin.checked);
    }

    //根据邮箱格式是否正确进行颜色标记
    email.oninput=checkEmail;
    emailRegister.oninput=checkEmail;
    email.onchange=checkEmail;
    emailRegister.onchange=checkEmail;

    //点击确认登陆
    loginEnsure.onclick=login;

    //确认密码是否吻合
    pwdRegisterEnsure.oninput=checkPasswordEnsure;
    pwdRegister.oninput=checkPasswordEnsure;

    //点击确认注册
    registerEnsure.onclick=register;

    //同意协议
    agreeProtocol.onchange=function(e)
    {
        if(e.target.checked)
            registerEnsure.disabled=false;
        else
            registerEnsure.disabled=true;
    }

    //刚打开时更改相应选项
    if(localStorage.getItem("remember-pwd"))
    {
        if(localStorage.getItem("remember-pwd")=="false")
            rememberPwd.checked=false;
        else
            rememberPwd.checked=true;
    }
    if(localStorage.getItem("auto-login"))
    {
        if(localStorage.getItem("auto-login")=="false")
            autoLogin.checked=false;
        else
            autoLogin.checked=true;
    }
    if(localStorage.getItem("email"))
    {
        email.value=localStorage.getItem("email");
    }
    if(localStorage.getItem("pwd"))
    {
        pwd.value=localStorage.getItem("pwd");
    }
    if(agreeProtocol.checked===false)
        registerEnsure.disabled=true;
    emailRegister.value="";
    userName.value="";
    pwdRegister.value="";
    pwdRegisterEnsure.value="";
    agreeProtocol.checked=false;

    //如果设置了auto-login则直接登陆
}

function checkEmail(e)
{
    let target=e.target;
    let value=target.value;
    if(value.length <= 0)
    {
        target.style.color="black";
        return;
    }
    
    if(/[\w]+@[\w]+\.[a-zA-Z]+/.test(value))
        target.style.color="black";
    else
        target.style.color="red";
}

function login(e)
{
    //组织默认的表单提交
    e.preventDefault();

    let value=email.value;
    if(value.length <= 0)
    {
        alert("请输入邮箱！");
        return;
    }

    if(!/[\w]+@[\w]+\.[a-zA-Z]+/.test(value))
    {
        alert("邮箱格式错误！");
        return;
    }

    let password=pwd.value;
    if(!password.length)
    {
        alert("请输入密码！");
        return;
    }

    //提交相应信息
    fetch(LOGIN_URL,{
        method:"post",
        body:new URLSearchParams([["email",value],["password",password]]).toString(),
        headers:new Headers({
            "Content-Type":"application/x-www-form-urlencoded"
        })
    }).then(function(response){
        return response.json();
    }).then(function(json){
        if(json.status==SUCCESS)
        {
            //记住账户邮箱
            localStorage.setItem("email",value);
            if(rememberPwd.checked)
                localStorage.setItem("pwd",password);
            else
                localStorage.removeItem("pwd");
            //读取其他信息并跳转到主页面
            alert("登陆成功，此时应该跳转到主页面");
        }
        else if(json.status==NOT_FOUND)
        {
            alert("账户不存在！");
        }
        else if(json.status==PASSWORD_ERROR)
        {
            alert("密码错误！");
        }
        else
        {
            alert("收到了未知信息！");
        }
        // console.log(json);
    });
}

function checkPasswordEnsure()
{
    let value1=pwdRegister.value;
    let value2=pwdRegisterEnsure.value;

    // console.log(value1);
    // console.log(value2);
    if(value2==value1)
        pwdAdvice.textContent="";
    else
        pwdAdvice.textContent=" 不匹配";
}

function register(e)
{
    //组织表单提交
    e.preventDefault();

    // console.log("register");
    let value1=pwdRegister.value;
    let value2=pwdRegisterEnsure.value;
    let emailValue=emailRegister.value;
    let userNameValue=userName.value;

    if(!emailValue.length)
    {
        alert("请输入邮箱！");
        return;
    }
    if(!/[\w]+@[\w]+\.[a-zA-Z]+/.test(emailValue))
    {
        alert("邮箱格式错误！");
        return;
    }
    if(!userNameValue.length)
    {
        alert("请输入用户名！")
        return;
    }
    if(userNameValue.match(" ")==-1)
    {
        alert("用户名不能包含空格！");
        return;
    }
    if(!value1.length)
    {
        alert("请输入密码！");
        return;
    }
    if(value1!=value2)
    {
        alert("两次输入密码不一致！");
        return;
    }

    //提交表单
    fetch(REGISTER_RUL,{
        method:"post",
        body:new URLSearchParams([["email",emailValue],["user-name",userNameValue],["password",value1]]).toString(),
        headers:new Headers({
            "Content-Type":"application/x-www-form-urlencoded"
        })
    }).then(function(response){
        return response.json();
    }).then(function(json){
        if(json.status==SUCCESS)
        {
            //转到登陆界面
            loginChange.click();
        }
        else if(json.status==EMAIL_REPEAT)
        {
            alert("该邮箱已经被注册！请直接登陆！");
        }
        else
        {
            alert("收到服务器未知信息！");
        }
    });
}

//fetch的url必须从根目录/开始写，否则就404找不到
//例如/food/register.php