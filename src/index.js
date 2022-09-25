import React from 'react';
import { render } from "react-dom";

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider } from 'theme-ui';
import theme from './theme';


const root = document.getElementById("root");
render(<ThemeProvider theme={theme}><App /></ThemeProvider>, root);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

