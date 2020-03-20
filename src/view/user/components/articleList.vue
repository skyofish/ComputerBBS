<template>
  <div class="articleList">
    <List id="resource" item-layout="vertical">
      <ListItem v-for="(i, index) in articleList" :key="i._id" @click.native="toArticleDetail(i._id)">
        <ListItemMeta :title="i.title" />
        <template slot="action">
          <li>
            <Icon type="ios-star-outline" /> {{i.score}}
          </li>
          <li>
            <Icon @click.stop="like(i._id, index)" :style="isLike[index] ? 'color:white; background:#2D8cF0': ''" type="ios-thumbs-up-outline" /> {{i.like}}
          </li>
          <li>
            <Icon type="ios-chatbubbles-outline" /> {{i.comment.length}}
          </li>
        </template>
        <template slot="extra">
          <img :src="i.images[0]" style="width: 280px">
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
    name: "articleList",
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
      this.getList();
    },
    methods: {
      async getList() {
        let params = {blockName: this.blockName, current: this.current, pageSize: this.pageSize};
        const res = await this.$store.dispatch("getArticleList", params)
        if (res.data.status == 1000) {
          this.articleList = res.data.data
          this.total = res.data.count
        } else {
          this.$Message.warning(res.data.message)
        }
      },
      toArticleDetail(id) {
        this.$store.commit('setArticleId',id)
        sessionStorage.setItem("store",JSON.stringify(this.$store.state))
        this.$router.push({
          name: 'userArticleDetail',
          params: {
            articleId: id,
          }
        });
      },
      changePage(index) {
        this.current = index
        this.getList()
      },
      changePageSize(index) {
        this.pageSize = index
        this.getList()
      },
      async like(id, index) {
        let params = {articleId: id}
        const res = await this.$store.dispatch('like', params)
        this.articleList[index].like ++
        this.isLike[index] = true
      },
    },
    computed: {
      ...mapState({
        blockName: state => state.blockName,
      })
    }
  }
</script>

<style lang="less" scoped>
  .articleList {
    background: white;
    margin-top: 13px;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;

    #resource  /deep/ .ivu-list-item {
      cursor: pointer;
      height: 100px;
      img {
        height: 85px;
        margin-right: 20px;
      }
    }

    .page {
      margin: 50px;
      padding-bottom: 50px;
      text-align: right;
    }
  }
</style>
