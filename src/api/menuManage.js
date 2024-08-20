import request from '../utils/request'

//1、获得初始化数据
export const initMenu = () => {
    return request.get('/menuManage/init')
}
//2、搜索
export const selectMenu = (input) => {
    return request.get('/menuManage/selectInfo',
        {
            params: { input }
        }
    )
}

//3、新增菜单
export const addMenu = (ruleForm) => {
    return request.post('/menuManage/newelyBuilt', JSON.stringify(ruleForm), {
        headers: {
            'Content-Type': 'application/json'
        },
    }
    )
}

//4、编辑菜单
export const editMenu = (ruleForm) => {
    return request.post('/menuManage/edit', JSON.stringify(ruleForm), {
        headers: {
            'Content-Type': 'application/json'
        },
    }
    )

}

//5、删除菜单
export const deleteMenu = (menuId) => {
    return request.post('/menuManage/delete', JSON.stringify({ menuId }),
        {
            headers: {
                'Content-Type': 'application/json'
            },
        })
}

//6、获取父级菜单下拉列表中的数据
export const fartherManuList = () => {
    return request.get('/menuManage/list')
}