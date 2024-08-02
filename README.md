#  :tw-1f308:  skyeye

> 智能制造一体化，采用Springboot + winUI的低代码平台开发模式。包含30多个应用模块、50多种电子流程，CRM、PM、ERP、MES、ADM、EHR、笔记、知识库、项目、门店、商城、财务、多班次考勤、薪资、招聘、云售后、论坛、公告、问卷、报表设计、工作流、日程、云盘等全面管理，实现智能制造行业一体化管理。实现管理流程“客户关系->
线上/线下报价->销售报价->销售合同->生产计划->商品设计->采购->加工制造->入库->发货->售后服务”的高效运作，同时实现企业员工的管理以及内部运作的流程操作，完善了员工从“入职->培训->转正->办公->离职”等多项功能。

**郑重声明：** 

**1. 企业版源代码不会做二次收费。**

**2. Skyeye云之后不做商业版内容，全部【源代码】针对 {星球用户} 开放**

**3. 如果您有【需求】需要定制开发，请加下方的微信**

**为什么推荐使用本项目？**

① 个人与企业可 100% 免费使用，不用保留类作者、Copyright 信息。

② 代码全部开放，让你可以了解整个项目的架构设计。


## 🐶 企业版

> Skyeye云所有功能模块`源代码`已在知识星球发布

> 企业版既是商业版，所有代码均在`星球`获取。拿到源码后可进行学习、毕设、企业等途径使用。

