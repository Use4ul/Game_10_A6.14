const numDivs = 36;
const maxClicks = 10;

let clicks = 0;
let miss = 0
let startTime

function getTimestamp() {
  let d = new Date();
  return d.getTime();
}

function randomDivId() {
  let d = Math.floor(Math.random() * 6) + 1;
  let n = Math.floor(Math.random() * 6) + 1;
  return `#slot-${d}${n}`;
}

function round() {

  $(".game-field").removeClass("target");
  let divSelector = randomDivId();
  $(divSelector).addClass("target");
  $(divSelector).text(String(clicks+1))

  if (clicks === maxClicks) {
    endGame();
  }
}

function endGame() {
  $(".gameArea").addClass("d-none");
  let totalPlayedMillis = getTimestamp() - startTime;
  let totalPlayedSeconds = Number(totalPlayedMillis / 1000).toPrecision(3);
  let points = clicks-miss
  if (points%10 == 1 && points != 11 && points != -11){
    $("#number-of-points").text(String(points)+" балл");
  }
  else if (points%10 == 2 || points%10 == 3 || points%10 == 4){
    $("#number-of-points").text(String(points)+" балла");
  }
  else{
    $("#number-of-points").text(String(points)+" баллов");
  }
  $("#total-time-played").text(totalPlayedSeconds);


  $("#win-message").removeClass("d-none");
}

function handleClick(event) {
  if ($(event.target).hasClass("target")) {
    clicks = clicks + 1;
    $(".target").text("");
    $(".game-field").removeClass("miss");
    round();
  }
  else{
    $(event.target).addClass("miss");
    miss += 1;
  }
}

function init() {
  $("#button-start").click(function(){
    $(this).attr("class", "d-none");
    $("#button-reload").removeClass("d-none");
    startTime = getTimestamp();
    round();
    $(".game-field").click(handleClick);
  });

  $("#button-reload").click(function() {
    location.reload();
  });
}

$(document).ready(init);
