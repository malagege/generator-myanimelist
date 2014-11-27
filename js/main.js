var a;
$(document).ready(function() {

	$.blockUI();

	$('input[type=checkbox]').prop("checked", true);
	$(".cancel").add('#reset').add('#openImg,#makeJPGbtn,#makePNGbtn').hide();
	//$("#grid").children('.inner').clone().appendTo('#wrap').children('.title').html("打工吧！魔王大人").parent().children('.animeImg').css('background', "url('http://upload.wikimedia.org/wikipedia/zh/thumb/9/90/Hataraku_mao-sama_%28TW01%29.jpg/220px-Hataraku_mao-sama_%28TW01%29.jpg')").parent().children('.staff').text("原作：和ヶ原聡司\n插畫、角色原案：029\n監督：細田直人\n系列構成：横谷昌宏\n角色設計：碇谷敦\n動畫製作：WHITE FOX");

	$.getJSON('animeList.json', function(jsonData, textStatus) {
			/*optional stuff to do after success */
		$.each(jsonData, function(index, val) {
			 /* iterate through array or object */
			 //console.log(val);
			 	$("#grid").children('.inner').clone().appendTo('#wrap').children('.title').html(val['title']).parent().children('.animeImg').css('background', "url('"+val['animeImg']+"')").parent().children('.staff').text(val['staff']);

		});
		$.unblockUI();
	});



	cssData = [{
		"name" : "一般灰",
		"path" : "css/normalGray.css"

	},{
		"name" : "簡易灰",
		"path" : "css/gray.css"
	}];


	$.each(cssData, function(index, val) {
		 /* iterate through array or object */
		 $('<option>').attr('value', val['path']).html(val['name']).appendTo('#selectCSS');
	});

	$("#selectCSS").on('change', function(event) {
		$("#cssmain").attr('href', $("#selectCSS option:selected").val());
	});

	  var mybuttonFunction = function () {
	  	$(this).unbind("click").on('click',resetFunction);

	  	$("input[type=checkbox]").parent(".inner").children('.cancel').addClass('dark');
	    var $btn = $(this).button('loading');
			html2canvas($("#wrap"), {
				onrendered: function(canvas) {
					$("#removeAll,#selectAll").addClass('disabled');
					$('#openImg,#makeJPGbtn,#makePNGbtn').fadeIn('fast');
					$("#wrap").fadeOut("fast",function(){
						$("#canvas").append($("<img>").attr('src', canvas.toDataURL())).hide().fadeIn("fast",function(){
							a = canvas;
							$("#myButton").button('complete').addClass('btn-danger');
							//$("#canvas").html(Canvas2Image.convertToImage(canvas, $("canvas").width()*0.75, $("canvas").height()*0.75, "jpeg"));
						});
				    });
				}
			});
		
	    // business logic...
	    //$btn.button('reset');
	  }

	  var resetFunction = function(){
	  	$("#removeAll,#selectAll").removeClass('disabled');
	  	$("#reset").add('#openImg,#makeJPGbtn,#makePNGbtn').fadeOut('fast');
	  	$("#canvas").fadeOut("fast",function(){
		  	$("#wrap").fadeIn("fast",function(){
		  		$('.cancel').removeClass('dark');
		  		$('#myButton').unbind("click");
		  		$('#myButton').button('reset').on('click',mybuttonFunction).removeClass('btn-danger');
		  		//$("#selectAll").trigger("click");	
		  	});	
	  	}).html("");
	  }

	  $('#myButton').on('click',mybuttonFunction);

	  //$('#reset').on('click',resetFunction);

	  $("#wrap").on('click', '.inner', function(event) {
	  	event.preventDefault();
	  	/* Act on the event */
		   if(!$(this).children('input[type=checkbox]').prop("checked")){
		   		$(this).children('.cancel').slideUp();
		        $(this).children('input[type=checkbox]').prop("checked", true);
		   }else{
		   		$(this).children('.cancel').slideDown();
		        $(this).children('input[type=checkbox]').prop("checked", false);        
		   }	  	
	  });

	  $("#selectAll").on('click', function(event) {
	  	event.preventDefault();
	  	/* Act on the event */
		$('.cancel').slideUp();
		$('input[type=checkbox]').prop("checked", true);
	  });

	  $("#removeAll").on('click', function(event) {
	  	event.preventDefault();
	  	/* Act on the event */
		$('.cancel').slideDown();
		$('input[type=checkbox]').prop("checked", false);
	  });

	  $("#openImg").on('click', function(event) {
	  	event.preventDefault();
	  	/* Act on the event */
	  	//console.log(Canvas2Image.convertToImage(a, $("canvas").width()*0.75, $("canvas").height()*0.75, "jpg"));
	  	window.open($("#canvas > img").attr("src"));
	  });

	  $(".makeimage").on('click', function(event) {
	  	event.preventDefault();
	  	/* Act on the event */
	  	type = $(this).attr('data-type');
	  	console.log(type);
	  	size = $(this).attr('data-size');
	  	console.log($("#canvas > img").width()*size);
	  	imgHtml = Canvas2Image.convertToImage(a, $("#canvas > img").width()*size, $("#canvas > img").height()*size, type);
	  	$("#canvas").fadeOut('fast', function() {
	  		$("#canvas").html(imgHtml);
	  		$("#canvas").fadeIn('fast');
	  	});
	  	
	  });

	  $("address").html('malagege@'+$("address").html());
});