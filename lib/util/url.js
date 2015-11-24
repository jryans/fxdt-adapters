exports.parse = function(url) {
  if (Cu.importGlobalProperties) {
    Cu.importGlobalProperties(["URL"]);
    return new URL(url);
  }
  let { parse } = require("url");
  return parse(url);
};
