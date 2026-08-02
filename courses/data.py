# courses/data.py
#
# SINGLE SOURCE OF TRUTH for all course content.
# Every view (home, courses list, course detail, topic detail, module detail)
# imports from here instead of keeping its own copy — that duplication is what
# broke consistency before (module_detail's course list had only 2 of 4 courses).
#
# --- How to add a new SECTION later (e.g. "SSC", "TCS Placement") ---
# 1. Add one entry to SECTIONS below.
# 2. Add courses to COURSES with 'section' set to that section's slug.
# That's it — no URL changes, no view changes, no template changes needed.
# courses.html automatically shows section tabs once len(SECTIONS) > 1.

SECTIONS = [
    {
        'slug': 'placement-prep',
        'title': 'Placement Preparation',
        'description': 'Aptitude, reasoning and verbal courses for campus and off-campus placements.',
    },
    # Future sections go here, e.g.:
    # {'slug': 'ssc', 'title': 'SSC Exams', 'description': '...'},
    # {'slug': 'high-school', 'title': 'High School', 'description': '...'},
    # {'slug': 'inter', 'title': 'Intermediate (11th-12th)', 'description': '...'},
    # {'slug': 'tcs-placement', 'title': 'TCS Placement', 'description': '...'},
]

COURSES = [
    {
        'slug': 'aptitude-mastery',
        'section': 'placement-prep',
        'title': 'Aptitude Mastery',
        'description': 'Master logical and numerical problem solving for top company placements with our expert-led modules.',
        'detailed_description': 'This comprehensive course is designed to sharpen your numerical, logical, and verbal aptitude. Whether you are preparing for campus placements, competitive exams, or professional certifications, our curated modules provide the foundational knowledge and advanced techniques needed to excel.',
        'icon': 'fa-brain',
        'gradient': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'bg_image': 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop',
        'tags': ['Best Seller', '12 Modules', 'Beginner'],
        'subject': 'Aptitude',
        'topics': [
            {'slug': 'quantitative-aptitude', 'title': 'Quantitative Aptitude', 'subtopics': ['Number Systems', 'Percentages', 'Profit & Loss', 'Time & Work']},
            {'slug': 'logical-reasoning', 'title': 'Logical Reasoning', 'subtopics': ['Blood Relations', 'Syllogisms', 'Seating Arrangement', 'Data Sufficiency']},
            {'slug': 'data-interpretation', 'title': 'Data Interpretation', 'subtopics': ['Pie Charts', 'Bar Graphs', 'Line Graphs', 'Caselets']},
        ],
    },
    {
        'slug': 'logical-reasoning',
        'section': 'placement-prep',
        'title': 'Logical Reasoning',
        'description': 'Enhance your critical thinking and logical analysis skills for competitive exams through interactive challenges.',
        'detailed_description': 'Logical reasoning is the backbone of problem-solving. This course focuses on developing your ability to analyze patterns, structures, and relationships. Through a series of interactive challenges and real-world scenarios, you will learn to approach complex problems with a structured mindset.',
        'icon': 'fa-puzzle-piece',
        'gradient': 'linear-gradient(135deg, #2af598 0%, #009efd 100%)',
        'bg_image': 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=2104&auto=format&fit=crop',
        'tags': ['New', '8 Modules', 'Intermediate'],
        'subject': 'Reasoning',
        'topics': [
            {'slug': 'verbal-reasoning', 'title': 'Verbal Reasoning', 'subtopics': ['Analogy', 'Classification', 'Series Completion', 'Coding-Decoding']},
            {'slug': 'analytical-reasoning', 'title': 'Analytical Reasoning', 'subtopics': ['Statements & Assumptions', 'Arguments', 'Conclusions', 'Course of Action']},
            {'slug': 'non-verbal-reasoning', 'title': 'Non-Verbal Reasoning', 'subtopics': ['Mirror Images', 'Paper Folding', 'Cube & Dice', 'Pattern Completion']},
        ],
    },
    {
        'slug': 'english-proficiency',
        'section': 'placement-prep',
        'title': 'English Proficiency',
        'description': 'Improve your vocabulary, grammar, and comprehension for verbal ability tests with daily practice sets.',
        'detailed_description': 'Communication is key to success in any field. This course is designed to enhance your verbal ability, focusing on grammar, vocabulary building, and reading comprehension. With daily practice sets and expert feedback, you will gain the confidence to communicate effectively in professional and academic environments.',
        'icon': 'fa-book-open',
        'gradient': 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
        'bg_image': 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=1973&auto=format&fit=crop',
        'tags': ['Essential', '15 Modules', 'All Levels'],
        'subject': 'Verbal',
        'topics': [
            {'slug': 'grammar-essentials', 'title': 'Grammar Essentials', 'subtopics': ['Parts of Speech', 'Tenses', 'Active & Passive Voice', 'Direct & Indirect Speech']},
            {'slug': 'vocabulary-building', 'title': 'Vocabulary Building', 'subtopics': ['Synonyms & Antonyms', 'Idioms & Phrases', 'One-word Substitutions', 'Spelling Rules']},
            {'slug': 'reading-comprehension', 'title': 'Reading Comprehension', 'subtopics': ['Main Idea Identification', 'Inference Making', 'Vocabulary in Context', 'Tone & Style']},
        ],
    },
    {
        'slug': 'quantitative-aptitude',
        'section': 'placement-prep',
        'title': 'Quantitative Aptitude',
        'description': 'Advanced mathematics and quantitative techniques for data-driven success in every competitive field.',
        'detailed_description': "In today's data-driven world, quantitative skills are more important than ever. This course covers advanced mathematical concepts and quantitative techniques used in finance, technology, and analytics. You will learn to manipulate data, identify trends, and make informed decisions based on quantitative evidence.",
        'icon': 'fa-calculator',
        'gradient': 'linear-gradient(135deg, #fccb90 0%, #d57eeb 100%)',
        'bg_image': 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=2070&auto=format&fit=crop',
        'tags': ['Advanced', '20 Modules', 'Hard'],
        'subject': 'Technical',
        'topics': [
            {'slug': 'arithmetic', 'title': 'Arithmetic', 'subtopics': ['Ratio & Proportion', 'Average', 'Partnership', 'Mixtures & Alligations']},
            {'slug': 'algebra', 'title': 'Algebra', 'subtopics': ['Linear Equations', 'Quadratic Equations', 'Inequalities', 'Logarithms']},
            {'slug': 'modern-math', 'title': 'Modern Math', 'subtopics': ['Permutations & Combinations', 'Probability', 'Set Theory', 'Geometry']},
        ],
    },
]

