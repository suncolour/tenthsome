from django.db import models
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType  #引用ContentType类型
from django.utils import timezone

class ReadNum(models.Model):
    read_num = models.IntegerField(default = 0)
    content_type = models.ForeignKey(ContentType, on_delete = models.DO_NOTHING)
    object_id = models.PositiveIntegerField()
    content_object = GenericForeignKey('content_type', 'object_id')

class ReadDetail(models.Model):
    date = models.DateField(default = timezone.now) #记录日期，默认为当天
    read_num = models.IntegerField(default=0)
    content_type = models.ForeignKey(ContentType, on_delete=models.DO_NOTHING)
    object_id = models.PositiveIntegerField()
    content_object = GenericForeignKey('content_type', 'object_id')