# Generated by Django 2.0 on 2019-03-20 08:59

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='blog',
            name='city',
            field=models.CharField(default=django.utils.timezone.now, max_length=10),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='blog',
            name='index',
            field=models.CharField(default=django.utils.timezone.now, max_length=160),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='blog',
            name='latitude',
            field=models.DecimalField(decimal_places=3, default=0, max_digits=6),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='blog',
            name='longitude',
            field=models.DecimalField(decimal_places=3, default=0, max_digits=6),
            preserve_default=False,
        ),
    ]