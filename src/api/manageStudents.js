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
export function exportData(selected_students) {
    fetch('/api/stuManage/outputMultipleStudent',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({selected_students:selected_students})
        }
    ).then(response => response.blob()) // 处理响应，将其转换为blob
    .then(blob => {
      // 创建下载链接并触发下载
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'exported-data.xlsx'; // 设置下载文件名
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url); // 清理
    })
    .catch(error => console.error('导出失败:', error));
}

//4、设置管理员
export const makeAdmin = (student,managerType) => {
    return request.post('/stuManage/setStudentManager', JSON.stringify(
        { student, managerType}
    ),
        {
            headers: {
                'Content-Type': 'application/json'
            },
        })
}

//5、批量删除学生的账号
export const deleteUser = (selected_students) => {
    const data = JSON.stringify({ selected_students })
    return request.post('/stuManage/deleteStudent', data,
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
    return request.post('/stuManage/editStudent', editInfo,
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
// export const pageData = (page, limit) => {
//     const data = JSON.stringify({ page, limit })
//     return request.post('/stuManage/queryPageStudent', data,
//         {
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//         }
//     )
// }