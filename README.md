
# Smart Campus Placement Portal

A full-stack web application for managing campus placements, connecting students, recruiters, and college administrators.

## Tech Stack

- **Frontend**: React.js, Tailwind CSS, React Router, Axios
- **Backend**: Node.js, Express.js
- **Database**: MySQL
- **Authentication**: JWT (JSON Web Tokens), bcrypt for password hashing

## Features

### Student Module
- Registration and Login
- Dashboard with job statistics
- Profile management
- View and apply for jobs
- Track application status

### Recruiter Module
- Registration and Login (pending admin approval)
- Dashboard with job and application statistics
- Post and manage jobs
- View and shortlist applicants

### Admin Module
- Admin login
- Dashboard with overall statistics
- Manage students (view, delete)
- Manage recruiters (approve, block)

## Installation & Setup

### Prerequisites
- Node.js
- MySQL

### Database Setup
1. Create a MySQL database named `smart_campus_placements`
2. Import the `database.sql` file to create tables and insert sample data
3. Update the database credentials in `backend/.env`

### Backend Setup
1. Navigate to `backend` directory
2. Run `npm install`
3. Create `.env` file with:
   ```
   PORT=5000
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_password
   DB_NAME=smart_campus_placements
   JWT_SECRET=your_jwt_secret
   NODE_ENV=development
   ```
4. Run `npm start` or `npm run dev`

### Frontend Setup
1. Navigate to `frontend` directory
2. Run `npm install`
3. Run `npm start`

## Default Credentials

- **Admin**: Email - admin@college.edu (You need to hash a password and insert into the database)
- **Students**: john@student.edu, jane@student.edu
- **Recruiter**: mike@techcorp.com (status: approved)

## Project Structure

```
smart-campus-placements-portal/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── routes/
│   ├── .env
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── App.js
│   │   └── index.js
│   ├── package.json
│   ├── tailwind.config.js
│   └── postcss.config.js
├── database.sql
└── README.md
```

