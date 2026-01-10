import {
	AppBar,
	Toolbar,
	Typography,
	IconButton,
	Box,
} from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext.tsx";

export default function Header() {
	const { mode, toggleMode } = useContext(ThemeContext);

	return (
		<AppBar position="sticky" color="primary">
			<Toolbar
				sx={{ display: 'flex', justifyContent: 'space-between' }}>
				<Typography
					variant="h6"
					component={Link}
					to="/"
					sx={{ textDecoration: "none", color: "inherit" }}
				>
					Repair Reporter
				</Typography>

				<Box>
					<Link
						to="/map"
						style={{ textDecoration: "none", color: "inherit" }}
					>
						<IconButton color="inherit">
							<Typography variant="button">Map</Typography>
						</IconButton>
					</Link>
					<Link
						to="/report"
						style={{ textDecoration: "none", color: "inherit" }}
					>
						<IconButton color="inherit">
							<Typography variant="button">Reports</Typography>
						</IconButton>
					</Link>
				</Box>
				<Box>
					<IconButton color="inherit" onClick={toggleMode}>
						{mode === "dark" ? <Brightness7 /> : <Brightness4 />}
					</IconButton>
				</Box>
			</Toolbar>
		</AppBar >
	);
}
