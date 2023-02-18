let colorInterval;

function showTime() {
  const time = new Date();

  var hour = time.getHours();
  var min = time.getMinutes();
  var sec = time.getSeconds();

  var am_pm = "AM";

  if (hour > 12) {
    hour -= 12;
    am_pm = "PM";
  }

  if (hour == 0) {
    hour = 12;
    am_pm = "AM";
  }

  hour = Number(hour > 10 ? hour : "0" + hour);
  min = Number(min > 10 ? min : "0" + min);
  sec = Number(sec > 10 ? sec : "0" + sec);
  var red, green, blue, currentColor;

  //this function glitching. value back & forth ho rhi and not updating and vo red ki value to messed up hai hi.

  function formatColor(i) {
    if (i.length < 2) {
      i = "0" + i;
    }
    return i;
  }
  function timeColor(hour, min, sec) {
    red = Math.round(255 * (hour / 23)).toString(16);
    green = Math.round(255 * (min / 59)).toString(16);
    blue = Math.round(255 * (sec / 59)).toString(16);

    red = formatColor(red);
    green = formatColor(green);
    blue = formatColor(blue);

    return (red + green + blue).toUpperCase();
  }
  document.getElementById("color").innerHTML = timeColor(hour, min, sec);
  document.body.style.backgroundColor = "#" + timeColor(hour, min, sec);

  var currentTime = hour + ":" + min + ":" + sec + am_pm;

  document.getElementById("time").innerHTML = currentTime;
}

setInterval(showTime, 1000);
