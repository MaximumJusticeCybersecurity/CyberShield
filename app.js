const toggle = document.querySelector(".mobile-toggle");
const nav = document.querySelector(".nav");
if (toggle && nav) {
  toggle.addEventListener("click", () => nav.classList.toggle("open"));
  nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => nav.classList.remove("open")));
}
const form = document.getElementById("readinessForm");
const result = document.getElementById("assessmentResult");
const scoreOut = document.getElementById("scoreOut");
const resultText = document.getElementById("resultText");
if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const visibility = Number(document.getElementById("visibility").value);
    const ai = Number(document.getElementById("ai").value);
    const reporting = Number(document.getElementById("reporting").value);
    const score = Math.round((visibility + ai + reporting) / 3);
    scoreOut.textContent = score;
    let message = "";
    if (score < 50) {
      message = "Your organization may have meaningful governance visibility gaps. This does not mean failure is inevitable, but it does suggest leadership may be approving cyber and AI risk without a clear operational picture.";
    } else if (score < 70) {
      message = "Your organization appears to have developing readiness, but cyber, vendor, reporting, or AI governance may still be fragmented enough to create executive uncertainty.";
    } else {
      message = "Your organization appears to have stronger readiness indicators, but a briefing can help validate whether visibility, accountability, and governance are durable under pressure.";
    }
    resultText.textContent = message;
    result.hidden = false;
    result.scrollIntoView({ behavior: "smooth", block: "center" });
  });
}
