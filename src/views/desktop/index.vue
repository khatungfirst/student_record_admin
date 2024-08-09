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
              <p style="font-size: 22px">533</p>
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
              <p style="font-size: 22px">533</p>
            </template>
            <template #proportion>
              <span style="font-size: 15px">+1.2%同昨天对比</span></template
            >
          </category>
        </el-col>
        <el-col :span="6">
          <category
            class="grid-content bg-purple"
            style="background-color: rgb(254, 164, 90)"
          >
            <template #icon>
              <i class="iconfont">&#xe620;</i>
            </template>
            <template #text1>
              <p>今日访客数</p>
            </template>
            <template #total>
              <p style="font-size: 22px">533</p>
            </template>
            <template #proportion>
              <span style="font-size: 15px">+1.2%同昨天对比</span></template
            >
          </category>
        </el-col>
        <el-col :span="6">
          <category
            class="grid-content bg-purple"
            style="background-color: rgb(254, 115, 100)"
          >
            <template #icon>
              <i class="iconfont">&#xe70d;</i>
            </template>
            <template #text1>
              <p>人员总数</p>
            </template>
            <template #total>
              <p style="font-size: 22px">533</p>
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
          <el-date-picker type="date" placeholder="选择日期" v-model="date" :editable="false">
            <!-- :picker-options="pickerOptions" -->
          </el-date-picker>
        </div>
        <div
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
        <p class="hot">实施概况</p>
        <el-row class="first">
          <el-col :span="12">
            <div class="img" style="background-color: #fd7c26">
              <i class="el-icon-user-solid"></i>
            </div>
            <div class="text">
              <p>学生人数</p>
              <p>84</p>
            </div>
          </el-col>

          <el-col :span="12">
            <div class="img" style="background-color: #03bb2a">
              <i class="el-icon-s-custom"></i>
            </div>
            <div class="text">
              <p>教师数</p>
              <p>84</p>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <div class="img" style="background-color: #f3d026">
              <i class="el-icon-s-order"></i>
            </div>
            <div class="text">
              <p>总贴数</p>
              <p>84</p>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="img" style="background-color: #03b4fd">
              <i class="el-icon-s-management"></i>
            </div>
            <div class="text">
              <p>总阅读数</p>
              <p>84</p>
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
export default {
  name: "desktop",
  components: { category },
  data() {
    return {
      //定义那个柱状图
      myChart: null,
      // role:"",   ///存放登录用户的身份
      //定义柱状图上那个日期
      date: '',
      articleTotal:'',   //帖子总数
      todayArticleTotal: '',   //今日帖子总数
      articleRatio: '',    //两天帖子的比例
      todayVisitorTotal: '',    //今日访客数
      visitorRatio: '',     //两天访客的比例
      userTotal: '',    //人员总数
      students: '',      //学生总数
      teachers: '',      //教师总数
      articleReadTotal: '',    //总阅读数
      likeTotal: '',      //获赞总数
      //柱形图中的数据
      chartOption: {
        xAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: [120, 200, 150, 80, 70, 110, 130],
            type: "bar",
          },
        ],
      },
    };
  },
  computed: {
    // ...mapGetters({role:'user/roles'}),
  },
  created() {
    this.handleListener();
  },
  async mounted() {
    this.getInfo(); //获取这个页面需要的所有数据
    this.renderChart();
    console.log(this.$store,'1111111');
  },
  methods: {
    //窗口变化后，柱状体进行调整重新渲染
    handleResize() {
      // 如果需要，还可以销毁ECharts实例
      if (this.myChart) {
        console.log("111");
        // this.myChart.resize();
        this.renderChart();
      }
    },
    //监听窗口大小变化
    handleListener() {
      // 监听窗口resize事件，重新渲染图表
      window.addEventListener("resize", () => {
        if (this.myChart) {
          this.myChart.dispose();
        }
        this.handleResize();
      });
    },
    //初始化和渲染图表
    renderChart() {
      // 使用ref获取DOM元素
      let chartDom = this.$refs.chartContainer;
      // 初始化ECharts实例
      this.myChart = echarts.init(chartDom);
      // 设置配置项
      this.myChart.setOption(this.chartOption);
    },
    //发送请求获取该页面所需要的数据
    async getInfo(){
      this.role = this.$store.state.user.userInfo.role;
      if(this.role === 'grade1' || this.role === 'grade2' || this.role === 'grade3' || this.role === 'grade4'){
        this.role = 'grade'
      }
      console.log(this.role,'role');
      const data = await getDesktopInfo(this.role);
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
      this.chartOption = data.chartOption
    },

    //根据日期查询对应的柱状图数据
    async dateCheck(){
      const chartOption = await updateHistogramInfo(this.date);
      this.chartOption = chartOption;
    }
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

  .top{
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
    width: 48%;
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
    width: 48%;
    height: 60vh;
    background-color: #ffffff;
    transition: 0.6s ease;
    float: right;
    padding: 0px 5px;

    .el-row{
      display: flex;
      flex-wrap: wrap;
    }

    .el-col {
      display: flex;
      justify-content: space-around;
      margin-bottom: 8vh;
      padding: 3vh;
      flex: 1 0 200px; /* flex-grow、flex-shrink 和 flex-basis */
      transition: 0.6s ease;

      i{
        font-size: 30px;
      }

      .img {
      width: 30%;
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
      margin-top: 12vh;
    }

  }
}
</style>

