import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import Login from './login'; // Adjust the import path if needed
import Verification from './verification'; // Adjust the import path if needed
import Credentials from './credentials'; // Adjust the import path if needed
import axios from 'axios';

import { saveUserData, getUserData } from '../../components/utilities/cache';

const Stack = createStackNavigator();

// Just styling for navigating
const customTransitionSpec = {
	open: { animation: 'timing', config: { duration: 0 } },
	close: { animation: 'timing', config: { duration: 0 } },
};

const customCardStyleInterpolator = ({ current, next, layouts }) => {
	const translateX = current.progress.interpolate({
		inputRange: [0, 1],
		outputRange: [layouts.screen.width, 0],
	});
	const opacity = current.progress.interpolate({
		inputRange: [0, 1],
		outputRange: [0, 1],
	});

	return {
		cardStyle: {
			transform: [{ translateX }],
			opacity,
		},
	};
};

const LoginStack = () => {
	const navigation = useNavigation();

	const [exists, setExists] = useState(false);
	const [email, setEmail] = useState(null);
	const [userData, setUserData] = useState(null);
	const [page, setPage] = useState("email");
	const [userId, setId] = useState(null);

	useEffect(() => {
		// Check if user has stored credentials
		const checkCache = async () => {
			storedId = await getUserData("clientId");
			storedRefresh = await getUserData("refresh")
			if (storedId && storedRefresh) {
				navigation.navigate('(tabs)');
			}
		}

		checkCache();
	}, []);

	const handleEmailSubmit = async (passEmail) => {
		setEmail(passEmail);
		console.log(passEmail);
		const sendUrl = process.env.EXPO_PUBLIC_API_URL + "/user/email";
		// Send get request for code to verify
		try {
			const response = await axios.post(sendUrl, {"email" : passEmail})
			console.log(response.data.id)
			setId(response.data.id)
			setExists(response.data.exists)
			await saveUserData("clientId", response.data.id)
		} catch (error) {
			console.error("Failed to submit email", error)
		}

		setPage("verify");
	}
	
	const onSubmitCode = async (code) => {
		const sendId = encodeURIComponent(userId);
		const sendUrl = process.env.EXPO_PUBLIC_API_URL + `/user/getRefresh?client_id=${sendId}&code=${code}`;
		// TODO: Check if email exists, if so send the user straight to ride's page
		//		 Else, bring the user to credentials page

		try {
			const response = await axios.get(sendUrl)
			await saveUserData("token", response.data.accessToken);
			await saveUserData("expiry", response.data.expiry);
			await saveUserData("refresh", response.data.refreshToken);
			console.log("cached tokens", response.data);

			// Check if existing email
			if (exists) {
				console.log("Exists: " + exists)
				navigation.navigate("(tabs)")
				setPage("email")
			} else {
				setPage("credentials")
			}
			
		}
		catch (error) {
			console.error("error fetching token: ", error);
		}

	}
	const handleUserCredentials = async (creds) => {
		setUserData(creds);
		console.log("creds: ", creds);

		const client_id = await getUserData("clientId");

		const sendData = {
			name: creds.name,
			school: creds.school,
			bio: creds.bio,
			client_id: client_id
		};

		console.log("send data: ", sendData);

		const sendUrl = process.env.EXPO_PUBLIC_API_URL + "/user/editProfile";
		axios.post(sendUrl, sendData)
			.then(response => {
				navigation.navigate('(tabs)');
			})
			.catch(error => {
				alert("error creating user");
				console.error("error creating user: ", error);
			});
		
		// Reset page back to email just incase user wants to log out
		setPage("email")
	}


	const onResendCode = () => {
		console.log("Resend code requested");
	}


	return (

		<Stack.Navigator
			screenOptions={{
				headerShown: false,
				transitionSpec: customTransitionSpec,
				cardStyleInterpolator: customCardStyleInterpolator,
			}}
		>
			{(page === "email") && (
				<Stack.Screen name="Login">
					{(props) => <Login {...props} lastEmail={email} passEmail={(email) => handleEmailSubmit(email)} />}
				</Stack.Screen>
			)}

			{(page === "verify") && (
				<Stack.Screen name="Verification">
					{(props) => <Verification {...props}
						onBackPress={() => setPage("email")}
						onResendCode={onResendCode}
						onSubmitCode={(code) => { onSubmitCode(code) }}
					/>}
				</Stack.Screen>
			)}

			{(page === "credentials") && (
				<Stack.Screen name="Credentials">
					{(props) => <Credentials {...props}
						lastCreds={userData}
						onBackPress={() => setPage("verify")}
						setUserCredentials={(credentials) => handleUserCredentials(credentials)}

					/>}
				</Stack.Screen>
			)}

		</Stack.Navigator>
	);
};

export default LoginStack;
