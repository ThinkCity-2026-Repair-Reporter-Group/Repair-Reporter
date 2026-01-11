import MapView from "../components/MapView";
import { Card, CardContent, Typography, Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { type Report } from '../services/api';
import { useState } from "react";

export default function MapPage() {
	const muiTheme = useTheme();

	const [report, setReport] = useState<Report | null>(null);

	function reportedWhen(date: string): string {
		const reportDate = new Date(date);
		return `Reported on ${reportDate.toLocaleDateString()} at ${reportDate.toLocaleTimeString()}`;
	}

	return (
		<>
			<MapView setReport={setReport} />
			{report && (<Card
				sx={{
					mt: '32px',
					backgroundColor: (theme) =>
						theme.palette.mode === "dark"
							? theme.palette.background.paper
							: "#f0f4f8",

					borderRadius: muiTheme.shape.borderRadius,
					// borderLeft: `6px solid ${theme => theme.palette.primary.main}`,
					boxShadow: 3,
				}}
			>
				<CardContent>
					<Box>
						<Typography variant="h5" component="div" gutterBottom>
							{report.type}
						</Typography>
						<Typography variant="body1" color="text.secondary">
							{report.description}
						</Typography>
						<Typography variant="body1" color="text.secondary">
							{report.createdAt && reportedWhen(report.createdAt)}
						</Typography>
						{report.imageUrl && (
							<img src={report.imageUrl} alt={report.type} style={{ width: "100%", height: "auto", marginTop: '8px', borderRadius: muiTheme.shape.borderRadius }} />
						)}
					</Box>
				</CardContent>
			</Card>
			)}
		</>
	);
}

