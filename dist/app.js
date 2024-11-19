import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import userRoute from './routes/user';
import authRoute from './routes/auth';
import freeboardRoute from './routes/freeboard';
import fleamarketRoute from './routes/fleamarket';
import commentRoute from './routes/comment';
import favoriteRoute from './routes/favorite';
import errorHandler from './middlewares/errorHandler';
const app = express();
app.use(cors());
app.use(express.json());
app.get('/', (req, res) => {
    res.send('default path');
});
app.use('/freeboard', freeboardRoute);
app.use('/fleamarket', fleamarketRoute);
app.use('/comment', commentRoute);
app.use('/user', userRoute);
app.use('/favorite', favoriteRoute);
app.use('/auth', authRoute);
app.use('/uploads', express.static('uploads'));
app.use(errorHandler);
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
