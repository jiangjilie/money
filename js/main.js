var main = (function(){
	var that = {};
	var nextScreen = "";
	
	var loadSamples = function(){
		prettyPrint(); 
		$("#sample1").colResizable({liveDrag:true, gripInnerHtml:"<div class='grip'></div>", draggingClass:"dragging", onResize:onSample1Resized});	
		$("#sample2").colResizable({liveDrag:true, gripInnerHtml:"<div class='grip'></div>", draggingClass:"dragging", onResize:onSampleResized});
		$("#checkCustom").change(onSample2Changed);	
		$("#checkLive").change(onSample2Changed);	
		$("#resizeBox").resizable({maxHeight:87, maxWidth:571, minWidth:150, minHeight:87,  start:onAboutToResize});
		$("#sample3").colResizable();	
		$("#sample4").colResizable({liveDrag:true, draggingClass:"", gripInnerHtml:"<div class='foodGrip'></div>"});	
		$("#sample5").colResizable({liveDrag:true, draggingClass:"rangeDrag", gripInnerHtml:"<div class='rangeGrip'></div>", onResize:onSlider, minWidth:8});	
		$("#sample6").colResizable({liveDrag:true, 	draggingClass:"sample6Dragging", gripInnerHtml:"<div class='sample6Grip'></div>", onResize:onSample6Slide, minWidth:12});
		$("#flexSample").colResizable({liveDrag:true, gripInnerHtml:"<div class='grip2'></div>", draggingClass:"dragging", resizeMode:'flex'});
        $("#overflowSample").colResizable({liveDrag:true, gripInnerHtml:"<div class='grip2'></div>", draggingClass:"dragging", resizeMode:'overflow'});
        
		postbackSample();
		$("#postback").click(fakePostback);			
		$(".view").click(function(e){ 
			e.preventDefault(); 
			var code = $(this).parent().next();
			code.css("display") == "none"? code.slideDown() : code.slideUp();
		});
	};
	
	var postbackSample = function(){
		$("#updatePanelSample").colResizable({
			liveDrag:true, 
			gripInnerHtml:"<div class='grip'></div>", 
			draggingClass:"dragging", 
			postbackSafe:true,
			partialRefresh:true,
		});	
	}

	var fakePostback = function(){
		$("#updatePanel").html('<img src="img/loading.gif"/>');
		setTimeout(function(){
			$("#updatePanel").html('<table id="updatePanelSample" width="100%" border="0" cellpadding="0" cellspacing="0"> <tbody><tr> <th>header</th><th>header</th><th>header</th> </tr> <tr> <td class="left">cell</td><td>cell</td><td class="right">cell</td> </tr> <tr> <td class="left">cell</td><td>cell</td><td class="right">cell</td> </tr> <tr> <td class="left bottom">cell</td><td class="bottom">cell</td><td class="bottom right">cell</td> </tr> </tbody></table>');
			onPostbackOver();
			}, 700);
	};
	
	var onPostbackOver = function(){
		postbackSample();
	};
	
	var onSample1Resized = function(){
		if( $("#dragSample1").css("display")!= "none") $("#dragSample1").fadeOut(1000);
	}
	
	var onSample2Changed = function(){

		$("#sample2").colResizable({disable:true});
		
		var live = $("#checkLive").is(':checked');
		var custom = $("#checkCustom").is(':checked');
		
		$("#sample2").colResizable({
			liveDrag: live, 
			gripInnerHtml: custom ? "<div class='grip'></div>" : "", 
			draggingClass:"dotted", 
			onResize: onSampleResized
		});
	};
	
	var onAboutToResize = function(e){
		if( $("#dragit").css("display")!= "none") $("#dragit").fadeOut(1000);
	};
	
	var onSampleResized = function(e){
		var columns = $(e.currentTarget).find("th");
		var msg = lang=="spanish"? "dimensi&oacute;n de las columnas: ": "columns widths: ";
		columns.each(function(){ msg += $(this).width() + "px; "; })
		$("#sample2Txt").html(msg);
		
	};
	
	var onSlider = function(e){
		var columns = $(e.currentTarget).find("td");
		var ranges = [], total = 0, i, s = lang=="spanish"? "Rangos: ":"Ranges: ", w;
		for(i = 0; i<columns.length; i++){
			w = columns.eq(i).width()-10 - (i==0?1:0);
			ranges.push(w);
			total+=w;
		}		 
		for(i=0; i<columns.length; i++){			
			ranges[i] = 100*ranges[i]/total;
			carriage = ranges[i]-w
			s+=" "+ Math.round(ranges[i]) + "%,";			
		}		
		s=s.slice(0,-1);		
		$("#sample5Text").html(s);
	}
	
	var onSample6Slide = function(e){
			var columns = $(e.currentTarget).find("td");
			var ranges = [], total = 0, i, w;
			for(i = 0; i<columns.length; i++){
				w = columns.eq(i).width()-14 - (i==0?1:0);				
				ranges.push(w);
				total+=w;
			}		 
			for(i=0; i<columns.length; i++){			
				ranges[i] = 100*ranges[i]/total;											
			}			
			if(lang=="spanish"){
				$("#sample6Text").html("Rango seleccionado: " +Math.round(ranges[1]*10)/10 +"% comienza en: "+ Math.round(ranges[0]*10)/10 +"%");
			}else{
				$("#sample6Text").html("Selected range: " +Math.round(ranges[1]*10)/10 +"% starting at: "+ Math.round(ranges[0]*10)/10 +"%");
			}
		}
	
	var formatCode = function(){

	};
	
	
	var onUnlock = function(){
		$("#outbox").fadeOut(400);
		//tal vez asi se minimize el spam
		var a = "http://www.myguestbookhost.com/viewgbk";
		var b = ".asp?usr=colResizable";
		var c = "cont";
		var d = "act.html";
		$("#hmail").attr("href", c+d);
		$("#hguestbook").attr("href", a+b);		
		setTimeout( function(){$("#h"+nextScreen).trigger("click");}, 500);
	};
	
	var onChangelog = function(e){
		e.preventDefault();
		$("#outbox").css("display","none");
		$("#unlockOverlay").fadeIn(600);
		$("#hlog").attr("href", "logs/changelog."+ (lang=="spanish"? "es.":"") + $(e.currentTarget).attr("ver")+ ".html");
		$("#hlog").trigger("click");
	};
	
	var onMail = function(e){
		e.preventDefault();
		nextScreen = "mail";
		$("#unlockOverlay").fadeIn(600);
	};
	var onGuestbook = function(e){
		e.preventDefault();
		nextScreen = "guestbook";
		$("#unlockOverlay").fadeIn(600);
	};

	var onGithub = function(e){
		e.preventDefault();
        var w = window.open('https://github.com/alvaro-prieto/colResizable', '_blank');
        if (w) { w.focus();}    
	};
	
	
	var onUnlocking = function(e){		
		var alpha = (200 -$(this).position().left)/200
		$("#slide-to-unlock").css("opacity", alpha*alpha *alpha);
		if($(this).position().left > 200){
			onUnlock();
			return false;
		}
		
	};
	
	var onUnlockingOver = function(e){
		if($(this).position().left < 201){
			$(this).animate({ left: 0 }, 300);
			$("#slide-to-unlock").animate({ opacity: 1 }, 300);
		}
	};
	
	var onAboutToClose = function(e){
		$("#unlockOverlay").fadeOut(400, function(){ 
			$("#outbox").css({opacity:1, display:"block"});
			$("#slide-to-unlock").css("opacity", 1);
			$("#unlock-handle").css("left", 0);
			
			
		});
	};
	
	var onDownload = function(){ 
		location.href = $("#lastDownload").attr("href");
	};
	
	//funcion que se ejecuta desde el iframe contacto para cerrar la ventana emergente
	that.closePopup = function(){
		$("#fancybox-overlay").trigger("click");
	};
	
	
	var onLanguageSelection = function(e){
		switch( $(this).attr("id")){
			case "spanish": window.location = "spanish.html";
			break;
			case "english": window.location = "index.html";
			break;
		}
	}
	
	var bindEvents = function(){

		$("#guestbook").click(onGuestbook);
		$("#mail").click(onMail);
		$("#guestbook").click(onGuestbook);
		$("#dwnTitle").click(onDownload);
		$("#b1").click( onDownload);
		$("#b2").click( function(){ location.href="#usage";});
		$("#b3").click( function(){ location.href="#samples";});
		$("#b4").click(onGithub);
		$("#b5").click(onMail);
		$(".changelog").click(onChangelog);
		
		$(".dropItem").click(onLanguageSelection);		
		
		$("#hmail").fancybox({
				height: 285,
				width: 600,	overlayShow: true, transitionIn: 'none', transitionOut : 'none',
				type: 'iframe', titlePosition  : 'over', title: lang=="spanish"? "Formulario de contacto":"Contact form",
				speedIn: 1, onCleanup: onAboutToClose
		});
		
		$("#hlog").fancybox({
				height: 365,
				width: 600,	overlayShow: true, transitionIn: 'none', transitionOut : 'none',
				type: 'iframe', titlePosition  : 'over', title: lang=="spanish"? "Historial de cambios":"Changelog",
				speedIn: 1, onCleanup: onAboutToClose
		});
		$("#hguestbook").fancybox({
				height: "60%",
				width: 600,	overlayShow: true, transitionIn: 'none', transitionOut : 'none',
				type: 'iframe', titlePosition  : 'over', title: lang=="spanish"?"Deje un mensaje en nuestro libro de visitas":"Leave a comment in our guestbook",
				speedIn: 1, onCleanup: onAboutToClose
		});			
			
			$("#unlock-handle").draggable({axis: 'x', containment: 'parent', drag: onUnlocking, stop: onUnlockingOver });

	};
	
	var onDocumentReady = function(){
		
		loadSamples();
		bindEvents();
		formatCode();
	};
	
	var init = function(){		
		 $(document).ready( onDocumentReady);
	};
	
	init();
	return that;
})();
