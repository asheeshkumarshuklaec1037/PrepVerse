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

def courses_view(request):
    courses = [
        {
            'id': 0,
            'title': 'Aptitude Mastery',
            'description': 'Master logical and numerical problem solving for top company placements with our expert-led modules.',
            'icon': 'fa-brain',
            'gradient': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            'bg_image': 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop',
            'tags': ['Best Seller', '12 Modules', 'Beginner']
        },
        {
            'id': 1,
            'title': 'Logical Reasoning',
            'description': 'Enhance your critical thinking and logical analysis skills for competitive exams through interactive challenges.',
            'icon': 'fa-puzzle-piece',
            'gradient': 'linear-gradient(135deg, #2af598 0%, #009efd 100%)',
            'bg_image': 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=2104&auto=format&fit=crop',
            'tags': ['New', '8 Modules', 'Intermediate']
        },
        {
            'id': 2,
            'title': 'English Proficiency',
            'description': 'Improve your vocabulary, grammar, and comprehension for verbal ability tests with daily practice sets.',
            'icon': 'fa-book-open',
            'gradient': 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
            'bg_image': 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=1973&auto=format&fit=crop',
            'tags': ['Essential', '15 Modules', 'All Levels']
        },
        {
            'id': 3,
            'title': 'Quantitative Aptitude',
            'description': 'Advanced mathematics and quantitative techniques for data-driven success in every competitive field.',
            'icon': 'fa-calculator',
            'gradient': 'linear-gradient(135deg, #fccb90 0%, #d57eeb 100%)',
            'bg_image': 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=2070&auto=format&fit=crop',
            'tags': ['Advanced', '20 Modules', 'Hard']
        }
    ]
    return render(request, 'courses.html', {'courses': courses})

def dashboard_view(request):
    if not request.user.is_authenticated:
        return redirect('login')
        
    # Mock data for the Dashboard
    stats = {
        'questions_solved': 342,
        'accuracy': '85%',
        'current_streak': 12,
        'global_rank': 1450
    }
    
    categories = [
        {'title': 'Quantitative Aptitude', 'icon': 'fa-calculator', 'color': '#fccb90', 'count': 450, 'progress': 45},
        {'title': 'Logical Reasoning', 'icon': 'fa-puzzle-piece', 'color': '#2af598', 'count': 320, 'progress': 60},
        {'title': 'Verbal Ability', 'icon': 'fa-book-open', 'color': '#ff9a9e', 'count': 280, 'progress': 30},
        {'title': 'Data Interpretation', 'icon': 'fa-chart-pie', 'color': '#009efd', 'count': 150, 'progress': 15},
    ]

    recent_challenges = [
        {'title': 'Time, Speed & Distance Masterclass', 'type': 'Quant', 'difficulty': 'Hard', 'time': '15 min'},
        {'title': 'Syllogism Tricks & Shortcuts', 'type': 'Logic', 'difficulty': 'Medium', 'time': '10 min'},
        {'title': 'Reading Comprehension Advanced', 'type': 'Verbal', 'difficulty': 'Hard', 'time': '20 min'},
    ]

    return render(request, 'dashboard.html', {
        'stats': stats,
        'categories': categories,
        'recent_challenges': recent_challenges
    })

