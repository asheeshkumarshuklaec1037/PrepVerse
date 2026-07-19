from django.urls import path
from .views import blog_view, blog_detail_view

urlpatterns = [
    path('blog/', blog_view, name='blog'),
    path('blog/<int:post_id>/', blog_detail_view, name='blog_detail'),
]
