(function(){
UI.body.contentParts.push(UI.Component.extend({render: (function() {
  var self = this;
  return [ Spacebars.include(self.lookupTemplate("scoresBar")), "\n  ", Spacebars.include(self.lookupTemplate("ranking")), "\n  ", Spacebars.include(self.lookupTemplate("graph")), "\n  ", Spacebars.include(self.lookupTemplate("details")) ];
})}));
Meteor.startup(function () { if (! UI.body.INSTANTIATED) { UI.body.INSTANTIATED = true; UI.DomRange.insert(UI.render(UI.body).dom, document.body); } });

Template.__define__("details", (function() {
  var self = this;
  var template = this;
  return HTML.Raw('<div id="details">\n    <form id="findForm" onsubmit="return true;">\n      <div>\n	<input type="number" id="myPrice" required="">\n	<label for="myPrice"><span class="glyphicon glyphicon-gbp"></span><span class="pullRight padRight">My Price</span></label>\n      </div>\n      <div>\n	<input type="numer" id="outCode" required="">\n	<label for="outCode"><span class="glyphicon glyphicon-home"></span><span class="pullRight padRight">Out Code</span></label>\n      </div>\n      <div>\n	<input type="number" id="beds" required="">\n	<label for="beds"><span class="glyphicon glyphicon-user"></span><span class="pullRight padRight">Beds</span></label>\n      </div>\n      <div>\n	<input type="submit" id="submit" class="submit" value="Go!">\n      </div>\n    </form>\n  </div>');
}));

Template.__define__("graph", (function() {
  var self = this;
  var template = this;
  return HTML.Raw('<div id="graph"></div>');
}));

Template.__define__("scoresBar", (function() {
  var self = this;
  var template = this;
  return HTML.Raw('<div id="scoresBar"><span class="title">Property Listing Optimiser</span></div>');
}));

Template.__define__("ranking", (function() {
  var self = this;
  var template = this;
  return HTML.DIV({
    id: "ranking"
  }, "\n    ", HTML.UL({
    id: "rankings"
  }, "\n      ", UI.Each(function() {
    return Spacebars.call(self.lookup("results"));
  }, UI.block(function() {
    var self = this;
    return [ "\n      ", HTML.LI({
      id: function() {
        return Spacebars.mustache(self.lookup("_id"));
      }
    }, "\n	", HTML.DIV("\n	  ", HTML.SPAN({
      "class": "glyphicon glyphicon-globe"
    }), "\n	  ", HTML.SPAN({
      "class": "price"
    }, function() {
      return Spacebars.mustache(self.lookup("price"));
    }), "\n	  ", HTML.SPAN({
      "class": "glyphicon glyphicon-arrow-up"
    }), "\n	  ", HTML.SPAN({
      "class": "glyphicon glyphicon-arrow-down"
    }), "\n	"), "\n	", HTML.SPAN({
      "class": "score"
    }, "\n	  ", HTML.SPAN({
      "class": "glyphicon glyphicon-eye-open"
    }, "\n	  "), "\n	  ", function() {
      return Spacebars.mustache(self.lookup("score"), self.lookup("_id"));
    }, "\n	"), "\n      "), "\n      " ];
  })), "\n    "), "\n  ");
}));

})();
