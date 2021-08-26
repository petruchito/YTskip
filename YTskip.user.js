// ==UserScript==
// @name         YTskip
// @namespace    https://github.com/petruchito/YTskip
// @version      0.1
// @description  Ctrl-arrows to skip 1 sec
// @author       petruchito <freeglider@gmail.com>
// @match        https://www.youtube.com/watch*
// @icon         https://www.google.com/s2/favicons?domain=youtube.com
// @grant        none
// ==/UserScript==


'use strict';
function exec(fn) {
    var script = document.createElement('script');
    script.setAttribute("type", "application/javascript");
    script.textContent = '(' + fn + ')();';
    document.body.appendChild(script); // run the script
    document.body.removeChild(script); // clean up
}

window.addEventListener("load", function() {
    // script injection
    exec(function() {
        var V_YOUTUBE_PLAYER = document.querySelector('ytd-player').getPlayer();
        var V_SECONDS = 1;
        try {
            window.removeEventListener('keydown', v_backward_listener);
            window.removeEventListener('keydown', v_forward_listener);
        } catch (e) {}

        var v_backward_listener = function(e) {
            if (e.keyCode === 37 && e.ctrlKey) {
                V_YOUTUBE_PLAYER.seekBy(-V_SECONDS);
            }
        }

        var v_forward_listener = function(e) {
            if (e.keyCode === 39 && e.ctrlKey) {
                V_YOUTUBE_PLAYER.seekBy(V_SECONDS);
            }
        }

        window.addEventListener('keydown', v_backward_listener);
        window.addEventListener('keydown', v_forward_listener);
    });
}, false);
