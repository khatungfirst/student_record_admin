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
        </el-form-item>
      </el-form>
    </div>
    <el-table :data="postList" style="width: 100%" @sort-change="changeSort">
      <el-table-column prop="article_id" label="帖子ID" width="120"></el-table-column>
      <el-table-column prop="article_content" label="帖子内容"></el-table-column>
      <el-table-column prop="article_ban" label="状态">
        <!-- 自定义列结构 -->
        <template v-slot="{ row }">
          <!-- 根据row的article_ban的不同状态来显示不同的文本 -->
          <span v-if="row.article_ban === true">封禁</span>
          <span v-else>正常</span>
        </template>
      </el-table-column>
      <el-table-column prop="upvote_amount" label="点赞数" sortable="true"></el-table-column>
      <el-table-column prop="comment_amount" label="收藏数" sortable="true"></el-table-column>
      <el-table-column prop="name" label=" 发布人"></el-table-column>
      <el-table-column prop="created_at" label="发布时间" sortable="true"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="handleBan(scope.row)">封禁</el-button>
          <el-button type="text" @click="handleDel(scope.row)">删除</el-button>
          <el-button type="text" @click="showArticleDetail(scope.row)">查看详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 弹窗组件 -->
    <el-dialog v-model="dialogVisible" title="帖子详情" :visible.sync="dialogVisible">
      <div v-if="articleDetail">
        <p>
          <!-- 使用 v-for 指令遍历 article_tags 数组 -->
          <span v-for="(tag, index) in articleDetail.article_tags" :key="index" class="tag-style">
            {{ tag }}
            <!-- 如果不是最后一个元素，添加一个逗号 -->
            <span v-if="index < articleDetail.article_tags.length - 1">, </span>
          </span>
        </p>
        <p>帖子内容: {{ articleDetail.article_content.article_text }}</p>
        <!-- 这里可以添加更多的帖子详情展示 -->
      </div>
    </el-dialog>
    <div class="pagination">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
        :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalPosts">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { getArticleList, getArticleDetail, deleteArticle, articleBan } from "../../api/article"
export default {
  name: "articlemanagement",
  data() {
    return {
      searchForm: {
        publishTime: [], // 发布时间范围
        article_ban: false, // 是否被封禁，可以是 'true'、'false' 或 ''（未选择）
        name: ''   // 发布人
      },
      currentPage: 1,
      pageSize: 10,
      totalPosts: 0,
      postList: [],
      dialogVisible: false, // 控制弹窗的显示
      articleDetail: null, // 用于存储帖子详情
      sort: 'created_at', // 默认排序属性
      order: 'desc', // 默认排序顺序
      topic:'',
      key_words: "",
    };
  },
  computed: {
    // 根据当前页和页面大小计算当前页的帖子列表
    currentPosts() {
      let startIndex = (this.currentPage - 1) * this.pageSize;
      let endIndex = startIndex + this.pageSize;
      return this.allPosts.slice(startIndex, endIndex);
    }
  },
  created() {
    // 调用 handleSearch 而不是 fetchPosts
    this.handleSearch();
  },
  methods: {
    async fetchPosts(postData) {
      try {
        const response = await getArticleList(postData);
        console.log("我是帖子列表L:", response);
        if (response && response.code === 200) {
          this.updatePostList(response.data);
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
        console.log('我是row',row);
        const response = await getArticleDetail(row.article_id, row.username);
        console.log('我是response', response);
        console.log(row.article_id);
        if (response && response.code === 200) {
          // 保存帖子详情到组件的数据属性
          this.articleDetail = response.data;
          // 显示弹窗
          this.dialogVisible = true;
        } else {
          throw new Error('API request failed with code: ' + response.code);
        }
      } catch (error) {
        console.error('Error fetching article detail:', error);
        this.$message.error('获取帖子详情失败');
        // 隐藏弹窗以防错误数据展示
        this.dialogVisible = false;
      }
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

      // 重置搜索，发送默认参数
      this.fetchPosts({
        page: this.currentPage,
        limit: this.pageSize,
        sort: this.sort,
        order: this.order,
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
      this.currentPage = newPage;
      this.fetchPosts({
        page: this.currentPage,
        limit: this.pageSize,
        sort: this.sort,
        order: this.order,
      });
    },
    // 更改排序状态并重新获取数据
    changeSort(property) {
      if (this.sort === property) {
        this.order = this.order === 'asc' ? 'desc' : 'asc';
      } else {
        this.sort = property;
        this.order = 'asc'; // 设置默认排序顺序
      }
      // 使用当前页和页面大小重新获取数据
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
</style>