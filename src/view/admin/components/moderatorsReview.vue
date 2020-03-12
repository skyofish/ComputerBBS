<template>
  <div class="moderatorReview">
    <div id="table">
      <el-table
        :data="moderatorData"
        style="width: 100%; padding: 40px;">
        <el-table-column
          prop="id"
          label="编号">
        </el-table-column>
        <el-table-column
          prop="requestDate"
          label="申请日期">
        </el-table-column>
        <el-table-column
          prop="username"
          label="用户名">
        </el-table-column>
        <el-table-column
          prop="block"
          label="版块">
        </el-table-column>
        <el-table-column
          prop="reason"
          label="理由">
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
    <div class="block">
      <el-pagination
        align="right"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage3"
        :page-size="100"
        layout="prev, pager, next, jumper"
        :total="1000">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  export default {
    name: "moderatorReview",
    data() {
      return {
        moderatorData: []
      }
    },
    created() {
      this.getPost()
    },
    methods: {
      handleFail(index, row) {
        console.log(index, row);
      },
      handleSuccess(index, row) {
        console.log(index, row);
      },
      getPost() {
        for(let i = 1; i <= 10; i++) {
          this.moderatorData.push(
            {
              requestDate: '2016-05-02',
              username: `用户${i}`,
              id: i,
              block: `版块${i}`,
              reason: '震惊震惊震惊震惊震惊震惊震惊'
            }
          )
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .moderatorReview {
    #table {
      padding: 20px;
    }
    #table /deep/ .el-table__header-wrapper {
      height: 80px;
      line-height: 80px;
    }
    .block {
      padding-right: 20px;
    }
  }
</style>
