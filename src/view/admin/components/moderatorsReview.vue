<template>
  <div class="moderatorReview">
    <div id="table">
      <el-table
        :data="moderatorData"
        style="width: 100%; padding: 40px;">
        <el-table-column
          prop="moderatorDate"
          label="申请日期">
        </el-table-column>
        <el-table-column
          prop="username"
          label="用户名">
        </el-table-column>
        <el-table-column
          prop="moderatorBlock"
          label="版块">
        </el-table-column>
        <el-table-column
          prop="moderatorReason"
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
    <div class="page">
      <Page :total="total" @on-page-size-change="changePageSize" @on-change="changePage" :current="current" :page-size="pageSize" show-total show-elevator show-sizer />
    </div>
  </div>
</template>

<script>
  import { mapState } from  'vuex'
  export default {
    name: "moderatorReview",
    data() {
      return {
        moderatorData: [],
        total: 0,
        current: 1,
        pageSize: 10,
      }
    },
    created() {
      this.getModerator()
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
        this.check(a._id, a.moderatorBlock, a.username)
      },
      changePage(index) {
        this.current = index
        this.getModerator()
      },
      changePageSize(index) {
        this.pageSize = index
        this.getModerator()
      },
      async getModerator() {
        let params = {type: 'check', current: this.current, pageSize: this.pageSize};
        const res = await this.$store.dispatch("userList", params)
        if (res.data.status == 1000) {
          this.moderatorData = res.data.data
          this.total = res.data.count
        } else {
          this.$Message.warning(res.data.message)
        }
      },
      async check(id, block, username) {
        let params = {id: id, block: block, username: username};
        const res = await this.$store.dispatch("moderatorSuccess", params)
        if (res.data.status == 1000) {
          this.getModerator()
        }
      },
      async remove(id) {
        let params = {id: id};
        const res = await this.$store.dispatch("moderatorFail", params)
        if (res.data.status == 1000) {
          this.getModerator()
        }
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
  .moderatorReview {
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
