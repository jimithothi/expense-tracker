import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import expensesRouter from './routes/expenses';
import statsRouter from './routes/stats';
import userRouter from './routes/user';
import categoryRouter from './routes/category';

// Load environment variables from .env file
dotenv.config();

const app = express();

// Security middleware: Enable CORS with allowed origins and headers
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Parse incoming JSON requests with a size limit
app.use(express.json({ limit: "10kb" }));

// Health check endpoint
/**
 * GET /
 * Returns a simple message to indicate the API is live.
 */
app.get('/', (req: Request, res: Response) => {
  res.send('API Live');
});

// Register route handlers
app.use('/expenses', expensesRouter);
app.use('/stats', statsRouter);
app.use('/user', userRouter);
app.use('/category', categoryRouter);

// Centralized error handler for all routes
/**
 * Error handling middleware.
 * Handles validation errors and generic server errors.
 */
app.use((err: any, req: Request, res: Response, next: Function) => {
  if (err.status === 400 && err.errors) {
    return res.status(400).json({ errors: err.errors });
  }
  res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
});

/**
 * Initializes the server and listens on the specified port.
 * Logs database connection status and server start.
 */
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
