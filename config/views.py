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
    return render(request, 'login.html')

def signup_view(request):
    return render(request, 'signup.html')


