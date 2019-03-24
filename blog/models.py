from django.db import models
from django.contrib.auth.models import User
from imagekit.models import ProcessedImageField
from imagekit.processors import ResizeToFill
from django.contrib.contenttypes.models import ContentType
from read_record.models import ReadNum
from django.db.models.fields import exceptions

class BlogType(models.Model):
    type_name = models.CharField(max_length = 20)

    def __str__(self):
        return self.type_name

class Blog(models.Model):
    title = models.CharField(max_length = 60)
    index = models.CharField(max_length = 160, default = None)
    content = models.TextField()
    blog_type = models.ForeignKey(BlogType, on_delete = models.DO_NOTHING)
    author = models.ForeignKey(User, on_delete = models.DO_NOTHING)
    created_time = models.DateTimeField(auto_now_add = True)
    last_updated_time = models.DateTimeField(auto_now = True)
    city = models.CharField(max_length = 10, default = None)
    latitude = models.DecimalField(max_digits = 6, decimal_places = 3, default = 0)
    longitude = models.DecimalField(max_digits = 6, decimal_places = 3, default = 0)
    cover = ProcessedImageField(upload_to = 'cover/%Y%m%d/',  #上传到什么位置
                                 default = 'static/images/background1.jpg',
                                 verbose_name = 'cover',
                                 blank = True,
                                 processors = [ResizeToFill(200, 150)])

    def get_read_num(self):
        try:
            contenttype = ContentType.objects.get_for_model(self)
            readnum = ReadNum.objects.get(content_type = contenttype, object_id = self.id)
            return readnum.read_num
        except exceptions.ObjectDoesNotExist:
            return 0

    def __str__(self):
        return self.title
