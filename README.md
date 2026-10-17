# Gather. — Event Registration System

A full-stack event management and registration platform built with **Node.js, Express, MongoDB, and vanilla JavaScript**.

Gather. provides a simple experience for discovering events, viewing event details, registering for events, and managing attendees through an organizer dashboard.

## Overview

Gather. is a web application designed to connect event discovery with practical event management. Visitors can explore upcoming events, search and filter listings, view event information, and reserve their spots. Organizers can sign in, publish events, review registrations, and cancel registrations through a dashboard.

## Features

### For attendees

- Browse available events.
- Search events by keyword.
- Filter events by category.
- View event descriptions, dates, venues, and capacity.
- Register using a name and email address.
- Receive validation when attempting duplicate registrations.

### For organizers

- Register an organizer account and log in.
- Access an organizer dashboard.
- Create and publish events.
- View event listings and registration statistics.
- Review attendee names, email addresses, and associated events.
- Cancel registrations.

### Technical features

- REST API built with Express.
- MongoDB persistence using Mongoose.
- Password hashing with bcrypt.
- JSON Web Token (JWT) authentication.
- Protected event-creation endpoint.
- Request validation and duplicate-registration checks.
- Responsive frontend built with HTML, CSS, and JavaScript.

## Tech Stack

| Technology            | Purpose                     |
| --------------------- | --------------------------- |
| HTML, CSS, JavaScript | Frontend interface          |
| Node.js               | JavaScript runtime          |
| Express.js            | Backend API and routing     |
| MongoDB Atlas         | Database                    |
| Mongoose              | Database models and queries |
| bcryptjs              | Password hashing            |
| jsonwebtoken          | Organizer authentication    |
| dotenv                | Environment configuration   |

## Getting Started

### Prerequisites

Install the following before running the application:

- [Node.js](https://nodejs.org/)
- [Git](https://git-scm.com/)
- A MongoDB database, such as [MongoDB Atlas](https://www.mongodb.com/atlas)

### 1. Clone the repository

```bash
git clone https://github.com/devbysavage/Codealpha-Gather-Event-Registration-System.git
cd Codealpha-Gather-Event-Registration-System
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the project root:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_long_random_secret
```

Replace the example values with your own configuration. Never commit `.env` or publish your database credentials or JWT secret.

### 4. Start the server

```bash
node server.js
```

When the database connection succeeds, the server should report that MongoDB is connected and the server is running on port 5000.

### 5. Open the application

Visit these local URLs in your browser:

- **Homepage:** [http://localhost:5000](http://localhost:5000)
- **Organizer dashboard:** [http://localhost:5000/dashboard.html](http://localhost:5000/dashboard.html)
- **Events API:** [http://localhost:5000/api/events](http://localhost:5000/api/events)

## API Endpoints

The following endpoints are implemented in the application.

| Method | Endpoint                   | Purpose                                            |
| ------ | -------------------------- | -------------------------------------------------- |
| GET    | `/api/events`              | Retrieve event listings                            |
| GET    | `/api/events/:id`          | Retrieve an individual event                       |
| POST   | `/api/events`              | Create an event; requires organizer authentication |
| POST   | `/api/events/:id/register` | Register for an event                              |
| GET    | `/api/registrations`       | Retrieve registrations                             |
| DELETE | `/api/registrations/:id`   | Cancel a registration                              |
| POST   | `/api/auth/register`       | Register an organizer account                      |
| POST   | `/api/auth/login`          | Authenticate an organizer                          |

Protected requests use a JWT in the authorization header:

```http
Authorization: Bearer YOUR_JWT_TOKEN
```

## Project Structure

```text
Codealpha-Gather-Event-Registration-System/
├── middleware/
│   └── authMiddleware.js
├── models/
│   ├── Event.js
│   ├── Organizer.js
│   ├── Registration.js
│   └── User.js
├── public/
│   ├── index.html
│   └── dashboard.html
├── routes/
│   ├── authRoutes.js
│   ├── eventRoutes.js
│   └── registrationRoutes.js
├── .gitignore
├── package.json
├── package-lock.json
├── server.js
└── README.md
```

## Testing

During development, the following application flows were tested manually:

- Event listing and individual event retrieval.
- Event search and category filtering.
- Organizer login and dashboard access.
- Event creation and publication.
- Successful attendee registration.
- Duplicate-registration rejection.
- Attendee listing and registration cancellation.
- Organizer authentication for event creation.

## Future Improvements

- Deploy the application for public access.
- Add automated API tests.
- Improve role-based authorization and registration ownership checks.
- Add pagination and more advanced event filtering.
- Improve accessibility and user feedback.
- Add event editing and deletion for organizers.

## Author

**Dev by Savage&#x20;**

GitHub: [@devbysavage](https://github.com/devbysavage)

---

Built as a practical full-stack project to develop skills in backend development, REST APIs, database integration, authentication, and frontend integration.