def practice_view(request):
    if not request.user.is_authenticated:
        return redirect('login')
        
    # Mock data for the Practice Arena
    stats = {
        'questions_solved': 342,
        'accuracy': '85%',
        'current_streak': 12,
        'global_rank': 1450
    }
    
    categories = [
        {'title': 'Quantitative Aptitude', 'icon': 'fa-calculator', 'color': '#fccb90', 'count': 450, 'progress': 45},
        {'title': 'Logical Reasoning', 'icon': 'fa-puzzle-piece', 'color': '#2af598', 'count': 320, 'progress': 60},
        {'title': 'Verbal Ability', 'icon': 'fa-book-open', 'color': '#ff9a9e', 'count': 280, 'progress': 30},
        {'title': 'Data Interpretation', 'icon': 'fa-chart-pie', 'color': '#009efd', 'count': 150, 'progress': 15},
    ]

    recent_challenges = [
        {'title': 'Time, Speed & Distance Masterclass', 'type': 'Quant', 'difficulty': 'Hard', 'time': '15 min'},
        {'title': 'Syllogism Tricks & Shortcuts', 'type': 'Logic', 'difficulty': 'Medium', 'time': '10 min'},
        {'title': 'Reading Comprehension Advanced', 'type': 'Verbal', 'difficulty': 'Hard', 'time': '20 min'},
    ]

    return render(request, 'practice.html', {
        'stats': stats,
        'categories': categories,
        'recent_challenges': recent_challenges
    })

def daily_challenges(request):
    # This page will show the detailed daily challenges
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
    return render(request, 'daily_challenges.html', {'questions': daily_questions})

def course_detail(request, course_id):
    # Static data for UI design phase
    courses = [
        {
            'id': 0,
            'title': 'Aptitude Mastery',
            'description': 'Master logical and numerical problem solving for top company placements with our expert-led modules.',
            'detailed_description': 'This comprehensive course is designed to sharpen your numerical, logical, and verbal aptitude. Whether you are preparing for campus placements, competitive exams, or professional certifications, our curated modules provide the foundational knowledge and advanced techniques needed to excel.',
            'bg_image': 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop',
            'topics': [
                {'id': 0, 'title': 'Quantitative Aptitude', 'subtopics': ['Number Systems', 'Percentages', 'Profit & Loss', 'Time & Work']},
                {'id': 1, 'title': 'Logical Reasoning', 'subtopics': ['Blood Relations', 'Syllogisms', 'Seating Arrangement', 'Data Sufficiency']},
                {'id': 2, 'title': 'Data Interpretation', 'subtopics': ['Pie Charts', 'Bar Graphs', 'Line Graphs', 'Caselets']},
            ]
        },
        {
            'id': 1,
            'title': 'Logical Reasoning',
            'description': 'Enhance your critical thinking and logical analysis skills for competitive exams through interactive challenges.',
            'detailed_description': 'Logical reasoning is the backbone of problem-solving. This course focuses on developing your ability to analyze patterns, structures, and relationships. Through a series of interactive challenges and real-world scenarios, you will learn to approach complex problems with a structured mindset.',
            'bg_image': 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=2104&auto=format&fit=crop',
            'topics': [
                {'id': 0, 'title': 'Verbal Reasoning', 'subtopics': ['Analogy', 'Classification', 'Series Completion', 'Coding-Decoding']},
                {'id': 1, 'title': 'Analytical Reasoning', 'subtopics': ['Statements & Assumptions', 'Arguments', 'Conclusions', 'Course of Action']},
                {'id': 2, 'title': 'Non-Verbal Reasoning', 'subtopics': ['Mirror Images', 'Paper Folding', 'Cube & Dice', 'Pattern Completion']},
            ]
        },
        {
            'id': 2,
            'title': 'English Proficiency',
            'description': 'Improve your vocabulary, grammar, and comprehension for verbal ability tests with daily practice sets.',
            'detailed_description': 'Communication is key to success in any field. This course is designed to enhance your verbal ability, focusing on grammar, vocabulary building, and reading comprehension. With daily practice sets and expert feedback, you will gain the confidence to communicate effectively in professional and academic environments.',
            'bg_image': 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=1973&auto=format&fit=crop',
            'topics': [
                {'id': 0, 'title': 'Grammar Essentials', 'subtopics': ['Parts of Speech', 'Tenses', 'Active & Passive Voice', 'Direct & Indirect Speech']},
                {'id': 1, 'title': 'Vocabulary Building', 'subtopics': ['Synonyms & Antonyms', 'Idioms & Phrases', 'One-word Substitutions', 'Spelling Rules']},
                {'id': 2, 'title': 'Reading Comprehension', 'subtopics': ['Main Idea Identification', 'Inference Making', 'Vocabulary in Context', 'Tone & Style']},
            ]
        },
        {
            'id': 3,
            'title': 'Quantitative Aptitude',
            'description': 'Advanced mathematics and quantitative techniques for data-driven success in every competitive field.',
            'detailed_description': 'In today\'s data-driven world, quantitative skills are more important than ever. This course covers advanced mathematical concepts and quantitative techniques used in finance, technology, and analytics. You will learn to manipulate data, identify trends, and make informed decisions based on quantitative evidence.',
            'bg_image': 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=2070&auto=format&fit=crop',
            'topics': [
                {'id': 0, 'title': 'Arithmetic', 'subtopics': ['Ratio & Proportion', 'Average', 'Partnership', 'Mixtures & Alligations']},
                {'id': 1, 'title': 'Algebra', 'subtopics': ['Linear Equations', 'Quadratic Equations', 'Inequalities', 'Logarithms']},
                {'id': 2, 'title': 'Modern Math', 'subtopics': ['Permutations & Combinations', 'Probability', 'Set Theory', 'Geometry']},
            ]
        }
    ]
    
    course = next((c for c in courses if c['id'] == int(course_id)), courses[0])
    
    return render(request, 'course_detail.html', {
        'course': course,
        'courses': courses
    })

