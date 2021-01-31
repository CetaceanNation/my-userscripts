// ==UserScript==
// @name         Download subtitles from Loadtup
// @version      0.1
// @description  Add a download button for generated srt subtitles to videos on https://loadtup.com/
// @author       a dolphin
// @match        https://loadtup.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var hasSource = document.getElementById("originalLink");
    if (hasSource) {
        var srtText = getSubs();
        var srtBlob = new Blob([srtText], {type: 'text/plain'});
        var downloadButton = document.createElement('a');
        downloadButton.className = "badge badge-dark";
        downloadButton.innerText = "Download .srt";
        var title = document.getElementsByTagName("h2")[0].innerText;
        downloadButton.download = title + ".srt"
        downloadButton.style.cursor = "pointer";
        downloadButton.href = window.URL.createObjectURL(srtBlob);
        hasSource.insertAdjacentElement("afterend", downloadButton);
        hasSource.insertAdjacentText("afterend", "  ");
    }

    // credit to papermast@AB
    function getSubs() {
        var srt = "";
        var lines = 0;
        function pad(n, width, z) {
            z = z || '0';
            n = n + '';
            return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
        }
        function secstotime(sec) {
            var hours = Math.floor(sec/(3600));
            var minutes = Math.floor((sec%3600)/(60));
            var seconds = Math.floor(sec%60);
            var ms = Math.floor(((sec%60)*100)%100);
            return `${pad(hours, 2)}:${pad(minutes, 2)}:${pad(seconds, 2)},${pad(ms, 2)}`
        }
        for (var i in secs) {
            if (caps[i].trim() != "") {
                lines++;
                srt += lines+"\n";
                srt += secstotime(secs[i]) + " --> " + secstotime(secs[parseInt(i)+1]) + "\n";
                srt += caps[i]+"\n\n";
            }
        }
        return srt;
    }
})();