let count = 3; // 카운트 시작값
const interval = setInterval(() => {
  count--;
  document.getElementById('count').innerText = count;
  if(count <= 0) clearInterval(interval);
}, 1000);

setTimeout(() => {
  document.body.style.transition = "opacity 0.5s";
  document.body.style.opacity = 0;
  setTimeout(() => window.location.href = "home.html", 500);
}, 3000); // 자동 이동 시간