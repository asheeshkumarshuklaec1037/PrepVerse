from django.shortcuts import render, redirect, get_object_or_404
from django.http import Http404
from . import data


def courses_view(request, section_slug=None):
    section = data.get_section(section_slug) if section_slug else None
    if section_slug and not section:
        raise Http404("No such course section")

    courses = data.get_courses(section_slug)
    sections = data.get_sections()

    return render(request, 'courses/courses.html', {
        'courses': courses,
        'sections': sections,
        'active_section': section,
    })


def daily_challenges(request):
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
    return render(request, 'courses/daily_challenges.html', {'questions': daily_questions})


def course_detail(request, course_slug):
    course = data.get_course(course_slug)
    if not course:
        raise Http404("No such course")

    return render(request, 'courses/course_detail.html', {
        'course': course,
        'courses': data.get_courses(),
        'recommended_books': data.get_books_for_course(course_slug),
    })


def topic_detail(request, course_slug, topic_slug):
    course = data.get_course(course_slug)
    if not course:
        raise Http404("No such course")
    topic = data.get_topic(course, topic_slug)
    if not topic:
        raise Http404("No such topic")

    return render(request, 'courses/topic_detail.html', {'course': course, 'topic': topic})


def module_detail(request, course_slug, topic_slug, module_name):
    course = data.get_course(course_slug)
    if not course:
        raise Http404("No such course")
    topic = data.get_topic(course, topic_slug)
    if not topic:
        raise Http404("No such topic")

    return render(request, 'courses/module_detail.html', {
        'course': course,
        'topic': topic,
        'module_name': module_name,
        'questions': data.get_sample_questions(),
    })


def recommended_books_view(request):
    return render(request, 'courses/recommended_books.html', {'books': data.BOOKS})
