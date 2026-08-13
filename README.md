# KRE-MCASC — Kartikeya Rindani Event Management Platform

> A full-stack event and competition management platform built for Modern College of Arts, Science and Commerce (Autonomous), Shivajinagar, Pune.

🌐 **Live Platform:** https://www.kremcasc.in/  
💻 **Source Code:** https://github.com/Programmer-Ajay/KRF-MCASC

---

## 📌 Overview

**KRE-MCASC** is a digital event-management platform developed for the **Kartikeya Rindani Intercollegiate Event** at Modern College of Arts, Science and Commerce (Autonomous), Shivajinagar, Pune.

The event had traditionally been managed through manual processes for many years. Our team proposed and developed this platform to digitize the complete event lifecycle — from competition publishing and participant registration to coordination, attendance, results, certificates, and event galleries.

The platform provides separate workflows for **participants/users, coordinators, and administrators**, making it easier to manage a large number of competitions and registrations from a centralized system.

The project is **actively under development**, with additional improvements and features planned.

---

## 🏆 Achievement

KRE-MCASC was developed as a team project and received **First Prize in inter college-level competition**.

The project was designed around a real institutional requirement rather than being only a demonstration application.

---

## 🎯 Problem Statement

Previously, managing the event involved significant manual work such as:

- Handling participant registrations
- Maintaining participant and team information
- Coordinating multiple competitions
- Tracking attendance
- Managing competition results
- Issuing certificates
- Managing event media and memories

This created challenges around data organization, coordination, and scalability.

### Our Solution

KRE-MCASC centralizes these workflows into a single web platform.

```text
Competition Creation
        ↓
Participant Registration
        ↓
Team Formation
        ↓
Competition Management
        ↓
Attendance
        ↓
Results
        ↓
Certificates
        ↓
Event Gallery
```

---

## ✨ Key Features

### 👤 User & Role Management

The system supports role-based workflows for:

- **Admin**
- **Coordinator**
- **User / Participant**

Different roles receive access to the functionality required for their responsibilities.

### 🏆 Competition Management

Coordinators/admins can manage:

- Competition name and description
- Competition type
- Rules
- Date and time
- Venue
- Registration deadline
- Team-size limits
- Competition status
- Assigned coordinator

Supported competition types:

- Solo
- Team

### 📝 Registration Management

The platform supports:

- Individual registrations
- Team registrations
- Participant information
- Team member management
- Competition-specific submission data

### 👥 Team Management

For team-based competitions, the system supports:

- Creating teams
- Assigning team leaders
- Adding participants to teams
- Managing team membership

### ✅ Attendance

Coordinators can record participant attendance for competitions.

### 🥇 Results

The system supports declaring and storing:

- Participant results
- Team results
- Rankings
- Result declaration information

### 🎓 Certificates

The platform supports certificates for:

- Participation
- Winners

Certificate issuance is linked to the relevant competition and participant/team.

### 🖼️ Event Gallery

Competition-specific media can be uploaded and displayed through the event gallery.

---


## 🧰 Tech Stack

### Frontend

- **Next.js**
- **React**
- **TypeScript**
- **Tailwind CSS**
- **Framer Motion**

### Backend / Full-stack

- **Next.js App Router**
- Server-side logic / Server Actions
- TypeScript

### Database

- **PostgreSQL**
- **Supabase**
- **Drizzle ORM**

### Validation & Utilities

- **Zod**
- React Toastify
- React PDF
- ExcelJS

### Deployment

The application is deployed and accessible at:

**https://www.kremcasc.in/**

---

## 🗄️ Database Design

The system uses PostgreSQL with UUID-based primary keys and custom PostgreSQL enums.

### Core tables

```text
profiles
    │
    ├── competitions
    │       │
    │       ├── registrations
    │       ├── teams
    │       │      └── team_members
    │       ├── attendance
    │       ├── results
    │       ├── certificates
    │       └── gallery
    │
    └── participants
```

### Main entities

