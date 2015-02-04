var TPBS = function() {
  this.add = function() {
    var channelNode = document.querySelector("#channel .channel");
    var profileLink = document.querySelector("#channel .profile-link");
    if(channelNode && profileLink) {
      var myNode = document.createElement("span");
      myNode.class = "tpbs-container";
      var dash = document.createElement("span");
      dash.class = "tbps-dash";
      dash.innerHTML = " &mdash; ";
      var anchor = document.createElement("a");
      anchor.class = "tbps-anchor";
      anchor.innerText = "Past Broadcasts";
      anchor.href = profileLink.href + "/past_broadcasts";
      myNode.appendChild(dash);
      myNode.appendChild(anchor);
      channelNode.appendChild(myNode);
    }
  };
  return this;
};
