import {
	Box,
	TextField,
	Button,
	MenuItem,
	Typography,
} from "@mui/material";
import { createReport, uploadImage, type Report } from "../services/api";
import PageLayout from "../components/PageLayout";

export default function Report() {


	// Inside a submit handler
	async function handleSubmit(file: File, description: string, lat: number, lng: number) {
		try {
			const imageUrl = file ? await uploadImage(file) : undefined;

			const newReport: Report = {
				type: "pothole",
				description,
				lat,
				lng,
				imageUrl,
			};

			const id = await createReport(newReport);
			console.log("Report created with ID:", id);
		} catch (err) {
			console.error("Error submitting report:", err);
		}
	}

	return (
		<PageLayout>
			<Box sx={{ maxWidth: 600, mx: "auto", mt: 4 }}>
				<Typography variant="h5" gutterBottom>
					Report an Issue
				</Typography>

				<TextField
					select
					label="Issue Type"
					fullWidth
					margin="normal"
				>
					<MenuItem value="pothole">Pothole</MenuItem>
					<MenuItem value="bench">Broken Bench</MenuItem>
					<MenuItem value="light">Streetlight Out</MenuItem>
				</TextField>

				<TextField
					label="Description"
					multiline
					rows={3}
					fullWidth
					margin="normal"
				/>

				<Button
					variant="outlined"
					component="label"
					fullWidth
					sx={{ mt: 2 }}
				>
					Upload Photo
					<input type="file" hidden />
				</Button>

				<Button
					variant="contained"
					fullWidth
					sx={{ mt: 3 }}
				>
					Submit Report
				</Button>
			</Box>
		</PageLayout >
	);
}
