from django.shortcuts import render, get_object_or_404
from django.core.paginator import Paginator #引入分页器
from .models import Blog, BlogType
from django.contrib.contenttypes.models import ContentType
from read_record.models import ReadNum, ReadDetail
from django.utils import timezone

def blog_list(request):
    user = request.user
    blogs = Blog.objects.filter(author = user).order_by('-created_time')
    paginator = Paginator(blogs, 10)
    page_num = request.GET.get('page', 1)
    page_of_blogs = paginator.get_page(page_num)
    print(user.userprofile.avatar)
    context = {}
    context['page_of_blogs'] = page_of_blogs
    return render(request, "region-article.html", context)

def blog_detail(request, blog_id):
    #访问具体博文界面
    blog = get_object_or_404(Blog, pk = blog_id)
    user = request.user
    key = 'blog_%s_%s_readed' % (blog_id, user.id)
    if not request.COOKIES.get(key):
        #总阅读数
        contenttype = ContentType.objects.get_for_model(Blog)
        readnum, created = ReadNum.objects.get_or_create(content_type = contenttype, object_id = blog.id)
        #get_or_create表示如果该对象存在，则直接获取，如果不存在，则创建
        #created表示该对象readnum是直接获取的还是创建的
        readnum.read_num += 1
        readnum.save()

        #当天阅读数
        date = timezone.now().date()
        readdetail, created = ReadDetail.objects.get_or_create(content_type=contenttype, object_id=blog.id, date = date)
        readdetail.read_num += 1    #阅读量加一
        readdetail.save()           #保存

    context = {}
    context['blog'] = blog
    response = render(request, "article.html", context)
    response.set_cookie(key, True, max_age = 600)
    return response

def classify_blogs(request, blog_type_id):
    #对文章进行分类
    user = request.user
    blog_type = get_object_or_404(BlogType, id = blog_type_id)
    blogs = Blog.objects.filter(author = user, blog_type = blog_type).order_by('-created_time')
    paginator = Paginator(blogs, 10)
    page_num = request.GET.get('page', 1)
    page_of_blogs = paginator.get_page(page_num)
    context = {}
    context['blog_type'] = blog_type
    context['page_of_blogs'] = page_of_blogs
    return render(request, "classify_blogs.html", context)