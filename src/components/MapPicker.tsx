import { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import { Box, Button, Typography } from '@mui/material';

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

const MapPicker = () => {
	const mapContainer = useRef<HTMLDivElement | null>(null);
	const map = useRef<mapboxgl.Map | null>(null);
	const [lngLat, setLngLat] = useState<{ lng: number; lat: number } | null>(null);
	const [marker, setMarker] = useState<mapboxgl.Marker | null>(null);

	useEffect(() => {
		if (map.current) return; // initialize map only once

		map.current = new mapboxgl.Map({
			container: mapContainer.current!,
			style: 'mapbox://styles/mapbox/streets-v12',
			center: [-122.4194, 37.7749], // default center (San Francisco)
			zoom: 10,
		});

		// Add click event to pick coordinates
		map.current.on('click', (e) => {
			const { lng, lat } = e.lngLat;

			setLngLat({ lng, lat });

			// Add or move marker
			if (marker) {
				marker.setLngLat([lng, lat]);
			} else {
				const newMarker = new mapboxgl.Marker().setLngLat([lng, lat]).addTo(map.current!);
				setMarker(newMarker);
			}
		});
	}, [marker]);

	return (
		<Box>
			<Box
				ref={mapContainer}
				sx={{ height: 400, width: '100%', borderRadius: 2, overflow: 'hidden' }}
			/>
			{lngLat && (
				<Typography sx={{ mt: 2 }}>
					Selected coordinates: {lngLat.lat.toFixed(6)}, {lngLat.lng.toFixed(6)}
				</Typography>
			)}
			<Button
				sx={{ mt: 2 }}
				variant="contained"
				onClick={() => {
					if (lngLat) alert(`Coordinates saved: ${lngLat.lat}, ${lngLat.lng}`);
				}}
			>
				Save Coordinates
			</Button>
		</Box>
	);
};

export default MapPicker;
