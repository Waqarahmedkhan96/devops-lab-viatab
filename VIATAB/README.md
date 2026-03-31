# VIA Tabloid (VIATAB)

A university DevOps portfolio project: a full-stack SaaS-style storytelling platform for campus communities.

---

## 🚀 Project Overview

**VIATAB** is a web-based academic storytelling platform that enables university users to:

- Register and login securely with JWT authentication
- Create, publish, and manage stories
- Browse department-specific content
- Filter, search, and explore stories
- View a personal dashboard of authored posts

---

## 🧱 Tech Stack

### Frontend
- React
- TypeScript
- Axios
- React Router
- Context API
- Tailwind CSS
- Vite

### Backend
- Java 21
- Spring Boot
- Spring Security
- JWT Authentication
- Spring Data JPA
- Hibernate

### Database
- PostgreSQL

### DevOps
- Docker
- Docker Compose
- Kubernetes (Minikube)
- Containerized frontend, backend, and database

---

## 🧩 Core Features

### 1. Authentication System
- Secure **register** and **login** workflows
- JWT token flow used for authenticated API access
- Protected frontend routes for authenticated users
- Session persistence via browser storage

### 2. Story Management
- Create new stories with metadata, department, and status
- View published and draft stories
- Filter stories by department, category, and status
- Search stories from the header and story pages
- Personal **My Stories** dashboard for management
- Edit and delete owned stories

### 3. API Structure
- RESTful backend endpoints for authentication and story operations
- Secure endpoints with role-based and token-based access
- Frontend consumes backend APIs using Axios

### 4. Database Design
- `Users` table for application users
- `Stories` table for narrative content
- `Roles` support user permission control
- Relationships are managed through JPA/Hibernate

### 5. Frontend UI
- Modular page layout with a polished SaaS design
- Navigation across Home, Stories, Create, My Stories, Login, Register
- Reusable UI components for consistency and responsiveness
- State handling with React hooks and Context API

### 6. DevOps Setup
- Containerized front-end, back-end and PostgreSQL database
- Docker Compose orchestration for local development
- Kubernetes manifests for deployment and service orchestration
- Persistent storage via PVC
- Secrets mechanism for database credentials

---

## ⚙️ Setup Instructions

### Running locally (without Docker)

#### Backend
1. Open `backend/viatab-backend`
2. Run:
   ```bash
   ./mvnw spring-boot:run
   ```
3. Backend starts on `http://localhost:8080`

#### Frontend
1. Open `frontend/viatab-frontend`
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start development server:
   ```bash
   npm run dev
   ```
4. Frontend starts on `http://localhost:5173`

#### Database
1. Install PostgreSQL locally
2. Create database and credentials
3. Update `backend/viatab-backend/src/main/resources/application.properties`
4. Start PostgreSQL and verify connection

### Running with Docker Compose
From the repo root:
```bash
docker compose up --build
```

This starts:
- Frontend container
- Backend container
- PostgreSQL container

### Running with Kubernetes (Minikube)
1. Build images:
   ```bash
   docker build -t viatab-backend ./backend/viatab-backend
   docker build -t viatab-frontend ./frontend/viatab-frontend
   ```
2. Load images into Minikube:
   ```bash
   minikube image load viatab-backend
   minikube image load viatab-frontend
   ```
3. Apply manifests:
   ```bash
   kubectl apply -f k8s/backend-deployment.yaml
   kubectl apply -f k8s/backend-service.yaml
   kubectl apply -f k8s/db-deployment.yaml
   kubectl apply -f k8s/db-service.yaml
   ```
4. Access services through NodePort URLs

---

## 🌐 Access URLs

### Local Access
- Frontend: `http://localhost:5173`
- Backend: `http://localhost:8080`

### Kubernetes (Minikube)
- Frontend service: NodePort URL from `kubectl get svc`
- Backend service: NodePort URL from `kubectl get svc`

---

## 📁 Project Structure

```
VIATAB/
├── backend/
│   └── viatab-backend/
│       ├── pom.xml
│       ├── Dockerfile
│       └── src/
│           ├── main/java/
│           └── main/resources/
├── frontend/
│   └── viatab-frontend/
│       ├── package.json
│       ├── Dockerfile
│       └── src/
│           ├── components/
│           ├── pages/
│           ├── api/
│           └── hooks/
├── k8s/
│   ├── backend-deployment.yaml
│   ├── backend-service.yaml
│   ├── db-deployment.yaml
│   └── db-service.yaml
└── docker-compose.yml
```

---

## 🧪 Testing

### Backend Testing
- Uses **JUnit** tests for core domain and controller logic
- Run from backend module:
  ```bash
  ./mvnw test
  ```

### API Testing
- Use **Postman**, browser, or API client to verify endpoints
- Test authentication, story creation, story listing, and protected routes

---

## 🔐 Security

- **JWT authentication** protects user sessions
- **Role-based access** supports `USER` and `ADMIN`
- Protected API routes ensure only authorized users can modify their own stories
- Tokens are validated on each backend request
- Frontend uses protected routes to restrict access to authenticated users

---

## 🚀 Future Improvements

- Add **CI/CD pipeline** with GitHub Actions
- Deploy to **AWS** or **Azure**
- Add **file/image upload** support instead of image URL
- Improve **pagination** and infinite scroll
- Build an **admin dashboard**
- Split into **microservices**
- Add caching with **Redis**

---

## 🎯 Purpose of Project

This project is built as a DevOps and Software Engineering portfolio piece to demonstrate:

- Full-stack application development
- Authentication and secure API design
- Containerization with Docker
- Orchestration with Kubernetes
- Modern frontend user experience
- Academic SaaS-style application architecture

---

## 📸 Preview

application screenshot here, later on:

![VIATAB Preview](./path/to/preview-screenshot.png)
