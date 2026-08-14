// Global Sidebar Toggle Handlers (Immune to Mobile Event Timing Delays)
window.togglePrepVerseSidebar = function(e) {
    if (e) {
        if (e.type === 'touchstart' && e.cancelable) {
            e.preventDefault();
        }
        e.stopPropagation();
    }
    const sidebar = document.getElementById('sidebarMenu');
    const overlay = document.getElementById('sidebarOverlay');
    if (sidebar) {
        sidebar.classList.toggle('active');
    }
    if (overlay) {
        overlay.classList.toggle('active');
    }
};

window.closePrepVerseSidebar = function(e) {
    if (e) {
        if (e.type === 'touchstart' && e.cancelable) {
            e.preventDefault();
        }
        e.stopPropagation();
    }
    const sidebar = document.getElementById('sidebarMenu');
    const overlay = document.getElementById('sidebarOverlay');
    if (sidebar) sidebar.classList.remove('active');
    if (overlay) overlay.classList.remove('active');
};

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

    // 3. Sidebar Desktop Hover & Outside Click Logic (Harmonized with inline HTML handlers)
    const sidebarTrigger = document.getElementById('sidebarHoverTrigger');
    const sidebarMenu = document.getElementById('sidebarMenu');
    const sidebarOverlay = document.getElementById('sidebarOverlay');
    
    if (sidebarTrigger && sidebarMenu) {
        let hoverTimer = null;

        const openSidebar = () => {
            if (hoverTimer) clearTimeout(hoverTimer);
            sidebarMenu.classList.add('active');
            if (sidebarOverlay) sidebarOverlay.classList.add('active');
        };

        const closeSidebar = () => {
            if (hoverTimer) clearTimeout(hoverTimer);
            sidebarMenu.classList.remove('active');
            if (sidebarOverlay) sidebarOverlay.classList.remove('active');
        };

        const handleHoverIn = () => {
            if (window.innerWidth > 992) {
                openSidebar();
            }
        };

        const handleHoverOut = () => {
            if (window.innerWidth > 992) {
                hoverTimer = setTimeout(() => {
                    if (!sidebarMenu.matches(':hover') && !sidebarTrigger.matches(':hover')) {
                        closeSidebar();
                    }
                }, 350);
            }
        };

        // Check desktop hover on page load
        if (window.innerWidth > 992 && (sidebarTrigger.matches(':hover') || sidebarMenu.matches(':hover'))) {
            openSidebar();
        }

        // Hover support for Desktop mouse users
        sidebarTrigger.addEventListener('mouseenter', handleHoverIn);
        sidebarTrigger.addEventListener('mouseover', handleHoverIn);
        sidebarTrigger.addEventListener('mousemove', () => {
            if (window.innerWidth > 992 && !sidebarMenu.classList.contains('active')) {
                openSidebar();
            }
        });
        sidebarTrigger.addEventListener('mouseleave', handleHoverOut);

        sidebarMenu.addEventListener('mouseenter', () => {
            if (window.innerWidth > 992 && hoverTimer) {
                clearTimeout(hoverTimer);
            }
        });

        sidebarMenu.addEventListener('mouseleave', handleHoverOut);

        // Click outside closes sidebar
        document.addEventListener('click', (e) => {
            var now = Date.now();
            if (now - (window._lastSidebarToggleTime || 0) < 450) return;
            if (sidebarMenu.classList.contains('active')) {
                if (!sidebarMenu.contains(e.target) && !sidebarTrigger.contains(e.target)) {
                    closeSidebar();
                }
            }
        });

        // ESC key closes sidebar
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeSidebar();
                if (dropdownMenu) dropdownMenu.classList.remove('show');
            }
        });
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

    // 6. Global IntersectionObserver Scroll Reveal Primitive
    const revealEls = document.querySelectorAll('.reveal');
    if (revealEls.length > 0) {
        const io = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    entry.target.classList.add('in');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -40px 0px'
        });

        revealEls.forEach(el => io.observe(el));
    }
});

// 7. Global Notification Toast Handler with Animated Progress Bar & Hover Pause Logic
window.PrepVerseToast = {
    show: function(toastId, message, duration = 4000) {
        let toast = typeof toastId === 'string' ? document.getElementById(toastId) : toastId;
        
        if (!toast) {
            let container = document.getElementById('toastNotification');
            if (!container) {
                const toastHtml = `
                    <div id="toastNotification" class="sticky-note-toast">
                        <i class="fas fa-thumbtack sticky-note-pin"></i>
                        <i class="fas fa-bell" id="toastIcon" style="color: #120a21; font-size: 1rem;"></i>
                        <span id="toastMessage" class="tracking-wide">Notification</span>
                        <div class="toast-progress-bar"></div>
                    </div>
                `;
                document.body.insertAdjacentHTML('beforeend', toastHtml);
                container = document.getElementById('toastNotification');
            }
            toast = container;
        }

        // Ensure progress bar element exists inside the toast card
        let progressBar = toast.querySelector('.toast-progress-bar');
        if (!progressBar) {
            progressBar = document.createElement('div');
            progressBar.className = 'toast-progress-bar';
            toast.appendChild(progressBar);
        }

        const msgElem = toast.querySelector('#toastMsg, #toastMessage, span.tracking-wide, span');
        if (msgElem && message) {
            msgElem.innerText = message;
        }

        // Reset progress animation smoothly
        progressBar.style.animation = 'none';
        void progressBar.offsetHeight; // Reflow reset
        progressBar.style.animation = '';
        progressBar.style.animationDuration = duration + 'ms';

        // Display toast card
        toast.classList.add('show-sticky', 'show');

        // Cleanup any previous animationend listener
        if (toast._onAnimEnd) {
            progressBar.removeEventListener('animationend', toast._onAnimEnd);
        }

        // Disappear smoothly when progress bar fill reaches 100%
        toast._onAnimEnd = function() {
            toast.classList.remove('show-sticky', 'show');
        };
        progressBar.addEventListener('animationend', toast._onAnimEnd);
    }
};
