
# PBA :: Personal Budget Assistant

## Introduction

PBA (Personal Budget Assistant) is a web-based budget management system that helps individuals track their expenses and income effectively. This README provides information about the project, its installation, usage, and how to contribute.

- **Frontend:** [PBA Budget System (React TypeScript)](https://www.realmigo.tech/)
- **Backend:** [PBA Budget System API (Django)](https://api.realmigo.tech/admin/)
- **Author's LinkedIn:** [Tonny Kirwa](https://www.linkedin.com/in/tonny-kirwa-957ba0104/)

**Final Project Blog Article**: [Link to Blog Article](https://www.linkedin.com/pulse/pba-personal-budget-assistant-tonny-kirwa)

![PBA Screenshot](https://raw.githubusercontent.com/tkirwa/pda_dj_frontend/main/src/assets/images/pda_screenshot_2023_09_13_11_03_48.png)

## Technologies Used

- React JS
- TypeScript
- Chart.js
- Semantic UI
  
## Installation

### Backend - PBA Budget System API (Django + DJRF + PostgreSQL)

1. Clone the repository:

   ```bash
   git clone https://github.com/tkirwa/pba_dj_backend.git
   cd pba-backend
   ```

2. Create a virtual environment and activate it (recommended):

   ```bash
   python3 -m venv venv
   source venv/bin/activate
   ```

3. Install dependencies:

   ```bash
   pip install -r requirements.txt
   ```

4. Configure the database in the `settings.py` file.

5. Apply database migrations:

   ```bash
   python manage.py migrate
   ```

6. Create a superuser account for administration:

   ```bash
   python manage.py createsuperuser
   ```

7. Start the development server:

   ```bash
   python manage.py runserver
   ```

The backend API should now be running at `http://localhost:8000/`.

### Frontend - PBA Budget System (React JS)

1. Clone the repository:

   ```bash
   git clone https://github.com/tkirwa/pda_dj_frontend.git
   cd pba-frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm start
   ```

The frontend application should now be running at `http://localhost:3000/`.

## Usage

- Open the PBA Budget System frontend in your browser.
- Sign up for an account or log in if you already have one.
- Start adding your expenses and income to track your budget effectively.

## Contributing

Contributions to this project are welcome! To contribute:

1. Fork the repository on GitHub.
2. Clone your forked repository to your local machine.
3. Create a new branch for your feature or bug fix: `git checkout -b feature/your-feature-name`.
4. Make your changes and commit them: `git commit -m 'Add some feature'`.
5. Push your changes to your forked repository: `git push origin feature/your-feature-name`.
6. Create a pull request on the original repository.

Please ensure your pull request follows the project's coding standards and conventions.

## Related Projects

- [PBA :: Personal Budget Backend API)](https://github.com/tkirwa/pba_dj_backend)

## Licensing

This project is open-source and available under the [MIT License](LICENSE).
