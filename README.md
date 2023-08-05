



技术栈: Next.js 13, React, Tailwind, Prisma, MongoDB, NextAuth, Pusher.


Key Features:
- 使用 Pusher 进行实时消息传递
- 过渡效果
- 响应式
- 使用 NextAuth 进行第三方登录认证
- 谷歌身份验证集成
- 使用Cloudinary CDN上传文件和图像
- 使用react-hook-form进行客户端表单验证和处理
- 消息已读提醒
- 在线/离线用户状态
- 群组聊天和一对一消息传递
- 消息附件和文件上传
- 用户个人资料编辑
- 在api路由(app/api) 中编写 POST、GET 和 DELETE等后端逻辑
- 在实时环境中处理服务器和子组件之间的关系
- 创建和管理聊天室和频道


### Prerequisites

**Node version 14.x**

### Install packages

```shell
pnpm i
```

### Setup .env file


```js
DATABASE_URL=
NEXTAUTH_SECRET=

NEXT_PUBLIC_PUSHER_APP_KEY=
PUSHER_APP_ID=
PUSHER_SECRET=

NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=

GITHUB_ID=
GITHUB_SECRET=

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
```

### Setup Prisma

```shell
pnpm prisma db push

```

### Start the app

```shell
pnpm run dev
```


