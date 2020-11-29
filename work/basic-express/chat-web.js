const chatWeb = {
  chatPage: function(chat) {
    // Fill in anything below!
    return `
      <!doctype html>
      <html>
        <head>
          <title>Chat</title>
          <link type="text/css" rel="stylesheet" href="/chat.css" />
        </head>
        <body>
          <div id="chat-app">
            <div class="display-panel">
              ${chatWeb.getUserList(chat)}
              ${chatWeb.getMessageList(chat)}
            </div>
            ${chatWeb.getOutgoing(chat)}
          </div>
        </body>
      </html>
  `;
  },

  getMessageList: function(chat) {
    return (
      `<ol class="messages">` +
      // Fill in!
      chat.messages
        .map(
          (message) => `
      <li>
        <div class="message">
          <div class="sender">${message.sender}</div>
          <div class="timestamp">${message.timestamp}</div>
          <div ><span class="text">${message.text}</span></div>
        </div>
      </li>`
        )
        .join('') +
      `</ol>`
    );
  },

  getUserList: function(chat) {
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
        .join('') +
      `</ul>`
    );
  },

  getOutgoing: function() {
    // Fill in!
    return `
    <form class="outgoing" action="/chat" method="post">
        <input type="hidden" name="username" value="Jin">
        <input type='text' id="text" name="text" placeholder="type here...">
      </form>`;
  },
};
module.exports = chatWeb;
