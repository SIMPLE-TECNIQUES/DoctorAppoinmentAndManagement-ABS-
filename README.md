Admin can be registered only once , if application is cloned new .

**Admin**:
- email:siva@gmail.com
- password:12345678

**Project Name:** Doctor Appointment Application with RBAC

**Overview:**
This application is a role-based doctor appointment system where users can register, log in, and access functionalities based on their roles. The system integrates **Authentication**, **Authorization**, and **Role-Based Access Control (RBAC)** to manage access permissions and features securely. The roles include **Admin**, **Doctor**, and **User**.

**Key Features:**
1. **Role-Based Access Control (RBAC):**
   - **Admin:** 
     - Can promote a user to the role of a doctor.
     - Has access to manage all users and doctors.
   - **Doctor:** 
     - Can view their appointment schedule.
   - **User:** 
     - Can book appointments with doctors by selecting a time and date.
2. **Authentication:**
   - Secure registration and login using **JWT** tokens for session management.
   - **OAuth** integration for seamless third-party authentication.
3. **Authorization:**
   - Endpoint access restricted based on user roles (e.g., only Admin can assign roles or manage doctors).
4. **Appointment Booking:**
   - Users can book appointments with available doctors, selecting a specific time and date.
   - Doctors can view and manage their appointment schedules.

**Technologies Used:**
- **Frontend:** React.js
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JWT, OAuth (Google Sign-In)
- **Hosting:** Backend on Render, Frontend on Netlify

**Additional Details:**
- Passwords are securely hashed using **bcrypt**.
- Role permissions are implemented dynamically, ensuring scalability and flexibility.

**How RBAC is Implemented:**
- User roles are stored in the database and checked using middleware during API requests.
- Each endpoint is protected to ensure that only authorized roles can access it.

This project demonstrates a comprehensive understanding of **Authentication**, **Authorization**, and **Role-Based Access Control (RBAC)** while implementing practical functionality in a real-world application.
