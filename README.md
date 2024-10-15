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
// @name         Auto Click Close SVG or Parent and Specific Div's Parent by Text
// @namespace    http://tampermonkey.net/
// @version      0.8
// @description  Automatically clicks on the "Close" button (or its parent) and the parent of a specific div with text when they appear on the page. Also deletes elements with specific text.
// @match https://www.instagram.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Function to locate and click the SVG element or its parent
    function clickCloseButton() {
        const closeButton = document.querySelector('svg[aria-label="Close"]');

        if (closeButton) {
            // Try clicking the SVG itself
            if (typeof closeButton.click === 'function') {
                closeButton.click();
                console.log("Clicked the Close button (SVG)");
            }
            // If SVG isn't directly clickable, click its parent
            else if (closeButton.parentElement && typeof closeButton.parentElement.click === 'function') {
                closeButton.parentElement.click();
                console.log("Clicked the Close button's parent");
            } else {
                console.warn("Close button or its parent is not clickable.");
            }
        }
    }

    // Function to locate and click the parent of the specified div element by text content
    function clickSpecificDivParentByText() {
        const targetSpan = Array.from(document.querySelectorAll('span')).find(el => el.textContent.includes("This post made me uncomfortable"));

        if (targetSpan && targetSpan.parentElement && typeof targetSpan.parentElement.click === 'function') {
            targetSpan.parentElement.click();
            console.log("Clicked the parent of the specified span element by text content.");
        } else {
            console.warn("Target span or its parent element is not clickable or not found.");
        }
    }

    // Function to delete the parent element of the specified span element by text content
    function deleteElementByText() {

        if (targetSpan && targetSpan.closest('div')) {
            const parentDiv = targetSpan.closest('div');
            parentDiv.remove();
            console.log("Deleted the parent element of the specified span.");
        } else {
            console.warn("Target span for deletion not found or its closest div is not found.");
        }
    }

    function deleteElementByText2() {

    if (targetSpan) {
        // Check if the closest parent div exists
        const parentDiv = targetSpan.closest('div');
        if (parentDiv) {
            parentDiv.remove(); // Remove the parent div
            console.log("Removed the parent element of the specified span.");
        } else {
            console.warn("Closest div not found for the target span.");
        }
    } else {
        console.warn("Target span for deletion not found.");
    }
}

    function deleteSvgElement() {
    // Select the SVG element using its class name
    const svgElement = document.querySelector('svg.x1lliihq.x1n2onr6.x127hrn9');

    if (svgElement) {
        svgElement.remove(); // Remove the SVG element from the DOM
        console.log("SVG element deleted.");
    } else {
        console.warn("SVG element not found.");
    }
}

    function hideDivElement() {
    // Select the target div using a partial class match
    const targetDiv = document.querySelector('div[class*="xh8yej3"]');

    if (targetDiv) {
        targetDiv.style.display = 'none'; // Hide the target div
        console.log("Target div hidden.");
    } else {
        console.warn("Target div not found.");
    }
}


    // Set an interval to continuously check for both elements
    setInterval(() => {
        clickCloseButton();
        clickSpecificDivParentByText();
        deleteElementByText2();
        deleteElementByText();
        deleteSvgElement()
        hideDivElement()

    }, 500); // Adjust the interval as needed (in milliseconds)
})();



```

4. **Click File -> Save,** and the userscript will automatically run on Instagram.com, removing unwanted "Suggested for you" content from your feed.


## ⚙️ How it Works
- This userscript runs on the Instagram web version and:
- Searches for posts labeled "Suggested for you."
- Removes those posts from the feed using JavaScript.
- Re-runs every 10 miliseconds to ensure new suggestions loaded via infinite scroll are also hidden.

## 🛠 Customization
Feel free to tweak the script for different Instagram layouts or behavior changes. You can change the refresh interval or adjust the targeting to suit your needs.

## 👨‍💻 Contributing
- Issues and pull requests are welcome! If you encounter a problem or want to suggest an improvement, feel free to contribute.

## 📄 License
This project is licensed under the MIT License - see the LICENSE file for details.
