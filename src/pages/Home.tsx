import MapPage from "../components/MapPage";
import PageLayout from "../components/PageLayout";
import WelcomeCard from "../components/WelcomeCard";
import {
	Box
} from "@mui/material";

export default function Home() {
	return (
		<PageLayout>
			<Box>
				<WelcomeCard />
				<MapPage />
			</Box>
		</PageLayout>
	);
}
