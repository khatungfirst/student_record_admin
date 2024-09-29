(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[7],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./src/views/mailbox/index.vue?vue&type=script&lang=js&":
/*!********************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--2!./node_modules/vue-loader/lib??vue-loader-options!./src/views/mailbox/index.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _values = __webpack_require__(/*! babel-runtime/core-js/object/values */ "./node_modules/babel-runtime/core-js/object/values.js");

var _values2 = _interopRequireDefault(_values);

var _toConsumableArray2 = __webpack_require__(/*! babel-runtime/helpers/toConsumableArray */ "./node_modules/babel-runtime/helpers/toConsumableArray.js");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _regenerator = __webpack_require__(/*! babel-runtime/regenerator */ "./node_modules/babel-runtime/regenerator/index.js");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(/*! babel-runtime/helpers/asyncToGenerator */ "./node_modules/babel-runtime/helpers/asyncToGenerator.js");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _article = __webpack_require__(/*! ../../api/article */ "./src/api/article.js");

var _mailbox = __webpack_require__(/*! ../../api/mailbox */ "./src/api/mailbox.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

exports.default = {
  name: "mailbox",
  data: function data() {
    return {
      currentPage: 1,
      pageSize: 10,
      totalItems: 0,
      complaintData: [], // 存储从API获取的举报数据
      dialogVisible: false, // 控制弹窗的显示
      articleDetail: null, // 用于存储帖子详情 
      username: ""
    };
  },
  created: function created() {
    this.fetchComplaintData();
  },

  methods: {
    fetchComplaintData: function fetchComplaintData() {
      var _this = this;

      return (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
        var params, response;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                params = {
                  page: _this.currentPage,
                  limit: _this.pageSize
                };

                console.log("Params object being sent:", params);
                _context.next = 5;
                return (0, _mailbox.getReportList)(params);

              case 5:
                response = _context.sent;

                console.log(response);

                if (!(response.code === 200 && response.data)) {
                  _context.next = 13;
                  break;
                }

                // 先分组数据，再赋值给 complaintData
                _this.complaintData = _this.groupReportContentByArticle(response.data.article_ban);

                _this.username = response.data.username;

                _this.totalItems = response.data.unread_count;
                _context.next = 14;
                break;

              case 13:
                throw new Error('Failed to fetch report list');

              case 14:
                _context.next = 20;
                break;

              case 16:
                _context.prev = 16;
                _context.t0 = _context['catch'](0);

                console.error('Error fetching report content:', _context.t0);
                _this.$message.error('获取举报信息失败');

              case 20:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this, [[0, 16]]);
      }))();
    },
    groupReportContentByArticle: function groupReportContentByArticle(reportContent) {
      // 将举报数据按文章ID分组
      var grouped = reportContent.reduce(function (acc, article) {
        var _acc$article$article_;

        // 检查当前文章是否已经存在于分组对象中
        if (!acc[article.article_id]) {
          // 如果不存在，初始化文章的分组
          acc[article.article_id] = {
            article_id: article.article_id, // 文章ID
            title: article.article_content, // 文章内容
            report_content: [] // 存放针对该文章的举报信息
          };
        }
        // 向对应文章的举报信息数组中添加举报信息
        (_acc$article$article_ = acc[article.article_id].report_content).push.apply(_acc$article$article_, (0, _toConsumableArray3.default)(article.report_content.map(function (report) {
          return {
            id: report.id, // 举报ID
            report_time: report.report_time, // 举报时间
            report_msg: report.report_msg // 举报理由
          };
        })));
        return acc;
      }, {});

      // 将分组对象的键转换为数组，以便可以遍历
      return (0, _values2.default)(grouped);
    },
    handleCurrentChange: function handleCurrentChange(currentPage) {
      // 切换页码的逻辑
      this.currentPage = currentPage;
      this.fetchComplaintData();
    },
    handleReview: function handleReview(group) {
      var _this2 = this;

      return (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
        var reportId;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                // 审核通过的逻辑
                console.log('审核通过:', group);
                _context2.prev = 1;

                // 假设 group 对象中包含了 article_id
                reportId = group.article_id; // 获取文章的 ID

                _context2.next = 5;
                return (0, _mailbox.confirmReportMessage)(reportId);

              case 5:
                // 调用封装的 confirmReportMessage 函数
                _this2.$message.success('举报信息审核成功'); // Element UI 的成功提示
                // 成功后的逻辑，例如刷新页面或提示用户
                _this2.fetchComplaintData(); // 重新获取举报数据
                _context2.next = 13;
                break;

              case 9:
                _context2.prev = 9;
                _context2.t0 = _context2['catch'](1);

                // 错误处理逻辑
                console.error('Failed to confirm report:', _context2.t0);
                _this2.$message.error('举报信息审核失败'); // Element UI 的错误提示

              case 13:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, _this2, [[1, 9]]);
      }))();
    },
    articleBan: function articleBan(group) {
      var _this3 = this;

      return (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3() {
        var article_id, article_ban;
        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                // 封禁文章的逻辑
                console.log('封禁文章:', group);
                _context3.prev = 1;

                // 从 group 中获取 article_id
                article_id = group.article_id;

                console.log('article_id to ban:', article_id);

                // 由于您需要传递 article_ban 为 true，我们设置 article_ban 参数为 true
                article_ban = true; // 这里设置为 true，表示封禁文章

                // 调用 API 进行封禁操作，假设 API 需要 article_id 和 article_ban 参数

                _context3.next = 7;
                return (0, _article.articleBan)(article_id, article_ban);

              case 7:
                _this3.$message.success("封禁帖子成功");
                console.log('文章封禁成功');

                // 封禁当前帖子后，重新获取数据
                _this3.fetchComplaintData();
                console.log('Updated complaint data:', _this3.complaintData);

                _context3.next = 17;
                break;

              case 13:
                _context3.prev = 13;
                _context3.t0 = _context3['catch'](1);

                // 错误逻辑处理
                console.error("封禁帖子失败", _context3.t0);
                _this3.$message.error("封禁帖子失败");

              case 17:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, _this3, [[1, 13]]);
      }))();
    },
    showDialog: function showDialog(article) {
      var _this4 = this;

      this.articleDetail = null;
      var data = {
        article_id: article.article_id,
        username: this.username // 直接使用 this.username
      };
      console.log("Sending data for getArticleDetail:", data);
      (0, _article.getArticleDetail)(article.article_id, this.username).then(function (response) {
        console.log(data);
        if (response.code === 200) {
          _this4.articleDetail = response.data.article_content.article_text;
          _this4.dialogVisible = true;
          console.log("Article detail retrieved:", _this4.articleDetail);
        } else {
          _this4.$message.error('获取文章详情失败');
        }
      }).catch(function (error) {
        console.error('请求文章详情失败:', error);
        _this4.$message.error('请求文章详情失败');
      });
    }
  }
};

