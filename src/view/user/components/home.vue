<template>
    <div class="home">
      <div class="hot">
        <p>热门</p>
        <hr/>
        <ul>
          <li @click="toArticleDetail(i._id)" v-for="i in hotArticle">
            {{i.title}}
          </li>
        </ul>
      </div>
      <div class="carousel">
        <div>
          <Carousel v-model="carousel" autoplay loop>
            <CarouselItem>
              <div class="demo-carousel">
                <img src="@images/lunbo1.jpg" alt="">
              </div>
            </CarouselItem>
            <CarouselItem>
              <div class="demo-carousel">
                <img src="@images/lunbo2.jpg" alt="">
              </div>
            </CarouselItem>
            <CarouselItem>
              <div class="demo-carousel">
                <img src="@images/lunbo3.jpg" alt="">
              </div>
            </CarouselItem>
            <CarouselItem>
              <div class="demo-carousel">
                <img src="@images/lunbo4.jpg" alt="">
              </div>
            </CarouselItem>
          </Carousel>
        </div>
      </div>
      <div class="block">
        <p>板块专区</p>
        <div class="block-card" @click="toArticleList(i.blockName)" :key="i.blockName" v-for="i in block">
          <Card shadow>
            <p slot="title">{{i.name}}</p>
            <p>版主:{{i.moderator.join('\n')}}</p>
          </Card>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "home",
        data() {
          return {
            hotArticle: [],
            carousel: 0,
            block: []
          }
        },
        created() {
          this.getHotArticle();
          this.getBlock();
        },
        methods: {
          async getHotArticle() {
            let params = {operate: 'hot'}
            const res =await this.$store.dispatch('getArticleList', params)
            if (res.data.status == 1000) {
              this.hotArticle = res.data.data
            } else {
              this.$message.error("未找到任何热门文章");
            }
          },
          async getBlock() {
            const res = await this.$store.dispatch("getBlockList");
            if (res.data.status == 1000) {
              this.block = res.data.data
            } else {
              this.$message.error("未找到任何版块");
            }
          },
          toArticleList(blockName) {
            this.$store.commit('setBlockName', blockName)
            sessionStorage.setItem("store",JSON.stringify(this.$store.state))
            this.$router.push({
              name: 'articleList',
              params: {
                blockName: blockName
              }
            });
          },
          toArticleDetail(id) {
            this.$router.push({
              path: 'articleDetail',
              query: {
                id: id,
              }
            });
          },
        }
    }
</script>

<style lang="less" scoped>
  .home {
    background: white;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
  }
  .hot {
    width: 40%;
    height: 350px;
    display: inline-block;
    padding: 20px;
    float: left;
    p {
      display: inline-block;
    }
    ul{
      list-style-type: none;
      li {
        cursor: pointer;
        text-align: left;
        background: white;
        font-size: 14px;
        line-height: 1.5;
        display: block;
        padding: .3em .5em;
        border-radius: 4px;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        color: #d74545;
      }
      li:hover {
        color: white;
        background-color: #d74545;
        transition: background-color .3s, color .3s, opacity .3s;
      }
    }
  }

  .carousel {
    width: 57%;
    height: 350px;
    display: inline-block;
    margin-left: 20px;
    padding: 20px;
    img {
      width: 100%;
      height: 320px;
    }
  }

  .block {
    clear: both;
    width: 100%;
    margin-top: 50px;
    background: #eee;
    padding-top: 50px;
    .block-card {
      width: 45%;
      display: inline-block;
      margin: 20px 20px;
      cursor: pointer;
    }
    .block-card:hover /deep/ .ivu-card {
      background: #2D8cF0;
      p {
        color: white;
      }
    }
  }
</style>
