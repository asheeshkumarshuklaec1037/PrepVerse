from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
import json

def home(request):
    courses = [
        {
            'title': 'Aptitude Mastery',
            'description': 'Master logical and numerical problem solving for top company placements with our expert-led modules.',
            'icon': 'fa-brain',
            'gradient': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            'bg_image': 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop'
        },
        {
            'title': 'Logical Reasoning',
            'description': 'Enhance your critical thinking and logical analysis skills for competitive exams through interactive challenges.',
            'icon': 'fa-puzzle-piece',
            'gradient': 'linear-gradient(135deg, #2af598 0%, #009efd 100%)',
            'bg_image': 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=2104&auto=format&fit=crop'
        },
        {
            'title': 'English Proficiency',
            'description': 'Improve your vocabulary, grammar, and comprehension for verbal ability tests with daily practice sets.',
            'icon': 'fa-book-open',
            'gradient': 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
            'bg_image': 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=1973&auto=format&fit=crop'
        },
        {
            'title': 'Quantitative Aptitude',
            'description': 'Advanced mathematics and quantitative techniques for data-driven success in every competitive field.',
            'icon': 'fa-calculator',
            'gradient': 'linear-gradient(135deg, #fccb90 0%, #d57eeb 100%)',
            'bg_image': 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=2070&auto=format&fit=crop'
        }
    ]
    
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

