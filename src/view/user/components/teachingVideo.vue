<template>
    <div class="teachingVideo">
      <div class="video">
        <p>算数逻辑单元</p>
        <video width="400" height="300" controls>
          <source src="../../../movie/video.mp4" type="video/mp4">
        </video>
      </div>
      <div class="video">
        <p>二进制</p>
        <video width="400" height="300" controls>
          <source src="../../../movie/video(1).mp4" type="video/mp4">
        </video>
      </div>
      <div class="video" v-for="i in teachingVideo">
        <p>{{i.title}}</p>
        <video width="400" height="300" controls>
          <source :src="i.src" type="video/mp4">
        </video>
      </div>
      <div class="video" v-for="i in teachingVideo">
        <p>{{i.title}}</p>
        <video width="400" height="300" controls>
          <source :src="i.src" type="video/mp4">
        </video>
      </div>
      <div class="page">
        <Page :total="100" show-total show-elevator show-sizer />
      </div>
    </div>
</template>

<script>
    export default {
        name: "teachingVideo",
        data() {
          return {
            teachingVideo: []
          }
        },
        created() {
          this.getTeachingVideo();
        },
        methods: {
          getTeachingVideo() {
            for(let i = 1; i <= 10; i++) {
              this.teachingVideo.push(
                {
                  id: i,
                  title:  `title ${i}`,
                  ref: 'video',
                  src: '../../../../movie/movie.mp4',
                }
              )
            }
          }
        }
    }
</script>

<style lang="less" scoped>
  .teachingVideo {
    width: 100%;
    margin-top: 11px;
    background: white;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;

    .video {
      display: inline-block;
      margin: 20px 50px;
      padding-top: 50px;

      p {
        padding-bottom: 20px;
      }
    }

    .page {
      margin: 50px;
      padding-bottom: 50px;
      text-align: right;
    }
  }
</style>
