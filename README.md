# Student Enrollment Management Form

## Table of Contents
1. [Description](#description)
2. [Benefits of using JsonPowerDB](#benefits-of-using-jsonpowerdb)
3. [Illustrations](#illustrations)
4. [Scope of Functionalities](#scope-of-functionalities)
5. [Examples of Use](#examples-of-use)
6. [Project Status](#project-status)
7. [Release History](#release-history)
8. [Sources](#sources)
9. [Other Information](#other-information)

---

## Description
This micro-project is a modern, responsive web-based Student Enrollment Form built using HTML, CSS, and vanilla JavaScript. It serves as a frontend interface that connects directly to a **JsonPowerDB (JPDB)** backend database (specifically storing data in the `STUDENT-TABLE` relation of the `SCHOOL-DB` database). The application dynamically handles database states, validating primary keys (Roll Number) to either create new student records or update existing ones seamlessly without requiring page reloads.

## Benefits of using JsonPowerDB
* **Real-time Serverless Database:** JPDB requires no backend server configuration or middleware to connect to the frontend, drastically reducing development time.
* **Multi-Mode DBMS:** It operates flexibly as a Document DB, Key-Value DB, and RDBMS simultaneously.
* **Maximum Performance:** JPDB uses incredibly fast indexing and server-side in-memory caching, making data retrieval lightning fast compared to traditional databases.
* **API Driven & Developer Friendly:** It utilizes simple REST APIs for all CRUD operations, making it incredibly easy to integrate using the provided `jpdb-commons.js` library.

## Illustrations
*(Note: Replace this text with a screenshot of your working form! You can easily drag and drop an image of your form directly into the GitHub editor here.)*

## Scope of Functionalities
* **Primary Key Validation:** Automatically queries the database to detect if a student Roll Number already exists.
* **Dynamic UI State Management:** Intelligently toggles form fields and control buttons (`Save`, `Update`, `Reset`) based on whether a record is being freshly created or modified.
* **Data Validation:** Enforces strict frontend validation to prevent any empty field submissions, maintaining database integrity.
* **Read & Update Integration:** Automatically fetches and populates existing student data for quick modification while securely locking the primary key field.

## Examples of Use
* **Adding a New Student:** Enter a new, unique Roll Number. The system detects it is new, unlocks the remaining form fields, and enables the `Save` button. Fill out the student details and click Save to push to JPDB.
* **Updating an Existing Student:** Enter an existing Roll Number. The system automatically fetches the student's current details from JPDB, populates the form, locks the Roll Number field to prevent accidental primary key changes, and enables the `Update` button. Modify the necessary data and click Update.

## Project Status
**Completed.** This micro-project is fully functional and successfully meets all assignment requirements for dynamic state control and database integration.

## Release History
* **v1.0.0 (Current)** - Initial release. Features complete Create, Read, and Update functionalities integrated with JsonPowerDB, along with a custom CSS responsive UI.

## Sources
* [JsonPowerDB Official Documentation](https://login2explore.com/jpdb/docs.html)
* Micro-Project Assignment Guidelines

## Other Information
This project was developed to demonstrate direct frontend-to-database connectivity, highlighting how state machines can be used in vanilla JavaScript to manage UI flow based on database responses.
