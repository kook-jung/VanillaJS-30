/* element 가져오기 */
const player = document.querySelector(".player");
const video = player.querySelector(".viewer");
const progress = player.querySelector(".progress");
const progressBar = player.querySelector(".progress__filled");
const toggle = player.querySelector(".toggle");
const ranges = player.querySelectorAll(".player__slider");
const skipButtons = player.querySelectorAll("[data-skip]");
const fullScreenButton = player.querySelector("#fullScreen");

console.log(skipButtons);

/* 함수 만들기 */
// 비디오 재생/멈춤 함수
function togglePlay() {
  /* 조건문 방법 1 */
  const method = video.paused ? "play" : "pause";
  video[method]();

  /* 조건문 방법 2
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
  */
}

// 재생 버튼 변경 함수
function updateButton() {
  const icon = this.paused ? "►" : "❚❚";
  toggle.textContent = icon;
  console.log("Update the button");
}

// 스킵 함수
function skip() {
  //console.log(this.dataset);
  video.currentTime += parseFloat(this.dataset.skip); // parseFloat : 문자열을 실수로 반환
}

// 볼륨/배속 조절 함수
function handleRangeUpdate() {
  //console.log(this.name); // volume or playbackRate
  //console.log(this.value);
  video[this.name] = this.value;
}

// 재생 진행바 업데이트 함수
function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

// 재생 진행바 시간조절 함수
function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

function makeFullScreen() {
  video.requestFullscreen();
}

/* event listner 연결하기 */
video.addEventListener("click", togglePlay);
video.addEventListener("play", updateButton);
video.addEventListener("pause", updateButton);
video.addEventListener("timeupdate", handleProgress);

toggle.addEventListener("click", togglePlay);
skipButtons.forEach((button) => button.addEventListener("click", skip));
ranges.forEach((range) => range.addEventListener("change", handleRangeUpdate));
ranges.forEach((range) =>
  range.addEventListener("mousemove", handleRangeUpdate)
);

let mousedown = false;
progress.addEventListener("click", scrub);
progress.addEventListener("mousemove", (e) => mousedown && scrub(e));
/*
progress.addEventListener("mousemove", (e) => {
  if (mousedown) scrub(e);
});
*/
progress.addEventListener("mousedown", () => (mousedown = true));
progress.addEventListener("mouseup", () => (mousedown = false));

fullScreenButton.addEventListener("click", makeFullScreen);
