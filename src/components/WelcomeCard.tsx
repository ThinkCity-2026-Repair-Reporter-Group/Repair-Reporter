import { Card, CardContent, Typography, Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export default function WelcomeCard() {
	const muiTheme = useTheme();

	return (
		<Card
			sx={{
				mb: 3,
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
						Welcome to Repair Reporter
					</Typography>
					<Typography variant="body1" color="text.secondary">
						Easily report potholes, broken benches, streetlight outages, and other public issues.
						Your reports are pinned on the city map and help local authorities fix them faster.
					</Typography>
				</Box>
			</CardContent>
		</Card>
	);
}
