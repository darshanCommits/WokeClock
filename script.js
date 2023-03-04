function timeToHSL(hour, min, sec) {
  let hue = (sec * 3) % 360; //a wheel of 360

  let sat = ((min * 60) / (60 * 60)) * 100; //percentage value
  let lum = ((hour * 60) / (12 * 60)) * 100; //percentage value

  //to fix the black screen and white screen issue
  sat = Math.floor(sat > 80 ? sat / 3 : sat < 20 ? sat + 60 : sat);
  lum = Math.floor(lum > 80 ? lum / 3 : lum < 20 ? lum + 60 : lum);

  color = [hue, sat, lum];
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

  let grad1 = timeToHSL(hour, min, sec);
  let grad2 = timeToHSL(hour % 6 , min % 6, sec + 60);

  let hue = [grad1[0], grad2[0]];
  let lum = [grad1[2], grad2[2]];
  let sat = [grad1[1], grad2[1]];

  if (hour >= 12) {
    hour %= 12;
    am_pm = "PM";
  }

  hour = formatTime(hour);
  if (hour == 00) {
    hour = 12;
  }
  min = formatTime(min);
  sec = formatTime(sec);

  let currentTime = `${hour}:${min}:${sec} ${am_pm}`;

  let color1 = `hsl(${hue[0]}, ${sat[0]}%, ${lum[0]}% )`;
  let color2 = `hsl(${hue[1]}, ${sat[1]}%, ${lum[1]}% )`;

  let bgColor = `linear-gradient(${sec * 6}deg, ${color1} 0%, ${color2} 100%)`;

  document.getElementById("time").innerHTML = currentTime;
  document.body.style.background = bgColor;

  document.body.addEventListener("click", () => {
    document.querySelector("main").style.cursor = "default";
    temp.value = bgColor;
    temp.select();
    document.execCommand("copy");
    setTimeout(() => {
      document.querySelector("main").style.cursor = "pointer";
      document.querySelector(".hidden").style.opacity = "1";
    }, 300);
  });
  document.querySelector(".hidden").style.opacity = "0";
}

const temp = document.createElement("input");
document.body.appendChild(temp);

setInterval(showTime, 1000);
