from django.urls import path
from .views import courses_view, daily_challenges, course_detail, topic_detail, module_detail, recommended_books_view

urlpatterns = [
    path('courses/', courses_view, name='courses'),
    path('courses/section/<slug:section_slug>/', courses_view, name='courses_by_section'),
    path('courses/<slug:course_slug>/', course_detail, name='course_detail'),
    path('courses/<slug:course_slug>/<slug:topic_slug>/', topic_detail, name='topic_detail'),
    path('courses/<slug:course_slug>/<slug:topic_slug>/<str:module_name>/', module_detail, name='module_detail'),
    path('daily-challenges/', daily_challenges, name='daily_challenges'),
    path('books/', recommended_books_view, name='recommended_books'),
]
