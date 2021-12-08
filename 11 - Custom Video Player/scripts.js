/* element 가져오기 */
const player = document.querySelector(".player");
const video = player.querySelector(".viewer");
const progress = player.querySelector(".progress");
const progressBar = player.querySelector(".progress__filled");
const toggle = player.querySelector(".toggle");
const ranges = player.querySelectorAll(".player__slider");
const skipButtons = player.querySelectorAll("[data-skip]");

console.log(skipButtons);

/* 함수 만들기 */
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

function updateButton() {
  const icon = this.paused ? "►" : "❚❚";
  toggle.textContent = icon;
  console.log("Update the button");
}

function skip() {
  console.log(this.dataset);
  video.currentTime += parseFloat(this.dataset.skip); // parseFloat : 문자열을 실수로 반환
}

function handleRangeUpdate() {
  //console.log(this.name); // volume or playbackRate
  //console.log(this.value);
  video[this.name] = this.value;
}

/* event listner 연결하기 */
video.addEventListener("click", togglePlay);
video.addEventListener("play", updateButton);
video.addEventListener("pause", updateButton);

toggle.addEventListener("click", togglePlay);
skipButtons.forEach((button) => button.addEventListener("click", skip));
ranges.forEach((range) => range.addEventListener("change", handleRangeUpdate));
ranges.forEach((range) =>
  range.addEventListener("mousemove", handleRangeUpdate)
);