/***/ }),

/***/ "./node_modules/babel-runtime/core-js/object/values.js":
/*!*************************************************************!*\
  !*** ./node_modules/babel-runtime/core-js/object/values.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(/*! core-js/library/fn/object/values */ "./node_modules/core-js/library/fn/object/values.js"), __esModule: true };

/***/ }),

/***/ "./node_modules/core-js/library/fn/object/values.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/library/fn/object/values.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ../../modules/es7.object.values */ "./node_modules/core-js/library/modules/es7.object.values.js");
module.exports = __webpack_require__(/*! ../../modules/_core */ "./node_modules/core-js/library/modules/_core.js").Object.values;


/***/ }),

/***/ "./node_modules/core-js/library/modules/_object-to-array.js":
/*!******************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_object-to-array.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(/*! ./_descriptors */ "./node_modules/core-js/library/modules/_descriptors.js");
var getKeys = __webpack_require__(/*! ./_object-keys */ "./node_modules/core-js/library/modules/_object-keys.js");
var toIObject = __webpack_require__(/*! ./_to-iobject */ "./node_modules/core-js/library/modules/_to-iobject.js");
var isEnum = __webpack_require__(/*! ./_object-pie */ "./node_modules/core-js/library/modules/_object-pie.js").f;
module.exports = function (isEntries) {
  return function (it) {
    var O = toIObject(it);
    var keys = getKeys(O);
    var length = keys.length;
    var i = 0;
    var result = [];
    var key;
    while (length > i) {
      key = keys[i++];
      if (!DESCRIPTORS || isEnum.call(O, key)) {
        result.push(isEntries ? [key, O[key]] : O[key]);
      }
    }
    return result;
  };
};


