<!-- 推选成长之星页面 -->
<template>
  <div class="wrap">
    <!-- 搜索成长之星 -->
    <div class="top">
      <el-input placeholder="请搜索要推选的人的姓名" v-model="search">
      </el-input>
      <el-button type="primary" icon="el-icon-search" @click="initStar" v-permission="'star:user:query'"
        >搜索</el-button
      >
    </div>

    <!-- 推选成长之星 -->
    <div class="middle">
      <table>
        <thead>
          <tr>
            <th width="1">
              <el-checkbox :value="isAll" @change="allCheck" />
            </th>
            <th width="140">学号</th>
            <th width="140">姓名</th>
            <th width="140">贴子数</th>
            <th width="140">粉丝数</th>
            <th width="140">积分</th>
            <th width="140">热度</th>
            <th width="140">被推选次数</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="table.length === 0">
            <td colspan="9" class="empty" style="text-align: center">
              暂时没有数据
            </td>
          </tr>
          <tr v-else v-for="i in table" :key="i.username">
            <td>
              <el-checkbox
                :value="i.status"
                @change="(selected) => handleSelectionChange(i, selected)"
                :disabled="isDisabled"
              />
            </td>
            <td class="tc">
              <p>{{ i.username }}</p>
            </td>
            <td>
              <div class="tc">
                <div>
                  <p class="name ellipsis">
                    {{ i.name }}
                  </p>
                </div>
              </div>
            </td>
            <td class="tc">
              <p>{{ i.user_article_total }}</p>
            </td>
            <td class="tc">
              <p>{{ i.userfans }}</p>
            </td>
            <td class="tc">
              <p>{{ i.score }}</p>
            </td>
            <td class="tc">
              <p>{{ i.hot }}</p>
            </td>
            <td class="tc">
              <p>{{ i.frequency }}</p>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="middle-bottom">
        <div class="block">
          <el-pagination
            @current-change="handleCurrentChange"
            :current-page.sync="page"
            :page-size="5"
            layout="total, prev, pager, next"
            :total="total"
          >
          </el-pagination>
        </div>
        <div class="middle-button">
          <el-tooltip placement="top">
            <div slot="content">重新选择只在推选前有效</div>
            <i class="el-icon-question"></i>
          </el-tooltip>
          <el-button
            type="primary"
            @click="newSelect"
            :disabled="buttonDisabled"
            >重新选择<i class="el-icon-refresh-right"></i
          ></el-button>
          <el-button
            type="primary"
            @click="electUsers"
            :disabled="buttonDisabled"
            v-permission="'star:user:select'"
            >推选<i class="el-icon-s-promotion"></i
          ></el-button>
          <el-button type="primary" @click="publicStar" v-permission="'star:user:public'">发布</el-button>
        </div>
      </div>
    </div>

    <!-- 公示成长之星 -->
    <div class="bottom">
      <div class="bottom-top">
        <p>成长之星公示</p>
        <el-input
          placeholder="请用阿拉伯数字"
          v-model="term"
          @change="searchTerm"
          v-permission="'star:term:query'"
        >
          <template slot="prepend">查找第</template>
          <template slot="append">届成长之星名单</template>
        </el-input>
      </div>
      <div class="publicity">
        <div class="classPublicity">
          <p class="title"><i class="el-icon-star-on"></i>班级之星</p>
          <div v-for="(item, index1) in classData" :key="index1" class="list">
            <p>{{ item.className }}:</p>
            <span
              v-for="(item, index) in classData[index1].classStar"
              :key="index"
              >{{ item }}</span
            >
          </div>
        </div>
        <div class="gradePublicity">
          <p class="title">
            <i class="el-icon-star-on"></i
            ><i class="el-icon-star-on"></i>年级之星
          </p>
          <div v-for="(item, index) in gradeData" :key="index" class="list">
            <span>{{ item.gradeName }}-{{ item.gradeClass }}</span>
          </div>
        </div>
        <div class="hospitalPublicity">
          <p class="title">
            <i class="el-icon-star-on"></i><i class="el-icon-star-on"></i
            ><i class="el-icon-star-on"></i>院级之星
          </p>
          <div v-for="(item, index) in hospitalData" :key="index" class="list">
            <span>{{ item.gradeName }}-{{ item.gradeClass }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Message } from "element-ui"; // MessageBox
