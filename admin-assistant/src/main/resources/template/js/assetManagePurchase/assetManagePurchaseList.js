var rowId = "";

layui.config({
	base: basePath, 
	version: skyeyeVersion
}).extend({
    window: 'js/winui.window'
}).define(['window', 'table', 'jquery', 'winui', 'form', 'laydate'], function (exports) {
	winui.renderColor();
	var $ = layui.$,
		form = layui.form,
		laydate = layui.laydate,
		table = layui.table;
	
	// 新增资产采购申请
	authBtn('1597244645388');
	
	// '资产采购'页面的选取时间段表格
	laydate.render({elem: '#caigouCreateTime', range: '~'});
	
	// 展示资产采购列表
	table.render({
		id: 'caigouTable',
		elem: '#caigouTable',
		method: 'post',
		url: flowableBasePath + 'asset018',
		where: getTableParams(),
		even: true,
		page: true,
		limits: getLimits(),
		limit: getLimit(),
		cols: [[
			{ title: systemLanguage["com.skyeye.serialNumber"][languageType], type: 'numbers' },
			{ field: 'title', title: '标题', width: 300, templet: function (d) {
				return '<a lay-event="caigouDedails" class="notice-title-click">' + d.title + '</a>';
			}},
			{ field: 'oddNum', title: '单号', width: 200 },
			{ field: 'processInstanceId', title: '流程ID', width: 100, templet: function (d) {
				return '<a lay-event="caigouProcessDetails" class="notice-title-click">' + d.processInstanceId + '</a>';
			}},
			{ field: 'state', title: '状态', width: 90, templet: function (d) {
				return activitiUtil.showStateName2(d.state, 1);
			}},
			{ field: 'createTime', title: systemLanguage["com.skyeye.createTime"][languageType], width: 150 },
			{ title: systemLanguage["com.skyeye.operation"][languageType], fixed: 'right', align: 'center', width: 257, toolbar: '#caigouTableBar'}
		]],
		done: function(){
			matchingLanguage();
		}
	});

	// 资产采购的操作事件
	table.on('tool(caigouTable)', function (obj) {
        var data = obj.data;
        var layEvent = obj.event;
        if (layEvent === 'caigouDedails') { //采购详情
        	caigouDedails(data);
        } else if (layEvent === 'caigouEdit') { //编辑采购申请
        	caigouEdit(data);
        } else if (layEvent === 'caigouSubApproval') { //采购提交审批
        	caigouSubApproval(data);
        } else if (layEvent === 'caigouCancellation') { //采购作废
        	caigouCancellation(data);
        } else if (layEvent === 'caigouProcessDetails') { //采购流程详情
			activitiUtil.activitiDetails(data);
        } else if (layEvent === 'caigouRevoke') { //撤销采购申请
        	caigouRevoke(data);
        }
    });
	
	// 资产采购详情
	function caigouDedails(data) {
		rowId = data.id;
		_openNewWindows({
			url: "../../tpl/assetManagePurchase/assetManagePurchaseDetails.html", 
			title: systemLanguage["com.skyeye.detailsPageTitle"][languageType],
			pageId: "assetManagePurchaseDetails",
			area: ['90vw', '90vh'],
			callBack: function (refreshCode) {
			}
		});
	}
    
	// 撤销资产采购
	function caigouRevoke(data) {
		var msg = '确认撤销该资产采购申请吗？';
		layer.confirm(msg, { icon: 3, title: '撤销操作' }, function (index) {
			layer.close(index);
            AjaxPostUtil.request({url: flowableBasePath + "asset037", params: {processInstanceId: data.processInstanceId}, type: 'json', method: "PUT", callback: function (json) {
				winui.window.msg("提交成功", {icon: 1, time: 2000});
				loadCaigouTable();
    		}});
		});
	}
	
	// 新增资产采购
	$("body").on("click", "#addCaigouBean", function() {
    	_openNewWindows({
			url: "../../tpl/assetManagePurchase/assetManagePurchaseAdd.html", 
			title: "资产采购申请",
			pageId: "assetManagePurchaseAdd",
			area: ['90vw', '90vh'],
			callBack: function (refreshCode) {
				winui.window.msg(systemLanguage["com.skyeye.successfulOperation"][languageType], {icon: 1, time: 2000});
				loadCaigouTable();
			}});
    });
	
	// 编辑资产采购申请
	function caigouEdit(data) {
		rowId = data.id;
		_openNewWindows({
			url: "../../tpl/assetManagePurchase/assetManagePurchaseEdit.html", 
			title: "编辑资产采购申请",
			pageId: "assetManagePurchaseEdit",
			area: ['90vw', '90vh'],
			callBack: function (refreshCode) {
				winui.window.msg(systemLanguage["com.skyeye.successfulOperation"][languageType], {icon: 1, time: 2000});
				loadCaigouTable();
			}
		});
	}
	
	// 资产采购作废
	function caigouCancellation(data) {
		var msg = '确认作废该条采购申请吗？';
		layer.confirm(msg, { icon: 3, title: '作废操作' }, function (index) {
			layer.close(index);
            AjaxPostUtil.request({url: flowableBasePath + "asset022", params: {rowId: data.id}, type: 'json', callback: function (json) {
				winui.window.msg(systemLanguage["com.skyeye.successfulOperation"][languageType], {icon: 1, time: 2000});
				loadCaigouTable();
    		}});
		});
	}
	
	// 资产采购提交审批
	function caigouSubApproval(data) {
		layer.confirm(systemLanguage["com.skyeye.approvalOperationMsg"][languageType], {icon: 3, title: systemLanguage["com.skyeye.approvalOperation"][languageType]}, function (index) {
			layer.close(index);
			activitiUtil.startProcess(sysActivitiModel["assetManagePurchase"]["key"], function (approvalId) {
				var params = {
					rowId: data.id,
					approvalId: approvalId
				};
				AjaxPostUtil.request({url: flowableBasePath + "asset020", params: params, type: 'json', callback: function (json) {
					winui.window.msg("提交成功", {icon: 1, time: 2000});
					loadCaigouTable();
				}});
			});
		});
	}

	form.render();
	form.on('submit(formSearch)', function (data) {
		if (winui.verifyForm(data.elem)) {
			table.reloadData("caigouTable", {page: {curr: 1}, where: getTableParams()});
		}
		return false;
	});

	// 刷新采购数据
    $("body").on("click", "#reloadCaigouTable", function() {
    	loadCaigouTable();
    });
    
	// 刷新采购列表数据
    function loadCaigouTable(){
    	table.reloadData("caigouTable", {where: getTableParams()});
    }

    function getTableParams() {
    	var startTime = "", endTime = "";
		if (!isNull($("#caigouCreateTime").val())) {
    		startTime = $("#caigouCreateTime").val().split('~')[0].trim() + ' 00:00:00';
    		endTime = $("#caigouCreateTime").val().split('~')[1].trim() + ' 23:59:59';
    	}
    	return {
    		state: $("#caigouState").val(),
    		startTime: startTime,
    		endTime: endTime
    	};
    }
    
    exports('assetManagePurchaseList', {});
});
