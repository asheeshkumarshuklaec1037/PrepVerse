from django.urls import path
from .views import courses_view, daily_challenges, course_detail, topic_detail, module_detail

urlpatterns = [
    path('courses/', courses_view, name='courses'),
    path('course/<int:course_id>/', course_detail, name='course_detail'),
    path('course/<int:course_id>/topic/<int:topic_id>/', topic_detail, name='topic_detail'),
    path('course/<int:course_id>/topic/<int:topic_id>/module/<str:module_name>/', module_detail, name='module_detail'),
    path('daily-challenges/', daily_challenges, name='daily_challenges'),
]
