(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[6],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./src/views/articlemanagement/index.vue?vue&type=script&lang=js&":
/*!******************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--2!./node_modules/vue-loader/lib??vue-loader-options!./src/views/articlemanagement/index.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = __webpack_require__(/*! babel-runtime/core-js/promise */ "./node_modules/babel-runtime/core-js/promise.js");

var _promise2 = _interopRequireDefault(_promise);

var _regenerator = __webpack_require__(/*! babel-runtime/regenerator */ "./node_modules/babel-runtime/regenerator/index.js");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(/*! babel-runtime/helpers/asyncToGenerator */ "./node_modules/babel-runtime/helpers/asyncToGenerator.js");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _article = __webpack_require__(/*! ../../api/article */ "./src/api/article.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: "articlemanagement",
  data: function data() {
    return {
      searchForm: {
        publishTime: [], // 发布时间范围
        article_ban: false, // 是否被封禁，可以是 'true'、'false' 或 ''（未选择）
        name: '' // 发布人
      },
      currentPage: 1,
      pageSize: 10,
      totalPosts: 0,
      postList: [],
      dialogVisible: false, // 控制弹窗的显示
      articleDetail: null, // 用于存储帖子详情
      sort: 'created_at', // 默认排序属性
      order: 'desc', // 默认排序顺序
      topic: '',
      key_words: ""
    };
  },

  computed: {
    // 根据当前页和页面大小计算当前页的帖子列表
    currentPosts: function currentPosts() {
      var startIndex = (this.currentPage - 1) * this.pageSize;
      var endIndex = startIndex + this.pageSize;
      return this.allPosts.slice(startIndex, endIndex);
    }
  },
  created: function created() {
    // 调用 handleSearch 而不是 fetchPosts
    this.handleSearch();
  },

  methods: {
    fetchPosts: function fetchPosts(postData) {
      var _this = this;

      return (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
        var response;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return (0, _article.getArticleList)(postData);

              case 3:
                response = _context.sent;

                console.log("我是帖子列表L:", response);

                if (!(response && response.code === 200)) {
                  _context.next = 9;
                  break;
                }

                _this.updatePostList(response.data);
                _context.next = 10;
                break;

              case 9:
                throw new Error('API request failed with code: ' + response.code);

              case 10:
                _context.next = 18;
                break;

              case 12:
                _context.prev = 12;
                _context.t0 = _context["catch"](0);

                console.error('Error fetching posts:', _context.t0);
                _this.$message.error('获取帖子列表失败');
                _this.postList = [];
                _this.totalPosts = 0;

              case 18:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, _this, [[0, 12]]);
      }))();
    },
    updatePostList: function updatePostList(data) {
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
    showArticleDetail: function showArticleDetail(row) {
      var _this2 = this;

      return (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
        var response;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;

                console.log('我是row', row);
                _context2.next = 4;
                return (0, _article.getArticleDetail)(row.article_id, row.username);

              case 4:
                response = _context2.sent;

                console.log('我是response', response);
                console.log(row.article_id);

                if (!(response && response.code === 200)) {
                  _context2.next = 12;
                  break;
                }

                // 保存帖子详情到组件的数据属性
                _this2.articleDetail = response.data;
                // 显示弹窗
                _this2.dialogVisible = true;
                _context2.next = 13;
                break;

              case 12:
                throw new Error('API request failed with code: ' + response.code);

              case 13:
                _context2.next = 20;
                break;

              case 15:
                _context2.prev = 15;
                _context2.t0 = _context2["catch"](0);

                console.error('Error fetching article detail:', _context2.t0);
                _this2.$message.error('获取帖子详情失败');
                // 隐藏弹窗以防错误数据展示
                _this2.dialogVisible = false;

              case 20:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, _this2, [[0, 15]]);
      }))();
    },
    getPostsFromAPI: function getPostsFromAPI() {
      var _this3 = this;

      // 这里应该是调用API获取帖子数据的逻辑
      // 模拟异步API请求
      return new _promise2.default(function (resolve) {
        setTimeout(function () {
          resolve(_this3.allPosts); // 使用data属性模拟从API获取的数据
        }, 1000);
      });
    },

    // 修改handleSearch方法以使用postData对象
    handleSearch: function handleSearch() {
      // 构建请求参数对象
      var postData = {
        page: this.currentPage, // 当前页码
        limit: this.pageSize, // 每页条目数
        sort: this.sort, // 排序字段
        order: this.order, // 排序顺序
        // 以下字段根据需要进行赋值，如果用户没有输入，则留空或设置为默认值
        start_at: this.searchForm.publishTime[0] || '',
        end_at: this.searchForm.publishTime[1] || '',
        topic: '', // 假设没有提供话题筛选，留空
        key_words: '', // 假设没有提供关键词筛选，留空
        name: this.searchForm.name, // 发布人名称
        article_ban: this.searchForm.article_ban === '' ? undefined : this.searchForm.article_ban // 如果是空字符串，则不发送该字段
      };
      // 使用 fetchPosts 方法发送请求，并传递 postData 对象
      this.fetchPosts(postData);
    },
    handleReset: function handleReset() {
      this.searchForm = {
        publishTime: [], // 重置发布时间范围
        article_ban: false, // 重置是否被封禁选项
        name: '' // 重置发布人
      };
      this.sort = 'created_at'; // 重置默认排序属性
      this.order = 'desc'; // 重置默认排序顺序

      // 重置搜索，发送默认参数
      this.fetchPosts({
        page: this.currentPage,
        limit: this.pageSize,
        sort: this.sort,
        order: this.order,
        article_ban: this.searchForm.article_ban // 传递正确的 article_ban 值
        // 其他字段使用默认值或空字符串
      });
    },

    // 封禁帖子
    handleBan: function handleBan(row) {
      var _this4 = this;

      return (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3() {
        var article_id, article_ban;
        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                console.log('封禁帖子:', row);
                _context3.prev = 1;
                article_id = row.article_id;
                // 假设 row.article_ban 已经是布尔值，如果不是，需要转换

                article_ban = row.article_ban === true ? true : false;
                _context3.next = 6;
                return (0, _article.articleBan)(article_id, article_ban);

              case 6:
                _this4.$message.success("封禁帖子成功");
                // 封禁当前帖子后，重新获取当前页面的数据
                _this4.fetchPosts({
                  page: _this4.currentPage,
                  limit: _this4.pageSize,
                  sort: _this4.sort,
                  order: _this4.order
                });
                _context3.next = 14;
                break;

              case 10:
                _context3.prev = 10;
                _context3.t0 = _context3["catch"](1);

                console.error("封禁帖子失败", _context3.t0);
                _this4.$message.error("封禁帖子失败");

              case 14:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, _this4, [[1, 10]]);
      }))();
    },

    // 删除帖子的方法
    handleDel: function handleDel(row) {
      var _this5 = this;

      return (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4() {
        var article_id;
        return _regenerator2.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                console.log('删除帖子:', row);
                _context4.prev = 1;
                article_id = row.article_id;
                _context4.next = 5;
                return (0, _article.deleteArticle)(article_id);

              case 5:
                _this5.$message.success("删除帖子成功");
                // 删除当前帖子后，重新获取当前页面的数据
                _this5.fetchPosts({
                  page: _this5.currentPage,
                  limit: _this5.pageSize,
                  sort: _this5.sort,
                  order: _this5.order
                });
                _context4.next = 13;
                break;

              case 9:
                _context4.prev = 9;
                _context4.t0 = _context4["catch"](1);

                console.error('删除帖子失败', _context4.t0);
                _this5.$message.error("删除帖子失败");

              case 13:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, _this5, [[1, 9]]);
      }))();
    },
    handleSizeChange: function handleSizeChange(newSize) {
      this.pageSize = newSize;
      this.currentPage = 1; // 改变每页条目数时，重置当前页为第一页
      this.fetchPosts({
        page: this.currentPage,
        limit: this.pageSize,
        sort: this.sort,
        order: this.order
      });
    },
    handleCurrentChange: function handleCurrentChange(newPage) {
      this.currentPage = newPage;
      this.fetchPosts({
        page: this.currentPage,
        limit: this.pageSize,
        sort: this.sort,
        order: this.order
      });
    },

    // 更改排序状态并重新获取数据
    changeSort: function changeSort(property) {
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
        order: this.order
      });
    }
  }
}; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/***/ }),

