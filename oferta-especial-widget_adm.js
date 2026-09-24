(function() {
  if (document.getElementById('oe-widget')) return;

  var FILE_ID = '1441D7Dsl4rBwXYrffcnjuIVXo4YlQ3Cr';
  var URL     = 'https://drive.google.com/file/d/' + FILE_ID + '/preview?autoplay=1';
  var TITLE   = 'Conhe\u00E7a a Oferta Especial';

  var style = document.createElement('style');
  style.textContent =
    '#oe-widget{position:fixed;bottom:24px;right:24px;z-index:99998;}' +
    '#oe-launcher{position:relative;display:inline-flex;align-items:flex-end;}' +
    '#oe-btn{display:flex;align-items:center;gap:10px;' +
      'background:#1D2540;border:2px solid #8CC63F;border-radius:40px;' +
      'padding:10px 16px 10px 12px;cursor:pointer;' +
      'box-shadow:0 4px 20px rgba(0,0,0,0.4);transition:transform .2s,box-shadow .2s;' +
      'font-family:Montserrat,sans-serif;}' +
    '#oe-btn:hover{transform:translateY(-2px);box-shadow:0 8px 28px rgba(0,0,0,0.5);}' +
    '#oe-icon{width:32px;height:32px;flex-shrink:0;}' +
    '#oe-label{color:#fff;font-size:13px;font-weight:700;letter-spacing:0.3px;' +
      'white-space:nowrap;line-height:1.2;text-align:left;}' +
    '#oe-label span{display:block;color:#8CC63F;font-size:10px;font-weight:600;letter-spacing:1px;text-transform:uppercase;}' +
    '#oe-dismiss{position:absolute;top:-6px;right:-6px;width:20px;height:20px;border-radius:50%;' +
      'background:#424242;border:2px solid #fff;color:#fff;font-size:11px;font-family:sans-serif;' +
      'cursor:pointer;display:flex;align-items:center;justify-content:center;line-height:1;padding:0;transition:background .15s;}' +
    '#oe-dismiss:hover{background:#e74c3c;}' +
    '#oe-overlay{display:none;position:fixed;inset:0;background:rgba(0,0,0,0.7);z-index:99999;align-items:center;justify-content:center;}' +
    '#oe-overlay.open{display:flex;}' +
    '#oe-modal{background:#1D2540;border-radius:16px;width:96vw;max-width:1280px;height:92vh;' +
      'display:flex;flex-direction:column;overflow:hidden;border:1px solid rgba(255,255,255,0.08);}' +
    '#oe-modal-header{display:flex;align-items:center;justify-content:space-between;' +
      'padding:12px 16px;border-bottom:1px solid rgba(255,255,255,0.08);flex-shrink:0;}' +
    '#oe-modal-title{font-family:Montserrat,sans-serif;font-size:12px;font-weight:700;letter-spacing:2px;color:#8CC63F;text-transform:uppercase;}' +
    '#oe-close{background:none;border:none;color:rgba(255,255,255,0.4);font-size:22px;cursor:pointer;line-height:1;padding:0;font-family:sans-serif;}' +
    '#oe-close:hover{color:#fff;}' +
    '#oe-frame{flex:1;border:none;width:100%;background:#000;}';
  document.head.appendChild(style);

  // Ícone de play (círculo verde com triângulo)
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
        '<div id="oe-label">' +
          'Conhe\u00E7a a<br><span>Oferta Especial</span>' +
        '</div>' +
      '</button>' +
      '<button id="oe-dismiss" aria-label="Fechar">&#x2715;</button>' +
    '</div>' +
    '<div id="oe-overlay">' +
      '<div id="oe-modal">' +
        '<div id="oe-modal-header">' +
          '<span id="oe-modal-title">' + TITLE + '</span>' +
          '<button id="oe-close" aria-label="Fechar">&#x2715;</button>' +
        '</div>' +
        '<iframe id="oe-frame" src="about:blank" allow="autoplay; fullscreen" allowfullscreen title="' + TITLE + '"></iframe>' +
      '</div>' +
    '</div>';

  document.body.appendChild(widget);

  var frame = document.getElementById('oe-frame');

  // Carrega o vídeo a cada abertura, para ele começar a tocar do início
  document.getElementById('oe-btn').addEventListener('click', function() {
    frame.src = URL;
    document.getElementById('oe-overlay').classList.add('open');
    document.body.style.overflow = 'hidden';
  });

  document.getElementById('oe-close').addEventListener('click', fechar);

  document.getElementById('oe-overlay').addEventListener('click', function(e) {
    if (e.target === this) fechar();
  });

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') fechar();
  });

  document.getElementById('oe-dismiss').addEventListener('click', function() {
    document.getElementById('oe-widget').style.display = 'none';
  });

  // Ao fechar, descarrega o vídeo para parar o áudio
  function fechar() {
    document.getElementById('oe-overlay').classList.remove('open');
    frame.src = 'about:blank';
    document.body.style.overflow = '';
  }
})();
