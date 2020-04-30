<template>
    <div class="articleDetail">
    <div style="text-align: left;">
      <Button style="background: #2d8cf0; border: 0; color: white" @click="back" size="large">
        <Icon type="ios-arrow-back"/>
        返回
      </Button>
    </div>
      <div style="background:#2d8cf0;padding: 20px">
        <Card>
          <p slot="title">{{article.title}}</p>
          <p>楼主：{{article.author}}</p>
          <p>{{article.content}}</p>
          <img v-for="(i, index) in article.images" :key="index" :src="i">
        </Card>
        <div @click="replyFor(i.username)" style="background:#eee;padding: 20px" :key="index" v-for="(i, index) in article.comment">
          <Card style="cursor: pointer">
            <p>{{i.replyDate}}{{i.username}}回复{{i.replyUsername}}说:{{i.comment}}</p>
          </Card>
        </div>
        <Affix :offset-bottom="40">
          <div style="margin-top: 20px;" class="demo-affix">
            <Input clearable @keyup.enter.native="makeComment" enter="makeComment()" v-model="comment" type="text" placeholder="评论" />
          </div>
        </Affix>
      </div>
    </div>
</template>

<script>
    import { mapState } from  'vuex'
    export default {
        name: "articleDetail",
        data() {
          return {
            article: {},
            comment: '',
            replyUsername: ''
          }
        },
        watch : {
          comment(val) {
            if (val == '') {
              this.replyUsername = ''
            }
          }
        },
        created() {
          this.getArticleDetail()
        },
        methods: {
          async getArticleDetail() {
            let params
            if (this.$route.query.id) {
              params = {articleId: this.$route.query.id};
            } else {
              params = {title: this.$route.query.title};
            }
            const res = await this.$store.dispatch("getArticleDetail", params)
            if (res.data.status == 1000) {
              this.article = res.data.data
            } else {
              this.$Message.warning(res.data.message)
            }
          },
          async makeComment() {
            if (!this.username) {
              this.$Message.error('请登录')
              return
            }
            this.comment = this.comment.replace(`@${this.replyUsername}`," ");
            let params = {
              articleId: this.articleId,
              username: this.username,
              comment: this.comment,
              replyUsername: this.replyUsername ? this.replyUsername : this.article.author,
              replyDate: Date.now()
            }
            const res = await this.$store.dispatch('comment', params)
            if (res.data.status == 1000) {
              this.$Message.success('评论成功')
              this.article.comment.push({
                username: this.username,
                comment: this.comment,
                replyUsername: this.replyUsername ? this.replyUsername : this.article.author,
                replyDate: Date.now()
              })
              this.comment = ''
              this.replyUsername = ''
            } else {
              this.$Message.error('评论失败')
            }
          },
          replyFor(name) {
            this.comment = `@${name}`
            this.replyUsername = name
          },
          back() {
            this.$router.go(-1)
          }
        },
        computed: {
          ...mapState({
            articleId: state => state.articleId,
            username: state => state.userInfo.username
          })
        }
    }
</script>

<style lang="less" scoped>
  .articleDetail {
    margin-top: 13px;
    background: #2d8cf0;

    img {
      display: inline-block;
      width: 100px;
      height: 100px;
    }

    .comment {
      cursor: pointer;
    }
  }
</style>
