# Generated by Django 2.0 on 2019-03-22 11:40

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import imagekit.models.fields


class Migration(migrations.Migration):

    dependencies = [
        ('acount', '0004_auto_20190322_1043'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userprofile',
            name='avatar',
            field=imagekit.models.fields.ProcessedImageField(blank=True, default='static/images/background1.jpg', upload_to='avatar/%Y%m%d/', verbose_name='avatar'),
        ),
        migrations.AlterField(
            model_name='userprofile',
            name='user',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='userprofile', to=settings.AUTH_USER_MODEL),
        ),
    ]
