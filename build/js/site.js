(function (window, document, undefined) {

  'use strict';

  var pageLoaded = function () {
    new KudosPlease({
      el : '.kudos',
      duration : 1500,
      persistent : true,
      status : {
        alpha: 'fontelico-emo-shoot',
        beta: 'fontelico-emo-shoot',
        gamma: 'fontelico-emo-beer'
      }
    });
  };

  if(document.loaded) {
    pageLoaded();
  } else {
    if (window.addEventListener) {
      window.addEventListener('load', pageLoaded, false);
    } else {
      window.attachEvent('onload', pageLoaded);
    }
  }

  if (!Modernizr.svg) {
    var imgs = document.getElementsByTagName('img');
    var endsWithDotSvg = /.*\.svg$/;
    var i = 0;
    var l = imgs.length;
    for(i; i !== l; i++) {
      if(imgs[i].src.match(endsWithDotSvg)) {
        imgs[i].src = imgs[i].src.slice(0, -3) + 'png';
      }
    }
  }

  (function(d) {
    var tkTimeout = 3000;
    if (window.sessionStorage) {
      if (sessionStorage.getItem('useTypekit') === 'false') {
        tkTimeout = 0;
      }
    }
    var config = {
      kitId: 'nkm5rqv',
      scriptTimeout: tkTimeout
    },
    h = d.documentElement,
    t = setTimeout(function() {
      h.className = h.className.replace(/\bwf-loading\b/g, '') + 'wf-inactive';
      if (window.sessionStorage) {
        sessionStorage.setItem('useTypekit', 'false');
      }
    }, config.scriptTimeout),
    tk = d.createElement('script'),
    f = false,
    s = d.getElementsByTagName('script')[0],
    a;
    h.className += 'wf-loading';
    tk.src = '//use.typekit.net/' + config.kitId + '.js';
    tk.async = true;
    tk.onload = tk.onreadystatechange = function() {
      a = this.readyState;
      if (f || a && a !== 'complete' && a !== 'loaded'){
        return;
      }
      f = true;
      clearTimeout(t);
      try {
        Typekit.load(config);
      } catch (e) {}
    };
    s.parentNode.insertBefore(tk, s);
  })(document);

  var hoverEvent = function() {
    this.style.color = this.dataset.color;
  },
  hoverExitEvent = function() {
    this.style.color = '';
  };

  var myNodeList = document.querySelectorAll('.project .btn');
  for (var index = 0; index < myNodeList.length; ++index) {
    myNodeList[index].addEventListener('mouseover',hoverEvent);
    myNodeList[index].addEventListener('mouseout',hoverExitEvent);
  }

})(window, document);
