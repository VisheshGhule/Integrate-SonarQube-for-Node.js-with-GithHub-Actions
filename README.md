## Integrate SonarQube with Node.js via GitHub Actions

### Overview
This project shows how to integrate SonarQube with a Node.js application using GitHub Actions. It demonstrates how to automate code quality checks, including detection of bugs, vulnerabilities, code smells, and code duplications, as part of a CI/CD workflow.

---

### What I have Learn
- Setting up a cloud-based SonarQube 
- Creating a project and authentication token in SonarQube
- Configuring a GitHub Actions workflow to run Sonar scans on every push or pull request
- Viewing analysis results in the SonarQube dashboard to maintain clean, secure code

---

### Project Contents
- `sonar-project.properties`: Configuration file for Sonar analysis (project key, source path, etc.)
- `.github/workflows/sonar.yml`: GitHub Actions workflow that runs SonarQube analysis automatically

--- 

### Why It Matters
Automating static code analysis in your CI/CD pipeline helps:
- Catch issues (bugs, vulnerabilities) early
- Enforce quality gates before merging code
- Maintain clean, reliable, and secure code over time
