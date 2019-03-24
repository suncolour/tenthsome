from django.shortcuts import render, redirect, HttpResponse
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
from .models import UserProfile

@csrf_exempt
def user_login(request):
    SUCCESS = 0         #登录成功
    NOT_FOUND = 1       #账户不存在(邮箱未找到)
    PASSWORD_ERROR = 2  #登录密码错误
    if request.method == "POST":
        email = request.POST.get('email')
        password = request.POST.get('password')
        try:
            user = User.objects.get(email = email)
            if user.check_password(password):    #检查密码是否正确
                login(request, user)
                status = SUCCESS
            else:                   #用户正确，密码不正确
                status = PASSWORD_ERROR
        except Exception as e:           #邮箱不存在
            status = NOT_FOUND
        return JsonResponse({"status": status})
    elif request.method == "GET":
        return render(request, "login.html")

@csrf_exempt
def user_logout(request):
    logout(request)
    return redirect('/')

@csrf_exempt
def user_register(request):
    SUCCESS = 0
    EMAIL_REPEAT = 1
    if request.method == "POST":
        username = request.POST.get('user-name')
        password = request.POST.get('password')
        email = request.POST.get('email')
        same_email = User.objects.filter(email = email) #判断这个email是否已经被注册
        if same_email:  #如果这个邮箱已经被注册
            status = EMAIL_REPEAT
        else:
            user = User.objects.create_user(username, email, password)
            user.save()
            userprofile = UserProfile.objects.create(user = user)
            userprofile.save()
            login(request, user)
            status = SUCCESS
        return JsonResponse({"status": status})
    elif request.method == "GET":
        return render(request, "login.html")

@login_required
#使用login_required装饰器，用户只有登录了才能访问其用户资料
def change_password(request):
    SUCCESS = 0
    PASSWORDERROR = 1
    ERROR = 2
    if request.method == "POST":
        initialpassword = request.POST.get('initialpassword')
        user = request.user  # 获取当前用户
        if user.check_password(initialpassword):  # 检查原始密码，如果密码正确
            username = request.POST.get('user-name')
            password = request.POST.get('password')
            avatar = request.FILES.get('image')
            if username is not None:    #如果用户名不为空，说明用户想要修改用户名
                user.username = username     #修改用户名
                user.save()  # 保存修改内容
            if password is not None:    #如果密码不为空，说明用户想要修改密码
                user.set_password(password)  #修改密码
                user.save()  # 保存修改内容
            if avatar is not None:      #如果头像不为空，说明用户上传了新的图像
                user.userprofile.avatar = avatar
                user.userprofile.save()
            status = SUCCESS
            login(request, user)
        else:       #原始密码不正确
            status = PASSWORDERROR
        return JsonResponse({"status": status})
    elif request.method == "GET":
        user = request.user
        context = {}
        context['user'] = user
        return render(request, "user-information.html", context)