def topic_detail(request, course_id, topic_id):
    # Static data for UI design phase (same as above for consistency)
    courses = [
        {
            'id': 0,
            'title': 'Aptitude Mastery',
            'bg_image': 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop',
            'topics': [
                {'id': 0, 'title': 'Quantitative Aptitude', 'subtopics': ['Number Systems', 'Percentages', 'Profit & Loss', 'Time & Work']},
                {'id': 1, 'title': 'Logical Reasoning', 'subtopics': ['Blood Relations', 'Syllogisms', 'Seating Arrangement', 'Data Sufficiency']},
                {'id': 2, 'title': 'Data Interpretation', 'subtopics': ['Pie Charts', 'Bar Graphs', 'Line Graphs', 'Caselets']},
            ]
        },
        {
            'id': 1,
            'title': 'Logical Reasoning',
            'bg_image': 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=2104&auto=format&fit=crop',
            'topics': [
                {'id': 0, 'title': 'Verbal Reasoning', 'subtopics': ['Analogy', 'Classification', 'Series Completion', 'Coding-Decoding']},
                {'id': 1, 'title': 'Analytical Reasoning', 'subtopics': ['Statements & Assumptions', 'Arguments', 'Conclusions', 'Course of Action']},
                {'id': 2, 'title': 'Non-Verbal Reasoning', 'subtopics': ['Mirror Images', 'Paper Folding', 'Cube & Dice', 'Pattern Completion']},
            ]
        },
        {
            'id': 2,
            'title': 'English Proficiency',
            'bg_image': 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=1973&auto=format&fit=crop',
            'topics': [
                {'id': 0, 'title': 'Grammar Essentials', 'subtopics': ['Parts of Speech', 'Tenses', 'Active & Passive Voice', 'Direct & Indirect Speech']},
                {'id': 1, 'title': 'Vocabulary Building', 'subtopics': ['Synonyms & Antonyms', 'Idioms & Phrases', 'One-word Substitutions', 'Spelling Rules']},
                {'id': 2, 'title': 'Reading Comprehension', 'subtopics': ['Main Idea Identification', 'Inference Making', 'Vocabulary in Context', 'Tone & Style']},
            ]
        },
        {
            'id': 3,
            'title': 'Quantitative Aptitude',
            'bg_image': 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=2070&auto=format&fit=crop',
            'topics': [
                {'id': 0, 'title': 'Arithmetic', 'subtopics': ['Ratio & Proportion', 'Average', 'Partnership', 'Mixtures & Alligations']},
                {'id': 1, 'title': 'Algebra', 'subtopics': ['Linear Equations', 'Quadratic Equations', 'Inequalities', 'Logarithms']},
                {'id': 2, 'title': 'Modern Math', 'subtopics': ['Permutations & Combinations', 'Probability', 'Set Theory', 'Geometry']},
            ]
        }
    ]
    
    course = next((c for c in courses if c['id'] == int(course_id)), courses[0])
    topic = next((t for t in course['topics'] if t['id'] == int(topic_id)), course['topics'][0])
    
    return render(request, 'topic_detail.html', {'course': course, 'topic': topic})

