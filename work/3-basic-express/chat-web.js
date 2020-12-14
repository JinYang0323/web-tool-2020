const chatWeb = {
    chatPage: function (chat) {
        return `
      <!doctype html>
      <html>
        <head>
          <title>Chat</title>
          <link type="text/css" rel="stylesheet" href="/chat.css" />
        </head>
        <body>
          <div id="chat-app">
            <div class="user-panel">
              ${chatWeb.getUserList(chat)}
            </div>
            <div class="message-panel">
              ${chatWeb.getMessageList(chat)}
              ${chatWeb.getOutgoing(chat)}
            </div>
          </div>
        </body>
      </html>
  `;
    },

    getMessageList: function (chat) {
        return (
            `<ol class="messages">` +
            chat.messages
                .map(
                    (message) => `
                  <li>
                    <div class="message">
                      <div class="message-sender">${message.sender}</div>
                      <div class="message-timestamp">${message.timestamp}</div>
                      <div><span class="message-text">${message.text}</span></div>
                    </div>
                  </li>`
                )
                .join("") +
            `</ol>`
        );
    },

    getUserList: function (chat) {
        return (
            `<ul class="users">` +
            Object.values(chat.users)
                .map(
                    (user) => `
                  <li class="user">
                    <div>
                      <span class="username">${user}</span>
                    </div>
                  </li>
                `
                )
                .join("") +
            `</ul>`
        );
    },

    getOutgoing: function () {
        return `
        <div class="outgoing-panel">
          <form class="outgoing" action="/chat" method="post" id="sending-form">
              <input class="hidden" name="username" value="Jin">
              <textarea id="text" name="text" rows="7" placeholder="type here..."></textarea>
              <input class="send-button" type='submit' value="Send">
            </form>
          </div>`;
    },
};
module.exports = chatWeb;
