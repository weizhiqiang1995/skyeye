
layui.config({
	base: basePath, 
	version: skyeyeVersion
}).extend({
    window: 'js/winui.window'
}).define(['window', 'table', 'jquery', 'winui', 'element'], function (exports) {
	winui.renderColor();
	layui.use(['form', 'codemirror', 'xml', 'clike', 'css', 'htmlmixed', 'javascript', 'nginx',
	           'solr', 'sql', 'vue'], function (form) {
		var index = parent.layer.getFrameIndex(window.name);
	    var $ = layui.$,
			element = layui.element,
	    	form = layui.form;

		// 根据类型获取部分功能的使用说明
		systemCommonUtil.queryExplainMationByType(1, function (json) {
			$(".layui-colla-title").html(json.bean.title);
			$(".layui-colla-content").html(json.bean.content);
		});
		element.init();

	    var editor = CodeMirror.fromTextArea(document.getElementById("modelContent"), {
            mode : "text/x-java",  // 模式
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
	    
        matchingLanguage();
		form.render();
		form.on('select(selectParent)', function(data) {
			var lang = $("#modelType").val();
			var mode = returnModel(lang);
			if (!isNull(mode.length)) {
				editor.setOption('mode', mode)
			} 
 		});
		
	    form.on('submit(formAddBean)', function (data) {
	        if (winui.verifyForm(data.elem)) {
	        	if(isNull(editor.getValue())){
	        		winui.window.msg('请输入模板内容', {icon: 2, time: 2000});
	        	} else {
	        		var params = {
        				modelName: $("#modelName").val(),
        				modelContent: encodeURIComponent(editor.getValue()),
        				modelText: encodeURIComponent(editor.getValue()),
        				modelType: $("#modelType").val(),
        				groupId: parent.groupId,
	        		};
	        		
	        		AjaxPostUtil.request({url: reqBasePath + "codemodel007", params: params, type: 'json', callback: function (json) {
						parent.layer.close(index);
						parent.refreshCode = '0';
	        		}});
	        	}
	        }
	        return false;
	    });
	    
	    // 取消
	    $("body").on("click", "#cancle", function() {
	    	parent.layer.close(index);
	    });
	    
	});
	    
});