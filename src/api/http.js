'use strict'

import axios from 'axios'
// import qs from 'qs'
// import {Message,Spin} from "iview"
// import Util from '../libs/util';


//var gLoading = null;
//var token = sessionStorage.zj_token?sessionStorage.zj_token:'jq';

axios.interceptors.request.use(config => { 
    return config
}, error => {
    return Promise.reject(error)
})

axios.interceptors.response.use(response => {
    return response
}, error => {
    return Promise.resolve(error.response)
})

//let cryKey = Util.fillKey(Md5("tangni"));
//console.log(cryKey)
//返回状态判断
function checkStatus(response) {
    // loading
    // 如果http状态码正常，则直接返回数据
    if (response && (response.status === 200 || response.status === 304 || response.status === 400 || response.status === 600)) {
        return response.data
        // 如果不需要除了data之外的数据，可以直接 return response.data
    }
    // 异常状态下，把错误信息返回去
    return {
        status: -404,
        msg: '网络异常'
    }
}

function checkCode(res , loadingFlag) {
    // 如果code异常(这里已经包括网络错误，服务器错误，后端抛出的错误)，可以弹出一个错误提示，告诉用户
    if(loadingFlag){
        Spin.hide();
    }
    //|| res.status != 1
    if ((res && res.status === -404) ||  res == null ){
        // Message.error('网络异常');
        return false;
    }
    //根据自己的接口文档设计
    //console.log(!res.data.success);
    //console.log(JSON.stringify(res))
    if (res && res.status && (res.status != 1)) {
        let msg = res.errMsg ? res.errMsg : res.message ? res.message : '网络异常';
        // console.log(msg)
        // Message.error(msg)
    }
    return res
    
}

export default {
    post (url, data, loading) {
        if(loading){
            // Spin.show();
        }

        // let key = window.key;
        // let version = window.version;
        // let timer = Util.getHeaderTime();
        // let token = Util.getToken(url,key,version,timer);  //url.indexOf('Zselect') > -1 ? 'zzz' : 
        // let storeId = localStorage.sjStoreId?localStorage.sjStoreId:'';
        // let userId = callName == 'member.viewAll' ? '' : localStorage.sjUserId?localStorage.sjUserId:'';
        // if(data.userId) userId = data.userId
        // //console.log(data.userId)
        // //console.log(Util.getHeaderTime())
        // data = Object.assign(data,{'storeId':storeId,'userId':userId,'callName':callName});
        // if(flag){
        //     data = JSON.stringify(data)
        //     data = Util.encrypt(data);   
        // }

        //console.log(data)

        return axios({
            method: 'post',
            url,
            data: data,
            timeout: 10000,
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'Content-Type': 'application/json',
                // 'version':version,
                // 'timer':timer,
                // 'token':token 
            }
        }).then(
            (response) => {
                return checkStatus(response,loading)
            }
        ).then(
            (res) => {
                return checkCode(res,loading)
            }
        )
    },
    get (url, params, callName ,loading) {
        //alert('last')
        if(loading){
            Spin.show();
        }
        return axios({
          method: 'get',
          url,
          params, // get 请求时带的参数
          timeout: 10000,
          headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/x-www-form-urlencoded',
          }
        }).then(
          (response) => {
            return checkStatus(response)
          }
        ).then(
          (res) => {
            return checkCode(res)
          }
        )
    }
}