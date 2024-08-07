layui.config({
	base: basePath, 
	version: skyeyeVersion
}).extend({
    window: 'js/winui.window'
}).define(['window', 'jquery', 'winui'], function (exports) {
	winui.renderColor();
	layui.use(['form'], function (form) {
		var index = parent.layer.getFrameIndex(window.name);
	    var $ = layui.$,
		    form = layui.form;
	    
	    var layEditor = editormd("content", {
            width: "100%",
            height: 740,
            path : 'editormd/lib/',
            theme : "default",
            previewTheme : "default",
            editorTheme : "default",
            //markdown : md,             // 初始化编辑区的内容
            codeFold : true,
            syncScrolling : "single",
            watch : true,
            saveHTMLToTextarea : true,    // 保存 HTML 到 Textarea
            searchReplace : true,
            htmlDecode : "style,script,iframe|on*",            // 开启 HTML 标签解析，为了安全性，默认不开启
            emoji : true,
            taskList : true,
            tocm : true,         // Using [TOCM]
            tex : true,                   // 开启科学公式TeX语言支持，默认关闭
            flowChart : true,             // 开启流程图支持，默认关闭
            sequenceDiagram : true,       // 开启时序/序列图支持，默认关闭,
            imageUpload : true,
            imageFormats : ["jpg", "jpeg", "gif", "png", "bmp", "webp"],
            imageUploadURL : reqBasePath + "common003?type=11", // 文件上传路径，返回值为图片加载的路径
            onload : function() {
                // 加载后富文本编辑器成功后的回调
            }
        });
	    
        matchingLanguage();
	    form.render();
	    form.on('submit(formAddBean)', function (data) {
	    	
	        if (winui.verifyForm(data.elem)) {
	        	if(isNull(layEditor.getMarkdown())){
	        		winui.window.msg('请填写文档内容。', {icon: 2, time: 2000});
	        		return false;
	        	}
	        	var params = {
        			title: $("#title").val(),
        			content: encodeURI(layEditor.getMarkdown()),
        			parentId: parent.parentId,
	        	};
	        	AjaxPostUtil.request({url: reqBasePath + "sysdevelopdoc012", params: params, type: 'json', callback: function (json) {
					parent.layer.close(index);
					parent.refreshCode = '0';
	 	   		}});
	        }
	        return false;
	    });
	    
	    // 取消
	    $("body").on("click", "#cancle", function() {
	    	parent.layer.close(index);
	    });
	});
	    
});