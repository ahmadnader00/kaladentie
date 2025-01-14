"# kaladentie" 

mern (mongodb,express.js,react.js,node.js) project

The project aims to build a web-based system for interaction between dental students and patients at Al-Qalamoun University by facilitating and improving the procedures for booking and managing appointments, simplifying and facilitating the communication process between students and patients, and providing an easy-to-use interface for users to achieve quality healthcare for patients at the Faculty of Dentistry at Al-Qalamoun University.
This project introduced a system to automate the communication process between dental students and patients. It allows patients to send a request to a specific student and allows each student to view available patient cases. This system helps to:
• Facilitate communication and coordination between students and patients.
• Develop student skills by providing opportunities for students to train on different dental cases.
• Improve the efficiency of the administrative process by allowing students and patients to manage their personal accounts, schedule appointments, and update information easily.

Functional requirement is a statement of how the system should behave. What are the functions that the system should provide.
For our system, the functions that will be implemented are:
➢ Administrator:
• Login.
• View patient details.
• Delete patient.
• View student details.
• Delete student.
• View student appointments.
• View reservations.
• Delete reservation.
• Accept reservation.
• View student requests. (Accept student request, reject student request)
• Book an appointment with a student.
• Edit supervisor profile.
• Log out.
➢ Student:
• Log in.
• View alerts.
• View student times (add appointment, delete appointment).
• Book an appointment with another student.
• View student reservations (accept reservation, reject reservation).
• Edit student profile.
• Log out.
➢ Patient:
• Log in.
• View reservation status (approved or not).
• Book an appointment.
• View alerts.
5
• Edit patient profile.
• Send student registration request to system administrator.
• Log out.
➢ Visitor:
• Create an account.
• View student posts.


Non-functional requirements are constraints imposed on the system that define its quality attributes. Non-functional requirements are important because they help ensure that the system meets the user's needs. The following are the non-functional requirements for the proposed system:
• Interfaces that are compatible with all different device screens.
• Speed: The js.react library was used.
• Compatibility: The system is compatible with different browsers and devices.
• Ease of use: The system is easy to use and includes simple and clear user interfaces.
• Modification: The system can be modified and improved when needed, to better meet the needs of users.
• Security: Each user logs in and users' passwords are encrypted.


We'll dive into the details of the app's main interfaces and how users interact with them. We will also review
How can these interfaces facilitate communication between students and patients and improve appointment booking procedures? Main goal
The purpose of this chapter is to explain how application design can contribute to achieving quality health care for patients of the College of Dentistry
At the University of Kalamoon


The main interface of the web application consists of four components (Home), (Students), (login), (Signup) where
You can navigate between these components using the Navbar, which is the bar located at the top of the page, as shown
The following figure

(detailes): This section contains an overview of the Faculty of Dentistry at Kalamoon University.
• (AboutUs): This section provides detailed information about the application’s outstanding services to patients by students
Under the supervision of a team of professors who possess scientific and practical experience.
• (Footer): This section contains contact information for Qalamoun Private University.


