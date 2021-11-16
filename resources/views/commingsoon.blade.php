<!DOCTYPE html>
<html>
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
            integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z" crossorigin="anonymous">
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
            integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous">
    
        <title>Vidhvaa</title>
        <link href="{{ asset('img/logo4.png') }}" rel="icon">

    </head>
<style>
    @import url('https://fonts.googleapis.com/css?family=Raleway:200,400,700');

body {
  font-family: 'Raleway', sans-serif;
}

.wrapper {
  position: absolute;
  background-image: url(http://vidhvaa.com/img/about-list-img.jpg);
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-size: cover;
  background-position: 50% 50%;
  background-repeat: no-repeat;
  background-color: #444;
  background-blend-mode: overlay;
}

.coming-soon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  width: 100%;
}

.coming-soon h1 {
  display: inline-block;
  font-size: 52px;
  border: 5px solid #000;
  padding: 8px 40px;
  color: #ffd905;
  animation: text-animation 3s ease-in-out forwards;
  font-weight: 700;
}

@media only screen and (max-width:500px) and (min-width:300px) {
 .coming-soon h1 {
  font-size: 25px;
}
}
.coming-soon .ctdown {
  font-weight: 700;
  font-size: 42px;
  display: flex;
  justify-content: center;
  min-height: 160px;
  opacity: 0;
  transition: opacity 3s ease-in-out;
}

.time-box {
  display: flex;
  flex-direction: column;
  color: #ffd905;
  align-items: center;
  justify-content: center;
  background: rgba(0,0,0, 0.7);
  width: 160px;
  height: 160px;
}

.time-box:not(:last-child) {
  margin-right: 20px;
}

.time-box span {
  font-size: 18px;
  font-weight: 200;
}

@keyframes text-animation {
  from {
    transform: scale(0) rotateY(0deg);
  }
  to {
    transform: scale(1) rotateY(720deg);
  }
}
.footer {
  position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    background-color: #ffc107d9;
    color: black;
    text-align: center;
}
p {
    margin-top: 18px;
    margin-bottom: 18px;
    font-family: cursive;
}
</style>
<body>
    <section class="wrapper">
        <div class="coming-soon">
          <h1>Welcome Vidhvaa</h1>
          <div id="countdown" class="ctdown"></div>
        </div>
      </section>
      
<div class="footer">
  <p>Copyright © 2020, All Right Reserved Vidhvaa &nbsp; <a href="http://www.vidhvaa.com/terms.html" style="color: rgb(0, 0, 0);"> Terms & conditions </a> &nbsp; <a href="http://www.vidhvaa.com/privacy.html" style="color: rgb(0, 0, 0);"> privacy policy </a></p>
</div>
      <script>
          const timeToBeReach = new Date("apr 30, 2021 00:00:00").getTime();

const updateCountDown = setInterval(() => {

  const now = new Date().getTime();

  const timeDistance = timeToBeReach - now;

  const days = Math.floor(timeDistance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeDistance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeDistance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeDistance % (1000 * 60)) / 1000);

  const countDown = document.getElementById('countdown');

  countDown.innerHTML = `
    <div class="time-box">${days} <span>days</span></div>
    <div class="time-box">${hours} <span>hours</span></div>
    <div class="time-box">${minutes} <span>minutes</span></div>
    <div class="time-box">${seconds} <span>seconds</span></div>
  `;

  countDown.style.opacity = 1;

  //if time is up
  if (timeDistance < 0) {
    clearInterval(updateCountDown);
    countDown.innerHTML = "It's time !";
  }

}, 1000);

      </script>
 </body>