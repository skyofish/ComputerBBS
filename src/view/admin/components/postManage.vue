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
      name: "postManage",
      data() {
        return {
          postData: []
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
        getPost() {
          for(let i = 1; i <= 10; i++) {
            this.postData.push(
              {
                date: '2016-05-02',
                username: `用户${i}`,
                id: i,
                block: `版块${i}`,
                title: '震惊震惊震惊震惊震惊震惊震惊'
              }
            )
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
    .block {
      padding-right: 20px;
    }
  }
</style>
