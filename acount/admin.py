from django.contrib import admin
from .models import UserProfile

@admin.register(UserProfile)
class BlogAdmin(admin.ModelAdmin):
    list_display = ('user',)