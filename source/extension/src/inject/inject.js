var TPBS = function() {};
TPBS.prototype.add = function(messages) {
	var channelNode = document.querySelector("#channel .channel");
	var profileLink = document.querySelector("#channel .profile-link");
	if(channelNode && profileLink) {
		var myNode = document.createElement("span");
		var anchorText = messages.getMessage("anchorText");
		myNode.innerHTML = messages.getMessage("injectableHtml")
			.replace("{0}", profileLink)
			.replace("{1}", anchorText);
		channelNode.appendChild(myNode);
	}
};
/*
// Shortcut for testing this on a page without the extension
new TPBS().add({
	getMessage:function(name) {
		var map = {
		  "injectableHtml": {
		    "message":"<span class='tbps-dash'>—</span> <a class='tbps-anchor' href='{0}/past_broadcasts'>{1}</a>"
		  },
		  "anchorText": {
		    "message":"Past Broadcasts"
		  }
		};
		return map[name].message;
	}
});
*/
chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
	if (document.readyState === "complete") {
		clearInterval(readyStateCheckInterval);
		var adder = new TPBS();
		adder.add(chrome.i18n);
	}
	}, 10);
});
