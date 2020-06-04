function get(name) {
    const v = window.document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');

    return v ? v[2] : null;
}


function set(name, value, days) {
    const d = new Date;
    d.setTime(d.getTime() + 24 * 60 * 60 * 1000 * days);
    window.document.cookie = name + '=' + value + ';path=/;expires=' + d.toString();
}

const Cookier = {
    get,
    set,
};

export default Cookier;
