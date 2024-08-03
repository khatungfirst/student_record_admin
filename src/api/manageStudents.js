//学生管理的接口
import request from '../utils/request'

//1、获取表格中需要渲染的数据以及入学年份、班级下拉框选项中的数据
export const studentInfo = (years, classes, gender, isDisable, selectType, selectContent) => {
    return request.post('/student/queryStuController',
        {
            form: {
                years,
                classes,
                gender,
                isDisable,
                selectType,
                selectContent,
            }
        }
    )
}

//2-1、单个添加学生
export const singleAdd = (number, password, userName) => {
    return request.post('', {
        form: {
            number,
            password,
            userName
        }
    })
}

//2-1、批量添加学生

//3、批量导出
export const exportData = (userDataArr) => {
    return request.post('', {
        userDataArr      //放多个对象信息的数组
    })
}

//4、删除学生的账号
export const deleteUser = (number) => {
    return request.post('', {
        form: {
            number
        }
    })
}

//5、设置管理员
export const makeAdmin = (number, adminType) => {
    return request.post(''), {
        form: {
            number,
            adminType
        }
    }
}

//6、编辑学生信息
export const editStudentInfo = (number,classes,phoneNumber,password) => {
    return request.post('',
        {
            form:{
                number,
                classes,
                phoneNumber,
                password
            }
        }
    )
}

//7、账户禁用
export const MakeDisable = () => {
    return request.post('',{
        form:{
            number
        }
    })
}