(function(){
UI.body.contentParts.push(UI.Component.extend({render: (function() {
  var self = this;
  return [ HTML.DIV({
    id: "youThink"
  }, "\n    ", Spacebars.include(self.lookupTemplate("youThink")), "\n  "), "\n  ", HTML.DIV({
    id: "details"
  }, "\n    ", Spacebars.include(self.lookupTemplate("details")), "\n  "), "\n  ", HTML.DIV({
    id: "arrows"
  }, "\n    ", Spacebars.include(self.lookupTemplate("arrows")), "\n  "), "\n  ", HTML.DIV({
    id: "ranking"
  }, "\n    ", Spacebars.include(self.lookupTemplate("ranking")), "\n  ") ];
})}));
Meteor.startup(function () { if (! UI.body.INSTANTIATED) { UI.body.INSTANTIATED = true; UI.DomRange.insert(UI.render(UI.body).dom, document.body); } });

Template.__define__("youThink", (function() {
  var self = this;
  var template = this;
  return HTML.Raw('<form id="findForm" action="#">\n    <h3>You think your <input type="number" min="0" id="beds" required=""> bed property</h3>\n    <h3>in <input type="text" min="5" id="outCode" required=""></h3>\n    <h3>is worth <input type="number" min="0" id="myPrice" required=""></h3>\n  </form>');
}));

Template.__define__("details", (function() {
  var self = this;
  var template = this;
  return [ HTML.H3(HTML.Raw("Your <strong>Score</strong> is: "), function() {
    return Spacebars.mustache(self.lookup("myScore"));
  }), HTML.Raw("<br>\n  "), HTML.H3(HTML.Raw("Your <strong>Price</strong> is: "), function() {
    return Spacebars.mustache(self.lookup("myPrice"));
  }), HTML.Raw("<br>\n  "), HTML.H3(HTML.Raw("You are on <strong>Page</strong>: "), function() {
    return Spacebars.mustache(self.lookup("myPage"));
  }), HTML.Raw("<br>") ];
}));

Template.__define__("arrows", (function() {
  var self = this;
  var template = this;
  return HTML.Raw('<span class="glyphicon glyphicon-circle-arrow-up"></span>\n  <span class="glyphicon glyphicon-circle-arrow-down"></span>\n  <h3>Click <strong>up</strong> and <strong>down</strong> to see how the <strong>visibility</strong> changes as you <strong>increase</strong> or <strong>decrease</strong> your asking <strong>price</strong>.</h3>');
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
