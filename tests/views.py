from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
import json

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

    return render(request, 'tests/practice.html', {
        'stats': stats,
        'categories': categories,
        'recent_challenges': recent_challenges
    })


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
    return render(request, 'tests/mock_tests.html', {
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

    return render(request, 'tests/mock_test_session.html', {
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


def mock_history_view(request):
    if not request.user.is_authenticated:
        return redirect('login')
        
    history_data = [
        # --- MODULE BLITZ ATTEMPTS ---
        {
            'id': 'mock-01',
            'test_name': 'Mock Test 01 - Quant Essentials',
            'subject': 'Quantitative Aptitude',
            'mode': 'Module Blitz',
            'date': '2026-06-20',
            'score': 32,
            'max_score': 40,
            'correct': 8,
            'wrong': 0,
            'unanswered': 2,
            'accuracy': 100,
            'duration': '11:45',
            'percentile': 92,
            'weak_topic': 'Inequalities',
            'strong_topic': 'Number Systems',
            'questions': [
                {
                    'text': "Find the greatest number that will divide 43, 91 and 183 so as to leave the same remainder in each case.",
                    'options': ["4", "7", "9", "13"],
                    'correct_index': 0,
                    'user_index': 0,
                    'explanation': "The HCF of (91-43), (183-91), and (183-43), i.e., HCF of 48, 92, and 140 is 4."
                },
                {
                    'text': "A sum of money at simple interest amounts to Rs. 815 in 3 years and to Rs. 854 in 4 years. What is the sum?",
                    'options': ["Rs. 650", "Rs. 690", "Rs. 698", "Rs. 700"],
                    'correct_index': 2,
                    'user_index': 2,
                    'explanation': "Interest for 1 year = 854 - 815 = 39. Interest for 3 years = 39 * 3 = 117. Sum = 815 - 117 = 698."
                },
                {
                    'text': "Three partners A, B, C start a business. Twice A's capital is equal to thrice B's capital and B's capital is four times C's capital. Find the share of B in a total profit of Rs. 1,48,500.",
                    'options': ["Rs. 48,000", "Rs. 54,000", "Rs. 60,000", "Rs. 66,000"],
                    'correct_index': 1,
                    'user_index': 1,
                    'explanation': "Ratio of capitals A:B:C is 6:4:1. Share of B = (4/11) * 1,48,500 = 54,000."
                }
            ]
        },
        {
            'id': 'mock-01b',
            'test_name': 'Mock Test 02 - Time & Work Sprint',
            'subject': 'Quantitative Aptitude',
            'mode': 'Module Blitz',
            'date': '2026-06-18',
            'score': 24,
            'max_score': 40,
            'correct': 6,
            'wrong': 2,
            'unanswered': 2,
            'accuracy': 75,
            'duration': '10:15',
            'percentile': 76,
            'weak_topic': 'Pipes & Cisterns',
            'strong_topic': 'Work Equivalencies',
            'questions': [
                {
                    'text': "A and B can do a work in 12 days, B and C in 15 days, C and A in 20 days. If A, B, C work together, they will complete the work in:",
                    'options': ["5 days", "7.5 days", "10 days", "15 days"],
                    'correct_index': 2,
                    'user_index': 2,
                    'explanation': "Total work units = 60. A+B=5, B+C=4, C+A=3 units/day. 2(A+B+C)=12 units/day => A+B+C = 6 units/day. Time taken = 60/6 = 10 days."
                },
                {
                    'text': "Two numbers are in the ratio 3 : 5. If 9 is subtracted from each, the new numbers are in the ratio 12 : 23. The smaller number is:",
                    'options': ["27", "33", "49", "55"],
                    'correct_index': 1,
                    'user_index': 0,
                    'explanation': "(3x - 9) / (5x - 9) = 12 / 23. Solving yields x = 11. Smaller number is 3x = 33."
                }
            ]
        },
        {
            'id': 'mock-01c',
            'test_name': 'Mock Test 03 - Number Systems Speedrun',
            'subject': 'Quantitative Aptitude',
            'mode': 'Module Blitz',
            'date': '2026-06-16',
            'score': 35,
            'max_score': 40,
            'correct': 9,
            'wrong': 1,
            'unanswered': 0,
            'accuracy': 90,
            'duration': '07:40',
            'percentile': 96,
            'weak_topic': 'Remainders Theorem',
            'strong_topic': 'Factorisation',
            'questions': [
                {
                    'text': "Find the greatest number that will divide 43, 91 and 183 so as to leave the same remainder in each case.",
                    'options': ["4", "7", "9", "13"],
                    'correct_index': 0,
                    'user_index': 0,
                    'explanation': "The HCF of (91-43), (183-91), and (183-43), i.e., HCF of 48, 92, and 140 is 4."
                }
            ]
        },

        # --- TOPIC MASTER ATTEMPTS ---
        {
            'id': 'mock-02',
            'test_name': 'Mock Test 02 - Logical Reasoning Boost',
            'subject': 'Logical Reasoning',
            'mode': 'Topic Master',
            'date': '2026-06-15',
            'score': 23,
            'max_score': 40,
            'correct': 6,
            'wrong': 1,
            'unanswered': 3,
            'accuracy': 85,
            'duration': '14:20',
            'percentile': 78,
            'weak_topic': 'Statements & Assumptions',
            'strong_topic': 'Blood Relations',
            'questions': [
                {
                    'text': "Pointing to a photograph, a man said, 'I have no brother or sister but that man's father is my father's son.' Whose photograph was it?",
                    'options': ["His own", "His son's", "His father's", "His nephew's"],
                    'correct_index': 1,
                    'user_index': 1,
                    'explanation': "Since the narrator has no brother or sister, 'my father's son' is himself. So 'that man's father' is himself, which means the photo is of his son."
                },
                {
                    'text': "Look at this series: 21, 9, 21, 11, 21, 13, 21, ... What number should come next?",
                    'options': ["14", "15", "21", "23"],
                    'correct_index': 1,
                    'user_index': 1,
                    'explanation': "The series alternates 21 with odd numbers starting at 9: 9, 11, 13. The next odd number is 15."
                },
                {
                    'text': "SCD, TEF, UGH, ____, WKL. What should fit in the blank?",
                    'options': ["CMN", "UJI", "VIJ", "IJT"],
                    'correct_index': 2,
                    'user_index': 3,
                    'explanation': "The first letters follow alphabetical order: S, T, U, V, W. The second and third letters increase by one: CD, EF, GH, IJ, KL. So, VIJ."
                }
            ]
        },
        {
            'id': 'mock-02b',
            'test_name': 'Topic Test 01 - Arithmetic Composite',
            'subject': 'Quantitative Aptitude',
            'mode': 'Topic Master',
            'date': '2026-06-19',
            'score': 28,
            'max_score': 40,
            'correct': 7,
            'wrong': 0,
            'unanswered': 3,
            'accuracy': 100,
            'duration': '12:30',
            'percentile': 85,
            'weak_topic': 'Inequalities',
            'strong_topic': 'Number Systems',
            'questions': [
                {
                    'text': "A sum of money at simple interest amounts to Rs. 815 in 3 years and to Rs. 854 in 4 years. What is the sum?",
                    'options': ["Rs. 650", "Rs. 690", "Rs. 698", "Rs. 700"],
                    'correct_index': 2,
                    'user_index': 2,
                    'explanation': "Interest for 1 year = 854 - 815 = 39. Interest for 3 years = 39 * 3 = 117. Sum = 815 - 117 = 698."
                }
            ]
        },
        {
            'id': 'mock-02c',
            'test_name': 'Topic Test 03 - Data Interpretation Charts',
            'subject': 'Data Interpretation',
            'mode': 'Topic Master',
            'date': '2026-06-11',
            'score': 30,
            'max_score': 40,
            'correct': 8,
            'wrong': 2,
            'unanswered': 0,
            'accuracy': 80,
            'duration': '15:00',
            'percentile': 88,
            'weak_topic': 'Radar Charts',
            'strong_topic': 'Pie Charts',
            'questions': [
                {
                    'text': "If log 2 = 0.30103, what is the number of digits in 2^64?",
                    'options': ["18", "19", "20", "21"],
                    'correct_index': 2,
                    'user_index': 2,
                    'explanation': "log(2^64) = 64 * log 2 = 64 * 0.30103 = 19.26592. Number of digits is [19.26592] + 1 = 20."
                }
            ]
        },

        # --- SUBJECT MARATHON ATTEMPTS ---
        {
            'id': 'mock-03',
            'test_name': 'Mock Test 03 - Verbal Aptitude Core',
            'subject': 'Verbal Ability',
            'mode': 'Subject Marathon',
            'date': '2026-06-10',
            'score': 36,
            'max_score': 40,
            'correct': 9,
            'wrong': 0,
            'unanswered': 1,
            'accuracy': 100,
            'duration': '08:10',
            'percentile': 95,
            'weak_topic': 'Idioms & Phrases',
            'strong_topic': 'Grammar Essentials',
            'questions': [
                {
                    'text': "Choose the word which is most nearly the SAME in meaning to: 'ADVERSITY'.",
                    'options': ["Chance", "Capacity", "Misfortune", "Joy"],
                    'correct_index': 2,
                    'user_index': 2,
                    'explanation': "Adversity means a difficult or unpleasant situation, synonymous with misfortune."
                },
                {
                    'text': "Choose the word which is most nearly the OPPOSITE in meaning to: 'ENTHUSIASTIC'.",
                    'options': ["Apathetic", "Eager", "Zealous", "Warm"],
                    'correct_index': 0,
                    'user_index': 0,
                    'explanation': "Enthusiastic represents high energy/eagerness. The opposite is apathetic (lacking interest/enthusiasm)."
                },
                {
                    'text': "Find the correctly spelled word.",
                    'options': ["Receive", "Recieve", "Recive", "Receeve"],
                    'correct_index': 0,
                    'user_index': 0,
                    'explanation': "The correct spelling is 'Receive'. Remember the rule: 'i before e except after c'."
                }
            ]
        },
        {
            'id': 'mock-03b',
            'test_name': 'Subject Marathon - General Aptitude A',
            'subject': 'Quantitative Aptitude',
            'mode': 'Subject Marathon',
            'date': '2026-06-21',
            'score': 30,
            'max_score': 40,
            'correct': 8,
            'wrong': 2,
            'unanswered': 0,
            'accuracy': 80,
            'duration': '42:15',
            'percentile': 89,
            'weak_topic': 'Probability Puzzles',
            'strong_topic': 'Ratio & Proportion',
            'questions': [
                {
                    'text': "What is the probability of getting a sum 9 from two throws of a dice?",
                    'options': ["1/6", "1/8", "1/9", "1/12"],
                    'correct_index': 2,
                    'user_index': 2,
                    'explanation': "Favorable cases: (3,6), (4,5), (5,4), (6,3) = 4. Total cases = 36. Probability = 4/36 = 1/9."
                }
            ]
        },
        {
            'id': 'mock-03c',
            'test_name': 'Subject Marathon - Logical Skillset B',
            'subject': 'Logical Reasoning',
            'mode': 'Subject Marathon',
            'date': '2026-06-14',
            'score': 18,
            'max_score': 40,
            'correct': 5,
            'wrong': 2,
            'unanswered': 3,
            'accuracy': 71,
            'duration': '48:30',
            'percentile': 65,
            'weak_topic': 'Venn Diagrams',
            'strong_topic': 'Syllogisms',
            'questions': [
                {
                    'text': "Statements: All bags are pockets. All pockets are pouches. Conclusions: 1. All bags are pouches. 2. Some pouches are bags.",
                    'options': ["Only conclusion 1 follows", "Only conclusion 2 follows", "Either 1 or 2 follows", "Both 1 and 2 follow"],
                    'correct_index': 3,
                    'user_index': 3,
                    'explanation': "All bags are pockets and all pockets are pouches, which logically proves all bags are pouches. Since all bags are pouches, some pouches must be bags. Both follow."
                }
            ]
        }
    ]

    return render(request, 'tests/mock_history.html', {
        'history_json': json.dumps(history_data),
        'history': history_data
    })


