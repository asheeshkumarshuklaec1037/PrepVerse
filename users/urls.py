from django.urls import path
from .views import dashboard_view, login_view, signup_view, logout_view, bookmarks_view, leaderboard_view, solved_questions_view, calendar_view, notifications_view, profile_edit_view

urlpatterns = [
    path('dashboard/', dashboard_view, name='dashboard'),
    path('leaderboard/', leaderboard_view, name='leaderboard'),
    path('bookmarks/', bookmarks_view, name='bookmarks'),
    path('login/', login_view, name='login'),
    path('signup/', signup_view, name='signup'),
    path('logout/', logout_view, name='logout'),
    path('solved-questions/', solved_questions_view, name='solved_questions'),
    path('calendar/', calendar_view, name='calendar'),
    path('notifications/', notifications_view, name='notifications'),
    path('profile/', profile_edit_view, name='profile_edit'),
]
