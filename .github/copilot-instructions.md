# Snax - Food Photo to Meal Ideas Application

**ALWAYS reference these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.**

Snax is an application that generates snacks and meal ideas based on photos of food. This repository is currently in its initial state with only basic setup files.

## Current Repository State

**CRITICAL**: This repository is currently minimal and contains only initialization files:
- README.md - Basic project description
- LICENSE - GPL-3.0 license
- .gitignore - Node.js standard gitignore (indicates planned Node.js development)

**No build system, dependencies, or source code exists yet.**

## Working Effectively

### Initial Repository Assessment
- Repository contains only 3 files: README.md, LICENSE, .gitignore
- No package.json, source code, tests, or build infrastructure present
- .gitignore suggests future Node.js development is planned
- No CI/CD workflows configured

### Bootstrap Commands (Current State)
```bash
# Clone and inspect the repository
git clone https://github.com/cpetrula/snax.git
cd snax
ls -la  # Shows only README.md, LICENSE, .gitignore

# Current directory structure:
# .
# ├── .git/
# ├── .gitignore
# ├── LICENSE
# └── README.md
```

### Development Setup (When Code is Added)
Since this is a minimal repository, development setup will depend on the technology stack chosen. Based on the .gitignore file, Node.js is likely planned:

**EXACT SETUP COMMANDS (When Node.js project is implemented):**
```bash
# Node.js is already available in this environment:
node --version                 # Currently: v20.19.4
npm --version                  # Currently: v10.8.2

# When package.json is added to the repository:
npm install                    # Install dependencies (timeout: 30+ minutes, NEVER CANCEL)
npm run build                  # Build the application (timeout: 30+ minutes, NEVER CANCEL)
npm run test                   # Run test suite (timeout: 20+ minutes, NEVER CANCEL)
npm run start                  # Start the application
npm run dev                    # Start development server (if configured)
```

**CURRENT SETUP (Working Now):**
```bash
# Clone repository
git clone https://github.com/cpetrula/snax.git
cd snax

# Verify current state
ls -la                         # Shows basic files only
git status                     # Shows clean repository
```

**WHEN NODE.JS CODE IS ADDED:**
```bash
# Expected future commands (NOT CURRENTLY WORKING):
npm install          # Will fail - no package.json exists
npm run build        # Will fail - no package.json exists
npm run test         # Will fail - no package.json exists
npm run start        # Will fail - no package.json exists
```

**CURRENT VALIDATION COMMANDS:**
```bash
# These commands currently work:
git status           # Shows clean working directory
git log --oneline    # Shows minimal commit history
cat README.md        # Shows basic project description
cat .gitignore       # Shows Node.js gitignore template
```

## Build and Test (Not Applicable Yet)

**CRITICAL**: No build system exists yet. The following are placeholders for future development:

- **Build**: Not applicable - no source code exists
- **Test**: Not applicable - no test framework exists  
- **Lint**: Not applicable - no linting configuration exists
- **Package**: Not applicable - no package.json exists

**TIMEOUT EXPECTATIONS (Future Development):**
- **NEVER CANCEL** any build or test commands once implemented
- Build operations: Expect 5-15 minutes for typical Node.js builds - set timeout to 30+ minutes
- Test operations: Expect 2-10 minutes for comprehensive test suite - set timeout to 20+ minutes
- Photo processing operations: May take 30+ minutes depending on ML model complexity - set timeout to 60+ minutes

## Validation Steps

### Current Validation (What Works)
- Verify repository clone: `git clone` works
- Check file structure: `ls -la` shows expected 3 files
- Read documentation: `cat README.md` provides project description
- Git operations: `git status`, `git log` work normally

### Future Validation (When Code is Added)
When actual code is implemented, validation should include:

**MANUAL VALIDATION SCENARIOS (CRITICAL):**
- **Photo Upload Test**: Upload a food photo and verify meal suggestions are generated
- **Suggestion Quality Test**: Validate that generated meal ideas are relevant to the uploaded food
- **User Interface Test**: Navigate through all major user flows (upload → process → display results)
- **Error Handling Test**: Test with invalid file formats, large files, unclear photos
- **Performance Test**: Measure response times for photo processing and suggestion generation

**AUTOMATED VALIDATION:**
- Build verification with appropriate timeout (estimate based on technology stack)
- Test suite execution with appropriate timeout  
- Linting and code formatting checks
- End-to-end functionality testing of photo processing and meal suggestion features

**VALIDATION TIMING:**
- Photo processing: 30-120 seconds per image (depending on ML model complexity)
- Database queries: 1-5 seconds for meal suggestion retrieval
- UI rendering: Sub-second for most operations

## Technology Stack Assessment

**Current**: Undefined (only basic repository files exist)
**Suggested** (based on .gitignore): Node.js/JavaScript project
**Future Needs**: 
- Photo processing libraries
- Machine learning/AI integration for food recognition
- Web framework for user interface
- Database for meal ideas and recipes

## Common Development Tasks

### File Navigation
```bash
# Repository root contents
ls -la
# Output: .gitignore, LICENSE, README.md

# No source directories exist yet
# Future structure might include:
# src/ - source code
# tests/ - test files  
# docs/ - documentation
# public/ - static assets
```

### Version Control
```bash
# Standard git operations work:
git status
git add .
git commit -m "message"
git push
```

## Key Project Information

- **Project Type**: Food photo analysis and meal suggestion application
- **Current Status**: Repository initialization only
- **License**: GPL-3.0
- **Development Status**: Pre-development (no code exists)

## Instructions for Coding Agents

**CRITICAL GUIDELINES:**
1. **Always check current state first** - Run `ls -la` to verify what files actually exist
2. **Do not assume build infrastructure exists** - Check for package.json, Makefile, etc. before running build commands
3. **Validate commands before documenting** - Test each command in the current repository state
4. **Document actual command output** - Include real output from commands that work
5. **Be explicit about limitations** - Clearly state when commands don't work and why

**WHEN ADDING NEW CODE:**
1. First establish the technology stack (Node.js, Python, etc.)
2. Add appropriate project files (package.json, requirements.txt, etc.)
3. Set up build and test infrastructure
4. Update these instructions with validated commands and timeouts
5. Include manual validation scenarios for the food photo processing functionality

**TIMEOUT GUIDANCE:**
- File operations: Standard timeouts (current commands are instant)
- Future build operations: 30+ minutes minimum (NEVER CANCEL - builds may take up to 15 minutes)
- Future test operations: 20+ minutes minimum (NEVER CANCEL - test suites may take up to 10 minutes)  
- Photo processing: 60+ minutes minimum (NEVER CANCEL - ML operations may take 30+ minutes)
- Database operations: 5+ minutes minimum for large datasets

## Repository History

- Initial commit: Basic repository setup with README, LICENSE, .gitignore
- Current state: Awaiting initial code implementation

**Remember**: This repository is in its infancy. Always verify the current state before making assumptions about available functionality or build processes.