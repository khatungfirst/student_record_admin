//首页的接口
import request from '../utils/request'

//1、获得首页所需要的数据
export const getDesktopInfo = () => {
    return request.post('/user/class/fpage')
}

//2、选择日期后柱状图的数据变化
export const updateHistogramInfo = (date) => {
    return request.post('',{
        form: {
            date
        }
    })
}