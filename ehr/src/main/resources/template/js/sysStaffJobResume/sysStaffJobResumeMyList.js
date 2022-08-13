
var rowId = "";

var staffId = "";

layui.config({
	base: basePath, 
	version: skyeyeVersion
}).extend({
    window: 'js/winui.window'
}).define(['window', 'table', 'jquery', 'winui', 'form'], function (exports) {
	winui.renderColor();
	var $ = layui.$,
		form = layui.form,
		table = layui.table;
	
	authBtn('1601785893626');
	// 获取当前登录员工信息
	systemCommonUtil.getSysCurrentLoginUserMation(function (data){
		staffId = data.bean.staffId;
	});

	initTable();
	function initTable(){
		table.render({
		    id: 'messageTable',
		    elem: '#messageTable',
		    method: 'post',
		    url: sysMainMation.ehrBasePath + 'sysstaffjobresume006',
		    where: getTableParams(),
		    even: true,
		    page: true,
		    limits: getLimits(),
	    	limit: getLimit(),
		    cols: [[
		        { title: systemLanguage["com.skyeye.serialNumber"][languageType], type: 'numbers'},
		        { field: 'workUnit', title: '任职单位', align: 'left', width: 160 },
		        { field: 'department', title: '任职部门', width: 120},
		        { field: 'job', title: '职务', width: 120},
                { field: 'station', title: '岗位', width: 120},
                { field: 'startTime', title: '任职开始时间', align: 'center', width: 100 },
                { field: 'endTime', title: '任职结束时间', align: 'center', width: 100 },
                { field: 'jobNumber', title: '员工工号', align: 'left', width: 80 },
                { field: 'userName', title: '员工姓名', align: 'left', width: 100 },
            	{ field: 'state', title: '员工状态', align: 'center', width: 80, templet: function (d) {
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
                { field: 'createTime', title: systemLanguage["com.skyeye.entryTime"][languageType], align: 'center', width: 100},
		        { title: systemLanguage["com.skyeye.operation"][languageType], fixed: 'right', align: 'center', width: 100, toolbar: '#tableBar'}
		    ]],
		    done: function(){
		    	matchingLanguage();
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
	
	// 录入工作履历
	$("body").on("click", "#addBean", function() {
    	_openNewWindows({
			url: "../../tpl/sysStaffJobResume/sysStaffJobResumeAdd.html",
			title: "录入工作履历",
			pageId: "sysStaffJobResumeAdd",
			area: ['90vw', '90vh'],
			callBack: function(refreshCode) {
				winui.window.msg(systemLanguage["com.skyeye.successfulOperation"][languageType], {icon: 1, time: 2000});
				loadTable();
			}});
	});
	
	// 编辑
    function edit(data){
        rowId = data.id;
        _openNewWindows({
			url: "../../tpl/sysStaffJobResume/sysStaffJobResumeEdit.html",
			title: systemLanguage["com.skyeye.editPageTitle"][languageType],
			pageId: "sysStaffJobResumeEdit",
            area: ['90vw', '90vh'],
			callBack: function(refreshCode) {
				winui.window.msg(systemLanguage["com.skyeye.successfulOperation"][languageType], {icon: 1, time: 2000});
				loadTable();
			}
		});
	}
	
	// 删除
    function deleteRow(data){
        layer.confirm(systemLanguage["com.skyeye.deleteOperationMsg"][languageType], {icon: 3, title: systemLanguage["com.skyeye.deleteOperation"][languageType]}, function(index){
            layer.close(index);
            AjaxPostUtil.request({url: sysMainMation.ehrBasePath + "sysstaffjobresume005", params: {rowId: data.id}, type: 'json', method: "DELETE", callback: function (json) {
				winui.window.msg(systemLanguage["com.skyeye.deleteOperationSuccessMsg"][languageType], {icon: 1, time: 2000});
				loadTable();
            }});
        });
    }

	// 刷新数据
    $("body").on("click", "#reloadTable", function() {
    	loadTable();
    });

    function loadTable(){
        table.reloadData("messageTable", {where: getTableParams()});
    }

    function getTableParams(){
    	return {
    		staffId: staffId
    	};
	}
    
    exports('sysStaffJobResumeMyList', {});
});
