# Custom Note Service

A React-based note-taking application integrated with Supabase for authentication and database management.

## 🚀 Setup & Deploy

### 1. Prerequisites
- Node.js installed on your machine.
- A Supabase account and project.

### 2. Clone the Repository
```bash
git clone https://github.com/Nitesh-yadav-code/Custom-Note-Service
cd custom-note-service
```

### 3. Install Dependencies
```bash
npm install
```
### 4. Set Up the Database
Run the following SQL in the Supabase SQL editor to create the notes table:
```bash
CREATE TABLE notes (
  id SERIAL PRIMARY KEY,
  user_id UUID NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  FOREIGN KEY (user_id) REFERENCES auth.users (id)
);
```
### 5. Enable Row-Level Security (RLS)
Enable RLS on the notes table and add the following policy:
```bash
CREATE POLICY "Allow access to own notes"
ON notes
FOR SELECT
USING (auth.uid() = user_id);
```
### 6. Start the Development Server
```bash
npm run dev
```
### 🧠 Why?
#### Schema
The notes table includes a user_id column to associate notes with specific users.

created_at is automatically set to the current timestamp for tracking when notes are created.

#### Endpoints
### POST /notes
Why POST? Used to create a new resource (a note) in the database.

Why this URL path? /notes represents the resource being created.

Where are parameters read? From the request body.

### GET /notes
Why GET? Used to retrieve resources (notes) for the authenticated user.

Why this URL path? /notes represents the resource being fetched.

Where are parameters read? From the query string (user_id).

## Demo Script
### 1. Create a Note
Use the following curl command to create a new note:
``` bash
curl -X POST https://your-supabase-url/rest/v1/notes
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "user_id": "user-id",
    "title": "Sample Note",
    "description": "This is a sample note."
  }'
```
### Expected Response:
```bash
{
  "id": 1,
  "user_id": "user-id",
  "title": "Sample Note",
  "description": "This is a sample note.",
  "created_at": "2025-05-02T12:34:56.789Z"
}
```
### 2. List Notes
Use the following curl command to fetch all notes for the authenticated user:
```bash
curl -X GET "https://your-supabase-ur/rest/v1/notes?user_id=eq.${uid}" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```
### Expected Response:
```bash
[
  {
    "id": 1,
    "user_id": "user-id",
    "title": "Sample Note",
    "description": "This is a sample note.",
    "created_at": "2025-05-02T12:34:56.789Z"
  }
]
```


