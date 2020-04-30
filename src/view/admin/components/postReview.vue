<template>
  <div class="postReview">
    <div id="table">
      <el-table
        :data="reviewData"
        style="width: 100%; padding: 40px;">
        <el-table-column
          prop="_id"
          label="编号">
          <template slot-scope="scope">
            <p @click="toArticleDetail(scope.row._id)">{{ scope.row._id }}</p>
          </template>
        </el-table-column>
        <el-table-column
          prop="meta.createAt"
          label="日期">
        </el-table-column>
        <el-table-column
          prop="author"
          width="100px"
          show-overflow-tooltip
          label="姓名">
        </el-table-column>
        <el-table-column
          prop="title"
          show-overflow-tooltip
          label="标题">
        </el-table-column>
        <el-table-column
          width="100px"
          prop="block"
          label="版块">
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleSuccess(scope.$index, scope.row)">通过</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleFail(scope.$index, scope.row)">驳回</el-button>
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
    name: "postReview",
    data() {
      return {
        reviewData: [],
        total: 0,
        current: 1,
        pageSize: 10,
      }
    },
    created() {
      this.getPost()
    },
    methods: {
      handleFail(index, row) {
        console.log(index, row);
        let b = (index, row)
        this.remove(b._id)
      },
      handleSuccess(index, row) {
        console.log(index, row);
        let a = (index, row)
        this.check(a._id)
      },
      changePage(index) {
        this.current = index
        this.getPost()
      },
      changePageSize(index) {
        this.pageSize = index
        this.getPost()
      },
      async getPost() {
        let params = {username: this.userInfo.username, user: this.userInfo.type, operate: 'check', current: this.current, pageSize: this.pageSize};
        const res = await this.$store.dispatch("getArticleList", params)
        if (res.data.status == 1000) {
          this.reviewData = res.data.data
          this.total = res.data.count
        } else {
          this.$Message.warning(res.data.message)
        }
      },
      async check(id) {
        let params = {articleId: id};
        const res = await this.$store.dispatch("articleCheck", params)
        if (res.data.status == 1000) {
          this.getPost()
        }
      },
      async remove(id) {
        let params = {articleId: id};
        const res = await this.$store.dispatch("articleRemove", params)
        if (res.data.status == 1000) {
          this.getPost()
        }
      },
      toArticleDetail(id) {
        this.$router.push({
          path: 'articleDetail',
          query: {
            id: id,
          }
        });
      },
    },
    computed: {
      ...mapState({
        userInfo: state => state.userInfo
      })
    }
  }
</script>

<style lang="less" scoped>
  .postReview {
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
