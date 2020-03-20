<template>
    <div class="postManage">
      <div id="table">
        <el-table
          :data="postData"
          style="width: 100%; padding: 40px;">
          <el-table-column
            prop="date"
            label="日期">
          </el-table-column>
          <el-table-column
            prop="username"
            label="姓名">
          </el-table-column>
          <el-table-column
            prop="title"
            label="标题">
          </el-table-column>
          <el-table-column
            prop="block"
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
    export default {
      name: "postManage",
      data() {
        return {
          articleList: [],
          total: 0,
          current: 1,
          pageSize: 10,
          isLike: []
        }
      },
      created() {
        this.getPost()
      },
      methods: {
        handleDelete(index, row) {
          console.log(index, row);
        },
        handleAdd(index, row) {
          console.log(index, row);
        },
        async getPost() {
          let params = {current: this.current, pageSize: this.pageSize};
          const res = await this.$store.dispatch("getArticleList", params)
          if (res.data.status == 1000) {
            this.articleList = res.data.data
            this.total = res.data.count
          } else {
            this.$Message.warning(res.data.message)
          }
        }
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
    .page {
      margin: 20px;
      padding-bottom: 50px;
      text-align: right;
      line-height: 0;
    }
  }
</style>
