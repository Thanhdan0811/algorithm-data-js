# Khai báo router.

```
// tạo file user.routes.ts
import {Router} from "express";
const userRouter = Router();

userRouter.get('/tweets', (req, res, next) => {
    console.log("sending");
    res.json({data: [
        {
            id: 1,
            text: 'hello world'
        }
    ]});
});

userRouter.use((req, res, next) => {
    console.log("after get");
    next();
})

export default userRouter;

<!-- index.ts -->
import express from 'express';
import userRouter from './user.routes';
const app = express();
const PORT = 3000;

app.use('/user', userRouter);  // dòng này qtrong , cần phải có use để dùng routes của user. phải có tiền tố /user hoặc đơn giản là /.

app.get('/', (req, res) => {
    res.send('Hello World')
});

app.listen(PORT, () => {
    console.log("Server Started!!!")
})

```