/***/ }),

/***/ "./node_modules/core-js/library/modules/es7.object.values.js":
/*!*******************************************************************!*\
  !*** ./node_modules/core-js/library/modules/es7.object.values.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-object-values-entries
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/library/modules/_export.js");
var $values = __webpack_require__(/*! ./_object-to-array */ "./node_modules/core-js/library/modules/_object-to-array.js")(false);

$export($export.S, 'Object', {
  values: function values(it) {
    return $values(it);
  }
});


/***/ }),

/***/ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./src/views/mailbox/index.vue?vue&type=style&index=0&id=d3df16e6&scoped=true&lang=css&":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader??ref--7-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/lib??ref--7-2!./node_modules/vue-loader/lib??vue-loader-options!./src/views/mailbox/index.vue?vue&type=style&index=0&id=d3df16e6&scoped=true&lang=css& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\n.title-ellipsis[data-v-d3df16e6] {\r\n  display: inline-block;\r\n  max-width: 22%;\r\n  /* 根据需要调整最大宽度 */\r\n  white-space: nowrap;\r\n  overflow: hidden;\r\n  text-overflow: ellipsis;\n}\n.complaint-mailbox[data-v-d3df16e6] {\r\n  padding: 20px;\n}\n.mailbox-card[data-v-d3df16e6] {\r\n  margin-bottom: 20px;\n}\n.complaint-groups[data-v-d3df16e6] {\r\n  margin-top: 20px;\n}\n.complaint-group[data-v-d3df16e6] {\r\n  border-bottom: 1px solid #ebeef5;\r\n  padding-bottom: 10px;\r\n  margin-bottom: 20px;\n}\n.article-title[data-v-d3df16e6] {\r\n  font-weight: bold;\r\n  margin-bottom: 10px;\n}\n.report_content-list[data-v-d3df16e6] {\r\n  margin-bottom: 10px;\n}\n.complaint-info[data-v-d3df16e6] {\r\n  display: -webkit-box;\r\n  display: -ms-flexbox;\r\n  display: flex;\r\n  -webkit-box-orient: vertical;\r\n  -webkit-box-direction: normal;\r\n      -ms-flex-direction: column;\r\n          flex-direction: column;\r\n  /* 垂直排列子元素 */\r\n  -webkit-box-pack: justify;\r\n      -ms-flex-pack: justify;\r\n          justify-content: space-between;\r\n  /* 调整空间分配 */\r\n  margin-top: 5px;\r\n  padding: 5px 0;\r\n  /* 添加内边距 */\n}\n.complaint-time[data-v-d3df16e6],\r\n.complaint-reason[data-v-d3df16e6] {\r\n  margin-left: 0;\r\n  /* 移除左边距 */\r\n  white-space: nowrap;\r\n  /* 防止文本换行 */\n}\n.report_content-list[data-v-d3df16e6] {\r\n  display: -webkit-box;\r\n  display: -ms-flexbox;\r\n  display: flex;\r\n  -ms-flex-wrap: wrap;\r\n      flex-wrap: wrap;\r\n  /* 允许换行 */\r\n  margin-bottom: -10px;\r\n  /* 调整外边距以适应列表项的内边距 */\n}\n.complaint-group[data-v-d3df16e6] {\r\n  padding-bottom: 20px;\r\n  /* 适当增加底部间距 */\n}\n.article-title[data-v-d3df16e6] {\r\n  margin-bottom: 10px;\r\n  /* 适当增加底部间距 */\n}\n.complaint-actions[data-v-d3df16e6] {\r\n  display: -webkit-box;\r\n  display: -ms-flexbox;\r\n  display: flex;\r\n  -webkit-box-pack: end;\r\n      -ms-flex-pack: end;\r\n          justify-content: flex-end;\r\n  margin-top: 10px;\n}\n.mailbox-footer[data-v-d3df16e6] {\r\n  display: -webkit-box;\r\n  display: -ms-flexbox;\r\n  display: flex;\r\n  -webkit-box-pack: center;\r\n      -ms-flex-pack: center;\r\n          justify-content: center;\r\n  margin-top: 20px;\n}\r\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/views/mailbox/index.vue?vue&type=template&id=d3df16e6&scoped=true&":
/*!**************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/views/mailbox/index.vue?vue&type=template&id=d3df16e6&scoped=true& ***!
  \**************************************************************************************************************************************************************************************************************/
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
    { staticClass: "complaint-mailbox" },
    [
      _c("el-card", { staticClass: "mailbox-card" }, [
        _vm.complaintData && _vm.complaintData.length > 0
          ? _c(
              "div",
              { staticClass: "complaint-groups" },
              _vm._l(_vm.complaintData, function(article, index) {
                return _c(
                  "div",
                  { key: index, staticClass: "complaint-group" },
                  [
                    _c(
                      "div",
                      {
                        staticClass: "article-title",
                        on: {
                          click: function($event) {
                            return _vm.viewArticleDetails(article)
                          }
                        }
                      },
                      [
                        _c("span", { staticClass: "title-ellipsis" }, [
                          _vm._v(_vm._s(article.title))
                        ])
                      ]
                    ),
                    _vm._v(" "),
                    _c(
                      "div",
                      { staticClass: "report_content-list" },
                      _vm._l(article.report_content, function(
                        complaint,
                        index1
                      ) {
                        return _c(
                          "div",
                          { key: index1, staticClass: "complaint-info" },
                          [
                            _c("div", { staticClass: "complaint-detail" }, [
                              _c("span", { staticClass: "complaint-time" }, [
                                _vm._v(
                                  "\n                举报时间: " +
                                    _vm._s(complaint.report_time) +
                                    "\n              "
                                )
                              ]),
                              _vm._v(" "),
                              _c("span", { staticClass: "complaint-reason" }, [
                                _vm._v(
                                  "\n                举报理由: " +
                                    _vm._s(complaint.report_msg) +
                                    "\n              "
                                )
                              ])
                            ])
                          ]
                        )
                      }),
                      0
                    ),
                    _vm._v(" "),
                    _c(
                      "div",
                      { staticClass: "complaint-actions" },
                      [
                        _c(
                          "el-button",
                          {
                            attrs: {
                              type: "success",
                              title: "帖子详情",
                              visible: _vm.dialogVisible
                            },
                            on: {
                              click: function($event) {
                                return _vm.showDialog(article)
                              },
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
                          [_vm._v("文章详情")]
                        ),
                        _vm._v(" "),
                        _c(
                          "el-button",
                          {
                            attrs: { type: "primary", size: "small" },
                            on: {
                              click: function($event) {
                                return _vm.handleReview(article)
                              }
                            }
                          },
                          [_vm._v("审核通过")]
                        ),
                        _vm._v(" "),
                        _c(
                          "el-button",
                          {
                            attrs: { type: "danger", size: "small" },
                            on: {
                              click: function($event) {
                                return _vm.articleBan(article)
                              }
                            }
                          },
                          [_vm._v("文章封禁")]
                        )
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _c(
                      "el-dialog",
                      {
                        attrs: {
                          visible: _vm.dialogVisible,
                          title: "文章详情",
                          "modal-append-to-body": false
                        },
                        on: {
                          "update:visible": function($event) {
                            _vm.dialogVisible = $event
                          }
                        }
                      },
                      [
                        _vm.articleDetail
                          ? _c("div", [
                              _c("p", [_vm._v(_vm._s(_vm.articleDetail))])
                            ])
                          : _vm._e(),
                        _vm._v(" "),
                        _c(
                          "span",
                          {
                            staticClass: "dialog-footer",
                            attrs: { slot: "footer" },
                            slot: "footer"
                          },
                          [
                            _c(
                              "el-button",
                              {
                                on: {
                                  click: function($event) {
                                    _vm.dialogVisible = false
                                  }
                                }
                              },
                              [_vm._v("关闭")]
                            )
                          ],
                          1
                        )
                      ]
                    )
                  ],
                  1
                )
              }),
              0
            )
          : _c("div", [_c("p", [_vm._v("没有举报信息。")])]),
        _vm._v(" "),
        _c(
          "div",
          { staticClass: "mailbox-footer" },
          [
            _c("el-pagination", {
              attrs: {
                "current-page": _vm.currentPage,
                "page-size": _vm.pageSize,
                layout: "prev, pager, next",
                total: _vm.totalItems
              },
              on: {
                "current-change": _vm.handleCurrentChange,
                "update:currentPage": function($event) {
                  _vm.currentPage = $event
                },
                "update:current-page": function($event) {
                  _vm.currentPage = $event
                }
              }
            })
          ],
          1
        )
      ])
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./src/views/mailbox/index.vue?vue&type=style&index=0&id=d3df16e6&scoped=true&lang=css&":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-style-loader!./node_modules/css-loader??ref--7-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/lib??ref--7-2!./node_modules/vue-loader/lib??vue-loader-options!./src/views/mailbox/index.vue?vue&type=style&index=0&id=d3df16e6&scoped=true&lang=css& ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../../node_modules/css-loader??ref--7-1!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/postcss-loader/lib??ref--7-2!../../../node_modules/vue-loader/lib??vue-loader-options!./index.vue?vue&type=style&index=0&id=d3df16e6&scoped=true&lang=css& */ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./src/views/mailbox/index.vue?vue&type=style&index=0&id=d3df16e6&scoped=true&lang=css&");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(/*! ../../../node_modules/vue-style-loader/lib/addStylesClient.js */ "./node_modules/vue-style-loader/lib/addStylesClient.js").default
var update = add("acb164d2", content, false, {});
// Hot Module Replacement
if(true) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept(/*! !../../../node_modules/css-loader??ref--7-1!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/postcss-loader/lib??ref--7-2!../../../node_modules/vue-loader/lib??vue-loader-options!./index.vue?vue&type=style&index=0&id=d3df16e6&scoped=true&lang=css& */ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./src/views/mailbox/index.vue?vue&type=style&index=0&id=d3df16e6&scoped=true&lang=css&", function() {
     var newContent = __webpack_require__(/*! !../../../node_modules/css-loader??ref--7-1!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/postcss-loader/lib??ref--7-2!../../../node_modules/vue-loader/lib??vue-loader-options!./index.vue?vue&type=style&index=0&id=d3df16e6&scoped=true&lang=css& */ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./src/views/mailbox/index.vue?vue&type=style&index=0&id=d3df16e6&scoped=true&lang=css&");
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
exports.ExcellentPost = ExcellentPost;
exports.getGoodArticle = getGoodArticle;

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

// 选为优秀帖子
function ExcellentPost(data) {
  return (0, _request2.default)({
    url: "/article/select_good_article",
    method: "post",
    data: data
  });
}

// 获取优秀帖子
function getGoodArticle(data) {
  return (0, _request2.default)({
    url: "/article/getGoodArticles",
    method: "post",
    data: data
  });
}

/***/ }),

/***/ "./src/api/mailbox.js":
/*!****************************!*\
  !*** ./src/api/mailbox.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getReportList = getReportList;
exports.confirmReportMessage = confirmReportMessage;

var _request = __webpack_require__(/*! ../utils/request */ "./src/utils/request.js");

var _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 获取举报信息

function getReportList(params) {
  return (0, _request2.default)({
    url: "/report_box/getlist",
    method: "post",
    data: params // 使用data字段发送请求参数
  });
}

// 举报审核通过/封禁

function confirmReportMessage(reportId) {
  var data = { article_id: reportId };
  return (0, _request2.default)({
    url: "/report_box/ack",
    method: "post",
    data: data
  });
}

/***/ }),

/***/ "./src/views/mailbox/index.vue":
/*!*************************************!*\
  !*** ./src/views/mailbox/index.vue ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _index_vue_vue_type_template_id_d3df16e6_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.vue?vue&type=template&id=d3df16e6&scoped=true& */ "./src/views/mailbox/index.vue?vue&type=template&id=d3df16e6&scoped=true&");
