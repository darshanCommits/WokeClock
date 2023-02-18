let colorInterval;

function showTime() {
  const time = new Date();

  var hour = time.getHours();
  var min = time.getMinutes();
  var sec = time.getSeconds();

  var am_pm = "AM";

  if(hour>12) {
    am_pm = "PM";
    hour %= 2;
  }



  function formatColor(i) {
    if (i.length < 2) {
      i = "0" + i;
    }
    return i;
  }
  function timeColor(hour, min, sec) {

    var red = Math.round(255 * (hour / 23)).toString(16);
    var green = Math.round(255 * (min / 59)).toString(16);
    var blue = Math.round(255 * (sec / 59)).toString(16);

    red = formatColor(red);
    green = formatColor(green);
    blue = formatColor(blue);

    return (red + green + blue).toUpperCase();
  }

  var grad1 = "#" + timeColor(hour, min, sec);
  if ((am_pm = "PM")) var grad2 = "#" + timeColor(hour + 6, min, sec);
  var gradRotation = sec * 6;
  document.getElementById("color").innerHTML = grad1 + " to " + grad2;

  document.body.style.background = `linear-gradient(${gradRotation}deg, ${grad1} 0%, ${grad2} 100%)`;

  var currentTime = hour + ":" + min + ":" + sec + " " + am_pm;

  document.getElementById("time").innerHTML = currentTime;
}

setInterval(showTime, 1000);
