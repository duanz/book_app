function get(k: string) {
    let v = localStorage.getItem(k);
    if (!v || v == 'undefined') {
        v = '';
    }
    return v;
}

function set(k: string, v: string) {
    localStorage.setItem(k, v);
}
function saveUserInfo(info: any) {
    const token = info.token ? info.token : '';
    set('token', token);
    localStorage.setItem('user', JSON.stringify(info));
}
function getUserInfo() {
    return get('user') ? JSON.parse(get('user')) : {};
}
function clear() {
    console.log('clear all local storage!');
    localStorage.clear()
}
function isAuth() {
    const flag = localStorage.getItem('token') && localStorage.getItem('token') != 'undefined' ? true : false;
    console.log("auth flag: ", flag)
    return flag;
}

const Storager = {
    get,
    set,
    saveUserInfo,
    getUserInfo,
    clear,
    isAuth,
};

export default Storager;
