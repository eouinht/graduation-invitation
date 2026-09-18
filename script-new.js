/* =======================================================
   CẤU HÌNH - chỉ cần sửa 2 dòng này
   ======================================================= */

// Ngày giờ lễ tốt nghiệp (phải khớp với phần "Ngày"/"Thời gian" trong index.html)
const GRADUATION_DATE_ISO = "2026-09-27T15:30:00+07:00";

// Tên của bạn - dùng cho phần ký tên cuối thiệp
const HOST_NAME = "Nguyễn Hoài Thương";

// Số điện thoại - dùng làm phương án dự phòng nếu gửi lỗi.
const RSVP_PHONE = "0966241356";

// Dán link Web app của Google Apps Script vào đây (xem HUONG-DAN-RSVP.md).
// Để trống thì nút xác nhận sẽ tự chuyển sang gửi tin nhắn.
const RSVP_ENDPOINT = "";


/* =======================================================
   COUNTDOWN
   ======================================================= */

const graduationDate = new Date(GRADUATION_DATE_ISO).getTime();

// Khai báo timer trước khi updateCountdown() chạy lần đầu,
// nếu không clearInterval(timer) sẽ ném ReferenceError.
let timer = null;

// Gán số mới, đồng thời cho ô nảy nhẹ nếu giá trị thay đổi.
function setDigit(id, value) {
  const el = document.getElementById(id);
  if (!el || el.textContent === value) {
    return;
  }

  el.textContent = value;
  el.classList.remove("bump");
  void el.offsetWidth;            // ép trình duyệt chạy lại animation
  el.classList.add("bump");
}

function updateCountdown() {
  const distance = graduationDate - Date.now();

  if (distance <= 0) {
    document.getElementById("countdown").innerHTML =
      "<h3>Hôm nay là ngày tốt nghiệp! 🎓</h3>";
    launchConfetti(160);
    if (timer !== null) {
      clearInterval(timer);
    }
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((distance / (1000 * 60)) % 60);
  const seconds = Math.floor((distance / 1000) % 60);

  setDigit("days", String(days).padStart(2, "0"));
  setDigit("hours", String(hours).padStart(2, "0"));
  setDigit("minutes", String(minutes).padStart(2, "0"));
  setDigit("seconds", String(seconds).padStart(2, "0"));
}


/* -------------------------------------------------------
   Ghi rõ mốc thời gian, lấy từ GRADUATION_DATE_ISO
   nên không bao giờ lệch với đồng hồ đếm ngược.
   ------------------------------------------------------- */

const TZ = "Asia/Ho_Chi_Minh";
const eventDateObj = new Date(GRADUATION_DATE_ISO);

function formatPart(options) {
  return new Intl.DateTimeFormat("vi-VN", Object.assign({ timeZone: TZ }, options))
    .format(eventDateObj);
}

// Ví dụ: "Chủ Nhật, 27/09/2026"
const dateText = formatPart({
  weekday: "long",
  day: "2-digit",
  month: "2-digit",
  year: "numeric"
});

// Ví dụ: "15:30:00"
const timeText = formatPart({
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false
});

function fillText(id, text) {
  const el = document.getElementById(id);
  if (el) {
    el.textContent = text;
  }
}

fillText("eventDate", dateText);
fillText("eventTime", timeText);


updateCountdown();
timer = setInterval(updateCountdown, 1000);


/* =======================================================
   TÊN KHÁCH MỜI  (?guest=...)
   ======================================================= */

const guestElement = document.getElementById("guestName");
const signatureElement = document.getElementById("signatureName");

// Chữ ký luôn là tên chủ nhân thiệp, không bao giờ là tên khách.
if (signatureElement) {
  signatureElement.textContent = HOST_NAME;
}

const params = new URLSearchParams(window.location.search);
const guestID = (params.get("guest") || "").trim().toLowerCase();

fetch("guests-new.json")
  .then(response => {
    if (!response.ok) {
      throw new Error("Không đọc được guests-new.json (HTTP " + response.status + ")");
    }
    return response.json();
  })
  .then(data => {
    const guest = data.find(
      item => String(item.id).toLowerCase() === guestID
    );

    if (guest) {
      guestElement.textContent = guest.name;
      currentGuest = guest;
    } else {
      // Sai ?guest= hoặc không có param -> giữ lời chào chung.
      guestElement.textContent = "Quý khách";
      if (guestID) {
        console.warn('Không tìm thấy khách có id "' + guestID + '" trong guests-new.json');
      }
    }
  })
  .catch(error => {
    guestElement.textContent = "Quý khách";
    console.error("Lỗi khi tải danh sách khách:", error);
  });


/* =======================================================
   HIỆU ỨNG  (chỉ có ở bản new)
   ======================================================= */

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;


/* ---- Hiện dần khi cuộn tới ---- */

(function () {
  const items = document.querySelectorAll(".reveal");

  if (reduceMotion || !("IntersectionObserver" in window)) {
    items.forEach(el => el.classList.add("shown"));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("shown");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  items.forEach(el => observer.observe(el));
})();


/* ---- Pháo giấy ---- */

const confettiCanvas = document.getElementById("confetti");
const CONFETTI_COLORS = ["#b5121b", "#d4af37", "#c52a33", "#f0d98a", "#ffffff"];

let pieces = [];
let confettiRunning = false;

function sizeCanvas() {
  if (!confettiCanvas) return;
  confettiCanvas.width = window.innerWidth;
  confettiCanvas.height = window.innerHeight;
}

function launchConfetti(count) {
  if (!confettiCanvas || reduceMotion) return;

  sizeCanvas();

  for (let i = 0; i < count; i++) {
    pieces.push({
      x: Math.random() * confettiCanvas.width,
      y: -20 - Math.random() * confettiCanvas.height * 0.5,
      w: 6 + Math.random() * 6,
      h: 9 + Math.random() * 8,
      color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
      speed: 1.6 + Math.random() * 2.4,
      drift: -0.9 + Math.random() * 1.8,
      spin: -0.1 + Math.random() * 0.2,
      angle: Math.random() * Math.PI * 2
    });
  }

  if (!confettiRunning) {
    confettiRunning = true;
    requestAnimationFrame(drawConfetti);
  }
}

function drawConfetti() {
  const ctx = confettiCanvas.getContext("2d");
  ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);

  pieces.forEach(p => {
    p.y += p.speed;
    p.x += p.drift;
    p.angle += p.spin;

    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.angle);
    ctx.fillStyle = p.color;
    ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
    ctx.restore();
  });

  // Bỏ mảnh đã rơi khỏi màn hình
  pieces = pieces.filter(p => p.y < confettiCanvas.height + 30);

  if (pieces.length > 0) {
    requestAnimationFrame(drawConfetti);
  } else {
    confettiRunning = false;
    ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
  }
}

