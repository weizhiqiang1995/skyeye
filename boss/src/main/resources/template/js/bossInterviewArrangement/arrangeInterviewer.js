
layui.config({
    base: basePath,
    version: skyeyeVersion
}).extend({
    window: 'js/winui.window'
}).define(['window', 'jquery', 'winui', 'form', 'tagEditor'], function(exports) {
    winui.renderColor();
    var index = parent.layer.getFrameIndex(window.name);
    var $ = layui.$,
        form = layui.form;
    var interviewer = [];

    showGrid({
        id: "showForm",
        url: flowableBasePath + "queryBossInterviewArrangementById",
        params: {id: parent.rowId},
        pagination: false,
        method: "GET",
        template: $("#beanTemplate").html(),
        ajaxSendLoadBefore: function(hdb, json){
            json.bean.basicResume = stringManipulation.textAreaShow(json.bean.basicResume);
            json.bean.stateName = bossUtil.showStateName(json.bean.state);
        },
        ajaxSendAfter: function (json) {
            skyeyeEnclosure.showDetails({'enclosureUpload': json.bean.enclosureInfo});

            var userNames = [];
            interviewer = [].concat(json.bean.interviewer);
            $.each(interviewer, function(i, item){
                userNames.push(item.name);
            });
            $('#interviewer').tagEditor({
                initialTags: userNames,
                placeholder: '请选择面试官',
                editorTag: false,
                beforeTagDelete: function(field, editor, tags, val) {
                    var inArray = -1;
                    $.each(interviewer, function(i, item) {
                        if(val === item.name) {
                            inArray = i;
                            return false;
                        }
                    });
                    if(inArray != -1) {
                        interviewer.splice(inArray, 1);
                    }
                }
            });

            matchingLanguage();
            form.render();
            // 提交
            form.on('submit(formSubBean)', function(data) {
                if(winui.verifyForm(data.elem)) {
                    var params = {
                        id: parent.rowId,
                        interviewer: interviewer[0].id
                    };
                    AjaxPostUtil.request({url: flowableBasePath + "setBossInterviewer", params: params, type: 'json', method: "PUT", callback: function(json) {
                        if(json.returnCode == 0) {
                            parent.layer.close(index);
                            parent.refreshCode = '0';
                        } else {
                            winui.window.msg(json.returnMessage, {icon: 2, time: 2000});
                        }
                    }});
                }
                return false;
            });

        }
    });

    // 面试官选择
    $("body").on("click", ".interviewerBtn", function(){
        systemCommonUtil.userReturnList = [].concat(interviewer);
        systemCommonUtil.chooseOrNotMy = "1"; // 人员列表中是否包含自己--1.包含；其他参数不包含
        systemCommonUtil.chooseOrNotEmail = "2"; // 人员列表中是否必须绑定邮箱--1.必须；其他参数没必要
        systemCommonUtil.checkType = "2"; // 人员选择类型，1.多选；其他。单选
        systemCommonUtil.openSysUserStaffChoosePage(function (staffChooseList){
            // 移除所有tag
            var tags = $('#interviewer').tagEditor('getTags')[0].tags;
            for (i = 0; i < tags.length; i++) {
                $('#interviewer').tagEditor('removeTag', tags[i]);
            }
            interviewer = [].concat(staffChooseList);
            // 添加新的tag
            $.each(interviewer, function(i, item){
                $('#interviewer').tagEditor('addTag', item.name);
            });
        });
    });

});