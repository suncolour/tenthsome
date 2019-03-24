# Generated by Django 2.0 on 2019-03-22 02:43

from django.db import migrations
import imagekit.models.fields


class Migration(migrations.Migration):

    dependencies = [
        ('acount', '0003_auto_20190321_1636'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userprofile',
            name='avatar',
            field=imagekit.models.fields.ProcessedImageField(blank=True, default='static/images/background1.jpg', upload_to='avator/%Y%m%d/', verbose_name='avatar'),
        ),
    ]