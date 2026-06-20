"""
URL configuration for config project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from .views import home, course_detail, topic_detail, module_detail, login_view, signup_view, daily_challenges, courses_view, practice_view, mock_tests_view, start_test_session_view

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', home, name='home'),
    path('courses/', courses_view, name='courses'),
    path('practice/', practice_view, name='practice'),
    path('mock-test/', mock_tests_view, name='mock_test'),
    path('mock-test/start/', start_test_session_view, name='start_test_session'),
    path('login/', login_view, name='login'),
    path('signup/', signup_view, name='signup'),
    path('course/<int:course_id>/', course_detail, name='course_detail'),
    path('course/<int:course_id>/topic/<int:topic_id>/', topic_detail, name='topic_detail'),
    path('course/<int:course_id>/topic/<int:topic_id>/module/<str:module_name>/', module_detail, name='module_detail'),
    path('daily-challenges/', daily_challenges, name='daily_challenges'),
]
