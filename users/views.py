from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
import json

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
        {'title': 'Quantitative Aptitude', 'icon': 'fa-calculator', 'color': '#fccb90', 'count': 450, 'progress': 45, 'image': 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=500&auto=format&fit=crop'},
        {'title': 'Logical Reasoning', 'icon': 'fa-puzzle-piece', 'color': '#2af598', 'count': 320, 'progress': 60, 'image': 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?q=80&w=500&auto=format&fit=crop'},
        {'title': 'Verbal Ability', 'icon': 'fa-book-open', 'color': '#ff9a9e', 'count': 280, 'progress': 30, 'image': 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=500&auto=format&fit=crop'},
        {'title': 'Data Interpretation', 'icon': 'fa-chart-pie', 'color': '#009efd', 'count': 150, 'progress': 15, 'image': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=500&auto=format&fit=crop'},
    ]

    recent_challenges = [
        {'title': 'Time, Speed & Distance Masterclass', 'type': 'Quant', 'difficulty': 'Hard', 'time': '15 min'},
        {'title': 'Syllogism Tricks & Shortcuts', 'type': 'Logic', 'difficulty': 'Medium', 'time': '10 min'},
        {'title': 'Reading Comprehension Advanced', 'type': 'Verbal', 'difficulty': 'Hard', 'time': '20 min'},
    ]

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
            'tags': ['Math', 'ExamPrep', 'Shortcuts'],
            'views': '98.8K',
            'likes': '45.6K',
            'comments_count': '10K'
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
            'tags': ['Vocabulary', 'English', 'LearningTips'],
            'views': '76.4K',
            'likes': '32.1K',
            'comments_count': '8.5K'
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
            'tags': ['Mindset', 'Anxiety', 'ExamTips'],
            'views': '54.2K',
            'likes': '22.8K',
            'comments_count': '5.2K'
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
            'tags': ['TimeManagement', 'Strategy', 'Tips'],
            'views': '88.3K',
            'likes': '39.4K',
            'comments_count': '9.1K'
        }
    ]

    return render(request, 'users/dashboard.html', {
        'stats': stats,
        'categories': categories,
        'recent_challenges': recent_challenges,
        'posts': posts
    })


def login_view(request):
    print("DEBUG: login_view called with method:", request.method)
    if request.user.is_authenticated:
        next_url = request.GET.get('next') or request.POST.get('next')
        if next_url:
            return redirect(next_url)
        return redirect('dashboard')

    if request.method == 'POST':
        email = request.POST.get('email', '').strip().lower()
        password = request.POST.get('password', '')

        if not email or not password:
            return render(request, 'users/login.html', {'error': 'Please fill in all fields.'})

        # Authenticate user. Since username = email:
        user = authenticate(request, username=email, password=password)

        if user is not None:
            login(request, user)
            next_url = request.GET.get('next') or request.POST.get('next')
            if next_url:
                return redirect(next_url)
            return redirect('dashboard')
        else:
            # Check if user exists to give more specific error
            if not User.objects.filter(email=email).exists():
                return render(request, 'users/login.html', {'error': 'No account found with this email address.'})
            else:
                return render(request, 'users/login.html', {'error': 'Incorrect password. Please try again.'})

    return render(request, 'users/login.html')


def signup_view(request):
    print("DEBUG: signup_view called with method:", request.method)
    if request.user.is_authenticated:
        next_url = request.GET.get('next') or request.POST.get('next')
        if next_url:
            return redirect(next_url)
        return redirect('dashboard')
        
    if request.method == 'POST':
        first_name = request.POST.get('first_name', '').strip()
        last_name = request.POST.get('last_name', '').strip()
        email = request.POST.get('email', '').strip().lower()
        password = request.POST.get('password', '')

        # Basic validations
        if not first_name or not last_name or not email or not password:
            return render(request, 'users/signup.html', {'error': 'All fields are required.'})
            
        if User.objects.filter(email=email).exists():
            return render(request, 'users/signup.html', {'error': 'An account with this email already exists.'})
            
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
            next_url = request.GET.get('next') or request.POST.get('next')
            if next_url:
                return redirect(next_url)
            return redirect('dashboard')
        except Exception as e:
            return render(request, 'users/signup.html', {'error': f'Something went wrong: {str(e)}'})

    return render(request, 'users/signup.html')


def logout_view(request):
    logout(request)
    return redirect('home')


def bookmarks_view(request):
    if not request.user.is_authenticated:
        return redirect('login')
    return render(request, 'users/bookmarks.html')


def leaderboard_view(request):
    if not request.user.is_authenticated:
        return redirect('login')
    
    user_name = f"{request.user.first_name or 'Candidate'} {request.user.last_name or ''}".strip()
    
    leaderboard_data = [
        {'rank': 1, 'name': 'Aarav Sharma', 'xp': 2850, 'solved': 412, 'accuracy': '96.8%', 'streak': '24 Days', 'tier': 'Grandmaster', 'badge_color': '#fbcd0b', 'trend': 'up', 'change': '+1', 'avatar': 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=150&auto=format&fit=crop', 'topic': 'Quant Blitz'},
        {'rank': 2, 'name': 'Priya Patel', 'xp': 2640, 'solved': 385, 'accuracy': '94.2%', 'streak': '18 Days', 'tier': 'Grandmaster', 'badge_color': '#e2e8f0', 'trend': 'down', 'change': '-1', 'avatar': 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop', 'topic': 'Logical Reasoning'},
        {'rank': 3, 'name': 'Rohan Verma', 'xp': 2410, 'solved': 350, 'accuracy': '92.5%', 'streak': '15 Days', 'tier': 'Master', 'badge_color': '#b45309', 'trend': 'up', 'change': '+3', 'avatar': 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?q=80&w=150&auto=format&fit=crop', 'topic': 'Data Interpretation'},
        {'rank': 4, 'name': 'Ananya Gupta', 'xp': 2190, 'solved': 318, 'accuracy': '91.0%', 'streak': '12 Days', 'tier': 'Master', 'badge_color': '#c084fc', 'trend': 'same', 'change': '0', 'avatar': 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop', 'topic': 'Verbal Ability'},
        {'rank': 5, 'name': 'Karan Malhotra', 'xp': 1980, 'solved': 290, 'accuracy': '89.4%', 'streak': '9 Days', 'tier': 'Diamond', 'badge_color': '#38bdf8', 'trend': 'up', 'change': '+2', 'avatar': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop', 'topic': 'Quant Blitz'},
        {'rank': 6, 'name': 'Sneha Reddy', 'xp': 1750, 'solved': 265, 'accuracy': '88.1%', 'streak': '7 Days', 'tier': 'Diamond', 'badge_color': '#38bdf8', 'trend': 'down', 'change': '-2', 'avatar': 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=150&auto=format&fit=crop', 'topic': 'Logical Reasoning'},
        {'rank': 7, 'name': f"{user_name} (You)", 'xp': 1450, 'solved': 184, 'accuracy': '87.5%', 'streak': '5 Days', 'tier': 'Platinum', 'badge_color': '#2af598', 'trend': 'up', 'change': '+4', 'avatar': '/static/images/candidate_profile_avatar.jpg', 'topic': 'Quant Blitz', 'is_user': True},
        {'rank': 8, 'name': 'Vikram Singh', 'xp': 1380, 'solved': 210, 'accuracy': '85.0%', 'streak': '4 Days', 'tier': 'Platinum', 'badge_color': '#2af598', 'trend': 'down', 'change': '-1', 'avatar': '', 'topic': 'Verbal Ability'},
        {'rank': 9, 'name': 'Meera Joshi', 'xp': 1250, 'solved': 195, 'accuracy': '84.2%', 'streak': '6 Days', 'tier': 'Gold', 'badge_color': '#fbcd0b', 'trend': 'up', 'change': '+1', 'avatar': '', 'topic': 'Data Interpretation'},
        {'rank': 10, 'name': 'Kabir Nair', 'xp': 1120, 'solved': 170, 'accuracy': '82.8%', 'streak': '3 Days', 'tier': 'Gold', 'badge_color': '#fbcd0b', 'trend': 'same', 'change': '0', 'avatar': '', 'topic': 'Quant Blitz'},
    ]
    
    return render(request, 'users/leaderboard.html', {
        'leaderboard': leaderboard_data,
        'top_three': leaderboard_data[:3],
        'user_rank': next((item for item in leaderboard_data if item.get('is_user')), leaderboard_data[6])
    })

def solved_questions_view(request):
    if not request.user.is_authenticated:
        return redirect('login')
        
    # Generate 120 mock solved questions
    import random
    from django.core.paginator import Paginator
    
    subjects = ["Quantitative Aptitude", "Logical Reasoning", "Verbal Ability", "Data Interpretation"]
    topics = {
        "Quantitative Aptitude": ["Number Systems", "Percentages", "Profit & Loss", "Time & Work", "Algebra"],
        "Logical Reasoning": ["Blood Relations", "Syllogisms", "Seating Arrangement", "Analogy"],
        "Verbal Ability": ["Synonyms & Antonyms", "Tenses", "Reading Comprehension", "Active Voice"],
        "Data Interpretation": ["Pie Charts", "Bar Graphs", "Line Graphs"]
    }
    
    solved_list = []
    # Seed random for consistent mock data
    random.seed(42)
    
    for i in range(1, 121):
        subj = subjects[i % len(subjects)]
        topic = topics[subj][i % len(topics[subj])]
        is_correct = (i % 5 != 0) # 80% accuracy
        solved_list.append({
            'id': i,
            'subject': subj,
            'topic': topic,
            'question_text': f"Which of the following statements correctly solves the aptitude question number {i} regarding {topic}?",
            'selected_option': f"Option {chr(65 + (i % 4))}",
            'correct_option': f"Option {chr(65 + (i % 4) if is_correct else 65 + ((i + 1) % 4))}",
            'status': "Correct" if is_correct else "Incorrect",
            'date_solved': f"July {19 - (i // 10):02d}, 2026"
        })
        
    # Read query and filter status
    q = request.GET.get('q', '').strip()
    status_filter = request.GET.get('status', 'all')
    
    # Apply search filter
    if q:
        solved_list = [
            item for item in solved_list
            if q.lower() in item['question_text'].lower() 
            or q.lower() in item['topic'].lower() 
            or q.lower() in item['subject'].lower()
        ]
        
    # Apply status filter
    if status_filter == 'correct':
        solved_list = [item for item in solved_list if item['status'] == 'Correct']
    elif status_filter == 'incorrect':
        solved_list = [item for item in solved_list if item['status'] == 'Incorrect']
    paginator = Paginator(solved_list, 50)
    page_number = request.GET.get('page', 1)
    page_obj = paginator.get_page(page_number)
    
    return render(request, 'users/solved_questions.html', {
        'page_obj': page_obj,
        'total_count': len(solved_list),
        'q': q,
        'status_filter': status_filter
    })



def calendar_view(request):
    if not request.user.is_authenticated:
        return redirect('login')
    return render(request, 'users/calendar.html')
