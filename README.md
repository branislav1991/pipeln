# Pipeln Project Repository

This repository serves as the monorepo for the pipeln codebase.

## Pipeln Architecture

Pipeln is currently designed as a monolithic app with a SPA frontend (built using React) and a REST web service backend (build using FastAPI).

## Repository Structure

The repository is structured according to the deployment units in the
architecture. Each main subfolder in the repository corresponds to one
deployment unit (with its own containers, tests, data storage etc.). Some subfolders also contain their own README files and are for all intents and purposes considered complete subrepositories.

At the moment, the project consists of the following deployment units:

- `frontend`: User facing frontend built with react.
- `services`: All backend services.
    - `routers`: API definitions.
    - `schemas`: API schemas.

## Coding Style

Since the codebase consists of multiple languages, it is especially important to retain a common coding style. We are using the Google Style Guides wherever possible. Here is a list of the style guides for the most common languages in the repository:

- **Python**: [Google Python Style Guide](https://google.github.io/styleguide/pyguide.html)
- **JavaScript**: [Google Javascript Style Guide](https://google.github.io/styleguide/jsguide.html)
- **C++**: [Google C++ Style Guide](https://google.github.io/styleguide/cppguide.html)