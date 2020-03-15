<template>
    <div class="articleDetail">
      <div style="background:#2d8cf0;padding: 20px">
        <Card>
          <p slot="title">{{article.title}}</p>
          <p>{{article.content}}</p>
        </Card>
        <div style="background:#eee;padding: 20px" v-for="i in comment">
          <Card>
            <p>{{i.replyDate}}{{i.username}}回复{{i.replyUsername}}说:{{i.comment}}</p>
          </Card>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "articleDetail",
        data() {
          return {
            comment: [],
            article: {
              date: '2016-05-02',
              username: `用户1`,
              id: 1,
              block: `版块1`,
              title: '震惊震惊震惊震惊震惊震惊震惊',
              content: '内容......',
            }
          }
        },
        created() {
          this.getArticleDetail()
        },
        methods: {
          getArticleDetail() {
            for(let i = 1; i <= 10; i++) {
              this.comment.push(
                {
                  replyUsername: '汪',
                  comment: '猪啊',
                  replayName: '赵',
                  replyDate: Date.now()
                }
              )
            }
            console.log(this.comment)
          }
        }
    }
</script>

<style lang="less" scoped>
  .articleDetail {
    margin-top: 13px;
    background: #2d8cf0;

  }
</style>
