
# Meal Finder Web App

This web application is for searching and managing meal recipes. Users can search for meals, add their favorite meals to a list, and view detailed information about the selected meal. The code utilizes the TheMealDB API to fetch meal data and stores user favorites in local storage.



## Features
### Meal Search

- Users can enter a meal name in the search input field 
- The application sends an API request to fetch meals matching the query.
- Search results are displayed, including meal names, images, and "Favorite" and "Recipe" buttons.

### Favorites

- Users can click the "Favorite" button to add a meal to their favorites list.
- The list of favorite meals is displayed on the right side.
- Users can click the "Remove" button to remove a meal from their favorites.

### Details View

- Users can click the "Recipe" button to view detailed information about a meal, including its name, category, area, instructions, and an image.
- A "Back" button allows users to return to the search results.



## Implementation Details

- The code uses asynchronous JavaScript (async/await) to fetch data from the TheMealDB API.
- It dynamically generates HTML elements to display search results and detailed meal information.
- The user's favorite meals are stored in an array and in local storage to persist across sessions.
- Event listeners are set up for "Favorite," "Remove," "Recipe," and "Back" buttons.
- The code also provides error handling for API requests.
## How to Use

- Open the HTML page containing this JavaScript code in a web browser.
- Enter a meal name in the search input field and press Enter to search.
- Click the "Favorite" button to add a meal to your favorites.
- Click the "Remove" button in the favorites list to remove a meal.
- Click the "Recipe" button to view detailed information about a meal, and use the "Back" button to return to the search results.
## Notes

- To run this code successfully, make sure you have an internet connection, as it relies on the TheMealDB API for meal data.
- The code stores user favorites in local storage, which may be limited or disabled in some browser settings. Ensure local storage is enabled for the best experience.

Enjoy exploring and managing your favorite meals with this Meal Finder web app!

## Website Link
 https://vishnuajk.github.io/Meal-Web-App/
