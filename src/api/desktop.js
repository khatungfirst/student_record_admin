//首页的接口
import request from '../utils/request'

//1、获得首页所需要的数据
export const getDesktopInfo = (role) => {
    return request.post(`/user/fpage/${role}`)
}

//2、选择日期后柱状图的数据变化
export const updateHistogramInfo = (date) => {
    date = JSON.stringify(date)
    return request.get(`/user/fpage/pillar/${date}`, {
        // params: {
        //     date
        // }
    })
}