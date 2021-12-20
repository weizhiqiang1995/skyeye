{{#bean}}
	<div class="layui-form-item layui-col-xs12">
        <label class="layui-form-label">资产名称<i class="red">*</i></label>
        <div class="layui-input-block">
            <input type="text" id="assetName" name="assetName" win-verify="required" placeholder="请输入资产名称" class="layui-input" value="{{assetName}}"/>
            <div class="layui-form-mid layui-word-aux">新增的资产，状态默认为正常。</div>
        </div>
    </div>
    <div class="layui-form-item layui-col-xs12">
        <label class="layui-form-label">图片<i class="red">*</i></label>
        <div class="layui-input-block">
        	<div class="upload" id="assetImg"></div>
        </div>
    </div>
    <div class="layui-form-item layui-col-xs6">
        <label class="layui-form-label">资产类型<i class="red">*</i></label>
        <div class="layui-input-block">
			<select id="typeId" name="typeId" lay-filter="typeId" lay-search="" win-verify="required">
				
			</select>
        </div>
    </div>
    <div class="layui-form-item layui-col-xs6">
        <label class="layui-form-label">资产来源<i class="red">*</i></label>
        <div class="layui-input-block">
			<select id="fromId" name="fromId" lay-filter="fromId" lay-search="" win-verify="required">
				
			</select>
        </div>
    </div>
    <div class="layui-form-item layui-col-xs6">
        <label class="layui-form-label">资产编号<i class="red">*</i></label>
        <div class="layui-input-block">
            <input type="text" id="assetNum" name="assetNum" win-verify="required" placeholder="请输入资产编号" class="layui-input" value="{{assetNum}}"/>
        </div>
    </div>
    <div class="layui-form-item layui-col-xs6">
        <label class="layui-form-label">资产规格</label>
        <div class="layui-input-block">
            <input type="text" id="specifications" name="specifications" placeholder="请输入资产规格" class="layui-input" value="{{specifications}}"/>
        </div>
    </div>
    <div class="layui-form-item layui-col-xs6">
        <label class="layui-form-label">资产单价<i class="red">*</i></label>
        <div class="layui-input-block">
        	<input type="number" id="unitPrice" name="unitPrice" win-verify="required|double" placeholder="请输入资产单价" class="layui-input" value="{{unitPrice}}"/>
        </div>
    </div>
    <div class="layui-form-item layui-col-xs6">
        <label class="layui-form-label">生产商</label>
        <div class="layui-input-block">
            <input type="text" id="manufacturer" name="manufacturer" placeholder="请输入生产商" class="layui-input" value="{{manufacturer}}"/>
        </div>
    </div>
    <div class="layui-form-item layui-col-xs6">
        <label class="layui-form-label">生产日期</label>
        <div class="layui-input-block">
            <input type="text" id="manufacturerTime" name="manufacturerTime" placeholder="请选择生产日期" class="layui-input" value="{{manufacturerTime}}"/>
        </div>
    </div>
    <div class="layui-form-item layui-col-xs6">
        <label class="layui-form-label">供应商</label>
        <div class="layui-input-block">
            <input type="text" id="supplier" name="supplier" placeholder="请输入供应商" class="layui-input" value="{{supplier}}"/>
        </div>
    </div>
    <div class="layui-form-item layui-col-xs6">
        <label class="layui-form-label">采购日期<i class="red">*</i></label>
        <div class="layui-input-block">
        	<input type="text" id="purchaseTime" name="purchaseTime" win-verify="required" placeholder="请选择采购日期" class="layui-input" value="{{purchaseTime}}"/>
        </div>
    </div>
    <div class="layui-form-item layui-col-xs6">
        <label class="layui-form-label">存放区域</label>
        <div class="layui-input-block">
            <input type="text" id="storageArea" name="storageArea" placeholder="请输入存放区域" class="layui-input" value="{{storageArea}}"/>
        </div>
    </div>
    <div class="layui-form-item layui-col-xs6">
        <label class="layui-form-label">领用人</label>
        <div class="layui-input-block">
        	<input type="text" id="employeeId" name="employeeId" placeholder="请选择资产领用人" class="layui-input" value="{{employeeId}}"/>
		    <i class="fa fa-user-plus input-icon" id="employeePeople"></i>
        </div>
    </div>
    <div class="layui-form-item layui-col-xs6">
        <label class="layui-form-label">管理人</label>
        <div class="layui-input-block">
        	<input type="text" id="assetAdmin" name="assetAdmin" placeholder="请选择资产管理人" class="layui-input" value="{{assetAdmin}}"/>
		    <i class="fa fa-user-plus input-icon" id="userNameSelPeople"></i>
        </div>
    </div>
    <div class="layui-form-item layui-col-xs12">
        <label class="layui-form-label">相关描述</label>
        <div class="layui-input-block">
        	<textarea id="roomAddDesc" name="roomAddDesc"  placeholder="请输入相关描述" class="layui-textarea" style="height: 100px;" maxlength="200">{{roomAddDesc}}</textarea>
        </div>
    </div>
    <div class="layui-form-item layui-col-xs12">
        <label class="layui-form-label">相关附件</label>
        <div class="layui-input-block" id="enclosureUpload">
        </div>
    </div>
    <div class="layui-form-item layui-col-xs12">
        <div class="layui-input-block">
            <button class="winui-btn" id="cancle"><language showName="com.skyeye.cancel"></language></button>
            <button class="winui-btn" lay-submit lay-filter="formEditBean"><language showName="com.skyeye.save"></language></button>
        </div>
    </div>
{{/bean}}