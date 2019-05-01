<template>
    <div class="wrap">
        <div class="crumbs">
            <el-breadcrumb separator=">">
                <el-breadcrumb-item :to="{ path: '/' }">主页</el-breadcrumb-item>
                <el-breadcrumb-item>权限管理</el-breadcrumb-item>
                <el-breadcrumb-item>角色管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <el-form :inline="true" :model="searchForm" class="search-form">
				<el-form-item>
					<el-select v-model="searchForm.status" placeholder="状态">
						<el-option label="选项" value="1"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item>
					<el-input placeholder="角色" />
				</el-form-item>
				<el-form-item class="btn-item">
					<el-button type="primary" @click="onSubmit">查询</el-button>
					<el-button type="primary" @click="modal(0)">新建</el-button>
				</el-form-item>
			</el-form>
			<el-table :data="tableData" stripe class="list-table">
				<el-table-column type="selection" width="55"></el-table-column>
				<el-table-column prop="name" label="状态" width="200">
					<template>
						<el-switch
							v-model="checkvalue"
							active-color="#55ad71"
							inactive-color="#d2d2d2">
						</el-switch>
					</template>
				</el-table-column>
				<el-table-column prop="name" label="名称"></el-table-column>
				<el-table-column prop="name" label="操作" width="200">
					<template slot-scope="scope">
						<el-button type="text" size="small" @click="modal(scope.id)"><i class="iconfont icon-edit"></i> 修改</el-button>
					</template>
				</el-table-column>
			</el-table>
			<el-pagination
				@size-change="getList"
				@current-change="getList"
				:current-page="currentPage"
				:page-sizes="[100, 200, 300, 400]"
				:page-size="100"
				layout="total, sizes, prev, pager, next, jumper"
				:total="400">
			</el-pagination>
        </div>
		<el-dialog
			:title="dialogTitle"
			:visible.sync="dialogVisible"
			width="600px"
			:before-close="closeModal"
		>
			<el-form :model="modalForm" class="modal-form" label-width="100px">
                <el-form-item label="角色名称">
                    <el-input v-model="modalForm.name" placeholder="请输入角色名称" style="width: 400px" />
                </el-form-item>
                <el-form-item label="权限">
                    <div class="role-list">
                        <p>
                            <span class="role-name">角色管理</span>
                            <el-checkbox-group v-model="checkList1">
                                <el-checkbox label="新建"></el-checkbox>
                                <el-checkbox label="修改"></el-checkbox>
                                <el-checkbox label="查询"></el-checkbox>
                            </el-checkbox-group>
                        </p>
                        <p>
                            <span class="role-name">账号管理</span>
                            <el-checkbox-group v-model="checkList2">
                                <el-checkbox label="新建"></el-checkbox>
                                <el-checkbox label="修改"></el-checkbox>
                                <el-checkbox label="查询"></el-checkbox>
                            </el-checkbox-group>
                        </p>
                        <p>
                            <span class="role-name">商品管理</span>
                            <el-checkbox-group v-model="checkList3">
                                <el-checkbox label="新建"></el-checkbox>
                                <el-checkbox label="修改"></el-checkbox>
                                <el-checkbox label="查询"></el-checkbox>
                            </el-checkbox-group>
                        </p>
                    </div>
                </el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="closeModal">取 消</el-button>
				<el-button type="primary" @click="queryModal">确 定</el-button>
			</div>
		</el-dialog>
    </div>
</template>

<script>
    export default {
        name: 'role',
        data() {
            return {
				searchForm: {},
				tableData: [{}, {}, {}, {}],

				currentPage: 1,
				checkvalue: '',

				flag: 0,
				modalForm: {},
				dialogVisible: false,
                dialogTitle: '',
                
                checkList1: [],
                checkList2: [],
                checkList3: [],
            }
        },
        methods: {
            onSubmit(){

			},
			getList(){

			},
			modal(flag){
				this.flag = flag
				this.dialogTitle = flag == 0 ? '新建角色' : '修改角色'
				this.dialogVisible = true
			},
			closeModal(){
				this.dialogVisible = false
			},
			queryModal(){
				console.log('确定')
				this.dialogVisible = false
			}
        }
    }

</script>

<style lang="scss">
.role-list {
    padding-left: 20px;
    p {
        padding-bottom: 15px;
    }
    .role-name {
        display: inline-block;
        width: 120px;
    }
    .el-checkbox-group {
        display: inline-block;
    }
}

</style>

