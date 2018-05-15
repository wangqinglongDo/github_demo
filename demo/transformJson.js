/*前几天面试的时候碰到一个这样的面试题：
在某个特定应用场景中，我们有一个从JSON获取的内容，比如：
m = { "a": 1, "b": { "c": 2, "d": [3,4] } }
现在需要把这个层级的结构做展开，只保留一层key/value结构。 对于上述
输入，需要得到的结构是：
o = {"a": 1, "b.c": 2, "b.d": [3,4] }
也就是说，原来需要通过 m["b"]["c"] 访问的值，在展开后可以通过 o["b.c"]
访问。
请实现这个“层级结构展开”的代码。
输入：任意JSON（或者map/dict）
输出：展开后的JSON（或者map/dict）
*/
var objTest ={
		"a":1,
		"b":{
			"c":2,
			"e":{
				"f":"abc",
				"g":{
					"h":123,
					"i":[12,34]
				}
			},
			"d":[1,2],
			"z":{
				"aa":"aaa"
			}
		}
}/*声明一个JSON数据*/
var objResult={}/*转化后的JSON数据*/
/*设置key*/
function checkKey(key1,key2){
	var newKey="";
	if(key1!=undefined){
		newKey = key1+"."+key2
	}else{
		newKey = key2
	}
	return newKey
}
/*解析JSON*/
function mapJson(json,obj,key){
	for(var str in json){
		var newKey = checkKey(key,str)
		if(typeof(json[str])=="object"){/*判断value是不是object类型*/
			if(json[str].constructor === Array){/*判断它的constructor是不是数组*/
				obj[newKey]=json[str]
			}else{/*执行回调函数*/
				mapJson(json[str],obj,newKey)
			}
		}else{
			obj[newKey]=json[str]
		}
	}
}
mapJson(objTest,objResult)
console.log(objResult)