def module_detail(request, course_id, topic_id, module_name):
    # Static question data for UI phase
    questions = [
        {
            'id': 1,
            'text': 'Look at this series: 2, 1, (1/2), (1/4), ... What number should come next?',
            'options': ['(1/3)', '(1/8)', '(2/8)', '(1/16)'],
            'correct_index': 1,
            'correct_label': 'B',
            'explanation': 'This is a simple division series; each number is one-half of the previous number. In other terms, the number is divided by 2 successively to get the next result. 4/2=2, 2/2=1, 1/2=1/2, (1/2)/2=1/4, (1/4)/2=1/8 and so on.'
        },
        {
            'id': 2,
            'text': 'Look at this series: 7, 10, 8, 11, 9, 12, ... What number should come next?',
            'options': ['7', '10', '12', '13'],
            'correct_index': 1,
            'correct_label': 'B',
            'explanation': 'This is an alternating addition and subtraction series. In the first pattern, 3 is added; in the second, 2 is subtracted. 7+3=10, 10-2=8, 8+3=11, 11-2=9, 9+3=12, 12-2=10.'
        },
        {
            'id': 3,
            'text': 'Look at this series: 36, 34, 30, 28, 24, ... What number should come next?',
            'options': ['20', '22', '23', '26'],
            'correct_index': 1,
            'correct_label': 'B',
            'explanation': 'This is an alternating subtraction series. First, 2 is subtracted, then 4, then 2, and so on. 36-2=34, 34-4=30, 30-2=28, 28-4=24, 24-2=22.'
        }
    ]
    
    # We need course/topic for breadcrumbs/context
    courses = [
        {
            'id': 0, 'title': 'Aptitude Mastery',
            'topics': [{'id': 0, 'title': 'Quantitative Aptitude'}, {'id': 1, 'title': 'Logical Reasoning'}]
        },
        {
            'id': 1, 'title': 'Logical Reasoning',
            'topics': [{'id': 0, 'title': 'Verbal Reasoning'}, {'id': 1, 'title': 'Analytical Reasoning'}]
        }
    ]
    
    course = next((c for c in courses if c['id'] == int(course_id)), courses[0])
    topic = next((t for t in course['topics'] if t['id'] == int(topic_id)), course['topics'][0])

    return render(request, 'module_detail.html', {
        'course': course,
        'topic': topic,
        'module_name': module_name,
        'questions': questions
    })

def login_view(request):
    print("DEBUG: login_view called with method:", request.method)
    if request.user.is_authenticated:
        return redirect('dashboard')

    if request.method == 'POST':
        email = request.POST.get('email', '').strip().lower()
        password = request.POST.get('password', '')

        if not email or not password:
            return render(request, 'login.html', {'error': 'Please fill in all fields.'})

        # Authenticate user. Since username = email:
        user = authenticate(request, username=email, password=password)

        if user is not None:
            login(request, user)
            return redirect('dashboard')
        else:
            # Check if user exists to give more specific error
            if not User.objects.filter(email=email).exists():
                return render(request, 'login.html', {'error': 'No account found with this email address.'})
            else:
                return render(request, 'login.html', {'error': 'Incorrect password. Please try again.'})

    return render(request, 'login.html')