> [企业版开发文档](https://articles.zsxq.com/id_xi3xhacte72g.html)


## 🐶 沟通交流

| |   知识星球   |   作者微信   |
|:---------------------:|:---------------------:|:--------------------------------:|
| 微信扫码 | ![](images/mindMap/知识星球.png) |    ![](images/mindMap/chatgpt的微信.jpg)    |

## 项目框架介绍

### 环境依赖

| 依赖 | 版本 | 端口 |
|:---------------------:|:---------------------:|:---------------------:|
| Java | 1.8 | 无 |
| rocket MQ | 4.9.2 | 9876 |
| Redis | 5.0 / 6.0 | 6379 |
| nacos | 1.4.3 | 9000 |
| MySQL | 5.6(如果需要5.7或更高版本，[点我配置](https://blog.csdn.net/qq_42175986/article/details/82384160)) | 3308 |

### 微服务项目

> 介绍整体微服务的目录结构以及端口的占用情况。

| 工程 | 端口 | 介绍 | jar包名称 |
|:---------------------:|:---------------------:|:---------------------:|:---------------------:|
| - | - | 后台微服务公共配置项 |
|skyeye-web |8080 | **前端工程**  |web.jar |
|skyeye-promote |8081 | **基础工程** (包含用户、组织、权限、API、消息队列、Skyeye系列的服务注册等基础服务)， **优先启动该工程** 。 |skyeye-web.jar |
|skyeye-shop |8082 |商城 |shop-web.jar |
|skyeye-flowable |8083 |工作流 |flowable-web.jar |
|skyeye-report |8085 |报表设计器 |report-web.jar |
|xxl-job-2.3.0 |8200 |定时任务 |xxl-job-admin-2.3.0.jar |
|skyeye-school |8084 |学校模块 |school-web.jar |
|skyeye-survey |8086 |问卷模块 |survey-web.jar |
|skyeye-note |8087 |笔记模块 |note-web.jar |
|skyeye-rmprogram |8089 |小程序设计器模块 |rmprogram-web.jar |
|skyeye-knowlg |8090 |知识库模块 |knowlg-web.jar |
|skyeye-disk-cloud |8092 |云盘模块 |disk-cloud-web.jar |
|skyeye-business-flow |8094 |业务流程模块 |business-flow-web.jar |
|skyeye-notice |8096 |公告模块 |notice-web.jar |
|skyeye-forum |8097 |论坛模块 |forum-web.jar |
|skyeye-jobdiary |8098 |工作日报模块 |jobdiary-web.jar |
|skyeye-light-app |8099 |轻应用模块 |light-app-web.jar |
|skyeye-ehr |8100 |EHR模块 |ehr-web.jar |
|skyeye-wages |8101 |薪资模块 |wages-web.jar |
|skyeye-deploy |8010 |部署模块 |deploy-web.war |
|skyeye-mail |8091 |通讯录模块 |mail-web.jar |
|skyeye-email |8093 |邮件模块 |email-web.jar |
|skyeye-schedule |8095 |日程模块 |schedule-web.jar |
|skyeye-adm |8103 |行政模块 |adm-web.jar |
|skyeye-boss |8104 |招聘模块 |boss-web.jar |
|skyeye-checkwork |8105 |考勤模块 |checkwork-web.jar |
|skyeye-crm |8102 |客户管理模块 |crm-web.jar |
|skyeye-ifs |8107 |财务模块 |ifs-web.jar |
|skyeye-project |8109 |PM项目管理模块 |project-web.jar |
|skyeye-erp |8106 |ERP+生产模块 |erp-web.jar |
|skyeye-seal-service |8108 |售后服务模块 |seal-service-web.jar |

## 系统功能结构图

> 功能结构图内容较多，加载可能会有点慢，请耐心等待。

![输入图片说明](images/mindMap/out_www.yalijuda.com_%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20240730093239_Ee37d6NUHo.png)

##  :tw-1f31e:  架构介绍

![输入图片说明](images/mindMap/image11.png)

###  :jack_o_lantern:  技术选型

#### 后端技术:

| 框架 | 说明 | 版本 | 学习指南 |
|---|---|---|---|
| [Spring Cloud Alibaba](https://github.com/alibaba/spring-cloud-alibaba)    | 微服务框架  | 2.1.0.RELEASE  | [文档](https://github.com/YunaiV/SpringBoot-Labs) |
| [Nacos](https://nacos.io/)   | 配置中心 & 注册中心  | 1.4.3  | [文档](https://nacos.io/docs/v1/what-is-nacos/)   |
| [RocketMQ](https://rocketmq.apache.org/zh/)  | 消息队列 | 4.0.0 | [文档](https://rocketmq.apache.org/zh/docs/4.x/)             |
| [Sentinel](https://github.com/alibaba/sentinel)  | 服务保障| 2.1.0.RELEASE  | [文档](https://zhuanlan.zhihu.com/p/681044230)             |
| [XXL Job](https://github.com/xuxueli/xxl-job) | 定时任务 | 2.3.0 | [文档](https://www.xuxueli.com/xxl-job/#google_vignette) |
| [Spring Cloud Zuul](https://cloud.spring.io/spring-cloud-netflix/multi/multi__router_and_filter_zuul.html)                | 服务网关             | 3.4.1       | [文档](https://www.jianshu.com/p/cf748031a08d) |
| [MySQL](https://www.mysql.com/cn/)                                                          | 数据库服务器           | 5.7 / 8.0+  |                                                                     |
| [Druid](https://github.com/alibaba/druid)                                                   | JDBC 连接池、监控组件    | 1.2.23      | [文档](https://zhuanlan.zhihu.com/p/555116830)      |
| [MyBatis Plus](https://baomidou.com/)                                                    | MyBatis 增强工具包    | 3.5.7       | [文档](https://baomidou.com/introduce/)              |
| [Redis](https://redis.io/)                                                                  | key-value 数据库    | 5.0 / 6.0   |                                                                     |
| [Flowable](https://github.com/flowable/flowable-engine)                                     | 工作流引擎            | 6.8.0       | [文档](https://doc.iocoder.cn/bpm/)                                   |
| [Spring Boot Admin](https://github.com/codecentric/spring-boot-admin)                       | Spring Boot 监控平台 | 2.0.3      | [文档](https://blog.51cto.com/u_15916106/7063036)                |
| [hutool](https://www.hutool.cn/)                                                         | 一个小而全的Java工具类库    | 5.5.4 | [文档](https://doc.hutool.cn/pages/index/)            |
| [Lombok](https://projectlombok.org/)                                                        | 消除冗长的 Java 代码    | 1.16.22     | [文档](https://zhuanlan.zhihu.com/p/32779910)               |
| [JUnit](https://junit.org/junit5/)                                                          | Java 单元测试框架      | 4.12       | -                                                                   |

#### 前端技术：

| 框架 | 技术 | 版本 | 学习指南 |
|---|---|---|---|
|[layui](https://layui.uimaker.com/)|模块化前端UI| 2.6.7 | [文档](https://layui.uimaker.com/doc/index.html) |
|winui|win10风格UI|自研|-|
|[uni-app](https://uniapp.dcloud.net.cn/)|一个使用Vue.js开发所有前端应用的框架，开发者编写一套代码，可发布到iOS、Android、Web（响应式）、以及各种小程序、快应用等多个平台。| VUE3 |[文档](https://uniapp.dcloud.net.cn/component/)|

##  :tw-1f30f:  PC端效果图

|功能| 效果图 | 效果图 | 效果图 |
|----|-------|-----|------|
|组件管理|![输入图片说明](images/show/base/20240802001image.png)|![输入图片说明](images/show/base/2024080202image.png)||
|布局/操作/属性管理|![输入图片说明](images/show/base/2024080203image.png)|![输入图片说明](images/show/base/2024080204image.png)|![输入图片说明](images/show/base/20240802005image.png)|
|菜单/角色/编码管理|![输入图片说明](images/show/base/20240802010image.png)|![输入图片说明](images/show/base/20240802011image.png)|![输入图片说明](images/show/base/20240802012image.png)|

| 效果图                                    | 效果图                                |
|----------------------------------------|------------------------------------|
| ![](images/show/tradition/show001.png) | ![](images/show/win10/show001.png) |
| ![](images/show/tradition/show002.png) | ![](images/show/win10/show002.png) |
| ![](images/show/tradition/show003.png) | ![](images/show/win10/show003.png) |
| ![](images/show/tradition/show004.png) | ![](images/show/win10/show004.png) |
| ![](images/show/tradition/show005.png) | ![](images/show/win10/show005.png) |
| ![](images/show/tradition/show006.png) | ![](images/show/win10/show006.png) |
| ![](images/show/tradition/show007.png) | ![](images/show/win10/show007.png) |
| ![](images/show/tradition/show008.png) | ![](images/show/win10/show008.png) |
| ![](images/show/tradition/show009.png) | ![](images/show/win10/show009.png) |
| ![](images/show/tradition/show010.png) | ![](images/show/win10/show010.png) |

##  :tw-1f30f:  手机端效果图

### 基础模块
| 效果图  | 效果图  | 效果图  | 效果图  |
|--------|-------|-------|-------|
|![输入图片说明](images/show/phone/20240730image.png)|![输入图片说明](images/show/phone/2024073002image.png)|![输入图片说明](images/show/phone/2024073003image.png)|![输入图片说明](images/show/phone/2024073004image.png)|

### ERP

| 效果图  | 效果图  | 效果图  | 效果图  |
|--------|-------|-------|-------|
|![输入图片说明](images/show/phone/2024073005image.png)|![输入图片说明](images/show/phone/2024073006image.png)|![输入图片说明](images/show/phone/2024073007image.png)|![输入图片说明](images/show/phone/2024073008image.png)|

### CRM

| 效果图  | 效果图  | 效果图  | 效果图  |
|--------|-------|-------|-------|
|![输入图片说明](images/show/phone/2024073012image.png)|![输入图片说明](images/show/phone/2024073009image.png)|![输入图片说明](images/show/phone/2024073010image.png)|![输入图片说明](images/show/phone/2024073011image.png)|

### OA

| 效果图  | 效果图  | 效果图  | 效果图  |
|--------|-------|-------|-------|
|![输入图片说明](images/show/phone/2024073013image.png)|![输入图片说明](images/show/phone/2024073014image.png)|![输入图片说明](images/show/phone/2024073015image.png)|![输入图片说明](images/show/phone/2024073016image.png)|
