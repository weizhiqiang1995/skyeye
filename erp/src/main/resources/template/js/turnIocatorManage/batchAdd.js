
layui.config({
    base: basePath,
    version: skyeyeVersion
}).extend({
    window: 'js/winui.window'
}).define(['window', 'jquery', 'winui', 'form', 'textool'], function (exports) {
    winui.renderColor();
    var index = parent.layer.getFrameIndex(window.name);
    var $ = layui.$,
        textool = layui.textool,
        form = layui.form;
    var parentId = getNotUndefinedVal(GetUrlParam("parentId"));
    var depotId = getNotUndefinedVal(GetUrlParam("depotId"));

    skyeyeClassEnumUtil.showEnumDataListByClassName("generateDepotLevelValType", 'radio', "type", '', form);

    textool.init({
        eleId: 'barCode',
        tools: ['copy', 'reset', 'clear']
    });

    matchingLanguage();
    form.render();
    form.on('submit(getBean)', function (data) {
        if (winui.verifyForm(data.elem)) {
            let params = {
                parentId: parentId,
                depotId: depotId,
                type: dataShowType.getData('type'),
                number: $("#number").val(),
            }
            AjaxPostUtil.request({url: sysMainMation.erpBasePath + "batchGenerateDepotLevelVal", params: params, type: 'json', method: 'POST', callback: function (json) {
                parent.layer.close(index);
                parent.refreshCode = '0';
            }});
        }
        return false;
    });

    $("body").on("click", "#cancle", function() {
        parent.layer.close(index);
    });
});