| Entity | Purpose |
|---|---|
| `profiles` | Users and role-based access |
| `competitions` | Competition/event information |
| `participants` | Participant information |
| `teams` | Teams for team-based competitions |
| `team_members` | Association between teams and participants |
| `registrations` | Competition registration records |
| `attendance` | Participant attendance |
| `results` | Competition rankings/results |
| `certificates` | Participation/winner certificates |
| `gallery` | Competition-related media |

### Role-based access

```text
admin
coordinator
user
```

### Competition types

```text
solo
team
```

### Competition statuses

```text
open
ongoing
completed
closed
postponed
cancelled
```

---

## 🔐 Authentication & Authorization

The application separates **authentication** from **authorization**.

- Authentication determines who the user is.
- Authorization determines what that user is allowed to do.

The platform uses role-based access control with roles such as:

```text
Admin
Coordinator
User
```

This allows different workflows and permissions to be applied to different users.

---

## 🔄 Example Registration Flow

A typical participant registration flow is:

```text
User visits competition
        ↓
Selects competition
        ↓
Chooses registration type
        ↓
Solo / Team
        ↓
Provides required information
        ↓
Validation
        ↓
Registration submitted
        ↓
Database
        ↓
Registration recorded
```

For team competitions:

```text
Competition
     ↓
Create Team
     ↓
Add Team Members
     ↓
Submit Registration
```

---

## 📊 Event Lifecycle

The platform supports the complete event lifecycle:

```text
Create Competition
       ↓
Open Registration
       ↓
Participant / Team Registration
       ↓
Registration Deadline
       ↓
Competition Ongoing
       ↓
Attendance
       ↓
Results Declaration
       ↓
Certificate Issuance
       ↓
Event Gallery / Memories
       ↓
Completed
```

---

## 🧠 Design Highlights

### Relational data modeling

The system uses relational tables for structured entities and relationships.

For example:

```text
teams
   ↓
team_members
   ↓
participants
```

The `team_members` table allows team membership to be represented without duplicating participant records.

### Flexible competition submissions

The `registrations` table contains a `submission_data` JSON field so different competitions can collect competition-specific information without requiring a database schema change for every new competition.

### Soft deletion

Several entities contain fields such as:

```text
deleted_at
deleted_by
is_active
```

This allows records to be deactivated/soft-deleted while retaining historical information where required.

---

## 📁 Project Structure

The codebase is organized around the Next.js application and separates major responsibilities into dedicated directories.

A simplified view:

```text
KRF-MCASC/
│
├── app/                 # Next.js routes/pages
├── components/          # Reusable UI components
├── db/                  # Database schema and database utilities
├── lib/                 # Shared utilities/authentication
├── server/              # Server-side actions/services
├── types/               # Shared TypeScript types
│
├── public/              # Static assets
├── package.json
└── README.md
```

---

## 🚀 Running Locally

### 1. Clone the repository

```bash
git clone https://github.com/Programmer-Ajay/KRF-MCASC.git
cd KRF-MCASC
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env.local` file and provide the environment variables required by the application.

> Do not commit production secrets or `.env.local` to Git.

### 4. Start the development server

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

---

## 🛠️ Development Status

KRF-MCASC is **actively under development**.

Current development and future improvements may include:

- Further workflow automation
- Improved administrative tools
- Additional reporting and analytics
- UI/UX improvements
- Performance optimization
- Additional event-management capabilities

---

## 👨‍💻 Project

**KRE-MCASC — Kartikeya Rindani Event Management Platform**

Built by a student development team for:

**Modern College of Arts, Science and Commerce (Autonomous)**  
Shivajinagar, Pune – 411005

---

## 🔗 Links

- 🌐 **Live Website:** https://www.kremcasc.in/
- 💻 **GitHub:** https://github.com/Programmer-Ajay/KRF-MCASC
- 🏫 **Modern College:** https://moderncollegepune.edu.in/

---

> This project is currently under active development.
.
