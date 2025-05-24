// ==UserScript==
// @name         Smells like Em
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  Highlights tweets and replies containing em dashes on X (formerly Twitter)
// @author       You
// @match        https://x.com/*
// @match        https://twitter.com/*
// @grant        none
// ==/UserScript==


(function() {
    'use strict';

    const EM_DASH = '\u2014';
    const HIGHLIGHT_STYLE = 'background-color: rgba(255, 0, 0, 0.1);';

    function highlightEmDashes() {
        const tweets = document.querySelectorAll('article div[lang]');

        tweets.forEach(tweet => {
            if (tweet.textContent.includes(EM_DASH)) {
                tweet.style.cssText += HIGHLIGHT_STYLE;
            }
        });
    }

    // Run initially and on scroll (Twitter lazy-loads content)
    const observer = new MutationObserver(highlightEmDashes);
    observer.observe(document.body, { childList: true, subtree: true });

    // Initial run
    highlightEmDashes();
})();
