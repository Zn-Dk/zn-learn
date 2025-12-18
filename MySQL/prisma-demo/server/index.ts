import express from "express";
// 新版本改为从生成的文件里引用
// import { PrismaClient } from "@prisma/client";
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import { PrismaClient } from '../prisma/generated/client';
import path from "node:path";

const adapter = new PrismaMariaDb({
  host: process.env.DATABASE_HOST!,
  user: process.env.DATABASE_USER!,
  password: process.env.DATABASE_PASSWORD!,
  database: process.env.DATABASE_NAME!,
  connectionLimit: 5
});

const prisma = new PrismaClient({ adapter });
const app = express();


app.use(express.json());
app.use(express.static(path.resolve(__dirname, '../client')));

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});


app.get('/api/users', async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

app.get('/api/users/:id', async (req, res) => {
  const { id } = req.params;
  const user = await prisma.user.findUnique({
    where: {
      id: Number(id)
    }
  })
  if (!user) {
    res.status(404).json({ error: 'User not found' });
    return;
  }
  res.json(user);
});

app.post('/api/createUser', async (req, res) => {
  const { name, email, desc } = req.body;
  const user = await prisma.user.create({
    data: {
      name,
      email,
      desc
    }
  })
  res.json(user);
});

app.post('/api/create', async (req, res) => {
  const { name, email, desc } = req.body;
  const user = await prisma.user.create({
    data: {
      name,
      email,
      desc,
      // 嵌套创建 post, prisma 会关联到 post 表中
      posts: {
        create: [
          { title: 'Post 1', content: 'Content 1' },
          { title: 'Post 2', content: 'Content 2' }
        ]
      }
    }
  })
  res.json(user);
});

// 单独创建 post
app.post('/api/createPost', async (req, res) => {
  const { title, content, authorId } = req.body;
  const post = await prisma.post.create({
    data: {
      title,
      content,
      author: {
        // 连接模式, 关联已在 user 表中用户
        // connect: { id: Number(authorId) },
        // 创建模式
        // create: { name: 'default', email: 'default@example.com' },
        // 连接或创建模式
        connectOrCreate: {
          where: { id: Number(authorId) },
          create: { name: 'default', email: 'default@example.com', desc: '' }
        }
      }
    }
  })
  res.json(post);
})


app.post('/api/updateUser/:id', async (req, res) => {
  const { id } = req.params;
  const { name, email, desc } = req.body;
  await prisma.user.update({
    where: { id: Number(id) },
    data: { name, email, desc }
  });
  res.send({ msg: 'OK' });
});

app.post('/api/updatePost/:id', async (req, res) => {
  await prisma.post.update({
    where: { id: Number(req.params.id) },
    data: { title: req.body.title, content: req.body.content }
  })
  res.send({ msg: 'OK' });
})


app.post('/api/deleteUser/:id', async (req, res) => {
  const { id } = req.params;
  await prisma.user.delete({
    where: { id: Number(id) }
  });
  res.send({ msg: 'OK' });
});
