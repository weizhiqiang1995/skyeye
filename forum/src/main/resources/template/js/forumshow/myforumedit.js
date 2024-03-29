var tagList = new Array();

layui.config({
	base: basePath, 
	version: skyeyeVersion
}).extend({
    window: 'js/winui.window'
}).define(['window', 'jquery', 'winui', 'form', 'tagEditor'], function (exports) {
	winui.renderColor();
	var $ = layui.$,
		form = layui.form;
	rowId = GetUrlParam("id");
	
	//公共标题
	$("#forumTitle").html(getFileContent("tpl/forumshow/commontitle.tpl"));
	//菜单
	$("body").append(getFileContent("tpl/forumshow/commonmenu.tpl"));
	
	var index = parent.layer.getFrameIndex(window.name);
	
	showGrid({
	 	id: "showForm",
	 	url: sysMainMation.forumBasePath + "forumcontent004",
	 	params: {rowId: rowId},
	 	pagination: false,
	 	template: getFileContent('tpl/forumshow/myforumeditTemplate.tpl'),
	 	ajaxSendLoadBefore: function(hdb) {
	 		//是否匿名
	 		hdb.registerHelper("compare4", function(v1, options){
				if(v1 == '2'){
					return 'checked';
				} else if (v1 == '1'){
					return '';
				} else {
					return '';
				}
			});
	 		hdb.registerHelper("compare5", function(v1, options){
				if(v1 == '2'){
					return 'true';
				} else if (v1 == '1'){
					return 'false';
				} else {
					return 'false';
				}
			});
	 	},
	 	ajaxSendAfter:function (json) {
	 		
	 		//回显内容
			var ue = ueEditorUtil.initEditor('container');
		    ue.addListener("ready", function () {
		    	ue.setContent(json.bean.content);
		    });
	 		
	 		//贴子标签
	 		var tagNames = [];
            tagList = [].concat(json.bean.tagName);
            $.each(json.bean.tagName, function(i, item) {
                tagNames.push(item.name);
            });
			$('#tagId').tagEditor({
		        initialTags: tagNames,
		        placeholder: '请选择标签',
		        editorTag: false,
		        beforeTagDelete: function(field, editor, tags, val) {
					tagList = [].concat(arrayUtil.removeArrayPointName(tagList, val));
		        }
		    });
			
	 		$("input:radio[name=forumType][value=" + json.bean.forumType + "]").attr("checked", true);
	 		if(json.bean.anonymous == "1"){
	 			$("#anonymous").val("false");
	 		} else {
	 			$("#anonymous").val("true");
	 		}
	 		matchingLanguage();
	 		form.render();
	 	    form.on('submit(formEditBean)', function (data) {
	 	        if (winui.verifyForm(data.elem)) {
	 	        	var params = {
 	        			rowId: rowId,
	 	    			title: $("#title").val(),
	 	    			forumType: data.field.forumType,
						tagId: systemCommonUtil.tagEditorGetAllData('tagId', tagList)
	 	        	};
	 	        	if(isNull(params.tagId)) {
	 	        		winui.window.msg("请选择标签", {icon: 2, time: 2000});
	 	        		return false;
	 	    		}
	 	        	if($("#anonymous").val() == 'true'){
	 	        		params.anonymous = '2';
	 	        	} else {
	 	        		params.anonymous = '1';
	 	        	}
	 	        	params.content = encodeURIComponent(ue.getContent());
	 	        	if(isNull(params.content)){
	 	        		winui.window.msg("请输入内容", {icon: 2, time: 2000});
	 	        		return false;
	 	        	}
	 	        	params.textConent = encodeURIComponent(ue.getContentTxt());
	 	        	AjaxPostUtil.request({url: sysMainMation.forumBasePath + "forumcontent005", params: params, type: 'json', callback: function (json) {
						winui.window.msg("发布成功", {icon: 1, time: 2000}, function() {
							location.href = '../../tpl/forumshow/myposts.html';
						});
	 	        	}});
	 	        }
	 	        return false;
	 	    });
	 	}
	});
	
	$("body").on("click", "#chooseTag", function(e) {
		tagReturnList = [].concat(tagList);
		_openNewWindows({
			url: "../../tpl/forumshow/choosetag.html", 
			title: "标签选择",
			pageId: "choosetagpage",
			area: ['600px', '500px'],
			callBack: function (refreshCode) {
				// 重置数据
				tagList = [].concat(systemCommonUtil.tagEditorResetData('tagId', tagReturnList));
			}});
	});
	
	//是否匿名
	form.on('switch(anonymous)', function (data) {
		//同步开关值
		$(data.elem).val(data.elem.checked);
	});
	
	$("body").on("click", "#cancle", function() {
		location.href = '../../tpl/forumshow/myposts.html';
    });
	
    exports('myforumedit', {});
});
