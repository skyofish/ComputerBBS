<template>
    <div class="home">
      <div class="hot">
        <p>热门</p>
        <hr/>
        <ul>
          <li v-for="i in hotArticle">
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
        <div class="block-card" v-for="i in block">
          <Card shadow>
            <p slot="title">{{i.title}}</p>
            <p>{{i.moderator}}</p>
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
          getHotArticle() {
            for(let i = 1; i <= 10; i++) {
              this.hotArticle.push({id: i, title: i})
            }
          },
          getBlock() {
            for(let i = 1; i <= 10; i++) {
              this.block.push({id: i, title: i, moderator: i})
            }
          }
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
    }
  }
</style>
