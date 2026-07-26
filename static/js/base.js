// Global UI Interactivity Script for PrepVerse
document.addEventListener("DOMContentLoaded", () => {
    // 1. Set active nav link dynamically
    document.querySelectorAll('.nav-links a').forEach(link => {
        const href = link.getAttribute('href');
        if (href && href !== '#' && (window.location.pathname === href || (href !== '/' && window.location.pathname.startsWith(href)))) {
            link.classList.add('active');
        } else if (href === '/' && window.location.pathname === '/') {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // 2. User menu dropdown toggle
    const avatarBtn = document.getElementById('userAvatarBtn');
    const dropdownMenu = document.getElementById('userDropdownMenu');
    if (avatarBtn && dropdownMenu) {
        avatarBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            dropdownMenu.classList.toggle('show');
        });
        document.addEventListener('click', function() {
            dropdownMenu.classList.remove('show');
        });
    }

    // 3. Sidebar Hover Toggle Logic
    const sidebarTrigger = document.getElementById('sidebarHoverTrigger');
    const sidebarMenu = document.getElementById('sidebarMenu');
    
    if (sidebarTrigger && sidebarMenu) {
        let closeTimeout;
        
        const openSidebar = () => {
            clearTimeout(closeTimeout);
            sidebarMenu.classList.add('active-hover');
        };
        
        const closeSidebar = () => {
            closeTimeout = setTimeout(() => {
                sidebarMenu.classList.remove('active-hover');
            }, 300);
        };
        
        sidebarTrigger.addEventListener('mouseenter', openSidebar);
        sidebarTrigger.addEventListener('mouseleave', closeSidebar);
        
        sidebarMenu.addEventListener('mouseenter', openSidebar);
        sidebarMenu.addEventListener('mouseleave', closeSidebar);
    }

    // 4. Highlight active sidebar route
    document.querySelectorAll('.sidebar-link').forEach(link => {
        const route = link.getAttribute('data-sidebar-route');
        if (route && (window.location.pathname.includes(route) || 
                      (route === 'dashboard' && window.location.pathname.endsWith('/dashboard/')) || 
                      (route === 'practice' && window.location.pathname.endsWith('/practice/')))) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // 5. Load custom profile avatar from localStorage if set
    const customAvatar = localStorage.getItem("prepverse-custom-avatar");
    if (customAvatar) {
        document.querySelectorAll("img").forEach(img => {
            if (img.src.includes("candidate_profile_avatar.jpg")) {
                img.src = customAvatar;
            }
        });
    }
});
