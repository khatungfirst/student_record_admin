import request from '../utils/request'

//1、获取初始化数据   /   分页获取数据
export const initStar = (pageCapacity) => {
    return request.post('/star/init/class',{
        pageCapacity
    })
}

//2、搜索
export const searchStar = (onePageNumber,search) => {
    return request.post('/select/star/class',{
        onePageNumber,
        search
    })
}


//3、推选
export const elected = (electedArr) => {
    return request.post('/elected/star/class',{
        electedArr
    })
}


//4、发布
export const publicStar = () => {
    return request.post('/public/star/college')
}


//5、查找第几届成长之星
export const termStar = (termNumber) => {
    return request.post('/select/termStar/class',{
        termNumber
    })
}


