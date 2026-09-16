// Đổi thời gian bên dưới thành thời gian thật của lễ tốt nghiệp.
const graduationDate = new Date("2026-09-20T09:00:00+07:00").getTime();

function updateCountdown() {
  const now = Date.now();
  const distance = graduationDate - now;

  if (distance <= 0) {
    document.getElementById("countdown").innerHTML = "<h3>Hôm nay là ngày tốt nghiệp! 🎓</h3>";
    clearInterval(timer);
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((distance / (1000 * 60)) % 60);
  const seconds = Math.floor((distance / 1000) % 60);

  document.getElementById("days").textContent = String(days).padStart(2, "0");
  document.getElementById("hours").textContent = String(hours).padStart(2, "0");
  document.getElementById("minutes").textContent = String(minutes).padStart(2, "0");
  document.getElementById("seconds").textContent = String(seconds).padStart(2, "0");
}

updateCountdown();
const timer = setInterval(updateCountdown, 1000);
