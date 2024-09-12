<template>
  <div class="dashboard-container">
    <div class="top">
      <el-row :gutter="20">
        <el-col :span="6">
          <category
            class="grid-content bg-purple"
            style="background-color: rgb(101, 220, 206)"
          >
            <template #icon>
              <i class="iconfont">&#xe645;</i>
            </template>
            <template #text1>
              <p>帖子数量</p>
            </template>
            <template #total>
              <p style="font-size: 22px">{{ articleTotal }}</p>
            </template>
          </category>
        </el-col>
        <el-col :span="6">
          <category
            class="grid-content bg-purple"
            style="background-color: rgb(212, 103, 207)"
          >
            <template #icon>
              <i class="iconfont">&#xe645;</i>
            </template>
            <template #text1>
              <p>今日帖子数量</p>
            </template>
            <template #total>
              <p style="font-size: 22px">{{ todayArticleTotal }}</p>
            </template>
            <template #proportion>
              <span style="font-size: 15px"
                >{{ articleRatio }}%同昨天对比</span
              ></template
            >
          </category>
        </el-col>
        <el-col :span="6">
          <category
            class="grid-content bg-purple"
            style="background-color: rgb(254, 164, 90)"
          >
            <template #icon>
              <i class="iconfont">&#xe70d;</i>
            </template>
            <template #text1>
              <p>今日访客数</p>
            </template>
            <template #total>
              <p style="font-size: 22px">{{ todayVisitorTotal }}</p>
            </template>
            <template #proportion>
              <span style="font-size: 15px"
                >{{ visitorRatio }}%同昨天对比</span
              ></template
            >
          </category>
        </el-col>
        <el-col :span="6">
          <category
            class="grid-content bg-purple"
            style="background-color: rgb(254, 115, 100)"
          >
            <template #icon>
              <i class="iconfont">&#xe620;</i>
            </template>
            <template #text1>
              <p>人员总数</p>
            </template>
            <template #total>
              <p style="font-size: 22px">{{ userTotal }}</p>
            </template>
          </category>
        </el-col>
      </el-row>
    </div>

    <div class="main">
      <!-- 图表容器 -->
      <!-- 柱状图 -->
      <div class="columnar">
        <p class="hot">热门话题</p>
        <div class="date">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="date"
            :editable="false"
            @change="dateCheck"
            value-format="yyyy-MM-dd"
            v-permission="'topic:day:query'"
          >
            <!-- :picker-options="pickerOptions" -->
          </el-date-picker>
        </div>
        <div
          id="echart"
          ref="chartContainer"
          style="
            width: 100%;
            height: 50vh;
            display: inline-block;
            padding: 5px;
            font-size: 5vw;
          "
        ></div>
      </div>
      <div class="overView">
        <p class="hot">实时概况</p>
        <el-row class="first">
          <el-col :span="12">
            <div class="img" style="background-color: #fd7c26">
              <i class="el-icon-user-solid"></i>
            </div>
            <div class="text">
              <p>学生人数</p>
              <p>{{ students }}</p>
            </div>
          </el-col>

          <el-col :span="12">
            <div class="img" style="background-color: #03bb2a">
              <i class="el-icon-s-custom"></i>
            </div>
            <div class="text">
              <p>教师数</p>
              <p>{{ teachers }}</p>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <div class="img" style="background-color: #f3d026">
              <i class="el-icon-thumb"></i>
            </div>
            <div class="text">
              <p>总赞数</p>
              <p>{{ likeTotal }}</p>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="img" style="background-color: #03b4fd">
              <i class="el-icon-view"></i>
            </div>
            <div class="text">
              <p>总阅读数</p>
              <p>{{ articleReadTotal }}</p>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import * as echarts from "echarts";
