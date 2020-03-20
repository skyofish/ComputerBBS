<template>
    <div class="learningResource">
      <List id="resource" item-layout="vertical">
        <ListItem v-for="(i, index) in learningResource" :key="i._id">
          <ListItemMeta :title="i.title" />
          <h4>积分:{{i.score}}</h4>
          <p @click="download(item, i.score/i.file.length, i._id)" v-for="item in i.file">{{item.replace('/static/'," ")}}</p>
          <template slot="action">
            <li>
              <Icon @click="like(i._id, index)" :style="isLike[index] ? 'color:white; background:#2D8cF0': ''" type="ios-thumbs-up-outline" /> {{i.like}}
            </li>
            <li>
              <Icon type="md-download" /> {{i.download}}
            </li>
          </template>
        </ListItem>
      </List>
      <div class="page">
        <Page :total="total" @on-page-size-change="changePageSize" @on-change="changePage" :current="current" :page-size="pageSize" show-total show-elevator show-sizer />
      </div>
    </div>
</template>

<script>
    import { mapState } from  'vuex'
    export default {
        name: "learningResource",
        data() {
          return {
            learningResource: [],
            total: 0,
            current: 1,
            pageSize: 10,
            isLike: []
          }
        },
        created() {
          this.getLearnResource();
        },
        methods: {
          async getLearnResource() {
            let params = {current: this.current, pageSize: this.pageSize};
            const res = await this.$store.dispatch("getResourceList", params)
            if (res.data.status == 1000) {
              this.learningResource = res.data.data
              this.total = res.data.count
            } else {
              this.$Message.warning(res.data.message)
            }
          },
          changePage(index) {
            this.current = index
            this.getLearnResource();
          },
          changePageSize(index) {
            this.pageSize = index
            this.getLearnResource();
          },
          async download(path, score, id) {
            window.open(`http://localhost:8080${path}`)
            let params = {id: this.id, score: score, fileId: id}
            const res = await this.$store.dispatch('downloadFile', params)
            this.$store.commit('setDownload', score)
          },
          async like(id, index) {
            let params = {fileId: id}
            const res = await this.$store.dispatch('like', params)
            this.learningResource[index].like ++
            this.isLike[index] = true
            console.log(this.learningResource[index].like)
          },
        },
        computed: {
          ...mapState({
            id: state => state.userInfo._id
          })
        }
    }
</script>

<style lang="less" scoped>
  .learningResource {
    background: white;
    margin-top: 13px;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;

    p {
      cursor: pointer;
    }

    p:hover {
      color: #2D8cF0;
    }

    .page {
      margin: 50px;
      padding-bottom: 50px;
      text-align: right;
    }
  }
</style>
