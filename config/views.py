from django.shortcuts import render
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
    
    return render(request, 'home.html', {
        'courses': courses,
        'bg_settings': json.dumps(bg_slideshow)
    })