def signup_view(request):
    print("DEBUG: signup_view called with method:", request.method)
    if request.user.is_authenticated:
        return redirect('dashboard')
        
    if request.method == 'POST':
        first_name = request.POST.get('first_name', '').strip()
        last_name = request.POST.get('last_name', '').strip()
        email = request.POST.get('email', '').strip().lower()
        password = request.POST.get('password', '')

        # Basic validations
        if not first_name or not last_name or not email or not password:
            return render(request, 'signup.html', {'error': 'All fields are required.'})
            
        if User.objects.filter(email=email).exists():
            return render(request, 'signup.html', {'error': 'An account with this email already exists.'})
            
        # Create user
        try:
            # We set both username and email to the email address
            user = User.objects.create_user(
                username=email,
                email=email,
                password=password,
                first_name=first_name,
                last_name=last_name
            )
            # Log the user in directly after signup
            login(request, user)
            return redirect('dashboard')
        except Exception as e:
            return render(request, 'signup.html', {'error': f'Something went wrong: {str(e)}'})

    return render(request, 'signup.html')

def logout_view(request):
    logout(request)
    return redirect('home')

def mock_tests_view(request):
    subjects_data = [
        {
            'name': 'Aptitude Mastery',
            'topics': [
                {'name': 'Quantitative Aptitude', 'modules': ['Number Systems', 'Percentages', 'Profit & Loss', 'Time & Work']},
                {'name': 'Logical Reasoning', 'modules': ['Blood Relations', 'Syllogisms', 'Seating Arrangement', 'Data Sufficiency']},
                {'name': 'Data Interpretation', 'modules': ['Pie Charts', 'Bar Graphs', 'Line Graphs', 'Caselets']}
            ]
        },
        {
            'name': 'Logical Reasoning',
            'topics': [
                {'name': 'Verbal Reasoning', 'modules': ['Analogy', 'Classification', 'Series Completion', 'Coding-Decoding']},
                {'name': 'Analytical Reasoning', 'modules': ['Statements & Assumptions', 'Arguments', 'Conclusions', 'Course of Action']},
                {'name': 'Non-Verbal Reasoning', 'modules': ['Mirror Images', 'Paper Folding', 'Cube & Dice', 'Pattern Completion']}
            ]
        },
        {
            'name': 'English Proficiency',
            'topics': [
                {'name': 'Grammar Essentials', 'modules': ['Parts of Speech', 'Tenses', 'Active & Passive Voice', 'Direct & Indirect Speech']},
                {'name': 'Vocabulary Building', 'modules': ['Synonyms & Antonyms', 'Idioms & Phrases', 'One-word Substitutions', 'Spelling Rules']},
                {'name': 'Reading Comprehension', 'modules': ['Main Idea Identification', 'Inference Making', 'Vocabulary in Context', 'Tone & Style']}
            ]
        },
        {
            'name': 'Quantitative Aptitude',
            'topics': [
                {'name': 'Arithmetic', 'modules': ['Ratio & Proportion', 'Average', 'Partnership', 'Mixtures & Alligations']},
                {'name': 'Algebra', 'modules': ['Linear Equations', 'Quadratic Equations', 'Inequalities', 'Logarithms']},
                {'name': 'Modern Math', 'modules': ['Permutations & Combinations', 'Probability', 'Set Theory', 'Geometry']}
            ]
        }
    ]
    return render(request, 'mock_tests.html', {
        'subjects_json': json.dumps(subjects_data),
        'subjects': subjects_data
    })

