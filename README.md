# nestjs-graphql-demo
Very simple chat implementation attempt with graphql and nestjs

start:
>docker-compose up -d

go to 
>http://localhost:4000/graphql

first of all need register basic user:

`
mutation Register {
  register(email: "hello@hello.hh", password: "123456", name: "Lucky Boy"){
    result
  }
}
`
than login:

`
mutation Login {
  login(email: "hello@hello.hh", password: "123456") {
    profile{
      name
    }
    token
  }
}
`

for subscribe and publish messages need provide token with 'Authorization' header received from login response

`
{
  "Authorization": "your token here"
}
`

publish message:

`
mutation Say {
  say(message: "Hello, you are awesome!"){
    message
  }
}
`

subscribe:

`
subscription Chat {
  someChatRoom{
    message
  }
}
`

