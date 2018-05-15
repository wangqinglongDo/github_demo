function GetRequest(url_results) {/*url*/
	var url=url_results;
	var theRequest = new Object();   
	if (url.indexOf("?") != -1) {/*判断是否包含参数*/  
		var str = url.substr(1);   
		strs = str.split("&");   
		for(var i = 0; i < strs.length; i ++) {
			if(i==0){
				strs[i]=strs[i].split("?")[1];
			}else{}
			if(strs[i].split("=")[1].indexOf("%")>=0){/*若拼接的为汉字，则用decodeURI()*/
				 theRequest[strs[i].split("=")[0]]=decodeURI(strs[i].split("=")[1]);
			}else{/*若拼接为string类型，则用unescape()*/
				theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);
			}
		}   
	}   
	return theRequest;   
} 