# Recommended books, linked to a course by slug — replaces the old pattern of
# hardcoding "if course.id == 0 or course.id == 3" blocks inside templates.
BOOKS = [
    {'course': 'quantitative-aptitude', 'title': 'Quantitative Aptitude for Competitive Examinations', 'author': 'Dr. R.S. Aggarwal', 'price': '₹550',
     'image': 'https://images-na.ssl-images-amazon.com/images/I/81o1cWd-L5L.jpg', 'link': 'https://www.amazon.in/s?k=quantitative+aptitude+rs+aggarwal&tag=prepverse0d-21'},
    {'course': 'quantitative-aptitude', 'title': 'Fast Track Objective Arithmetic', 'author': 'Rajesh Verma', 'price': '₹310',
     'image': 'https://images-na.ssl-images-amazon.com/images/I/71nZ+0x1P5L.jpg', 'link': 'https://www.amazon.in/s?k=fast+track+objective+arithmetic+rajesh+verma&tag=prepverse0d-21'},
    {'course': 'aptitude-mastery', 'title': 'Quantitative Aptitude for Competitive Examinations', 'author': 'Dr. R.S. Aggarwal', 'price': '₹550',
     'image': 'https://images-na.ssl-images-amazon.com/images/I/81o1cWd-L5L.jpg', 'link': 'https://www.amazon.in/s?k=quantitative+aptitude+rs+aggarwal&tag=prepverse0d-21'},
    {'course': 'aptitude-mastery', 'title': 'Fast Track Objective Arithmetic', 'author': 'Rajesh Verma', 'price': '₹310',
     'image': 'https://images-na.ssl-images-amazon.com/images/I/71nZ+0x1P5L.jpg', 'link': 'https://www.amazon.in/s?k=fast+track+objective+arithmetic+rajesh+verma&tag=prepverse0d-21'},
    {'course': 'logical-reasoning', 'title': 'A Modern Approach to Verbal & Non-Verbal Reasoning', 'author': 'Dr. R.S. Aggarwal', 'price': '₹620',
     'image': 'https://images-na.ssl-images-amazon.com/images/I/81bS4LwHk-L.jpg', 'link': 'https://www.amazon.in/s?k=verbal+and+non+verbal+reasoning+rs+aggarwal&tag=prepverse0d-21'},
    {'course': 'logical-reasoning', 'title': 'How to Prepare for Logical Reasoning for CAT', 'author': 'Arun Sharma', 'price': '₹590',
     'image': 'https://images-na.ssl-images-amazon.com/images/I/71+ZqY3UjXL.jpg', 'link': 'https://www.amazon.in/s?k=logical+reasoning+arun+sharma&tag=prepverse0d-21'},
    {'course': 'english-proficiency', 'title': 'Word Power Made Easy', 'author': 'Norman Lewis', 'price': '₹150',
     'image': 'https://images-na.ssl-images-amazon.com/images/I/818e+gq5V5L.jpg', 'link': 'https://www.amazon.in/s?k=word+power+made+easy&tag=prepverse0d-21'},
    {'course': 'english-proficiency', 'title': 'High School English Grammar and Composition', 'author': 'Wren & Martin', 'price': '₹380',
     'image': 'https://images-na.ssl-images-amazon.com/images/I/81N0mRCE-IL.jpg', 'link': 'https://www.amazon.in/s?k=wren+and+martin&tag=prepverse0d-21'},
]

