var config = {
  1:{s:0,m:25,name: "Work" },
  2:{s:0,m:5,name: "Short break" },
  3:{s:0,m:15,name: "Long break" },
  sequence: [1, 2, 1, 2, 1, 2, 1, 3]
};
var isRunning = false;
var pomo_btn, pomo_timer, pomo_indicator, pomo_title, timer, sequencePos = 0;
var s,m;
var startAudio, pauseAudio, ringAudio;

window.addEventListener("load", function() {
  startAudio = document.getElementById("start-audio");
  pauseAudio = document.getElementById("pause-audio");
  ringAudio = document.getElementById("ring-audio");

  pomo_btn = document.getElementById("pomo-btn");
  pomo_timer = document.getElementById("pomo-timer");
  pomo_indicator = document.getElementById("pomo-indicator");
  pomo_title = document.getElementById("pomo-title")
  s = config[config.sequence[sequencePos]].s;
  m = config[config.sequence[sequencePos]].m;
  pomo_timer.innerHTML = convert(m, s);
});

window.addEventListener("keydown", function(event) {
  if (event.code == "Space") {
    start();
  }
});

function start() {
  if (isRunning) {
    stop();
    pauseAudio.play();
    isRunning = false;
  } else {
    startAudio.play();
    pomo_indicator.innerHTML = config[config.sequence[sequencePos]].name;
    pomo_btn.style.color = "#1ba11b";
    pomo_title.innerHTML = convert(m, s) + ' - ' + config[config.sequence[sequencePos]].name;
    isRunning = true;

    timer = setInterval(function() {
      s -= 1;

      if (s < 0) {
        m -= 1;
        s = 59;
      }
      if (m < 0) {
        clearInterval(timer);
        sequencePos = sequencePos < (config.sequence.length - 1) ? sequencePos+1 : 0;
        s = config[config.sequence[sequencePos]].s;
        m = config[config.sequence[sequencePos]].m;
        pomo_timer.innerHTML = convert(m,s);
        pomo_title.innerHTML = convert(m,s) + ' - ' + config[config.sequence[sequencePos]].name;
        pomo_indicator.innerHTML = config[config.sequence[sequencePos]].name;
        stop();
        ringAudio.play();
      } else {
        pomo_timer.innerHTML = convert(m, s);
        pomo_title.innerHTML = convert(m, s) + ' - ' + config[config.sequence[sequencePos]].name;
      }
    }, 1000);

  }
}

function stop() {
  isRunning = false;
  pomo_btn.style.color = "#a11b1b";
  if (timer) clearInterval(timer);
}

function convert(m, s) {
  return ('0'+m).slice(-2) + ":" + ('0'+s).slice(-2);
}
