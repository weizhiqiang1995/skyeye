
// 资产信息详情
layui.config({
	base: basePath, 
	version: skyeyeVersion
}).extend({
    window: 'js/winui.window'
}).define(['window', 'jquery', 'winui'], function (exports) {
	winui.renderColor();
	layui.use(['form'], function (form) {
		var index = parent.layer.getFrameIndex(window.name);
	    var $ = layui.$;

	    showGrid({
		 	id: "showForm",
		 	url: flowableBasePath + "asset006",
		 	params: {rowId: parent.rowId},
		 	pagination: false,
			template: $("#beanTemplate").html(),
		 	ajaxSendLoadBefore: function(hdb, json) {
				json.bean.describe = stringManipulation.textAreaShow(json.bean.describe);
		 	},
		 	ajaxSendAfter:function (json) {
		 		$("#assetImg").attr("src", fileBasePath + json.bean.assetImg);
		 		// 附件回显
				skyeyeEnclosure.showDetails({"enclosureUpload": json.bean.enclosureInfo});
		        matchingLanguage();
		 	}
		});
	    
	    $("body").on("click", "#assetImg", function() {
			systemCommonUtil.showPicImg($(this).attr("src"));
	    });
	});
});