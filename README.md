# Policy challenge

The current project is a Node.JS backend app created as a tech challenge completed by Jorge Sánchez Blanco on june 2020.

## Challenge details

I had to create a NodeJs backend app that worked as a middleware to fetch details from a list of clients and policies for a ficticious insurance company. Our app must be able to:

-Enable user signup and authentication.

-Enable users with roles Admin or User to **fetch client data** from a **user name** or a **user ID**.

-Enable users with role Admin to **fetch the client data** from a specific policy's owner through that **policy's number**.

-Enable users with role Admin to **fetch all policies** associated to a specific user through that **client's name**.

To complete the challenge, we also had to include **testing**.

## Installation

To install this app, simply clone this repository to your computer and run the following commands one after the other:

```bash
npm install
```

## Usage

Once you have the app installed, run the following command to run it:

```bash
npm start
```

The app will be running on **http://localhost:4000**.

With the app up and running, use the following commands on Postman to fetch all necessary info:

### Signup and authentication:

- **Signup**:

```
POST:  "http://localhost:4000/api/signup"

{"password": "12345678", "email": "test@test.com", "username": "TestUser", "role":"admin"}
```

- **Login**:

```
POST:  "http://localhost:4000/api/auth"

{"password": "12345678", "email": "test@test.com"}
```

- **Me**:

```
GET:  "http://localhost:4000/api/auth"
```

You must be logged in and accept cookies to run this route.

- **Edit user**:

```
PUT:  "http://localhost:4000/api/auth"

{"oldPassword": "12345678", "password":"12345678" "email": "test@test.com", "username": "NewName", "role":"admin"}
```

You must be logged in and accept cookies to run this route.

- **Delete user**:

```
DELETE:  "http://localhost:4000/api/auth"

{"password": "12345678", "email": "test@test.com"}
```

You must be logged in and accept cookies to run this route.

### Client routes:

These routes are available only for users with role **"users"** or **"admin"**:

- **Get client data by ID**:

```
POST:  "http://localhost:4000/api/clients/get-by-id"

{"id": "     55601290-8619-4f54-b831-9c6c26c52b44     "}
```

- **Get client data by name**:

```
POST:  "http://localhost:4000/api/clients/get-by-name"

{"name": "         merrill "}
```

- **Get client data by email**:

```
POST:  "http://localhost:4000/api/clients/get-by-email"

{"email": "     barnettblankenship@quotezart.com"}
```

### Policies routes:

These routes are available only for users with role **"admin"**:

- **Get policies associated to a specific client by client name**:

```
POST:  "http://localhost:4000/api/policies/get-by-name"

{"name": "         britney    "}
```

- **Get the data of a client that owns a specific policy through that policy's ID**:

```
POST:  "http://localhost:4000/api/policies/get-client-info"

{"id": "         56b415d6-53ee-4481-994f-4bffa47b5239 "}
```

## Test

From the app root directory, run the following command to start the test battery. Each route in the App will be tested, both with correct and incorrect data.

```bash
npm test
```
