
// 员工档案资料
layui.config({
	base: basePath, 
	version: skyeyeVersion
}).extend({
    window: 'js/winui.window'
}).define(['window', 'jquery', 'winui', 'textool', 'laydate'], function (exports) {
	winui.renderColor();
	layui.use(['form'], function (form) {
		var index = parent.layer.getFrameIndex(window.name);
	    var $ = layui.$,
	    	laydate = layui.laydate,
			textool = layui.textool;
	    // 下拉框模板
	    var selTemplate = getFileContent('tpl/template/select-option.tpl');
	    
	    showGrid({
		 	id: "showForm",
		 	url: sysMainMation.ehrBasePath + "sysstaffarchives006",
		 	params: {rowId: parent.rowId},
		 	pagination: false,
		 	method: "GET",
		 	template: $("#beanTemplate").html(),
		 	ajaxSendLoadBefore: function(hdb) {},
		 	ajaxSendAfter:function (json) {
		 		laydate.render({elem: '#archivesTime', trigger: 'click'});
		 		
		 		textool.init({eleId: 'remark', maxlength: 200});
			    
			    $("#whetherArchives").val(json.bean.whetherArchives);
			    $("#archivesState").val(json.bean.archivesState);

				// 附件回显
				skyeyeEnclosure.initTypeISData({'enclosureUpload': json.bean.enclosureInfo});

				// 学历
				sysDictDataUtil.showDictDataListByDictTypeCode(sysDictData["employeeEducation"]["key"], 'select', "educationId", json.bean.educationId, form);

				systemCommonUtil.getSysCompanyList(function(companyList){
					// 加载企业数据
					$("#managementUnit").html(getDataUseHandlebars(selTemplate, companyList));
					$("#managementUnit").val(json.bean.managementUnit);
				});

			    matchingLanguage();
		 		form.render();
		 	    form.on('submit(formEditBean)', function (data) {
		 	        if (winui.verifyForm(data.elem)) {
						var params = {
		        			archivesNumber: $("#archivesNumber").val(),
		 	        		managementUnit: $("#managementUnit").val(),
		 	        		archivesCenter: $("#archivesCenter").val(),
		 	        		custodyPlace: $("#custodyPlace").val(),
		 	        		educationId: $("#educationId").val(),
		 	        		archivesTime: $("#archivesTime").val(),
		 	        		whetherArchives: $("#whetherArchives").val(),
			 	        	archivesState: $("#archivesState").val(),
			 	        	remark: $("#remark").val(),
			 	        	rowId: parent.rowId,
							enclosureInfo: skyeyeEnclosure.getEnclosureIdsByBoxId('enclosureUpload')
		 	        	};
		 	        	AjaxPostUtil.request({url: sysMainMation.ehrBasePath + "sysstaffarchives007", params: params, type: 'json', callback: function (json) {
							parent.layer.close(index);
							parent.refreshCode = '0';
		 	        	}});
		 	        }
		 	        return false;
		 	    });
		 		form.render();
		 	}
	    });

	    $("body").on("click", "#cancle", function() {
	    	parent.layer.close(index);
	    });
	});
});