# Loan Application Processing System - Takehome Project

## Overview

This takehome project evaluates your ability to build a loan application processing system using TypeScript, Express.js, and TypeORM. The boilerplate provides a foundation with mock external services, and you'll implement the core business logic, data models, and background processing.

As far as you're able to get in 2 - 4 hours. We can discuss plan to complete from there rather than needing to spend time on full coverage.

## What's Provided

This boilerplate includes:

- **Express.js + TypeScript** setup with a basic server
- **TypeORM** configured to connect to PostgreSQL
- **Docker Compose** for local PostgreSQL database
- **Mock Services** that simulate external systems:
  - `decisioningService.ts` - Simulates loan decisioning with ~30s latency, returns APPROVED/DENIED
  - `submissionService.ts` - Simulates final submission of approved loans (always succeeds)
- **Example implementations**:
  - `ExampleEntity.ts` - Shows TypeORM entity pattern
  - `exampleRoutes.ts` - Shows basic Express routing and repository usage

## What You Need to Build

### 1. Loan Application Model (`src/models/LoanApplication.ts`)

Create a TypeORM entity that includes:

**User-submitted fields:**
- Applicant name
- Email address
- Loan amount requested
- Requested payment interval (bi-weekly or monthly)
- Term (monthly: 12, 24, 36. bi-weekly: 26, 52)
- Loan purpose (e.g., "home", "auto", "business")

**Calculated fields** (computed before saving):
- `riskScore` - A number (0-100) based on loan amount
- `processingFee` - A dollar amount based on loan amount
- `estimatedMonthlyPayment` - Estimated monthly payment (you define the calculation)

**System fields:**
- Status (e.g., "PENDING", "DECISIONED", "SUBMITTED", "APPROVED", "DENIED")
- Decision result (approved/denied, populated after decisioning)
- Submission ID (populated after successful submission)
- Timestamps (created/updated)

### 2. Business Logic Layer

Create a service/utility that:
- Takes raw application data as input
- Calculates the 3 required fields (`riskScore`, `processingFee`, `estimatedMonthlyPayment`)
- Returns the complete application ready for storage

You define the calculation logic - it doesn't need to be realistic, just demonstrate the pattern.

### 3. Application Router (`src/routes/loanApplicationRoutes.ts`)

Create a POST endpoint that:
- Receives loan application data
- Validates required fields
- Applies business logic to calculate fields
- Saves to database with status "PENDING"
- Returns the created application

### 4. Background Scheduler/Processor

Build a system that:
- Runs periodically to find PENDING applications
- **Batches** them for processing (you decide batch size and timing)
- For each application in a batch:
  1. Calls `requestDecision()` from the mock decisioning service
  2. If APPROVED, calls `submitApplication()` from the mock submission service
  3. Updates the database with the current status and results
- Handles the decisioning service's 30-second latency appropriately

**Key considerations:**
- How will you handle concurrent processing?
- How will you structure batching to be efficient?
- What happens if the server restarts mid-processing?

### 5. Database Schema

Using TypeORM migrations:
- Create the initial schema for your LoanApplication entity
- Ensure proper indexes for fields you'll query frequently

## Setup Instructions

### Prerequisites
- Node.js (v18+ recommended)
- Docker and Docker Compose
- PostgreSQL client (optional, for debugging)

### Getting Started

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set up environment**
   ```bash
   cp .env.example .env
   # Edit .env if needed (defaults should work)
   ```

3. **Start PostgreSQL**
   ```bash
   docker-compose up -d
   ```

4. **Create and run migrations**
   ```bash
   # Generate a migration (after creating your entity)
   npm run typeorm migration:generate -- -d src/data-source.ts src/migrations/InitialSchema

   # Run migrations
   npm run typeorm migration:run -- -d src/data-source.ts
   ```

5. **Run the application**
   ```bash
   # Development mode (with auto-reload)
   npm run dev

   # Or build and run production
   npm run build
   npm start
   ```

6. **Test the health endpoint**
   ```bash
   curl http://localhost:3000/health
   ```

## Project Structure

```
src/
├── data-source.ts              # TypeORM configuration
├── index.ts                    # Express server entry point
├── models/
│   ├── ExampleEntity.ts        # Example TypeORM entity (reference)
│   └── LoanApplication.ts      # [YOU BUILD THIS]
├── routes/
│   ├── exampleRoutes.ts        # Example router (reference)
│   └── loanApplicationRoutes.ts # [YOU BUILD THIS]
├── services/
│   ├── mock/
│   │   ├── decisioningService.ts  # Provided mock service
│   │   └── submissionService.ts   # Provided mock service
│   └── [your business logic here]
├── migrations/                 # [YOU CREATE THESE]
└── [scheduler/worker code]     # [YOU BUILD THIS]
```