/***/ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./src/views/articlemanagement/index.vue?vue&type=style&index=0&id=d924c45c&scoped=true&lang=css&":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader??ref--7-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/lib??ref--7-2!./node_modules/vue-loader/lib??vue-loader-options!./src/views/articlemanagement/index.vue?vue&type=style&index=0&id=d924c45c&scoped=true&lang=css& ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\n.post-management[data-v-d924c45c] {\r\n\r\n  padding: 20px;\n}\n.search-bar[data-v-d924c45c] {\r\n  margin-bottom: 20px;\r\n  display: -webkit-box;\r\n  display: -ms-flexbox;\r\n  display: flex;\r\n  -webkit-box-align: center;\r\n      -ms-flex-align: center;\r\n          align-items: center;\n}\n.search-bar .el-input[data-v-d924c45c] {\r\n  margin-right: 10px;\n}\n.pagination[data-v-d924c45c] {\r\n  margin-top: 20px;\r\n  text-align: right;\n}\r\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/views/articlemanagement/index.vue?vue&type=template&id=d924c45c&scoped=true&":
/*!************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/views/articlemanagement/index.vue?vue&type=template&id=d924c45c&scoped=true& ***!
  \************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "post-management" },
    [
      _c(
        "div",
        { staticClass: "search-bar" },
        [
          _c(
            "el-form",
            {
              staticClass: "demo-form-inline",
              attrs: { inline: true, model: _vm.searchForm }
            },
            [
              _c(
                "el-form-item",
                { attrs: { label: "发布时间" } },
                [
                  _c("el-date-picker", {
                    attrs: {
                      type: "daterange",
                      "range-separator": "至",
                      "start-placeholder": "开始时间",
                      "end-placeholder": "结束时间"
                    },
                    model: {
                      value: _vm.searchForm.publishTime,
                      callback: function($$v) {
                        _vm.$set(_vm.searchForm, "publishTime", $$v)
                      },
                      expression: "searchForm.publishTime"
                    }
                  })
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "el-form-item",
                { attrs: { label: "是否被封禁" } },
                [
                  _c(
                    "el-select",
                    {
                      attrs: { placeholder: "请选择" },
                      model: {
                        value: _vm.searchForm.article_ban,
                        callback: function($$v) {
                          _vm.$set(_vm.searchForm, "article_ban", $$v)
                        },
                        expression: "searchForm.article_ban"
                      }
                    },
                    [
                      _c("el-option", {
                        attrs: { label: "请选择", value: "" }
                      }),
                      _vm._v(" "),
                      _c("el-option", {
                        attrs: { label: "封禁", value: true }
                      }),
                      _vm._v(" "),
                      _c("el-option", {
                        attrs: { label: "正常", value: false }
                      })
                    ],
                    1
                  )
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "el-form-item",
                { attrs: { label: "发布人" } },
                [
                  _c("el-input", {
                    attrs: { placeholder: "请输入发布人" },
                    model: {
                      value: _vm.searchForm.name,
                      callback: function($$v) {
                        _vm.$set(_vm.searchForm, "name", $$v)
                      },
                      expression: "searchForm.name"
                    }
                  })
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "el-form-item",
                [
                  _c(
                    "el-button",
                    {
                      attrs: { type: "primary" },
                      on: { click: _vm.handleSearch }
                    },
                    [_vm._v("搜索")]
                  ),
                  _vm._v(" "),
                  _c("el-button", { on: { click: _vm.handleReset } }, [
                    _vm._v("重置")
                  ])
                ],
                1
              )
            ],
            1
          )
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "el-table",
        {
          staticStyle: { width: "100%" },
          attrs: { data: _vm.postList },
          on: { "sort-change": _vm.changeSort }
        },
        [
          _c("el-table-column", {
            attrs: { prop: "article_id", label: "帖子ID", width: "120" }
          }),
          _vm._v(" "),
          _c("el-table-column", {
            attrs: { prop: "article_content", label: "帖子内容" }
          }),
          _vm._v(" "),
          _c("el-table-column", {
            attrs: { prop: "article_ban", label: "状态" },
            scopedSlots: _vm._u([
              {
                key: "default",
                fn: function(ref) {
                  var row = ref.row
                  return [
                    row.article_ban === true
                      ? _c("span", [_vm._v("封禁")])
                      : _c("span", [_vm._v("正常")])
                  ]
                }
              }
            ])
          }),
          _vm._v(" "),
          _c("el-table-column", {
            attrs: { prop: "upvote_amount", label: "点赞数", sortable: "true" }
          }),
          _vm._v(" "),
          _c("el-table-column", {
            attrs: { prop: "comment_amount", label: "收藏数", sortable: "true" }
          }),
          _vm._v(" "),
          _c("el-table-column", { attrs: { prop: "name", label: " 发布人" } }),
          _vm._v(" "),
          _c("el-table-column", {
            attrs: { prop: "created_at", label: "发布时间", sortable: "true" }
          }),
          _vm._v(" "),
          _c("el-table-column", {
            attrs: { label: "操作" },
            scopedSlots: _vm._u([
              {
                key: "default",
                fn: function(scope) {
                  return [
                    _c(
                      "el-button",
                      {
                        attrs: { type: "text" },
                        on: {
                          click: function($event) {
                            return _vm.handleBan(scope.row)
                          }
                        }
                      },
                      [_vm._v("封禁")]
                    ),
                    _vm._v(" "),
                    _c(
                      "el-button",
                      {
                        attrs: { type: "text" },
                        on: {
                          click: function($event) {
                            return _vm.handleDel(scope.row)
                          }
                        }
                      },
                      [_vm._v("删除")]
                    ),
                    _vm._v(" "),
                    _c(
                      "el-button",
                      {
                        attrs: { type: "text" },
                        on: {
                          click: function($event) {
                            return _vm.showArticleDetail(scope.row)
                          }
                        }
                      },
                      [_vm._v("查看详情")]
                    )
                  ]
                }
              }
            ])
          })
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "el-dialog",
        {
          attrs: {
            title: "帖子详情",
            visible: _vm.dialogVisible,
            "modal-append-to-body": false,
            "append-to-body": true
          },
          on: {
            "update:visible": function($event) {
              _vm.dialogVisible = $event
            }
          },
          model: {
            value: _vm.dialogVisible,
            callback: function($$v) {
              _vm.dialogVisible = $$v
            },
            expression: "dialogVisible"
          }
        },
        [
          _vm.articleDetail
            ? _c("div", [
                _c(
                  "p",
                  _vm._l(_vm.articleDetail.article_tags, function(tag, index) {
                    return _c(
                      "span",
                      { key: index, staticClass: "tag-style" },
                      [
                        _vm._v("\n          " + _vm._s(tag) + "\n          "),
                        _vm._v(" "),
                        index < _vm.articleDetail.article_tags.length - 1
                          ? _c("span", [_vm._v(", ")])
                          : _vm._e()
                      ]
                    )
                  }),
                  0
                ),
                _vm._v(" "),
                _c("p", [
                  _vm._v(
                    "帖子内容: " +
                      _vm._s(_vm.articleDetail.article_content.article_text)
                  )
                ])
              ])
            : _vm._e()
        ]
      ),
      _vm._v(" "),
      _c(
        "div",
        { staticClass: "pagination" },
        [
          _c("el-pagination", {
            attrs: {
              "current-page": _vm.currentPage,
              "page-size": _vm.pageSize,
              layout: "total, sizes, prev, pager, next, jumper",
              total: _vm.totalPosts
            },
            on: {
              "size-change": _vm.handleSizeChange,
              "current-change": _vm.handleCurrentChange
            }
          })
        ],
        1
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./src/views/articlemanagement/index.vue?vue&type=style&index=0&id=d924c45c&scoped=true&lang=css&":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-style-loader!./node_modules/css-loader??ref--7-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/lib??ref--7-2!./node_modules/vue-loader/lib??vue-loader-options!./src/views/articlemanagement/index.vue?vue&type=style&index=0&id=d924c45c&scoped=true&lang=css& ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../../node_modules/css-loader??ref--7-1!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/postcss-loader/lib??ref--7-2!../../../node_modules/vue-loader/lib??vue-loader-options!./index.vue?vue&type=style&index=0&id=d924c45c&scoped=true&lang=css& */ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./src/views/articlemanagement/index.vue?vue&type=style&index=0&id=d924c45c&scoped=true&lang=css&");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(/*! ../../../node_modules/vue-style-loader/lib/addStylesClient.js */ "./node_modules/vue-style-loader/lib/addStylesClient.js").default
var update = add("a29b156a", content, false, {});
// Hot Module Replacement
if(true) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept(/*! !../../../node_modules/css-loader??ref--7-1!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/postcss-loader/lib??ref--7-2!../../../node_modules/vue-loader/lib??vue-loader-options!./index.vue?vue&type=style&index=0&id=d924c45c&scoped=true&lang=css& */ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./src/views/articlemanagement/index.vue?vue&type=style&index=0&id=d924c45c&scoped=true&lang=css&", function() {
     var newContent = __webpack_require__(/*! !../../../node_modules/css-loader??ref--7-1!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/postcss-loader/lib??ref--7-2!../../../node_modules/vue-loader/lib??vue-loader-options!./index.vue?vue&type=style&index=0&id=d924c45c&scoped=true&lang=css& */ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./src/views/articlemanagement/index.vue?vue&type=style&index=0&id=d924c45c&scoped=true&lang=css&");
     if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./src/api/article.js":
/*!****************************!*\
  !*** ./src/api/article.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getArticleList = getArticleList;
exports.getArticleDetail = getArticleDetail;
exports.deleteArticle = deleteArticle;
exports.articleBan = articleBan;

var _request = __webpack_require__(/*! ../utils/request */ "./src/utils/request.js");

var _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 获取帖子列表
function getArticleList(data) {
  return (0, _request2.default)({
    url: "/article/list",
    method: "post",
    data: data
  });
}

// 获取帖子详情
function getArticleDetail(article_id, username) {
  return (0, _request2.default)({
    url: "/article/content",
    method: "post",
    data: {
      article_id: article_id,
      username: username
    }
  });
}

// 删除帖子
function deleteArticle(id) {
  var data = { article_id: id };
  return (0, _request2.default)({
    url: "/article/delete",
    method: "post",
    data: data
  });
}

// 封禁帖子
function articleBan(article_id, article_ban) {
  return (0, _request2.default)({
    url: "/article/ban",
    method: "post",
    data: {
      article_id: article_id,
      article_ban: article_ban
    }
  });
}

/***/ }),

