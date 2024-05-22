# Teachable Machine Clone

![Teachable Machine Clone](/website_screenshots/Homepage.png)

## Overview

Teachable Machine Clone is a user-friendly application developed to replicate the functionality of Google Teachable Machine. The aim of this project is to enable users without extensive machine learning expertise to generate and save classification models as Keras (.h5) files. By removing technical barriers, this project aims to democratize access to machine learning capabilities and facilitate broader adoption of AI technologies.

## Technologies Used

- React.js
- Flask
- TailwindCSS

## Features

- Model Training: Train your own classification model with your images easily on the user interface.
- Model Export: Export trained models to Keras files (.h5 files).
- Model Evaluation Metrics: View model metrics such as accuracy plot, loss plot, and confusion matrix.
- Model Evaluation: Test model predictions by providing an image.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/theSumanth/Teachable-Machine-Clone.git
   ```

### Frontend:

1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

### Backend:

1. Navigate to the `server` directory:
   ```bash
   cd server
   ```
2. Create a virtual environment:
   ```bash
   python3 -m venv venv
   ```
3. Activate the virtual environment:
   - On Windows:
     ```bash
     venv\Scripts\activate
     ```
   - On macOS/Linux:
     ```bash
     source venv/bin/activate
     ```
4. Install Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```

## Running the Frontend and Backend

### Backend (Flask)

1. Navigate to the `server` folder:
   ```bash
   cd server
   flask run --debug
   ```

### Frontend (React - Vite)

1. Navigate to the `frontend` folder:
   ```bash
   cd frontend
   npm run dev
   ```

## Output Screens

1. ### Home page:

   ![Home page screen](/website_screenshots/Homepage2.png)

2. ### Main page:

   ![Main page screen](/website_screenshots/Mainpage_demo.png)

3. ### Uploading images and giving class names:

   ![Main page screen 2](/website_screenshots/Mainpage.png)

4. ### Training the model:

   ![Training the model screen](/website_screenshots/Training_model.png)

5. ### Prediction screen:

   ![Prediction screen](/website_screenshots/Prediction.png)

6. ### Exporting the model:

   ![Model Exporting screen](/website_screenshots/Exporting_model.png)

7. ### Model Evaluation:
   ![Model metrics](/website_screenshots/Model_insights.png)
