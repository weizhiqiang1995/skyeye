
var objectKey = "";
var objectId = "";

layui.config({
	base: basePath,
	version: skyeyeVersion
}).extend({
    window: 'js/winui.window'
}).define(['window', 'jquery', 'winui', 'form', 'table'], function (exports) {
	winui.renderColor();
	var $ = layui.$,
		form = layui.form,
		table = layui.table;
	objectKey = GetUrlParam("objectKey");
	objectId = GetUrlParam("objectId");
	if (isNull(objectKey) || isNull(objectId)) {
		winui.window.msg("请传入适用对象信息", {icon: 2, time: 2000});
		return false;
	}

	var state;
	AjaxPostUtil.request({url: sysMainMation.sealServiceBasePath + "querySealServiceOrderById", params: {id: objectId}, type: 'json', method: 'GET', callback: function(json) {
		state = json.bean.state;
		if (state != 'beCompleted') {
			$("#addBean").hide();
		}
		initTable();
	}});

	function initTable() {
		table.render({
			id: 'messageTable',
			elem: '#messageTable',
			method: 'post',
			url: sysMainMation.sealServiceBasePath + 'querySealFaultList',
			where: getTableParams(),
			even: true,
			page: true,
			limits: getLimits(),
			limit: getLimit(),
			cols: [[
				{ title: systemLanguage["com.skyeye.serialNumber"][languageType], type: 'numbers' },
				{ field: 'oddNumber', title: '单号', width: 200, align: 'center', templet: function (d) {
					return '<a lay-event="details" class="notice-title-click">' + d.oddNumber + '</a>';
				}},
				{ field: 'comStartTime', title: '实际开始时间', align: 'center', width: 150 },
				{ field: 'comEndTime', title: '实际结束时间', align: 'center', width: 150 },
				{ field: 'comWorkTime', title: '工时', align: 'left', width: 120 },
				{ field: 'materialCost', title: '材料费', align: 'left', width: 120 },
				{ field: 'coverCost', title: '服务费', align: 'left', width: 120 },
				{ field: 'otherCost', title: '其他费用', align: 'left', width: 120 },
				{ field: 'allPrice', title: '总计金额', align: 'left', width: 120 },
				{ field: 'createName', title: systemLanguage["com.skyeye.createName"][languageType], align: 'left', width: 120 },
				{ field: 'createTime', title: systemLanguage["com.skyeye.createTime"][languageType], align: 'center', width: 150 },
				{ field: 'lastUpdateName', title: systemLanguage["com.skyeye.lastUpdateName"][languageType], align: 'left', width: 120 },
				{ field: 'lastUpdateTime', title: systemLanguage["com.skyeye.lastUpdateTime"][languageType], align: 'center', width: 150 },
				{ title: systemLanguage["com.skyeye.operation"][languageType], fixed: 'right', align: 'center', width: 120, templet: function (d) {
					var str = '';
					if (state == 'beCompleted') {
						str += '<a class="layui-btn layui-btn-xs layui-btn-normal" lay-event="edit"><language showName="com.skyeye.editBtn"></language></a>';
						str += '<a class="layui-btn layui-btn-xs layui-btn-danger" lay-event="del">删除</a>';
					}
					return str;
				}}
			]],
			done: function(json) {
				matchingLanguage();
				initTableSearchUtil.initAdvancedSearch(this, json.searchFilter, form, "请输入单号", function () {
					table.reloadData("messageTable", {page: {curr: 1}, where: getTableParams()});
				});
			}
		});

		table.on('tool(messageTable)', function (obj) {
			var data = obj.data;
			var layEvent = obj.event;
			if (layEvent === 'details'){ //详情
				details(data);
			} else if (layEvent === 'edit') { //编辑
				edit(data);
			} else if (layEvent === 'del'){ //删除
				del(data, obj);
			}
		});
	}

	// 添加
	$("body").on("click", "#addBean", function() {
		_openNewWindows({
			url: systemCommonUtil.getUrl('FP2023090900001&objectId=' + objectId + '&objectKey=' + objectKey, null),
			title: systemLanguage["com.skyeye.addPageTitle"][languageType],
			pageId: "sealFaultAdd",
			area: ['90vw', '90vh'],
			callBack: function (refreshCode) {
				winui.window.msg(systemLanguage["com.skyeye.successfulOperation"][languageType], {icon: 1, time: 2000});
				loadTable();
			}});
	});

	// 详情
	function details(data) {
		_openNewWindows({
			url: systemCommonUtil.getUrl('FP2023090900003&objectId=' + objectId + '&objectKey=' + objectKey + '&id=' + data.id, null),
			title: systemLanguage["com.skyeye.detailsPageTitle"][languageType],
			pageId: "sealFaultDetails",
			area: ['90vw', '90vh'],
			callBack: function (refreshCode) {
				winui.window.msg(systemLanguage["com.skyeye.successfulOperation"][languageType], {icon: 1, time: 2000});
			}});
	}

	// 编辑
	function edit(data) {
		_openNewWindows({
			url: systemCommonUtil.getUrl('FP2023090900002&objectId=' + objectId + '&objectKey=' + objectKey + '&id=' + data.id, null),
			title: systemLanguage["com.skyeye.editPageTitle"][languageType],
			pageId: "sealFaultEdit",
			area: ['90vw', '90vh'],
			callBack: function (refreshCode) {
				winui.window.msg(systemLanguage["com.skyeye.successfulOperation"][languageType], {icon: 1, time: 2000});
				loadTable();
			}
		});
	}

	// 删除
	function del(data, obj) {
		layer.confirm('确认删除选中数据吗？', {icon: 3, title: '删除操作'}, function (index) {
			layer.close(index);
            AjaxPostUtil.request({url: sysMainMation.sealServiceBasePath + "deleteSealFaultById", params: {id: data.id}, type: 'json', method: 'DELETE', callback: function (json) {
				winui.window.msg(systemLanguage["com.skyeye.deleteOperationSuccessMsg"][languageType], {icon: 1, time: 2000});
				loadTable();
    		}});
		});
	}

	form.render();
	$("body").on("click", "#reloadTable", function() {
		loadTable();
	});
	function loadTable() {
		table.reloadData("messageTable", {where: getTableParams()});
	}

	function getTableParams() {
		return $.extend(true, {objectKey: objectKey, objectId: objectId}, initTableSearchUtil.getSearchValue("messageTable"));
	}

    exports('sealFaultList', {});
});
