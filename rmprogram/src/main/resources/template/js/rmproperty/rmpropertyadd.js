layui.config({
	base: basePath, 
	version: skyeyeVersion
}).extend({
    window: 'js/winui.window'
}).define(['window','jquery', 'winui', 'codemirror', 'xml', 'clike', 'css', 'htmlmixed', 'javascript', 'nginx', 'solr', 'sql', 'vue'], function (exports) {
	winui.renderColor();
	layui.use(['form'], function (form) {
		var index = parent.layer.getFrameIndex(window.name);
	    var $ = layui.$,
	    	form = layui.form;
	    
	    matchingLanguage();
		form.render();
		
		$("#dataShowModel").hide();
		
		AjaxPostUtil.request({url:reqBasePath + "exexplain004", params:{type: 4}, type: 'json', callback: function(j){
			if(j.returnCode == 0){
   				$("#exexplaintormpropertyTitle").html(j.bean.title);
   				$("#exexplaintormpropertyContent").html(j.bean.content);
   			}else{
   				winui.window.msg(j.returnMessage, {icon: 2,time: 2000});
   			}
   		}});
      	
      	var htmlModelContent = CodeMirror.fromTextArea(document.getElementById("htmlModelContent"), {
            mode : "xml",  // 模式
            theme : "eclipse",  // CSS样式选择
            indentUnit : 4,  // 缩进单位，默认2
            smartIndent : true,  // 是否智能缩进
            tabSize : 4,  // Tab缩进，默认4
            readOnly : true,  // 是否只读，默认false
            showCursorWhenSelecting : true,
            lineNumbers : true,  // 是否显示行号
            styleActiveLine: true, //line选择是是否加亮
            matchBrackets: true,
        });
      	
      	var jsModelContent = CodeMirror.fromTextArea(document.getElementById("jsModelContent"), {
            mode : "text/javascript",  // 模式
            theme : "eclipse",  // CSS样式选择
            indentUnit : 4,  // 缩进单位，默认2
            smartIndent : true,  // 是否智能缩进
            tabSize : 4,  // Tab缩进，默认4
            readOnly : true,  // 是否只读，默认false
            showCursorWhenSelecting : true,
            lineNumbers : true,  // 是否显示行号
            styleActiveLine: true, //line选择是是否加亮
            matchBrackets: true,
        });
      	
      	var htmlContent = CodeMirror.fromTextArea(document.getElementById("htmlContent"), {
            mode : "xml",  // 模式
            theme : "eclipse",  // CSS样式选择
            indentUnit : 4,  // 缩进单位，默认2
            smartIndent : true,  // 是否智能缩进
            tabSize : 4,  // Tab缩进，默认4
            readOnly : false,  // 是否只读，默认false
            showCursorWhenSelecting : true,
            lineNumbers : true,  // 是否显示行号
            styleActiveLine: true, //line选择是是否加亮
            matchBrackets: true,
        });
      	
      	var jsContent = CodeMirror.fromTextArea(document.getElementById("jsContent"), {
            mode : "text/javascript",  // 模式
            theme : "eclipse",  // CSS样式选择
            indentUnit : 4,  // 缩进单位，默认2
            smartIndent : true,  // 是否智能缩进
            tabSize : 4,  // Tab缩进，默认4
            readOnly : false,  // 是否只读，默认false
            showCursorWhenSelecting : true,
            lineNumbers : true,  // 是否显示行号
            styleActiveLine: true, //line选择是是否加亮
            matchBrackets: true,
        });
      	
      	var jsRelyOnContent = CodeMirror.fromTextArea(document.getElementById("jsRelyOnContent"), {
            mode : "text/javascript",  // 模式
            theme : "eclipse",  // CSS样式选择
            indentUnit : 4,  // 缩进单位，默认2
            smartIndent : true,  // 是否智能缩进
            tabSize : 4,  // Tab缩进，默认4
            readOnly : false,  // 是否只读，默认false
            showCursorWhenSelecting : true,
            lineNumbers : true,  // 是否显示行号
            styleActiveLine: true, //line选择是是否加亮
            matchBrackets: true,
        });
      	
      	//展现形式
      	showGrid({
    	 	id: "dsFormContentId",
    	 	url: reqBasePath + "dsform006",
    	 	params: {},
    	 	pagination: false,
    	 	template: getFileContent('tpl/template/select-option.tpl'),
    	 	ajaxSendLoadBefore: function(hdb){
    	 	},
    	 	ajaxSendAfter:function(json){
    	 		form.render('select');
    	 	}
        });
      	
      	// 子查询变化
 		form.on('radio(selChildData)', function (data) {
 			var val = data.value;
	    	if(val == '1'){
	    		// 是
	    		$("#dataShowModel").show();
	    		showGrid({
	    		 	id: "displayTemplateId",
	    		 	url: reqBasePath + "dsformdisplaytemplate006",
	    		 	params: {},
	    		 	pagination: false,
	    		 	template: getFileContent('tpl/template/select-option.tpl'),
	    		 	ajaxSendLoadBefore: function(hdb){
	    		 	},
	    		 	ajaxSendAfter:function(json){
	    		 		form.render('select');
	    		 	}
	    		});
	    	}else if(val == '2'){
	    		// 否
	    		$("#dataShowModel").hide();
	    	}else{
	    		winui.window.msg('状态值错误', {icon: 2,time: 2000});
	    	}
        });
      	
      	form.on('select(selectParent)', function(data){
      		AjaxPostUtil.request({url:reqBasePath + "dsform007", params:{rowId: data.value}, type: 'json', callback: function(json){
    			if(json.returnCode == 0){
    				htmlModelContent.setValue(json.bean.htmlContent);
    				jsModelContent.setValue(json.bean.jsContent);
    				htmlContent.setValue(json.bean.htmlContent);
    				jsContent.setValue(json.bean.jsContent);
    			}else{
    				winui.window.msg(json.returnMessage, {icon: 2,time: 2000});
    			}
    		}});
		});
		
	    form.on('submit(formAddBean)', function (data) {
	        if (winui.verifyForm(data.elem)) {
	        	var params = {
        			title: $("#title").val(),
        			propertyTag: $("#propertyTag").val(),
        			propertyUnit: encodeURI($("#propertyUnit").val()),
        			dsFormContentId: $("#dsFormContentId").val(),
        			propertyOut: data.field.propertyOut,
        			selChildData: data.field.selChildData,
        			htmlContent: encodeURI(htmlContent.getValue().replace(/\+/g, "%2B").replace(/\&/g, "%26")),
        			jsContent: encodeURI(jsContent.getValue().replace(/\+/g, "%2B").replace(/\&/g, "%26")),
        			jsRelyOn: encodeURI(jsRelyOnContent.getValue().replace(/\+/g, "%2B").replace(/\&/g, "%26"))
	        	};
	        	
	        	if(data.field.selChildData == '1'){
	        		if(isNull($("#displayTemplateId").val())){
	        			winui.window.msg('请选择子查询数据展示模板', {icon: 2,time: 2000});
	        			return false;
	        		}else{
	        			params.displayTemplateId = $("#displayTemplateId").val();
	        		}
	        	}else{
	        		params.displayTemplateId = "";
	        	}
	        	
	        	AjaxPostUtil.request({url:reqBasePath + "rmproperty002", params:params, type: 'json', callback: function(json){
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
	    
	    $("body").on("click", "#cancle", function(){
	    	parent.layer.close(index);
	    });
	});
	    
});