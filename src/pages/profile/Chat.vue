<template>
  <div>
    <lemon-imui
      :user="user"
      width="100%"
      ref="IMUI"
      :hide-menu="true"
      @pull-messages="handleMessageClick"
      @send="sendMessage"
    >
      <template v-slot:editor-footer> </template>
    </lemon-imui>
  </div>
</template>

<script>
import {
  contactList,
  messageList,
  newMessage,
  uploadImg,
} from "../../api/messages";
export default {
  data() {
    return {
      contacts: [],
      user: this.$store.state.user,
    };
  },
  methods: {
    sendMessage(message, next, file) {
      console.log(message);
      console.log({ file });
      if (file) {
        // 上传图片文件
        const formData = new FormData();
        formData.append("file", file);
        uploadImg(formData).then((res) => {
          if (res.code === 200) {
            let url = res.url;
            newMessage({
              content: url,
              to: message.toContactId,
              file: url,
              type: "image",
            }).then((res) => {
              console.log(res);
              next();
            });
          }
        });
      } else {
        // 如果没有图片文件，直接发送文本消息
        newMessage({
          content: message.content,
          to: message.toContactId,
          file,
          type: "text",
        }).then((res) => {
          console.log(res);
          next();
        });
      }
    },
    handleMessageClick(contact, next) {
      const messages = [];
      messageList({ did: contact.id }).then((res) => {
        console.log(res);
        // const { IMUI } = this.$refs;
        for (let i = 0; i < res.data.length; i++) {
          let fromUser = {};
          let msgType = "text";
          if (res.data[i].uid === this.user.userid) {
            fromUser = this.user;
          } else {
            fromUser = contact;
          }
          if (res.data[i].type === "image") {
            msgType = "image";
          }
          messages.push({
            id: res.data[i].mid,
            status: "succeed",
            type: msgType,
            content: res.data[i].content,
            avatar: res.data[i].avatar,
            fromUser,
            toContactId: contact.id,
            sendTime: res.data[i].create_time,
          });
        }
        next(messages, true);
      });
    },
  },
  mounted() {
    const { IMUI } = this.$refs;
    //从后端请求联系人数据，包装成下面的样子
    // const contacts = [
    //   {
    //     id: 2,
    //     displayName: "丽安娜",
    //     avatar: "",
    //     index: "L",
    //     unread: 0,
    //     //最近一条消息的内容，如果值为空，不会出现在“聊天”列表里面。
    //     //lastContentRender 函数会将 file 消息转换为 '[文件]', image 消息转换为 '[图片]'，对 text 会将文字里的表情标识替换为img标签,
    //     lastContent: IMUI.lastContentRender({
    //       type: "text",
    //       content: "你在干嘛呢？",
    //     }),
    //     //最近一条消息的发送时间
    //     lastSendTime: 1566047865417,
    //   },
    // ];
    contactList().then((res) => {
      this.contacts = res.data;
      for (let i = 0; i < this.contacts.length; i++) {
        if (this.contacts[i].type === "image") {
          this.contacts[i].lastContent = IMUI.lastContentRender({
            type: "image",
            content: this.contacts[i].lastContent,
          });
        } else {
          this.contacts[i].lastContent = IMUI.lastContentRender({
            type: "text",
            content: this.contacts[i].lastContent,
          });
        }
      }
      IMUI.initContacts(this.contacts);
      IMUI.initEditorTools([{ name: "uploadImage" }]);
    });
  },
};
</script>