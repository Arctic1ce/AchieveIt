# CSC 307 - AchieveIt

[![CI Testing](https://github.com/Arctic1ce/AchieveIt/actions/workflows/ci-testing.yml/badge.svg)](https://github.com/Arctic1ce/AchieveIt/actions/workflows/ci-testing.yml)

Artin Davari, Akhil Elamanchili, Joel Puthankalam, Vaibhav Garg, and Russ Sobti

## Project Description
For ANYONE  who wants to accomplish tasks, AchieveIt is a TO-DO list task manager that allows users to 
- create a list of tasks, 
- group them based on categories, 
- prioritize each task, 
- mark them as completed. 
AchieveIt allows users to store their to-do list in the cloud and access their lists anywhere and anytime. 

We envision a future where our users efficiently manage their tasks, attain their goals, and have more time for what truly matters in their lives. 

## UI Prototype
https://www.figma.com/file/XQAFpJUgzxDJzziY7Odv9V/AchieveItUI-Prototype?type=design&node-id=0-1&mode=design&t=HwpcWZV6mpMkeZ3e-0

## Class Diagram
https://drive.google.com/file/d/15OIib0rqy6Yxf5aWCqEmb32aBuBFupGI/view?usp=sharing
Last updated Nov 1, 2023

## Coverage Report
https://github.com/Arctic1ce/AchieveIt/blob/master/coverage-report.png

## Development Environment Setup
- Clone the master branch of the repository into a local directory.
- Change the backend links in the `server-locations.json` files in both the frontend and backend directories to use `http://localhost:8000`.
- Create a `.env` file in the backend directory with one environment variable called: `REACT_APP_TOKEN_SECRET` and set it equal to the token secret.
- Run `npm install` in the root directory.
- Run `npm start` in the root directory to launch the project locally.

## Contributing

To maintain a high-quality codebase and ensure consistency, we follow a set of coding standards based on the [Airbnb JavaScript/React Style Guide](https://airbnb.io/javascript/react/).

## Coding Standards

Before submitting a pull request, please make sure your code adheres to the following guidelines:

- **JavaScript/React Style**: Follow the [Airbnb JavaScript/React Style Guide](https://airbnb.io/javascript/react/) for code style and best practices.

- **Prettier**: We use Prettier to automatically format our code. Please configure your code editor to use Prettier with the project's settings. You can follow the setup instructions below to enable automatic code formatting in Visual Studio Code.

## Setting up IDE Plugins (VS Code with Prettier)

1. **Install Visual Studio Code**: If you haven't already, download and install [Visual Studio Code](https://code.visualstudio.com/).

2. **Install Prettier Extension**: Search for the "Prettier - Code formatter" extension in the VS Code Extensions marketplace and install it.

3. **Project Configuration**:

   - Create a `.prettierrc` file in the root of your project with the following content to configure Prettier according to our coding standards:

     ```json
     {
       "singleQuote": true,
       "trailingComma": "all",
       "tabWidth": 2,
       "semi": true,
       "jsxBracketSameLine": true
     }
     ```

4. **VS Code Settings**:

   - Open your VS Code settings by clicking on "File" > "Preferences" > "Settings" or by using the shortcut `Ctrl + ,`.

   - Search for "Format On Save" and make sure it's enabled. This will automatically format your code with Prettier when you save a file.

   - Search for "Editor: Default Formatter" and select "Prettier - Code formatter" to ensure Prettier is used for formatting.

5. **Save Configuration**: Save your settings to apply the changes.

By following these guidelines and setting up Prettier in your development environment, you'll help us maintain a consistent and clean codebase. Thank you for your contributions!
