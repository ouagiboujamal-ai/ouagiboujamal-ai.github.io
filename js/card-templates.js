/* ==========================================================================
   Zakhrafa — 40 premium canvas templates (4 layouts × 10 occasions)
   Everything is drawn from gradients, paths, and emoji. No external images.
   ========================================================================== */
(function () {
  'use strict';

  var TEMPLATE_NAMES = [
    { ar: 'قوس ملكي', en: 'Royal Arch' },
    { ar: 'سماء مرصّعة', en: 'Celestial Night' },
    { ar: 'غصن ذهبي', en: 'Golden Botanica' },
    { ar: 'آرت ديكو', en: 'Art Deco' }
  ];

  var GOLD = ['#a97925', '#d4af37', '#f8e8ad', '#d4af37', '#9a6b22'];
  var FONT_STACKS = {
    Cairo: '"Cairo", "Inter", sans-serif',
    Amiri: '"Amiri", "Playfair Display", serif',
    'Reem Kufi': '"Reem Kufi", "Cairo", sans-serif',
    Tajawal: '"Tajawal", "Cairo", sans-serif'
  };

  function fontStack(name) {
    return FONT_STACKS[name] || FONT_STACKS.Cairo;
  }

  function hasArabic(text) {
    return /[\u0600-\u06FF]/.test(String(text || ''));
  }

  function hexToRgb(hex) {
    var value = String(hex || '#ffffff').replace('#', '');
    if (value.length === 3) value = value.split('').map(function (c) { return c + c; }).join('');
    var int = parseInt(value, 16);
    if (!Number.isFinite(int)) return { r: 245, g: 230, b: 184 };
    return { r: (int >> 16) & 255, g: (int >> 8) & 255, b: int & 255 };
  }

  function rgba(hex, alpha) {
    var c = hexToRgb(hex);
    return 'rgba(' + c.r + ',' + c.g + ',' + c.b + ',' + alpha + ')';
  }

  function goldFill(ctx, W, H, x0, y0, x1, y1) {
    var g = ctx.createLinearGradient(x0 || 0, y0 || 0, x1 || W, y1 || H);
    for (var i = 0; i < GOLD.length; i += 1) g.addColorStop(i / (GOLD.length - 1), GOLD[i]);
    return g;
  }

  function paintBackground(ctx, W, H, top, middle, bottom, glow, glowY, glowX) {
    var bg = ctx.createLinearGradient(0, 0, 0, H);
    bg.addColorStop(0, top);
    bg.addColorStop(0.52, middle);
    bg.addColorStop(1, bottom);
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);

    var gx = (glowX == null ? 0.5 : glowX) * W;
    var gy = (glowY == null ? 0.24 : glowY) * H;
    var radial = ctx.createRadialGradient(gx, gy, 0, gx, gy, Math.max(W, H) * 0.62);
    radial.addColorStop(0, glow);
    radial.addColorStop(0.55, 'rgba(212,175,55,0.025)');
    radial.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = radial;
    ctx.fillRect(0, 0, W, H);

    var vignette = ctx.createRadialGradient(W * 0.5, H * 0.46, W * 0.1, W * 0.5, H * 0.46, Math.max(W, H) * 0.78);
    vignette.addColorStop(0, 'rgba(0,0,0,0)');
    vignette.addColorStop(1, 'rgba(0,0,0,0.48)');
    ctx.fillStyle = vignette;
    ctx.fillRect(0, 0, W, H);
  }

  function setDir(ctx, text) {
    ctx.direction = hasArabic(text) ? 'rtl' : 'ltr';
  }

  function font(ctx, size, weight, family) {
    ctx.font = String(weight || 400) + ' ' + Math.round(size) + 'px ' + family;
  }

  function wrapLines(ctx, text, maxWidth, maxLines) {
    var normalized = String(text == null ? '' : text).replace(/\r/g, '').replace(/[ \t]+/g, ' ').trim();
    if (!normalized) return [];
    var paragraphs = normalized.split('\n');
    var lines = [];
    paragraphs.forEach(function (paragraph) {
      var words = paragraph.trim().split(' ').filter(Boolean);
      if (!words.length) { lines.push(''); return; }
      var current = '';
      words.forEach(function (word) {
        var candidate = current ? current + ' ' + word : word;
        if (ctx.measureText(candidate).width <= maxWidth || !current) {
          current = candidate;
        } else {
          lines.push(current);
          current = word;
        }
      });
      if (current) lines.push(current);
    });
    if (maxLines && lines.length > maxLines) {
      lines = lines.slice(0, maxLines);
      var last = lines[lines.length - 1];
      while (last.length > 1 && ctx.measureText(last + '…').width > maxWidth) last = last.slice(0, -1);
      lines[lines.length - 1] = last + '…';
    }
    return lines;
  }

  function fitBlock(ctx, text, options) {
    var maxWidth = options.maxWidth;
    var maxLines = options.maxLines || 2;
    var maxSize = options.maxSize;
    var minSize = options.minSize || 28;
    var weight = options.weight || 700;
    var family = options.family;
    var dir = hasArabic(text) ? 'rtl' : 'ltr';
    ctx.direction = dir;
    var size = maxSize;
    var lines = [];
    while (size >= minSize) {
      font(ctx, size, weight, family);
      lines = wrapLines(ctx, text, maxWidth, maxLines);
      var widest = 0;
      lines.forEach(function (line) { widest = Math.max(widest, ctx.measureText(line).width); });
      if (lines.length <= maxLines && widest <= maxWidth) break;
      size -= 3;
    }
    if (size < minSize) {
      size = minSize;
      font(ctx, size, weight, family);
      lines = wrapLines(ctx, text, maxWidth, maxLines);
    }
    return { size: size, lines: lines, lineHeight: size * (options.lineHeight || 1.18) };
  }

  function drawLines(ctx, lines, cx, firstCenter, lineHeight, size, weight, family, color, dir) {
    ctx.save();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = color;
    ctx.direction = dir || 'ltr';
    font(ctx, size, weight, family);
    lines.forEach(function (line, index) {
      ctx.fillText(line, cx, firstCenter + lineHeight * index);
    });
    ctx.restore();
    return firstCenter + Math.max(0, lines.length - 1) * lineHeight;
  }

  function textShadow(ctx, W, color) {
    ctx.shadowColor = color || 'rgba(0,0,0,0.42)';
    ctx.shadowBlur = W * 0.012;
    ctx.shadowOffsetY = W * 0.004;
  }

  function noShadow(ctx) {
    ctx.shadowColor = 'transparent';
    ctx.shadowBlur = 0;
    ctx.shadowOffsetY = 0;
  }

  function drawGoldRule(ctx, cx, y, width, color, diamondSize) {
    var half = width / 2;
    ctx.save();
    ctx.strokeStyle = color || goldFill(ctx, cx + half, y, cx - half, y);
    ctx.lineWidth = 1.6;
    ctx.beginPath();
    ctx.moveTo(cx - half, y);
    ctx.lineTo(cx - diamondSize * 2.2, y);
    ctx.moveTo(cx + diamondSize * 2.2, y);
    ctx.lineTo(cx + half, y);
    ctx.stroke();
    drawDiamond(ctx, cx, y, diamondSize || 5, color || goldFill(ctx, cx + 10, y, cx - 10, y));
    ctx.beginPath();
    ctx.arc(cx - half, y, 2, 0, Math.PI * 2);
    ctx.arc(cx + half, y, 2, 0, Math.PI * 2);
    ctx.fillStyle = color || goldFill(ctx, cx + half, y, cx - half, y);
    ctx.fill();
    ctx.restore();
  }

  function drawDiamond(ctx, x, y, r, fill) {
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(x, y - r);
    ctx.lineTo(x + r, y);
    ctx.lineTo(x, y + r);
    ctx.lineTo(x - r, y);
    ctx.closePath();
    ctx.fillStyle = fill;
    ctx.fill();
    ctx.restore();
  }

  function drawSparkle(ctx, x, y, r, color, alpha) {
    ctx.save();
    ctx.globalAlpha = alpha == null ? 1 : alpha;
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(x, y - r);
    ctx.bezierCurveTo(x + r * 0.14, y - r * 0.14, x + r * 0.14, y - r * 0.14, x + r, y);
    ctx.bezierCurveTo(x + r * 0.14, y + r * 0.14, x + r * 0.14, y + r * 0.14, x, y + r);
    ctx.bezierCurveTo(x - r * 0.14, y + r * 0.14, x - r * 0.14, y + r * 0.14, x - r, y);
    ctx.bezierCurveTo(x - r * 0.14, y - r * 0.14, x - r * 0.14, y - r * 0.14, x, y - r);
    ctx.fill();
    ctx.restore();
  }

  function drawFrame(ctx, W, H, inset, gold, width) {
    ctx.save();
    ctx.strokeStyle = gold;
    ctx.lineWidth = width || Math.max(1.5, W * 0.0018);
    ctx.strokeRect(inset, inset, W - inset * 2, H - inset * 2);
    ctx.globalAlpha = 0.52;
    ctx.lineWidth = Math.max(1, W * 0.001);
    ctx.strokeRect(inset + W * 0.012, inset + W * 0.012, W - (inset + W * 0.012) * 2, H - (inset + W * 0.012) * 2);
    ctx.restore();
  }

  function corners(ctx, W, H, inset, gold, size) {
    var s = size || W * 0.085;
    var d = inset + W * 0.032;
    ctx.save();
    ctx.strokeStyle = gold;
    ctx.lineWidth = 1.6;
    ctx.globalAlpha = 0.9;
    [[1, 1], [-1, 1], [1, -1], [-1, -1]].forEach(function (pair) {
      var x = pair[0] > 0 ? d : W - d;
      var y = pair[1] > 0 ? d : H - d;
      ctx.beginPath();
      ctx.moveTo(x + pair[0] * s, y);
      ctx.lineTo(x, y);
      ctx.lineTo(x, y + pair[1] * s);
      ctx.moveTo(x + pair[0] * s * 0.55, y + pair[1] * W * 0.012);
      ctx.lineTo(x + pair[0] * W * 0.012, y + pair[1] * W * 0.012);
      ctx.lineTo(x + pair[0] * W * 0.012, y + pair[1] * s * 0.55);
      ctx.stroke();
      drawDiamond(ctx, x + pair[0] * W * 0.012, y + pair[1] * W * 0.012, W * 0.0055, gold);
    });
    ctx.restore();
  }

  function drawMedallion(ctx, cx, cy, r, gold) {
    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(5,5,10,0.55)';
    ctx.fill();
    ctx.strokeStyle = gold;
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(cx, cy, r * 1.15, 0, Math.PI * 2);
    ctx.globalAlpha = 0.5;
    ctx.lineWidth = 1;
    ctx.setLineDash([3, 9]);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.globalAlpha = 0.7;
    for (var i = 0; i < 8; i += 1) {
      var a = (Math.PI * 2 / 8) * i;
      drawDiamond(ctx, cx + Math.cos(a) * r * 1.26, cy + Math.sin(a) * r * 1.26, r * 0.035, gold);
    }
    ctx.restore();
  }

  function drawEmoji(ctx, emoji, cx, cy, size) {
    ctx.save();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.direction = 'ltr';
    ctx.font = Math.round(size) + 'px "Segoe UI Emoji", "Apple Color Emoji", "Noto Color Emoji", sans-serif';
    ctx.fillText(emoji || '✦', cx, cy + size * 0.02);
    ctx.restore();
  }

  function drawOccasion(ctx, W, H, o, y, gold) {
    var label = o.lang === 'ar' ? o.occasion.nameAr : o.occasion.nameEn;
    ctx.save();
    ctx.direction = o.lang === 'ar' ? 'rtl' : 'ltr';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = rgba(o.color || '#f5e6b8', 0.86);
    font(ctx, Math.max(18, W * 0.0215), 600, '"Inter", "Cairo", sans-serif');
    if (ctx.letterSpacing !== undefined) ctx.letterSpacing = o.lang === 'ar' ? '0px' : Math.round(W * 0.004) + 'px';
    ctx.fillText(o.lang === 'ar' ? label : label.toUpperCase(), W / 2, y);
    if (ctx.letterSpacing !== undefined) ctx.letterSpacing = '0px';
    ctx.restore();
    drawGoldRule(ctx, W / 2, y + W * 0.034, W * 0.15, gold, W * 0.0045);
  }

  function drawNameAndGreeting(ctx, W, H, o, gold) {
    var nameFamily = fontStack(o.font);
    var story = H > W * 1.2;
    var maxWidth = W * 0.76;
    var maxNameSize = story ? W * 0.108 : W * 0.115;
    var name = String(o.name || (o.lang === 'ar' ? 'اسمك' : 'Your Name')).trim();
    var greeting = String(o.greeting || '').trim();
    var nameBlock = fitBlock(ctx, name, {
      maxWidth: maxWidth,
      maxLines: 2,
      maxSize: maxNameSize,
      minSize: W * 0.04,
      weight: 700,
      family: nameFamily,
      lineHeight: 1.12
    });
    var nameTop = (story ? 0.385 : 0.425) * H;
    var nameCenter = nameTop + nameBlock.lineHeight / 2;
    textShadow(ctx, W, 'rgba(0,0,0,0.48)');
    drawLines(ctx, nameBlock.lines, W / 2, nameCenter, nameBlock.lineHeight, nameBlock.size, 700, nameFamily, o.color, hasArabic(name) ? 'rtl' : 'ltr');
    noShadow(ctx);

    var dividerY = nameTop + nameBlock.lineHeight * nameBlock.lines.length + (story ? H * 0.033 : H * 0.032);
    drawGoldRule(ctx, W / 2, dividerY, W * 0.23, gold, W * 0.0045);

    if (greeting) {
      var greetingBlock = fitBlock(ctx, greeting, {
        maxWidth: W * 0.7,
        maxLines: story ? 5 : 4,
        maxSize: W * 0.034,
        minSize: W * 0.021,
        weight: 400,
        family: nameFamily,
        lineHeight: story ? 1.65 : 1.58
      });
      var greetingTop = dividerY + (story ? H * 0.028 : H * 0.032) + greetingBlock.lineHeight / 2;
      ctx.save();
      ctx.globalAlpha = 0.93;
      drawLines(ctx, greetingBlock.lines, W / 2, greetingTop, greetingBlock.lineHeight, greetingBlock.size, 400, nameFamily,
        rgba(o.color || '#f5e6b8', 0.94), hasArabic(greeting) ? 'rtl' : 'ltr');
      ctx.restore();
    }
    drawWatermark(ctx, W, H, o, gold, story);
  }

  function drawWatermark(ctx, W, H, o, gold, story) {
    var y = H - (story ? W * 0.075 : W * 0.06);
    var text = o.brand || 'Zakhrafa';
    ctx.save();
    ctx.direction = hasArabic(text) ? 'rtl' : 'ltr';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.globalAlpha = 0.66;
    ctx.fillStyle = gold;
    font(ctx, Math.max(17, W * 0.0185), 600, hasArabic(text) ? '"Cairo", sans-serif' : '"Inter", "Playfair Display", sans-serif');
    if (ctx.letterSpacing !== undefined) ctx.letterSpacing = hasArabic(text) ? '0px' : Math.round(W * 0.0018) + 'px';
    ctx.fillText(text, W / 2, y);
    if (ctx.letterSpacing !== undefined) ctx.letterSpacing = '0px';
    ctx.globalAlpha = 0.45;
    ctx.strokeStyle = gold;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(W * 0.42, y);
    ctx.lineTo(W * 0.465, y);
    ctx.moveTo(W * 0.535, y);
    ctx.lineTo(W * 0.58, y);
    ctx.stroke();
    ctx.restore();
  }

  function royal(ctx, W, H, o, gold) {
    paintBackground(ctx, W, H, '#08080f', '#0d0c16', '#050508', rgba(o.occasion.accent, 0.15), 0.24);
    drawFrame(ctx, W, H, W * 0.032, gold);
    corners(ctx, W, H, W * 0.03, gold, W * 0.08);

    // A tall gilded arch behind the medallion.
    var left = W * 0.21;
    var right = W * 0.79;
    var archTop = H * 0.075;
    var archBottom = H * 0.34;
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(left, archBottom);
    ctx.lineTo(left, H * 0.20);
    ctx.bezierCurveTo(left, H * 0.125, W * 0.36, archTop, W * 0.5, archTop);
    ctx.bezierCurveTo(W * 0.64, archTop, right, H * 0.125, right, H * 0.20);
    ctx.lineTo(right, archBottom);
    var archFill = ctx.createLinearGradient(0, archTop, 0, archBottom);
    archFill.addColorStop(0, rgba(o.occasion.accent, 0.075));
    archFill.addColorStop(1, 'rgba(0,0,0,0.06)');
    ctx.fillStyle = archFill;
    ctx.fill();
    ctx.strokeStyle = gold;
    ctx.globalAlpha = 0.52;
    ctx.lineWidth = 1.8;
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(left + W * 0.035, archBottom);
    ctx.lineTo(left + W * 0.035, H * 0.205);
    ctx.bezierCurveTo(left + W * 0.035, H * 0.145, W * 0.39, H * 0.108, W * 0.5, H * 0.108);
    ctx.bezierCurveTo(W * 0.61, H * 0.108, right - W * 0.035, H * 0.145, right - W * 0.035, H * 0.205);
    ctx.lineTo(right - W * 0.035, archBottom);
    ctx.globalAlpha = 0.24;
    ctx.stroke();
    ctx.restore();

    drawOccasion(ctx, W, H, o, H * 0.115, gold);
    var medY = H * 0.247;
    var medR = W * 0.072;
    drawMedallion(ctx, W / 2, medY, medR, gold);
    drawEmoji(ctx, o.occasion.motif, W / 2, medY, medR * 1.02);

    drawNameAndGreeting(ctx, W, H, o, gold);

    // Bottom flourish above the watermark.
    ctx.save();
    ctx.globalAlpha = 0.62;
    ctx.strokeStyle = gold;
    ctx.lineWidth = 1.2;
    var fy = H * 0.86;
    ctx.beginPath();
    ctx.moveTo(W * 0.37, fy);
    ctx.bezierCurveTo(W * 0.43, fy - W * 0.035, W * 0.46, fy + W * 0.021, W * 0.5, fy);
    ctx.bezierCurveTo(W * 0.54, fy - W * 0.021, W * 0.57, fy + W * 0.035, W * 0.63, fy);
    ctx.stroke();
    drawDiamond(ctx, W / 2, fy, W * 0.006, gold);
    ctx.restore();
  }

  function celestial(ctx, W, H, o, gold) {
    paintBackground(ctx, W, H, '#050712', '#0a1028', '#04050b', 'rgba(104,88,180,0.20)', 0.2);
    drawFrame(ctx, W, H, W * 0.035, gold);
    ctx.save();
    ctx.globalAlpha = 0.34;
    ctx.strokeStyle = gold;
    ctx.beginPath();
    ctx.arc(W * 0.5, H * 0.43, W * 0.36, 0, Math.PI * 2);
    ctx.stroke();
    ctx.globalAlpha = 0.15;
    ctx.beginPath();
    ctx.arc(W * 0.5, H * 0.43, W * 0.43, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();

    // Deterministic star field.
    var seed = 1977;
    function rand() {
      seed |= 0;
      seed = (seed + 0x6D2B79F5) | 0;
      var t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    }
    var count = 82;
    for (var i = 0; i < count; i += 1) {
      var x = (0.07 + rand() * 0.86) * W;
      var y = (0.06 + rand() * 0.87) * H;
      var r = W * (0.0011 + rand() * 0.0024);
      var alpha = 0.2 + rand() * 0.65;
      if (i % 14 === 0) {
        drawSparkle(ctx, x, y, r * 3.7, '#f6e7b0', alpha);
      } else {
        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.fillStyle = i % 5 === 0 ? '#e8cf8c' : '#eef2ff';
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    // A quiet constellation.
    var points = [
      [0.14, 0.18], [0.22, 0.12], [0.29, 0.17], [0.34, 0.10], [0.41, 0.16],
      [0.68, 0.82], [0.77, 0.76], [0.83, 0.86]
    ];
    ctx.save();
    ctx.strokeStyle = 'rgba(226,197,124,0.22)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(points[0][0] * W, points[0][1] * H);
    for (var p = 1; p < 5; p += 1) ctx.lineTo(points[p][0] * W, points[p][1] * H);
    ctx.moveTo(points[5][0] * W, points[5][1] * H);
    for (var q = 6; q < points.length; q += 1) ctx.lineTo(points[q][0] * W, points[q][1] * H);
    ctx.stroke();
    ctx.restore();

    // Crescent and motif.
    var cy = H * 0.235;
    var cr = W * 0.082;
    ctx.save();
    ctx.beginPath();
    ctx.arc(W / 2, cy, cr, Math.PI * 0.46, Math.PI * 1.54, false);
    ctx.arc(W / 2 + cr * 0.46, cy, cr * 0.94, Math.PI * 1.54, Math.PI * 0.46, true);
    ctx.closePath();
    var cg = ctx.createLinearGradient(W / 2 - cr, cy - cr, W / 2 + cr, cy + cr);
    cg.addColorStop(0, 'rgba(248,232,173,0.85)');
    cg.addColorStop(1, 'rgba(180,132,42,0.2)');
    ctx.fillStyle = cg;
    ctx.fill();
    ctx.strokeStyle = gold;
    ctx.globalAlpha = 0.52;
    ctx.lineWidth = 1.5;
    ctx.stroke();
    ctx.restore();
    drawEmoji(ctx, o.occasion.motif, W / 2 + cr * 0.38, cy, cr * 0.75);

    drawOccasion(ctx, W, H, o, H * 0.115, gold);
    drawNameAndGreeting(ctx, W, H, o, gold);

    drawSparkle(ctx, W * 0.19, H * 0.71, W * 0.012, gold, 0.7);
    drawSparkle(ctx, W * 0.81, H * 0.67, W * 0.015, gold, 0.55);
    drawSparkle(ctx, W * 0.76, H * 0.15, W * 0.008, '#f6e7b0', 0.6);
  }

  function leaf(ctx, x, y, length, angle, fill) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(length * 0.28, -length * 0.24, length * 0.75, -length * 0.2, length, 0);
    ctx.bezierCurveTo(length * 0.75, length * 0.2, length * 0.28, length * 0.24, 0, 0);
    ctx.fillStyle = fill;
    ctx.fill();
    ctx.restore();
  }

  function branch(ctx, W, H, x0, y0, cx1, cy1, x1, y1, flip, gold) {
    ctx.save();
    ctx.strokeStyle = gold;
    ctx.lineWidth = 1.4;
    ctx.globalAlpha = 0.65;
    ctx.beginPath();
    ctx.moveTo(x0, y0);
    ctx.bezierCurveTo(cx1, cy1, x1, y1 - H * 0.1, x1, y1);
    ctx.stroke();
    ctx.restore();
    var points = [
      [0.16, -0.16, -0.48], [0.30, 0.13, 0.65], [0.46, -0.14, -0.42],
      [0.60, 0.12, 0.65], [0.74, -0.12, -0.44], [0.87, 0.1, 0.62]
    ];
    points.forEach(function (p, idx) {
      var t = p[0];
      var mx = (1 - t) * (1 - t) * x0 + 2 * (1 - t) * t * cx1 + t * t * x1;
      var my = (1 - t) * (1 - t) * y0 + 2 * (1 - t) * t * cy1 + t * t * y1;
      leaf(ctx, mx, my, W * 0.045, flip * (p[1] > 0 ? p[2] : p[2]) + (idx % 2 ? 0.2 : -0.2), gold);
    });
  }

  function flower(ctx, x, y, r, gold) {
    ctx.save();
    ctx.translate(x, y);
    for (var i = 0; i < 5; i += 1) {
      ctx.save();
      ctx.rotate((Math.PI * 2 / 5) * i);
      ctx.beginPath();
      ctx.ellipse(0, -r * 0.64, r * 0.26, r * 0.55, 0, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(212,175,55,0.22)';
      ctx.fill();
      ctx.strokeStyle = gold;
      ctx.globalAlpha = 0.7;
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.restore();
    }
    ctx.beginPath();
    ctx.arc(0, 0, r * 0.16, 0, Math.PI * 2);
    ctx.fillStyle = gold;
    ctx.fill();
    ctx.restore();
  }

  function botanical(ctx, W, H, o, gold) {
    paintBackground(ctx, W, H, '#050d0a', '#0a1b13', '#040907', 'rgba(202,168,103,0.15)', 0.24);
    drawFrame(ctx, W, H, W * 0.035, gold);
    corners(ctx, W, H, W * 0.033, gold, W * 0.065);

    branch(ctx, W, H, W * 0.095, H * 0.83, W * 0.05, H * 0.57, W * 0.16, H * 0.25, 1, gold);
    branch(ctx, W, H, W * 0.905, H * 0.83, W * 0.95, H * 0.57, W * 0.84, H * 0.25, -1, gold);

    // Wreath around the motif.
    var cy = H * 0.235;
    var R = W * 0.094;
    ctx.save();
    ctx.strokeStyle = 'rgba(212,175,55,0.55)';
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.arc(W / 2, cy, R, 0, Math.PI * 2);
    ctx.stroke();
    for (var i = 0; i < 14; i += 1) {
      var a = (Math.PI * 2 / 14) * i;
      var lx = W / 2 + Math.cos(a) * R;
      var ly = cy + Math.sin(a) * R;
      leaf(ctx, lx, ly, W * 0.028, a + Math.PI / 2, gold);
    }
    ctx.restore();
    drawEmoji(ctx, o.occasion.motif, W / 2, cy, R * 0.78);

    drawOccasion(ctx, W, H, o, H * 0.112, gold);
    drawNameAndGreeting(ctx, W, H, o, gold);

    flower(ctx, W * 0.18, H * 0.72, W * 0.023, gold);
    flower(ctx, W * 0.82, H * 0.69, W * 0.018, gold);
    drawSparkle(ctx, W * 0.25, H * 0.19, W * 0.007, gold, 0.65);
    drawSparkle(ctx, W * 0.77, H * 0.85, W * 0.009, gold, 0.45);
  }

  function decoCorner(ctx, x, y, sx, sy, size, gold) {
    // The caller passes size = W * 0.12; derive the unit from it so this
    // helper stays independent of the canvas width variable.
    var unit = size / 0.12;
    ctx.save();
    ctx.strokeStyle = gold;
    ctx.lineWidth = 1.4;
    for (var i = 0; i < 3; i += 1) {
      var s = size - i * unit * 0.017;
      ctx.globalAlpha = 0.75 - i * 0.17;
      ctx.beginPath();
      ctx.moveTo(x + sx * s, y + sy * unit * 0.006);
      ctx.lineTo(x + sx * unit * 0.006, y + sy * unit * 0.006);
      ctx.lineTo(x + sx * unit * 0.006, y + sy * s);
      ctx.stroke();
    }
    ctx.restore();
  }

  function deco(ctx, W, H, o, gold) {
    paintBackground(ctx, W, H, '#07070b', '#111019', '#040406', rgba(o.occasion.accent, 0.12), 0.2);

    // Sunburst rays.
    ctx.save();
    ctx.translate(W / 2, H * 0.11);
    ctx.globalAlpha = 0.16;
    ctx.strokeStyle = gold;
    ctx.lineWidth = 1;
    for (var r = 0; r < 18; r += 1) {
      var angle = Math.PI * (0.06 + (r / 17) * 0.88);
      ctx.beginPath();
      ctx.moveTo(Math.cos(angle) * W * 0.05, Math.sin(angle) * W * 0.05);
      ctx.lineTo(Math.cos(angle) * W * 0.7, Math.sin(angle) * W * 0.7);
      ctx.stroke();
    }
    ctx.restore();

    drawFrame(ctx, W, H, W * 0.032, gold);
    decoCorner(ctx, W * 0.045, H * 0.045, 1, 1, W * 0.12, gold);
    decoCorner(ctx, W - W * 0.045, H * 0.045, -1, 1, W * 0.12, gold);
    decoCorner(ctx, W * 0.045, H - H * 0.045, 1, -1, W * 0.12, gold);
    decoCorner(ctx, W - W * 0.045, H - H * 0.045, -1, -1, W * 0.12, gold);

    // Top fan.
    var fanY = H * 0.105;
    var fanR = W * 0.07;
    ctx.save();
    ctx.beginPath();
    ctx.arc(W / 2, fanY, fanR, Math.PI, Math.PI * 2);
    ctx.closePath();
    ctx.fillStyle = 'rgba(212,175,55,0.06)';
    ctx.fill();
    ctx.strokeStyle = gold;
    ctx.globalAlpha = 0.65;
    ctx.lineWidth = 1.2;
    for (var f = 0; f <= 8; f += 1) {
      var fa = Math.PI + (Math.PI / 8) * f;
      ctx.beginPath();
      ctx.moveTo(W / 2, fanY);
      ctx.lineTo(W / 2 + Math.cos(fa) * fanR, fanY + Math.sin(fa) * fanR);
      ctx.stroke();
    }
    ctx.beginPath();
    ctx.arc(W / 2, fanY, fanR, Math.PI, Math.PI * 2);
    ctx.stroke();
    ctx.restore();

    drawOccasion(ctx, W, H, o, H * 0.145, gold);

    // Diamond medallion.
    var cy = H * 0.265;
    ctx.save();
    ctx.translate(W / 2, cy);
    ctx.rotate(Math.PI / 4);
    var side = W * 0.092;
    ctx.strokeStyle = gold;
    ctx.lineWidth = 1.6;
    ctx.strokeRect(-side / 2, -side / 2, side, side);
    ctx.globalAlpha = 0.45;
    ctx.strokeRect(-side * 0.68, -side * 0.68, side * 1.36, side * 1.36);
    ctx.restore();
    drawEmoji(ctx, o.occasion.motif, W / 2, cy, W * 0.062);

    drawNameAndGreeting(ctx, W, H, o, gold);

    // Chevron flourish.
    ctx.save();
    ctx.strokeStyle = gold;
    ctx.lineWidth = 1.2;
    ctx.globalAlpha = 0.62;
    var yy = H * 0.855;
    for (var c = -2; c <= 2; c += 1) {
      if (!c) continue;
      ctx.beginPath();
      ctx.moveTo(W / 2 + c * W * 0.035, yy - W * 0.014);
      ctx.lineTo(W / 2 + c * W * 0.052, yy);
      ctx.lineTo(W / 2 + c * W * 0.035, yy + W * 0.014);
      ctx.stroke();
    }
    drawDiamond(ctx, W / 2, yy, W * 0.008, gold);
    ctx.restore();
  }

  function draw(ctx, W, H, options) {
    var o = {
      occasion: options.occasion,
      name: options.name || '',
      greeting: options.greeting || '',
      font: options.font || 'Cairo',
      color: options.color || '#f5e6b8',
      template: Math.max(0, Math.min(3, parseInt(options.template, 10) || 0)),
      lang: options.lang === 'en' ? 'en' : 'ar',
      brand: options.brand || 'Zakhrafa'
    };
    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, W, H);
    ctx.globalAlpha = 1;
    noShadow(ctx);
    var gold = goldFill(ctx, W, H, 0, 0, W, H);
    if (o.template === 0) royal(ctx, W, H, o, gold);
    else if (o.template === 1) celestial(ctx, W, H, o, gold);
    else if (o.template === 2) botanical(ctx, W, H, o, gold);
    else deco(ctx, W, H, o, gold);
    ctx.restore();
  }

  function getTemplates(occasionSlug, lang) {
    return TEMPLATE_NAMES.map(function (name, index) {
      return {
        index: index,
        nameAr: name.ar,
        nameEn: name.en,
        name: lang === 'en' ? name.en : name.ar
      };
    });
  }

  window.ZK.cardTemplates = {
    names: TEMPLATE_NAMES,
    fontStack: fontStack,
    draw: draw,
    getTemplates: getTemplates,
    hasArabic: hasArabic
  };
})();
