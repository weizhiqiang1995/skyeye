
var rowId = "";

layui.config({
	base: basePath, 
	version: skyeyeVersion
}).extend({
    window: 'js/winui.window'
}).define(['window', 'table', 'jquery', 'winui', 'form', 'soulTable'], function (exports) {
	winui.renderColor();
	var $ = layui.$,
		form = layui.form,
		table = layui.table,
		soulTable = layui.soulTable;
	
	authBtn('1601129409562');
		
    initTable();
    function initTable(){
		table.render({
		    id: 'messageTable',
		    elem: '#messageTable',
		    method: 'post',
		    url: reqBasePath + 'sysstaffrewardpunish001',
		    where: getTableParams(),
		    even: true,
		    page: true,
		    limits: getLimits(),
	    	limit: getLimit(),
	    	overflow: {
	            type: 'tips',
	            header: true,
	            total: true
	        },
		    cols: [[
		        { title: systemLanguage["com.skyeye.serialNumber"][languageType], type: 'numbers'},
		        { field: 'name', title: '名称', align: 'left', width: 160 },
		        { field: 'price', title: '奖惩金额', align: 'left', width: 100},
		        { field: 'content', title: '奖惩内容', align: 'left', width: 160},
                { field: 'rewardPunishTypeName', title: '奖惩分类', align: 'left', width: 100 },
                { field: 'rewardPunishTime', title: '奖惩时间', align: 'center', width: 100},
                { field: 'awardUnit', title: '授予单位', align: 'left', width: 120},
                { field: 'desc', title: '备注', align: 'left', width: 160 },
                { field: 'jobNumber', title: '员工工号', align: 'left', width: 80 },
                { field: 'userName', title: '员工姓名', align: 'left', width: 100 },
                { field: 'state', title: '员工状态', align: 'center', width: 80, templet: function(d){
                    if(d.state == '1'){
                        return "在职";
                    }else if(d.state == '2'){
                        return "离职";
                    }else if(d.state == '3'){
                        return "见习";
                    }else if(d.state == '4'){
                        return "试用";
                    }else if(d.state == '5'){
                        return "退休";
                    }
                }},
                { field: 'createTime', title: 'systemLanguage["com.skyeye.entryTime"][languageType]', align: 'center', width: 100},
		        { title: systemLanguage["com.skyeye.operation"][languageType], fixed: 'right', align: 'center', width: 100, toolbar: '#tableBar'}
		    ]],
		    done: function(){
		    	matchingLanguage();
		    	soulTable.render(this);
		    }
		});
		
		table.on('tool(messageTable)', function (obj) {
	        var data = obj.data;
	        var layEvent = obj.event;
	        if (layEvent === 'edit') { // 编辑
	        	edit(data);
	        }else if (layEvent === 'delete') { // 删除
	        	deleteRow(data);
	        }
	    });
    }
	
	form.render();
	
	// 编辑
    function edit(data){
        rowId = data.id;
        _openNewWindows({
			url: "../../tpl/sysStaffRewardPunish/sysStaffRewardPunishEdit.html",
			title: systemLanguage["com.skyeye.editPageTitle"][languageType],
			pageId: "sysStaffRewardPunishEdit",
            area: ['90vw', '90vh'],
			callBack: function(refreshCode){
                if (refreshCode == '0') {
                	winui.window.msg(systemLanguage["com.skyeye.successfulOperation"][languageType], {icon: 1,time: 2000});
                	loadTable();
                } else if (refreshCode == '-9999') {
                	winui.window.msg(systemLanguage["com.skyeye.operationFailed"][languageType], {icon: 2,time: 2000});
                }
			}
		});
	}
	
	// 添加
	$("body").on("click", "#addBean", function(){
    	_openNewWindows({
			url: "../../tpl/sysStaffRewardPunish/sysStaffRewardPunishAdd.html",
			title: systemLanguage["com.skyeye.addPageTitle"][languageType],
			pageId: "sysStaffRewardPunishAdd",
			area: ['90vw', '90vh'],
			callBack: function(refreshCode){
                if (refreshCode == '0') {
                	winui.window.msg(systemLanguage["com.skyeye.successfulOperation"][languageType], {icon: 1,time: 2000});
                	loadTable();
                } else if (refreshCode == '-9999') {
                	winui.window.msg(systemLanguage["com.skyeye.operationFailed"][languageType], {icon: 2,time: 2000});
                }
			}});
    });
	
	// 删除
    function deleteRow(data){
        layer.confirm(systemLanguage["com.skyeye.deleteOperationMsg"][languageType], {icon: 3, title: systemLanguage["com.skyeye.deleteOperation"][languageType]}, function(index){
            layer.close(index);
            AjaxPostUtil.request({url:reqBasePath + "sysstaffrewardpunish005", params:{rowId: data.id}, type: 'json', method: "DELETE", callback: function(json){
                if(json.returnCode == 0){
                    winui.window.msg(systemLanguage["com.skyeye.deleteOperationSuccessMsg"][languageType], {icon: 1,time: 2000});
                    loadTable();
                }else{
                    winui.window.msg(json.returnMessage, {icon: 2,time: 2000});
                }
            }});
        });
    }

    // 搜索表单
    $("body").on("click", "#formSearch", function(){
        table.reload("messageTable", {page: {curr: 1}, where: getTableParams()});
    });

	// 刷新数据
    $("body").on("click", "#reloadTable", function(){
    	loadTable();
    });

    function loadTable(){
        table.reload("messageTable", {where: getTableParams()});
    }

    function getTableParams(){
    	return {
    		name: $("#name").val(),
			userName: $("#userName").val(),
			jobNumber: $("#jobNumber").val(),
			state: $("#state").val()
    	};
	}
    
    exports('sysStaffRewardPunishList', {});
});
