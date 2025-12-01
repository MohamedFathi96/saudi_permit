# Saudi Permit - Permit Application Management System

A modern permit application management system built with NestJS, Nuxt 3, TypeScript, and PostgreSQL with PostGIS.

## 🚀 Quick Start

### Option 1: Using Docker Compose (Easiest)

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd saudi_permit
   ```

2. **Start the entire application with Docker Compose**

   ```bash
   docker-compose up -d
   ```

3. **Access the application**

   - Frontend: http://localhost:3000
   - Backend API: http://localhost:3001
   - API Documentation (Swagger): http://localhost:3001/api
   - PostgreSQL: localhost:15433

4. **Stop the application**

   ```bash
   docker-compose down
   ```

### Option 2: Using pnpm (Development)

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd saudi_permit
   ```

2. **Start PostgreSQL**

   ```bash
   # Using Docker (recommended)
   docker-compose up -d db

   # Or install PostgreSQL with PostGIS locally
   ```

3. **Backend Setup**

   ```bash
   cd backend
   pnpm install
   cp env.example .env
   # Edit .env with your database connection string
   pnpm exec prisma migrate deploy
   pnpm exec prisma generate
   pnpm run start:dev
   ```

4. **Frontend Setup** (in a new terminal)

   ```bash
   cd frontend
   pnpm install
   pnpm run dev
   ```

5. **Access the application**

   - Frontend: http://localhost:3000
   - Backend API: http://localhost:3001
   - API Documentation: http://localhost:3001/api

## ✨ Features

### Authentication & Authorization

- **JWT Authentication**: Secure token-based authentication
- **Role-Based Access Control (RBAC)**: USER and ADMIN roles with different permissions
- **Protected Routes**: Route guards on both frontend and backend
- **User Registration & Login**: Complete authentication flow

### Permit Application Management

- **Create Applications**: Submit new permit applications
- **View Applications**: Browse all your applications with status tracking
- **Edit Applications**: Update application details
- **Delete Applications**: Remove applications you created
- **Status Tracking**: Track application progress (Pending, Approved, Rejected)

### Admin Features

- **View All Applications**: Admins can see all user applications
- **Status Management**: Only admins can approve or reject applications
- **User Management**: Full control over all permit applications

### Dashboard & Analytics

- **Statistics Overview**: Real-time stats showing total, approved, pending, and rejected applications
- **Recent Applications**: Quick view of latest submissions
- **User Dashboard**: Personalized welcome and application summary

### Modern UI/UX

- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Modern Interface**: Clean, intuitive design with Tailwind CSS
- **Form Validation**: Client and server-side validation with Vee-Validate and Zod
- **Custom UI Components**: Reusable components (Cards, Badges, Buttons, Inputs)
- **Loading States**: Proper loading and error handling

### Developer Experience

- **API Documentation**: Auto-generated Swagger/OpenAPI documentation
- **Type Safety**: Full TypeScript implementation
- **Database Migrations**: Prisma ORM with automated migrations
- **Global Exception Handling**: Consistent error responses
- **CORS Configuration**: Secure cross-origin resource sharing

## 🏗️ Tech Stack

### Frontend

- **Nuxt 3**: Vue 3 framework with server-side rendering
- **TypeScript**: Type-safe development
- **Tailwind CSS 4**: Modern utility-first CSS framework
- **Vee-Validate + Zod**: Form validation
- **Pinia**: State management
- **Nuxt Icon**: Icon system

### Backend

- **NestJS**: Progressive Node.js framework
- **TypeScript**: Type-safe API development
- **Prisma ORM**: Modern database toolkit
- **PostgreSQL + PostGIS**: Powerful relational database with spatial extensions
- **JWT + Passport**: Authentication and authorization
- **Swagger**: API documentation
- **bcryptjs**: Password hashing

### DevOps

- **Docker**: Containerization
- **Docker Compose**: Multi-container orchestration
- **pnpm**: Fast, disk space efficient package manager

## 🛠️ Development

### Prerequisites

- Node.js 20+
- pnpm (install with `npm install -g pnpm`)
- Docker & Docker Compose (for database or full app)

### Environment Configuration

Create a `.env` file in the backend directory:

```env
PORT=3001

DATABASE_URL=postgresql://root:click123@localhost:15433/saudi_permit?schema=public

JWT_SECRET=your-super-secret-jwt-key-minimum-32-characters
JWT_EXPIRES_IN=604800
```

## 📋 API Endpoints

### Authentication

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get current user profile

### Permit Applications

- `GET /api/permit-applications` - Get applications (users see their own, admins see all)
- `POST /api/permit-applications` - Create new permit application
- `GET /api/permit-applications/:id` - Get specific application
- `PATCH /api/permit-applications/:id` - Update application details
- `PATCH /api/permit-applications/:id/status` - Update status (ADMIN ONLY)
- `DELETE /api/permit-applications/:id` - Delete application

