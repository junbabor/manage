<template>
    <div class="login-wrap">
        <div class="ms-login">
            <div class="login-box">
                <div class="ms-title">消防换号管理系统</div>
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="ms-content">
                    <el-form-item prop="username">
                        <el-input v-model="ruleForm.username">
                            <span slot="prepend">账号</span>
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input type="password" v-model="ruleForm.password" @keyup.enter.native="submitForm('ruleForm')">
                            <span slot="prepend">密码</span>
                        </el-input>
                    </el-form-item>
                    <el-row type="flex" justify="space-between" align="center" class="rember">
                        <el-checkbox v-model="isRember">记住登录状态</el-checkbox>
                        <a href="">忘记密码</a>
                    </el-row>
                    <div class="login-btn">
                        <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
                    </div>
                    <p class="login-tips">Tips : 用户名和密码随便填。</p>
                </el-form>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data: function(){
            return {
                ruleForm: {
                    username: '1',
                    password: '1'
                },
                rules: {
                    username: [
                        { required: true, message: '请输入用户名', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
                    ]
                },
                isRember: false
            }
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        // localStorage.setItem('ms_username',this.ruleForm.username);
                        // this.$router.push('/');
                        this.api.getData( '/xf-base-user/weblogin', {
                            loginName: 1,
                            password: 1
                        }).then((res) => {
                            if( res.code == 0){
                                localStorage.setItem('ms_username',this.ruleForm.username);
                                this.$router.push('/');
                            }
                            //this.tableData = res.data.list;
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            }
        }
    }
</script>

<style lang="scss">
.login-wrap{
    position: relative;
    width:100%;
    height:100%;
    background-color: #fff;
    
    .ms-login{
        position: absolute;
        left:50%;
        top:50%;
        width: 725px;
        height: 800px;
        margin: -400px 0 0 -725px;
        padding-left: 725px;
        border-radius: 10px;
        background: #fff url(../../assets/img/login.jpg) no-repeat left;
        overflow: hidden;
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.6);
    }
    .login-box {
        margin: 0 auto;
        padding-top: 148px;
        width: 470px;
        
    }
    .ms-title{
        margin-bottom: 50px;
        width:100%;
        line-height: 1;
        text-align: center;
        font-size:34px;
        color: #4381fa;
    }
    .el-form-item {
        margin-bottom: 30px;
    }
    .el-form-item__content {
        padding: 20px 0;
        border-bottom: 1px solid #454545;
    }
    .el-input__inner {
        border: none;
        border-radius: 0;
        font-size: 24px;
    }

    .el-input-group__prepend {
        padding: 0;
        background-color: transparent;
        border: none;
        font-size: 24px;
        color: #4a4a4a;
    }
    .el-form-item__error {
        padding-top: 15px;
        font-size: 18px;
    }

    .ms-content{
        padding: 30px 30px;
    }
    .login-btn{
        text-align: center;
    }
    .login-btn button{
        width:100%;
        height:58px;
        font-size: 22px;
        border-radius: 8px;
    }
    .login-tips{
        font-size:12px;
        line-height:30px;
        color:#fff;
    }

    .rember {
        padding-bottom: 65px;
        padding-top: 16px;
        font-size: 18px;
        .el-checkbox {
            font-size: 18px;
            .el-checkbox__label {
                font-size: 18px;
            }
        }
        .el-checkbox__inner {
            width: 18px;
            height: 18px;
        }
        .el-checkbox__inner::after {
            left: 5px;
            width: 4px;
            height: 10px;
        }
        a {
            color: #333;
        }
    }
}
</style>