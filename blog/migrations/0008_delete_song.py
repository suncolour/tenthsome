# Generated by Django 2.0 on 2019-03-22 02:54

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0007_song'),
    ]

    operations = [
        migrations.DeleteModel(
            name='Song',
        ),
    ]