from django.contrib import admin
from .models import presentor, student

@admin.register(presentor)
class presentorAdmin(admin.ModelAdmin):
    list_display = ('name', 'email')
    ordering = ('name',)

@admin.register(student)
class studentAdmin(admin.ModelAdmin):
    list_display = ('name', 'email')
    ordering = ('name',)