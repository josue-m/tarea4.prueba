const { Router } = require('express');
const { GetCanciones, GetCanciones2, PostCanciones, PutCanciones, DeleteCanciones } = require('./CancionesControlador');
const mongoID = require('../mw/mw');

const router = Router();

router.get("/", GetCanciones);
router.post("/", PostCanciones);
router.get("/:id", mongoID, GetCanciones2);
router.put("/:id", mongoID, PutCanciones);
router.delete("/:id", mongoID, DeleteCanciones);

module.exports = router;