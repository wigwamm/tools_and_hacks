(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;

/* Package-scope variables */
var cheerio;

(function () {

///////////////////////////////////////////////////////////////////////
//                                                                   //
// packages/cheerio/lib/cheeriowrap.js                               //
//                                                                   //
///////////////////////////////////////////////////////////////////////
                                                                     //
cheerio = Npm.require("cheerio");                                    // 1
                                                                     // 2
///////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package.cheerio = {
  cheerio: cheerio
};

})();
