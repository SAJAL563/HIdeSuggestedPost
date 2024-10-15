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


