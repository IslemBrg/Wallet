# NestJS GraphQL Wallet Management System

## Overview

This project is a Wallet Management System built with [NestJS](https://nestjs.com/), [GraphQL](https://graphql.org/), [TypeORM](https://typeorm.io/), and [PostgreSQL](https://www.postgresql.org/). It allows users to manage expenses, incomes, categories, and provides analytics for financial tracking.

## Features

- **GraphQL API** for managing expenses, incomes, and categories
- **Analytics**: Summaries and period-based analytics
- **PostgreSQL** database integration (Dockerized)
- **TypeORM** for data modeling
- **Swagger UI** for REST API documentation (if needed)
- **Environment-based configuration**

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16+ recommended)
- [npm](https://www.npmjs.com/)
- [Docker](https://www.docker.com/)

### 1. Clone the Repository

```bash
git clone https://github.com/IslemBrg/Wallet
cd <project-directory>
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up the Database (Docker)

Start the PostgreSQL database using Docker Compose:

```bash
docker compose -f src/docker/postrgesql.yml up -d
```

This will start a PostgreSQL 16.2 container with the following credentials:

- **User:** wallet_admin
- **Password:** wallet_pass
- **Database:** wallet_db
- **Port:** 5432

### 4. Configure Environment Variables

Create a `.env` file in the project root:

```env
# Database Configuration
DATABASE_URL=postgresql://wallet_admin:wallet_pass@localhost:5432/wallet_db
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USERNAME=wallet_admin
DATABASE_PASSWORD=wallet_pass
DATABASE_NAME=wallet_db

# Application Configuration
PORT=3000
NODE_ENV=development
```

### 5. Run the Application

For development (with hot reload):

```bash
npm run start:dev
```

For production build:

```bash
npm run build
npm run start:prod
```

## GraphQL API Usage

### Accessing GraphQL Playground

Once the app is running, open [http://localhost:3000/graphql](http://localhost:3000/graphql) in your browser. You can interactively run queries and mutations here.

### Example Queries & Mutations

#### Create a Category

```graphql
mutation {
  createCategory(
    createCategoryInput: {
      name: "Food"
      description: "Expenses for food"
      color: "#FF5733"
      type: expense
    }
  ) {
    id
    name
  }
}
```

#### Query All Categories

```graphql
query {
  categories {
    id
    name
    description
    color
    type
  }
}
```

#### Create an Expense

```graphql
mutation {
  createExpense(
    createExpenseInput: {
      amount: 25.50
      description: "Lunch"
      date: "2024-06-01"
      categoryId: "<CATEGORY_ID>"
    }
  ) {
    id
    amount
    description
  }
}
```

#### Query Expenses

```graphql
query {
  expenses {
    id
    amount
    description
    date
    category {
      name
    }
  }
}
```

#### Analytics Example

```graphql
query {
  walletSummary(startDate: "2024-06-01", endDate: "2024-06-30") {
    totalExpenses
    totalIncomes
    netAmount
    savingsRate
    period {
      startDate
      endDate
    }
  }
}
```

## Entities

### Category

- `id`: UUID
- `name`: string
- `description`: string (optional)
- `color`: string
- `type`: 'expense' | 'income' | 'both'
- `expenses`: Expense[]
- `incomes`: Income[]
- `createdAt`, `updatedAt`: Date

### Expense

- `id`: UUID
- `amount`: number
- `description`: string
- `date`: Date
- `notes`: string (optional)
- `category`: Category
- `categoryId`: string
- `createdAt`, `updatedAt`: Date

### Income

- `id`: UUID
- `amount`: number
- `description`: string
- `date`: Date
- `notes`: string (optional)
- `category`: Category
- `categoryId`: string
- `createdAt`, `updatedAt`: Date

## Analytics Queries

- `walletSummary(startDate, endDate)`: Get total expenses, incomes, net amount, and savings rate for a period.
- `periodAnalytics(year, month?)`: Get analytics for a specific year or month.
- `monthlyComparison(year)`: Compare analytics month-by-month for a year.
- 
- 

## Project Structure

- `src/expense/` — Expense entity, service, resolver
- `src/income/` — Income entity, service, resolver
- `src/category/` — Category entity, service, resolver
- `src/analytics/` — Analytics module, service, resolver
- `src/docker/` — Docker Compose files for database

## Dependencies

See `package.json` for a full list. Key dependencies:

- `@nestjs/core`, `@nestjs/graphql`, `@nestjs/typeorm`, `@nestjs/config`, `@nestjs/apollo`
- `typeorm`, `pg`, `graphql`, `apollo-server-express`
