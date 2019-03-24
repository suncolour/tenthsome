from django.urls import path
from . import views

urlpatterns = [
    #localhost:8000/blog
    path('', views.blog_list, name = 'blog_list'),
    #localhost:8000/blog/<blog_id>
    path('blog/<int:blog_id>', views.blog_detail, name = 'blog_detail'),
    path('type/<int:blog_type_id>', views.classify_blogs, name = 'classify_blogs'),
]