> **Note**: All permit application endpoints require authentication. Status updates are admin-only.

## 📁 Project Structure

```
saudi_permit/
├── backend/                      # NestJS API server
│   ├── src/
│   │   ├── modules/              # Feature modules
│   │   │   ├── auth/             # Authentication (login, register, JWT)
│   │   │   └── permit-application/ # Permit management
│   │   ├── common/               # Shared utilities
│   │   │   ├── decorators/       # Custom decorators (@Authorized, @CurrentUser)
│   │   │   ├── guards/           # Auth & role guards
│   │   │   ├── prisma/           # Database service
│   │   │   └── exceptions/       # Global exception filter
│   │   ├── configs/              # App configuration (CORS, Swagger, validation)
│   │   └── main.ts               # Application entry point
│   ├── prisma/
│   │   ├── schema.prisma         # Database schema
│   │   └── migrations/           # Database migrations
│   └── dockerfile
├── frontend/                     # Nuxt 3 application
│   ├── app/
│   │   ├── features/             # Feature-based modules
│   │   │   ├── applications/     # Permit application features
│   │   │   │   ├── components/   # Application-specific components
│   │   │   │   ├── pages/        # Dashboard, list, edit pages
│   │   │   │   ├── services.ts   # API service calls
│   │   │   │   ├── schemas.ts    # Validation schemas
│   │   │   │   └── types.ts      # TypeScript types
│   │   │   └── auth/             # Authentication features
│   │   ├── components/           # Shared UI components
│   │   ├── layouts/              # Layout components
│   │   ├── middleware/           # Route middleware (auth, guest)
│   │   ├── pages/                # Nuxt pages (routes)
│   │   ├── stores/               # Pinia stores
│   │   └── composables/          # Composable functions
│   └── dockerfile
├── docker-compose.yaml           # Docker orchestration
└── README.md
```

## 🎯 Usage

### User Workflow

1. **Register/Login**

   - Create a new account or login with existing credentials
   - Receive JWT token for authenticated requests

2. **Dashboard**

   - View personalized dashboard with statistics
   - See total, approved, pending, and rejected applications
   - Quick access to recent applications

3. **Create Application**

   - Navigate to "New Application"
   - Fill in applicant details (name, email, permit type)
   - Submit application (starts as "Pending")

4. **Manage Applications**
   - View all your applications
   - Edit application details (if not yet approved/rejected)
   - Delete applications you no longer need

### Admin Workflow

1. **View All Applications**

   - Access all applications from all users
   - Filter and search through submissions

2. **Review Applications**

   - Open individual applications
   - Review applicant information

3. **Update Status**
   - Approve or reject applications
   - Status changes are logged with timestamps

### Application Status Flow

```
Created → Pending → Approved
                 → Rejected
```

## 🚀 Scripts

### Backend

```bash
cd backend
pnpm run start:dev    # Start development server with hot reload
pnpm run build        # Build for production
pnpm run start:prod   # Start production server
pnpm run lint         # Run ESLint
pnpm exec prisma migrate dev    # Create new migration
pnpm exec prisma generate       # Generate Prisma client
pnpm exec prisma studio         # Open Prisma Studio (GUI)
```

### Frontend

```bash
cd frontend
pnpm run dev          # Start development server
pnpm run build        # Build for production
pnpm run preview      # Preview production build
pnpm run lint         # Run ESLint
```

### Docker

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down

# Rebuild after changes
docker-compose up -d --build

# Clean restart (removes volumes)
docker-compose down -v && docker-compose up -d --build
```

## 🔐 Security Features

- **Password Hashing**: bcryptjs with salt rounds
- **JWT Tokens**: Secure token-based authentication
- **Role-Based Access**: Fine-grained permission control
- **Input Validation**: Server-side validation with class-validator
- **SQL Injection Protection**: Prisma ORM parameterized queries
- **CORS**: Configured cross-origin resource sharing
- **Environment Variables**: Sensitive data in .env files

## 🧪 Database Schema

### User Model

- UUID primary key
- Email (unique)
- Hashed password
- Name (optional)
- Role (USER or ADMIN)
- Active status
- Timestamps

### PermitApplication Model

- UUID primary key
- Applicant name
- Applicant email
- Permit type
- Application status (Pending, Approved, Rejected)
- Submission timestamp
- User relationship

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run tests and linting
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For issues and questions, please create an issue in the repository.

## 📚 Additional Documentation

- [Docker Setup Guide](./DOCKER_SETUP.md) - Detailed Docker configuration and troubleshooting
- [Backend API Documentation](http://localhost:3001/api) - Swagger/OpenAPI docs (when running)
- [NestJS Documentation](https://docs.nestjs.com/)
- [Nuxt 3 Documentation](https://nuxt.com/)
- [Prisma Documentation](https://www.prisma.io/docs)
