// ==UserScript==
// @name         Auto Click Close SVG or Parent and Specific Div's Parent by Text
// @namespace    http://tampermonkey.net/
// @version      0.8
// @description  Automatically clicks on the "Close" button (or its parent) and the parent of a specific div with text when they appear on the page. Also deletes elements with specific text.
// @match        https://www.instagram.com/*
// @grant        GM_setValue
// @grant        GM_getValue
// ==/UserScript==

(function() {
    'use strict';

    // Add the switch button to the DOM
    const toggleButton = document.createElement('div');
    toggleButton.id = 'scriptToggleButton';
    toggleButton.style.position = 'fixed';
    toggleButton.style.bottom = '20px';
    toggleButton.style.right = '20px';
    toggleButton.style.width = '60px';
    toggleButton.style.height = '30px';
    toggleButton.style.borderRadius = '15px';
    toggleButton.style.backgroundColor = '#ccc';
    toggleButton.style.cursor = 'pointer';
    toggleButton.style.transition = 'background-color 0.3s';
    toggleButton.style.zIndex = '9999';
    document.body.appendChild(toggleButton);

    const toggleCircle = document.createElement('div');
    toggleCircle.style.width = '26px';
    toggleCircle.style.height = '26px';
    toggleCircle.style.borderRadius = '50%';
    toggleCircle.style.backgroundColor = '#fff';
    toggleCircle.style.transition = 'transform 0.3s';
    toggleCircle.style.margin = '2px';
    toggleButton.appendChild(toggleCircle);

    let scriptEnabled = GM_getValue('scriptEnabled', true); // Default to enabled
    let intervalId; // To store the interval ID

    function updateToggleButtonUI() {
        if (scriptEnabled) {
            toggleButton.style.backgroundColor = '#4CAF50'; // Green when enabled
            toggleCircle.style.transform = 'translateX(30px)';
        } else {
            toggleButton.style.backgroundColor = '#ccc'; // Gray when disabled
            toggleCircle.style.transform = 'translateX(0)';
        }
    }

    function toggleScript() {
        scriptEnabled = !scriptEnabled;
        GM_setValue('scriptEnabled', scriptEnabled);
        updateToggleButtonUI();
        if (scriptEnabled) {
            startScriptInterval();
        } else {
            clearInterval(intervalId);
            console.log("Script disabled.");
        }
    }

    toggleButton.addEventListener('click', toggleScript);

    // Function to start the main script interval
    function startScriptInterval() {
        if (intervalId) clearInterval(intervalId); // Clear any existing interval
        intervalId = setInterval(() => {
            if (!scriptEnabled) return; // Ensure it's enabled before running
            clickCloseButton();
            clickSpecificDivParentByText();
            deleteElementByText2(); // This function still has the bug with targetSpan
            deleteElementByText(); // This function still has the bug with targetSpan
            deleteSvgElement();
            hideDivElement();
        }, 500); // Adjust the interval as needed (in milliseconds)
        console.log("Script enabled.");
    }

    // Initial setup
    updateToggleButtonUI();
    if (scriptEnabled) {
        startScriptInterval();
    }

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
        // This function needs 'targetSpan' to be defined or passed as an argument
        const targetSpan = Array.from(document.querySelectorAll('span')).find(el => el.textContent.includes("This post made me uncomfortable"));

        if (targetSpan && targetSpan.closest('div')) {
            const parentDiv = targetSpan.closest('div');
            parentDiv.remove();
            console.log("Deleted the parent element of the specified span.");
        } else {
            console.warn("Target span for deletion not found or its closest div is not found.");
        }
    }

    function deleteElementByText2() {
        // This function needs 'targetSpan' to be defined or passed as an argument
        const targetSpan = Array.from(document.querySelectorAll('span')).find(el => el.textContent.includes("This post made me uncomfortable"));

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
        const targetDiv = document.querySelector('div[class*="x6s0dn4"]');

        if (targetDiv) {
            targetDiv.style.display = 'none'; // Hide the target div
            console.log("Target div hidden.");
        } else {
            console.warn("Target div not found.");
        }
    }

})();


