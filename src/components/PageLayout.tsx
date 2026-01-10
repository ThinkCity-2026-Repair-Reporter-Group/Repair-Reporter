import Header from "./Header";
import {
	Box
} from "@mui/material";

export default function PageLayout({ children }: { children: React.ReactNode }) {
	return <div>
		<Header />
		<Box sx={{ padding: '0 32px', marginTop: '32px' }}>
			{children}
		</Box>
	</div>;
}