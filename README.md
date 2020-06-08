# nestjs-graphql-demo
Very simple chat implementation attempt with graphql and nestjs

start:
>npm i
>
>docker-compose up -d

go to http://localhost:4000/graphql

first of all need register basic user:

```javascript
mutation Register {
  register(email: "hello@hello.hh", password: "123456", name: "Lucky Boy"){
    result
  }
}
```
then login:

```javascript
mutation Login {
  login(email: "hello@hello.hh", password: "123456") {
    profile{
      name
    }
    token
  }
}
```

for subscribe and publish messages need provide token with 'Authorization' header received from login response

```javascript
{
  "Authorization": "your token here"
}
```

publish message:

```javascript
mutation Say {
  say(message: "Hello, you are awesome!"){
    message
  }
}
```

subscribe:

```javascript
subscription Chat {
  someChatRoom{
    message
  }
}
```

