Template.details.events({
    'submit #findForm':function(e){
	e.preventDefault();
	Meteor.call('getData',1586,2,function(error, data){
	    Session.set('houseData',data);
	    Template.details.myScore();
	});
    },
    'change #myPrice':function(){
	Session.set('myPrice',{_id:Random.id(),price:+$('#myPrice').val()});
	Template.ranking.pages();
    },
    'click .glyphicon-circle-arrow-up':function(){
	if($('#'+Session.get('myPrice')._id).index()!=1||+$('#'+Session.get('myPrice')._id).parent().attr('data-index')!=1){
	    $('#myPrice').val(+$('#'+Session.get('myPrice')._id).parent().children()[$('#'+Session.get('myPrice')._id).index()-1].innerHTML+10);
	    if(parseInt(Session.get('myPrice').price)){
		tmp=Session.get('myPrice');tmp.price=$('#myPrice').val();Session.set('myPrice',tmp);
	    } else {
		$('#myPrice').val(+$('*[data-index='+(+$('#'+Session.get('myPrice')._id).parent().attr('data-index')-1)+']').children()[10].innerHTML+10);tmp=Session.get('myPrice');tmp.price=$('#myPrice').val();Session.set('myPrice',tmp);
	    }
	}
    },
    'click .glyphicon-circle-arrow-down':function(){
	try{
	    $('#myPrice').val(+$('#'+Session.get('myPrice')._id).parent().children()[$('#'+Session.get('myPrice')._id).index()+1].innerHTML-10);tmp=Session.get('myPrice');tmp.price=$('#myPrice').val();Session.set('myPrice',tmp);
	}catch(e){
	    $('#myPrice').val(+$('*[data-index='+(+$('#'+Session.get('myPrice')._id).parent().attr('data-index')+1)+']').children()[1].innerHTML-10);tmp=Session.get('myPrice');tmp.price=$('#myPrice').val();Session.set('myPrice',tmp);
	}
    }
});

var calcScore = function(pos, pgs){
    return Math.floor((((10-((pos)/1.5))/(pgs))*10));
}

Template.details.myScore=function(){
    $('#'+Session.get('myPrice')._id).css({'color':'#9c4602','font-weight':'bold'})
    Session.set('currentScore',calcScore($('#'+Session.get('myPrice')._id).index()+1,+$('#'+Session.get('myPrice')._id).parent().attr('data-index')));
    return Session.get('currentScore');
}

Template.details.myPrice=function(){
    return Session.get('myPrice').price;
}

Session.set('houseData',[]);
Session.set('myPrice',{price:0,_id:Random.id()});

Template.ranking.pages=function(){
    var myPrice = Session.get('myPrice');
    var data = Session.get('houseData');
    pages = [];
    data.push(myPrice)
    data.sort(function(a,b){return a.price-b.price}).reverse().map(function(value, index){
	index%10==0?pages.push({index:Math.floor((+index)/10)+1,value:[]}):null;
	pages[Math.floor(index/10)].value.push(value);
    });
    Session.set('pages', pages);
    return Session.get('pages');
}
$(function(){
    $('.pages').bind('DOMSubtreeModified',function(){
	Template.details.myScore();
    });
});
