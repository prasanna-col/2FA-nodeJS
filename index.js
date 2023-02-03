require('dotenv').config();

const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 4000;
const { Novu } = require("@novu/node");

const API_key = process.env.NOVU_APIKEY;
const TRIGGER_NAME = process.env.TRIGGER_NAME

const novu = new Novu(API_key); // nuvo API key 

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const users = [
	{
		id: 'e1mpz8ow',
		email: 'sourash@yopmail.com',
		password: 'Qwer@123',
		username: 'sourash',
		tel: '+91XXXXXXXX50'  // For free trial, use your phone number verified by twilio.
	}
];
let code;

const generateID = () => Math.random().toString(36).substring(2, 10);
const generateCode = () => Math.random().toString(36).substring(2, 12);

const sendNovuNotification = async (recipient, verificationCode) => {
	try {
		let response = await novu.trigger(TRIGGER_NAME, { // devmsg -- notification template - get it from nuvo
			to: {
				subscriberId: recipient,
				phone: recipient,
			},
			payload: {
				code: verificationCode,
			},
		});

		console.log("response:: ", response)
		// check message stage on Activity feed in novu dashboard
	} catch (err) {
		console.error("err ::", err);
	}
};

app.post("/api/login", (req, res) => {
	const { email, password } = req.body;
	let result = users.filter(
		(user) => user.email === email && user.password === password
	);

	if (result.length !== 1) {
		return res.json({
			error_message: "Incorrect credentials",
		});
	}
	code = generateCode();

	/* 
		👇🏻 Log the user's number and the code sent 
		to the console during development
	*/
	// console.log("Telephone Number", result[0].tel);
	console.log(`Generated code is ${code}`);

	//👇🏻 Send the SMS via Novu
	sendNovuNotification(result[0].tel, code);

	res.json({
		message: "Login successfully",
		data: {
			username: result[0].username,
		},
	});
});

app.post("/api/register", (req, res) => {
	const { email, password, tel, username } = req.body;
	let result = users.filter((user) => user.email === email || user.tel === tel);
	if (result.length === 0) {
		const newUser = { id: generateID(), email, password, username, tel };
		console.log("newUser", newUser)
		users.push(newUser);
		return res.json({
			message: "Account created successfully!",
		});
	}
	res.json({
		error_message: "User already exists",
	});
});

app.post("/api/verification", (req, res) => {
	if (code === req.body.code) {
		return res.json({ message: "You're verified successfully" });
	}
	res.json({
		error_message: "Incorrect credentials",
	});
});

app.listen(PORT, () => {
	console.log(`Server listening on ${PORT}`);
});
