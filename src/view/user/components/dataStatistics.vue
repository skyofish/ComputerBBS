<template>
    <div class="dataStatistics">
      <div id="echart1"></div>
      <div id="echart2"></div>
      <div id="echart3"></div>
      <div id="echart4"></div>
    </div>
</template>

<script>
    export default {
        name: "dataStatistics",
        data() {
          return {

          }
        },
        methods: {
          enrollAccountChart() {
            let myChart1 = this.$echarts.init(document.getElementById('echart1'));
            myChart1.setOption({
              title: {
                text: '近五年报名人数(万)'
              },
              tooltip: {
                trigger: 'item',
              },
              xAxis: {
                type: 'category',
                data: ['2015', '2016', '2017', '2018', '2019'],
              },
              yAxis: {
                type: 'value'
              },
              series: [{
                name: '报名人数',
                data: [165, 177, 201, 238, 290],
                type: 'line'
              }]
            });
          },
          ageChart() {
            let myChart2 = this.$echarts.init(document.getElementById('echart2'));
            myChart2.setOption({
              title: {
                text: '年龄分布',
              },
              color: ['#3398DB'],
              tooltip: {
                trigger: 'axis',
                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                  type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
              },
              grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
              },
              xAxis: [
                {
                  type: 'category',
                  data: ['19岁及以下', '20-29', '30-39', '40-49', '50岁及以上'],
                  axisTick: {
                    alignWithLabel: true
                  }
                }
              ],
              yAxis: [
                {
                  type: 'value'
                }
              ],
              series: [
                {
                  name: '年龄占比',
                  type: 'bar',
                  barWidth: '60%',
                  data: [10, 45, 16, 26, 3]
                }
              ]
            });
          },
          sexChart() {
            let myChart3 = this.$echarts.init(document.getElementById('echart3'));
            myChart3.setOption({
              title: {
                text: '男女比例',
                subtext: '来源调研',
                left: 'center'
              },
              tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b} : {c} ({d}%)'
              },
              legend: {
                orient: 'vertical',
                left: 'left',
                data: ['男', '女']
              },
              series: [
                {
                  name: '所占比例',
                  type: 'pie',
                  radius: '55%',
                  center: ['50%', '60%'],
                  data: [
                    {value: 44.41, name: '男'},
                    {value: 55.59, name: '女'},
                  ],
                  emphasis: {
                    itemStyle: {
                      shadowBlur: 10,
                      shadowOffsetX: 0,
                      shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                  }
                }
              ]
            });
          },
          zoneChart() {
            let myChart4 = this.$echarts.init(document.getElementById('echart4'));
            myChart4.setOption({
              title: {
                text: '报考院校所在地',
                left: 'center'
              },
              tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b}: {c} ({d}%)'
              },
              legend: {
                orient: 'vertical',
                left: 10,
                data: ['一线', '二三线', '家乡', '本科所在']
              },
              series: [
                {
                  name: '占比',
                  type: 'pie',
                  radius: ['50%', '70%'],
                  avoidLabelOverlap: false,
                  label: {
                    normal: {
                      show: false,
                      position: 'center'
                    },
                    emphasis: {
                      show: true,
                      textStyle: {
                        fontSize: '30',
                        fontWeight: 'bold'
                      }
                    }
                  },
                  labelLine: {
                    normal: {
                      show: false
                    }
                  },
                  data: [
                    {value: 40.59, name: '一线'},
                    {value: 32.68, name: '二三线'},
                    {value: 18.72, name: '家乡'},
                    {value: 8.01, name: '本科所在'},
                  ]
                }
              ]
            });
          }
        },
        mounted() {
          let echarts = require('echarts');
          this.zoneChart();
          this.enrollAccountChart();
          this.ageChart();
          this.sexChart();
        }
    }
</script>

<style lang="less" scoped>
  .dataStatistics {
    div {
      width: 40%;
      height: 300px;
      background: white;
      display: inline-block;
      margin: 20px 50px;
      -webkit-border-radius: 5px;
      -moz-border-radius: 5px;
      border-radius: 5px;
    }
  }
</style>
