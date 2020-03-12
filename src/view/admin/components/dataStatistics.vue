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
          articleMonthNum() {
            let myChart1 = this.$echarts.init(document.getElementById('echart1'));
            myChart1.setOption({
              title: {
                text: '最近几月发帖数量',
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
                  data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月'],
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
                  name: '发帖数量',
                  type: 'bar',
                  barWidth: '60%',
                  data: [10, 52, 200, 334, 390, 330, 220]
                }
              ]
            });
          },
          userSexEchart() {
            let myChart2 = this.$echarts.init(document.getElementById('echart2'));
            myChart2.setOption({
              title: {
                text: '用户男女比例',
                subtext: '来源已注册用户',
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
                  name: '访问来源',
                  type: 'pie',
                  radius: '55%',
                  center: ['50%', '60%'],
                  data: [
                    {value: 1400, name: '男'},
                    {value: 1600, name: '女'},
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
          userMonthIncrease() {
            let myChart3 = this.$echarts.init(document.getElementById('echart3'));
            myChart3.setOption({
              title: {
                text: '每月发帖同比增长数量'
              },
              xAxis: {
                type: 'category',
                data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月'],
              },
              yAxis: {
                type: 'value'
              },
              series: [{
                data: [10, 42, 148, 134, 56, -60, -90],
                type: 'line'
              }]
            });
          },
          articleBlockNum() {
            let myChart4 = this.$echarts.init(document.getElementById('echart4'));
            myChart4.setOption({
              title: {
                text: '版块占比',
                left: 'center'
              },
              tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b}: {c} ({d}%)'
              },
              legend: {
                orient: 'vertical',
                left: 10,
                data: ['版块1', '版块2', '版块3', '版块4', '版块5']
              },
              series: [
                {
                  name: '文章数量',
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
                    {value: 335, name: '版块1'},
                    {value: 310, name: '版块2'},
                    {value: 234, name: '版块3'},
                    {value: 135, name: '版块4'},
                    {value: 1548, name: '版块5'}
                  ]
                }
              ]
            });
          }
        },
        mounted() {
          let echarts = require('echarts');
          this.userSexEchart();
          this.articleBlockNum();
          this.articleMonthNum();
          this.userMonthIncrease();
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
    }
  }
</style>
