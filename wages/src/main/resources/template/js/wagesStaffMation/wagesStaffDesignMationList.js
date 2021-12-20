
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
	var selTemplate = getFileContent('tpl/template/select-option.tpl')

	// 已设定员工薪资档案
	table.render({
	    id: 'messageTable',
	    elem: '#messageTable',
	    method: 'post',
	    url: reqBasePath + 'wagesstaff004',
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
	        { title: systemLanguage["com.skyeye.serialNumber"][languageType], rowspan: '3', fixed: 'left', type: 'numbers'},
	        { field: 'userName', title: '姓名', rowspan: '3', align: 'left', width: 150, fixed: 'left', templet: function(d){
	        	return d.jobNumber + '_' + d.userName;
	        }},
	        { field: 'staffType', title: '类型', rowspan: '3', align: 'left', width: 90, templet: function(d){
	        	if(d.staffType == 1){
	        		return '普通员工';
	        	}else if(d.staffType == 2){
	        		return '教职工';
	        	}else{
	        		return '参数错误';
	        	}
	        }},
	        { field: 'email', title: '邮箱', rowspan: '3', align: 'left', width: 170 },
	        { field: 'userPhoto', title: '头像', rowspan: '3', align: 'center', width: 60, templet: function(d){
	        	if(isNull(d.userPhoto)){
	        		return '<img src="../../assets/images/os_windows.png" class="photo-img">';
	        	}else{
	        		return '<img src="' + fileBasePath + d.userPhoto + '" class="photo-img" lay-event="userPhoto">';
	        	}
	        }},
	        { field: 'userSex', title: '性别', width: 60, rowspan: '3', align: 'center', templet: function(d){
	        	if(d.userSex == '0'){
	        		return "保密";
	        	}else if(d.userSex == '1'){
	        		return "男";
	        	}else if(d.userSex == '2'){
	        		return "女";
	        	}else{
	        		return "参数错误";
	        	}
	        }},
	        { field: 'state', title: '状态', rowspan: '3', width: 60, align: 'center', templet: function(d){
	        	return getStaffStateName(d);
	        }},
			{ field: 'actWages', title: '月标准薪资(元)', rowspan: '3', align: 'left', width: 120},
	        { title: '公司信息', align: 'center', colspan: '3'},
	        { field: 'phone', title: '手机号', rowspan: '3', align: 'center', width: 100},
	        { field: 'homePhone', title: '家庭电话', rowspan: '3', align: 'center', width: 100},
	        { field: 'qq', title: 'QQ', rowspan: '3', align: 'left', width: 100},
	        { title: systemLanguage["com.skyeye.operation"][languageType], rowspan: '3', fixed: 'right', align: 'center', width: 120, toolbar: '#tableBar'}
	    ],[
	    	{ field: 'companyName', title: '公司', align: 'left', width: 120},
	        { field: 'departmentName', title: '部门', align: 'left', width: 120},
	        { field: 'jobName', title: '职位', align: 'left', width: 120}
	       ]
	    ],
	    done: function(){
	    	if(!loadCompany){
	    		initCompany();
	    	}
	    	soulTable.render(this);
    		matchingLanguage();
	    }
	});
	
	table.on('tool(messageTable)', function (obj) {
        var data = obj.data;
        var layEvent = obj.event;
        if (layEvent === 'wagesDesign') { // 薪资变更
			wagesDesign(data);
        }else if (layEvent === 'userPhoto') { // 头像预览
        	layer.open({
        		type:1,
        		title:false,
        		closeBtn:0,
        		skin: 'demo-class',
        		shadeClose:true,
        		content:'<img src="' + fileBasePath + data.userPhoto + '" style="max-height:600px;max-width:100%;">',
        		scrollbar:false
            });
        }
    });

	var loadCompany = false;
	// 初始化公司
	function initCompany(){
		loadCompany = true;
		systemCommonUtil.getSysCompanyList(function(json){
			// 加载企业数据
			$("#companyList").html(getDataUseHandlebars(selTemplate, json));
		});
	}

	// 初始化部门
	function initDepartment(){
		showGrid({
			id: "departmentList",
			url: reqBasePath + "companydepartment007",
			params: {companyId: $("#companyList").val()},
			pagination: false,
			template: selTemplate,
			ajaxSendLoadBefore: function(hdb){},
			ajaxSendAfter:function(json){
				form.render('select');
			}
		});
	}

	// 初始化职位
	function initJob(){
		showGrid({
			id: "jobList",
			url: reqBasePath + "companyjob007",
			params: {departmentId: $("#departmentList").val()},
			pagination: false,
			template: selTemplate,
			ajaxSendLoadBefore: function(hdb){},
			ajaxSendAfter:function(json){
				form.render('select');
			}
		});
	}

	// 公司监听事件
	form.on('select(companyList)', function(data){
		initDepartment();
		initJob();
	});

	// 部门监听事件
	form.on('select(departmentList)', function(data){
		initJob();
	});

	// 薪资变更
	function wagesDesign(data){
		rowId = data.id;
		_openNewWindows({
			url: "../../tpl/wagesStaffMation/wagesStaffMationDesign.html",
			title: "薪资变更",
			pageId: "wagesStaffMationDesign",
			area: ['90vw', '90vh'],
			callBack: function(refreshCode){
				if (refreshCode == '0') {
					winui.window.msg(systemLanguage["com.skyeye.successfulOperation"][languageType], {icon: 1,time: 2000});
					loadTable();
				} else if (refreshCode == '-9999') {
					winui.window.msg(systemLanguage["com.skyeye.operationFailed"][languageType], {icon: 2,time: 2000});
				}
			}});
	}
	
	form.render();
	form.on('submit(formSearch)', function (data) {
        if (winui.verifyForm(data.elem)) {
        	refreshTable();
        }
        return false;
	});

    $("body").on("click", "#reloadTable", function(){
    	loadTable();
    });
    
    function loadTable(){
    	table.reload("messageTable", {where: getTableParams()});
    }
    
    function refreshTable(){
    	table.reload("messageTable", {page: {curr: 1}, where: getTableParams()});
    }
    
    function getTableParams(){
    	return {
			companyId: $("#companyList").val(),
			departmentId: $("#departmentList").val(),
			jobId: $("#jobList").val(),
			userName: $("#userName").val(),
			jobNumber:$("#jobNumber").val(),
			userSex: $("#userSex").val()
		};
    }
    
    exports('wagesStaffDesignMationList', {});
});