window.addEventListener("resize", sizeCanvas);

// Một loạt nhẹ khi mở thiệp
setTimeout(() => launchConfetti(90), 500);




/* =======================================================
   BẢN ĐỒ KHUÔN VIÊN - chưa có file thì ẩn ảnh, giữ lại link
   ======================================================= */

(function () {
  const img = document.getElementById("campusMapImg");
  if (!img) return;

  const hide = () => img.classList.add("missing");

  img.addEventListener("error", hide);

  if (img.complete && img.naturalWidth === 0) {
    hide();
  }
})();


/* =======================================================
   XÁC NHẬN THAM DỰ
   Gửi thẳng vào Google Sheet qua Apps Script.
   Lỗi mạng thì tự chuyển sang nhắn tin.
   ======================================================= */

let currentGuest = null;
let rsvpSent = false;

const statusEl = document.getElementById("rsvpStatus");
const hintEl   = document.getElementById("rsvpHint");
const yesBtn   = document.getElementById("rsvpYes");

function smsHref() {
  const who = currentGuest ? "Mình là " + currentGuest.name + ". " : "";
  const body = who + "Mình sẽ tới dự lễ tốt nghiệp của " + HOST_NAME + " nhé. Chúc mừng bạn!";

  return "sms:" + RSVP_PHONE + "?&body=" + encodeURIComponent(body);
}

function showFallback(message) {
  if (!hintEl) return;

  hintEl.innerHTML = message + ' <a href="' + smsHref() + '">nhắn tin cho mình</a>'
    + ' hoặc gọi ' + RSVP_PHONE + '.';
}

function lockButtons() {
  if (yesBtn) yesBtn.disabled = true;
}

function setStatus(text, kind) {
  if (!statusEl) return;
  statusEl.textContent = text;
  statusEl.className = "rsvp-status" + (kind ? " " + kind : "");
}

async function sendRsvp() {
  if (rsvpSent) return;

  // Không có endpoint -> quay về nhắn tin
  if (!RSVP_ENDPOINT) {
    window.location.href = smsHref();
    return;
  }

  setStatus("Đang gửi...", "");
  lockButtons();

  const payload = {
    id: currentGuest ? currentGuest.id : "",
    name: currentGuest ? currentGuest.name : "Khách chưa rõ tên",
    relationship: currentGuest ? currentGuest.relationship : "",
    answer: "yes",
    sentAt: new Date().toISOString()
  };

  try {
    // text/plain để tránh preflight CORS của Apps Script
    await fetch(RSVP_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(payload)
    });

    rsvpSent = true;

    setStatus("Đã ghi nhận. Hẹn gặp bạn hôm đó!", "ok");

    if (hintEl) hintEl.textContent = "";

    launchConfetti(70);

  } catch (error) {
    console.error("Gửi xác nhận lỗi:", error);

    if (yesBtn) yesBtn.disabled = false;

    setStatus("Gửi không thành công.", "error");
    showFallback("Bạn");
  }
}

if (yesBtn) yesBtn.addEventListener("click", () => sendRsvp());
