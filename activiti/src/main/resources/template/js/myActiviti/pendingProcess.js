
var taskId = "";//任务id

var taskType = "";//流程类型

var processInstanceId = "";//流程id

var sequenceId = "";//动态表单类型的流程

// 待我审批
layui.config({
	base: basePath, 
	version: skyeyeVersion
}).extend({
    window: 'js/winui.window'
}).define(['window', 'table', 'jquery', 'winui', 'form'], function (exports) {
	winui.renderColor();
	var $ = layui.$,
		table = layui.table,
		form = layui.form;

	// 待我审批
	table.render({
	    id: 'messageMyNeedDealtTable',
	    elem: '#messageMyNeedDealtTable',
	    method: 'post',
	    url: reqBasePath + 'activitimode008',
	    where: {taskName: $("#taskName").val(), processInstanceId: $("#processInstanceId").val()},
	    even: true,
	    page: true,
		limits: getLimits(),
		limit: getLimit(),
	    cols: [[
	        { title: systemLanguage["com.skyeye.serialNumber"][languageType], type: 'numbers'},
	        { field: 'processInstanceId', title: '流程ID', width: 100 },
	        { field: 'taskType', title: '类型', width: 100 },
	        { field: 'createName', title: '申请人', width: 140},
	        { field: 'createTime', title: '申请时间', align: 'center', width: 140, templet: function(d){
	        	if(!isNull(d.createTime)){
		        	var str = d.createTime.toString();
		        	str = str.substring(0, str.length - 3);
		        	return date('Y-m-d H:i', str);
	        	}else{
	        		return "";
	        	}
	        }},
	        { field: 'name', title: '当前节点', width: 130, templet: function(d){
	        	return '[' + d.name + ']';
	        }},
	        { field: 'suspended', title: '状态<i id="stateDesc" class="fa fa-question-circle" style="margin-left: 5px"></i>', align: 'center', width: 130, templet: function(d){
	        	if(d.suspended){
	        		return "<span class='state-down'>挂起</span>";
	        	}else{
	        		return "<span class='state-up'>正常</span>";
	        	}
	        }},
	        { title: systemLanguage["com.skyeye.operation"][languageType], fixed: 'right', align: 'center', width: 240, toolbar: '#myNeedDealtTableBar'}
	    ]],
	    done: function(){
	    	matchingLanguage();
	    }
	});
	
	table.on('tool(messageMyNeedDealtTable)', function (obj) {
        var data = obj.data;
        var layEvent = obj.event;
        if (layEvent === 'subTasks') { //提交任务
        	subTasks(data, obj);
        } else if (layEvent === 'details') { //详情
			activitiUtil.activitiDetails(data);
        } else if (layEvent === 'turnMultiInstance') { //转为会签
			activitiUtil.turnMultiInstance(data.processInstanceId, data.id);
		}
    });
	
	// 提交任务
	function subTasks(data, obj){
		taskId = data.id;
		taskType = data.taskType;
		processInstanceId = data.processInstanceId;
		_openNewWindows({
			url: "../../tpl/approvalActiviti/approvalProcess.html",
			title: "流程审批",
			pageId: "approvalProcess",
			area: ['90vw', '90vh'],
			callBack: function(refreshCode){
                if (refreshCode == '0') {
                	winui.window.msg("提交成功", {icon: 1,time: 2000});
                	loadMyNeedDealtTable();
                } else if (refreshCode == '-9999') {
                	winui.window.msg(systemLanguage["com.skyeye.operationFailed"][languageType], {icon: 2,time: 2000});
                }
			}});
	}
	
    // 刷新我的待办
	$("body").on("click", "#reloadMyNeedDealtTable", function(){
		loadMyNeedDealtTable();
	});
	
	// 搜索
	$("body").on("click", "#formSearch", function(){
		refreshTable();
	});
	
    function loadMyNeedDealtTable(){
    	table.reload("messageMyNeedDealtTable", {where:{taskName: $("#taskName").val(), processInstanceId: $("#processInstanceId").val()}});
    }
    
    function refreshTable(){
    	table.reload("messageMyNeedDealtTable", {page: {curr: 1}, where:{taskName: $("#taskName").val(), processInstanceId: $("#processInstanceId").val()}});
    }
    
    $("body").on("click", "#stateDesc", function() {
		layer.tips('该状态分为挂机和正常，被挂机待办无法进行审批操作', $("#stateDesc"), {
			tips: [1, '#3595CC'],
			time: 4000
		});
	});
    
    exports('pendingProcess', {});
});