// ==UserScript==
// @name         Hide "Suggested for you" on Instagram
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Hide "Suggested for you" posts on Instagram.com
// @author       Sajal
// @match        https://www.instagram.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Function to remove "Suggested for you" posts
    function removeSuggestedPosts() {
        // Find all elements that contain the text "Suggested for you"
        const suggestedPosts = document.querySelectorAll('h2');

        // Loop through the found elements and check if they match the text
        suggestedPosts.forEach((post) => {
            if (post.innerText === "Suggested for you") {
                // Get the parent element (the post container) and remove it
                post.closest('article').remove();
            }
        });
    }

    // Run the function initially
    removeSuggestedPosts();

    // Run the function again every 3 seconds to catch dynamically loaded posts
    setInterval(removeSuggestedPosts, 10);
})();
