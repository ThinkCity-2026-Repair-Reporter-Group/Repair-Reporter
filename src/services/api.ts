// api.ts
import { initializeApp, getApps, type FirebaseApp } from "firebase/app";
import {
	getFirestore,
	collection,
	addDoc,
	getDocs,
	query,
	orderBy,
} from "firebase/firestore";
import {
	getStorage,
	ref,
	uploadBytesResumable,
	getDownloadURL,
} from "firebase/storage";

// 1️⃣ Firebase config from env
const firebaseConfig = {
	apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
	authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
	projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
	storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
	appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// 2️⃣ Initialize Firebase only once
let app: FirebaseApp;
if (!getApps().length) {
	app = initializeApp(firebaseConfig);
} else {
	app = getApps()[0];
}

// 3️⃣ Get Firestore and Storage instances
const db = getFirestore(app);
const storage = getStorage(app);

// ------------------------
// 4️⃣ Firestore helper functions
// ------------------------

export interface Report {
	id?: string;
	type: string;
	description: string;
	lat: number;
	lng: number;
	imageUrl?: string;
	createdAt?: Date;
}

// Create a report
export async function createReport(report: Report) {
	const docRef = await addDoc(collection(db, "reports"), {
		...report,
		createdAt: new Date(),
	});
	return docRef.id;
}

// Get all reports (ordered by newest)
export async function getReports(): Promise<Report[]> {
	const q = query(collection(db, "reports"), orderBy("createdAt", "desc"));
	const snapshot = await getDocs(q);
	const reports: Report[] = [];
	snapshot.forEach((doc) => {
		reports.push({ id: doc.id, ...(doc.data() as Report) });
	});
	return reports;
}

// Upload an image and get its URL
export async function uploadImage(file: File, path = "images"): Promise<string> {
	const storageRef = ref(storage, `${path}/${Date.now()}_${file.name}`);
	const uploadTask = uploadBytesResumable(storageRef, file);

	return new Promise((resolve, reject) => {
		uploadTask.on(
			"state_changed",
			(snapshot) => {
				// optional: progress monitoring
				// const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
			},
			(error) => reject(error),
			async () => {
				const url = await getDownloadURL(uploadTask.snapshot.ref);
				resolve(url);
			}
		);
	});
}