def start_test_session_view(request):
    mode = request.GET.get('mode', 'Module Blitz')
    subject = request.GET.get('subject', 'Aptitude Mastery')
    topic = request.GET.get('topic', 'Quantitative Aptitude')
    module = request.GET.get('module', 'Number Systems')
    test_name = request.GET.get('test', 'Mock Test 01')

    sample_questions_01 = [
        {
            'id': 1,
            'text': "Find the greatest number that will divide 43, 91 and 183 so as to leave the same remainder in each case.",
            'options': ["4", "7", "9", "13"],
            'correct_index': 0
        },
        {
            'id': 2,
            'text': "A sum of money at simple interest amounts to Rs. 815 in 3 years and to Rs. 854 in 4 years. What is the sum?",
            'options': ["Rs. 650", "Rs. 690", "Rs. 698", "Rs. 700"],
            'correct_index': 2
        },
        {
            'id': 3,
            'text': "Three partners A, B, C start a business. Twice A's capital is equal to thrice B's capital and B's capital is four times C's capital. Find the share of B in a total profit of Rs. 1,48,500.",
            'options': ["Rs. 48,000", "Rs. 54,000", "Rs. 60,000", "Rs. 66,000"],
            'correct_index': 1
        },
        {
            'id': 4,
            'text': "If log 2 = 0.30103, what is the number of digits in 2^64?",
            'options': ["18", "19", "20", "21"],
            'correct_index': 2
        },
        {
            'id': 5,
            'text': "A train running at the speed of 60 km/hr crosses a pole in 9 seconds. What is the length of the train?",
            'options': ["120 metres", "180 metres", "324 metres", "150 metres"],
            'correct_index': 3
        },
        {
            'id': 6,
            'text': "Two numbers are in the ratio 3 : 5. If 9 is subtracted from each, the new numbers are in the ratio 12 : 23. The smaller number is:",
            'options': ["27", "33", "49", "55"],
            'correct_index': 1
        },
        {
            'id': 7,
            'text': "The average age of husband, wife and their child 3 years ago was 27 years and that of wife and the child 5 years ago was 20 years. The present age of the husband is:",
            'options': ["35 years", "40 years", "50 years", "45 years"],
            'correct_index': 1
        },
        {
            'id': 8,
            'text': "In how many different ways can the letters of the word 'DETAIL' be arranged in such a way that the vowels always occupy even places?",
            'options': ["36", "48", "144", "120"],
            'correct_index': 0
        },
        {
            'id': 9,
            'text': "What is the probability of getting a sum 9 from two throws of a dice?",
            'options': ["1/6", "1/8", "1/9", "1/12"],
            'correct_index': 2
        },
        {
            'id': 10,
            'text': "A and B can do a work in 12 days, B and C in 15 days, C and A in 20 days. If A, B, C work together, they will complete the work in:",
            'options': ["5 days", "7.5 days", "10 days", "15 days"],
            'correct_index': 2
        }
    ]

    sample_questions_02 = [
        {
            'id': 1,
            'text': "Pointing to a photograph, a man said, 'I have no brother or sister but that man's father is my father's son.' Whose photograph was it?",
            'options': ["His own", "His son's", "His father's", "His nephew's"],
            'correct_index': 1
        },
        {
            'id': 2,
            'text': "Look at this series: 21, 9, 21, 11, 21, 13, 21, ... What number should come next?",
            'options': ["14", "15", "21", "23"],
            'correct_index': 1
        },
        {
            'id': 3,
            'text': "SCD, TEF, UGH, ____, WKL. What should fit in the blank?",
            'options': ["CMN", "UJI", "VIJ", "IJT"],
            'correct_index': 2
        },
        {
            'id': 4,
            'text': "In a row of 40 boys, Richard was shifted 4 places to his right and became 10th from the right end. What was his original position from the left end of the row?",
            'options': ["24th", "25th", "26th", "27th"],
            'correct_index': 3
        },
        {
            'id': 5,
            'text': "If 'A + B' means A is the brother of B; 'A - B' means A is the sister of B and 'A x B' means A is the father of B. Which of the following means C is the son of M?",
            'options': ["M - N x C + F", "F - C + N x M", "N + M - F x C", "M x C - N + F"],
            'correct_index': 0
        },
        {
            'id': 6,
            'text': "A man walks 5 km toward south and then turns to the right. After walking 3 km he turns to the left and walks 5 km. Now in which direction is he from the starting place?",
            'options': ["West", "South", "North-East", "South-West"],
            'correct_index': 3
        },
        {
            'id': 7,
            'text': "Statements: All bags are pockets. All pockets are pouches. Conclusions: 1. All bags are pouches. 2. Some pouches are bags.",
            'options': ["Only conclusion 1 follows", "Only conclusion 2 follows", "Either 1 or 2 follows", "Both 1 and 2 follow"],
            'correct_index': 3
        },
        {
            'id': 8,
            'text': "Find the odd one out: Geometry, Algebra, Trigonometry, Calculus, Physics.",
            'options': ["Calculus", "Physics", "Algebra", "Trigonometry"],
            'correct_index': 1
        },
        {
            'id': 9,
            'text': "In a certain code, COMPUTER is written as RFUVQNPC. How is MEDICINE written in that code?",
            'options': ["EOJDJEFM", "EOJDEJFM", "MFEJDJOE", "DJFMEOJD"],
            'correct_index': 1
        },
        {
            'id': 10,
            'text': "A, B, C, D and E are sitting on a bench. A is next to B, C is next to D, D is not sitting with E who is on the left end of the bench. C is on the second position from the right. A is to the right of B and E. A and C are sitting together. In which position is A sitting?",
            'options': ["Between B and D", "Between B and C", "Between E and D", "Between C and E"],
            'correct_index': 1
        }
    ]

    sample_questions_03 = [
        {
            'id': 1,
            'text': "Choose the word which is most nearly the SAME in meaning to: 'ADVERSITY'.",
            'options': ["Chance", "Capacity", "Misfortune", "Joy"],
            'correct_index': 2
        },
        {
            'id': 2,
            'text': "Choose the word which is most nearly the OPPOSITE in meaning to: 'ENTHUSIASTIC'.",
            'options': ["Apathetic", "Eager", "Zealous", "Warm"],
            'correct_index': 0
        },
        {
            'id': 3,
            'text': "Find the correctly spelled word.",
            'options': ["Receive", "Recieve", "Recive", "Receeve"],
            'correct_index': 0
        },
        {
            'id': 4,
            'text': "Fill in the blank: The team was so ______ by the constant delays that they almost gave up on the project.",
            'options': ["exhilarated", "dispirited", "motivated", "neutralized"],
            'correct_index': 1
        },
        {
            'id': 5,
            'text': "Identify the grammatical error: 'Neither of the two candidates have completed their application on time.'",
            'options': ["Neither of the", "have completed", "their application", "on time"],
            'correct_index': 1
        },
        {
            'id': 6,
            'text': "Choose the synonym for 'OBSTINATE'.",
            'options': ["Stubborn", "Flexible", "Malleable", "Submissive"],
            'correct_index': 0
        },
        {
            'id': 7,
            'text': "Complete the phrase: 'To throw in the ______' means to admit defeat or surrender.",
            'options': ["bucket", "sponge", "towel", "water"],
            'correct_index': 2
        },
        {
            'id': 8,
            'text': "Choose the antonym for 'BENEVOLENT'.",
            'options': ["Kind", "Malevolent", "Generous", "Helpful"],
            'correct_index': 1
        },
        {
            'id': 9,
            'text': "Identify the correct active voice of: 'The lesson was taught by the professor.'",
            'options': ["The professor teaches the lesson.", "The professor taught the lesson.", "The professor was teaching the lesson.", "The lesson is taught by the professor."],
            'correct_index': 1
        },
        {
            'id': 10,
            'text': "What is the one-word substitution for: 'A person who writes dictionaries'?",
            'options': ["Lexicographer", "Cartographer", "Biographer", "Calligrapher"],
            'correct_index': 0
        }
    ]

    if '02' in test_name:
        selected_questions = sample_questions_02
    elif '03' in test_name:
        selected_questions = sample_questions_03
    else:
        selected_questions = sample_questions_01

    num_questions = 10
    duration_minutes = 15
    if 'Marathon' in mode:
        num_questions = 10
        duration_minutes = 60
    elif 'Master' in mode:
        num_questions = 10
        duration_minutes = 30

    questions_to_send = selected_questions[:num_questions]

    # Convert correct index to correct label (A, B, C, D) for the explanation report
    labels = ["A", "B", "C", "D"]
    for q in questions_to_send:
        q['correct_label'] = labels[q['correct_index']]
        q['explanation'] = "This is a detailed explanation of the solution based on core concepts of the topic."

    return render(request, 'mock_test_session.html', {
        'mode': mode,
        'subject': subject,
        'topic': topic,
        'module': module,
        'test_name': test_name,
        'duration_seconds': duration_minutes * 60,
        'duration_minutes': duration_minutes,
        'questions': questions_to_send,
        'questions_json': json.dumps(questions_to_send)
    })

