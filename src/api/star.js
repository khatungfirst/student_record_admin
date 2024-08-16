import request from '../utils/request'

//1、获取初始化表格数据   /   分页获取数据 / 搜索
export const initStar = (pageCapacity, page, search) => {
    return request.get('/star/select', {
        params: {
            pageCapacity,
            page,
            search
        }
    })
}


//2、推选
export const elected = (electedArr,role) => {
    return request.post(`/star/elected/${role}`, {
        electedArr
    })
}


//3、发布
export const publicStar = () => {
    return request.post('/star/public/college')
}


//4、查找第几届成长之星 / 初始化成长之星名单
export const termStar = (termNumber) => {
    return request.get('/star/termStar', {
        params:{termNumber}
    })
}

//5、用户是否可推选
export const optional = () => {
    return request.post('/star/change_disabled')
}


