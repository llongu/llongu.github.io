var TouchMoveFn=function(options){
			var name=options.substring(0,1),dom=null,events,x,y,xN,yN;
			switch (name){
				case "#":
					dom=document.getElementById(options.substring(1,options.length))
					break;
				case ".":
					dom=document.getElementsByClassName(options.substring(1,options.length)).item(0);
					break;	
				default:
					dom=document.getElementsByTagName(options).item(0);
					break;
			}
			
			hasTouch()=="touchstart" ? dom.addEventListener("touchstart",Movestart,false) : dom.addEventListener("mousedown",Movestart,false);
			
			function Movestart(e){
				if(hasTouch()=="touchstart"){
					events=e.targetTouches[0];
					document.addEventListener("touchmove",Moveing,false);
					document.addEventListener("touchend",Moveleave,false);
				}else{
					events=e||event;
					document.addEventListener("mousemove",Moveing,false);
					document.addEventListener("mouseup",Moveleave,false)
				}
				x=events.pageX-dom.offsetLeft;
				y=events.pageY-dom.offsetTop;
			}
			
			function Moveing(e){
					hasTouch()=="touchstart" ?events=e.targetTouches[0] : events=e||event;
					var xN=events.pageX-x;
					var yN=events.pageY-y;
					xN -15 < 0 ? xN = 0:null;
					yN -15 < 0 ? yN = 0:null;
					xN + dom.clientWidth + 15 >= document.documentElement.clientWidth ? xN = document.documentElement.clientWidth - dom.clientWidth:null;
					yN + dom.clientHeight + 15>= document.documentElement.clientHeight ? yN = document.documentElement.clientHeight - dom.clientHeight:null;
					dom.style.left=xN+"px";
					dom.style.top=yN+"px";
			}
			
			function Moveleave(e){
				document.removeEventListener("touchmove",Moveing);
				document.removeEventListener("mousemove",Moveing);
				document.removeEventListener("mouseup",Moveleave);
			}
			
			function hasTouch(){
		        var touchObj={};
		        touchObj.isSupportTouch = "ontouchend" in document ? true : false;
		        touchObj.isEvent=touchObj.isSupportTouch?'touchstart':'click';
		        return touchObj.isEvent;
   	    	}
		}
		
	