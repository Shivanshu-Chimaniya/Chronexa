import {createContext, useContext, useState, useEffect} from "react";
import {initializeApp} from "firebase/app";
import {
	getAuth,
	onAuthStateChanged,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut as firebaseSignOut,
} from "firebase/auth";

import {
	getFirestore,
	collection,
	addDoc,
	getDocs,
	getDoc,
	doc,
	query,
	where,
} from "firebase/firestore";
import {getStorage, ref, uploadBytes, getDownloadURL} from "firebase/storage";
const apiKey = import.meta.env.VITE_FIREBASE_API_KEY;
const authDomain = import.meta.env.VITE_FIREBASE_AUTH_DOMAIN;
const projectId = import.meta.env.VITE_FIREBASE_PROJECT_ID;
const storageBucket = import.meta.env.VITE_STORAGE_BUCKET;
const messagingSenderId = import.meta.env.VITE_MESSAGING_SENDER_ID;
const appId = import.meta.env.VITE_APP_ID;
const databaseURL = import.meta.env.VITE_DATABASE_URL;

const firebaseConfig = {
	apiKey: apiKey,
	authDomain: authDomain,
	projectId: projectId,
	storageBucket: storageBucket,
	messagingSenderId: messagingSenderId,
	appId: appId,
	databaseURL: databaseURL,
};

const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const firebaseStorage = getStorage(firebaseApp);
const firebaseFirestore = getFirestore(firebaseApp);

const firebaseContext = createContext(null);

export const FirebaseProvider = (props) => {
	const [user, setUser] = useState(null);

	useEffect(() => {
		onAuthStateChanged(firebaseAuth, (user) => {
			if (user) setUser(user);
			else setUser(null);
		});
	}, []);

	// user related functions
	const getUser = () => {
		return firebaseAuth.currentUser;
	};

	const registerUserWithEmailAndPassword = async (email, pass) => {
		let res = await createUserWithEmailAndPassword(
			firebaseAuth,
			email,
			pass
		);
		setUser(getUser());
		alert("signed in");
		return res;
	};
	const signinUserWithEmailAndPassword = async (email, pass) => {
		let res = await signInWithEmailAndPassword(firebaseAuth, email, pass);
		setUser(getUser());
		alert("signed in");
		return res;
	};
	const signOut = async () => {
		setUser(null);
		let res = await firebaseSignOut(firebaseAuth);
		alert("signed out");
		return res;
	};

	// capsule related functions
	const addCapsule = async (title, openDate, content, coverPic) => {
		const imageRef = ref(
			firebaseStorage,
			`uploads/images/${Date.now()}-${coverPic.name}`
		);
		const imageUploadResult = await uploadBytes(imageRef, coverPic);

		const contentUploadResult = await addDoc(
			collection(firebaseFirestore, "capsuleContent"),
			{
				openDate,
				content,
			}
		);

		return await addDoc(collection(firebaseFirestore, "capsule"), {
			title,
			openDate,
			coverPic: imageUploadResult.ref.fullPath,
			content: contentUploadResult.id,
			userID: user.uid,
			userEmail: user.email,
			displayName: user.displayName,
			photoURL: user.photoURL,
		});
	};

	const listAllCapsules = async () => {
		const querySnapshot = await getDocs(
			collection(firebaseFirestore, "capsule")
		);
		return querySnapshot;
	};

	const getCapsuleById = async (id) => {
		const docRef = doc(firebaseFirestore, "capsule", id);
		const result = await getDoc(docRef);
		return result;
	};

	const getImageURL = async (path) => {
		if (!path) return;
		let url = await getDownloadURL(ref(firebaseStorage, path));
		return url;
	};
	const getCapsuleContent = async (id) => {
		const docRef = doc(firebaseFirestore, "capsuleContent", id);
		const result = await getDoc(docRef);
		return result;
	};
	return (
		<firebaseContext.Provider
			value={{
				firebaseAuth,
				getUser,
				user,
				registerUserWithEmailAndPassword,
				signinUserWithEmailAndPassword,
				signOut,
				addCapsule,
				listAllCapsules,
				getCapsuleById,
				getImageURL,
				getCapsuleContent,
			}}>
			{props.children}
		</firebaseContext.Provider>
	);
};

export const useFirebase = () => useContext(firebaseContext);
