
var objectKey = "";
var objectId = "";

layui.config({
    base: basePath,
    version: skyeyeVersion
}).extend({
    window: 'js/winui.window'
}).define(['window', 'table', 'jquery', 'winui', 'form'], function (exports) {
    winui.renderColor();
    var $ = layui.$,
        form = layui.form,
        table = layui.table;
    objectKey = GetUrlParam("objectKey");
    objectId = GetUrlParam("objectId");
    subjectClassesId = GetUrlParam("subjectClassesId");
    if (isNull(objectKey) || isNull(objectId)) {
        winui.window.msg("请传入适用对象信息", {icon: 2, time: 2000});
        return false;
    }

    table.render({
        id: 'messageTable',
        elem: '#messageTable',
        method: 'post',
        url: sysMainMation.schoolBasePath + 'queryCheckworkList',
        where: getTableParams(),
        even: true,
        page: true,
        limits: getLimits(),
        limit: getLimit(),
        cols: [[
            { title: systemLanguage["com.skyeye.serialNumber"][languageType], type: 'numbers' },
            { field: 'lastUpdateTime', title: '发布时间', align: 'left', width: 200},
            { field: 'maintainTime', title: '持续时间', align: 'left', width: 150},
            { field: 'type', title: '签到类型', align: 'left',width: 150, templet: function(d) {
                    // var str = '';
                    // if (d.type == 'beCorrected') {
                    //     str +='未批改';
                    // }else{
                    //     str +='已批改';
                    // }
                    // return str;
                }},
            { field: 'codeNumber', title: '数字码', align: 'left', width: 150},
            { field: 'codeNumber', title: '签到码', align: 'left', width: 150},
            { title: systemLanguage["com.skyeye.operation"][languageType], fixed: 'right', align: 'center', width: 257, toolbar: '#tableBar' }
        ]],
        done: function(json) {
            matchingLanguage();
            initTableSearchUtil.initAdvancedSearch(this, json.searchFilter, form, "暂不支持搜索", function () {
                table.reloadData("messageTable", {page: {curr: 1}, where: getTableParams()});
            });
        }
    });

    table.on('tool(messageTable)', function (obj) {
        var data = obj.data;
        var layEvent = obj.event;
        if (layEvent === 'details') { //详情
            details(data);
        } else if (layEvent === 'del') { //删除
            del(data);
        }
    });

    // 新增
    $("body").on("click", "#addBean", function() {
        parent._openNewWindows({
            url: '../../tpl/topic/write.html?objectId=' + objectId + '&objectKey=' + objectKey + '&subjectClassesId=' + subjectClassesId,
            title: systemLanguage["com.skyeye.addPageTitle"][languageType],
            pageId: "topicAdd",
            area: ['90vw', '90vh'],
            callBack: function (refreshCode) {
                winui.window.msg(systemLanguage["com.skyeye.successfulOperation"][languageType], {icon: 1, time: 2000});
                loadTable();
            }});
    });

    // 详情
    function details(data) {
        parent._openNewWindows({
            url: '../../tpl/topic/details.html?objectId=' + objectId + '&objectKey=' + objectKey + '&id=' + data.id,
            title: systemLanguage["com.skyeye.detailsPageTitle"][languageType],
            pageId: "topicDetails",
            area: ['90vw', '90vh'],
            callBack: function (refreshCode) {
                winui.window.msg(systemLanguage["com.skyeye.successfulOperation"][languageType], {icon: 1, time: 2000});
                loadTable();
            }});
    }

    // 删除
    function del(data, obj) {
        layer.confirm(systemLanguage["com.skyeye.deleteOperationMsg"][languageType], {icon: 3, title: systemLanguage["com.skyeye.deleteOperation"][languageType]}, function (index) {
            layer.close(index);
            AjaxPostUtil.request({url: sysMainMation.schoolBasePath + "deleteTopicById", params: {id: data.id}, type: 'json', method: 'DELETE', callback: function (json) {
                    winui.window.msg(systemLanguage["com.skyeye.deleteOperationSuccessMsg"][languageType], {icon: 1, time: 2000});
                    loadTable();
                }});
        });
    }

    form.render();
    $("body").on("click", "#reloadTable", function() {
        loadTable();
    });
    function loadTable() {
        table.reloadData("messageTable", {where: getTableParams()});
    }

    function getTableParams() {
        return $.extend(true, {objectKey: objectKey, objectId: subjectClassesId,holderId:subjectClassesId}, initTableSearchUtil.getSearchValue("messageTable"));
    }

    exports('topicList', {});
});