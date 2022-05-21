const isValidObjectId = require("mongoose").isValidObjectId;

const mongoID = (req, res, next) => 
{
    const { id } = req.params;
    if (!isValidObjectId(id)) 
    {
        return res.status(400).json({ mensaje: "Invalid ID" });
    }
    next();
}

module.exports = mongoID;