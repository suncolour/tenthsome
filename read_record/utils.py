from django.utils import timezone
from .models import ReadDetail

def get_today_hot_data(contenttype):
    today = timezone.now().date()
    readdetails = ReadDetail.objects.filter(content_type = contenttype, date = today).order_by('-read_num')
    #以今日阅读量由高到低的顺序获取文章对象
    return readdetails[:7]  #只取前7条