import { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import { Box, Button, Typography } from '@mui/material';

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;



interface MapPickerProps {
	setLatLng: (latLng: { lat: number; lng: number } | null) => void;
}


export default function MapPickerProps({ setLatLng }: MapPickerProps) {
	const mapContainer = useRef<HTMLDivElement | null>(null);
	const map = useRef<mapboxgl.Map | null>(null);
	const [lngLat, setLngLat] = useState<{ lng: number; lat: number } | null>(null);
	const markerRef = useRef<mapboxgl.Marker | null>(null);

	useEffect(() => {
		if (map.current) return;

		map.current = new mapboxgl.Map({
			container: mapContainer.current!,
			style: 'mapbox://styles/mapbox/streets-v12',
			center: [-122.4194, 37.7749],
			zoom: 10,
		});

		map.current.on('click', (e) => {
			const { lng, lat } = e.lngLat;

			setLngLat({ lng, lat });

			if (markerRef.current) {
				markerRef.current.setLngLat([lng, lat]);
			} else {
				markerRef.current = new mapboxgl.Marker()
					.setLngLat([lng, lat])
					.addTo(map.current!);
			}
		});
	}, []);

	return (
		<Box>
			<Box
				ref={mapContainer}
				sx={{ height: '70vh', minHeight: 400, width: '100%', borderRadius: 2, overflow: 'hidden' }}
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
					if (lngLat) setLatLng(lngLat);
				}}
			>
				Save Coordinates
			</Button>
		</Box>
	);
};