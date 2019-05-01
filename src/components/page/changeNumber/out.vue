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
					<el-input v-model="searchForm.huanhao" placeholder="换号期"></el-input>
				</el-form-item>
				<el-form-item>
					<el-select v-model="searchForm.status" placeholder="状态">
						<el-option label="状态一" value="1"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item>
					<el-input v-model="searchForm.id" placeholder="出库单单号"></el-input>
				</el-form-item>
				<el-form-item>
					<el-input v-model="searchForm.zhongdui" placeholder="中队"></el-input>
				</el-form-item>
				<el-form-item>
					<el-input v-model="searchForm.user" placeholder="收件人"></el-input>
				</el-form-item>
				<el-form-item>
					<el-input v-model="searchForm.address" placeholder="收件人地址"></el-input>
				</el-form-item>
				<el-form-item>
					<el-input v-model="searchForm.tel" placeholder="收件人电话"></el-input>
				</el-form-item>
				<el-form-item>
					<el-input v-model="searchForm.yundanhao" placeholder="运单号"></el-input>
				</el-form-item>
				<el-form-item class="btn-item">
					<el-button type="primary" @click="onSubmit">查询</el-button>
					<el-button type="primary">导出</el-button>
				</el-form-item>
			</el-form>
			<el-table :data="tableData" stripe class="list-table">
				<el-table-column prop="name" label="换号期"></el-table-column>
				<el-table-column prop="name" label="状态"></el-table-column>
				<el-table-column prop="name" label="出库单单号"></el-table-column>
				<el-table-column prop="name" label="中队"></el-table-column>
				<el-table-column prop="name" label="收件人"></el-table-column>
				<el-table-column prop="name" label="收件人地址"></el-table-column>
				<el-table-column prop="name" label="收件人电话"></el-table-column>
				<el-table-column prop="name" label="承运商"></el-table-column>
				<el-table-column prop="name" label="运单号"></el-table-column>
				<el-table-column prop="name" label="生成时间"></el-table-column>
				<el-table-column prop="name" label="物流信息"></el-table-column>
				<el-table-column prop="name" label="操作" width="220">
					<template slot-scope="scope">
						<el-button @click="detail(scope.row)" type="text" size="small"><i class="iconfont icon-view"></i>	查看</el-button>
						<el-button type="text" size="small"><i class="iconfont icon-edit"></i> 修改地址及承运商</el-button>
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
    </div>
</template>

<script>
    export default {
        name: 'user',
        data() {
            return {
				searchForm: {},
				tableData: [{}, {}, {}, {}],

				currentPage: 1
            }
        },
        methods: {
            onSubmit(){

			},
			getList(){
				
			}
        }
    }

</script>

<style lang="scss">

</style>

