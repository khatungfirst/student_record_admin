//学生管理的接口
import request from '../utils/request'

//1、获取表格中需要渲染的数据以及入学年份、班级下拉框选项中的数据
export const studentInfo = (initInfo) => {
    return request.post('/stuManage/queryStudent/{}',
        {
            initInfo
        }
    )
}

//2、单个添加学生
export const singleAdd = (ruleForm) => {
    return request.post('/stuManage/addStudent', {
        ruleForm
    })
}

//3、批量导出
export const exportData = (userDataArr) => {
    return request.post('/stuManage/outputMultipleStudent', {
        userDataArr      //放多个对象信息的数组
    })
}

//4、删除学生的账号
export const deleteUser = (number) => {
    return request.post('/stuManage/deleteStudent', {
        number
    })
}

//5、设置管理员
export const makeAdmin = (multipleSelection,type) => {
    return request.post('/stuManage/setStudentManager',{
        multipleSelection,
        type
    }) 
}

//6、编辑学生信息
export const editStudentInfo = (editInfo) => {
    return request.post('/stuManage/editStudent',
        {
           editInfo
        }
    )
}

//7、账户禁用
export const MakeDisable = (number) => {
    return request.post('/stuManage/banStudent', {
        number
    })
}