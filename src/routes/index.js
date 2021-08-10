const { Router } = require("express");
const router = Router();

router.get("/test", (req, res) => {
  const data = {
    name: "prueba",
    website: "prueba.com",
  };
  res.json(data);
});

module.exports = router;
