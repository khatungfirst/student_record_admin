<template>
  <div class="complaint-mailbox">
    <el-card class="mailbox-card">
      <!-- 如果举报信息存在 -->
      <div class="complaint-groups" v-if="complaintData && complaintData.length > 0">
        <!-- 举报分组列表 -->
        <div class="complaint-group" v-for="(article, index) in complaintData" :key="index">
          <!-- 文章举报标题 -->
          <div class="article-title" @click="viewArticleDetails(article)">
            <span class="title-ellipsis">{{ article.title }}</span>
          </div>
          <!-- 举报信息列表 -->
          <div class="report_content-list">
            <!-- 具体举报信息 -->
            <div class="complaint-info" v-for="(complaint, index1) in article.report_content" :key="index1">
              <div class="complaint-detail">
                <span class="complaint-time">
                  举报时间: {{ complaint.report_time }}
                </span>
                <span class="complaint-reason">
                  举报理由: {{ complaint.report_msg }}
                </span>
              </div>
            </div>
          </div>
          <!-- 操作按钮 -->
          <div class="complaint-actions">
            <!-- 文章详情按钮 -->
            <el-button type="success" v-model="dialogVisible" title="帖子详情" @click="showDialog(article)"
              :visible.sync="dialogVisible">文章详情</el-button>
            <el-button type="primary" size="small" @click="handleReview(article)">审核通过</el-button>
            <el-button type="danger" size="small" @click="articleBan(article)">文章封禁</el-button>
          </div>

          <!-- 文章详情弹窗 -->
          <el-dialog :visible.sync="dialogVisible" title="文章详情">
            <div v-if="articleDetail">
              <p>{{ articleDetail }}</p>
            </div>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">关闭</el-button>
            </span>
          </el-dialog>
        </div>
      </div>
      <!-- 如果没有举报信息 -->
      <div v-else>
        <p>没有举报信息。</p>
      </div>
      <!-- 分页组件 -->
      <div class="mailbox-footer">
        <el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="pageSize"
          layout="prev, pager, next" :total="totalItems"></el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
