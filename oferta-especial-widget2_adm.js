(function() {
  if (document.getElementById('oe-widget')) return;

  var FILE_ID = '1441D7Dsl4rBwXYrffcnjuIVXo4YlQ3Cr';
  var URL     = 'https://drive.google.com/file/d/' + FILE_ID + '/preview?autoplay=1';
  var TITLE   = 'Conhe\u00E7a a Oferta Especial';

  var style = document.createElement('style');
  style.textContent =
    '#oe-widget{position:fixed;bottom:24px;right:24px;z-index:99998;font-family:Montserrat,sans-serif;}' +

    /* Botão flutuante */
    '#oe-launcher{position:relative;display:inline-flex;align-items:flex-end;}' +
    '#oe-launcher.hidden{display:none;}' +
    '#oe-btn{display:flex;align-items:center;gap:10px;' +
      'background:#1D2540;border:2px solid #8CC63F;border-radius:40px;' +
      'padding:10px 16px 10px 12px;cursor:pointer;' +
      'box-shadow:0 4px 20px rgba(0,0,0,0.4);transition:transform .2s,box-shadow .2s;' +
      'font-family:inherit;}' +
    '#oe-btn:hover{transform:translateY(-2px);box-shadow:0 8px 28px rgba(0,0,0,0.5);}' +
    '#oe-icon{width:32px;height:32px;flex-shrink:0;}' +
    '#oe-label{color:#fff;font-size:13px;font-weight:700;letter-spacing:0.3px;' +
      'white-space:nowrap;line-height:1.2;text-align:left;}' +
    '#oe-label span{display:block;color:#8CC63F;font-size:10px;font-weight:600;letter-spacing:1px;text-transform:uppercase;}' +
    '#oe-dismiss{position:absolute;top:-6px;right:-6px;width:20px;height:20px;border-radius:50%;' +
      'background:#424242;border:2px solid #fff;color:#fff;font-size:11px;font-family:sans-serif;' +
      'cursor:pointer;display:flex;align-items:center;justify-content:center;line-height:1;padding:0;transition:background .15s;}' +
    '#oe-dismiss:hover{background:#e74c3c;}' +

    /* Mini player no rodapé direito (vídeo vertical 9:16) */
    '#oe-player{display:none;flex-direction:column;overflow:hidden;' +
      'width:min(280px, calc((100vh - 110px) * 9 / 16), calc(100vw - 32px));' +
      'background:#1D2540;border:2px solid #8CC63F;border-radius:14px;' +
      'box-shadow:0 10px 32px rgba(0,0,0,0.45);' +
      'transform-origin:bottom right;}' +
    '#oe-player.open{display:flex;animation:oe-in .25s ease-out;}' +
    '@keyframes oe-in{from{opacity:0;transform:translateY(12px) scale(.96);}to{opacity:1;transform:none;}}' +
    '@media (prefers-reduced-motion:reduce){#oe-player.open{animation:none;}}' +
    '#oe-player-header{display:flex;align-items:center;justify-content:space-between;gap:8px;' +
      'padding:8px 10px 8px 12px;flex-shrink:0;}' +
    '#oe-player-title{font-size:11px;font-weight:700;letter-spacing:1px;color:#8CC63F;' +
      'text-transform:uppercase;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}' +
    '#oe-close{background:none;border:none;color:rgba(255,255,255,0.55);font-size:18px;cursor:pointer;' +
      'line-height:1;padding:2px 4px;font-family:sans-serif;border-radius:4px;}' +
    '#oe-close:hover{color:#fff;}' +
    '#oe-close:focus-visible,#oe-btn:focus-visible,#oe-dismiss:focus-visible{outline:2px solid #8CC63F;outline-offset:2px;}' +
    '#oe-frame{display:block;width:100%;aspect-ratio:9/16;border:none;background:#000;}';
  document.head.appendChild(style);

  var playSVG =
    '<svg id="oe-icon" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">' +
      '<circle cx="32" cy="32" r="30" fill="#8CC63F"/>' +
      '<circle cx="32" cy="32" r="30" fill="none" stroke="#fff" stroke-opacity=".25" stroke-width="2"/>' +
      '<path d="M26 20l20 12-20 12z" fill="#1D2540"/>' +
    '</svg>';

  var widget = document.createElement('div');
  widget.id = 'oe-widget';
  widget.innerHTML =
    '<div id="oe-launcher">' +
      '<button id="oe-btn" aria-label="' + TITLE + '">' +
        playSVG +
        '<div id="oe-label">Conhe\u00E7a a<br><span>Oferta Especial</span></div>' +
      '</button>' +
      '<button id="oe-dismiss" aria-label="Fechar">&#x2715;</button>' +
    '</div>' +
    '<div id="oe-player" role="dialog" aria-label="' + TITLE + '">' +
      '<div id="oe-player-header">' +
        '<span id="oe-player-title">' + TITLE + '</span>' +
        '<button id="oe-close" aria-label="Fechar v\u00EDdeo">&#x2715;</button>' +
      '</div>' +
      '<iframe id="oe-frame" src="about:blank" allow="autoplay; fullscreen" allowfullscreen title="' + TITLE + '"></iframe>' +
    '</div>';

  document.body.appendChild(widget);

  var frame    = document.getElementById('oe-frame');
  var player   = document.getElementById('oe-player');
  var launcher = document.getElementById('oe-launcher');

  // Abre o mini player no lugar do botão
  document.getElementById('oe-btn').addEventListener('click', function() {
    frame.src = URL;
    launcher.classList.add('hidden');
    player.classList.add('open');
  });

  document.getElementById('oe-close').addEventListener('click', fechar);

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && player.classList.contains('open')) fechar();
  });

  document.getElementById('oe-dismiss').addEventListener('click', function() {
    widget.style.display = 'none';
  });

  // Fecha o player, para o vídeo e volta o botão
  function fechar() {
    player.classList.remove('open');
    frame.src = 'about:blank';
    launcher.classList.remove('hidden');
  }
})();
