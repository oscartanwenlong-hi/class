const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const CLIENT_ID = "Ov23liMhd6CDcvqqUn4B";   // 替换为你的 Client ID
const CLIENT_SECRET = "784fc98f59bfc04a8e6da0c3b73754f3c7389869";  // 替换为你的 Client Secret

app.post("/get-token", async (req, res) => {
    const { code } = req.body;
    
    if (!code) {
        return res.status(400).json({ error: "Code is required" });
    }

    try {
        const response = await axios.post("https://github.com/login/oauth/access_token", {
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
            code: code
        }, {
            headers: { Accept: "application/json" }
        });

        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "GitHub OAuth 认证失败", details: error.message });
    }
});

// 监听端口
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
