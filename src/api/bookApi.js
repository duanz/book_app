import { get, post, remove, put } from '../config/axiosConfig';

// 小说列表
export const getBookList = (data) => get('/book/', data, false);
export const getBookStateList = (data) => get('/book/state/', data, false);


// 小说详情
export const getBookDetail = (book_id) => get('/book/' + book_id + '/', {}, false);
export const getBookChapterList = (book_id, filter) => get('/book/' + book_id + '/chapter/', filter, false);
export const getBookChapterDetail = (chapter_id) => get('/book/chapter/' + chapter_id + '/', {}, false);

// 小说订阅
export const getBookSubscribeList = (data) => get('/book/subscribe/', data, true);
export const createBookSubscribe = (data) => post('/book/subscribe/', data, true);
export const getBookSubscribeDetail = (subs_id) => get('/book/subscribe/' + subs_id + '/', {}, true);
export const updateBookSubscribe = (subs_id, data) => put('/book/subscribe/' + subs_id + '/', data, true);
export const deleteBookSubscribe = (subs_id) => remove('/book/subscribe/' + subs_id + '/', {}, true);