/*******************************************************************************
 * Copyright 卫志强 QQ：598748873@qq.com Inc. All rights reserved. 开源地址：https://gitee.com/doc_wei01/skyeye
 ******************************************************************************/

package com.skyeye.service.impl;

import cn.hutool.json.JSONUtil;
import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import com.skyeye.common.object.InputObject;
import com.skyeye.common.object.OutputObject;
import com.skyeye.common.util.DateUtil;
import com.skyeye.common.util.ToolUtil;
import com.skyeye.dao.SealSeServiceFaultTypeDao;
import com.skyeye.jedis.JedisClientService;
import com.skyeye.common.constans.SealServiceConstants;
import com.skyeye.service.SealSeServiceFaultTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

/**
 * 
 * @ClassName: SealSeServiceFaultTypeServiceImpl
 * @Description: 售后服务故障类型管理服务类
 * @author: skyeye云系列--卫志强
 * @date: 2021/8/7 12:01
 *   
 * @Copyright: 2021 https://gitee.com/doc_wei01/skyeye Inc. All rights reserved.
 * 注意：本内容仅限购买后使用.禁止私自外泄以及用于其他的商业目的
 */
@Service
public class SealSeServiceFaultTypeServiceImpl implements SealSeServiceFaultTypeService {

    @Autowired
    private SealSeServiceFaultTypeDao sealSeServiceFaultTypeDao;

    @Autowired
    private JedisClientService jedisClient;

    /**
     *
     * @Title: insertSealSeServiceFaultType
     * @Description: 添加售后服务故障类型表信息
     * @param inputObject
     * @param outputObject
     * @throws Exception
     */
    @Override
    @Transactional(value="transactionManager")
    public void insertSealSeServiceFaultType(InputObject inputObject, OutputObject outputObject) throws Exception {
        Map<String, Object> map = inputObject.getParams();
        Map<String, Object> item = sealSeServiceFaultTypeDao.querySealSeServiceFaultTypeByName(map);
        if (item == null || item.isEmpty()){
            Map<String, Object> user = inputObject.getLogParams();
            map.put("id", ToolUtil.getSurFaceId());
            map.put("state", 1);
            map.put("createId", user.get("id"));
            map.put("createTime", DateUtil.getTimeAndToString());
            sealSeServiceFaultTypeDao.insertSealSeServiceFaultType(map);
        }else {
            outputObject.setreturnMessage("类型名称已存在！");
        }
    }

    /**
     *
     * @Title: querySealSeServiceFaultTypeList
     * @Description: 获取表中所有售后服务故障类型表状态为未被删除的记录并分页
     * @param inputObject
     * @param outputObject
     * @throws Exception
     */
    @Override
    public void querySealSeServiceFaultTypeList(InputObject inputObject, OutputObject outputObject) throws Exception {
        Map<String, Object> map = inputObject.getParams();
        Page pages = PageHelper.startPage(Integer.parseInt(map.get("page").toString()), Integer.parseInt(map.get("limit").toString()));
        List<Map<String, Object>> beans = sealSeServiceFaultTypeDao.querySealSeServiceFaultTypeList(map);
        outputObject.setBeans(beans);
        outputObject.settotal(pages.getTotal());
    }

    /**
     *
     * @Title: queryStateUpList
     * @Description: 获取售后服务故障类型表状态为上线的所有记录
     * @param inputObject
     * @param outputObject
     * @throws Exception
     */
    @SuppressWarnings("unchecked")
	@Override
    public void queryStateUpList(InputObject inputObject, OutputObject outputObject) throws Exception {
        Map<String, Object> map = inputObject.getParams();
        List<Map<String, Object>> beans = null;
        if (ToolUtil.isBlank(jedisClient.get(SealServiceConstants.sysSealSeServiceFaultTypeUpStateList()))){
            beans = sealSeServiceFaultTypeDao.queryStateUpList(map);
            jedisClient.set(SealServiceConstants.sysSealSeServiceFaultTypeUpStateList(), JSONUtil.toJsonStr(beans));
        }else {
            beans = JSONUtil.toList(jedisClient.get(SealServiceConstants.sysSealSeServiceFaultTypeUpStateList()), null);
        }
        outputObject.setBeans(beans);
        outputObject.settotal(beans.size());
    }

