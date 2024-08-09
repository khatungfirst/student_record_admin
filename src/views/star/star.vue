<!-- 推选成长之星页面 -->
<template>
  <div class="wrap">
    <!-- 搜索成长之星 -->
    <div class="top">
      <el-input placeholder="请搜索要推选的人的姓名" v-model="search">
      </el-input>
      <el-button type="primary" icon="el-icon-search" @click="searchSelection"
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
          <tr v-for="i in table" :key="i.username">
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
          <el-pagination layout="prev, pager, next" :total="1000">
          </el-pagination>
        </div>
        <div class="middle-button">
          <el-button type="primary" @click="newSelect"
            >重新选择<i class="el-icon-refresh-right"></i
          ></el-button>
          <el-button type="primary" @click="electUsers" ref="electButton"
            >推选<i class="el-icon-s-promotion"></i
          ></el-button>
          <el-button type="primary" @click="publicStar">发布</el-button>
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
          <div v-for="(item, index1) in gradeData" :key="index1" class="list">
            <p>{{ item.gradeName }}:</p>
            <span
              v-for="(item, index) in gradeData[index1].gradeStar"
              :key="index"
              >{{ item }}</span
            >
          </div>
        </div>
        <div class="hospitalPublicity">
          <p class="title">
            <i class="el-icon-star-on"></i><i class="el-icon-star-on"></i
            ><i class="el-icon-star-on"></i>院级之星
          </p>
          <div
            v-for="(item, index1) in hospitalData"
            :key="index1"
            class="list"
          >
            <p>{{ item.hospitalName }}:</p>
            <span
              v-for="(item, index) in hospitalData[index1].hospitalStar"
              :key="index"
              >{{ item }}</span
            >
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
import { searchStar } from "../../api/star";
import { elected } from "../../api/star";
import { publicStar } from "../../api/star";
import { termStar } from "../../api/star";
export default {
  data() {
    return {
      search: "", //存放搜索框中的内容
      //表格中所需要的所有数据
      tableData: [],
      table: [], //表格数据的中间介质
      mul: [], //存放要推选的人的所有信息
      term: "", //存放搜索的届数
      classData: [], //存放班级之星的名单
      gradeData: [], //存放年级之星的名单
      hospitalData: [], //存放院级之星的名单
      isSelected: false, //定义多选框是否选中
      remainder: 3, //存放剩余的推选名额
      maxSelectedCount: 3, // 最多推选人数
      isAll: false,
      isDisabled: false, //多选框是否禁用
      onePageNumber: 5, //存放表格一页放几个数据
      selectedRowKeys:[]   //存储选中行的key值
    };
  },
  async created() {
    this.initStar();
  },
  methods: {
    //初始化界面的数据
    async initStar() {
      const data = await initStar(this.onePageNumber);
      this.tableData = data.data.tableData;
      console.log(data.data);
      this.classData = data.data.classData;
      this.gradeData = data.data.gradeData;
      this.hospitalData = data.data.hospitalData;
      this.table = this.tableData;
      this.selectedRowKey();
    },

    allCheck() {
      // 1. 获取当前复选框的选中状态
      this.isAll = !this.isAll;

      if (this.table.length > 3) {
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

    //获取到选中行的数据
    handleSelectionChange(val, selected) {
      val.status = selected;
      //判断用户是勾选还是取消勾选
      if (!this.mul.includes(val)) {
        this.multipleSelection = val;
        if (this.remainder > 0) {
          console.log(this.isAdd, "add");
          // 将这些新对象添加到mul数组中
          this.mul.push(this.multipleSelection);
          this.remainder = this.maxSelectedCount - this.mul.length;
          console.log(this.mul, "length");
          if (this.mul.length === this.onePageNumber) {
            this.isAll = true;
          }
          if (this.remainder === 0) {
            Message({
              message: "名额已经选满喽~~~",
            });
            this.isDisabled = true;
          }
          console.log(this.remainder, "剩余");
        } else {
          Message({
            message: "名额已经选满喽，推选无效~",
          });
        }
      } else {
        this.mul = this.mul.filter((item) => item.username !== val.username);
      }
    },

    //搜索要推选的人
    async searchSelection() {
      const data = await searchStar(this.onePageNumber, this.search);
      this.tableData = data.data;
      this.table = this.tableData
      console.log(this.tableData);
      this.search = ''
    },

    //推选
    async electUsers() {
      if (this.mul.length === 0) {
        Message({
          message: "您还没有选择推选的人员",
        });
      }else {
        await elected(this.mul);
      }
      this.initStar();
    },

    //查找第几届成长之星
    async searchTerm() {
      console.log(this.term,'term');
      await termStar(this.term)
    },

    //公布成长之星名单
    async publicStar() {
      await publicStar();
    },

    //控制多选框是否能编辑
    selectedRowKey() {
      this.selectedRowKeys = JSON.parse(localStorage.getItem("id")) || [];
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