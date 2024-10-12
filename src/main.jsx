import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

// import {CssBaseline} from "@mui/material";

import {FirebaseProvider} from "./context/firebase.jsx";

import {ThemeProvider, createTheme} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const Theme = createTheme({});

ReactDOM.createRoot(document.getElementById("root")).render(
	<>
		<ThemeProvider theme={Theme}>
			<CssBaseline />
			<FirebaseProvider>
				<App />
			</FirebaseProvider>
			<div style={{height: "5rem"}}></div>
		</ThemeProvider>
	</>
);
