# Translations UI (Vue3 and Nuxt)

This project is a clean, modern, and performant web application for browsing and filtering translation keys from the Directus API. It is built with Nuxt 3 and demonstrates a robust, component-based architecture with a focus on code quality, reusability, and user experience.

<br/>

## GIF
![rn-mobile](https://github.com/user-attachments/assets/50290b5c-6412-4255-b73b-6f01187ec8e5)


---

## Features

- **Live Data Fetching:** Interfaces directly with the Directus API to display translation keys.
- **Dynamic Filtering:**
  - Filter translations by key with a debounced search input for performance.
  - Filter translations by a specific date range. // Due to SERVER ERROR, code is commented
- **Interactive Table:**
  - Cleanly displays translation keys, a primary translation, and the last updated date.
  - On-hover tooltips provide a full list of all available locale translations for each key.
- **Full Pagination:**
  - View the total number of items and pages.
  - Navigate between pages with next/previous controls.
  - Change the number of items displayed per page.
- **Responsive UI Feedback:**
  - Displays a loading state while data is being fetched.
  - Shows a clear empty state message when no results are found.
  - Handles and reports API errors gracefully.

---

## Local Development Setup

To run this project locally, follow these steps:

1.  **Clone the repository:**

    ```bash
    git clone <repository-url>
    cd <repository-directory>
    ```

2.  **Install dependencies:**
    This project uses `npm` as its package manager.

    ```bash
    npm install
    ```

3.  **Run the development server:**
    This will start the application on `http://localhost:3000`. The server will automatically reload when you make changes to the code.
    ```bash
    npm run dev
    ```

## Project Structure

The project follows the standard Nuxt 3 directory structure:

- `assets/`: Global styles and static assets.
- `components/`: Reusable Vue components (e.g., Input, Pagination, Table).
- `composables/`: Contains the core `useTranslations` composable which manages all state and data fetching logic.
- `layouts/`: Defines the main layout for the application pages.
- `pages/`: Contains the application's pages (routes).
- `server/`: Nuxt server routes, including the API proxy to Directus.
- `types/`: TypeScript type definitions.
- `utils/`: Shared utility functions.
