from django.shortcuts import render
from django.contrib.contenttypes.models import ContentType
from blog.models import Blog
from read_record.utils import get_today_hot_data

def index(request):
    blog_content_type = ContentType.objects.get_for_model(Blog)
    today_hot_data = get_today_hot_data(blog_content_type)
    print(today_hot_data)
    context = {}
    context['today_hot_data'] = today_hot_data
    return render(request, "index.html", context)