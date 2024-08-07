{{#bean}}
	<div class="layui-collapse">
        <div class="layui-colla-item">
            <h2 class="layui-colla-title"></h2>
            <div class="layui-colla-content">

            </div>
        </div>
    </div>
	<div class="layui-form-item layui-col-xs12">
		<span class="hr-title">数据模板</span><hr>
	</div>
    <div class="layui-form-item">
        <label class="layui-form-label">名称<i class="red">*</i></label>
        <div class="layui-input-block">
        	<input type="text" id="name" name="name" win-verify="required" placeholder="请输入名称" class="layui-input" maxlength="20" value="{{name}}"/>
        </div>
    </div>
    <div class="layui-form-item">
        <label class="layui-form-label">脚本<i class="red">*</i></label>
        <div class="layui-input-block">
        	<textarea id="content" name="content">{{content}}</textarea>
        </div>
    </div>
    <div class="layui-form-item">
        <div class="layui-input-block">
            <button class="winui-btn" id="cancle"><language showName="com.skyeye.cancel"></language></button>
            <button class="winui-btn" lay-submit lay-filter="formEditBean"><language showName="com.skyeye.save"></language></button>
        </div>
    </div>
{{/bean}}