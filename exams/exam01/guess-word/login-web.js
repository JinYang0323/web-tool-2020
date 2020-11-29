const loginWeb = {
    loginPage: function() {
        return `
        <!doctype html>
        <html>
            <head>
                <title>Guess Word Login</title>
                <link type="text/css" rel="stylesheet" href="/login-web.css" />
            </head>
            <body>
                <div class="loginPanel">
                    <form action="/login" method="POST">
                        <input name="username">
                        <button type="submit">Login</button>
                    </form> 
                </div>
            </body>
        </html>`
    }
}

module.exports = loginWeb;