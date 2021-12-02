/*******************************************************************************
 * Copyright 卫志强 QQ：598748873@qq.com Inc. All rights reserved. 开源地址：https://gitee.com/doc_wei01/skyeye
 ******************************************************************************/

package com.skyeye.activiti.service.impl;

import cn.hutool.json.JSONUtil;
import com.skyeye.activiti.service.ActivitiModelService;
import com.skyeye.activiti.service.DsFormActivitiService;
import com.skyeye.annotation.transaction.ActivitiAndBaseTransaction;
import com.skyeye.common.object.InputObject;
import com.skyeye.common.object.OutputObject;
import com.skyeye.common.util.ToolUtil;
import com.skyeye.eve.dao.ActUserProcessInstanceIdDao;
import com.skyeye.eve.dao.DsFormPageDataDao;
import com.skyeye.eve.dao.DsFormPageSequenceDao;
import com.skyeye.eve.service.DsFormPageService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

/**
 * @ClassName: DsFormActivitiServiceImpl
 * @Description: 动态表单类型的工作流相关内容
 * @author: skyeye云系列--卫志强
 * @date: 2021/12/2 20:25
 * @Copyright: 2021 https://gitee.com/doc_wei01/skyeye Inc. All rights reserved.
 * 注意：本内容仅限购买后使用.禁止私自外泄以及用于其他的商业目的
 */
@Service
public class DsFormActivitiServiceImpl implements DsFormActivitiService {

    @Autowired
    private DsFormPageService dsFormPageService;

    @Autowired
    private DsFormPageDataDao dsFormPageDataDao;

    @Autowired
    private DsFormPageSequenceDao dsFormPageSequenceDao;

    @Autowired
    private ActivitiService activitiService;

    @Autowired
    private ActUserProcessInstanceIdDao actUserProcessInstanceIdDao;

    @Autowired
    private ActivitiModelService activitiModelService;

    /**
     *
     * @Title: insertDSFormProcess
     * @Description: 动态表单类型的工作流提交审批
     * @param inputObject
     * @param outputObject
     * @throws Exception    参数
     * @return void    返回类型
     * @throws
     */
    @Override
    @ActivitiAndBaseTransaction(value = {"activitiTransactionManager", "transactionManager"})
    public void insertDSFormProcess(InputObject inputObject, OutputObject outputObject) throws Exception {
        Map<String, Object> map = inputObject.getParams();
        Map<String, Object> user = inputObject.getLogParams();
        String str = map.get("jsonStr").toString();//前端传来的数据json串
        if(ToolUtil.isBlank(str)){//如果数据为空
            outputObject.setreturnMessage("数据不能为空.");
        }else{
            try{
                List<Map<String, Object>> beans = new ArrayList<Map<String,Object>>();
                List<Map<String, Object>> jsonArray = new ArrayList<>();
                Map<String, Map<String, Object>> jOb = JSONUtil.toBean(str, null);
                //遍历数据存入JSONArray集合
                for(String key : jOb.keySet()){
                    jsonArray.add(jOb.get(key));
                }
                String sequenceId = ToolUtil.getSurFaceId();
                String userId = user.get("id").toString();
                String pageId = "";
                for (Map<String, Object> item : jsonArray) {
                    String pageContentId = item.get("rowId").toString();
                    String value = item.containsKey("value") == true ? item.get("value").toString() : "";
                    String text = item.containsKey("text") == true ? item.get("text").toString() : "";
                    Map<String, Object> m = dsFormPageService.getDsFormPageData(pageContentId, value, text, item.get("showType").toString(), sequenceId, userId);
                    pageId = m.get("pageId").toString();
                    beans.add(m);
                }
                activitiModelService.editActivitiModelToStartProcessByMap(map, user, sequenceId);
                if("0".equals(map.get("code").toString())){//启动流程成功
                    dsFormPageDataDao.insertDsFormPageData(beans);//插入DsFormPageData表
                    Map<String, Object> entity = dsFormPageService.getDsFormPageSequence(userId, pageId, map.get("message").toString(), StringUtils.EMPTY);
                    entity.put("sequenceId", sequenceId);
                    dsFormPageSequenceDao.insertDsFormPageSequence(Arrays.asList(entity));
                }else{
                    outputObject.setreturnMessage(map.get("message").toString());
                }
            }catch(Exception e){
                outputObject.setreturnMessage("任务发起失败.");
            }
        }
    }

    /**
     *
     * @Title: editDsFormContentToRevokeByProcessInstanceId
     * @Description: 动态表单类型的工作流进行撤销操作
     * @param inputObject
     * @param outputObject
     * @throws Exception    参数
     * @return void    返回类型
     * @throws
     */
    @Override
    public void editDsFormContentToRevokeByProcessInstanceId(InputObject inputObject, OutputObject outputObject) throws Exception {
        Map<String, Object> map = inputObject.getParams();
        Map<String, Object> user = inputObject.getLogParams();
        map.put("userId", user.get("id"));
        activitiService.editDsFormContentToRevokeByProcessInstanceId(map);
        if("0".equals(map.get("code").toString())){//成功
            //修改表状态
            actUserProcessInstanceIdDao.editDsFormStateIsDraftByProcessInstanceId(map);
        }else{
            outputObject.setreturnMessage(map.get("message").toString());
        }
    }

}
