# Expenses Backend (Node.js + MySQL)

## Features
- Add, update, and delete expenses
- List expenses with filters
- Statistics:
  - Top 3 days by expenditure per user
  - % change in total expenditure from previous month per user
  - Predict next month's total expenditure (average of last 3 months)

## Tech Stack
- Node.js (Express, TypeScript)
- MySQL (no ORM)

## Setup
1. **Install dependencies:**
   ```sh
   npm install
   ```
2. **Configure environment:**
   Create a `.env` file:
   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=yourpassword
   DB_NAME=expenses
   PORT=5000
   CORS_ORIGIN=*
   ```
3. **Create MySQL tables:**
   ```sql
   CREATE TABLE Users (
     id INT AUTO_INCREMENT PRIMARY KEY,
     name VARCHAR(50),
     email VARCHAR(100),
     status VARCHAR(20)
   );
   CREATE TABLE Categories (
     id INT AUTO_INCREMENT PRIMARY KEY,
     name VARCHAR(50)
   );
   CREATE TABLE Expenses (
     id INT AUTO_INCREMENT PRIMARY KEY,
     user_id INT,
     category INT,
     amount DECIMAL(10,2),
     date DATE,
     description VARCHAR(255)
   );
   ```
   Populate `Users` and `Categories` manually as needed.

4. **Run the server:**
   ```sh
   npm run dev
   ```

## API
### Expenses
- `POST /expenses` — Add expense
  - Body: `{ user_id, category, amount, date, description }`
- `PUT /expenses/:id` — Update expense
  - Body: `{ user_id, category, amount, date, description }`
- `DELETE /expenses/:id` — Delete expense
- `GET /expenses` — List expenses (with optional filters)
  - Query params: `user_id`, `category`, `start_date`, `end_date`

### Statistics
- `GET /stats/top-days` — Top 3 days by expenditure per user
- `GET /stats/monthly-change` — % change in total expenditure from previous month per user
- `GET /stats/predict-next-month` — Predict next month's total expenditure per user

### User
- `POST /user` — Add user
  - Body: `{ name, email, status }`

### Category
- `POST /category` — Add category
  - Body: `{ name }`

--- 