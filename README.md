# 💰 SmartFinance

A fully functional web application for **personal financial control**, allowing users to manage income and expenses while visualizing data through interactive and dynamic dashboards.

## 🛠️ Tech Stack

This project was built using modern web development standards:

* **React** with **TypeScript**: Ensuring robust type safety and a component-based UI.
* **TanStack Router**: For type-safe routing and seamless navigation with automatic route generation.
* **Tailwind CSS**: Utility-first CSS for a responsive, clean, and modern design.
* **Recharts**: High-performance charting library for financial data visualization.
* **Radix UI**: High-quality primitives for accessible components like Modals and Selects.
* **Framer Motion**: For smooth transitions and polished UI animations.
* **date-fns**: Precise and lightweight date manipulation for financial periods.

## ✨ Key Features

* **Complete Transaction Management**:
    * **Inflow (Income)**: Register and categorize your earnings.
    * **Outflow (Expenses)**: Track your spending with detailed descriptions.
* **Interactive Dashboard**:
    * **Real-time Metrics**: View total balance, total income, and total expenses at a glance.
    * **Savings Percentage**: Automatic calculation of how much of your income is being saved.
    * **Category Breakdown**: Visual charts showing where your money is going.
    * **Monthly Trends**: Track your financial evolution over time.
* **Advanced Controls**:
    * **Data Filtering**: Easily find specific transactions by period or type.
    * **CRUD Operations**: Full ability to Create, Read, Update, and Delete financial records.
* **Clean Code Architecture**: Logic separation using **Custom Hooks** for state management and **Utility Functions** for currency and date formatting.

## 🚀 Getting Started

Follow these steps to run the project locally:

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/LarissaOlimpio/smartFinance.git](https://github.com/LarissaOlimpio/smartFinance.git)
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```

4.  **Open in your browser:**
    Navigate to `http://localhost:5173`

> [!IMPORTANT]
> This project uses the **TanStack Router CLI**. The `npm run dev` command uses `concurrently` to run both Vite and the route generator (`tsr watch`) simultaneously. The `routeTree.gen.ts` file will be generated automatically on the first run.

## 🏗️ Project Structure

```text
src/
 ├── assets/         # Static files (images, icons)
 ├── components/     # UI Components (Buttons, Modals, Cards)
 ├── constants/      # Global constants and configurations
 ├── hooks/          # Custom hooks for business logic and state
 ├── routes/         # Route definitions (TanStack Router)
 ├── types/          # TypeScript Interfaces and definitions
 ├── utils/          # Utility functions (Formatters, Validators)
 ├── App.tsx         # Main application component
 └── main.tsx        # Application entry point

```


 Developed with ❤️ by Larissa Olimpio
