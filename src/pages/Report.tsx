import {
	Box,
	TextField,
	Button,
	MenuItem,
	Typography,
} from "@mui/material";
import { createReport, uploadImage, type Report } from "../services/api";
import PageLayout from "../components/PageLayout";
import { useState, useEffect } from "react";
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
// import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
// import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import MapPicker from "../components/MapPicker";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
	'& .MuiDialogContent-root': {
		padding: theme.spacing(2),
	},
	'& .MuiDialogActions-root': {
		padding: theme.spacing(1),
	},
}));

export default function Report() {

	const [errorText, setErrorText] = useState("");
	const [latitude, setLatitude] = useState(0);
	const [longitude, setLongitude] = useState(0);
	const [issueType, setIssueType] = useState("");
	const [description, setDescription] = useState("");
	const [imageFile, setImageFile] = useState<File | null>(null);


	const [dialogIsOpen, setDialogIsOpen] = useState(false);

	const handleOpenDialog = () => {
		setDialogIsOpen(true);
	};
	const handleCloseDialog = () => {
		setDialogIsOpen(false);
	};

	// Inside a submit handler
	async function handleSubmit(file: File, type: string, description: string, lat: number, lng: number) {
		try {
			const imageUrl = file ? await uploadImage(file) : undefined;

			const newReport: Report = {
				type,
				description,
				lat,
				lng,
				imageUrl,
				createdAt: new Date().toISOString()
			};

			const id = await createReport(newReport);
			console.log("Report created with ID:", id);
		} catch (err) {
			console.error("Error submitting report:", err);
		}
	}

	function handleSetLatLng(latLng: { lat: number; lng: number } | null) {
		if (latLng) {
			setLatitude(latLng.lat);
			setLongitude(latLng.lng);
		}
		handleCloseDialog();
	}

	function handleClickSubmit() {
		console.log('values', issueType, description, `(${latitude}, ${longitude})`, imageFile);

		const errors = [];
		if (!issueType)
			errors.push("Please select an issue type.");
		if (!description)
			errors.push("Please enter a description.");
		if (latitude === 0 || longitude === 0)
			errors.push("Please choose a location for the issue.");
		if (typeof imageFile === "undefined" || imageFile === null)
			errors.push("Please upload a photo.");

		if (errors.length > 0) {
			setErrorText(errors.join("\n"));
			return;
		}

		handleSubmit(imageFile!, issueType, description, latitude, longitude);
	}

	useEffect(() => {
		// Reset error text when inputs change
		setErrorText("");
	}, [issueType, description, latitude, longitude, imageFile]);

	useEffect(() => {

		setLatitude(0);
		setLongitude(0);
		setImageFile(null);
	}, [])

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
					value={issueType}
					onChange={(e) => setIssueType(e.target.value)}
					margin="normal"
				>
					<MenuItem value=""></MenuItem>
					<MenuItem value="pothole">Pothole</MenuItem>
					<MenuItem value="bench">Broken Bench</MenuItem>
					<MenuItem value="light">Streetlight Out</MenuItem>
				</TextField>

				<TextField
					label="Description"
					multiline
					value={description}
					onChange={(e) => setDescription(e.target.value)}
					rows={3}
					fullWidth
					margin="normal"
				/>

				<Button
					variant="outlined"
					component="label"
					fullWidth
					sx={{ mt: 2 }}
					onClick={() => handleOpenDialog()}
				>
					Choose Location
				</Button>
				<Typography sx={{ mt: 1 }}>
					{latitude !== 0 && longitude !== 0
						? `Selected location: (${latitude.toFixed(4)}, ${longitude.toFixed(4)})`
						: "No location selected."}
				</Typography>

				<Button
					variant="outlined"
					component="label"
					fullWidth
					sx={{ mt: 2 }}
				>
					Upload Photo
					<input type="file" hidden />
				</Button>

				<Typography sx={{ mt: 1 }}>
					{imageFile && imageFile.name
						? `Selected image: ${imageFile.name}`
						: "No image selected."}
				</Typography>

				<Button
					variant="contained"
					fullWidth
					sx={{ mt: 3 }}
					onClick={() => handleClickSubmit()}
				>
					Submit Report
				</Button>
				<Typography color="error" sx={{ mt: 2 }}>
					{errorText.split('\n').map((line, index) => (
						<span key={index}>
							{line}
							<br />
						</span>
					))}
				</Typography>
			</Box>
			{/* https://mui.com/material-ui/react-dialog/ */}
			<BootstrapDialog
				onClose={handleCloseDialog}
				aria-labelledby="customized-dialog-title"
				open={dialogIsOpen}
				fullWidth
				// sx={{ width: '75vw', maxWidth: '1600px' }}
				maxWidth="lg"
			>
				<IconButton
					aria-label="close"
					onClick={handleCloseDialog}
					sx={(theme) => ({
						position: 'absolute',
						right: 8,
						top: 8,
						color: theme.palette.grey[500],
						zIndex: 999,
					})}
				>
					<CloseIcon />
				</IconButton>
				<DialogContent sx={{ mt: '0px', width: '100%' }}>
					<MapPicker setLatLng={handleSetLatLng} />
				</DialogContent>
			</BootstrapDialog>
		</PageLayout >
	);
}
