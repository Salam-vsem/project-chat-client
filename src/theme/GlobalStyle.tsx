import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
  margin: 0;
    /* font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen'; */
      /* 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', 'PT Sans' */
      /* sans-serif; */
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: #1A1B1D;
    color: #EEEEEE;
    font-size: 16px;
    font-family: Helvetica, Arial, Sans-Serif;
  }
`;

export default GlobalStyle;
