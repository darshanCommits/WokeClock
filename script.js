function timeToRGB(hour, min, sec) {
  let totalSeconds = hour * 12 + min * 6 + sec * 3; //Total sec as of RN
  let percentOfDay = totalSeconds / (24 * 6 * 6); //Sec as of RN / Total sec of entire day.

  let red = Math.floor(255 * percentOfDay);
  let green = Math.floor(255 * (1 - percentOfDay));
  let blue = Math.floor(128 * Math.abs(percentOfDay - 0.5) * 2);

  color = [red, green, blue];
  return color;
}
function formatTime(i) {
  if (i < 10) {
    i = "0" + i;
  }

  return i;
}

function showTime() {
  const time = new Date();

  let hour = time.getHours();
  let min = time.getMinutes();
  let sec = time.getSeconds();
  let am_pm = "AM";

  let grad1 = timeToRGB(hour, min, sec);
  let grad2 = timeToRGB(hour % 12, min % 12, sec % 12);
  let red = [grad1[0], grad2[0]];
  let green = [grad1[1], grad2[1]];
  let blue = [grad1[2], grad2[2]];

  console.log(red, green, blue);
  let color1 = `RGB(${red[0]}, ${green[0]}, ${blue[0]})`;
  let color2 = `RGB(${red[1]}, ${green[1]}, ${blue[1]})`;

  if (hour >= 12) {
    hour %= 12;
    am_pm = "PM";
  }

  hour = formatTime(hour);
  min = formatTime(min);
  sec = formatTime(sec);

  let currentTime = `${hour}:${min}:${sec} ${am_pm}`;
  let gradRotation = sec * 6;
  
  document.getElementById("time").innerHTML = currentTime;
  document.body.style.background = `linear-gradient(${gradRotation}deg, ${color1} 0%, ${color2} 100%)`;
}

setInterval(showTime, 1000);
