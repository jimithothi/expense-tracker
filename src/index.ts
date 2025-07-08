import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import expensesRouter from './routes/expenses';
import statsRouter from './routes/stats';
import userRouter from './routes/user';
import categoryRouter from './routes/category';

dotenv.config();

const app = express();
// Security middleware
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json({ limit: "10kb" }));

app.get('/', (req: Request, res: Response) => {
  res.send('API Live');
});

app.use('/expenses', expensesRouter);
app.use('/stats', statsRouter);
app.use('/user', userRouter);
app.use('/category', categoryRouter);

(async () => {
  try {
    console.log("Database connected successfully.");
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    process.exit(1);
  }
})(); 

export default app;
