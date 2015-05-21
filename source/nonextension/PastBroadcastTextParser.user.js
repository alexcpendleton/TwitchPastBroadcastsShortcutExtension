// ==UserScript==
// @name         tbps parser
// @namespace    http://your.homepage/
// @version      0.1
// @description  enter something useful
// @author       You
// @match        http://www.twitch.tv/teamworkcast/profile/past_broadcasts
// @grant        none
// ==/UserScript==
setTimeout(function() {
  /* Run this in console first
  var languageLinks = document.querySelectorAll(".language");
var results = [];
for(var i = 0; i < languageLinks.length; i++) {
 var link = languageLinks[i];
 var onclickText = link.attributes["onclick"].value;
 var abbr = onclickText.substring("Twitch.language.setByAsyncPut('".length, onclickText.indexOf("'); "));
 results.push ({ abbr:abbr, onclickText:onclickText, pbt:""});
}
localStorage.setItem("tbps.data", JSON.stringify(results));
localStorage.setItem("tbps.currentIndex", "0");
*/
jQuery(function() {
    var allItems = JSON.parse( localStorage.getItem("tbps.data") );
    if(!allItems) {
      var languageLinks = document.querySelectorAll(".language");
      var results = [];
      // Need to start on the "da" page because the current language doesn't show up in the list of selectable languages
      //results.push({abbr:"da", pbt:""});
      for(var i = 0; i < languageLinks.length; i++) {
       var link = languageLinks[i];
       var onclickText = link.attributes["onclick"].value;
       var abbr = onclickText.substring("Twitch.language.setByAsyncPut('".length, onclickText.indexOf("'); "));
       results.push ({ abbr:abbr, onclickText:onclickText, pbt:""});
      }
      allItems = results;
    }
    // Starts at one because the current page's language doesn't get included in the above list
    var currentIndex = JSON.parse(localStorage.getItem("tbps.currentIndex")) || 0;
    var currentItem = allItems[currentIndex];
    var amountToRun = allItems.length;
    console.log("tbps parser: allItems", allItems, "currentIndex", currentIndex, "currentItem", currentItem);
    var pbAnchor = document.querySelector("a[href='/teamworkcast/profile/past_broadcasts']");
    currentItem.pbt = pbAnchor.text;
    currentIndex = currentIndex + 1;
    if (currentIndex >= amountToRun) {
      localStorage.setItem("tbps.data", JSON.stringify(allItems));
      console.log("TBPS DONE!");
      console.log(JSON.stringify(allItems, undefined, 2));
      return;
    }
    currentItem = allItems[currentIndex];
    var languageAnchor = document.querySelector('[onclick="' + currentItem.onclickText + '"]');
    console.log("languageAnchor node:", languageAnchor);

    localStorage.setItem("tbps.data", JSON.stringify(allItems));
    localStorage.setItem("tbps.currentIndex", JSON.stringify(currentIndex));
    //console.log("storage values after setting", localStorage.getItem("tbps.data"), localStorage.getItem("tbps.currentIndex"));
    languageAnchor.click();
});

}, 2000);
