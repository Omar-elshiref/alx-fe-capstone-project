FE Capstone Project: Weather Dashboard
Project Overview:
As a frontend developer, your goal is to design and implement a Weather Dashboard using React JS (with optional Tailwind CSS) and / or HTML, CSS, JavaScript.

The application will allow users to search for current weather conditions in various cities, utilizing a public weather API. This project will challenge you to build a responsive and interactive user interface, effectively fetch and display data from an external API, and deploy your application for online access.

The project will simulate a real-world frontend development environment, emphasizing user interface design, API integration, and deployment.

Functional Requirements:
Weather Data Fetching:

Implement a function to fetch weather data from a public weather API, such as OpenWeatherMap.
Display the following weather details for the searched city:
Temperature: Current temperature in Celsius or Fahrenheit.
Humidity: Current humidity level as a percentage.
Wind Speed: Current wind speed in km/h or mph.
Weather Condition Icon: A graphical representation of the current weather (e.g., sunny, cloudy, rainy).
City Search Functionality:

Create a search bar that allows users to input the name of a city.
Fetch and display the weather data for the specified city when the user submits the search.
Handle invalid city names or errors by displaying a user-friendly error message.
Responsive UI Design:

Use Tailwind CSS (or vanilla CSS) to create a responsive design that adapts to various screen sizes (e.g., desktop, tablet, mobile).
Ensure that the weather dashboard is visually appealing and provides a clear, intuitive user experience.
Real-Time Weather Updates:

Allow the dashboard to automatically update weather data every few minutes, providing users with the most current information.
Optionally, provide a refresh button to manually update the weather information.
Error Handling:

Implement proper error handling for scenarios such as network issues, invalid API responses, or incorrect city names.
Display user-friendly messages or alerts in case of errors.
Technical Requirements:
Project Setup:

Set up a React project using tools like vite or a custom configuration.
Configure and integrate TailwindCSS for styling (if preferred).
API Integration:

Sign up for an API key on OpenWeatherMap or another weather service.
Use fetch or axios to make requests to the weather API and handle asynchronous data fetching.
Display the fetched weather data in a structured and readable format.
User Interface Components:

Create reusable components for the weather dashboard, such as SearchBar, WeatherCard, and ErrorMessage.
Design a cohesive layout with Tailwind CSS, ensuring consistency in colors, typography, and spacing.
State Management:

Use React’s state management hooks (useState and useEffect) to handle data fetching, user input, and UI updates.
Optionally, explore more advanced state management tools like Redux, Zustand or mobx-state-tree if needed.
Deployment:

Deploy the completed application on a free hosting platform like Netlify or Vercel.
Ensure the application is accessible and performs well in the deployed environment.
Share the deployment link as part of your project submission.
Stretch Goals (Optional):
Local Storage for Recent Searches:

Save users’ recent city searches in the browser’s local storage and display them as suggestions when they return to the site.
Weekly Weather Forecast:

Extend the dashboard to include a 7-day weather forecast for the searched city, showing daily high and low temperatures and weather conditions.
Theme Customization:

Implement a light/dark mode toggle to switch between themes, or change the background image based on the current weather condition.
Geolocation API:

Use the browser’s Geolocation API to automatically detect the user’s current location and display the weather for their city upon loading the application.
Internationalization:

Add support for multiple languages, allowing users to view weather information in their preferred language.