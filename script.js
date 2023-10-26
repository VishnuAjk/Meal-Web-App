const mealSearchInput = document.getElementById("mealSearchInput");
const searchResults = document.getElementById("searchResults");
const dummyDiv = document.getElementById('dummy-text');   // Holds result position when no result
const favoriteList = document.getElementById("favourites-body"); // Updated selection
const favorites =[];

// Function to fetch meals based on search input
async function searchMeals(query) {
    // Clear previous search results
    searchResults.innerHTML = "";
    if (query.trim() === "") {
        dummyDiv.style.display = 'block';
        return;
    }
    try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
        const data = await response.json();
        if (data.meals) {
            dummyDiv.style.display = 'none';
            data.meals.forEach((meal) => {
                const mealItem = document.createElement("div");
                mealItem.classList.add("meal-item");
                mealItem.style.width = '30%';
                mealItem.style.display = 'flex';
                mealItem.style.flexWrap = 'wrap';
                mealItem.innerHTML = `
                    <h3 style='text-align:center'>${meal.strMeal}</h3>
                    <img id="meal-image" src="${meal.strMealThumb}" alt="${meal.strMeal}">
                    <button id="fav-btn" class="favorite-btn" data-mealid="${meal.idMeal}">Favourite</button>
                    <button class="details-btn" data-mealid="${meal.idMeal}">Recipe</button>
                `;

                searchResults.appendChild(mealItem);
            });
           
            // Handle "Favorite" button clicks
            const favoriteButtons = document.querySelectorAll('.favorite-btn');
            favoriteButtons.forEach((btn) => {
            btn.addEventListener('click', addToFavorites);
            });

            // Handle "Details" button clicks
            const detailsButtons = document.querySelectorAll('.details-btn');
            detailsButtons.forEach((btn) => {
            btn.addEventListener('click', showMealDetails);
            });

        }
        else{
            searchResults.innerHTML = "<div class='no-result'>No meals found. Please try a different search.</div>";
        }
    }
    catch(error) {
        console.error("Error fetching data from API:", error);
    }
}


// Function to add a meal to favorites
function addToFavorites(event) {
    const mealDiv = event.target.parentElement; // Get the parent div (the meal div)
    favorites.push(mealDiv);
    updateFavoriteList();   
    window.alert('Meal added to Favorites!!');
   
}

// Function to update the favorite list
function updateFavoriteList() {

    favoriteList.innerHTML = "";
    favorites.forEach((mealDiv) => { 
        const copiedMealDiv = mealDiv.cloneNode(true);
        copiedMealDiv.style.width = '100%';
        copiedMealDiv.style.display = 'flex';
        copiedMealDiv.style.flexWrap = 'wrap';

        // Remove "Favorite" button in favoriteList section
        const favoriteButton = copiedMealDiv.querySelector('.favorite-btn');
        if (favoriteButton) {
            favoriteButton.remove();
        }
        copiedMealDiv.innerHTML += `
            <button class="remove-btn" data-mealid="${mealDiv.querySelector('.favorite-btn').getAttribute('data-mealid')}">Remove</button>
        `;
        
        favoriteList.appendChild(copiedMealDiv);
        
        // Handling "Details" button in favoriteList section
        const detailsButtons = copiedMealDiv.querySelectorAll('.details-btn');
            detailsButtons.forEach((btn) => {
            btn.addEventListener('click', showMealDetails);
            });  
        });

        localStorage.setItem('favoriteList', favoriteList.innerHTML);  //for Storage of FavoriteList
    }

favoriteList.addEventListener("click", (event) => {

    if (event.target.classList.contains("remove-btn")) {   
        const mealId = event.target.getAttribute("data-mealid");
        // Find the corresponding copiedMealDiv and remove it from favorites
        const indexToRemove = favorites.findIndex((mealDiv) =>
            mealDiv.querySelector('.favorite-btn').getAttribute('data-mealid') === mealId
        );

        if (indexToRemove !== -1) {
            favorites.splice(indexToRemove, 1);
            updateFavoriteList();
            window.alert('Meal removed from Favorites');
        }
    }
});

function showMealDetails(event) {
    const mealId = event.target.getAttribute("data-mealid");
    // Fetch meal details based on the mealId
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
        .then((response) => response.json())
        .then((data) => {
            const mealDetails = data.meals[0];
            
            // Create a container div for the card
            const cardDiv = document.createElement("div");
            cardDiv.style.display='flex';
            cardDiv.style.flexDirection='column';
            cardDiv.style.alignItems='center'
            cardDiv.classList.add("card");

            // Create an image element and reduce its size
            const imageElement = document.createElement("img");
            imageElement.src = mealDetails.strMealThumb;
            imageElement.alt = mealDetails.strMeal;
            imageElement.classList.add("card-img-top");
            imageElement.style.maxWidth = "30%"; // Adjust the size as needed
            imageElement.style.maxHeight="200px";
            // Create a div for card body
            const cardBody = document.createElement("div");
            cardBody.classList.add("card-body");

             // Handle the click event for the back button
             const backButton = document.createElement("button");
             backButton.id = "backButton";
             backButton.classList.add("back-button");
             backButton.innerHTML = '<i class="fa-solid fa-house"></i>';
             backButton.addEventListener("click", () => {
                 // Remove the card and show the search results again (going back to the homepage)
                 searchResults.removeChild(cardDiv);
             });
             cardDiv.appendChild(backButton);

            // Populate the card body with meal details
            cardBody.innerHTML = `
                <h5 class="card-title">${mealDetails.strMeal}</h5>
                <p class="card-text">Category: ${mealDetails.strCategory}</p>
                <p class="card-text">Area: ${mealDetails.strArea}</p>
                <p class="card-text">Instructions: ${mealDetails.strInstructions}</p>
                <div class="text-center">
                    <a href="${mealDetails.strYoutube}" target="_blank" class="btn btn-dark mt-3">Watch Video</a>
                </div>
            `;

            // Append the image and card body to the card container
            cardDiv.appendChild(imageElement);
            cardDiv.appendChild(cardBody);

            // Append the card to a container (e.g., searchResults)
            searchResults.innerHTML = ""; // Clear previous search results
            searchResults.appendChild(cardDiv);

           
        })
        .catch((error) => {
            console.error("Error fetching meal details:", error);
        });
}


window.addEventListener('load', () => {
    const storedFavoriteList = localStorage.getItem('favoriteList');
    if (storedFavoriteList) {
        favoriteList.innerHTML = storedFavoriteList;
    }
});


// Event listener for search input
mealSearchInput.addEventListener("input", () => {
    const query = mealSearchInput.value;
    searchMeals(query);
});

// Initial search
searchMeals("");

