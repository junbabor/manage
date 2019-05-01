<template>
    <div class="wrap">
        <div class="crumbs">
            <el-breadcrumb separator=">">
                <el-breadcrumb-item :to="{ path: '/' }">主页</el-breadcrumb-item>
                <el-breadcrumb-item>权限管理</el-breadcrumb-item>
                <el-breadcrumb-item>账号管理</el-breadcrumb-item>
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
					<el-select v-model="searchForm.status" placeholder="角色">
						<el-option label="选项" value="1"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item>
					<el-select v-model="searchForm.status" placeholder="总队">
						<el-option label="选项" value="1"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item>
					<el-select v-model="searchForm.status" placeholder="支队">
						<el-option label="选项" value="1"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item>
					<el-select v-model="searchForm.status" placeholder="中队">
						<el-option label="选项" value="1"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item class="btn-item">
					<el-button type="primary" @click="onSubmit">查询</el-button>
					<el-button type="primary" @click="modal(0)">新建</el-button>
					<el-button type="primary" @click="importExcel">导入</el-button>
					<el-button type="primary">导出所选</el-button>
				</el-form-item>
			</el-form>
			<el-table :data="tableData" stripe class="list-table">
				<el-table-column type="selection" width="55"></el-table-column>
				<el-table-column prop="name" label="状态">
					<template>
						<el-switch
							v-model="checkvalue"
							active-color="#55ad71"
							inactive-color="#d2d2d2">
						</el-switch>
					</template>
				</el-table-column>
				<el-table-column prop="name" label="角色"></el-table-column>
				<el-table-column prop="name" label="所属总队"></el-table-column>
				<el-table-column prop="name" label="所属支队"></el-table-column>
				<el-table-column prop="name" label="所属中队"></el-table-column>
				<el-table-column prop="name" label="账号"></el-table-column>
				<el-table-column prop="name" label="寄件人"></el-table-column>
				<el-table-column prop="name" label="寄件人地址"></el-table-column>
				<el-table-column prop="name" label="寄件人电话"></el-table-column>
				<el-table-column prop="name" label="收件人"></el-table-column>
				<el-table-column prop="name" label="收件人地址"></el-table-column>
				<el-table-column prop="name" label="收件人电话"></el-table-column>
				<el-table-column prop="name" label="操作" width="100">
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
			width="1000px"
			:before-close="closeModal"
		>
			<el-form :inline="true" :model="modalForm" class="modal-form" label-width="100px">
				<el-row>
					<el-col :span="12">
						<el-form-item label="账号">
							<el-input v-model="modalForm.name" v-if="flag == 0" />
							<span v-else>admin</span>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="前台密码">
							<el-input type="password" v-model="modalForm.name" />
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="12">
						<el-form-item label="后台密码">
							<el-input type="password" v-model="modalForm.name" />
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="用户角色">
							<el-select v-model="modalForm.name">
								<el-option value="1"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="12">
						<el-form-item label="总队">
							<el-select v-model="modalForm.name">
								<el-option value="1"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="支队">
							<el-select v-model="modalForm.name">
								<el-option value="1"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="12">
						<el-form-item label="中队">
							<el-input type="password" v-model="modalForm.name" />
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="12">
						<el-form-item label="寄件人">
							<el-select v-model="modalForm.name">
								<el-option value="1"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="寄件人地址">
							<el-input v-model="modalForm.name" placeholder="省" style="width: 80px; margin-right: 10px" />
							<el-input v-model="modalForm.name" placeholder="市" style="width: 80px; margin-right: 10px" />
							<el-input v-model="modalForm.name" placeholder="区" style="width: 80px; margin-right: 10px" />
							<el-input v-model="modalForm.name" placeholder="详细地址" style="width: 100px" />
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="12">
						<el-form-item label="寄件人电话">
							<el-input v-model="modalForm.name" maxlength="11" />
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="12">
						<el-form-item label="收件人">
							<el-select v-model="modalForm.name">
								<el-option value="1"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="收件人地址">
							<el-input v-model="modalForm.name" placeholder="省" style="width: 80px; margin-right: 10px" />
							<el-input v-model="modalForm.name" placeholder="市" style="width: 80px; margin-right: 10px" />
							<el-input v-model="modalForm.name" placeholder="区" style="width: 80px; margin-right: 10px" />
							<el-input v-model="modalForm.name" placeholder="详细地址" style="width: 100px" />
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="12">
						<el-form-item label="收件人电话">
							<el-input v-model="modalForm.name" maxlength="11" />
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="closeModal">取 消</el-button>
				<el-button type="primary" @click="queryModal">确 定</el-button>
			</div>
		</el-dialog>

		<el-dialog
			title="批量导入"
			:visible.sync="importVisible"
			width="660px"
			:before-close="closeImport"
		>
			<div class="import">
				<el-upload
					class="upload"
					action="https://jsonplaceholder.typicode.com/posts/"
					:on-change="importChange">
					<el-row>
						<el-col :span="6"><div class="import-tit">选择导入文件</div></el-col>
						<el-col :span="16">
							<el-input >
								<el-button slot="append" class="import-btn" type="primary">浏览</el-button>
							</el-input>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="6"></el-col>
						<el-col :span="16">
							<div class="download-link">
								<a href=""><i class="iconfont icon-download"></i> 下载Excel模板</a>
							</div>
						</el-col>
					</el-row>
				</el-upload>
			</div>
			<div slot="footer" class="dialog-footer">
				<el-button @click="closeImport">取 消</el-button>
				<el-button type="primary" @click="queryModal">确 定</el-button>
			</div>
		</el-dialog>
    </div>
</template>

<script>
    export default {
        name: 'user',
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

				importVisible: false
            }
        },
        methods: {
            onSubmit(){

			},
			getList(){

			},
			modal(flag){
				this.flag = flag
				this.dialogTitle = flag == 0 ? '新建账户' : '修改账户'
				this.dialogVisible = true
			},
			closeModal(){
				this.dialogVisible = false
			},
			queryModal(){
				console.log('确定')
				this.dialogVisible = false
			},
			importExcel(){
				this.importVisible = true
			},
			importChange(){

			},
			closeImport(){
				this.importVisible = false
			}
        }
    }

</script>

<style lang="scss">

</style>