# Sample practice questions, keyed by "course-slug/topic-slug/module-name" so
# module_detail can look them up. Placeholder set reused for now — replace
# with real per-module content as it's written; the lookup shape won't change.
_SAMPLE_QUESTIONS = [
    {'id': 1, 'text': 'Look at this series: 2, 1, (1/2), (1/4), ... What number should come next?',
     'options': ['(1/3)', '(1/8)', '(2/8)', '(1/16)'], 'correct_index': 1, 'correct_label': 'B',
     'explanation': 'Each number is one-half of the previous number: 4/2=2, 2/2=1, 1/2=1/2, (1/2)/2=1/4, (1/4)/2=1/8.'},
    {'id': 2, 'text': 'Look at this series: 7, 10, 8, 11, 9, 12, ... What number should come next?',
     'options': ['7', '10', '12', '13'], 'correct_index': 1, 'correct_label': 'B',
     'explanation': 'Alternating +3/-2 series: 7+3=10, 10-2=8, 8+3=11, 11-2=9, 9+3=12, 12-2=10.'},
    {'id': 3, 'text': 'Look at this series: 36, 34, 30, 28, 24, ... What number should come next?',
     'options': ['20', '22', '23', '26'], 'correct_index': 1, 'correct_label': 'B',
     'explanation': 'Alternating -2/-4 series: 36-2=34, 34-4=30, 30-2=28, 28-4=24, 24-2=22.'},
]


def get_sections():
    return SECTIONS


def get_section(slug):
    return next((s for s in SECTIONS if s['slug'] == slug), None)


def get_courses(section_slug=None):
    if section_slug:
        return [c for c in COURSES if c['section'] == section_slug]
    return COURSES


def get_course(slug):
    return next((c for c in COURSES if c['slug'] == slug), None)


def get_topic(course, topic_slug):
    if not course:
        return None
    return next((t for t in course['topics'] if t['slug'] == topic_slug), None)


def get_books_for_course(course_slug):
    return [b for b in BOOKS if b['course'] == course_slug]


def get_sample_questions():
    # Same placeholder bank for every module until real content/models exist.
    return _SAMPLE_QUESTIONS
