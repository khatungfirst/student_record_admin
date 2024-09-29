<template>
  <div class="post-management">
    <!-- 搜索栏 -->
    <div class="search-bar">
      <el-form :inline="true" :model="searchForm" class="demo-form-inline">
        <el-form-item label="发布时间">
          <el-date-picker v-model="searchForm.publishTime" type="daterange" range-separator="至" start-placeholder="开始时间"
            end-placeholder="结束时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="是否被封禁">
          <el-select v-model="searchForm.article_ban" placeholder="请选择">
            <el-option label="请选择" value></el-option> <!-- 空值用于重置选项 -->
            <el-option label="封禁" :value="true"></el-option> <!-- 使用 :value 绑定布尔值 -->
            <el-option label="正常" :value="false"></el-option> <!-- 使用 :value 绑定布尔值 -->
          </el-select>
        </el-form-item>
        <el-form-item label="发布人">
          <el-input v-model="searchForm.name" placeholder="请输入发布人"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch">搜索</el-button>
          <el-button @click="handleReset">重置</el-button>
          <el-button @click="handleShowAll">{{ showAllText }}</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table :data="postList" style="width: 100%" @sort-change="changeSort">
      <el-table-column prop="article_id" label="帖子ID" width="120"></el-table-column>
      <el-table-column prop="article_content" label="帖子内容" class="content-ellipsis">
        <template v-slot="{ row }">
          <div class="content-ellipsis">{{ row.article_content }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="article_ban" label="状态">
        <template v-slot="{ row }">
          <i :class="row.article_ban ? 'el-icon-lock' : 'el-icon-circle-check'" class="status-icon"></i>
          <span :class="row.article_ban ? 'banned' : 'normal'">
            {{ row.article_ban ? '封禁' : '正常' }}
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="upvote_amount" label="点赞数" sortable="true" order="asc"></el-table-column>
      <el-table-column prop="collect_amount" label="收藏数" sortable="true"></el-table-column>
      <el-table-column prop="name" label=" 发布人"></el-table-column>
      <el-table-column prop="article_quality" label="优秀帖子">
        <template v-slot="{ row }">
          <span v-if="row.article_quality === 0">普通帖子</span>
          <span v-if="row.article_quality === 1">班级优秀帖子</span>
          <span v-if="row.article_quality === 2">年级优秀帖子</span>
          <span v-if="row.article_quality === 3">院级优秀帖子</span>
          <span></span>
        </template>
      </el-table-column>
      <el-table-column prop="created_at" label="发布时间" sortable="true">
        <template slot-scope="scope">
          <span>{{ formatDateTime(scope.row.created_at) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="handleBan(scope.row)">封禁</el-button>
          <el-button type="text" @click="handleDel(scope.row)" class="delete-button">删除</el-button>
          <el-button type="text" @click="showArticleDetail(scope.row)" class="detail-button">查看详情</el-button>
          <el-button type="text" @click="handleSelectExcellent(scope.row)" class="excellent-button">评为优秀帖子</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 弹窗组件：帖子详情 -->
    <el-dialog v-model="dialogDetailVisible" title="帖子详情" :visible.sync="dialogDetailVisible"
      :modal-append-to-body="false" :append-to-body="true">
      <div v-if="articleDetail">
        <p>
          <span v-for="(tag, index) in articleDetail.article_tags" :key="index" class="tag-style">
            {{ tag }}
            <span v-if="index < articleDetail.article_tags.length - 1">, </span>
          </span>
        </p>
        <p>帖子内容: {{ processedContent }}</p>
      </div>
    </el-dialog>
    <!-- 弹窗组件：评为优秀帖子类型选择 -->
    <el-dialog v-model="dialogExcellentVisible" title="选择优秀帖子类型" :visible.sync="dialogExcellentVisible" :modal="false">
      <el-form>
        <el-form-item>
          <el-select v-model="article_quality" placeholder="请选择">
            <el-option v-if="role === 'college' || role === 'superman'" label="院级优秀帖子" :value="3"></el-option>
            <el-option
              v-if="role === 'superman' || role === 'college' || role === 'grade1' || role === 'grade2' || role === 'grade3' || role === 'grade4'"
              label="年级优秀帖子" :value="2"></el-option>
            <el-option
              v-if="role === 'superman' || role === 'college' || role === 'grade1' || role === 'grade2' || role === 'grade3' || role === 'grade4' || role === 'class'"
              label="班级优秀帖子" :value="1"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogExcellentVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSubmit">确定</el-button>
      </div>
    </el-dialog>
    <div class="pagination">
      <el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="pageSize"
        layout="total, prev, pager, next" :total="totalPosts">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { getArticleList, getArticleDetail, deleteArticle, articleBan, ExcellentPost,getGoodArticle } from "../../api/article"
export default {
  name: "articlemanagement",
  data() {
    return {
      searchForm: {
        publishTime: [], // 发布时间范围
        article_ban: false, // 是否被封禁，可以是 'true'、'false' 或 ''（未选择）
        name: ''   // 发布人
      },
      allPostsCurrentPage: 1, // 全部帖子的当前页码
      goodPostsCurrentPage: 1, // 优秀帖子的当前页码
      pageSize: 10, // 每页显示条数
      totalPosts: 0,
      postList: [],
      dialogDetailVisible: false, // 控制帖子详情弹窗的显示
      dialogExcellentVisible: false, // 控制评为优秀帖子弹窗的显示
      articleDetail: null, // 用于存储帖子详情
      sort: 'created_at', // 默认排序属性
      order: 'desc', // 默认排序顺序
      topic:'',
      key_words: "",
      currentSortColumn: 'upvote_amount', // 默认排序列
      article_quality: '请选择',
      role: 'college', 
      showAll: false, // 添加一个用于控制显示全部数据的布尔值
      showAllText: '切换全部数据', // 按钮文字
    };
  },
  computed: {
    // 根据当前页和页面大小计算当前页的帖子列表
    currentPosts() {
      let startIndex = (this.currentPage - 1) * this.pageSize;
      let endIndex = startIndex + this.pageSize;
      return this.allPosts.slice(startIndex, endIndex);
    },
    processedContent() {
      // 使用 DOMParser 移除 HTML 标签，只保留文本内容
      const parser = new DOMParser();
      const doc = parser.parseFromString(this.articleDetail.article_content.article_text, 'text/html');
      return doc.body.textContent || " ";
    }
  },
  created() {
    // 调用 handleSearch 而不是 fetchPosts
    this.fetchPosts({
      page: this.currentPage,
      limit: this.pageSize,
      sort: this.sort,
      order: this.order,
      showAll: this.showAll
    });
    this.currentPage = this.showAll ? this.allPostsCurrentPage : this.goodPostsCurrentPage;
  },
  methods: {
    // 格式化日期时间的方法
    formatDateTime(created_at) {
      const date = new Date(created_at);
      if (isNaN(date.getTime())) {
        console.error('无效的日期:', created_at); // 如果日期无效，输出错误信息
        return '无效的日期';
      }
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, '0'); // 月份从0开始，所以加1
      const day = date.getDate().toString().padStart(2, '0');
      const hours = date.getHours().toString().padStart(2, '0');
      const minutes = date.getMinutes().toString().padStart(2, '0');
      const seconds = date.getSeconds().toString().padStart(2, '0');

      // 构建新的日期时间字符串
      const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`; // 如果需要毫秒，可以加上 .${date.getMilliseconds()}
      return formattedDateTime;
    },
    async fetchPosts(postData) {
      try {
        // 根据某个条件决定调用哪个 API
        console.log(postData,'12334333');
        
        const response = await (postData.showAll ? getArticleList(postData) : getGoodArticle(postData));
        console.log("我是帖子列表L:", response);
        if (response && response.code === 200) {
          this.updatePostList(response.data);
          this.totalPosts = response.data.article_amount;
        } else {
          throw new Error('API request failed with code: ' + response.code);
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
        this.$message.error('获取帖子列表失败');
        this.postList = [];
        this.totalPosts = 0;
      }
    },
    handleShowAll() {
      // 切换 showAll 的布尔值
      this.showAll = !this.showAll;
      this.showAllText = this.showAll ? '切换优秀帖子' : '切换全部数据'; // 更新按钮文字

      // 更新 currentPage 以匹配当前视图的页码
      this.currentPage = this.showAll ? this.allPostsCurrentPage : this.goodPostsCurrentPage;

      // 根据 showAll 的当前值调用相应的方法获取数据
      if (this.showAll) {
        // 如果 showAll 为 true，调用 getArticleList 获取所有帖子数据
        this.fetchPosts({
          page: this.currentPage,
          limit: this.pageSize,
          sort: this.sort,
          order: this.order,
          showAll: this.showAll
        });
      } else {
        // 如果 showAll 为 false，调用 getGoodArticle 获取优秀帖子数据
        this.fetchPosts({
          page: this.currentPage,
          limit: this.pageSize,
          sort: this.sort,
          order: this.order,
          showAll: this.showAll
        });
      }
    },
    updatePostList(data) {
      if (data && Array.isArray(data.list)) {
        this.totalPosts = data.total;
        this.postList = data.list;
      } else {
        // 如果数据结构不正确，可以在这里设置默认值或抛出错误
        console.error('Received data is not in the expected format:', data);
        this.postList = [];
        this.totalPosts = 0;
      }
    },
    // 查看文章详情的方法
    async showArticleDetail(row) {
      try {
        console.log('我是row', row);
        const response = await getArticleDetail(row.article_id, row.username);
        console.log('我是response', response);
        console.log(row.article_id);
        if (response && response.code === 200) {
          // 保存帖子详情到组件的数据属性
          this.articleDetail = response.data;
          console.log(this.articleDetail,"articleDetail");
          // 显示弹窗
          this.dialogDetailVisible = true;
          console.log(this.dialogDetailVisible);
        } else {
          throw new Error('API request failed with code: ' + response.code);
        }
      } catch (error) {
        console.error('Error fetching article detail:', error);
        this.$message.error('获取帖子详情失败');
        // 隐藏弹窗以防错误数据展示
        this.dialogDetailVisible = false;
      }
    },
    handleSelectExcellent(row) {
      this.article_id = row.article_id;
      this.dialogExcellentVisible = true;
    },
    handleSubmit() {
      this.dialogExcellentVisible = false;
      const data = {
        article_id : this.article_id,
        article_quality:  Number(this.article_quality) // 转换为数字
      };
      ExcellentPost(data).then(response => {
        if(response.code === 200) {
          this.$message.success('评为优秀帖子成功');
          this.fetchPosts({
            page: this.currentPage,
            limit: this.pageSize,
            sort: this.sort,
            order: this.order
          });
        } else {
          this.$message.error('操作失败');
        }
      }).catch(error => {
        console.log('Error:', error);
        this.$message.error('操作失败')
      });
    },
    getPostsFromAPI() {
      // 这里应该是调用API获取帖子数据的逻辑
      // 模拟异步API请求
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(this.allPosts); // 使用data属性模拟从API获取的数据
        }, 1000);
      });
    },
    // 修改handleSearch方法以使用postData对象
    handleSearch() {
      // 构建请求参数对象
      let postData = {
        page: this.currentPage,       // 当前页码
        limit: this.pageSize,         // 每页条目数
        sort: this.sort,              // 排序字段
        order: this.order,            // 排序顺序
        // 以下字段根据需要进行赋值，如果用户没有输入，则留空或设置为默认值
        start_at: this.searchForm.publishTime[0] || '',
        end_at: this.searchForm.publishTime[1] || '',
        topic: '',                   // 假设没有提供话题筛选，留空
        key_words: '',               // 假设没有提供关键词筛选，留空
        name: this.searchForm.name,   // 发布人名称
        article_ban: this.searchForm.article_ban === '' ? undefined : this.searchForm.article_ban, // 如果是空字符串，则不发送该字段
        showAll: this.showAll
      };
      // 使用 fetchPosts 方法发送请求，并传递 postData 对象
      this.fetchPosts(postData);
    },

    handleReset() {
      this.searchForm = {
        publishTime: [], // 重置发布时间范围
        article_ban: false, // 重置是否被封禁选项
        name: ''    // 重置发布人
      };
      this.sort = 'created_at'; // 重置默认排序属性
      this.order = 'desc'; // 重置默认排序顺序
      this.showAll = false; // 重置 showAll 为 false
      // 重置搜索，发送默认参数
      this.fetchPosts({
        page: this.currentPage,
        limit: this.pageSize,
        sort: this.sort,
        order: this.order,
        showAll: this.showAll,
        article_ban: this.searchForm.article_ban, // 传递正确的 article_ban 值
        // 其他字段使用默认值或空字符串
      });
    },
    // 封禁帖子
    async handleBan(row) {
      console.log('封禁帖子:', row);
      try {
        const article_id = row.article_id;
        // 假设 row.article_ban 已经是布尔值，如果不是，需要转换
        const article_ban = row.article_ban === true ? true : false;
        await articleBan(article_id, article_ban);
        this.$message.success("封禁帖子成功");
        // 封禁当前帖子后，重新获取当前页面的数据
        this.fetchPosts({
          page: this.currentPage,
          limit: this.pageSize,
          sort: this.sort,
          order: this.order,
        });
      } catch (error) {
        console.error("封禁帖子失败", error);
        this.$message.error("封禁帖子失败");
      }
    },
    // 删除帖子的方法
    async handleDel(row) {
      console.log('删除帖子:', row);
      try {
        const article_id = row.article_id;
        await deleteArticle(article_id);
        this.$message.success("删除帖子成功");
        // 删除当前帖子后，重新获取当前页面的数据
        this.fetchPosts({
          page: this.currentPage,
          limit: this.pageSize,
          sort: this.sort,
          order: this.order,
        });
      } catch (error) {
        console.error('删除帖子失败', error);
        this.$message.error("删除帖子失败");
      }
    },
    handleSizeChange(newSize) {
      this.pageSize = newSize;
      this.currentPage = 1; // 改变每页条目数时，重置当前页为第一页
      this.fetchPosts({
        page: this.currentPage,
        limit: this.pageSize,
        sort: this.sort,
        order: this.order,
      });
    },
    handleCurrentChange(newPage) {
      if (this.showAll) {
        this.allPostsCurrentPage = newPage;
      } else {
        this.goodPostsCurrentPage = newPage;
      }
      this.currentPage = newPage;
      this.fetchPosts({
        page: this.currentPage,
        limit: this.pageSize,
        sort: this.sort,
        order: this.order,
        showAll: this.showAll
        // 其他搜索参数
      });
    },
    handleSortChange(property) {
      this.currentSortColumn = property;
      this.changeSort(property);
    },
    // 更改排序状态并重新获取数据
    changeSort({ prop, order }) {
      // 根据点击的列更新 sort 属性
      let sortField = 'created_at'; // 默认排序字段
      switch (prop) {
        case "upvote_amount":
          sortField = "like_amount";
          break;
        case "collect_amount":
          sortField = "collect_amount";
          break;
        case "created_at":
          sortField = "created_at";
          break;
        // 如果需要，可以添加更多 case
      }

      // 更新排序字段
      this.sort = sortField;

      // 根据排序方向更新 order
      this.order = order === "ascending" ? "asc" : order === "descending" ? "desc" : "asc";

      // 重新获取数据
      this.fetchPosts({
        page: this.currentPage,
        limit: this.pageSize,
        sort: this.sort,
        order: this.order,
      });
    },
  },
};

</script>

<style scoped>
.post-management {

  padding: 20px;

}

.search-bar {
  margin-bottom: 20px;
  display: flex;
  align-items: center;
}

.search-bar .el-input {
  margin-right: 10px;
}

.pagination {
  margin-top: 20px;
  text-align: right;
}

.content-ellipsis {
  max-width: 82%;
  /* 根据需要调整最大宽度 */
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.status-icon {
  margin-right: 5px;
  /* 图标和文本之间的间距 */
}

.banned {
  color: #b63636;
  /* 封禁状态的文本颜色 */
}

.normal {
  color: rgb(71, 150, 112);
  /* 正常状态的文本颜色 */
}

.delete-button {
  color: #b63636;
  /* 设置文字颜色 */
}

.detail-button {
  color: rgb(71, 150, 112);
}
</style>