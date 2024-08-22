//定义菜单的匹配规则
//menu是前端定义的路由文件
//dyMenu后端动态路由文件
import { cloneDeep } from "lodash";
export function ruleMenu(menu,dyMenu){
    console.log(dyMenu,'dyyyyyyyy');
       
    let menuArr=[];
    let arr = cloneDeep(menu)
    //遍历前端的路由，判断menu里面的每一项的meta.title,是否后端返回里面有这个信息
    arr.forEach(element => {
        dyMenu.forEach(item=>{
            if(element.meta.title === item.meta.title){
                menuArr.push(element)
            }
        })
    });
    return menuArr
}



