import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import Home from "./pages/Home";
import Map from "./pages/Map";
import Report from "./pages/Report";

export default function App() {
	return (
		<BrowserRouter>
			<CssBaseline />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/map" element={<Map />} />
				<Route path="/report" element={<Report />} />
			</Routes>
		</BrowserRouter>
	);
}