import category from "./category.vue";
import { getDesktopInfo } from "../../api/desktop";
import { updateHistogramInfo } from "../../api/desktop";
export default {
  name: "desktop",
  components: { category },
  data() {
    return {
      //定义那个柱状图
      myChart: null,
      // role:"",   ///存放登录用户的身份
      //定义柱状图上那个日期
      date: "",
      articleTotal: "", //帖子总数
      todayArticleTotal: "", //今日帖子总数
      articleRatio: "", //两天帖子的比例
      todayVisitorTotal: "", //今日访客数
      visitorRatio: "", //两天访客的比例
      userTotal: "", //人员总数
      students: "", //学生总数
      teachers: "", //教师总数
      articleReadTotal: "", //总帖数
      likeTotal: "", //获赞总数
      //柱形图中的数据
      chartOption: {},
    };
  },
  created() {
    // this.handleListener();
  },
  async mounted() {
    this.getInfo(); //获取这个页面需要的所有数据
    this.renderChart();
    this.handleListener();
  },
  methods: {
    //窗口变化后，柱状体进行调整重新渲染
    handleResize() {
      // 如果需要，还可以销毁ECharts实例
      if (this.myChart) {
        console.log("111");
        this.myChart.resize();
      }
    },
    //监听窗口大小变化
    handleListener() {
      // 监听窗口resize事件，重新渲染图表
      window.addEventListener("resize", () => {
        if (this.myChart) {
          this.myChart.dispose();
          this.renderChart();
        }

        // this.handleResize();
      });
    },
    //初始化和渲染图表
    renderChart() {
      // 使用ref获取DOM元素
      let chartDom = this.$refs.chartContainer;
      // 初始化ECharts实例
      this.myChart = echarts.init(chartDom);
      this.myChart.setOption(this.chartOption);
    },
    //发送请求获取该页面所需要的数据
    async getInfo() {
      // this.role = this.$store.state.user.userInfo.role;
      this.role = JSON.parse(localStorage.getItem("userInfo")).role;
      if (
        this.role === "grade1" ||
        this.role === "grade2" ||
        this.role === "grade3" ||
        this.role === "grade4"
      ) {
        this.role = "grade";
      }
      const totalData = await getDesktopInfo(this.role);
      const data = totalData.data;
      console.log(data, "data111");
      this.articleTotal = data.article_total;
      this.todayArticleTotal = data.today_article_total;
      this.articleRatio = data.article_ratio;
      this.todayVisitorTotal = data.today_visitor_total;
      this.visitorRatio = data.visitor_ratio;
      this.userTotal = data.user_total;
      this.students = data.student_total;
      this.teachers = data.teacher_total;
      this.articleReadTotal = data.article_read_total;
      this.likeTotal = data.upvote_amount;
      this.chartOption = data.chartOption;
      console.log(this.chartOption, "--------------");

      this.renderChart();
    },

    //根据日期查询对应的柱状图数据
    async dateCheck() {
      if (this.date === null) {
        this.date = "";
      }
      const chartOption = await updateHistogramInfo(this.date);
      this.chartOption = chartOption.data.chartOption;
      console.log(this.chartOption, "chart");
      if (this.myChart) {
        console.log("消失");
        this.myChart.dispose();
        this.renderChart();
      }
    },
  },
  beforeDestroy() {
    // 移除监听器
    window.removeEventListener("resize", this.handleResize);
    // 如果需要，还可以销毁ECharts实例
    if (this.myChart) {
      this.myChart.dispose();
    }
  },
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
* {
  box-sizing: border-box;
}
.dashboard-container {
  width: 100%;
  padding: 10px 20px 0px;

  .top {
    .el-row {
      display: flex;
      flex-wrap: wrap;
      margin-bottom: 20px;
      &:last-child {
        margin-bottom: 0;
      }

      .el-col {
        flex: 1 0 333px; /* flex-grow、flex-shrink 和 flex-basis */
        padding: 20px;
      }
    }
  }
  p {
    margin: 10px 0px;
  }
  .columnar {
    width: 70%;
    height: 60vh;
    background-color: #fff;
    transition: 0.6s ease;
    display: inline-block;

    .date {
      display: flex;
      justify-content: flex-end;
      padding-right: 20px;
    }

    .date:hover {
      cursor: pointer;
    }

    #echart {
      width: 100%;
    }
  }
  .hot {
    padding-left: 20px;
    padding-top: 15px;
  }
  .columnar:hover {
    box-shadow: 2px 5px 20px #888888;
    transition: 0.6s ease;
  }
  // .main {
  //   display: flex;
  //   justify-content: space-around;
  // }
  .overView {
    width: 28%;
    height: 60vh;
    background-color: #ffffff;
    transition: 0.6s ease;
    float: right;
    padding: 0px 5px;

    .el-row {
      display: flex;
      flex-wrap: wrap;
    }

    .el-col {
      display: flex;
      justify-content: space-around;
      margin-bottom: 2vh;
      padding: 10px;
      flex: 1 0 280px; /* flex-grow、flex-shrink 和 flex-basis */
      transition: 0.6s ease;

      i {
        font-size: 30px;
      }

      .img {
        width: 20%;
        aspect-ratio: 1 / 1; /* 高度与宽度比为1:1，即正方形 */
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #fff;
      }
    }
    .el-col:hover {
      box-shadow: 2px 5px 20px #888888;
      transition: 0.6s ease;
    }

    .first {
      margin-top: 2vh;
    }
  }
}
</style>