import { articleBan, getArticleDetail } from '../../api/article';
import { getReportList, confirmReportMessage } from '../../api/mailbox';
export default {
  name: "mailbox",
  data() {
    return {
      currentPage: 1,
      pageSize: 10,
      totalItems: 0,
      complaintData: [], // 存储从API获取的举报数据
      dialogVisible: false, // 控制弹窗的显示
      articleDetail: null, // 用于存储帖子详情 
      username:""
    };
  },
  created() {
    this.fetchComplaintData();
  },
  methods: {
    async fetchComplaintData() {
      try {
        const params = {
          page: this.currentPage,
          limit: this.pageSize,
        };
        console.log("Params object being sent:", params);
        const response = await getReportList(params);
        console.log(response);
        if (response.code === 200 && response.data) {
          // 先分组数据，再赋值给 complaintData
          this.complaintData = this.groupReportContentByArticle(response.data.article_ban);

          this.username = response.data.username;

          this.totalItems = response.data.unread_count;
        } else {
          throw new Error('Failed to fetch report list');
        }
      } catch (error) {
        console.error('Error fetching report content:', error);
        this.$message.error('获取举报信息失败');
      }
    },
    groupReportContentByArticle(reportContent) {
      // 将举报数据按文章ID分组
      const grouped = reportContent.reduce((acc, article) => {
        // 检查当前文章是否已经存在于分组对象中
        if (!acc[article.article_id]) {
          // 如果不存在，初始化文章的分组
          acc[article.article_id] = {
            article_id: article.article_id, // 文章ID
            title: article.article_content, // 文章内容
            report_content: [], // 存放针对该文章的举报信息
          };
        }
        // 向对应文章的举报信息数组中添加举报信息
        acc[article.article_id].report_content.push(
          ...article.report_content.map(report => ({
            id: report.id, // 举报ID
            report_time: report.report_time, // 举报时间
            report_msg: report.report_msg, // 举报理由
          }))
        );
        return acc;
      }, {});

      // 将分组对象的键转换为数组，以便可以遍历
      return Object.values(grouped);
    },
    handleCurrentChange(currentPage) {
      // 切换页码的逻辑
      this.currentPage = currentPage;
      this.fetchComplaintData();
    },
    async handleReview(group) {
      // 审核通过的逻辑
      console.log('审核通过:', group);
      try {
        // 假设 group 对象中包含了 article_id
        const reportId = group.article_id; // 获取文章的 ID
        await confirmReportMessage(reportId); // 调用封装的 confirmReportMessage 函数
        this.$message.success('举报信息审核成功'); // Element UI 的成功提示
        // 成功后的逻辑，例如刷新页面或提示用户
        this.fetchComplaintData(); // 重新获取举报数据
      } catch (error) {
        // 错误处理逻辑
        console.error('Failed to confirm report:', error);
        this.$message.error('举报信息审核失败'); // Element UI 的错误提示
      }
    },
    async articleBan(group) {
      // 封禁文章的逻辑
      console.log('封禁文章:', group);
      try {
        // 从 group 中获取 article_id
        const article_id = group.article_id;
        console.log('article_id to ban:', article_id);

        // 由于您需要传递 article_ban 为 true，我们设置 article_ban 参数为 true
        const article_ban = true; // 这里设置为 true，表示封禁文章

        // 调用 API 进行封禁操作，假设 API 需要 article_id 和 article_ban 参数
        await articleBan(article_id, article_ban);
        this.$message.success("封禁帖子成功");
        console.log('文章封禁成功');

        // 封禁当前帖子后，重新获取数据
        this.fetchComplaintData();
        console.log('Updated complaint data:', this.complaintData);

      } catch (error) {
        // 错误逻辑处理
        console.error("封禁帖子失败", error);
        this.$message.error("封禁帖子失败");
      }
    },
    showDialog(article) {
      this.articleDetail = null;
      const data = {
        article_id: article.article_id,
        username: this.username // 直接使用 this.username
      };
      console.log("Sending data for getArticleDetail:", data);
      getArticleDetail(article.article_id, this.username).then(response => {
        console.log(data);
        if (response.code === 200) {
          this.articleDetail = response.data.article_content;
          this.dialogVisible = true;
          console.log("Article detail retrieved:", this.articleDetail);
        } else {
          this.$message.error('获取文章详情失败');
        }
      }).catch(error => {
        console.error('请求文章详情失败:', error);
        this.$message.error('请求文章详情失败');
      });
    },

    // getComplaintData() {
    //   return new Promise(resolve => {
    //     setTimeout(() => {
    //       resolve(
    //         this.data ={ data: [
    //           { 
    //             article_id: '1',
    //             title: '这是一篇关于Vue的文章',
    //             report_content: [
    //               { id: '1', report_time: '2024-08-01', report_msg: '内容不实' },
    //               { id: '2', report_time: '2024-08-02', report_msg: '观点偏颇' },
    //             ],
    //           },
    //           {
    //             article_id: '2',
    //             title: 'Element UI的使用技巧',
    //             report_content: [
    //               { id: '3', report_time: '2024-08-03', report_msg: '指导不清晰' },
    //             ],
    //           },
    //           // 可以添加更多模拟数据
    //         ],
    //         totalCount: 20, // 模拟总条目数
    //       });
    //     }, 1000);
    //   });
    // },
  },
};
</script>

<style scoped>
.title-ellipsis {
  display: inline-block;
  max-width: 22%;
  /* 根据需要调整最大宽度 */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.complaint-mailbox {
  padding: 20px;
}

.mailbox-card {
  margin-bottom: 20px;
}

.complaint-groups {
  margin-top: 20px;
}

.complaint-group {
  border-bottom: 1px solid #ebeef5;
  padding-bottom: 10px;
  margin-bottom: 20px;
}

.article-title {
  font-weight: bold;
  margin-bottom: 10px;
}

.report_content-list {
  margin-bottom: 10px;
}

.complaint-info {
  display: flex;
  flex-direction: column;
  /* 垂直排列子元素 */
  justify-content: space-between;
  /* 调整空间分配 */
  margin-top: 5px;
  padding: 5px 0;
  /* 添加内边距 */
}

.complaint-time,
.complaint-reason {
  margin-left: 0;
  /* 移除左边距 */
  white-space: nowrap;
  /* 防止文本换行 */
}

.report_content-list {
  display: flex;
  flex-wrap: wrap;
  /* 允许换行 */
  margin-bottom: -10px;
  /* 调整外边距以适应列表项的内边距 */
}

.complaint-group {
  padding-bottom: 20px;
  /* 适当增加底部间距 */
}

.article-title {
  margin-bottom: 10px;
  /* 适当增加底部间距 */
}

.complaint-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
}

.mailbox-footer {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
</style>