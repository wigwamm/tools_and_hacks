Template.youThink.events({
    'change #findForm input':function(){
	if($('#findForm input')[0].validity.valid&&$('#findForm input')[1].validity.valid&&$('#findForm input')[2].validity.valid) {
	    console.log('hi')
	    Meteor.call('getData',$('#outCode').val().replace(' ','').slice(0,$('#outCode').val().replace(' ','').length-3).toUpperCase(),$('#beds').val(),function(error, data){
		if(data!='error'){
		    Session.set('houseData',data);
		    Template.details.myScore();
		} else {
		    alert('Something Went Wrong!');
		}
	    });
	}
    },
    'change #myPrice':function(){
	Session.set('myPrice',{_id:Random.id(),price:+$('#myPrice').val()});
	Template.ranking.pages();
    },
    'click .glyphicon-circle-arrow-up':function(){
	if($('#'+Session.get('myPrice')._id).index()!=1||+$('#'+Session.get('myPrice')._id).parent().attr('data-index')!=1){
	    $('#myPrice').val(+$('#'+Session.get('myPrice')._id).parent().children()[$('#'+Session.get('myPrice')._id).index()-1].innerHTML+10);
	    if($('#'+Session.get('myPrice')._id).index()!=1){
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
    console.log($('#'+Session.get('myPrice')._id).css('color'))
    $('#'+Session.get('myPrice')._id).css({'color':'#9c4602','font-weight':'bold'});
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
//	Template.details.myScore();
	$('#'+Session.get('myPrice')._id).css({'color':'#9c4602','font-weight':'bold'});
    });
});
