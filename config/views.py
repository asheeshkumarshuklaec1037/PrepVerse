from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from courses import data as course_data
import json

def home(request):
    courses = course_data.get_courses()
    
    # Prepare background slideshow JSON for the JS
    bg_slideshow = {
        "background_slideshow_gallery": [
            {"url": course['bg_image']} for course in courses
        ]
    }

    daily_questions = [
        {
            'id': 1,
            'category': 'Logical Reasoning',
            'title': 'Next in Series',
            'difficulty': 'Medium',
            'time': '5 min',
            'text': 'Which number should come next in the series: 1, 1, 2, 3, 5, 8, 13, ...?',
            'options': ['15', '21', '24', '31'],
            'correct_index': 1,
            'explanation': 'This is the Fibonacci sequence where each number is the sum of the two preceding ones. 8 + 13 = 21.'
        },
        {
            'id': 2,
            'category': 'Quant',
            'title': 'Train Speed',
            'difficulty': 'Hard',
            'time': '10 min',
            'text': 'A train 120m long passes a man, running at 5 km/hr in the same direction, in 10 seconds. What is the speed of the train?',
            'options': ['48.2 km/hr', '50 km/hr', '44.2 km/hr', '43.2 km/hr'],
            'correct_index': 0,
            'explanation': 'Relative speed = Length / Time = 120/10 = 12 m/s. 12 m/s = 12 * 18/5 = 43.2 km/hr. Speed of train = Relative speed + Man speed = 43.2 + 5 = 48.2 km/hr.'
        }
    ]
    
    return render(request, 'home.html', {
        'courses': courses,
        'bg_settings': json.dumps(bg_slideshow),
        'daily_questions': daily_questions
    })

