# Generated by Django 2.0 on 2019-03-22 13:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0008_delete_song'),
    ]

    operations = [
        migrations.AddField(
            model_name='blog',
            name='readed_num',
            field=models.IntegerField(default=0),
        ),
    ]
