//学生管理的接口
import request from '../utils/request'

//1、获取表格中需要渲染的数据以及入学年份、班级下拉框选项中的数据
export const studentInfo = (initInfo, role) => {
    console.log(JSON.stringify(initInfo), "initInfo")
    return request.post(`/stuManage/queryStudent/${role}`, JSON.stringify(initInfo), {
        headers: {
            'Content-Type': 'application/json'
        },
    }
    )
}

//2、单个添加学生
export const singleAdd = (ruleForm) => {
    return request.post('/stuManage/addSingleStudent', JSON.stringify(ruleForm),
    {
        headers: {
            'Content-Type': 'application/json'
        },
    })
}

//3、批量导出
export const exportData = (userDataArr) => {
    return request.post('/stuManage/outputMultipleStudent',
        JSON.stringify(userDataArr)      //放多个对象信息的数组
        , {
            headers: {
                'Content-Type': 'application/json'
            },
        }
    )
}

//4、删除学生的账号
export const deleteUser = (username) => {
    console.log(JSON.stringify(username));
    return request.post('/stuManage/deleteStudent', JSON.stringify(
        { username }
    ),
    {
        headers: {
            'Content-Type': 'application/json'
        },
    })
}

//5、设置管理员
export const makeAdmin = (multipleSelection, type) => {
    const data = JSON.stringify({ multipleSelection, type })
    return request.post('/stuManage/setStudentManager', data,
        {
            headers: {
                'Content-Type': 'application/json'
            },
        }
    )
}

//6、编辑学生信息
export const editStudentInfo = (editInfo) => {
    editInfo = JSON.stringify(editInfo)
    return request.post('/stuManage/editStudent',editInfo,
        {
            headers: {
                'Content-Type': 'application/json'
            },
        }
    )
}

//7、账户禁用
export const MakeDisable = (username) => {
    return request.post('/stuManage/banStudent', JSON.stringify({ username }),
    {
        headers: {
            'Content-Type': 'application/json'
        },
    })
}

//8、分页获取数据
export const pageData = (currentPage, pageSize) => {
    const data = JSON.stringify({ currentPage, pageSize })
    return request.post('/stuManage/queryPageStudent', data,
        {
            headers: {
                'Content-Type': 'application/json'
            },
        }
    )
}