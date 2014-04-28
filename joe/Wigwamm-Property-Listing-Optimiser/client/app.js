Template.youThink.events({
  'change #findForm input': function () {
    if ($('#findForm input')[0].validity.valid && $('#findForm input')[1].validity.valid && $('#findForm input')[2].validity.valid) {


      var opts = {
        lines: 13, // The number of lines to draw
        length: 20, // The length of each line
        width: 10, // The line thickness
        radius: 30, // The radius of the inner circle
        corners: 1, // Corner roundness (0..1)
        rotate: 0, // The rotation offset
        direction: 1, // 1: clockwise, -1: counterclockwise
        color: '#000', // #rgb or #rrggbb or array of colors
        speed: 0.5, // Rounds per second
        trail: 60, // Afterglow percentage
        shadow: true, // Whether to render a shadow
        hwaccel: false, // Whether to use hardware acceleration
        className: 'spinner', // The CSS class to assign to the spinner
        zIndex: 2e9, // The z-index (defaults to 2000000000)
        top: '40%', // Top position relative to parent
        left: '50%' // Left position relative to parent
      };
      var target = document.getElementById('findForm');
      var spinner = new Spinner(opts).spin(target);


      Meteor.call('getData', $('#outCode').val().replace(' ', '').length <= 4 ? $('#outCode').val().replace(' ', '') : $('#outCode').val().replace(' ', '').slice(0, $('#outCode').val().replace(' ', '').length - 3).toUpperCase(), $('#beds').val(), function (error, data) {
        if (data) {
          Session.set('houseData', data);
          Template.details.myScore();
          spinner.stop();
        } else {
          alert('Something Went Wrong! Is everything valid?');
          spinner.stop();
        }
      });
    }
  },
  'change #myPrice': function () {
    Session.set('myPrice', {
      _id: Random.id(),
      price: +$('#myPrice').val()
    });
    Template.ranking.pages();
  }
});
Template.arrows.events({
  'click .glyphicon-circle-arrow-up': function () {
    if ($('#' + Session.get('myPrice')._id).index() != 1 || +$('#' + Session.get('myPrice')._id).parent().attr('data-index') != 1) {
      $('#myPrice').val(+$('#' + Session.get('myPrice')._id).parent().children()[$('#' + Session.get('myPrice')._id).index() - 1].innerHTML + 10);
      if ($('#' + Session.get('myPrice')._id).index() != 1) {
        tmp = Session.get('myPrice');
        tmp.price = $('#myPrice').val();
        Session.set('myPrice', tmp);
      } else {
        $('#myPrice').val(+$('*[data-index=' + (+$('#' + Session.get('myPrice')._id).parent().attr('data-index') - 1) + ']').children()[10].innerHTML + 10);
        tmp = Session.get('myPrice');
        tmp.price = $('#myPrice').val();
        Session.set('myPrice', tmp);
      }
    }
  },
  'click .glyphicon-circle-arrow-down': function () {
    try {
      $('#myPrice').val(+$('#' + Session.get('myPrice')._id).parent().children()[$('#' + Session.get('myPrice')._id).index() + 1].innerHTML - 10);
      tmp = Session.get('myPrice');
      tmp.price = $('#myPrice').val();
      Session.set('myPrice', tmp);
    } catch (e) {
      $('#myPrice').val(+$('*[data-index=' + (+$('#' + Session.get('myPrice')._id).parent().attr('data-index') + 1) + ']').children()[1].innerHTML - 10);
      tmp = Session.get('myPrice');
      tmp.price = $('#myPrice').val();
      Session.set('myPrice', tmp);
    }
  }
});

var calcScore = function (pos, pgs) {
  return Math.floor((((10 - ((pos) / 1.5)) / (pgs)) * 10));
}

Template.details.myScore = function () {
  $('#' + Session.get('myPrice')._id).css({
    'color': '#9c4602',
    'font-weight': 'bold'
  });
  Session.set('currentScore', calcScore($('#' + Session.get('myPrice')._id).index() + 1, +$('#' + Session.get('myPrice')._id).parent().attr('data-index')));
  return Session.get('currentScore') || 0;
}

Template.details.myPrice = function () {
  return Session.get('myPrice').price;
}

Template.details.myPage = function () {
  return Session.get('myPrice').page
}

Session.set('houseData', []);
Session.set('myPrice', {
  price: 0,
  _id: Random.id(),
  page: 1
});

Template.ranking.pages = function () {
  var myPrice = Session.get('myPrice');
  var data = Session.get('houseData');
  pages = [];
  data.push(myPrice)
  data.sort(function (a, b) {
    return a.price - b.price
  }).reverse().map(function (value, index) {
    index % 10 == 0 ? pages.push({
      index: Math.floor((+index) / 10) + 1,
      value: []
    }) : null;
    pages[Math.floor(index / 10)].value.push(value);
  });
  Session.set('pages', pages);
  return Session.get('pages');
}
$(function () {
  $('.pages').bind('DOMSubtreeModified', function () {
    //	Template.details.myScore();
    $('#' + Session.get('myPrice')._id).css({
      'color': '#9c4602',
      'font-weight': 'bold'
    });
    tmp = Session.get('myPrice');
    tmp.page = +$('#' + tmp._id).parent().attr('data-index');
    Session.set('myPrice', tmp);
  });
});
