import request from '../utils/request'

export const getDetailInfo = () => {
    return request.get('/user/message')
}