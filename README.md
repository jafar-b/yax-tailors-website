# Yax Tailors Website

An online platform developed using the MERN (MongoDB, Express.js, React.js, Node.js) stack, designed to showcase tailoring services and facilitate customer interactions.


https://github.com/user-attachments/assets/41f91ff7-05aa-4389-bb0d-ad8d6d3f57db

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Overview

This project serves as a learning endeavor to build a full-stack web application. It provides users with information about tailoring services, showcases a portfolio, and includes a contact form for inquiries.

## Features

- Responsive design compatible with various devices
- Showcase of tailoring services and portfolio
- Contact form for customer inquiries
- Navigation menu for easy access to different sections

## Technologies Used

- Frontend: React.js
- Backend: Node.js, Express.js
- Database: MongoDB
- Styling: CSS3

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/jafar-b/yax-tailors-website.git

2. **Navigate to the project directory:**
   ```bash
   cd yax-tailors-website
   ```

3. **Set up the backend:**
   ```bash
   cd backend
   npm install
   ```

4. **Create a `.env` file in the `backend` directory with the following fields:**
   ```env
   SECRET_KEY=your_jwt_secret_key
   PORT=5000
   DB_URL_Local=your_mongodb_connection_string
   ```

5. **Start the backend server:**
   ```bash
   npm start
   ```

6. **Set up the frontend:**
   ```bash
   cd ../yax_tailoring
   npm install
   ```

7. **Start the frontend development server:**
   ```bash
   npm start
   ```

## Usage

Once both servers are running:

- Access the frontend at `http://localhost:3000/`
- The backend API runs at `http://localhost:5000/`

Explore the website to view services, portfolio, and use the contact form to send inquiries.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any enhancements or bug fixes.

## License

This project is licensed under the [MIT License](LICENSE).

---

**Note**: This project was developed as a part of learning the MERN stack.

