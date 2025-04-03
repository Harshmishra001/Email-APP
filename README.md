# Email App

This application allows users to create nodes in a flow diagram, and schedule emails with a delay.

## Features
- **Node Management**: Add and manage nodes in a flow diagram.
- **Email Scheduling**: Schedule emails with a specified delay.

## Setup

### Backend
1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the `backend` directory and add the following:
   ```
   MONGO_URI=<your_mongo_uri>
   EMAIL_USER=<your_email>
   EMAIL_PASS=<your_email_password>
   ```

4. Start the backend server:
   ```bash
   npm start
   ```

### Frontend
1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the `frontend` directory and add the following:
   ```
   VITE_API_URL=http://localhost:3000
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open the app in your browser at `http://localhost:5173`.

## Usage

### Schedule an Email
1. Fill in the recipient's email, subject, body, and delay in the email form.
2. Click the **Schedule Email** button.
3. A success message will appear if the email is scheduled successfully.

### Node Management
1. Use the **NodeControls** component to add nodes to the flow diagram.
2. Drag and connect nodes as needed.

## Troubleshooting
- Ensure the API URL in the `.env` file is correct.
- Check the browser console for detailed error messages if something goes wrong.

## File Structure

```
email-app/
├── backend/
│   ├── config/
│   │   ├── agenda.js
│   │   ├── nodemailer.js
│   ├── controllers/
│   │   └── emailController.js
│   ├── routes/
│   │   └── emailRoutes.js
│   ├── .env
│   ├── .gitignore
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   └── NodeControls.jsx
│   │   ├── styles/
│   │   │   └── App.css
│   │   ├── App.jsx
│   │   ├── index.css
│   │   ├── index.jsx
│   │   └── main.jsx
│   ├── .env
│   ├── .gitignore
│   ├── eslint.config.js
│   ├── package.json
│   └── vite.config.js
├── README.md
```

## License
This project is licensed under the MIT License. See the LICENSE file for details.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request with your changes.

## Contact

For any questions or feedback, please contact [harsh.mishra.332003@gmail.com].
