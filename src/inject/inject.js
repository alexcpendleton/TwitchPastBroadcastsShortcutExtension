chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
	if (document.readyState === "complete") {
		clearInterval(readyStateCheckInterval);
		// Start here: https://developer.chrome.com/extensions/content_scripts#pi
		// ----------------------------------------------------------
		// This part of the script triggers when page is done loading
		console.log("Hello. This message was sent from scripts/inject.js");
		// ----------------------------------------------------------
		chrome.tabs.executeScript(null, {file: "linkAdder.js"}, function() {
			console.log("linkAdder.js loaded", TPBS, arguments);
		});

	}
	}, 10);
});
