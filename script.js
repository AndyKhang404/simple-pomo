var defaultConfig = {
  '1':{ s:0, m:25, h:0, name:'work'},
  '2':{ s:0, m:5, h:0, name:'short-break'},
  '3':{ s:0, m:15, h:0, name:'long-break'},
  sequence:[1,2,1,1],
};
var config = defaultConfig;
var isRunning = false;
var pomo_btn, pomo_timer, pomo_indicator, timer, sequencePos = 0;
var s,m,h;
var startAudio, pauseAudio;

window.addEventListener("load", () => {
  startAudio = document.getElementById("startAudio");
  pauseAudio = document.getElementById("pauseAudio");

  pomo_btn = document.getElementById("pomo-btn");
  pomo_timer = document.getElementById("pomo-timer");
  pomo_indicator = document.getElementById("pomo-indicator");
  s = config[config.sequence[sequencePos]].s;
  m = config[config.sequence[sequencePos]].m;
  h = config[config.sequence[sequencePos]].h;
  pomo_timer.innerHTML = convert(h, m, s);
});

function start() {
  if (isRunning) {
    interruptPause();
    isRunning = false;
  } else {
    
    startAudio.play();
    pomo_indicator.innerHTML = config[config.sequence[sequencePos]].name;
    pomo_btn.style.color = "#1ba11b";
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
        sequencePos = sequencePos <= config.sequence.length ? sequencePos+1 : 0;
        s = config[config.sequence[sequencePos]].s;
        m = config[config.sequence[sequencePos]].m;
        h = config[config.sequence[sequencePos]].h;
        pomo_timer.innerHTML = convert(0,0,0);
      } else pomo_timer.innerHTML = convert(h, m, s);
    }, 1000);
  }
}

function interruptPause() {
  pauseAudio.play();
  pomo_btn.style.color = "#a11b1b";
  pomo_indicator.innerHTML = "interrupted!";
  if (timer) clearInterval(timer);
}

function sequencePause() {
  
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
