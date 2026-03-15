// ========================
// COUNTDOWN DATES
// ========================

// Countdown 1 – Gold (Extraordinary Event)
const countdown1Date = new Date("May 29, 2026 00:00:00").getTime();

// Countdown 2 – Digital Colors (Global Production Reveal)
const countdown2Date = new Date("May 29, 2026 12:00:00").getTime(); // Example, can adjust

// Countdown 3 – Rainbow Dual-Color (Elite Experience)
const countdown3Date = new Date("May 29, 2026 18:00:00").getTime();

// Rainbow colors (no white, repeated only if colors run out)
const rainbowColors = [
  "#FF0000", "#FF7F00", "#FFFF00", "#00FF00", "#0000FF", "#4B0082", "#8B00FF",
  "#FF1493", "#00CED1", "#FFD700", "#ADFF2F", "#FF4500"
];

// ========================
// FUNCTION TO UPDATE COUNTDOWN
// ========================
function updateCountdown(elementId, targetDate, options = {}) {
  const now = new Date().getTime();
  const distance = targetDate - now;

  if (distance < 0) {
    document.getElementById(elementId).innerHTML = "00:00:00:00";
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Format numbers to 2 digits
  const d = days < 10 ? "0" + days : days;
  const h = hours < 10 ? "0" + hours : hours;
  const m = minutes < 10 ? "0" + minutes : minutes;
  const s = seconds < 10 ? "0" + seconds : seconds;

  // ========================
  // COUNTDOWN 1 – GOLD
  // ========================
  if (elementId === "timer1") {
    document.getElementById(elementId).innerHTML = ${d}:${h}:${m}:${s};
  }

  // ========================
  // COUNTDOWN 2 – DIGITAL MULTICOLOR
  // ========================
  if (elementId === "timer2") {
    const digits = ${d}${h}${m}${s}.split("");
    let html = "";
    for (let i = 0; i < digits.length; i++) {
      const color = rainbowColors[i % rainbowColors.length];
      html += <span style="color:${color}; margin:0 3px;">${digits[i]}</span>;
    }
    document.getElementById(elementId).innerHTML = html;
  }

  // ========================
  // COUNTDOWN 3 – RAINBOW DUAL-COLOR
  // Each digit: top half color / bottom half color
  // ========================
  if (elementId === "timer3") {
    const digits = ${d}${h}${m}${s}.split("");
    let html = "";
    for (let i = 0; i < digits.length; i++) {
      const colorTop = rainbowColors[i % rainbowColors.length];
      const colorBottom = rainbowColors[(i + 3) % rainbowColors.length]; // offset for variation
      html += `<span style="display:inline-block; font-size:inherit; 
                  line-height:1; 
                  background: linear-gradient(${colorTop}, ${colorBottom});
                  -webkit-background-clip: text;
                  -webkit-text-fill-color: transparent;
                  margin:0 5px;">
                  ${digits[i]}
               </span>`;
    }
    document.getElementById(elementId).innerHTML = html;
  }
}

// ========================
// RUN ALL COUNTDOWNS EVERY SECOND
// ========================
setInterval(() => {
  updateCountdown("timer1", countdown1Date);
  updateCountdown("timer2", countdown2Date);
  updateCountdown("timer3", countdown3Date);
}, 1000);
