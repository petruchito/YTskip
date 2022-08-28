// ==UserScript==
// @name         YTskip
// @namespace    https://github.com/petruchito/YTskip
// @version      0.5
// @updateURL	 https://github.com/petruchito/YTskip/raw/main/YTskip.user.js
// @downloadURL	 https://github.com/petruchito/YTskip/raw/main/YTskip.user.js
// @description  Ctrl-,. to skip 1 sec
// @author       petruchito <freeglider@gmail.com>
// @match        https://www.youtube.com/*
// @icon         https://www.google.com/s2/favicons?domain=youtube.com
// @grant        none
// ==/UserScript==

const V_SECONDS = 1;

document.addEventListener('yt-navigate-finish',onNavigate);
var onKeyDown;

function onNavigate() {
  if (window.location.toString().match(/\/watch/)) {

    var V_YOUTUBE_PLAYER = null;
    document.querySelector('ytd-player').getPlayerPromise().then(function(p) {V_YOUTUBE_PLAYER = p});
    try {
      window.removeEventListener('keydown', onKeyDown);
    } catch (e) {}

    onKeyDown = function(e) {
      if (e.code === 'Comma' && e.ctrlKey) {
        V_YOUTUBE_PLAYER.seekBy(-V_SECONDS);
      } else if (e.code === 'Period' && e.ctrlKey) {
        V_YOUTUBE_PLAYER.seekBy(V_SECONDS);
      }
    }

    window.addEventListener('keydown', onKeyDown);

  } else {

    if (onKeyDown) {
      window.removeEventListener('keydown', onKeyDown);
      onKeyDown = null;
    }

  }
}