/***/ "./src/views/articlemanagement/index.vue":
/*!***********************************************!*\
  !*** ./src/views/articlemanagement/index.vue ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _index_vue_vue_type_template_id_d924c45c_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.vue?vue&type=template&id=d924c45c&scoped=true& */ "./src/views/articlemanagement/index.vue?vue&type=template&id=d924c45c&scoped=true&");
/* harmony import */ var _index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.vue?vue&type=script&lang=js& */ "./src/views/articlemanagement/index.vue?vue&type=script&lang=js&");
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _index_vue_vue_type_style_index_0_id_d924c45c_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./index.vue?vue&type=style&index=0&id=d924c45c&scoped=true&lang=css& */ "./src/views/articlemanagement/index.vue?vue&type=style&index=0&id=d924c45c&scoped=true&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _index_vue_vue_type_template_id_d924c45c_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _index_vue_vue_type_template_id_d924c45c_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "d924c45c",
  null
  
)

/* hot reload */
if (true) {
  var api = __webpack_require__(/*! ./node_modules/vue-hot-reload-api/dist/index.js */ "./node_modules/vue-hot-reload-api/dist/index.js")
  api.install(__webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm.js"))
  if (api.compatible) {
    module.hot.accept()
    if (!module.hot.data) {
      api.createRecord('d924c45c', component.options)
    } else {
      api.reload('d924c45c', component.options)
    }
    module.hot.accept(/*! ./index.vue?vue&type=template&id=d924c45c&scoped=true& */ "./src/views/articlemanagement/index.vue?vue&type=template&id=d924c45c&scoped=true&", function(__WEBPACK_OUTDATED_DEPENDENCIES__) { /* harmony import */ _index_vue_vue_type_template_id_d924c45c_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.vue?vue&type=template&id=d924c45c&scoped=true& */ "./src/views/articlemanagement/index.vue?vue&type=template&id=d924c45c&scoped=true&");
(function () {
      api.rerender('d924c45c', {
        render: _index_vue_vue_type_template_id_d924c45c_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
        staticRenderFns: _index_vue_vue_type_template_id_d924c45c_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]
      })
    })(__WEBPACK_OUTDATED_DEPENDENCIES__); })
  }
}
component.options.__file = "src\\views\\articlemanagement\\index.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./src/views/articlemanagement/index.vue?vue&type=script&lang=js&":
/*!************************************************************************!*\
  !*** ./src/views/articlemanagement/index.vue?vue&type=script&lang=js& ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_2_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib??ref--2!../../../node_modules/vue-loader/lib??vue-loader-options!./index.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./src/views/articlemanagement/index.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_2_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_babel_loader_lib_index_js_ref_2_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_babel_loader_lib_index_js_ref_2_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_babel_loader_lib_index_js_ref_2_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_2_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./src/views/articlemanagement/index.vue?vue&type=style&index=0&id=d924c45c&scoped=true&lang=css&":
/*!********************************************************************************************************!*\
  !*** ./src/views/articlemanagement/index.vue?vue&type=style&index=0&id=d924c45c&scoped=true&lang=css& ***!
  \********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_index_js_ref_7_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_7_2_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_d924c45c_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-style-loader!../../../node_modules/css-loader??ref--7-1!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/postcss-loader/lib??ref--7-2!../../../node_modules/vue-loader/lib??vue-loader-options!./index.vue?vue&type=style&index=0&id=d924c45c&scoped=true&lang=css& */ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./src/views/articlemanagement/index.vue?vue&type=style&index=0&id=d924c45c&scoped=true&lang=css&");
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_index_js_ref_7_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_7_2_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_d924c45c_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_node_modules_css_loader_index_js_ref_7_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_7_2_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_d924c45c_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_node_modules_css_loader_index_js_ref_7_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_7_2_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_d924c45c_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_node_modules_css_loader_index_js_ref_7_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_7_2_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_d924c45c_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_style_loader_index_js_node_modules_css_loader_index_js_ref_7_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_7_2_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_d924c45c_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./src/views/articlemanagement/index.vue?vue&type=template&id=d924c45c&scoped=true&":
/*!******************************************************************************************!*\
  !*** ./src/views/articlemanagement/index.vue?vue&type=template&id=d924c45c&scoped=true& ***!
  \******************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_template_id_d924c45c_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib??vue-loader-options!./index.vue?vue&type=template&id=d924c45c&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/views/articlemanagement/index.vue?vue&type=template&id=d924c45c&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_template_id_d924c45c_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_template_id_d924c45c_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);
//# sourceMappingURL=6.js.map