/* harmony import */ var _index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.vue?vue&type=script&lang=js& */ "./src/views/mailbox/index.vue?vue&type=script&lang=js&");
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _index_vue_vue_type_style_index_0_id_d3df16e6_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./index.vue?vue&type=style&index=0&id=d3df16e6&scoped=true&lang=css& */ "./src/views/mailbox/index.vue?vue&type=style&index=0&id=d3df16e6&scoped=true&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _index_vue_vue_type_template_id_d3df16e6_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _index_vue_vue_type_template_id_d3df16e6_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "d3df16e6",
  null
  
)

/* hot reload */
if (true) {
  var api = __webpack_require__(/*! ./node_modules/vue-hot-reload-api/dist/index.js */ "./node_modules/vue-hot-reload-api/dist/index.js")
  api.install(__webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm.js"))
  if (api.compatible) {
    module.hot.accept()
    if (!module.hot.data) {
      api.createRecord('d3df16e6', component.options)
    } else {
      api.reload('d3df16e6', component.options)
    }
    module.hot.accept(/*! ./index.vue?vue&type=template&id=d3df16e6&scoped=true& */ "./src/views/mailbox/index.vue?vue&type=template&id=d3df16e6&scoped=true&", function(__WEBPACK_OUTDATED_DEPENDENCIES__) { /* harmony import */ _index_vue_vue_type_template_id_d3df16e6_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.vue?vue&type=template&id=d3df16e6&scoped=true& */ "./src/views/mailbox/index.vue?vue&type=template&id=d3df16e6&scoped=true&");
(function () {
      api.rerender('d3df16e6', {
        render: _index_vue_vue_type_template_id_d3df16e6_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
        staticRenderFns: _index_vue_vue_type_template_id_d3df16e6_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]
      })
    })(__WEBPACK_OUTDATED_DEPENDENCIES__); })
  }
}
component.options.__file = "src\\views\\mailbox\\index.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./src/views/mailbox/index.vue?vue&type=script&lang=js&":
/*!**************************************************************!*\
  !*** ./src/views/mailbox/index.vue?vue&type=script&lang=js& ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_2_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib??ref--2!../../../node_modules/vue-loader/lib??vue-loader-options!./index.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./src/views/mailbox/index.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_2_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_babel_loader_lib_index_js_ref_2_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_babel_loader_lib_index_js_ref_2_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_babel_loader_lib_index_js_ref_2_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_2_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./src/views/mailbox/index.vue?vue&type=style&index=0&id=d3df16e6&scoped=true&lang=css&":
/*!**********************************************************************************************!*\
  !*** ./src/views/mailbox/index.vue?vue&type=style&index=0&id=d3df16e6&scoped=true&lang=css& ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_index_js_ref_7_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_7_2_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_d3df16e6_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-style-loader!../../../node_modules/css-loader??ref--7-1!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/postcss-loader/lib??ref--7-2!../../../node_modules/vue-loader/lib??vue-loader-options!./index.vue?vue&type=style&index=0&id=d3df16e6&scoped=true&lang=css& */ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./src/views/mailbox/index.vue?vue&type=style&index=0&id=d3df16e6&scoped=true&lang=css&");
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_index_js_ref_7_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_7_2_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_d3df16e6_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_node_modules_css_loader_index_js_ref_7_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_7_2_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_d3df16e6_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_node_modules_css_loader_index_js_ref_7_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_7_2_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_d3df16e6_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_node_modules_css_loader_index_js_ref_7_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_7_2_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_d3df16e6_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_style_loader_index_js_node_modules_css_loader_index_js_ref_7_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_7_2_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_d3df16e6_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./src/views/mailbox/index.vue?vue&type=template&id=d3df16e6&scoped=true&":
/*!********************************************************************************!*\
  !*** ./src/views/mailbox/index.vue?vue&type=template&id=d3df16e6&scoped=true& ***!
  \********************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_template_id_d3df16e6_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib??vue-loader-options!./index.vue?vue&type=template&id=d3df16e6&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/views/mailbox/index.vue?vue&type=template&id=d3df16e6&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_template_id_d3df16e6_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_template_id_d3df16e6_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);
//# sourceMappingURL=7.js.map