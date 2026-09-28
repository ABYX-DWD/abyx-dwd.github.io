(function () {
  "use strict";

  function roundedRect(ctx, x, y, w, h, r) {
    var rr = Math.max(0, Math.min(r, Math.min(w, h) / 2));
    ctx.beginPath();
    ctx.moveTo(x + rr, y);
    ctx.lineTo(x + w - rr, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + rr);
    ctx.lineTo(x + w, y + h - rr);
    ctx.quadraticCurveTo(x + w, y + h, x + w - rr, y + h);
    ctx.lineTo(x + rr, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - rr);
    ctx.lineTo(x, y + rr);
    ctx.quadraticCurveTo(x, y, x + rr, y);
    ctx.closePath();
  }

  function fitText(ctx, text, maxWidth, startSize, minSize, weight, family) {
    var size = startSize;
    var ff = family || "Arial, Helvetica, sans-serif";
    while (size > minSize) {
      ctx.font = (weight || "900") + " " + size + "px " + ff;
      if (ctx.measureText(text).width <= maxWidth) return size;
      size -= 1;
    }
    ctx.font = (weight || "900") + " " + minSize + "px " + ff;
    return minSize;
  }


  function seededRandom(seed) {
    var s = (seed >>> 0) || 1;
    return function () {
      s ^= s << 13;
      s ^= s >>> 17;
      s ^= s << 5;
      return ((s >>> 0) % 100000) / 100000;
    };
  }

  function drawGrungeTexture(ctx, w, h, seed) {
    var rnd = seededRandom(seed || 434);

    ctx.save();

    // Dust / chipped paint.
    for (var i = 0; i < 360; i++) {
      var x = Math.floor(rnd() * w);
      var y = Math.floor(rnd() * h);
      var rw = 1 + Math.floor(rnd() * 9);
      var rh = 1 + Math.floor(rnd() * 3);
      ctx.fillStyle = rnd() > .55 ? "rgba(255,255,255,.045)" : "rgba(0,0,0,.10)";
      ctx.fillRect(x, y, rw, rh);
    }

    // Scratches.
    ctx.lineCap = "round";
    for (var j = 0; j < 58; j++) {
      var sx = rnd() * w;
      var sy = rnd() * h;
      var len = 16 + rnd() * 90;
      var ang = (-.22 + rnd() * .44);
      ctx.beginPath();
      ctx.moveTo(sx, sy);
      ctx.lineTo(sx + Math.cos(ang) * len, sy + Math.sin(ang) * len);
      ctx.strokeStyle = rnd() > .45 ? "rgba(232,244,252,.055)" : "rgba(255,91,168,.045)";
      ctx.lineWidth = .6 + rnd() * 1.5;
      ctx.stroke();
    }

    ctx.restore();
  }

  function drawDistressedFrame(ctx, w, h, seed) {
    var rnd = seededRandom(seed || 9152);
    ctx.save();

    // Burned / distressed edges.
    var edge = ctx.createLinearGradient(0, 0, 0, h);
    edge.addColorStop(0, "rgba(0,0,0,.44)");
    edge.addColorStop(.035, "rgba(0,0,0,0)");
    edge.addColorStop(.965, "rgba(0,0,0,0)");
    edge.addColorStop(1, "rgba(0,0,0,.55)");
    ctx.fillStyle = edge;
    ctx.fillRect(0, 0, w, h);

    var side = ctx.createLinearGradient(0, 0, w, 0);
    side.addColorStop(0, "rgba(0,0,0,.48)");
    side.addColorStop(.03, "rgba(0,0,0,0)");
    side.addColorStop(.97, "rgba(0,0,0,0)");
    side.addColorStop(1, "rgba(0,0,0,.48)");
    ctx.fillStyle = side;
    ctx.fillRect(0, 0, w, h);

    // Irregular light chips near the border.
    ctx.fillStyle = "rgba(223,236,244,.10)";
    for (var i = 0; i < 95; i++) {
      var top = rnd() > .5;
      var vertical = rnd() > .52;
      var x = vertical ? (rnd() > .5 ? rnd() * 16 : w - rnd() * 16) : rnd() * w;
      var y = top ? rnd() * 16 : h - rnd() * 16;
      if (vertical) y = rnd() * h;
      ctx.fillRect(x, y, 1 + rnd() * 8, 1 + rnd() * 2.2);
    }

    ctx.restore();
  }

  function drawHandTitle(ctx, text, x, y, maxWidth) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(-0.012);
    ctx.textAlign = "center";
    ctx.textBaseline = "alphabetic";

    var family = '"Arial Black", Impact, "Segoe UI Black", Arial, sans-serif';
    var size = fitText(ctx, text, maxWidth, 88, 56, "900", family);
    ctx.font = "900 " + size + "px " + family;
    ctx.lineJoin = "round";

    // Deep shadow for separation from the artwork.
    ctx.strokeStyle = "rgba(0,0,0,.66)";
    ctx.lineWidth = 10;
    ctx.strokeText(text, 4, 7);

    // Thin electric-pink keyline, then an ivory fill.
    ctx.strokeStyle = "rgba(255,100,183,.92)";
    ctx.lineWidth = 4;
    ctx.strokeText(text, 0, 0);

    ctx.fillStyle = "#f7f2e8";
    ctx.fillText(text, 0, 0);

    // Two rough hand-painted accents keep a little personality without hurting legibility.
    ctx.strokeStyle = "#ff64b7";
    ctx.lineCap = "round";
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(-maxWidth * .30, 20);
    ctx.quadraticCurveTo(0, 31, maxWidth * .31, 17);
    ctx.stroke();

    ctx.globalAlpha = .46;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(-maxWidth * .18, 29);
    ctx.lineTo(maxWidth * .24, 24);
    ctx.stroke();
    ctx.globalAlpha = 1;

    ctx.restore();
  }

  function drawRowDistress(ctx, x, y, w, h, index) {
    var rnd = seededRandom(8000 + index * 97);
    ctx.save();
    ctx.strokeStyle = "rgba(212,232,245,.05)";
    ctx.lineWidth = 1;

    for (var i = 0; i < 5; i++) {
      var sx = x + 8 + rnd() * (w - 16);
      var sy = y + 4 + rnd() * (h - 8);
      ctx.beginPath();
      ctx.moveTo(sx, sy);
      ctx.lineTo(sx + 8 + rnd() * 28, sy + (rnd() - .5) * 4);
      ctx.stroke();
    }

    // Tiny paint slash.
    ctx.fillStyle = index % 3 === 0 ? "rgba(255,100,183,.22)" : "rgba(94,215,255,.14)";
    ctx.fillRect(x + 3, y + 7, 3, Math.max(10, h - 14));
    ctx.restore();
  }

  function drawFeather(ctx, x, y, len, width, side, fillColor, strokeColor) {
    var dir = side >= 0 ? 1 : -1;
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(dir, 1);

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(len * .18, -width * .95, len * .78, -width * .72, len, 0);
    ctx.bezierCurveTo(len * .78, width * .72, len * .18, width * .95, 0, 0);
    ctx.closePath();
    ctx.fillStyle = fillColor;
    ctx.fill();
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = 1.2;
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(len * .92, 0);
    ctx.strokeStyle = "rgba(255,239,216,.62)";
    ctx.lineWidth = 1.2;
    ctx.stroke();

    for (var i = 1; i <= 5; i++) {
      var px = len * (.12 + i * .13);
      ctx.beginPath();
      ctx.moveTo(px, 0);
      ctx.lineTo(px - len * .08, -width * (.16 + i * .10));
      ctx.strokeStyle = "rgba(255,239,216,.38)";
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(px, 0);
      ctx.lineTo(px - len * .08, width * (.16 + i * .10));
      ctx.strokeStyle = "rgba(255,239,216,.22)";
      ctx.stroke();
    }
    ctx.restore();
  }

  function drawFeatherCluster(ctx, centerX, y) {
    var left = centerX - 165;
    var right = centerX + 165;

    drawFeather(ctx, left, y, 72, 17, -1, "#b98c42", "rgba(255,224,156,.52)");
    drawFeather(ctx, left - 30, y + 8, 60, 14, -1, "#d3a04d", "rgba(255,224,156,.42)");
    drawFeather(ctx, left - 55, y + 17, 50, 12, -1, "#74bada", "rgba(196,233,250,.34)");

    drawFeather(ctx, right, y, 72, 17, 1, "#b98c42", "rgba(255,224,156,.52)");
    drawFeather(ctx, right + 30, y + 8, 60, 14, 1, "#d3a04d", "rgba(255,224,156,.42)");
    drawFeather(ctx, right + 55, y + 17, 50, 12, 1, "#74bada", "rgba(196,233,250,.34)");
  }

  function drawMiddlePattern(ctx, x, y, w, h) {
    if (h <= 0) return;
    ctx.save();

    var glow = ctx.createRadialGradient(x + w / 2, y + h * .48, 20, x + w / 2, y + h * .48, Math.max(w, h) * .62);
    glow.addColorStop(0, "rgba(104,203,255,.105)");
    glow.addColorStop(.46, "rgba(224,174,85,.055)");
    glow.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = glow;
    ctx.fillRect(x, y, w, h);

    ctx.lineWidth = 1;
    for (var i = 0; i < 7; i++) {
      ctx.beginPath();
      ctx.arc(x + w / 2, y + h * .48, 95 + i * 30, -.25, Math.PI * 1.12);
      ctx.strokeStyle = i % 2 ? "rgba(241,193,106,.045)" : "rgba(111,209,255,.045)";
      ctx.stroke();
    }

    ctx.strokeStyle = "rgba(193,221,239,.045)";
    for (var j = 0; j < 8; j++) {
      var yy = y + 30 + j * Math.max(48, h / 9);
      ctx.beginPath();
      ctx.moveTo(x + 30, yy);
      ctx.lineTo(x + w - 30, yy - 28);
      ctx.stroke();
    }

    ctx.restore();
  }

  function drawCover(ctx, img, x, y, w, h, focusY) {
    var scale = Math.max(w / img.width, h / img.height);
    var sw = w / scale;
    var sh = h / scale;
    var sx = (img.width - sw) / 2;
    var fy = typeof focusY === "number" ? Math.max(0, Math.min(1, focusY)) : 0.5;
    var sy = (img.height - sh) * fy;
    ctx.drawImage(img, sx, sy, sw, sh, x, y, w, h);
  }

  function getBannerSource() {
    var banner = document.querySelector(".banner");
    if (!banner) return "";
    var bg = banner.style.backgroundImage || window.getComputedStyle(banner).backgroundImage || "";
    var match = bg.match(/^url\((['"]?)(.*)\1\)$/);
    return match ? match[2] : "";
  }

  function loadBanner(callback) {
    var src = getBannerSource();
    if (!src) {
      callback(null);
      return;
    }
    var img = new Image();
    img.onload = function () { callback(img); };
    img.onerror = function () { callback(null); };
    img.src = src;
  }

  function loadPosterHeader(callback) {
    var img = new Image();
    img.onload = function () { callback(img); };
    img.onerror = function () {
      // Safe fallback to the app banner if the dedicated poster artwork is unavailable.
      loadBanner(callback);
    };
    img.src = "./assets/franky-anime-header-master.webp?v=1";
  }

  var posterTroopIcons = {};

  function loadPosterTroopIcons(callback) {
    var sources = {
      fighter: "data:image/png;base64,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",
      shooter: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAQlElEQVR42u2ZaZRcZZnHf897b1V1VVf1kk7vnXQ2QtIJi2kiZiGJxCDEBQk0ARmdETk4Hs8M5+DRmXPmaBM9Oo4OqIw4oGdQENATMAyKgASQkEAiIZIdstFJd9JJ76nqpZZb7/vMh+pOIlsSZRw/zO0P3dW37nuf//P/P8v7PvD/1//t5b2Ha0krrWYJS7wv8AVZrauB28ySdXiwxPwdS1jHOv2rQq+otLDaW83qM3ZEK61+Cy0eIO+J1872gVZaDWBoxa1atcqdcit8HjfMnkrdJdWRcfPKE4kJ+Ww+2zeU2tOt/Rv2sm/jPn7zxqlrtYwCX02LE0T/1wCMGb2KVflT/z+OS+vnMGNBo193WcOkqkVTJtafc17DdCaOrybhxch0OPpSKQ72H+H1nn3p9r6jO9qPdz3XxuG1G/n1ZugbPPkONc9zm1nHbZazAPOuAFpo8Zpam/RUTzdxQ9M51F42aXz18snT698/e/r00qbGKdTEyxAVR4Y8Q0h+xBH0GaI+SghxSmg4nefw8W52Hd3L3u43Og71da4/mDv6xB848Fwvvz16KjNN7NJV/BHDZweglVYztsBMrp7VxLQrpzTUfXz6+Y1zms+bFZo2sZ6EH4VBAvogGLAy2J81w4OW4eN5csOqqirhIo9o3FAcD2txLKyxIuMQTDbA700leb3nDbYfe21gX3f7+raRw2teZe+TXaztfrMNZwVg7MFFfHZZU3TarRcuOufSeQsuDJ8zYQJRwkoveY7BcF/OpPpyMjRgyQxZ8hlFneCLqPEEVXDO4VDUqPhhQ1HMIxbzKC4OazwWdqEw5B2hvuEhdh7dx8vt23p2dh5Y8wYH/30TD+w/HQh5J+Ov5NavXLF0wdeuuXkZFSbh6CBPOybVk5FUbyDDSUt2yGFzisGo7xs83zuxoCqIyNgfOLUEeYdVh1OL+EJR1JNYsU88EdFELOwiIUjnCbV1d/Lg1seSmwdevX4tP37y3UDIm7PCw1xrl3DzR65d/OHHP/+vKwLWQ2Znzhvoz5EcyDOSstisEvI8QsZTzxcEwUNURURxonpydYPo2GenIKhadWKdI7CWQK2Ir0RjHqWlRZTGizQe9vN9g9nINzf8IPXC0CszX+UXR6FVeBsQ5u1QVUn531/xgQXKBjS5Ke3t3Zni8L40/UdGIKuUJmLEE0WEIj6KYERUQRQno4YXfkAcalQQFRUxKmJEfONpyPgaDYWIhyMaVl9HklYPHUxysP249CTTofGxSHZh3fyScopXALr4HWz1T/1QyMdQ7EXq/B1RCcoxhw+nyaaUlE2Rqk2TSY+Qb3OMkzIqEmVSlojjR0I4VfLZnIpnECloyI2yIKKgoKqoQUwBnYKoUSEsIUzIiO88TR7PUloWkb5eJDvsaRi/9t2C2P9jPRXyrxojeEreQjZticUibHztAHP/5RyaPzlDDmzopmN9L/s27NPM3rwUDyWoiY6ntnI8RtGxEAAQETVewWRFUaeoU1VR1IF4xjlrBSd4YiTs+ThfyQ4VTLKoOWMAJ1sEfHEFHxnPYNQjGvbZ9Uwb826arNMvq2PmZXXkrJWe/Sk6NnVL2zOduv+pNi6pmYvnGzzPUxtYRoayjKSz5PKBKEpROExZSYJQOEQ+n1frrHi+h6++ZoIAI1YkX2BIRBDUO1MAUrAdUXW+Gh2lX3B51YbyGtn0++0c78sTjoENFOOLjp9WTv255QwldsrmX76oi72Lpa8/Sd9wikxxFn8ChBuNhMYZnLXac3CE3TszMi5ZzuSaCRKLFml7T6cMjKSYXDlBx+g7kclQ/6wZAEQR1IGzSmADqsoqyezJ0rG1jxlLq7E2wDlHkIM1393Amtt+rYvMErYe20vRxcLEj1ZQu7CeRGORhGO+jqU7B/S3Jdn6s/1svvdVkUMR6q5PSNlcdNM/b5EFNRerdYpzhZhx7xC87wbAAF5Bq+BUQS3xULGW2GLZ+7sjzFhaXaDLhPHDUDbeUBU0Mu2GyXL+l2q0YlYJnm+wgMtBkC18XRWczVPakNDLv9osnTcMcHRbv7xvxVT27e1ird3CxfYi1JoTmtA/IQaMjqIWAyJjIAwNJTUceL5dlDmayRge/fZvWbiymStuni/FlLDjoXZdMGUG+MhICob6c9rV3q8DnUls3lJaWSINM6q1rNZIMhVQNqFcK6eWY4GnvrdRIpmQYoxYpyejEeedJYAmkVHUOkq5FSRvrdaX17Fz917d80I/j93xGzY/toVda/Zz80PXsejm2QwNDcqdCx7RS79+Ma888arufP51RjqG8dIFG5xvtXxGBZfeeAkLPz1bxOTU2TCP3r6Ol+/eotfXf5KszRJ30UIciCCYs2Wg0jjwnOOEhNShgc0xPlZBaV+UVVd8h8ZsA1fFr5Hh6hQb7t5MZvgClt86j6KSLfLdT/xYaxjHebGZ1MUbSFTGcU7JaYYNO3/Prv/aw7KbZivhML9ofUZ++61n9Oraq6mKVmraZkERHasbY8XxTAE0kBVQg54E4BRBRA2ii6oWSOPgRCbVTGJb316u+ckijZQoD976HNHYJVx6U7N4YU82f66dhQ2L1IQE55RQ2Keru4+ZTbNY8VQzXnGIn315Lc/dvk5X1q+kIT4B6wqdgnOFtsOpnjYG3nLTEoiO7iicGyuYBUYVpTRSykW1zfQPDFJ7dZyK6XFKahLEqqN855p7ZP+uFIs/fSFzftjAs+0vCFYIR0IMDCTZH2mT5b+cJUUNEbnvS0/zu9vXs7KhhYmJRsSJM2rUoTh1JyKA02Sht9zMEzeCihQsxjHGgo42Oah1eT2a7+a8T09EgCOHhuXVR1+n7EhC77r6Ad27Lcmln5nDBT+o49n29dLbN8CuYC/LH5lNxYxSfvrFtbxwx4tyXf21NMQnnvBSHiejjI/WgtMH8VsAlJI2Ct6JPOAUhwoiqDowQn9qUPxzlNrmcSiwZ1Ob2kOO66a2UNdWxV0t97Fve4pln23mwu/XsN5tZPmaC6S+uYL7/ulZXrhjvbbUrdC6REPhZMCZsbSvzhXs1kLvgSJnxwCMK4hFOekJRbXgGTXia18ySfkFMSLxkAJy6NXDTJA6iiIxlk5dSt2hWv3Bdffr61v7mX/THD6/+cOUv69c7/3ys/r0t5/lyvIrmVQ2FVWnBlGHjhFeQKFjGVBxWDkrAI68GETGBKhSWNSqKzABDOWGiE2KnNDpSFeaceEKfPFUFb1i5uXEX0uw+pYn6T8SaHF1gt6DfWz5yRaZP32epqem2d65i4gXIY9iC/kC53T0fSfbCfPuIfDWLFRMxmihmI12R1rYEqJjmMi4LM4PFRonIBINAwaHUlQUZk/bQabPn8LH7pvDQCqgoz9NQ1MF39j6D4RiIfHijjVfXMfGH21h3rlzGU6ntSDVMeP1ZGd25kGso1koL4W8M1rFGGNAcThcob6Q7Bw+QVLj3Fq6s314vifb9++TkYUDcu2z88mGfb3zb+/hzpX3MtCZJlQZIe8ruYxh5Z3L8D81JJv2vCIRP2Ks2hNSPblVFHT09LCKWXqGEiqWE4UECkaP6VIF65wkYjEOvXJUcmkkPZiX9181E2YGPLn1BYleb+WTjy+kY98gX136XYLNVuK9paAWFyhqQYwhk4Yb7vmwBit6ZOvB7RIJRcTixnY6FJSkcJpC9rb0iIhgCvp37kQ+RgUCZ6kuq+bYH3p446Vu/KhPLBFlxV0LZEbreD7xo2Z2vNStty2/nZoDNSyvWq6xkjih4qg45whFPNp3d2v7zj4NMh43PrBCO+cekM7eTgn7YWxhvwMyeiZQ2N+dTQzkBQpttOdBKGwYGswRDqsYRQNniYdLtF5q+NU3n+OWi68jawNpnN+gsz44kU1Pd8j3/+ZuZiab+FDjMlQdvW/08Gjr81z3naWEo7B/4yFWf+Nxpl40GQWOtHXoFGkS65zmcjnxQ4KzJ04cRn89fKaV2IpTK77xcAE0Ti0lXi4yOJghG+RRlJwNaG5o5vBz3XRs6ZRwzEOdkRcfPyTfu+4/OX/wApZNuAwjRsNeRJfULmTdXRv0iW+9rBHAqhLuLsI85ZN9ImBuch4VRdV6fDgpDTOjUlYZxdqCdadLo/6bT1g8yoaH8oPp3YcPlsysbMKEYzJjRjVd3Uk9cnAELxeiJB5j4PgQH1x5kUz7QLXiGbY8fYjv33C3NOeb9ZKGxYgYFRW1KHXxCXJ51TIe+dpj1M2s1sAFTGAiV0z7GOl8hpHhHK4oK7PmjCPul5LsFEbMCO2DB51iUwDdNMnpJKQttHgP8/BIGZ96/tkDG663w6FMfWVVpDxXptXlVZSXD0pHR5LhgSy9Q73EZ2c1UE82PLCDn/7jg1xkL9b5tQuxWjhxcDraFTvrppacKx8KRuSeG+9Fx2eZX3YpqeG0ZswIdTOiUl9TRdBfRE9vjt7Bbt3ds0u3D75iIP+rQhbaracdcOymRWAdUzl3c7/rv2o4mx1vsuFArROxYQlLXCqrohItUQwhnn7sRX59/1q23r9N5obm0Vz5flRQo57mQa2qjG4LyTlHVbSKcZRLaX8NE4qnUF7vybmzKqTUH0+q06e7t5/23kN2W99WeWX4xVCXtt+/nkf+rZVW80N+ePqTuVM39x/gI/Uxyn7U4E1bPiN2PueUTA/qKqq8cfFyiSdC6sfyHOvtZcuuvUSllMriSsVXDD7qRDEn2xAK/a1kcwHOImUVvtROLqLYTzDS55NMjdCVPKrt/R329fTO8J5gmx3SZOsGHv7GaJzqyeb0jEZMreYwP061seOhEq3oO5brnD+cyxTn09banFO1nkg+SllpghnTGojFQgwMjUgmPZo6jIrDCqpicWSCvGSyWYmWYSbPjEtddRk6GGegO8/R/mO0HTtgd/bv8P+Q2ejty29/OSC9cj0PPwStBta5P2FGtk6h1bSyRO7n7t9XUfVIn+2p6851z05nsyYYcYG1VtT6IkERpaUxqamP4heppAYzjKQDrLPkgjy5XE7ipSJTZiSkccJ4ZCTBwDGlq7+XQz0H7Ws9u2XbyBZ/R/Byss913mbovukFnmhfzGL/EPfZP3tCs5jF/jrW5QHmc9XHY5R8vcGbev7kyHQmRSflasdVe+NLKyURK6a4FJyfobsvSVfXCKGQaN3EhJTGEgTHw6QGLMeHB+hOdrnDgx20Zff7b+Rf57j2/NyS+8pL/PeBM50LnOWMrNW0AqtY5aZxeaSGxBeKSXy50Z9ePTE0mYbYhKC2vMZUlIw3JfGEFieAcIDNC8GQz2DSkhweoCfVpZ2DR7Qje8g/aPfS7Y68aMnetoE1z5ziLPtOev+zh3yjadYCzGV5TZT4LTFJfK7Rm17e4E+iPtoQ1JRXm3El40yRF9dczjGYPk7vUI/rGjzCkeCw354/wDHXvj3LyLdf4tEHT67bpJyh1/+sKSUgi1nsjclqAR+d6BO7pVhKb6z3ppTV+Y3UR+pyJZEygnyervQxrzPo8I64g/S6zl0ZRu4Y4LUHdrM7B0gLLWbMKX+RMeupz5768gV8dKIQ+XyxlH6myjRUl0oFVvN0aycDrmtLlvR/DGB+vpuHc29m8y86Jz4dkAu5vDJK0VUGb67AkEPXvsSaJ8d0PWq4Oxud/6Xm9jI6gX/H+HmvpvPvNQNvGyMnxlVU6V+px/86rv8BiwyGWUt1ehkAAAAASUVORK5CYII=",
      rider: "data:image/png;base64,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"
    };
    var keys = ["fighter","shooter","rider"];
    var pending = keys.length;

    keys.forEach(function(key) {
      var img = new Image();
      img.onload = function() {
        posterTroopIcons[key] = img;
        pending--;
        if (!pending) callback();
      };
      img.onerror = function() {
        pending--;
        if (!pending) callback();
      };
      img.src = sources[key];
    });
  }

  function loadPosterAssets(callback) {
    loadPosterTroopIcons(function() {
      loadPosterHeader(function(headerImg) {
        callback(headerImg);
      });
    });
  }

  function getRallyCount() {
    var el = document.getElementById("resultCount");
    return el ? (parseInt(el.textContent, 10) || 0) : 0;
  }

  function getLaunchers() {
    var cards = document.querySelectorAll("#resultsList .result-card");
    var groups = [];
    var byName = {};

    Array.prototype.forEach.call(cards, function (card) {
      var nameEl = card.querySelector(".result-name");
      var apcEl = card.querySelector(".vehicle-sub");
      var troopEl = apcEl ? apcEl.querySelector(".troop-icon") : null;
      var powerEl = card.querySelector(".result-right strong");
      var sizeEl = card.querySelector(".result-rally-size strong");
      var scoreEl = card.querySelector(".result-score strong");

      if (!nameEl || !apcEl) return;

      var name = String(nameEl.textContent || "").trim();
      var apc = String(apcEl.textContent || "").trim();
      var power = powerEl ? String(powerEl.textContent || "").trim() : "";
      var rallySize = sizeEl ? String(sizeEl.textContent || "").trim() : "";
      var frankyScore = scoreEl ? String(scoreEl.textContent || "").trim() : "";
      var troopType = "";

      if (troopEl) {
        var troopSrc = String(troopEl.getAttribute("src") || troopEl.src || "").toLowerCase();
        if (troopSrc.indexOf("fighter") !== -1) troopType = "fighter";
        else if (troopSrc.indexOf("shooter") !== -1) troopType = "shooter";
        else if (troopSrc.indexOf("rider") !== -1) troopType = "rider";
      }

      if (!name || !apc) return;

      if (!byName[name]) {
        byName[name] = {
          name: name,
          apcs: [],
          apcEntries: [],
          rallySize: rallySize,
          frankyScore: frankyScore
        };
        groups.push(byName[name]);
      }

      if (byName[name].apcs.indexOf(apc) === -1) {
        byName[name].apcs.push(apc);
        byName[name].apcEntries.push({ label: apc, power: power, troopType: troopType });
      } else if (troopType) {
        for (var i=0; i<byName[name].apcEntries.length; i++) {
          if (byName[name].apcEntries[i].label === apc) {
            if (!byName[name].apcEntries[i].troopType) byName[name].apcEntries[i].troopType = troopType;
            if (!byName[name].apcEntries[i].power && power) byName[name].apcEntries[i].power = power;
            break;
          }
        }
      }

      if (!byName[name].rallySize && rallySize) byName[name].rallySize = rallySize;
      if (!byName[name].frankyScore && frankyScore) byName[name].frankyScore = frankyScore;
    });

    return groups;
  }

  function drawAvatar(ctx, x, y, size, index) {
    roundedRect(ctx, x, y, size, size, 9);
    ctx.fillStyle = index % 3 === 0 ? "#10283b" : index % 3 === 1 ? "#132132" : "#0d1b28";
    ctx.fill();
    ctx.strokeStyle = "rgba(180,215,240,.32)";
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.fillStyle = index % 2 === 0 ? "#7fc9ef" : "#b8d9ed";
    ctx.beginPath();
    ctx.arc(x + size / 2, y + size * .34, size * .16, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.arc(x + size / 2, y + size * .76, size * .27, Math.PI, 0);
    ctx.fill();
  }

  function drawLauncherRow(ctx, x, y, w, h, item, index) {
    roundedRect(ctx, x, y, w, h, 11);
    ctx.fillStyle = "rgba(5,18,29,.96)";
    ctx.fill();
    ctx.lineWidth = 1.3;
    ctx.strokeStyle = "rgba(101,165,208,.55)";
    ctx.stroke();
    drawRowDistress(ctx, x, y, w, h, index);

    var avatarSize = Math.max(30, Math.min(46, h - 8));
    drawAvatar(ctx, x + 7, y + (h - avatarSize) / 2, avatarSize, index);

    var left = x + avatarSize + 18;
    var right = x + w - 18;
    var apcX = x + Math.round(w * .50);

    ctx.textAlign = "left";
    ctx.textBaseline = "alphabetic";
    ctx.fillStyle = "#f5f9ff";
    fitText(ctx, item.name, Math.max(110, apcX - left - 15), h >= 48 ? 20 : 16, 12, "900");
    ctx.fillText(item.name, left, y + Math.round(h * .44));

    var apcText = item.apcs.join(" / ");
    ctx.fillStyle = "#bfe8ff";
    fitText(ctx, apcText, Math.max(110, right - apcX - 14), h >= 48 ? 18 : 14, 11, "900");
    ctx.fillText(apcText, apcX, y + Math.round(h * .44));

    ctx.fillStyle = "#9ab7ce";
    ctx.font = (h >= 48 ? "700 13px" : "700 11px") + " Arial, Helvetica, sans-serif";
    ctx.fillText("Rally size " + (item.rallySize || "—") + "  ·  Franky " + (item.frankyScore || "—"), apcX, y + Math.round(h * .76));

    ctx.fillStyle = "rgba(182,214,236,.55)";
    ctx.font = "900 " + (h >= 48 ? 20 : 16) + "px Arial, Helvetica, sans-serif";
    ctx.fillText("›", right - 2, y + Math.round(h * .58));
  }

  function showPreview(blob, count, launcherCount) {
    var url = URL.createObjectURL(blob);
    var overlay = document.getElementById("frankyPosterPreview");
    if (overlay) overlay.remove();

    overlay = document.createElement("div");
    overlay.id = "frankyPosterPreview";
    overlay.style.cssText =
      "position:fixed;inset:0;z-index:30000;background:rgba(2,8,14,.95);" +
      "padding:calc(14px + env(safe-area-inset-top)) 14px calc(14px + env(safe-area-inset-bottom));" +
      "overflow:auto;display:flex;align-items:flex-start;justify-content:center";

    var box = document.createElement("div");
    box.style.cssText =
      "width:620px;max-width:calc(100vw - 32px)!important;margin:auto;background:#08131f;border:1px solid #244b6d;" +
      "border-radius:16px;padding:10px;box-shadow:0 18px 55px rgba(0,0,0,.55)";

    var img = document.createElement("img");
    img.src = url;
    img.alt = "ABYX FRANKY TIME";
    img.style.cssText = "display:block;width:100%;height:auto;border-radius:10px;background:#06111b";

    var meta = document.createElement("div");
    meta.textContent = count + " rallies · " + launcherCount + " launchers · " + Math.max(1, Math.round(blob.size / 1024)) + " KB";
    meta.style.cssText = "text-align:center;color:#7f96ad;font-size:10px;font-weight:800;margin:8px 0";

    var actions = document.createElement("div");
    actions.style.cssText = "display:grid;grid-template-columns:1fr 1fr;gap:7px";

    var share = document.createElement("button");
    share.type = "button";
    share.textContent = "SHARE";
    share.style.cssText = "min-height:44px;border:0;border-radius:9px;background:linear-gradient(180deg,#2ba9ff,#0874df);color:#fff;font-weight:950";

    var save = document.createElement("button");
    save.type = "button";
    save.textContent = "SAVE";
    save.style.cssText = "min-height:44px;border:1px solid #2b5277;border-radius:9px;background:#0d2135;color:#fff;font-weight:950";

    var close = document.createElement("button");
    close.type = "button";
    close.textContent = "CLOSE";
    close.style.cssText = "width:100%;min-height:42px;margin-top:7px;border:1px solid #233f59;border-radius:9px;background:#0b1724;color:#a7bbcf;font-weight:900";

    function saveFile() {
      var a = document.createElement("a");
      a.href = url;
      a.download = "ABYX_FRANKY_TIME_" + count + "_RALLIES.png";
      document.body.appendChild(a);
      a.click();
      a.remove();
    }

    save.addEventListener("click", saveFile);

    share.addEventListener("click", function () {
      try {
        var file = new File([blob], "ABYX_FRANKY_TIME_" + count + "_RALLIES.png", { type: "image/png" });
        if (navigator.share && (!navigator.canShare || navigator.canShare({ files: [file] }))) {
          navigator.share({
            title: "ABYX FRANKY TIME!",
            text: count + " rallies to be sent!",
            files: [file]
          }).catch(function () {});
        } else {
          saveFile();
        }
      } catch (e) {
        saveFile();
      }
    });

    close.addEventListener("click", function () {
      URL.revokeObjectURL(url);
      overlay.remove();
    });

    overlay.addEventListener("click", function (e) {
      if (e.target === overlay) close.click();
    });

    actions.appendChild(share);
    actions.appendChild(save);
    box.appendChild(img);
    box.appendChild(meta);
    box.appendChild(actions);
    box.appendChild(close);
    overlay.appendChild(box);
    document.body.appendChild(overlay);
  }

  function drawNeonCity(ctx, W, H) {
    ctx.save();
    var sky = ctx.createLinearGradient(0, 0, 0, H);
    sky.addColorStop(0, "#071329");
    sky.addColorStop(.52, "#0a1f38");
    sky.addColorStop(1, "#07111d");
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, W, H);

    var glow = ctx.createRadialGradient(W * .68, H * .24, 20, W * .68, H * .24, W * .62);
    glow.addColorStop(0, "rgba(44,169,255,.22)");
    glow.addColorStop(.52, "rgba(17,75,135,.10)");
    glow.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, W, H);

    var buildings = [
      [18,118,78,250],[86,78,64,290],[143,145,74,220],[210,96,58,275],
      [270,128,80,240],[346,62,62,305],[414,115,80,252],[500,74,72,292],
      [578,126,70,244],[646,88,62,282],[710,138,78,230],[792,70,70,300],[850,120,54,250]
    ];
    for (var i=0;i<buildings.length;i++) {
      var b=buildings[i];
      var bg=ctx.createLinearGradient(b[0],b[1],b[0],b[1]+b[3]);
      bg.addColorStop(0, i%3===0 ? "#102b46" : "#0c2137");
      bg.addColorStop(1, "#07101b");
      ctx.fillStyle=bg;
      ctx.fillRect(b[0],b[1],b[2],b[3]);
      for(var yy=b[1]+18; yy<b[1]+b[3]-12; yy+=24){
        for(var xx=b[0]+10; xx<b[0]+b[2]-8; xx+=18){
          var hot=((xx+yy+i*13)%5===0);
          ctx.fillStyle=hot ? "rgba(255,156,55,.72)" : "rgba(72,203,255,.42)";
          ctx.fillRect(xx,yy,5,9);
        }
      }
    }

    ctx.fillStyle="#08111b";
    ctx.fillRect(W*.66,112,13,210);
    ctx.fillRect(W*.81,112,13,210);
    ctx.fillRect(W*.625,105,W*.225,14);
    ctx.fillRect(W*.645,126,W*.185,9);
    ctx.fillStyle="rgba(255,139,38,.68)";
    ctx.fillRect(W*.625,103,W*.225,3);

    function sign(x,y,w,h,text,color){
      ctx.save();
      ctx.shadowBlur=16; ctx.shadowColor=color;
      ctx.strokeStyle=color; ctx.lineWidth=2;
      ctx.strokeRect(x,y,w,h);
      ctx.fillStyle="rgba(4,12,22,.72)";
      ctx.fillRect(x,y,w,h);
      ctx.fillStyle=color;
      ctx.font="900 14px Arial, Helvetica, sans-serif";
      ctx.textAlign="center";
      ctx.fillText(text,x+w/2,y+h/2+5);
      ctx.restore();
    }
    sign(45,52,84,36,"ABYX","#59d6ff");
    sign(745,44,108,36,"RALLY","#ff9d2e");
    sign(684,176,72,32,"勝利","#59d6ff");

    ctx.strokeStyle="rgba(5,9,15,.86)";
    ctx.lineWidth=4;
    for(var w=0;w<5;w++){
      ctx.beginPath();
      ctx.moveTo(-20,44+w*23);
      ctx.quadraticCurveTo(W*.52,80+w*18,W+30,22+w*28);
      ctx.stroke();
    }
    ctx.restore();
  }

  function drawCrown(ctx, x, y, size, color) {
    ctx.save();
    ctx.translate(x,y);
    ctx.fillStyle=color;
    ctx.beginPath();
    ctx.moveTo(-size*.5,size*.28);
    ctx.lineTo(-size*.38,-size*.26);
    ctx.lineTo(-size*.10,size*.02);
    ctx.lineTo(0,-size*.42);
    ctx.lineTo(size*.14,size*.02);
    ctx.lineTo(size*.42,-size*.28);
    ctx.lineTo(size*.5,size*.28);
    ctx.closePath();
    ctx.fill();
    ctx.fillRect(-size*.48,size*.31,size*.96,size*.12);
    ctx.restore();
  }

  function drawBrushWord(ctx, text, x, y, maxWidth, fill, shadow) {
    ctx.save();
    ctx.translate(x,y);
    ctx.transform(1,-.06,-.10,1,0,0);
    ctx.textAlign="center";
    ctx.textBaseline="alphabetic";
    var family='"Arial Black",Impact,Arial,sans-serif';
    var size=fitText(ctx,text,maxWidth,82,42,"900",family);
    ctx.font="900 "+size+"px "+family;
    ctx.lineJoin="round";
    ctx.strokeStyle=shadow || "rgba(0,0,0,.72)";
    ctx.lineWidth=10;
    ctx.strokeText(text,4,7);
    ctx.strokeStyle="rgba(255,255,255,.13)";
    ctx.lineWidth=2;
    ctx.strokeText(text,0,0);
    ctx.fillStyle=fill;
    ctx.fillText(text,0,0);
    ctx.restore();
  }

  function drawHeroSilhouette(ctx) {
    ctx.save();
    ctx.translate(96,118);

    ctx.fillStyle="#07101a";
    ctx.beginPath();
    ctx.ellipse(118,105,92,102,-.12,0,Math.PI*2);
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(62,118); ctx.quadraticCurveTo(5,192,28,292);
    ctx.quadraticCurveTo(80,250,103,170); ctx.closePath(); ctx.fill();

    ctx.fillStyle="#e8c1ad";
    ctx.beginPath();
    ctx.ellipse(120,108,55,67,-.10,0,Math.PI*2);
    ctx.fill();

    ctx.fillStyle="#0a1019";
    ctx.beginPath();
    ctx.moveTo(73,74); ctx.quadraticCurveTo(118,24,171,63);
    ctx.lineTo(154,99); ctx.quadraticCurveTo(126,70,96,108);
    ctx.lineTo(79,122); ctx.closePath(); ctx.fill();

    ctx.strokeStyle="#14233a"; ctx.lineWidth=4;
    ctx.beginPath(); ctx.moveTo(91,111); ctx.lineTo(108,108); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(135,107); ctx.lineTo(153,109); ctx.stroke();
    ctx.fillStyle="#56d8ff";
    ctx.beginPath(); ctx.arc(102,110,3.5,0,Math.PI*2); ctx.fill();
    ctx.fillStyle="#ff9c2d";
    ctx.beginPath(); ctx.arc(143,109,3.5,0,Math.PI*2); ctx.fill();

    ctx.fillStyle="#d8ad9c";
    ctx.fillRect(105,165,32,36);
    ctx.fillStyle="#f4f5f6";
    ctx.beginPath();
    ctx.moveTo(75,194); ctx.lineTo(161,194); ctx.lineTo(182,300); ctx.lineTo(56,300); ctx.closePath(); ctx.fill();

    ctx.fillStyle="#0a1420";
    ctx.font="900 24px Arial, Helvetica, sans-serif";
    ctx.textAlign="center";
    ctx.fillText("ABYX",119,252);
    drawCrown(ctx,119,217,26,"#0a1420");

    ctx.strokeStyle="#0a1019"; ctx.lineWidth=28; ctx.lineCap="round";
    ctx.beginPath(); ctx.moveTo(70,205); ctx.lineTo(26,284); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(166,205); ctx.lineTo(205,282); ctx.stroke();
    ctx.strokeStyle="#278fd2"; ctx.lineWidth=4;
    ctx.beginPath(); ctx.moveTo(61,210); ctx.lineTo(25,279); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(175,210); ctx.lineTo(205,278); ctx.stroke();

    ctx.strokeStyle="#ff9d2e"; ctx.lineWidth=6;
    ctx.beginPath(); ctx.arc(91,55,18,0,Math.PI*2); ctx.stroke();
    ctx.beginPath(); ctx.arc(132,51,18,0,Math.PI*2); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(109,53); ctx.lineTo(114,52); ctx.stroke();

    ctx.restore();
  }

  function getRole(index) {
    if(index<3) return {label:"CORE", fill:"#f3bd52", text:"#101820", border:"#ffd97b"};
    if(index<6) return {label:"HOT", fill:"#f36c21", text:"#111820", border:"#ff9b4a"};
    return {label:"BACKUP", fill:"#28b8ee", text:"#07131e", border:"#74dcff"};
  }

  function cleanApcText(value) {
    return String(value || "—")
      .replace(/APC\\s*\\d*\\s*[:·-]?\\s*/ig,"")
      .replace(/\\s+/g," ")
      .trim() || "—";
  }

  function drawRoleBadge(ctx,x,y,w,h,role){
    ctx.save();
    roundedRect(ctx,x,y,w,h,8);
    var g=ctx.createLinearGradient(x,y,x,y+h);
    g.addColorStop(0,role.border);
    g.addColorStop(1,role.fill);
    ctx.fillStyle=g; ctx.fill();
    ctx.strokeStyle="rgba(255,255,255,.28)"; ctx.lineWidth=1; ctx.stroke();
    ctx.fillStyle=role.text;
    ctx.font="900 14px Arial, Helvetica, sans-serif";
    ctx.textAlign="center"; ctx.textBaseline="middle";
    ctx.fillText(role.label,x+w/2,y+h/2+1);
    ctx.restore();
  }

  function drawRankMedal(ctx,x,y,w,h,rank){
    ctx.save();
    roundedRect(ctx,x,y,w,h,7);
    var g=ctx.createLinearGradient(x,y,x+w,y+h);
    if(rank===1){g.addColorStop(0,"#ffe188");g.addColorStop(1,"#c47b0f");}
    else if(rank===2){g.addColorStop(0,"#f1f5f8");g.addColorStop(1,"#75899d");}
    else if(rank===3){g.addColorStop(0,"#e59b65");g.addColorStop(1,"#9a4e29");}
    else {g.addColorStop(0,"#177ab7");g.addColorStop(1,"#0d3e68");}
    ctx.fillStyle=g; ctx.fill();
    ctx.strokeStyle=rank<=3?"rgba(255,224,146,.7)":"rgba(82,211,255,.55)";
    ctx.lineWidth=1.2; ctx.stroke();
    ctx.fillStyle=rank<=3?"#111820":"#c9f1ff";
    ctx.font="900 "+(rank<10?25:20)+"px Arial, Helvetica, sans-serif";
    ctx.textAlign="center"; ctx.textBaseline="middle";
    ctx.fillText(String(rank),x+w/2,y+h/2+1);
    ctx.restore();
  }

  function drawPosterTroopIcon(ctx,type,cx,cy,size) {
    var img = posterTroopIcons[type];
    if (!img) return;
    ctx.save();
    ctx.shadowColor = type === "fighter" ? "rgba(52,142,255,.70)" :
                      type === "shooter" ? "rgba(255,130,43,.62)" :
                      "rgba(88,225,194,.62)";
    ctx.shadowBlur = 6;
    ctx.drawImage(img,cx-size/2,cy-size/2,size,size);
    ctx.restore();
  }

  function drawApcTroopCell(ctx,x,y,w,h,item) {
    ctx.fillStyle="rgba(255,255,255,.035)";
    roundedRect(ctx,x,y+7,w,h-14,6); ctx.fill();

    var entries = item.apcEntries && item.apcEntries.length
      ? item.apcEntries.slice(0,4)
      : (item.apcs || []).map(function(label){ return {label:label,power:"",troopType:""}; });

    if (!entries.length) entries=[{label:"APC",power:"",troopType:""}];

    var slotW=w/entries.length;
    entries.forEach(function(entry,i){
      var cx=x+slotW*(i+.5);
      var label=String(entry.label||"APC").replace(/APC\s*/i,"APC ");
      var power=String(entry.power||"—");
      ctx.textAlign="center";

      // APC number
      ctx.fillStyle="#9fb5c8";
      ctx.font="900 "+(h>=56?10:9)+"px Arial, Helvetica, sans-serif";
      fitText(ctx,label,slotW-6,h>=56?10:9,8,"900","Arial, Helvetica, sans-serif");
      ctx.fillText(label,cx,y+(h>=56?17:15));

      // APC power — this is the value previously lost by the poster generator.
      ctx.fillStyle="#f4f8fb";
      ctx.font="900 "+(h>=56?13:11)+"px Arial, Helvetica, sans-serif";
      fitText(ctx,power,slotW-6,h>=56?13:11,9,"900","Arial, Helvetica, sans-serif");
      ctx.fillText(power,cx,y+(h>=56?34:30));

      // Troop icon directly below the APC power.
      if(entry.troopType){
        drawPosterTroopIcon(ctx,entry.troopType,cx,y+h-(h>=56?10:9),h>=56?16:14);
      } else {
        ctx.fillStyle="rgba(127,155,179,.55)";
        ctx.font="800 8px Arial, Helvetica, sans-serif";
        ctx.fillText("—",cx,y+h-7);
      }

      if(i<entries.length-1){
        ctx.strokeStyle="rgba(82,211,255,.12)";
        ctx.lineWidth=1;
        ctx.beginPath();
        ctx.moveTo(x+slotW*(i+1),y+12);
        ctx.lineTo(x+slotW*(i+1),y+h-12);
        ctx.stroke();
      }
    });
  }

  function drawAnimeRow(ctx,x,y,w,h,item,index){
    var rank=index+1;
    ctx.save();
    roundedRect(ctx,x,y,w,h,6);
    var row=ctx.createLinearGradient(x,y,x+w,y);
    row.addColorStop(0,index<3?"rgba(18,35,51,.98)":"rgba(8,22,35,.98)");
    row.addColorStop(1,"rgba(5,15,26,.98)");
    ctx.fillStyle=row; ctx.fill();
    ctx.strokeStyle=index<3?"rgba(243,189,82,.28)":"rgba(62,181,235,.20)";
    ctx.lineWidth=1; ctx.stroke();

    drawRankMedal(ctx,x+8,y+7,52,h-14,rank);

    var nameX=x+72;
    var scoreW=102, rallyW=126, apcW=180;
    var scoreX=x+w-scoreW-10;
    var rallyX=scoreX-rallyW-8;
    var apcX=rallyX-apcW-8;
    var nameW=apcX-nameX-12;

    ctx.textAlign="left"; ctx.textBaseline="alphabetic";
    ctx.fillStyle="#f5f8fb";
    fitText(ctx,item.name,nameW,h>=56?20:17,11,"900","Arial, Helvetica, sans-serif");
    ctx.fillText(item.name,nameX,y+h*.46);

    ctx.fillStyle="#77d7ff";
    ctx.font="800 "+(h>=56?12:10)+"px Arial, Helvetica, sans-serif";
    ctx.fillText("RALLY LAUNCHER",nameX,y+h*.74);

    function cell(cx,cw,label,value,color){
      ctx.fillStyle="rgba(255,255,255,.035)";
      roundedRect(ctx,cx,y+7,cw,h-14,6); ctx.fill();
      ctx.fillStyle="#7f9bb3";
      ctx.font="800 9px Arial, Helvetica, sans-serif";
      ctx.textAlign="center";
      ctx.fillText(label,cx+cw/2,y+18);
      ctx.fillStyle=color||"#edf7ff";
      ctx.font="900 "+(h>=56?15:13)+"px Arial, Helvetica, sans-serif";
      fitText(ctx,String(value||"—"),cw-8,h>=56?15:13,10,"900","Arial, Helvetica, sans-serif");
      ctx.fillText(String(value||"—"),cx+cw/2,y+h-13);
    }

    drawApcTroopCell(ctx,apcX,y,apcW,h,item);
    cell(rallyX,rallyW,"RALLY SIZE",item.rallySize||"—","#edf7ff");
    cell(scoreX,scoreW,"FRANKY",item.frankyScore||"—",index<3?"#f4c35d":"#63d9ff");
    ctx.restore();
  }

  function drawStrategyZone(ctx,W,y,rallyCount){
    var h=220;
    ctx.save();
    var bg=ctx.createLinearGradient(0,y,0,y+h);
    bg.addColorStop(0,"#0a1725");
    bg.addColorStop(1,"#07101a");
    ctx.fillStyle=bg; ctx.fillRect(0,y,W,h);

    ctx.strokeStyle="rgba(71,196,255,.10)";
    ctx.lineWidth=1;
    for(var gx=0;gx<W;gx+=45){ctx.beginPath();ctx.moveTo(gx,y);ctx.lineTo(gx,y+h);ctx.stroke();}
    for(var gy=y;gy<y+h;gy+=38){ctx.beginPath();ctx.moveTo(0,gy);ctx.lineTo(W,gy);ctx.stroke();}

    ctx.textAlign="left";
    ctx.fillStyle="#ff9d2e";
    ctx.font="900 98px Impact, Arial Black, sans-serif";
    ctx.fillText(String(rallyCount),48,y+124);
    ctx.fillStyle="#f5f7f8";
    ctx.font="900 30px Arial Black, Arial, sans-serif";
    ctx.fillText("RALLIES",184,y+79);
    ctx.fillText("TO BE SENT",184,y+115);

    var cx=575, cy=y+108;
    ctx.strokeStyle="#52d5ff"; ctx.lineWidth=3;
    ctx.beginPath();ctx.arc(cx,cy,50,0,Math.PI*2);ctx.stroke();
    ctx.beginPath();ctx.arc(cx,cy,33,0,Math.PI*2);ctx.stroke();
    ctx.beginPath();ctx.moveTo(cx-68,cy);ctx.lineTo(cx+68,cy);ctx.stroke();
    ctx.beginPath();ctx.moveTo(cx,cy-68);ctx.lineTo(cx,cy+68);ctx.stroke();
    drawCrown(ctx,cx,cy-4,38,"#ff9d2e");

    ctx.strokeStyle="#ff9d2e";ctx.lineWidth=5;ctx.lineCap="round";
    ctx.beginPath();ctx.moveTo(720,y+145);ctx.quadraticCurveTo(676,y+152,636,y+130);ctx.stroke();
    ctx.beginPath();ctx.moveTo(637,y+130);ctx.lineTo(655,y+128);ctx.lineTo(646,y+145);ctx.stroke();

    ctx.textAlign="right";
    ctx.fillStyle="#f5f7f8";
    ctx.font="900 17px Arial, Helvetica, sans-serif";
    ctx.fillText("ALL THE OTHERS",W-42,y+65);
    ctx.fillText("JOIN THE OPEN RALLIES",W-42,y+88);
    ctx.restore();
  }

  function drawPosterFooter(ctx,W,y){
    var h=72;
    ctx.save();
    ctx.fillStyle="#050b12";ctx.fillRect(0,y,W,h);
    ctx.strokeStyle="rgba(78,200,255,.22)";ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(W,y);ctx.stroke();
    var items=[
      {x:115,icon:"⚔",text:"RALLY SMARTER"},
      {x:350,icon:"◎",text:"HIT HARDER"},
      {x:585,icon:"●",text:"GROW TOGETHER"},
      {x:815,icon:"♛",text:"ABYX"}
    ];
    ctx.textBaseline="middle";
    items.forEach(function(it){
      ctx.fillStyle=it.x>760?"#ffb13d":"#eaf7ff";
      ctx.font="900 26px Arial, Helvetica, sans-serif";
      ctx.textAlign="center";ctx.fillText(it.icon,it.x-58,y+36);
      ctx.fillStyle="#eaf7ff";ctx.font="800 13px Arial, Helvetica, sans-serif";
      ctx.fillText(it.text,it.x+20,y+36);
    });
    ctx.restore();
  }

  function generate() {
    var groups=getLaunchers();
    var rallyCount=getRallyCount();
    if(!groups.length || !rallyCount){
      window.alert("Build a rally plan first.");
      return;
    }

    var button=document.getElementById("generateImageBtn");
    var originalText=button?button.textContent:"GENERATE IMAGE";
    if(button){button.disabled=true;button.textContent="GENERATING…";}

    loadPosterAssets(function(headerImg){
      var maxRows=Math.min(groups.length,18);
      var shown=groups.slice(0,maxRows);
      var rowH=maxRows<=7?62:maxRows<=11?58:maxRows<=15?54:50;
      var gap=5;
      var panelHeaderH=58;
      var panelPad=14;
      var panelY=585;
      var panelH=panelHeaderH + panelPad + maxRows*rowH + Math.max(0,maxRows-1)*gap + panelPad;
      var strategyY=panelY+panelH+20;
      var footerY=strategyY+220;
      var H=footerY+72;
      var W=900;

      var canvas=document.createElement("canvas");
      canvas.width=W;canvas.height=H;
      var ctx=canvas.getContext("2d");
      if(!ctx){
        if(button){button.disabled=false;button.textContent=originalText;}
        return;
      }
      ctx.imageSmoothingEnabled=true;
      ctx.imageSmoothingQuality="high";

      // VALIDATED ARTWORK: use the actual ABYX / FRANKY TIME anime header.
      // Do not redraw the girl, dog, logo or title in canvas.
      ctx.fillStyle="#07111d";
      ctx.fillRect(0,0,W,H);

      if(headerImg){
        // Native 900×574 artwork: 1:1 draw, no enlargement, no crop = maximum sharpness.
        ctx.drawImage(headerImg,0,0,900,585);
      }else{
        // Last-resort fallback only.
        drawNeonCity(ctx,W,585);
      }

      // Very light transition only at the bottom edge; do not soften the artwork.
      var heroFade=ctx.createLinearGradient(0,547,0,585);
      heroFade.addColorStop(0,"rgba(4,12,22,0)");
      heroFade.addColorStop(1,"rgba(4,12,22,.22)");
      ctx.fillStyle=heroFade;
      ctx.fillRect(0,547,W,38);

      // Fine neon separator between artwork and live data.
      var heroLine=ctx.createLinearGradient(40,0,W-40,0);
      heroLine.addColorStop(0,"rgba(72,211,255,0)");
      heroLine.addColorStop(.22,"rgba(72,211,255,.82)");
      heroLine.addColorStop(.72,"rgba(255,157,46,.82)");
      heroLine.addColorStop(1,"rgba(255,157,46,0)");
      ctx.fillStyle=heroLine;
      ctx.fillRect(40,583,W-80,2);

      var panelX=34,panelW=W-68;
      roundedRect(ctx,panelX,panelY,panelW,panelH,14);
      var pg=ctx.createLinearGradient(panelX,panelY,panelX,panelY+panelH);
      pg.addColorStop(0,"rgba(7,21,34,.985)");
      pg.addColorStop(1,"rgba(4,13,23,.995)");
      ctx.fillStyle=pg;ctx.fill();
      ctx.strokeStyle="rgba(73,205,255,.72)";ctx.lineWidth=2;ctx.stroke();

      ctx.fillStyle="rgba(15,42,63,.98)";
      roundedRect(ctx,panelX+2,panelY+2,panelW-4,panelHeaderH-4,12);ctx.fill();
      ctx.strokeStyle="rgba(255,157,46,.38)";
      ctx.beginPath();ctx.moveTo(panelX+12,panelY+panelHeaderH);ctx.lineTo(panelX+panelW-12,panelY+panelHeaderH);ctx.stroke();

      ctx.fillStyle="#58d7ff";ctx.font="900 24px Arial Black, Arial, sans-serif";ctx.textAlign="left";
      ctx.fillText("#",panelX+22,panelY+38);
      ctx.fillStyle="#f5f8fb";ctx.font="900 18px Arial, Helvetica, sans-serif";
      ctx.fillText("PLAYER",panelX+96,panelY+37);
      ctx.textAlign="right";ctx.fillStyle="#ffbd58";ctx.font="800 13px Arial, Helvetica, sans-serif";
      ctx.fillText("APC + TROOP  ·  RALLY SIZE  ·  FRANKY SCORE",panelX+panelW-18,panelY+36);

      var listTop=panelY+panelHeaderH+panelPad;
      shown.forEach(function(item,index){
        drawAnimeRow(ctx,panelX+12,listTop+index*(rowH+gap),panelW-24,rowH,item,index);
      });

      drawStrategyZone(ctx,W,strategyY,rallyCount);
      drawPosterFooter(ctx,W,footerY);

      ctx.fillStyle="rgba(127,166,191,.55)";
      ctx.font="800 9px Arial, Helvetica, sans-serif";
      ctx.textAlign="right";
      ctx.fillText("POSTER V1.16.6",W-10,H-7);

      canvas.toBlob(function(blob){
        if(button){button.disabled=false;button.textContent=originalText;}
        if(!blob)return;
        showPreview(blob,rallyCount,groups.length);
      },"image/png");
    });
  }

  var button = document.getElementById("generateImageBtn");
  if (button) button.addEventListener("click", generate);
})();
