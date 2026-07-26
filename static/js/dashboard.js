/* ==========================================================================
   PrepVerse - Dashboard JavaScript Controller (Phase 2 Modularization)
   ========================================================================== */

document.addEventListener("DOMContentLoaded", function () {
    // Initialize Mock Tests Performance Stats
    function updateMockStats() {
        const dbAttempts = [
            { id: 'mock-01', mode: 'Module Blitz' },
            { id: 'mock-01b', mode: 'Module Blitz' },
            { id: 'mock-01c', mode: 'Module Blitz' },
            { id: 'mock-02', mode: 'Topic Master' },
            { id: 'mock-02b', mode: 'Topic Master' },
            { id: 'mock-02c', mode: 'Topic Master' },
            { id: 'mock-03', mode: 'Subject Marathon' },
            { id: 'mock-03b', mode: 'Subject Marathon' },
            { id: 'mock-03c', mode: 'Subject Marathon' }
        ];

        let localHistory = [];
        try {
            localHistory = JSON.parse(localStorage.getItem('prepverse-mock-history')) || [];
        } catch (e) {
            localHistory = [];
        }
        if (!Array.isArray(localHistory)) { localHistory = []; }

        const allAttempts = [...localHistory, ...dbAttempts];
        // Deduplicate
        const uniqueAttempts = [];
        const seen = new Set();
        allAttempts.forEach(item => {
            if (item && item.id && !seen.has(item.id)) {
                seen.add(item.id);
                uniqueAttempts.push(item);
            }
        });

        // Count modes safely
        const countByMode = (modeName) => {
            return uniqueAttempts.filter(item => {
                const m = item.mode || '';
                return m.toLowerCase().trim() === modeName.toLowerCase().trim();
            }).length;
        };

        const blitzTaken = countByMode('Module Blitz');
        const topicTaken = countByMode('Topic Master');
        const marathonTaken = countByMode('Subject Marathon');

        const blitzTotal = 15;
        const topicTotal = 10;
        const marathonTotal = 5;

        // Blitz UI update
        const blitzTakenEl = document.getElementById("blitzTakenVal");
        const blitzPctEl = document.getElementById("blitzPctVal");
        const blitzFillEl = document.getElementById("blitzProgressFill");
        const blitzRemainingEl = document.getElementById("blitzRemainingVal");
        if (blitzTakenEl) blitzTakenEl.textContent = blitzTaken;
        if (blitzPctEl) blitzPctEl.textContent = Math.round((blitzTaken / blitzTotal) * 100) + "%";
        if (blitzFillEl) blitzFillEl.style.width = Math.min(100, Math.round((blitzTaken / blitzTotal) * 100)) + "%";
        if (blitzRemainingEl) blitzRemainingEl.textContent = "Remaining: " + Math.max(0, blitzTotal - blitzTaken);

        // Topic UI update
        const topicTakenEl = document.getElementById("topicTakenVal");
        const topicPctEl = document.getElementById("topicPctVal");
        const topicFillEl = document.getElementById("topicProgressFill");
        const topicRemainingEl = document.getElementById("topicRemainingVal");
        if (topicTakenEl) topicTakenEl.textContent = topicTaken;
        if (topicPctEl) topicPctEl.textContent = Math.round((topicTaken / topicTotal) * 100) + "%";
        if (topicFillEl) topicFillEl.style.width = Math.min(100, Math.round((topicTaken / topicTotal) * 100)) + "%";
        if (topicRemainingEl) topicRemainingEl.textContent = "Remaining: " + Math.max(0, topicTotal - topicTaken);

        // Marathon UI update
        const marathonTakenEl = document.getElementById("marathonTakenVal");
        const marathonPctEl = document.getElementById("marathonPctVal");
        const marathonFillEl = document.getElementById("marathonProgressFill");
        const marathonRemainingEl = document.getElementById("marathonRemainingVal");
        if (marathonTakenEl) marathonTakenEl.textContent = marathonTaken;
        if (marathonPctEl) marathonPctEl.textContent = Math.round((marathonTaken / marathonTotal) * 100) + "%";
        if (marathonFillEl) marathonFillEl.style.width = Math.min(100, Math.round((marathonTaken / marathonTotal) * 100)) + "%";
        if (marathonRemainingEl) marathonRemainingEl.textContent = "Remaining: " + Math.max(0, marathonTotal - marathonTaken);
    }

    updateMockStats();

    // ---------- Subject Preparations Infinite 3-Card Carousel Logic ----------
    let currentSubjectIndex = 0;
    const track = document.getElementById("subjectCarouselTrack");

    window.slideSubjectCarousel = function (direction) {
        if (!track) return;
        const cards = track.querySelectorAll(".subject-card");
        const totalCards = cards.length;
        if (totalCards === 0) return;

        // Determine visible cards based on screen width
        let visibleCount = 3;
        if (window.innerWidth <= 640) {
            visibleCount = 1;
        } else if (window.innerWidth <= 992) {
            visibleCount = 2;
        }

        const maxIndex = totalCards - visibleCount;
        currentSubjectIndex += direction;

        // Infinite loop wrapping behavior
        if (currentSubjectIndex > maxIndex) {
            currentSubjectIndex = 0; // Wrap back to first 3 cards with smooth animation
        } else if (currentSubjectIndex < 0) {
            currentSubjectIndex = Math.max(0, maxIndex); // Wrap to end
        }

        // Calculate shift percentage including gap
        const gapPixels = 20;
        const trackWidth = track.clientWidth;
        const cardWidth = (trackWidth - (gapPixels * (visibleCount - 1))) / visibleCount;
        const shiftAmount = currentSubjectIndex * (cardWidth + gapPixels);

        track.style.transform = `translateX(-${shiftAmount}px)`;
    };

    // Recalculate transform on resize
    window.addEventListener("resize", () => {
        if (track) slideSubjectCarousel(0);
    });
});
