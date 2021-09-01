// ==UserScript==
// @name         YTskip
// @namespace    https://github.com/petruchito/YTskip
// @version      0.2
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

    var V_YOUTUBE_PLAYER = document.querySelector('ytd-player').getPlayer();
    try {
      window.removeEventListener('keydown', onKeyDown);
    } catch (e) {}

    onKeyDown = function(e) {
      if (e.key === ',' && e.ctrlKey) {
        V_YOUTUBE_PLAYER.seekBy(-V_SECONDS);
      } else if (e.key === '.' && e.ctrlKey) {
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
