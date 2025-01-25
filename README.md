# Innoveda: College Research Paper Web Application

## Introduction
Innoveda is a MERN stack-based web application designed to streamline the submission and review process for college research papers. It facilitates collaboration between students and faculty, providing a platform for students to upload research papers and receive feedback from their associated faculty members.

---

## Features

### For Students:
- **Group Registration**: Students can register as a group to work collaboratively.
- **Research Paper Upload**: Upload PDF versions of research papers.
- **View Comments**: Access feedback and comments provided by faculty on the uploaded research papers.

### For Faculty:
- **Login for Faculty**: Secure login for teachers to access student submissions.
- **Review Papers**: Check the research papers uploaded by students.
- **Provide Feedback**: Add comments and review notes for students to improve their work.

---

## Technologies Used
Innoveda leverages the MERN stack:
- **MongoDB**: Database to store user information, research papers, and feedback.
- **Express.js**: Backend framework for server-side logic.
- **React.js**: Frontend library for building a dynamic and responsive user interface.
- **Node.js**: Runtime environment for building the server-side application.

Other technologies:
- **React-Bootstrap**: For styling and responsive design.
- **Multer**: For file uploads (handling PDF files).
- **Joi**: For schema validation.
- **React PDF**: For pdf viewer.
---

## Installation and Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- Git

### Steps to Run the Application
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/Pranav-Sutar47/Innoveda.git
   ```
2. **Navigate to the Project Directory**:
   ```bash
   cd InnovedaFrontend
   ```
3. **Install Dependencies**:
   ```bash
   npm install
   ```
   Repeat the above steps in the backend directory if available.

4. **Set Up Environment Variables**:
   Create a `.env` file in both the frontend and backend directories with the required configurations:
   ```env
   # Backend .env example
   PORT=5000
   MONGO_URI=your_mongo_connection_string
   JWT_SECRET=your_jwt_secret

   # Frontend .env example
   REACT_APP_BACKEND_URL=http://localhost:5000
   ```

5. **Start the Application**:
   - **Frontend**:
     ```bash
     npm start
     ```
   - **Backend**:
     ```bash
     npm run dev
     ```

6. **Access the Application**:
   Open your browser and navigate to `http://localhost:5173`.

---

## Folder Structure
```
Innoveda/
├── backend/
│   ├── models/          # Database schemas
│   ├── routes/          # API routes
│   ├── controllers/     # Request handlers
│   └── index.js        # Entry point for backend
├── frontend/
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── pages/       # Application pages
│   │   └── App.js       # Main React component
└── README.md
```

---

## Contributing
Contributions are welcome! If you'd like to contribute:
1. Fork the repository.
2. Create a feature branch (`git checkout -b feature-name`).
3. Commit your changes (`git commit -m "Add feature"`).
4. Push to the branch (`git push origin feature-name`).
5. Create a pull request.

---

## Contact
For any queries, please reach out to:
- **Developer**: Pranav Sutar
- **Email**: pranavsutar4747@gmail.com.