    /**
     *
     * @Title: querySealSeServiceFaultTypeMationById
     * @Description: 通过售后服务故障类型表id查询id和name
     * @param inputObject
     * @param outputObject
     * @throws Exception
     */
    @Override
    public void querySealSeServiceFaultTypeMationById(InputObject inputObject, OutputObject outputObject) throws Exception {
        Map<String, Object> map = inputObject.getParams();
        Map<String, Object> bean= sealSeServiceFaultTypeDao.querySealSeServiceFaultTypeMationById(map);
        outputObject.setBean(bean);
        outputObject.settotal(1);
    }

    /**
     *
     * @Title: editSealSeServiceFaultTypeById
     * @Description: 编辑售后服务故障类型表名称
     * @param inputObject
     * @param outputObject
     * @throws Exception
     */
    @Override
    @Transactional(value="transactionManager")
    public void editSealSeServiceFaultTypeById(InputObject inputObject, OutputObject outputObject) throws Exception {
        Map<String, Object> map = inputObject.getParams();
        Map<String, Object> bean= sealSeServiceFaultTypeDao.queryStateById(map);
        if(bean.get("state").toString().equals("1") || bean.get("state").toString().equals("3")){//新建和下线状态可以编辑
            //获取名称相同但id不同的售后服务故障类型表记录
            Map<String, Object> item = sealSeServiceFaultTypeDao.querySealSeServiceFaultTypeByIdAndName(map);
            if (item == null || item.isEmpty()){
                sealSeServiceFaultTypeDao.editSealSeServiceFaultTypeById(map);
            }else{
                outputObject.setreturnMessage("类型名称已存在！");
            }
        }else{
            outputObject.setreturnMessage("该数据状态已改变，请刷新页面。");
        }
    }

    /**
     *
     * @Title: editStateUpById
     * @Description: 编辑售后服务故障类型表状态为上线
     * @param inputObject
     * @param outputObject
     * @throws Exception
     */
    @Override
    @Transactional(value="transactionManager")
    public void editStateUpById(InputObject inputObject, OutputObject outputObject) throws Exception {
        Map<String, Object> map = inputObject.getParams();
        Map<String, Object> bean= sealSeServiceFaultTypeDao.queryStateById(map);
        if(bean.get("state").toString().equals("1") || bean.get("state").toString().equals("3")){//新建和下线状态可以上线
            sealSeServiceFaultTypeDao.editStateUpById(map);
            jedisClient.del(SealServiceConstants.sysSealSeServiceFaultTypeUpStateList());
        }else{
            outputObject.setreturnMessage("该数据状态已改变，请刷新页面。");
        }
    }

    /**
     *
     * @Title: editStateDownById
     * @Description: 编辑售后服务故障类型表状态为下线
     * @param inputObject
     * @param outputObject
     * @throws Exception
     */
    @Override
    @Transactional(value="transactionManager")
    public void editStateDownById(InputObject inputObject, OutputObject outputObject) throws Exception {
        Map<String, Object> map = inputObject.getParams();
        Map<String, Object> bean= sealSeServiceFaultTypeDao.queryStateById(map);
        if(bean.get("state").toString().equals("2")){//上线状态可以下线
            sealSeServiceFaultTypeDao.editStateDownById(map);
            jedisClient.del(SealServiceConstants.sysSealSeServiceFaultTypeUpStateList());
        }else{
            outputObject.setreturnMessage("该数据状态已改变，请刷新页面。");
        }
    }

    /**
     *
     * @Title: deleteSealSeServiceFaultTypeById
     * @Description: 编辑售后服务故障类型表状态为删除
     * @param inputObject
     * @param outputObject
     * @throws Exception
     */
    @Override
    @Transactional(value="transactionManager")
    public void deleteSealSeServiceFaultTypeById(InputObject inputObject, OutputObject outputObject) throws Exception {
        Map<String, Object> map = inputObject.getParams();
        Map<String, Object> bean= sealSeServiceFaultTypeDao.queryStateById(map);
        if(bean.get("state").toString().equals("1") || bean.get("state").toString().equals("3")){//新建和下线状态可以删除
            sealSeServiceFaultTypeDao.deleteSealSeServiceFaultTypeById(map);
        }else{
            outputObject.setreturnMessage("该数据状态已改变，请刷新页面。");
        }
    }
}
