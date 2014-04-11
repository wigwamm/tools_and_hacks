(function(){
UI.body.contentParts.push(UI.Component.extend({render: (function() {
  var self = this;
  return [ Spacebars.include(self.lookupTemplate("scoresBar")), "\n  ", Spacebars.include(self.lookupTemplate("details")), "\n  ", Spacebars.include(self.lookupTemplate("ranking")) ];
})}));
Meteor.startup(function () { if (! UI.body.INSTANTIATED) { UI.body.INSTANTIATED = true; UI.DomRange.insert(UI.render(UI.body).dom, document.body); } });

Template.__define__("details", (function() {
  var self = this;
  var template = this;
  return [ HTML.Raw('<form id="findForm" action="#">\n    <div>\n      <input type="number" id="myPrice" required="">\n      <label for="myPrice">My Price</label>\n    </div>\n    <div>\n      <input type="numer" id="outCode" required="">\n      <label for="outCode">Out Code</label>\n    </div>\n    <div>\n      <input type="number" id="beds" required="">\n      <label for="beds">Beds</label>\n    </div>\n    <div>\n      <input type="submit" value="go">\n    </div>\n  </form>\n\n  '), HTML.DIV({
    "class": "detailsPad pullRight"
  }, "\n    ", HTML.SPAN(HTML.Raw("Score:<br> "), function() {
    return Spacebars.mustache(self.lookup("myScore"));
  }), HTML.Raw("<br>\n    "), HTML.SPAN(HTML.Raw("My Price:<br> "), function() {
    return Spacebars.mustache(self.lookup("myPrice"));
  }), HTML.Raw('\n    <span class="glyphicon glyphicon-circle-arrow-down"></span>\n    <span class="glyphicon glyphicon-circle-arrow-up"></span>\n  ')) ];
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
    "class": "pages"
  }, "\n    ", UI.Each(function() {
    return Spacebars.call(self.lookup("pages"));
  }, UI.block(function() {
    var self = this;
    return [ "\n    ", HTML.DIV({
      "class": "page",
      "data-index": function() {
        return Spacebars.mustache(self.lookup("index"));
      }
    }, "\n      ", HTML.H3("Page: ", function() {
      return Spacebars.mustache(self.lookup("index"));
    }), "\n      ", UI.Each(function() {
      return Spacebars.call(Spacebars.dot(self.lookup("."), "value"));
    }, UI.block(function() {
      var self = this;
      return [ "\n      ", HTML.DIV({
        id: function() {
          return Spacebars.mustache(self.lookup("_id"));
        }
      }, function() {
        return Spacebars.mustache(self.lookup("price"));
      }), "\n      " ];
    })), "\n    "), "\n    " ];
  })), "\n  ");
}));

})();
