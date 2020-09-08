import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
    :root {
        --primary-color: #5fcf80;
        --primary-color-light: #5fcf8096;
        --primary-color-transparent: #d4fcee;
        --secondary-color: #1BCEA8;
        --text-dark: #4b4b4c;
        --text-dark-mid: #5e666b;
        --text-light: #717f86;
        --shadow-dark: 0 2rem 6rem rgba(0, 0, 0, 0.3);
        --shadow-mid: 0 2px 5px rgba(0, 0, 0, 0.1);
        --shadow-light: 0 2px 5px rgba(0, 0, 0, 0.06);
        --shadow-button: 0 1rem 2rem 0 rgba(0,0,0,0,15);
        --container-width-narrow: 870px;
        --container-width: 1170px;
        --container-width-wide: 1270px;
        --breakpoint-tablet: 720px;
    }

    *,
    *::after,
    *::before {
        margin: 0;
        padding: 0;
        box-sizing: inherit;
    }

    html {
        font-size: 62.5%;
        box-sizing: border-box;
    }

    body {
        font-family: "Open Sans", sans-serif;
        color: var(--text-dark);
        font-size: 1.6rem;
        
    }

    main {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
    }

    p {
        color: var(--text-light);
        line-height: 1.7;
        
        @media screen and (max-width: 1024px) {
            line-height: 1.5;
            font-size: 1.5rem;
        }
    }

    a {
        color: var(--primary-color);
        text-decoration: none;
    }
    
    .mapboxgl-popup-close-button {
        font-size: 2.25rem;
        padding: 0.5rem 1.25rem;
    }

`;
