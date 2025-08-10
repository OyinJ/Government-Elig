# Government Benefits Eligibility Checker

A comprehensive full-stack web application that helps undergraduate students discover and access government benefit programs they're eligible for, including education grants, loans, healthcare, and food assistance.

## 🎯 Purpose

This platform simplifies the complex process of finding government benefits by:
- Providing an interactive eligibility checker
- Supporting document uploads and management
- Tracking application status
- Offering direct links to official government application sites

## 🛠 Tech Stack

### Frontend
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Vite** for development and building
- **Axios** for API communication
- **React Router** for navigation
- **Lucide React** for icons

### Backend
- **Django 4.2** with Django REST Framework
- **PostgreSQL** database (with MySQL/MSSQL support)
- **Django CORS Headers** for cross-origin requests
- **Pillow** for image processing
- **Python Decouple** for environment management

### Database
- **PostgreSQL** (primary)
- **MySQL** (alternative configuration)
- **MSSQL** (alternative configuration)

## 🚀 Features

### Core Functionality
- **User Authentication**: Secure registration and login system
- **Eligibility Checking**: Interactive form to assess program eligibility
- **Program Database**: Comprehensive list of government benefit programs
- **Document Management**: Upload and manage required documents
- **Application Tracking**: Monitor application status and progress
- **Responsive Design**: Mobile-first, accessible interface

### Included Programs
- Federal Pell Grant (up to $7,395)
- Direct Subsidized Loans
- Federal Work-Study Program
- SNAP (Food Stamps)
- Medicaid Healthcare Coverage
- SEOG (Supplemental Educational Opportunity Grant)
- TEACH Grant
- State University Grants
- WIC (Women, Infants, and Children)
- Emergency Financial Aid Grants

## 📋 Prerequisites

- **Python 3.8+**
- **Node.js 16+**
- **PostgreSQL 12+** (or MySQL/MSSQL)
- **Git**

## 🔧 Installation & Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd government-benefits-checker
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create environment file
cp .env.example .env
# Edit .env with your database credentials

# Run migrations
python manage.py makemigrations
python manage.py migrate

# Create superuser (optional)
python manage.py createsuperuser

# Seed database with sample programs
python seed_data.py

# Start Django development server
python manage.py runserver
```

### 3. Frontend Setup

```bash
# Navigate to frontend directory (in new terminal)
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

### 4. Database Configuration

#### PostgreSQL (Recommended)
```bash
# Install PostgreSQL and create database
createdb government_benefits

# Update .env file:
DB_NAME=government_benefits
DB_USER=postgres
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=5432
```

#### MySQL (Alternative)
```python
# In settings.py, uncomment MySQL configuration
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': config('DB_NAME', default='government_benefits'),
        'USER': config('DB_USER', default='root'),
        'PASSWORD': config('DB_PASSWORD', default='password'),
        'HOST': config('DB_HOST', default='localhost'),
        'PORT': config('DB_PORT', default='3306'),
    }
}
```

## 🌐 Usage

1. **Access the Application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:8000
   - Django Admin: http://localhost:8000/admin

2. **Create an Account**
   - Register with personal information
   - Verify email (if configured)

3. **Check Eligibility**
   - Fill out the eligibility form
   - Review matched programs
   - Get benefit amount estimates

4. **Apply for Programs**
   - Click "Apply Now" links
   - Upload required documents
   - Track application status

## 📁 Project Structure

```
government-benefits-checker/
├── backend/
│   ├── government_benefits/     # Django project settings
│   ├── users/                   # User management app
│   ├── eligibility/             # Eligibility checking app
│   ├── requirements.txt
│   ├── manage.py
│   └── seed_data.py
├── frontend/
│   ├── src/
│   │   ├── components/          # React components
│   │   ├── pages/              # Page components
│   │   ├── context/            # React context
│   │   ├── services/           # API services
│   │   ├── types/              # TypeScript types
│   │   └── utils/              # Utility functions
│   ├── public/
│   ├── package.json
│   └── tailwind.config.js
└── README.md
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register/` - User registration
- `POST /api/auth/login/` - User login
- `POST /api/auth/logout/` - User logout
- `GET /api/auth/profile/` - Get user profile
- `PUT /api/auth/profile/update/` - Update user profile

### Eligibility
- `GET /api/eligibility/programs/` - List all programs
- `POST /api/eligibility/check/` - Check eligibility
- `GET /api/eligibility/history/` - Get eligibility history
- `GET /api/eligibility/statistics/` - Get platform statistics

### Applications
- `GET /api/eligibility/applications/` - List user applications
- `POST /api/eligibility/applications/` - Create application
- `PUT /api/eligibility/applications/{id}/` - Update application

### Documents
- `GET /api/auth/documents/` - List user documents
- `POST /api/auth/documents/` - Upload document

## 🔒 Security Features

- **CSRF Protection**: Django CSRF middleware
- **CORS Configuration**: Controlled cross-origin requests
- **Authentication**: Session-based authentication
- **Input Validation**: Comprehensive form validation
- **File Upload Security**: Secure document handling
- **SQL Injection Protection**: Django ORM protection

## 🎨 Design Features

- **Responsive Design**: Mobile-first approach
- **Accessibility**: WCAG compliant components
- **Modern UI**: Clean, professional interface
- **Interactive Elements**: Hover states and transitions
- **Loading States**: User feedback during operations
- **Error Handling**: Comprehensive error messages

## 🧪 Testing

```bash
# Backend tests
cd backend
python manage.py test

# Frontend tests (if configured)
cd frontend
npm test
```

## 🚀 Deployment

### Backend Deployment
1. Configure production database
2. Set environment variables
3. Collect static files: `python manage.py collectstatic`
4. Deploy to your preferred platform (Heroku, AWS, etc.)

### Frontend Deployment
1. Build production bundle: `npm run build`
2. Deploy to static hosting (Netlify, Vercel, etc.)
3. Update API base URL for production

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## ⚠️ Disclaimer

This is not an official government website. All program information should be verified with official government sources before applying.

## 📞 Support

For support, please contact [support@govbenefits.com] or create an issue in the repository.

---

**Built with ❤️ for students seeking financial assistance**