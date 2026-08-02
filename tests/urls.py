from django.urls import path
from .views import mock_tests_view, start_test_session_view, mock_history_view, all_tests_view, question_log_view

urlpatterns = [
    path('mock-test/', mock_tests_view, name='mock_test'),
    path('mock-test/start/', start_test_session_view, name='start_test_session'),
    path('mock-history/', mock_history_view, name='mock_history'),
    path('all-tests/', all_tests_view, name='all_tests'),
    path('question-log/', question_log_view, name='question_log'),
]


