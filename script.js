var s = 10;
var m = 25;
var h = 00;
var isRunning = false;
var btn_pomo, pomo, indicator, timer, startAudio, pauseAudio;

window.addEventListener("load", () => {
  startAudio = document.getElementById("startAudio");
  pauseAudio = document.getElementById("pauseAudio");

  btn_pomo = document.getElementById("btn-pomo");
  pomo = document.getElementById("pomo");
  indicator = document.getElementById("indicator");
  pomo.innerHTML = convert(h, m, s);
});

function start() {
  if (isRunning) {
    pause();
    isRunning = false;
  } else {
    startAudio.play();
    indicator.innerHTML = "keep working";
    btn_pomo.style.color = "#1ba11b";
    isRunning = true;

    timer = setInterval(() => {
      s -= 1;

      if (s < 0) {
        m -= 1;
        s = 59;
      }
      if (m < 0) {
        h -= 1;
        m = 59;
      }
      if (h < 0) {
        clearInterval(timer);
        pomo.innerHTML = convert(0,0,0);
      } else pomo.innerHTML = convert(h, m, s);
    }, 1000);
  }
}

function pause() {
  pauseAudio.play();
  btn_pomo.style.color = "#a11b1b";
  indicator.innerHTML = "interrupted!";
  if (timer) clearInterval(timer);
}

function convert(h, m, s) {
  return (
    `0${h}`.slice(-2) +
    ":" +
    `0${m}`.slice(-2) +
    ":" +
    `0${s}`.slice(-2)
  );
}
