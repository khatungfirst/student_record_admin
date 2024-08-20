import request from '../utils/request'

//获得侧边栏的信息
export const initSidebar = () => {
    return request.get('/sidebar/message')
}