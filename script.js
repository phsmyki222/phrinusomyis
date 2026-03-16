/**
 * PHRINUSOMYIS Official Terminal Logic
 * Target Launch: May 29, 2026
 * Functionality: Precision Countdowns, Orbit Protection, & Cinematic Transitions
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. LOCKED TARGET DATE: MAY 29, 2026
    const launchDate = new Date("May 29, 2026 00:00:00").getTime();

    /**
     * Update all three distinct countdown systems
     */
    function updateAllCountdowns() {
        const now = new Date().getTime();
        const distance = launchDate - now;

        // Time calculations for Days, Hours, Minutes, and Seconds
        const d = Math.floor(distance / (1000 * 60 * 60 * 24));
        const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((distance % (1000 * 60)) / 1000);

        // Standard string formatting (adds a leading zero if number is below 10)
        const timeData = {
            days: d.toString().padStart(2, '0'),
            hours: h.toString().padStart(2, '0'),
            minutes: m.toString().padStart(2, '0'),
            seconds: s.toString().padStart(2, '0')
        };

        // Update Countdown 1 (GOLD)
        updateTimerSet('1', timeData);

        // Update Countdown 2 (MULTI-COLOR)
        updateTimerSet('2', timeData);

        // Update Countdown 3 (RAINBOW)
        updateTimerSet('3', timeData);

        // Handle Launch Expiration
        if (distance < 0) {
            clearInterval(timerInterval);
            document.querySelectorAll('.timer-grid').forEach(el => {
                el.innerHTML = "<h2 class='gold-title'>LAUNCHED</h2>";
            });
        }
    }

    /**
     * Helper to update specific timer HTML elements
     */
    function updateTimerSet(suffix, data) {
        const dEl = document.getElementById(`d${suffix}`);
        const hEl = document.getElementById(`h${suffix}`);
        const mEl = document.getElementById(`m${suffix}`);
        const sEl = document.getElementById(`s${suffix}`);

        if (dEl) dEl.innerText = data.days;
        if (hEl) hEl.innerText = data.hours;
        if (mEl) mEl.innerText = data.minutes;
        if (sEl) sEl.innerText = data.seconds;
    }

    // Initialize Interval (Runs every 1 second)
    const timerInterval = setInterval(updateAllCountdowns, 1000);
    updateAllCountdowns(); // Run immediately on load

    /**
     * GLOBAL SECURITY & PROTECTION
     * Disables right-click on all premium media assets
     */
    document.addEventListener('contextmenu', (e) => {
        if (e.target.tagName === 'IMG' || e.target.tagName === 'VIDEO') {
            e.preventDefault();
        }
    }, false);

    /**
     * SMOOTH SCROLLING
     * Ensures high-end movement when using the menu
     */
    document.querySelectorAll('.nav-menu a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId.startsWith("#")) {
                e.preventDefault();
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    targetSection.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });

    /**
     * ASSET PROTECTION
     * Prevents users from dragging images (like the 360° assets)
     */
    document.querySelectorAll('img, video').forEach(asset => {
        asset.addEventListener('dragstart', (e) => e.preventDefault());
    });
});
