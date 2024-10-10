# 🚫 Hide "Suggested for you" on Instagram

[![Tampermonkey Userscript](https://img.shields.io/badge/Tampermonkey-Userscript-blue.svg)](https://www.tampermonkey.net/)  
Block annoying "Suggested for you" posts on Instagram's web version with this simple yet effective userscript!

## ✨ Features

- 🚫 **Hides all "Suggested for you" posts** from your Instagram feed.
- ⏱ **Auto-updates** every 3 seconds to remove newly loaded suggestions.
- 💻 Works seamlessly on the Instagram web interface.
- ⚙️ Easily customizable to match different site behavior changes in the future.

## 📦 Installation

1. **Install Tampermonkey Extension:**

   - [Chrome](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)
   - [Firefox](https://addons.mozilla.org/en-US/firefox/addon/tampermonkey/)
   - [Edge](https://microsoftedge.microsoft.com/addons/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)
   - [Safari](https://apps.apple.com/us/app/tampermonkey/id1482490089)

2. **Create a New Userscript:**
   - Click on the Tampermonkey icon in your browser and select `Create a new script`.

3. **Copy the Script:**
   - Copy the code below and paste it into the Tampermonkey editor:

   ```javascript
   // ==UserScript==
   // @name         Hide "Suggested for you" on Instagram
   // @namespace    http://tampermonkey.net/
   // @version      0.1
   // @description  Hide "Suggested for you" posts on Instagram.com
   // @author       Your Name
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
       setInterval(removeSuggestedPosts, 3000);
   })();
