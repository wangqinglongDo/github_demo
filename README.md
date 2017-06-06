# github_demo
want show some demos for others
# 一 仿微信的图片放大效果组件(JS---WX_gallery)
    主要在于获取点击的图片以及前一张和后一张图片。
# 二 日历(jq,js---canlendar)
     思路是对new Date对象以及appendTo()的灵活使用
     
   ## 1.知道所要展示的月份一共有多少天
      var last = new Date(year, month, 0); //获取当前月最后一天时间  
   ## 2.该月份的1号是周几，这样你就知道再1号之前填补多少空白
      f = new Date(Date.UTC(2016, 5, 1)).getDay();
      这里的‘5’指的是6月，
   ## 3.其次该月份一共有多少周，这样是用来计算每块的高度 
      var last = new Date(year, month, 0); //获取当前月最后一天时间  
		    var d = last.getDate();
		    var weekNum = getMonthWeek(year, month, d);
   ## 4.这样你就可以根据不同需求，来在每天上添加不同的样式
     
