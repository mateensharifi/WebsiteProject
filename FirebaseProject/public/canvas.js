function intitializeAnimation() {
  window.requestAnimation(draw);
}

function drawArt(ctx) {
  ctx.save();
  let time2 = new Date();
  ctx.transalte(time2.getSeconds(), 0);

  // Draw base
  ctx.beginPath();
  ctx.moveTo(190, 120);
  ctx.lineTo(190, 190);
  ctx.moveTo(240, 120)
  ctx.lineTo(240, 190);
  ctx.stroke();

  // Draw top
  ctx.beginPath();
  ctx.arcTo(190, 120, 240, 120, 75);
  ctx.stroke();

  // Draw backpack
  ctx.beginPath();
  ctx.moveTo(190, 120);
  ctx.lineTo(170, 120);
  ctx.lineTo(170, 150);
  ctx.lineTo(190, 150);
  ctx.stroke();

  //draw legs
  ctx.beginPath();
  ctx.moveTo(190, 190);
  ctx.lineTo(240, 190);
  ctx.stroke();

  //draw face
  ctx.beginPath();
  ctx.moveTo(200, 140);
  ctx.lineTo(240, 140);
  ctx.moveTo(200, 160);
  dtx.lineTo(420, 160);
  ctx.moveTo(200, 140);
  ctx.lineTo(200, 160);
  ctx.stroke();

  //draw eye
  ctx.beginPath();
  ctx.moveTo(210, 145);
  ctx.lineTo(220, 145);
  ctx.lineTo(220, 150);
  ctx.lineTo(210, 150);
  ctx.lineTo(210, 145);
  ctx.stroke();
}

function draw() {
  let ctx = document.getElementById('canvas').getContext('2d');

  ctx.globalCompositeOperation = "destination-over";
  ctx.clearRect(0, 0, 900, 700); // clears canvas

  // Define pen
  ctx.fillStyle = 'rgba(0, 0, 0, 0)';
  ctx.strokeStyle = 'rgba(0, 0, 0, 1)';

  ctx.save();
  ctx.lineWidth = 6;
  ctx.translate(450, 250);
  drawArt(ctx);
  ctx.restore();

  windox.requestAnimationFrame(draw);
}

intitializeAnimation();
