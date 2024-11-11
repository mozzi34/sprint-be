import * as dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import userRoute from './src/routes/user.js';
import authRoute from './src/routes/auth.js';
import freeboardRoute from './src/routes/freeboard.js';
import fleamarketRoute from './src/routes/fleamarket.js';
import commentRoute from './src/routes/comment.js';
import favoriteRoute from './src/routes/favorite.js';
import errorHandler from './src/middlewares/errorHandler.js';
import { swaggerDocs } from './src/config/swagger.js';
import swaggerUi from 'swagger-ui-express';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
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
