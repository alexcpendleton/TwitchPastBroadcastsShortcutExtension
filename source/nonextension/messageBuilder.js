var fs = require("fs");
var path = require("path");

var MessageBuilder = function() {};
MessageBuilder.prototype.doit = function() {
  console.log("doin' it");
  var namesContent = fs.readFileSync("names.json");
  var names = JSON.parse(namesContent);
  var templateFileContents = fs.readFileSync("../_locales/en/messages.json", {encoding:'utf8'});
  console.log("names:", names);
  for(var i = 0; i < names.length; i++){
    var item = names[i];
    if(item.abbr != "en") {
      var output = templateFileContents.replace('"Past Broadcasts"', '"' + item.pbt + '"');
      var outdir = "../_locales/" + item.abbr.replace("-","_") + "/";
      var outpath = outdir + "messages.json";
      if(!fs.existsSync(outdir)) {
        fs.mkdirSync(outdir);
      }
      console.log("writing out:", item.abbr, outpath, {encoding:'utf8', mode:"w+"});
      fs.writeFileSync(outpath, output);
    }
  }

};
console.log("Running...");

new MessageBuilder().doit();
