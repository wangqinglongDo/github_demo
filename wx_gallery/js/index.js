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
wx_gallery();
function wx_gallery(){
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
		$$("img_header_num").innerHTML=img_num+" / "+img_total;
		num=1;
		img_index=index;
		/*移除现有的照片*/
		var childs=$$("img_model_body").childNodes;
		var childs_length=childs.length;
		for(var z=childs_length-1;z>=0;z--){
			$$("img_model_body").removeChild(childs[z]);
		}
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
		var arr=[
			{"classname":"pre_img","url":img_arr[pre_num].url},
			{"classname":"this_img","url":img_arr[index].url},
			{"classname":"next_img","url":img_arr[next_num].url}
		]
		var img_node=create_img(arr);
		var img_str="<img class='pre_img' src='"+img_arr[pre_num].url+
							"'/><img class='this_img' src='"+img_arr[index].url+"'/><img class='next_img' src='"+img_arr[next_num].url+"'/>"
		for(var j=0;j<img_node.length;j++){
			$$("img_model_body").appendChild(img_node[j]);
		}
	}
	function create_img(arr){
		var img_arr=[];
		for(var i=0;i<arr.length;i++){
			var img = document.createElement("img");
			img.setAttribute("class",arr[i].classname);
			img.setAttribute("src",arr[i].url);
			img_arr.push(img)
		}
		return img_arr
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
	$$('close').onclick=function(){
		$$("img_model").style.display="none";
	}
}