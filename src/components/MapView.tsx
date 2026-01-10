import mapboxgl from "mapbox-gl";
import { useEffect, useRef, useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { useTheme } from "@mui/material/styles";
import "mapbox-gl/dist/mapbox-gl.css";
import {
	// createReport,
	getReports,
	// uploadImage
	type Report
} from "../services/api";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

function getMapBoxThmeUrl(lightmode: boolean) {
	return lightmode
		? "mapbox://styles/mapbox/light-v11"
		: "mapbox://styles/mapbox/dark-v11";
}

export default function MapView() {
	const mapRef = useRef<mapboxgl.Map | null>(null);
	const containerRef = useRef<HTMLDivElement>(null);
	const { mode } = useContext(ThemeContext);
	const muiTheme = useTheme();

	// async function fetchReports() {
	// 	const reports = await getReports();
	// 	console.log("Fetched reports:", reports);
	// 	// Here you can add code to display reports on the map
	// }

	useEffect(() => {
		if (!containerRef.current) return;

		mapRef.current = new mapboxgl.Map({
			container: containerRef.current,
			style: getMapBoxThmeUrl(mode !== "dark"),
			center: [-122.2, 47.61],
			zoom: 12,
		});

		// fetchReports();

		return () => mapRef.current?.remove();
	}, []);

	// 🔥 React to theme changes
	useEffect(() => {
		if (!mapRef.current) return;

		mapRef.current.setStyle(
			getMapBoxThmeUrl(mode !== "dark")
		);
	}, [mode]);

	return (
		<div
			ref={containerRef}
			style={{
				height: "calc(50vh - 64px)",
				// padding: '0 16px',
				borderRadius: muiTheme.shape.borderRadius,
				// borderRadius: 8,
				overflow: "hidden",
			}}
		/>
	);
}
