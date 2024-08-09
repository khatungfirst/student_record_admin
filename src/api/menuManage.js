import request from '../utils/request'

//1、获得初始化数据
export const initMenu = () => {
    return request.post('')
}
//2、搜索
export const selectMenu = (selectInput) => {
    return request.post('',{
        selectInput
    })
}

//3、新增菜单
export const addMenu = (ruleForm) => {
    return request.post('',{
        ruleForm
    })
}

//4、编辑菜单
export const editMenu = (ruleForm) => {
    return request.post('',{
        ruleForm
    })

}

//5、删除菜单
export const deleteMenu = (menuName) => {
    return request.post('',{
        menuName
    })
}