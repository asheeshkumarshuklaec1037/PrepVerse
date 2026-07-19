from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
import json

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
    return render(request, 'blog/blog.html', {
        'posts': posts,
        'categories': categories
    })


def blog_detail_view(request, post_id):
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
            'tags': ['LogicalReasoning', 'Puzzles', 'Patterns'],
            'views': '61.5K',
            'likes': '28.2K',
            'comments_count': '6.4K'
        }
    ]
    post = next((p for p in posts if p['id'] == post_id), posts[0])
    return render(request, 'blog/blog_detail.html', {
        'post': post,
        'posts': posts
    })



