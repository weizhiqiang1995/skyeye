
layui.config({
	base: basePath, 
	version: skyeyeVersion
}).extend({
    window: 'js/winui.window',
    echarts: '../echarts/echarts',
    echartsTheme: '../echarts/echartsTheme'
}).define(['window', 'jquery', 'winui', 'form', 'echarts', 'laydate'], function (exports) {
	winui.renderColor();
	var $ = layui.$,
		laydate = layui.laydate,
		form = layui.form;
	var charts1;
	
	var myDate = new Date();
	year = myDate.getFullYear();
	laydate.render({ 
		elem: '#year',
		type: 'year',
		value: year,
 		trigger: 'click',
 		done: function(value, date){
 			initCustomDocumentaryByType(value);
 		}
	});
	
	initCustomDocumentaryByType(year);
	// 客户跟单方式分析
	function initCustomDocumentaryByType(year){
		var params = {
			year: year,
			crmDocumentaryType: sysDictData["crmDocumentaryType"]["key"]
		};
		AjaxPostUtil.request({url: sysMainMation.crmBasePath + "crmpage003", params: params, type: 'json', callback: function (json) {
			renderCharts1(json.rows);
			matchingLanguage();
   		}});
	}
	
	function renderCharts1(rows) {
		charts1 = echarts.init(document.getElementById("charts1"));
		var name = new Array();
		var num = new Array();
		$.each(rows, function(i, item) {
			name.push(item.name);
			num.push(item.number);
		});
		charts1.setOption(getOption('客户跟单方式分析', '统计在指定年份不同的跟单方式的数量分析', name, '跟单数量', num, 'bar'));
		
		// 加载表格
		var allNum = 0;
		$.each(rows, function(i, item) {
			allNum += parseInt(item.number);
		});
		$.each(rows, function(i, item) {
			if(allNum == 0){
				item["proportion"] = "0.00%";
			} else {
				item["proportion"] = (Math.round(item.number / allNum * 10000) / 100.00) + "%";
			}
		});
		$("#tBody").html(getDataUseHandlebars($("#tableBody").html(), {rows: rows}));
    	form.render();
	}
	
	window.onresize = function(){
	    charts1.resize();
	}
	
    exports('crmNewCustomAndContactNum', {});
});