import { mapState, mapMutations } from "vuex";
import { initStar } from "../../api/star";
import { optional } from "../../api/star";
import { elected } from "../../api/star";
import { publicStar } from "../../api/star";
import { termStar } from "../../api/star";
export default {
  name:'star',
  data() {
    return {
      search: "", //存放搜索框中的内容
      tableData: [], //表格中所需要的所有数据
      table: [], //表格数据的中间介质
      mul: [], //存放要推选的人的所有信息
      term: null, //存放搜索的届数
      classData: [], //存放班级之星的名单
      gradeData: [], //存放年级之星的名单
      hospitalData: [], //存放院级之星的名单
      isSelected: false, //定义多选框是否选中
      remainder: 3, //存放剩余的推选名额
      maxSelectedCount: 3, // 最多推选人数
      isAll: false, //全选框的状态
      isDisabled: false, //多选框是否禁用
      limit: 5, //存放表格一页放几个数据
      page: 1, //表示当前在第几页
      // currentPageNumber:0,  //表示当前页数据的条数
      total: 0, //表格中总共有多少数据
      // selectionsTotal: 0, //表示已推选的人员总数
      buttonDisabled: false, //表示两个按钮是否被禁用
    };
  },
  async created() {
    localStorage.setItem("starPage", this.page);
    this.initStar(); //初始化表格数据
    this.searchTerm(); //初始化成长之星公示数据
  },
  methods: {
    //初始化界面的数据
    async initStar() {
      console.log('------------------------------');
      
      this.page = JSON.parse(localStorage.getItem("starPage"));
      const data = await initStar(this.limit, this.page, this.search);
      if (data.data !== null) {
        this.tableData = data.data.tableData;
        this.table = this.tableData;
        this.total = data.data.total;
        this.maxSelectedCount = data.data.peopleLimit;      
        this.buttonDisabled = data.data.isDisabled
        this.search = "";
        //显示已选中用户的选中状态
        this.table.map((item, index) => {
          const existingItem = this.mul.find(
            (item1) => item1.username === item.username
          );
          if (existingItem) {
            // console.log();
            item.status = true;
          }
        });
      }
    },

    //初始化下面成长之星公示的数据
    async initPublic(data) {
      if (data !== null) {
        this.classData = data.data.classData;
        this.gradeData = data.data.gradeData;
        this.hospitalData = data.data.hospitalData;
      }
    },

    //查找第几届成长之星
    async searchTerm() {
      console.log(this.term, "term");
      if (this.term === null) {
        this.term = 0;
      }
      const data = await termStar(this.term);
      this.initPublic(data);
    },

    allCheck() {
      // 1. 获取当前复选框的选中状态
      this.isAll = !this.isAll;

      if (this.table.length > this.maxSelectedCount) {
        Message({
          message: "选择数目超过名额，无法选择！",
        });
        this.isAdd = false;
        this.isAll = false;
        console.log(this.isAdd, "add1");
      } else {
        // 2. 切换所有复选框的选中状态
        this.table.forEach((item) => {
          item.status = this.isAll;
          this.handleSelectionChange(item, true);
        });
      }

      // 3. 更新 Vuex 中相应的状态
      // this.$store.commit("star/setIsAll", this.isAll);
    },

    //表示当前是多少页
    handleCurrentChange(val) {
      localStorage.setItem("starPage", val);
      this.initStar();
    },

    //获取到选中行的数据
    async handleSelectionChange(val, selected) {
      // const {data}= await selectStatus(val.username,selected)
      // this.tableData = data;
      val.status = selected;
      const existingItem = this.mul.find(
        (item) => item.username === val.username
      );
      //判断用户是勾选还是取消勾选
      if (!existingItem) {
        this.multipleSelection = val;
        if (this.mul.length < this.maxSelectedCount) {
          // 将这些新对象添加到mul数组中
          this.mul.push(this.multipleSelection);
          this.remainder = this.maxSelectedCount - this.mul.length;
          if (this.mul.length === this.tableData.length) {
            this.isAll = true;
          }
          if (this.remainder === 0) {
            Message({
              message: "名额已经选满喽~~~",
            });
            this.isDisabled = true;
          }
        } else {
          Message({
            message: "名额已经选满喽，推选无效~",
          });
        }
      } else {
        this.mul = this.mul.filter((item) => item.username !== val.username);
      }
    },

    //推选
    async electUsers() {
      if (this.mul.length === 0) {
        Message({
          message: "您还没有选择推选的人员",
        });
      } else {
        let userInfo = JSON.parse(localStorage.getItem("userInfo"));
        let role = userInfo.role;
        if (
          role === "grade1" ||
          role === "grade2" ||
          role === "grade3" ||
          role === "grade4"
        ) {
          role = "grade";
        }
        const data = await elected(this.mul, role);
        if (data.msg !== "数据已存在") {
            if (
              data.data === 'No seats left'
            ) {
              console.log('禁用按钮');
              
              await optional();
              this.buttonDisabled = true;
              Message({
                message: "推选名额已经用完喽",
              });
            }
        }
      }
      this.mul = [];
      this.isAll = false
      this.initStar();
    },

    //公布成长之星名单
    async publicStar() {
      this.initStar()
      this.buttonDisabled = false;
      const data = await publicStar();
      this.initPublic(data);
    },

    //重新选择
    newSelect() {
      this.table = this.tableData;
      this.isDisabled = false;
      this.isAll = false;
      this.table.forEach((item) => {
        item.status = false;
      });
      this.mul = [];
    },
  },
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
* {
  box-sizing: border-box;
}

.wrap {
  height: 100%;
  display: grid;
  grid-template-rows: 1fr 3fr 4fr;

  /* 自定义滚动条整体宽度 */
  ::-webkit-scrollbar {
    width: 5px; /* 垂直滚动条 */
    /* height: 10px; 如果需要设置水平滚动条 */
  }

  /* 自定义滚动条滑块样式 */
  ::-webkit-scrollbar-thumb {
    background-color: #7a8c73; /* 滑块颜色 */
    border-radius: 10px; /* 滑块圆角 */
  }

  /* 自定义滚动条轨道样式 */
  ::-webkit-scrollbar-track {
    background-color: #b2c2b1; /* 轨道颜色 */
    border-radius: 0; /* 轨道圆角 */
  }
  .top {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
    background-color: #fdfeff;

    .el-input {
      width: 60%;
      margin-right: 20px;
    }
  }

  .middle {
    padding-right: 20px;
    .el-button {
      float: right;
      margin-top: 10px;
      margin-right: 20px;
    }

    table {
      border-spacing: 0;
      border-collapse: collapse;
      margin: 0 auto;
      border-left: 1px solid #95a575;
      border-right: 1px solid #95a575;

      .empty {
        height: 33px;
        text-align: center;
      }

      th,
      td {
        border-bottom: 1px solid #95a575;

        &:first-child {
          text-align: left;
          padding-left: 30px;
          color: #999;
        }
      }

      th {
        border-top: 1px solid #95a575;
        font-size: 16px;
        font-weight: normal;
        line-height: 30px;
      }
      .tc {
        text-align: center;
        p {
          margin: 10px;
        }
      }
    }

    .middle-bottom {
      display: grid;
      grid-template-columns: 1fr 1fr;
      position: relative;
      height: 50px;
      line-height: 50px;

      .middle-button {
        float: right;

        .el-tooltip {
          float: right;
          height: 50px;
          line-height: 50px;
        }
      }

      .block {
        display: inline-block;
        margin: 0 auto;
        .el-pagination {
          position: absolute;
          top: 15px;
        }
      }
    }
  }

  .bottom {
    background-color: #dce9d1;
    margin-top: 10px;
    overflow-y: auto; /* 当内容超出高度时，启用垂直滚轴 */

    .bottom-top {
      display: grid;
      grid-template-columns: 4fr 1fr;

      p {
        text-align: center;
        font-weight: 800;
        padding-left: 330px;
        font-size: 19px;
      }
      .el-input {
        width: 360px;
        padding: 10px;
        background-color: none;
        height: 39px;
      }
    }

    .publicity {
      height: 80%;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));

      .title {
        font-size: 18px;
        margin: 10px 0px;
      }

      .list {
        font-family: "楷体";
        font-size: 18px;
        border: none;
      }

      p {
        text-align: center;
        margin: 10px 0px;
      }

      span {
        margin: 0px 10px 10px 10px;
        font-size: 16px;
      }

      div {
        border-right: 1px dashed green;
      }
    }
  }
}
</style>