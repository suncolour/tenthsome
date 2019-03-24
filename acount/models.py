from django.db import models
from django.contrib.auth.models import User
from imagekit.models import ProcessedImageField
from imagekit.processors import ResizeToFill

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete = models.CASCADE, related_name = 'userprofile')
    #将新建的UserProfile类和User一对一绑定起来
  #  avatar = models.ImageField(upload_to = 'avator/%Y%m%d/',            #上传到什么位置
  #                             default = 'static/images/background1.jpg', #默认使用哪个头像
  #                             verbose_name = 'avatar')
    avatar = ProcessedImageField(upload_to = 'avatar/%Y%m%d/',  #上传到什么位置
                                 default = 'static/images/background1.jpg', #默认使用哪个头像
                                 verbose_name = 'avatar',
                                 blank = True,
                                 processors = [ResizeToFill(85, 85)])   #将头像处理成85*85大小

    def __str__(self):
        return self.user.username

