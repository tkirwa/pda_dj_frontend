# MVP – Personal Budget Assistant Frontend

This is the frontend component of the MVP (Minimum Viable Product) for the Personal Budget Assistant application. The frontend is built using React with TypeScript. It uses Plotly and Chart.js for data visualization.

## Features

- React: A JavaScript library for building user interfaces.
- TypeScript: A superset of JavaScript that adds static types.
- Plotly: A graphing library for interactive and shareable visualizations.
- Chart.js: A popular charting library for creating static, animated, and interactive charts.

## Getting Started

1. Clone this repository.
2. Navigate to the `pba_frontend` directory.
3. Install the required dependencies using `npm install`.
4. Start the development server using `npm start`.

## User Interface

The frontend provides a user-friendly interface for user registration, login, dashboard visualization, and settings configuration.

## Data Visualization

Data visualization is powered by Plotly and Chart.js, providing users with interactive and informative charts to better understand their financial data.

---

# MVP – Personal Budget Assistant Backend

This is the backend component of the MVP (Minimum Viable Product) for the Personal Budget Assistant application. The backend is built using Django and Django Rest Framework. It uses PostgreSQL as the database and Django Knox for authentication.

## Features

- Django: A powerful and flexible web framework for building web applications.
- Django Rest Framework: A toolkit for building Web APIs in Django applications.
- PostgreSQL: A popular open-source relational database management system.
- Django Knox: A package for token-based authentication in Django applications.

## Getting Started

1. Clone this repository.
2. Navigate to the `pba_backend` directory.
3. Install the required dependencies using `pip install -r requirements.txt`.
4. Configure the PostgreSQL database settings in the `settings.py` file.
5. Run database migrations using `python manage.py migrate`.
6. Start the development server using `python manage.py runserver`.

## API Endpoints

- `/api/expenses/`: Endpoint for managing expenses.
- `/api/incomes/`: Endpoint for managing incomes.
- `/api/settings/`: Endpoint for user-specific settings.

## Authentication

Token-based authentication is implemented using Django Knox. Users can register, login, and perform authorized actions by obtaining and using tokens.

---

**pba_frontend/README.md:**

Please make sure to customize these README files according to your project's actual structure, setup, and additional information you'd like to provide to users.
