// ==UserScript==
// @name         YTskip
// @namespace    https://github.com/petruchito/YTskip
// @version      0.2
// @description  Ctrl-arrows to skip 1 sec
// @author       petruchito <freeglider@gmail.com>
// @match        https://www.youtube.com/watch*
// @icon         https://www.google.com/s2/favicons?domain=youtube.com
// @grant        none
// ==/UserScript==


document.addEventListener('yt-navigate-finish',onNavigate);
var v_forward_listener, v_backward_listener;

function onNavigate() {
    if (window.location.toString().match(/\/watch/)) {

        var V_YOUTUBE_PLAYER = document.querySelector('ytd-player').getPlayer();
        var V_SECONDS = 1;
        try {
            window.removeEventListener('keydown', v_backward_listener);
            window.removeEventListener('keydown', v_forward_listener);
        } catch (e) {}

        v_backward_listener = function(e) {
            if (e.key === ',' && e.ctrlKey) {
                V_YOUTUBE_PLAYER.seekBy(-V_SECONDS);
            }
        }

        v_forward_listener = function(e) {
            if (e.key === '.' && e.ctrlKey) {
                V_YOUTUBE_PLAYER.seekBy(V_SECONDS);
            }
        }

        window.addEventListener('keydown', v_backward_listener);
        window.addEventListener('keydown', v_forward_listener);

    } else {

        if (v_forward_listener) {
            window.removeEventListener('keydown', v_backward_listener);
            window.removeEventListener('keydown', v_forward_listener);
            v_forward_listener = null;
            v_backward_listener = null;
        }

    }
}
