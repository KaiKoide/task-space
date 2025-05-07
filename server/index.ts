import express from "express";
import cors from "cors";

const app = express();

// 基本的なミドルウェア
app.use(express.json());
app.use(cors());

// 簡単なルート
app.get("/", (req, res) => {
	res.send("Hello from Vercel!");
});

app.get("/api/test", (req, res) => {
	res.json({ message: "API is working!" });
});

// ローカル環境のみ
if (process.env.NODE_ENV !== "production") {
	const port = process.env.PORT || 3000;
	app.listen(port, () => console.log(`Server running on port ${port}`));
}

// Vercel用にエクスポート
export default app;
