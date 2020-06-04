// import router from '../router'
import Vue from 'vue'
import axios from 'axios'
import qs from 'qs'
// import { loadingInstance } from '../config/commentData';
import Storager from "../utils/storage"
import Cookier from "../utils/cookier"
// export const loadingInstance = Loading.service({ fullscreen: true });

// 响应时间
axios.defaults.timeout = 5 * 1000

// 配置cookie
axios.defaults.withCredentials = true

// 静态资源
Vue.prototype.$static = "../assets"

// 配置接口地址
axios.defaults.baseURL = 'http://127.0.0.1:8002/api/v1/';

// 添加请求拦截器
axios.interceptors.request.use(
    config => {

        var isAuth = Storager.isAuth();
        var token = Storager.get('token');
        if (isAuth) {
            config.headers["Authorization"] = 'Token ' + token;
        }

        // Loading.service({ fullscreen: true });
        if (config.method === 'post' || config.method === 'delete' || config.method === 'put') {
            config.data = qs.stringify(config.data);

            config.headers["Content-Type"] = "application/x-www-form-urlencoded;"
            config.headers["Accept"] = "application/json;"
            config.headers["X-CSRFToken"] = Cookier.get("csrftoken");


        }

        if (config.needAuth) {
            if (!isAuth) {
                // router.replace({
                //     path: '/login',
                //     query: { redirect: router.currentRoute.fullPath }
                // })
                alert("请先登录！");
            }
        }
        return config
    },

    err => {
        console.log(err);
        // Loading.service({ fullscreen: true }).close();
        // MessageBox.alert("处理失败");
        return Promise.reject(err);
    }

)

// 添加响应拦截器
axios.interceptors.response.use(
    res => {
        // Loading.service({ fullscreen: true }).close();
        if (res.status === 200 || res.status === 201 || res.status === 204) {
            if (res.data.code === 404) {
                // MessageBox.alert("请求地址错误");
                return Promise.reject(res);
            } else if (res.data.code === 401) {
                // MessageBox.alert("请登陆后操作");
                // router.replace({
                //     path: '/login',
                //     query: { redirect: router.currentRoute.fullPath }
                // })
                alert("请先登录！");
            }

            return Promise.resolve(res);
        } else {
            if (res.status === 500) {
                // MessageBox.alert("服务其有点忙,稍后再试");
                return Promise.reject(res);
            }
            // MessageBox.alert("处理失败");
            return Promise.reject(res);
        }
    },
    err => {
        if (err.status === 500) {
            // MessageBox.alert("服务其有点忙,稍后再试");
            return
        }
        // Loading.service({ fullscreen: true }).close();
        // MessageBox.alert("处理失败");
        return Promise.reject(err)
    }

)

// 发送请求

export function post(url, params = {}, needAuth = true) {
    return new Promise((resolve, reject) => {
        axios
            .post(url, params, { needAuth: needAuth })
            .then(
                res => {
                    resolve(res.data)
                },
                err => {
                    reject(err.data)
                }
            )
            .catch(err => {
                reject(err.data)
            })
    })

}

export function get(url, params = {}, needAuth = true) {
    return new Promise((resolve, reject) => {
        axios
            .get(url, { params: params, needAuth: needAuth })
            .then(
                res => {
                    resolve(res.data);
                },
                err => {
                    reject(err.data);
                }
            )
            .catch(
                err => {
                    reject(err.data);
                }
            )
    })
}


export function put(url, params = NaN, needAuth = true) {
    return new Promise((resolve, reject) => {
        axios
            .put(url, params, needAuth)
            .then(
                res => {
                    resolve(res.data)
                },
                err => {
                    reject(err.data)
                }
            )
            .catch(err => {
                reject(err.data)
            })
    })

}

export function remove(url, params = NaN, needAuth = true) {
    return new Promise((resolve, reject) => {
        axios.delete(url, {
            params: params
        }, needAuth).then(res => {
            resolve(res.data);
        }).catch(err => {
            reject(err.data);
        })
    })
}

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// const generalRequest = (method, url, data, successCallback, requestOpt) => request(Object.assign({
//     method: method,
//     url: url,
//     data: data,
//     success: successCallback,
// }, requestOpt));



// const get = (url, data, successCallback, requestOpt) => generalRequest('GET', url, data, successCallback, requestOpt);
// const post = (url, data, successCallback, requestOpt) => generalRequest('POST', url, data, successCallback, requestOpt);
// const put = (url, data, successCallback, requestOpt) => generalRequest('PUT', url, data, successCallback, requestOpt);
// const rdelete = (url, data, successCallback, requestOpt) => generalRequest('DELETE', url, data, successCallback, requestOpt);
