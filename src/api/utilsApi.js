import { get, post, remove } from '../config/axiosConfig';

// 任务列表
export const getTaskList = (data) => get('/api/task/', data, true);
// 新增任务表单
export const createTask = (formData) => post('/api/task/', formData, true);

// 任务详情
export const getTaskDetail = (task_id) => get('/api/task/' + task_id + '/', {}, true);
// 删除任务
export const deleteTask = (task_id) => remove('/api/task/' + task_id + '/', {}, true);
// 修改任务表单
export const editTask = (task_id, formData) => post('/api/task/' + task_id + '/', formData, true);
