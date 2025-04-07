# 🍽️ Recipe Sharing Platform

![React](https://img.shields.io/badge/React-18.x-61DAFB?logo=react)  
![Redux](https://img.shields.io/badge/Redux-Toolkit-764ABC?logo=redux)  
![Tailwind](https://img.shields.io/badge/TailwindCSS-3.x-38B2AC?logo=tailwindcss)  
![License](https://img.shields.io/badge/License-MIT-blue.svg)

A **simplified and stylish recipe-sharing web app** built with React, Redux, and Tailwind CSS. Users can browse, search, create, edit, and save their favorite recipes with full CRUD functionality, user authentication, and a sleek UI/UX.

---

## Features

### Core Functionality

- **- Recipe Feed** 
    - Grid/list view of recipes with image, title, cook time, and rating.
    - Search bar for titles or ingredients.
    - Fully responsive with Tailwind CSS.

- **- Recipe Details Page**
    - Ingredients list and cooking instructions.
    - Cooking timer based on cook time.
    - Save to Favorites button.

- **- User Authentication**
    - Login/Signup with client-side validation.
    - Mock authentication using LocalStorage.
    - Protected routes for authenticated users only.

- **- CRUD Operations**
    - Add new recipes with image, title, ingredients & instructions.
    - Update/Delete your own recipes.
    - Form validation using **Formik + Yup**.

- **-  Favorites System**
    - Save or unsave recipes.
    - Access saved recipes from profile.
    - Redux-powered state, persisted in LocalStorage.
- **- Cooking Timer**
    - Interactive countdown timer.
    - Starts from the recipe detail page.

- **- Ingredient Substitutions**
    - Suggestions for alternative ingredients.
    - Shown within recipe details.

- **- Notifications System**
    - Toasts for success/error actions.
    - Uses **React Toastify**.

- **- Advanced Filtering**
    - Filter by dietary needs (e.g., vegan, gluten-free).
    - Combined with title/ingredient search.

- **- Dark Mode**
    - Toggle between Light/Dark themes.
    - Saves preference in LocalStorage.
    - Tailwind CSS + CSS variables powered.

---

##  Tech Stack

| Area             | Tech Used                               |
|------------------|------------------------------------------|
|  Frontend       | React.js                                 |
| Routing         | React Router                             |
| State Management| Redux Toolkit, Redux Thunk               |
|  Styling        | Tailwind CSS, CSS Variables              |

---

## Screenshots
Light & Dark Mode Preview

![Screenshot 1](./screenshots/loginLight.png)
![Screenshot 2](./screenshots/signupLight.png)
![Screenshot 3](./screenshots/loginDark.png)
![Screenshot 4](./screenshots/signUpDark.png)
![Screenshot 5](./screenshots/homeLight.png)
![Screenshot 6](./screenshots/homeDark.png)
![Screenshot 7](./screenshots/recipeList.png)
![Screenshot 8](./screenshots/footer.png)
![Screenshot 9](./screenshots/addRecipeLight.png)
![Screenshot 10](./screenshots/addRecipeDark.png)
![Screenshot 11](./screenshots/addRecipe2Light.png)
![Screenshot 12](./screenshots/viewRecipeDark.png)
![Screenshot 13](./screenshots/viewFavRecipes.png)
![Screenshot 14](./screenshots/editRecipeDark.png)
![Screenshot 15](./screenshots/shareRecipes.png)
![Screenshot 16](./screenshots/profileLight.png)
![Screenshot 17](./screenshots/profile.png)

---

## Contributing

Contributions are welcome! Please fork the repository and create a pull request.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.


