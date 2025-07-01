# Contributing Guidelines

Thank you for your interest in contributing to the University Admission Calculator project. This document outlines the process and guidelines for contributing to the codebase.

## Getting Started

Before you begin contributing, please ensure you have:

* A GitHub account and basic familiarity with Git workflow
* Node.js version 16.0 or higher installed on your development machine
* Familiarity with React, TypeScript, and modern web development practices

## Development Setup

1. Fork the repository to your GitHub account
2. Clone your forked repository to your local machine
3. Install dependencies using `npm install`
4. Create a new branch for your feature or bug fix
5. Make your changes and test thoroughly
6. Commit your changes with clear, descriptive commit messages
7. Push your changes to your forked repository
8. Submit a pull request to the main repository

## Code Style and Standards

### General Guidelines

* Follow the existing code style and formatting conventions
* Use TypeScript for all new code and maintain type safety
* Write clear, self-documenting code with appropriate comments
* Ensure your code is responsive and works across different devices
* Test your changes thoroughly before submitting

### File Organization

* Place reusable components in the `src/components` directory
* University-specific data should be added to `src/data/universities.ts`
* Utility functions belong in the `src/utils` directory
* Follow the existing directory structure when adding new files

### Naming Conventions

* Use PascalCase for component names and file names
* Use camelCase for variable and function names
* Use descriptive names that clearly indicate purpose
* Prefix interface names with 'I' when appropriate

## Types of Contributions

### Bug Reports

When reporting bugs, please include:

* A clear description of the problem
* Steps to reproduce the issue
* Expected vs actual behavior
* Browser and operating system information
* Screenshots if applicable

### Feature Requests

For new feature suggestions:

* Clearly describe the proposed functionality
* Explain the problem it solves or value it adds
* Consider the impact on existing users and functionality
* Provide mockups or examples if helpful

### Code Contributions

#### University Data Updates

* When adding new universities, ensure all required fields are included
* Verify merit calculation formulas with official university sources
* Update the README file to include new institutions
* Test the calculator functionality thoroughly

#### UI/UX Improvements

* Maintain consistency with the existing design system
* Ensure changes work across all supported screen sizes
* Test accessibility features and keyboard navigation
* Follow modern web design best practices

#### Performance Optimizations

* Profile your changes to ensure they improve performance
* Maintain or improve existing loading times
* Consider impact on bundle size and memory usage
* Test on lower-end devices and slower network connections

## Commit Message Guidelines

Use clear, descriptive commit messages that follow this format:

```
type(scope): brief description

Detailed explanation if necessary

Closes #issue-number
```

Types include:
* feat: New feature
* fix: Bug fix
* docs: Documentation updates
* style: Code formatting changes
* refactor: Code restructuring without feature changes
* test: Adding or updating tests
* chore: Maintenance tasks

## Pull Request Process

1. **Before Submitting**
   * Ensure your code builds without warnings or errors
   * Test your changes across different browsers and devices
   * Update documentation if your changes affect user-facing functionality
   * Rebase your branch on the latest main branch

2. **Pull Request Description**
   * Provide a clear title summarizing the changes
   * Include a detailed description of what was changed and why
   * Reference any related issues using GitHub keywords
   * Include screenshots for UI changes

3. **Review Process**
   * Maintainers will review your pull request and provide feedback
   * Address any requested changes promptly
   * Be open to suggestions and collaborative improvement
   * Once approved, your changes will be merged into the main branch

## University Formula Verification

When contributing university-specific calculation formulas:

* Provide official sources for merit calculation methods
* Include documentation links or admission guideline references
* Verify formulas with recent admission cycles
* Test calculations with sample data to ensure accuracy

## Testing Guidelines

* Write unit tests for new utility functions
* Test calculator functionality with various input combinations
* Verify responsive design across different screen sizes
* Check accessibility compliance using browser development tools
* Test performance on both desktop and mobile devices

## Documentation Standards

* Keep README files up to date with new features
* Comment complex algorithms and business logic
* Update inline documentation for public APIs
* Maintain consistency in documentation style and format

## Code Review Criteria

Pull requests will be evaluated based on:

* Code quality and adherence to project standards
* Functionality and correctness of implementation
* Performance impact and optimization considerations
* User experience and interface design quality
* Compatibility with existing features and data
* Documentation quality and completeness

## Community Guidelines

* Be respectful and constructive in all interactions
* Focus on the technical merits of contributions
* Provide helpful feedback and suggestions
* Welcome newcomers and help them understand the project
* Follow the project's code of conduct at all times

## Getting Help

If you need assistance with contributing:

* Check existing issues and documentation first
* Ask questions in issue discussions
* Reach out to maintainers for guidance on complex changes
* Join community discussions and share your ideas

## Recognition

Contributors who make significant improvements to the project will be:

* Acknowledged in the project README
* Credited in release notes for major contributions
* Invited to participate in project planning discussions
* Considered for maintainer roles based on ongoing contributions

Thank you for helping make university admission calculations more accessible for Pakistani students. Your contributions make a meaningful difference in supporting students' educational journey. 