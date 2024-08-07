
layui.config({
	base: basePath, 
	version: skyeyeVersion
}).extend({
    window: 'js/winui.window'
}).define(['window', 'jquery', 'winui', 'textool'], function (exports) {
	winui.renderColor();
	layui.use(['form'], function (form) {
		var index = parent.layer.getFrameIndex(window.name);
	    var $ = layui.$,
			textool = layui.textool;
		var selOption = getFileContent('tpl/template/select-option.tpl');
	    
	    showGrid({
		 	id: "showForm",
		 	url: reqBasePath + "queryDictDataMationById",
		 	params: {id: parent.rowId},
		 	pagination: false,
			method: "GET",
		 	template: $("#showTemplate").html(),
			ajaxSendLoadBefore: function(hdb, json){
				json.bean.remark = stringManipulation.textAreaShow(json.bean.remark);
			},
		 	ajaxSendAfter: function (json) {
				skyeyeClassEnumUtil.showEnumDataListByClassName("commonIsDefault", 'radio', "isDefault", json.bean.isDefault, form);
				skyeyeClassEnumUtil.showEnumDataListByClassName("commonEnable", 'radio', "enabled", json.bean.enabled, form);
				// 加载数据字典分类
				sysDictDataUtil.queryDictTypeListByEnabled(1, function (data) {
					$("#dictTypeId").html(getDataUseHandlebars(selOption, data));
					$("#dictTypeId").val(json.bean.dictTypeId);
					form.render('select');
				});

				textool.init({eleId: 'remark', maxlength: 200});

				matchingLanguage();
				form.render();
		 	    form.on('submit(formEditBean)', function (data) {
		 	        if (winui.verifyForm(data.elem)) {
		 	        	var params = {
							id: parent.rowId,
							dictName: $("#dictName").val(),
							dictTypeId: $("#dictTypeId").val(),
							dictSort: $("#dictSort").val(),
							isDefault: $("#isDefault input:radio:checked").val(),
							enabled: $("#enabled input:radio:checked").val(),
							parentId: json.bean.parentId,
							level: json.bean.level,
							remark: $("#remark").val(),
		 	        	};
		 	        	AjaxPostUtil.request({url: reqBasePath + "writeDictDataMation", params: params, type: 'json', method: "POST", callback: function (json) {
							parent.layer.close(index);
							parent.refreshCode = '0';
		 	        	}});
		 	        }
		 	        return false;
		 	    });
		 	}
		});
	    
	    $("body").on("click", "#cancle", function() {
	    	parent.layer.close(index);
	    });
	});
});