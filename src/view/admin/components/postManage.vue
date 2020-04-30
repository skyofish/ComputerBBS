<template>
    <div class="postManage">
      <div id="table">
        <el-table
          :data="articleList"
          style="width: 100%; padding: 40px;">
          <el-table-column
            fit
            prop="_id"
            width="100px"
            show-overflow-tooltip
            label="编号">
            <template slot-scope="scope">
              <p @click="toArticleDetail(scope.row._id)">{{ scope.row._id }}</p>
            </template>
          </el-table-column>
          <el-table-column
            fit
            prop="meta.createAt"
            width="150px"
            show-overflow-tooltip
            label="日期">
          </el-table-column>
          <el-table-column
            fit
            width="100px"
            prop="author"
            label="姓名">
          </el-table-column>
          <el-table-column
            prop="title"
            show-overflow-tooltip
            label="标题">
          </el-table-column>
          <el-table-column
            prop="block"
            width="100px"
            label="版块">
          </el-table-column>
          <el-table-column
            label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleAdd(scope.$index, scope.row)">加精</el-button>
              <el-button
                size="mini"
                @click="handleTop(scope.$index, scope.row)">置顶</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="page">
        <Page :total="total" @on-page-size-change="changePageSize" @on-change="changePage" :current="current" :page-size="pageSize" show-total show-elevator show-sizer />
      </div>
    </div>
</template>

<script>
    import { mapState } from  'vuex'
    export default {
      name: "postManage",
      data() {
        return {
          articleList: [],
          total: 0,
          current: 1,
          pageSize: 10,
        }
      },
      created() {
        this.getPost()
      },
      methods: {
        toArticleDetail(id) {
          this.$store.commit('setArticleId',id)
          sessionStorage.setItem("store",JSON.stringify(this.$store.state))
          this.$router.push({
            path: 'articleDetail',
            query: {
              id: id,
            }
          });
        },
        changePage(index) {
          this.current = index
          this.getPost()
        },
        changePageSize(index) {
          this.pageSize = index
          this.getPost()
        },
        handleDelete(index, row) {
          console.log(index, row);
          let b = (index, row)
          this.remove(b._id)
        },
        handleTop(index, row) {
          let c = (index, row)
          this.top(c._id)
        },
        handleAdd(index, row) {
          console.log(index, row);
          let a = (index, row)
          this.elite(a._id)
        },
        async getPost() {
          let params = {username: this.userInfo.username, user: this.userInfo.type, operate: 'manage', current: this.current, pageSize: this.pageSize};
          const res = await this.$store.dispatch("getArticleList", params)
          if (res.data.status == 1000) {
            this.articleList = res.data.data
            this.total = res.data.count
          } else {
            this.$Message.warning(res.data.message)
          }
        },
        async remove(id) {
          let params = {articleId: id};
          const res = await this.$store.dispatch("articleRemove", params)
          if (res.data.status == 1000) {
            this.getPost()
          }
        },
        async elite(id) {
          let params = {articleId: id};
          const res = await this.$store.dispatch("articleElite", params)
          if (res.data.status == 1000) {
            this.getPost()
          }
        },
        async top(id) {
          let params = {articleId: id};
          const res = await this.$store.dispatch("articleTop", params)
          if (res.data.status == 1000) {
            this.getPost()
          }
        }
      },
      computed: {
        ...mapState({
          userInfo: state => state.userInfo
        })
      }
    }
</script>

<style lang="less" scoped>
  .postManage {
    #table {
      padding: 20px;
    }
    #table /deep/ .el-table__header-wrapper {
      height: 80px;
      line-height: 80px;
    }
    #table /deep/ .cell p {
      cursor: pointer;
    }
    .page {
      margin: 20px;
      padding-bottom: 50px;
      text-align: right;
      line-height: 0;
    }
  }
</style>
