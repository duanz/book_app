
import { get, post } from '../config/axiosConfig';
import Storager from "../utils/storage";


const loginapi = (formData) => post('/member/login/', formData, false);
export const register = (data) => post('/member/register/', data, false);
export const user = () => get('/member/info/', {}, true);
export const logoutapi = () => post('/member/logout/', {}, true);







export function login(self, data) {
    loginapi(data).then(res => {
        if (res.code && res.code != "200") {
            self.$store.commit('changeAuth', false);
            alert("登录失败")
        } else {
            self.$store.commit('changeAuth', true);
            Storager.saveUserInfo(res);
            self.$store.commit('setUserinfo', res);
            self.$router.push({ path: self.$data.redirect });
        }
    });
}

export function logout(self) {
    logoutapi().then(res => {
        console.log(res);
        Storager.clear();
        self.$store.commit('changeAuth', false);
        self.$store.commit('setUserinfo', res);
        self.$router.push({ path: "/"});
    })
}

// login: function (context, creds, redirect) {
//     return context.$http.post(api.login, creds).then(response => {
//         let data = response.data.user;
//         localStorage.clear();
//         localStorage.setItem('userName', data.username);
//         localStorage.setItem('userId', data.id);
//         localStorage.setItem('email', data.email);
//         if (redirect) {
//             context.$router.push(redirect);
//         } else {
//             context.$router.push('/hotpage');
//         }
//     }).catch(function (errors) {
//         context.$notify.error({
//             title: ' Login Failed',
//             message: 'Unauthorized ip address or invalid username/password'
//         });
//         console.error(errors);
//     })
// },
// handleError: function (content, res) {
//     var errMs g = "网络错误";
//     localStorage.clear();
//     switch (res.status) {
//         case 401:
//             errMsg = "请登陆";
//             content.$router.push('/login');
//         case 403:
//             errMsg = "请提升权限";
//             content.$router.push('/login');
//         case 504:
//             errMsg = "网络超时";
//         case 500:
//             errMsg = "服务器出小差";
//     }
// }