![Capture](https://github.com/user-attachments/assets/21fa9cf4-b6e8-4728-b73e-5a13a015737f)


This interface is intended to display information about students registered in the application. The information is displayed in
Cards containing the student’s name, academic year, email, and a button to book an appointment. In each card, users can
Click on the APPOINTMENT BOOK button to book an appointment with the student in question. This section helps patients
Get to know the student and choose the student they want to book an appointment with

![Capture](https://github.com/user-attachments/assets/559121c7-1acc-49c8-bf18-02a09218e9fb)

When the BOOKAPPOINTMENT button is clicked, users are directed to the appointment booking interface. If the person
If a visitor is a visitor, an error message will appear (in log you must). If he is a registered user, he will be directed to the appointment booking interface.
Which is shown in the figure


![image](https://github.com/user-attachments/assets/fdda7e66-bf9e-4ede-bedf-e51d4293c65b)



In this interface, a table containing all the appointments of the selected student is displayed, and a button to choose the date.
Users can click on the bookappoinment button to book the appointment for the specified date and time.



![Capture](https://github.com/user-attachments/assets/155b2978-411c-4df3-8385-376631f650a3)

This interface is intended for visitors who wish to register as users (patients or students), shown in Figure (4-4).
5). When the registration interface opens, visitors can create a new account on the application. It requires the visitor to enter information
Personal information such as first name, last name, and email, in addition to creating and confirming a password. In addition
A personal photo of the user. After filling out all the required fields, the visitor can press the UP SIGN button to complete
Registration process.

![Capture](https://github.com/user-attachments/assets/aebb829f-738c-4ada-ae3f-569e41926840)

This interface is intended for registered users (admin, patients, students) who wish to log in
to their accounts. Users can enter their email and password to access their accounts. After entering
Email and password, the user can press the IN SIGN button to log in as in Figure (6-4).
If the user is not registered, he can click on the link (Register? user a Not) to go to the registration page.

![Capture](https://github.com/user-attachments/assets/3a0eade0-49df-456e-a1db-64bd5ea8ad3e)


Patient interfaces


This interface shows a list of appointments that the patient has booked with the student, helps the patient track appointments

And contributes to organizing the patient's appointments effectively, It contains specific information about the booking, as shown

in the figure:
• (Students): The name of the student who booked the appointment.
• (Patient): The name of the patient who booked the appointment.
• (Date Appointment): The date of the appointment.
• (Time Appointment): The time of the appointment.
• (Date Booking): The date of the appointment booking.
• (Time Booking): The time of the appointment booking.
• (Status): The status of the appointment.
The different statuses of appointments are:
• (Pending): It means that the appointment has been sent to the student for approval but he has not yet approved it.
• (Accept): It means that the student has accepted the appointment


![Capture](https://github.com/user-attachments/assets/2307de25-18fe-4102-91fb-875f3031a37e)


This interface displays a list of notifications about appointment bookings. It helps the patient track and organize notifications effectively. Each notification has three parts, as shown in Figure:
• (Content): The content that describes the type of notification is displayed. For example, it could indicate that an appointment has been booked with a specific student or that an appointment has been accepted by the student.
• (Date): The date the notification was received.
• (Time): The time the notification was received.
Each row in the table represents a different notification, all of which relate to appointments booked with the students listed.
The notifications are detailed, indicating the appointment booking, including date and time details.

![Capture](https://github.com/user-attachments/assets/91730299-0c38-4df3-9843-2b0d315c719b)


This interface is a form to submit a request to convert the user account to a student account (i.e. the user is a student in the College of Dentistry). The interface consists of the following elements as shown in Figure (9-4):
• Student ID entry field: allows the student to enter his/her ID.
• Study year entry field: allows the student to enter the current year of study.
• APPLY button: Once this button is pressed, the request is sent to the application supervisor.
Once the request is submitted, if the ID and academic year entered are correct and exist in the database, the request will be sent
to the application supervisor. If the supervisor approves, the account is granted student privileges, which allows the user to access the features and services designated for the student. However, if incorrect information is entered, an error message is sent.



![Capture](https://github.com/user-attachments/assets/986c9c9e-1191-4e09-97cd-356912c2054f)


This interface is a form for updating the user’s personal information as shown in Figure. The interface consists of the following elements:
• First Name and Last Name: Displays the current user name.
• Email: Displays the user’s current email.
• Gender: Displays the user’s current gender. The user can change it using the drop-down list.
• Age: Allows the user to enter their age.
• Mobile Number: Allows the user to enter their mobile number.
• Address: Allows the user to enter their address.
• Password: Allows the user to enter a new password and confirm it.
• UPDATE Button: Once this button is pressed, the user’s personal information is updated.

Once the personal information is updated, the changes will be saved and the user account will be updated.


![Capture](https://github.com/user-attachments/assets/ccb86a70-4b0a-4bb2-8d70-266d6f893129)
















