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
import {
	Box
} from "@mui/material";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

function getMapBoxThmeUrl(lightmode: boolean) {
	return lightmode
		? "mapbox://styles/mapbox/streets-v11"
		: "mapbox://styles/mapbox/streets-v11";
}

export default function MapView() {
	const mapRef = useRef<mapboxgl.Map | null>(null);
	const containerRef = useRef<HTMLDivElement>(null);
	const { mode } = useContext(ThemeContext);
	const muiTheme = useTheme();

	function addReportsToMap(reports: Report[]) {
		if (!mapRef.current) return;

		reports.forEach((report) => {
			const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
				`<h3>${report.type}</h3>
				<p>${report.description || ""}</p>
				${report.imageUrl ? `<img src="${report.imageUrl}" alt="${report.type}" style="width:100%;height:auto;"/>` : ""}`
			);

			new mapboxgl.Marker({ color: "red" })
				.setLngLat([report.lng, report.lat])
				.setPopup(popup)
				.addTo(mapRef.current!);
		});
	}

	useEffect(() => {
		if (!containerRef.current) return;

		mapRef.current = new mapboxgl.Map({
			container: containerRef.current,
			style: getMapBoxThmeUrl(mode !== "dark"),
			center: [-122.2, 47.61],
			zoom: 12,
		});

		async function fetchAndAddReports() {
			const reports = await getReports(); // fetch from API
			console.log('reports', reports);

			addReportsToMap(reports);
		}

		fetchAndAddReports();

		return () => mapRef.current?.remove();
	}, []);

	useEffect(() => {
		if (!mapRef.current) return;

		mapRef.current.setStyle(
			getMapBoxThmeUrl(mode !== "dark")
		);
	}, [mode]);

	return (
		<Box
			ref={containerRef}
			sx={{
				height: "calc(50vh - 64px)",
				// padding: '0 16px',
				borderRadius: muiTheme.shape.borderRadius,
				// borderRadius: 8,
				overflow: "hidden",
			}}
		/>
	);
}
