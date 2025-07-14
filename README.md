# Mapbox 3D Buildings Demo with Next.js and Tailwind CSS

This project demonstrates a Mapbox GL JS map with 3D buildings, built using Next.js and styled with Tailwind CSS.

## Getting Started

First, ensure you have Node.js and npm installed.

1.  **Clone the repository (if applicable) or navigate to the project directory.**
    If you just created the project, you are already in the correct directory.

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Set up your Mapbox Access Token:**
    Create a `.env.local` file in the root of the project and add your Mapbox Public Access Token:

    ```
    NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN='YOUR_MAPBOX_ACCESS_TOKEN'
    ```
    Replace `YOUR_MAPBOX_ACCESS_TOKEN` with your actual token from [Mapbox](https://account.mapbox.com).

4.  **Run the development server:**

    ```bash
    npm run dev
    ```

    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

*   `components/MapComponent.js`: Contains the core Mapbox GL JS logic for initializing the map and adding the 3D buildings layer.
*   `src/app/page.tsx`: The main page component that renders the `MapComponent`.
*   `.env.local`: Stores your Mapbox access token securely.

## Features

*   **Interactive 3D Buildings**: Displays buildings with 3D extrusion based on height data.
*   **Next.js**: Utilizes the React framework for server-side rendering and efficient client-side navigation.
*   **Tailwind CSS**: Provides a utility-first CSS framework for rapid UI development.
*   **Secure API Key Handling**: Uses environment variables to protect your Mapbox access token.

## Learn More

To learn more about Next.js, Mapbox GL JS, and Tailwind CSS, take a look at the following resources:

*   [Next.js Documentation](https://nextjs.org/docs)
*   [Mapbox GL JS Documentation](https://docs.mapbox.com/mapbox-gl-js/api/)
*   [Tailwind CSS Documentation](https://tailwindcss.com/docs)
