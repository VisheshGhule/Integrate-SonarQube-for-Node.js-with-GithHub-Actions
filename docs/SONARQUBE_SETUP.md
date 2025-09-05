# SonarQube Setup Guide

This guide explains how to set up SonarQube for security scanning in your CI/CD pipeline.

## Option 1: SonarCloud (Recommended for GitHub)

### Step 1: Create SonarCloud Account
1. Go to [SonarCloud.io](https://sonarcloud.io)
2. Sign up with your GitHub account
3. Create a new organization (if needed)

### Step 2: Create Project
1. Click "Create Project"
2. Choose "Analyze new project"
3. Select your GitHub repository
4. Choose "Free" plan
5. Generate a token for your project

### Step 3: Configure GitHub Secrets
Add these secrets to your GitHub repository:

```
SONAR_TOKEN=your-sonar-token-here
SONAR_HOST_URL=https://sonarcloud.io
```

### Step 4: Update Workflow Configuration
The workflow is already configured in `.github/workflows/sonar.yml`. Update the organization name:

```yaml
-Dsonar.organization=your-org-name
```

## Option 2: Self-Hosted SonarQube

### Step 1: Run SonarQube Locally
```bash
docker-compose up -d sonarqube
```

### Step 2: Access SonarQube
1. Open http://localhost:9000
2. Default credentials: admin/admin
3. Change default password

### Step 3: Create Project
1. Click "Create Project"
2. Choose "Manually"
3. Set project key: `secure-devops-demo`
4. Generate a token

### Step 4: Configure GitHub Secrets
```
SONAR_TOKEN=your-local-token
SONAR_HOST_URL=http://localhost:9000
```

## Quality Gates Configuration

### Default Quality Gate
SonarQube comes with a default quality gate that checks:
- New code coverage > 80%
- New code duplication < 3%
- New security hotspots = 0
- New bugs = 0
- New vulnerabilities = 0

### Custom Quality Gate
Create a custom quality gate for stricter security:

1. Go to Quality Gates
2. Create new gate: "Security-First"
3. Add conditions:
   - Coverage > 90%
   - Duplicated Lines < 1%
   - Security Hotspots = 0
   - Bugs = 0
   - Vulnerabilities = 0
   - Code Smells < 10

## Security Rules Configuration

### Enable Security Rules
1. Go to Rules
2. Filter by "Security"
3. Enable these rules:
   - SQL Injection
   - Hardcoded Secrets
   - Weak Cryptography
   - XSS Vulnerabilities
   - CSRF Protection

### Custom Security Rules
Create custom rules for your specific needs:

```javascript
// Example: Detect hardcoded API keys
function isHardcodedSecret(node) {
  const text = node.getText();
  const patterns = [
    /api[_-]?key\s*[:=]\s*['"][^'"]{10,}['"]/i,
    /secret\s*[:=]\s*['"][^'"]{10,}['"]/i,
    /password\s*[:=]\s*['"][^'"]{3,}['"]/i
  ];
  return patterns.some(pattern => pattern.test(text));
}
```

## Integration with CI/CD

### GitHub Actions Integration
The pipeline automatically:
1. Runs SonarQube analysis on every push
2. Checks quality gate status
3. Comments on pull requests with results
4. Fails the build if quality gate fails

### Quality Gate Enforcement
```yaml
- name: SonarQube Quality Gate Check
  uses: sonarqube-quality-gate-action@master
  with:
    args: -Dsonar.qualitygate.wait=true
```

## Monitoring and Reporting

### Dashboard Metrics
Monitor these key metrics:
- **Security Hotspots**: Potential security issues
- **Vulnerabilities**: Known security vulnerabilities
- **Bugs**: Code defects that could cause failures
- **Code Smells**: Maintainability issues
- **Coverage**: Test coverage percentage

### Automated Reports
The pipeline generates:
1. **Security Report**: Summary of all security issues
2. **Quality Gate Status**: Pass/fail status
3. **Trend Analysis**: Security metrics over time
4. **PR Comments**: Automated feedback on pull requests

## Troubleshooting

### Common Issues

#### 1. Token Authentication Failed
```
Error: Not authorized. Please check the properties sonar.login and sonar.password.
```
**Solution**: Verify your SONAR_TOKEN is correct and has proper permissions.

#### 2. Project Not Found
```
Error: Project 'secure-devops-demo' not found
```
**Solution**: Create the project in SonarCloud/SonarQube first.

#### 3. Quality Gate Timeout
```
Error: Quality gate timeout
```
**Solution**: Increase timeout in workflow:
```yaml
timeout-minutes: 10
```

#### 4. Coverage Report Not Found
```
Error: Coverage report not found
```
**Solution**: Ensure tests run with coverage:
```bash
npm run test:coverage
```

### Debug Mode
Enable debug mode for troubleshooting:
```yaml
env:
  SONAR_LOG_LEVEL: DEBUG
```

## Best Practices

### 1. Security-First Approach
- Set strict quality gates
- Enable all security rules
- Monitor security hotspots
- Regular security reviews

### 2. Continuous Monitoring
- Run analysis on every commit
- Monitor trends over time
- Set up alerts for critical issues
- Regular security audits

### 3. Team Integration
- Train team on security practices
- Review security reports regularly
- Implement security code reviews
- Share security knowledge

### 4. Automation
- Automate security scanning
- Integrate with deployment pipeline
- Block deployments on security issues
- Generate automated reports

## Advanced Configuration

### Custom SonarQube Properties
```properties
# sonar-project.properties
sonar.projectKey=secure-devops-demo
sonar.projectName=Secure DevOps Demo
sonar.projectVersion=1.0.0

# Security settings
sonar.security.hotspots=true
sonar.issues.console=true

# Coverage settings
sonar.javascript.lcov.reportPaths=coverage/lcov.info

# Quality gate
sonar.qualitygate.wait=true
```

### Branch Analysis
```yaml
- name: SonarQube Branch Analysis
  with:
    args: >
      -Dsonar.branch.name=${{ github.head_ref }}
      -Dsonar.pullrequest.key=${{ github.event.number }}
      -Dsonar.pullrequest.branch=${{ github.head_ref }}
      -Dsonar.pullrequest.base=${{ github.base_ref }}
```

This setup ensures comprehensive security scanning and quality assurance in your CI/CD pipeline.
