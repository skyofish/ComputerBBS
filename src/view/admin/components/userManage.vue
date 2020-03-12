<template>
  <div class="userManage">
    <div id="table">
      <el-table
        :data="userData"
        style="width: 100%; padding: 40px;">
        <el-table-column
          prop="id"
          label="编号">
        </el-table-column>
        <el-table-column
          prop="username"
          label="姓名">
        </el-table-column>
        <el-table-column
          prop="registerDate"
          label="注册日期">
        </el-table-column>
        <el-table-column
          prop="email"
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
    name: "userManage",
    data() {
      return {
        userData: []
      }
    },
    created() {
      this.getPost()
    },
    methods: {
      handleLock(index, row) {
        console.log(index, row);
      },
      getPost() {
        for(let i = 1; i <= 10; i++) {
          this.userData.push(
            {
              registerDate: '2016-05-02',
              username: `用户${i}`,
              id: i,
              email: `${i}@qq.com`,
              phone:i,
              birth: '2010-05-02'
            }
          )
        }
      }
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
    .block {
      padding-right: 20px;
    }
  }
</style>
