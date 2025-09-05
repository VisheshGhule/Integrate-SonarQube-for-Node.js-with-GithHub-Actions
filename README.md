# Secure DevOps Project - SonarQube Integration

This project demonstrates secure DevOps practices by integrating SonarQube security scanning into a CI/CD pipeline.

## Project Overview

- **Application**: Simple Node.js web application with Express
- **Security Scanning**: SonarQube integration in GitHub Actions
- **CI/CD**: Automated pipeline with security checks
- **Vulnerability Detection**: Intentional security issues for demonstration

## Project Structure

```
secure-devops-project/
├── src/
│   ├── app.js              # Main application file
│   ├── routes/
│   │   ├── auth.js         # Authentication routes (with vulnerabilities)
│   │   └── users.js        # User management routes
│   ├── middleware/
│   │   └── security.js     # Security middleware
│   └── utils/
│       └── database.js     # Database utilities (with SQL injection example)
├── tests/
│   └── app.test.js         # Basic tests
├── .github/
│   └── workflows/
│       └── ci-cd.yml       # CI/CD pipeline with SonarQube
├── sonar-project.properties # SonarQube configuration
├── Dockerfile              # Container configuration
├── docker-compose.yml      # Local development setup
├── package.json            # Node.js dependencies
└── README.md               # This file
```

## Security Vulnerabilities Included (for demonstration)

1. **SQL Injection** - Unsanitized database queries
2. **Hardcoded Secrets** - API keys and passwords in code
3. **Weak Authentication** - No password hashing
4. **CORS Misconfiguration** - Overly permissive CORS
5. **Missing Input Validation** - No request validation
6. **Insecure Dependencies** - Outdated packages

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Run locally: `npm start`
4. Access application: `http://localhost:3000`

## CI/CD Pipeline

The pipeline includes:
- Code quality checks
- Security scanning with SonarQube
- Automated testing
- Docker image building
- Deployment readiness checks

## SonarQube Integration

- Automatic code analysis on every push
- Security vulnerability detection
- Code quality metrics
- Quality gate enforcement
