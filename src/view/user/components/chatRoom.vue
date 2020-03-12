<template>
    <div class="chatRoom">
      <p>多人聊天</p>
      <List>
        <div v-for="i in chatRoom" class="roomList">
          <ListItem>
            <ListItemMeta :title="i.title" :description="i.description" />
          </ListItem>
        </div>
      </List>
    </div>
</template>

<script>
    export default {
        name: "chatRoom",
        data() {
          return {
            chatRoom: []
          }
        },
        created() {
          this.getChatRoom();
        },
        methods: {
          getChatRoom() {
            for(let i = 1; i <= 10; i++) {
              this.chatRoom.push(
                {
                  id: i,
                  title: `this is room${i}`,
                  description: 'This is description, this is description.'
                }
              )
            }
          }
        }
    }
</script>

<style lang="less" scoped>
  .chatRoom {
    background: white;
    margin-top: 13px;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
    padding-bottom: 50px;
    padding-top: 20px;
    p{
      margin: 20px 0;
    }
    .roomList:hover {
      background: #2db7f5;
      color: white;
      cursor: pointer;
    }
  }
</style>
