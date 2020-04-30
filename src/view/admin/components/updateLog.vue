<template>
    <div class="updateLog">
      <div class="block">
        <el-timeline>
          <el-timeline-item timestamp="2018/4/12" placement="top">
            <el-card>
              <h4>1.0</h4>
              <p>搭建整体结构</p>
            </el-card>
          </el-timeline-item>
          <el-timeline-item timestamp="2018/4/3" placement="top">
            <el-card>
              <h4>2.0</h4>
              <p>完成帖子管理功能</p>
            </el-card>
          </el-timeline-item>
          <el-timeline-item timestamp="2018/4/2" placement="top">
            <el-card>
              <h4>3.0</h4>
              <p>完成用户管理功能</p>
            </el-card>
          </el-timeline-item>
        </el-timeline>
      </div>
    </div>
</template>

<script>
    export default {
        name: "updateLog"
    }
</script>

<style lang="less" scoped>
  .updateLog {
    margin: 50px;
    .block {
      padding: 50px;
      line-height: 60px;
    }
  }
</style>
