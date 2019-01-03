function LoginForm(){
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <meta http-equiv="X-UA-Compatible" content="ie=edge"/>
        <title>Document</title>
    </head>
    <body>
        <form action="/login" method="POST" class="login-container">
            <p><input type="text" placeholder="Username" name="username"></p>
            <p><input type="password" placeholder="Password" name="password"></p>
            <p><button type="submit">Login</button></p>
            <p>Not a member? <a href="/register">Sign up now</a> 
        </form>
    </body>
    </html>
    `;
}

module.exports = LoginForm;