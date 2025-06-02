const express = require("express");
const admin = require("./firebaseAdmin");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

app.post("/register", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await admin.auth().createUser({
      email,
      password,
      disabled: true,
    });

    res
      .status(201)
      .json({
        uid: user.uid,
        message:
          "Registado Efetuado com Sucesso! Aguarde aprovação do administrador",
      });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
