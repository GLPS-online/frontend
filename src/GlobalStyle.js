import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    font-family: "Pretendard";
    word-break: keep-all;
  }

  .App {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  :root {
    --blue: #6d6afe;
    --yellow: #ff5b56;
    --black: #111322;
    --white: #ffffff;
  }

  a {
    color: inherit;
    text-decoration: none;
    cursor: pointer;
  }

  input {
    border: none;
    padding: none;
  }
  input:focus {
    outline: none;
  }
  input[type="search"]::-webkit-search-decoration,
  input[type="search"]::-webkit-search-cancel-button,
  input[type="search"]::-webkit-search-results-button,
  input[type="search"]::-webkit-search-results-decoration {
    display: none;
  }

  button {
    border: none;
    padding: unset;
    background-color: unset;
    cursor: pointer;
  }

  * {
    -ms-overflow-style: none;
  }
  ::-webkit-scrollbar {
    display: none;
  }
`;

export default GlobalStyle;
