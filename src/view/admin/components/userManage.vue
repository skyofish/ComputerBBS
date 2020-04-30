<template>
  <div class="userManage">
    <div id="table">
      <el-table
        :data="userData"
        style="width: 100%; padding: 40px;">
        <el-table-column
          prop="username"
          label="姓名">
        </el-table-column>
        <el-table-column
          prop="meta.createAt"
          label="注册日期">
        </el-table-column>
        <el-table-column
          prop="mail"
          label="邮箱">
        </el-table-column>
        <el-table-column
          prop="phone"
          label="号码">
        </el-table-column>
        <el-table-column
          prop="birth"
          label="生日">
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="danger"
              @click="handleLock(scope.$index, scope.row)">封禁</el-button>
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
    name: "userManage",
    data() {
      return {
        userData: [],
        total: 0,
        current: 1,
        pageSize: 10,
      }
    },
    created() {
      this.getUser()
    },
    methods: {
      handleLock(index, row) {
        console.log(index, row);
        let b = (index, row)
        this.remove(b._id)
      },
      changePage(index) {
        this.current = index
        this.getUser()
      },
      changePageSize(index) {
        this.pageSize = index
        this.getUser()
      },
      async getUser() {
        let params = {type: 'manage', current: this.current, pageSize: this.pageSize};
        const res = await this.$store.dispatch("userList", params)
        if (res.data.status == 1000) {
          this.userData = res.data.data
          this.total = res.data.count
        } else {
          this.$Message.warning(res.data.message)
        }
      },
      async remove(id) {
        let params = {id: id};
        const res = await this.$store.dispatch("userLock", params)
        if (res.data.status == 1000) {
          this.getUser()
        }
      },
    }
  }
</script>

<style lang="less" scoped>
  .userManage {
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
