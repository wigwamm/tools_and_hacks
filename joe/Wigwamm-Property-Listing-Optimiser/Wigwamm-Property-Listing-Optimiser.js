var rightmoveCodes = new Meteor.Collection('rightmoveCodes');

if (Meteor.isClient) {

}

if (Meteor.isServer) {

  Meteor.startup(function () {
    // code to run on server at startup
  });

  Meteor.methods({
    'getData': function (postCode, bedrooms, callback) {
      console.log('Someone Wants It :p');
      var outCode = rightmoveCodes.findOne({
        outcode: postCode
      }).locationIdent;
      console.log(outCode);
      console.log('We got some data, daddy!');
      var data = [],
          last = 0,
          index = 0;
      while (true) {
        console.log('On Page: ', index)
        $ = cheerio.load(Meteor.http.get('http://www.rightmove.co.uk/property-for-sale/find.html?locationIdentifier=OUTCODE^' + outCode + '&radius=0&minBedrooms=' + bedrooms + '&maxBedrooms=' + bedrooms + '&index=' + index * 10).content);
        if ( $($('.pagecount')[0]).text().split(' ')[1] != last ||($($('.pagecount')[0]).text().split(' ')[1] != $($('.pagecount')[0]).text().split(' ')[3])) {
          $('.price-new a').each(function () {
            if ($(this).text().indexOf('£') > -1) {
              data.push({
                price: parseFloat($(this).text().replace(/£/g, '').replace(/,/g, '')),
                _id: Random.id()
              });
            } else {
              data.push({
                price:'POA',
                _id: Random.id(),
                poa:true
              });
            }
          });
          ++index;
          last = $($('.pagecount')[0]).text().split(' ')[1];
        } else {
          break;
        }
      }
      console.log(data);
      return data;
    }
  });
}
