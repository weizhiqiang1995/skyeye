
layui.config({
	base: basePath, 
	version: skyeyeVersion
}).extend({
    window: 'js/winui.window'
}).define(['window', 'table', 'jquery', 'winui'], function (exports) {
	winui.renderColor();
	
	var $ = layui.$,
		table = layui.table;
	
	table.render({
	    id: 'messageTable',
	    elem: '#messageTable',
	    method: 'post',
	    url: sysMainMation.diskCloudBasePath + 'fileconsole014',
	    where: {},
	    even: true,
	    page: true,
	    limits: [8, 16, 24, 32, 40, 48, 56],
	    limit: 8,
	    cols: [[
	        { title: systemLanguage["com.skyeye.serialNumber"][languageType], type: 'numbers' },
	        { field: 'recycleName', title: '文件名', width: 150 },
	        { field: 'fileType', title: '文件类型', width: 120 },
	        { field: 'createTime', title: '删除时间', width: 180 },
	        { title: systemLanguage["com.skyeye.operation"][languageType], fixed: 'right', align: 'center', width: 120, toolbar: '#tableBar'}
	    ]],
	    done: function(json) {
	    	matchingLanguage();
	    }
	});
	
	table.on('tool(messageTable)', function (obj) {
        var data = obj.data;
        var layEvent = obj.event;
        if (layEvent === 'reduction') { //还原
        	reduction(data, obj);
        }
    });
	
	//还原
	function reduction(data, obj){
		var msg = '确认还原' + obj.data.fileType + '【' + obj.data.recycleName + '】吗？';
		layer.confirm(msg, { icon: 3, title: '还原文件' }, function (index) {
			layer.close(index);
			parent.refreshCode = '0';
            AjaxPostUtil.request({url: sysMainMation.diskCloudBasePath + "fileconsole015", params: {rowId: data.id}, type: 'json', callback: function (json) {
				winui.window.msg("还原成功", {icon: 1, time: 2000});
				loadTable();
    		}});
		});
	}
	
	//刷新数据
    $("body").on("click", "#reloadTable", function() {
    	loadTable();
    });
    
    function loadTable() {
    	table.reloadData("messageTable", {where:{}});
    }
    
    exports('recycleBinListPage', {});
});
