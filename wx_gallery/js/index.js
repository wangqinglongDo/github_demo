var img_arr=[
	{
		url:"img/20170512162422.jpg"
	},
	{
		url:"img/20170512162511.jpg"
	},
	{
		url:"img/20170512162517.jpg"
	},
	{
		url:"img/20170512162526.jpg"
	},
	{
		url:"img/20170512162534.jpg"
	},
	{
		url:"img/20170512162540.jpg"
	},
	{
		url:"img/20170512162547.jpg"
	},
	{
		url:"img/20170512162553.jpg"
	},
	{
		url:"img/20170512162601.jpg"
	},
	{
		url:"img/20170512162608.jpg"
	},
	{
		url:"img/20170512162616.jpg"
	},
	{
		url:"img/20170512162621.jpg"
	},
	{
		url:"img/20170512162627.jpg"
	},
	{
		url:"img/20170512162632.jpg"
	},
	{
		url:"img/20170512162638.jpg"
	},
	{
		url:"img/20170512162644.jpg"
	},
	{
		url:"img/20170512162650.jpg"
	},
]
	function $$(class_name){
		return document.getElementsByClassName(class_name)[0];
	}
	var num=0,img_index=0,img_num=0,img_total=img_arr.length,d_width=window.innerWidth;
	for(var i=0;i<img_total;i++){
		var img=document.createElement("img")
		var url=img_arr[i].url;
		img.setAttribute("class","img_");
		img.setAttribute("src",url);
		img.setAttribute("img_index",i);
		$$("img").appendChild(img)
		document.getElementsByClassName("img_")[i].onclick=function(){
			var image_num=parseInt(this.getAttribute("img_index"));
			look_big(image_num)
		}
	}
	
	function look_big(index){
		$$("img_model").style.display="block";
		img_num=index+1;
		$(".img_header_num").html(img_num+" / "+img_total)
		num=1;
		img_index=index;
		$(".img_model_body").find("img").remove();
		var pre_num=0,next_num=0;
		if(index==0){
			pre_num=img_arr.length-1;
			next_num=index+1;
		}else{
			if(index==(img_arr.length-1)){
				pre_num=index-1;
				next_num=0;
			}else{
				pre_num=index-1;
				next_num=index+1;
			}
		}
		var img_str="<img class='pre_img' src='"+img_arr[pre_num].url+
							"'/><img class='this_img' src='"+img_arr[index].url+"'/><img class='next_img' src='"+img_arr[next_num].url+"'/>"
		$(".img_model_body").append(img_str);
	}
	//这个是用来记录触屏开始的点的位置。
	var startX = 0,w=d_width;
	//移动的触摸点的位置x
	var moveX = 0;
	//移动的距离
	var distinceX = 0;
	//判断我的触摸是否移动
	var isMove = false;
	var imageBox=$$("img_model_body");
	var addTranslate=function(w){
	    imageBox.style.transform="translateX("+w+"px)";
	    imageBox.style.webkitTransform="translateX("+w+"px)";
	}
	imageBox.addEventListener("touchstart", function(event) {
		startX = event.touches[0].clientX;
	});
	imageBox.addEventListener("touchmove", function(event) {
			isMove = true;
			moveX = event.touches[0].clientX;
			distinceX = moveX - startX; 
			var current = (-num * w) + distinceX;
			addTranslate(current);
		})
	imageBox.addEventListener("touchend", function() {
//		document.getElementsByClassName("img_model_header")[0].style.display="block";
//		var timer = setInterval(function() {
//			document.getElementsByClassName("img_model_header")[0].style.display="none";
//			clearInterval(timer)
//		}, 4000)
		if(isMove && Math.abs(distinceX) > w / 3) {
			if(distinceX > 0) {
				num--;
				if(img_index==0){
					img_index=img_total-1;
				}else{
					img_index--;
				}
			} else {
				num++;
				if(img_index==(img_total-1)){
					img_index=0;
				}else{
					img_index++;
				}
			}
			look_big(img_index)
			addTranslate(-num * w);
		} else {
			 addTranslate(-num*w);
		}
	})
	function close_model(){
		$$("img_model").style.display="none";
	}
