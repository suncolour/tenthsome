# Generated by Django 2.0 on 2019-03-23 02:25

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0009_blog_readed_num'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='blog',
            name='readed_num',
        ),
    ]