def blog_view(request):
    posts = [
        {
            'id': 1,
            'title': 'Mastering Quantitative Aptitude: Tips & Shortcuts',
            'summary': 'Quantitative aptitude can be a game-changer in competitive exams. Learn the top tips, tricks, and calculation shortcuts to solve complex math problems in seconds.',
            'category': 'Aptitude',
            'author': 'Dr. Alok Verma',
            'date': 'June 20, 2026',
            'read_time': '5 min read',
            'image_url': 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=600',
            'featured': True,
            'tags': ['Math', 'ExamPrep', 'Shortcuts']
        },
        {
            'id': 2,
            'title': 'How to Build a Powerful English Vocabulary',
            'summary': 'Vocabulary is not built overnight. Explore systematic vocabulary methods like root words, mnemonic techniques, and contextual reading to dramatically boost your word power.',
            'category': 'Verbal Ability',
            'author': 'Sarah Jenkins',
            'date': 'June 18, 2026',
            'read_time': '4 min read',
            'image_url': 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80&w=600',
            'featured': False,
            'tags': ['Vocabulary', 'English', 'LearningTips']
        },
        {
            'id': 3,
            'title': 'The Psychology of Mock Tests: Managing Exam Anxiety',
            'summary': 'Ever panicked during a mock test despite preparation? Discover science-backed psychological strategies to maintain your calm and focus under pressure.',
            'category': 'Exam Strategy',
            'author': 'Dr. Rohan Mehra',
            'date': 'June 15, 2026',
            'read_time': '6 min read',
            'image_url': 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&q=80&w=600',
            'featured': False,
            'tags': ['Mindset', 'Anxiety', 'ExamTips']
        },
        {
            'id': 4,
            'title': 'Time Management in Competitive Exams: The 3-Round Strategy',
            'summary': 'Dividing your exam time into three strategic rounds can increase your attempt count by up to 20%. Read this step-by-step implementation guide.',
            'category': 'Exam Strategy',
            'author': 'Aditi Rao (CAT 99.9%iler)',
            'date': 'June 12, 2026',
            'read_time': '7 min read',
            'image_url': 'https://images.unsplash.com/photo-1508962914676-134849a727f0?auto=format&fit=crop&q=80&w=600',
            'featured': False,
            'tags': ['TimeManagement', 'Strategy', 'Tips']
        },
        {
            'id': 5,
            'title': 'Top 10 Logical Reasoning Patterns You Must Know',
            'summary': 'Logical reasoning is highly structured. Recognizing these 10 core patterns in puzzles, coding-decoding, and syllogisms will save you vital minutes.',
            'category': 'Logical Reasoning',
            'author': 'Vikram Aditya',
            'date': 'June 09, 2026',
            'read_time': '5 min read',
            'image_url': 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=600',
            'featured': False,
            'tags': ['LogicalReasoning', 'Puzzles', 'Patterns']
        }
    ]
    categories = ['All', 'Aptitude', 'Verbal Ability', 'Logical Reasoning', 'Exam Strategy']
    return render(request, 'blog.html', {
        'posts': posts,
        'categories': categories
    })




