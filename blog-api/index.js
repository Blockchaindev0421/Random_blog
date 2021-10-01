const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const categoryRoute = require("./routes/categories");
const multer = require("multer");

dotenv.config();
app.use(express.json());

mongoose
// this information is secured in my .env file 
	.connect(process.env.MONGODB_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(console.log("Connected to MongoDB"))
	.catch((err) => console.log(err));

	const storage = multer.diskStorage({
		destination:(req, file, callback) => {
			callback(null, "images");
		}, filename: (req, file, callback) => {
			callback(null, req.body.name);
		}
	});

	const upload = multer({storage:storage});
	app.post("/api/upload", upload.single("file"), (req,res) => {
		res.status(200).json("File successfully uploaded ...");
	});

	app.use("/api/auth", authRoute);
	app.use("/api/users", userRoute);
	app.use("/api/posts", postRoute);
	 app.use("/api/categories", categoryRoute);

app.listen("2000", () => {
	console.log("Backend is running!!");
});