// Countdown Timerconst targetDate = new Date("May 29, 2026 00:00:00").getTime();
setInterval(() => {    const now = new Date().getTime();    const distance = targetDate - now;
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000*60*60));    const minutes = Math.floor((distance % (1000*60*60)) / (1000*60));    const seconds = Math.floor((distance % (1000*60)) / 1000);
    document.getElementById("countdown").innerHTML = `        [ ${days} ] DAYS        [ ${hours} ] HOURS        [ ${minutes} ] MINUTES        [ ${seconds} ] SECONDS    `;}, 1000);
