function rgbToHex(red, green, blue) {
  const hexDigits = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
  ];

  let redQ = hexDigits[Math.floor(red / 16)];
  let greenQ = hexDigits[Math.floor(green / 16)];
  let blueQ = hexDigits[Math.floor(blue / 16)];

  let redR = hexDigits[red % 16];
  let greenR = hexDigits[green % 16];
  let blueR = hexDigits[blue % 16];

  color = "#" + redQ + redR + greenQ + greenR + blueQ + blueR;
  return color;
}

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

  if (hour >= 12) {
    hour %= 12;
    am_pm = "PM";
  }

  hour = formatTime(hour);
  min = formatTime(min);
  sec = formatTime(sec);

  let currentTime = `${hour}:${min}:${sec} ${am_pm}`;
  let color1 = rgbToHex(red[0], green[0], blue[0]);
  let color2 = rgbToHex(red[1], green[1], blue[1]);
  let bgColor = `linear-gradient(${sec * 6}deg, ${color1} 0%, ${color2} 100%)`;

  document.getElementById("time").innerHTML = currentTime;
  document.body.style.background = bgColor;

  document.body.addEventListener("click", () => {
    document.querySelector("main").style.cursor = "default";
    temp.value = bgColor;
    temp.select();
    document.execCommand("copy");
    setTimeout(() => {
      document.querySelector(".hidden").style.opacity = "1";
      document.querySelector("main").style.cursor = "pointer";
    }, 300);
  });
  document.querySelector(".hidden").style.opacity = "0";
}

const temp = document.createElement("input");
document.body.appendChild(temp);

setInterval(showTime, 1000);
