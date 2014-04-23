(function(){
UI.body.contentParts.push(UI.Component.extend({render: (function() {
  var self = this;
  return [ HTML.Raw("<br><br><br>\n  "), Spacebars.include(self.lookupTemplate("youThink")), "\n  ", Spacebars.include(self.lookupTemplate("details")) ];
})}));
Meteor.startup(function () { if (! UI.body.INSTANTIATED) { UI.body.INSTANTIATED = true; UI.DomRange.insert(UI.render(UI.body).dom, document.body); } });

Template.__define__("youThink", (function() {
  var self = this;
  var template = this;
  return HTML.Raw('<form id="findForm" action="#">\n    <h3>You think your <input type="number" min="0" id="myPrice" required=""> bed property</h3>\n    <h3>in <input type="text" min="5" id="outCode" required=""></h3>\n    <h3>is worth <input type="number" min="0" id="beds" required=""></h3>\n  </form>');
}));

Template.__define__("details", (function() {
  var self = this;
  var template = this;
  return HTML.DIV({
    "class": "detailsPad pullRight"
  }, "\n    ", HTML.SPAN("Score: ", function() {
    return Spacebars.mustache(self.lookup("myScore"));
  }), HTML.Raw("<br>\n    "), HTML.SPAN("My Price: ", function() {
    return Spacebars.mustache(self.lookup("myPrice"));
  }), HTML.Raw('\n    click <span class="glyphicon glyphicon-circle-arrow-down"></span>\n    and <span class="glyphicon glyphicon-circle-arrow-up"></span>\n    to see how the visibility changes as you increase or decrease your asking price.\n  '));
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
