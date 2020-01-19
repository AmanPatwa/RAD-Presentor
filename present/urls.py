from django.urls import path, include
from django.conf.urls.static import static
from django.conf import settings
from . import views


urlpatterns = [
    path('',views.home, name = 'home'),
    path('upload',views.upload, name = 'upload'),
    path('live_presentor', views.live_presentor, name = 'live_presentor')
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)