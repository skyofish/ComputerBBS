<template>
    <div class="learningResource">
      <List id="resource" item-layout="vertical">
        <ListItem v-for="item in learningResource" :key="item.title">
          <ListItemMeta :title="item.title" />
          {{ item.content }}
          <template slot="action">
            <li>
              <Icon type="ios-star-outline" /> 123
            </li>
            <li>
              <Icon type="ios-thumbs-up-outline" /> 234
            </li>
            <li>
              <Icon type="ios-chatbubbles-outline" /> 345
            </li>
          </template>
          <template slot="extra">
            <img src="https://dev-file.iviewui.com/5wxHCQMUyrauMCGSVEYVxHR5JmvS7DpH/large" style="width: 280px">
          </template>
        </ListItem>
      </List>
      <div class="page">
        <Page :total="100" show-total show-elevator show-sizer />
      </div>
    </div>
</template>

<script>
    export default {
        name: "learningResource",
        data() {
          return {
            learningResource: []
          }
        },
        created() {
          this.getLearnResource();
        },
        methods: {
          getLearnResource() {
            for(let i = 1; i <= 10; i++) {
              this.learningResource.push(
                {
                  title: `This is title ${i}`,
                  description: 'This is description, this is description, this is description.',
                  avatar: 'https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar',
                  content: 'This is the content, this is the content, this is the content, this is the content.'
                }
                )
            }
          }
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

    #resource  /deep/ .ivu-list-item {
        height: 140px;
        img {
          height: 115px;
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
