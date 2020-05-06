(function (doc, win) {
    var docEl = doc.documentElement
    var resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize'
    var recalc = function () {
      //          var clientWidth = docEl.clientWidth;
      //          if(!clientWidth) return;
      //          docEl.style.fontSize = 100 * (clientWidth / 750) + 'px';
      var clientWidth = docEl.clientWidth
      if (!clientWidth) return
  
      if (clientWidth >= 1920) {
        docEl.style.fontSize = 100 * (clientWidth / 1920) + 'px'
      } else if (clientWidth >= 1680) {
        docEl.style.fontSize = 100 * (clientWidth / 1680) + 'px'
      } else if (clientWidth >= 1440) {
        docEl.style.fontSize = 100 * (clientWidth / 1440) + 'px'
      } else if (clientWidth >= 1280) {
        docEl.style.fontSize = 100 * (clientWidth / 1280) + 'px'
      } else if (clientWidth >= 1263) {
        docEl.style.fontSize = 100 * (clientWidth / 1263) + 'px'
      } else {
        docEl.style.fontSize = 100 * (clientWidth / 750) + 'px'
      }
    }
  
    if (!doc.addEventListener) return
    win.addEventListener(resizeEvt, recalc, false)
    doc.addEventListener('DOMContentLoaded', recalc, false)
  })(document, window)
  