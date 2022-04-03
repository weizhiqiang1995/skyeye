
var userList = new Array();//选择用户返回的集合或者进行回显的集合
var borrowuserList = new Array();
var userReturnList = new Array();//选择用户返回的集合或者进行回显的集合
var chooseOrNotMy = "1";//人员列表中是否包含自己--1.包含；其他参数不包含
var chooseOrNotEmail = "2";//人员列表中是否必须绑定邮箱--1.必须；其他参数没必要
var checkType = "2";//人员选择类型，1.多选；其他。单选

// 印章信息
layui.config({
	base: basePath, 
	version: skyeyeVersion
}).extend({
    window: 'js/winui.window'
}).define(['window', 'jquery', 'winui', 'fileUpload', 'tagEditor', 'laydate'], function (exports) {
	winui.renderColor();
	layui.use(['form'], function (form) {
		var index = parent.layer.getFrameIndex(window.name);
	    var $ = layui.$,
	    	laydate = layui.laydate;

	    //启用日期
 		laydate.render({ 
		  elem: '#enableTime',
		  type: 'date',
		  trigger: 'click'
 		});

		skyeyeEnclosure.init('enclosureUpload');
 		matchingLanguage();
 		form.render();
 	    form.on('submit(formAddBean)', function (data) {
 	        if (winui.verifyForm(data.elem)) {
 	        	var params = {
        			sealName: $("#sealName").val(),
        			enableTime: $("#enableTime").val(),
        			roomAddDesc: $("#roomAddDesc").val(),
					enclosureInfo: skyeyeEnclosure.getEnclosureIdsByBoxId('enclosureUpload')
 	        	};
 	        	if(userList.length == 0 || isNull($('#sealAdmin').tagEditor('getTags')[0].tags)){
 	        		winui.window.msg("请选择管理人", {icon: 2,time: 2000});
 	        		return false;
 	        	}else{
        			params.sealAdmin = userList[0].id;
        		}
 	        	if(borrowuserList.length == 0 || isNull($('#borrowId').tagEditor('getTags')[0].tags)){
 	        		params.borrowId = "";
 	        	}else{
        			params.borrowId = borrowuserList[0].id;
        		}
 	        	AjaxPostUtil.request({url: flowableBasePath + "seal002", params:params, type:'json', callback:function(json){
	 	   			if(json.returnCode == 0){
		 	   			parent.layer.close(index);
		 	        	parent.refreshCode = '0';
	 	   			}else{
	 	   				winui.window.msg(json.returnMessage, {icon: 2,time: 2000});
	 	   			}
	 	   		}});
 	        }
 	        return false;
 	    });
 	    
 	    // 管理人
	    $('#sealAdmin').tagEditor({
	        initialTags: [],
	        placeholder: '请选择管理人',
	        editorTag: false,
	        beforeTagDelete: function(field, editor, tags, val) {
	        	var inArray = -1;
		    	$.each(userList, function(i, item) {
		    		if(val === item.name) {
		    			inArray = i;
		    			return false;
		    		}
		    	});
		    	if(inArray != -1) { //如果该元素在集合中存在
		    		userList.splice(inArray, 1);
		    	}
	        }
	    });
	    // 管理人选择
		$("body").on("click", "#userNameSelPeople", function(e){
			userReturnList = [].concat(userList);
			_openNewWindows({
				url: "../../tpl/common/sysusersel.html", 
				title: "人员选择",
				pageId: "sysuserselpage",
				area: ['80vw', '80vh'],
				callBack: function(refreshCode){
					if (refreshCode == '0') {
						//移除所有tag
						var tags = $('#sealAdmin').tagEditor('getTags')[0].tags;
						for (i = 0; i < tags.length; i++) { 
							$('#sealAdmin').tagEditor('removeTag', tags[i]);
						}
						userList = [].concat(userReturnList);
					    //添加新的tag
						$.each(userList, function(i, item){
							$('#sealAdmin').tagEditor('addTag', item.name);
						});
	                } else if (refreshCode == '-9999') {
	                	winui.window.msg(systemLanguage["com.skyeye.operationFailed"][languageType], {icon: 2,time: 2000});
	                }
				}});
		});
		
		// 借用人
	    $('#borrowId').tagEditor({
	        initialTags: [],
	        placeholder: '请选择借用人',
	        editorTag: false,
	        beforeTagDelete: function(field, editor, tags, val) {
	        	var inArray = -1;
		    	$.each(borrowuserList, function(i, item) {
		    		if(val === item.name) {
		    			inArray = i;
		    			return false;
		    		}
		    	});
		    	if(inArray != -1) { //如果该元素在集合中存在
		    		borrowuserList.splice(inArray, 1);
		    	}
	        }
	    });
	    // 借用人选择
		$("body").on("click", "#borrowPeople", function(e){
			userReturnList = [].concat(borrowuserList);
			_openNewWindows({
				url: "../../tpl/common/sysusersel.html", 
				title: "人员选择",
				pageId: "borrowpage",
				area: ['80vw', '80vh'],
				callBack: function(refreshCode){
					if (refreshCode == '0') {
						//移除所有tag
						var tags = $('#borrowId').tagEditor('getTags')[0].tags;
						for (i = 0; i < tags.length; i++) { 
							$('#borrowId').tagEditor('removeTag', tags[i]);
						}
						borrowuserList = [].concat(userReturnList);
					    //添加新的tag
						$.each(borrowuserList, function(i, item){
							$('#borrowId').tagEditor('addTag', item.name);
						});
	                } else if (refreshCode == '-9999') {
	                	winui.window.msg(systemLanguage["com.skyeye.operationFailed"][languageType], {icon: 2,time: 2000});
	                }
				}});
		});
 	    
	    $("body").on("click", "#cancle", function(){
	    	parent.layer.close(index);
	    });
	});
});