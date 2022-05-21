const Canciones = require("./CancionesModels");

const GetCanciones = async (req, res) => 
{
    try 
    {
        if (Object.keys(req.query).length > 0) 
        {
            const {artista, anio, desde, hasta} = req.query;
            if (artista) 
            {
                const cancion = await Canciones.find({ artista, activo: true });
                return res.status(200).json(cancion);
            }
            if (anio) 
            {
                let cancion = await Canciones.find({ anio, activo: true });
                if (cancion.length === 0) {
                    cancion = await Canciones.find({ anio: { $gt: anio }, activo: true });
                }
                return res.status(200).json(cancion);
            }

            if (desde && hasta) 
            {
                const cancion = await Canciones.find({ anio: { $gt: desde, $lt: hasta }, activo: true });
                return res.status(200).json(cancion);
            }
        }

        const cancion = await Canciones.find({ activo: true });
        return res.json(cancion);
    } catch (err) 
    {
        return res.status(500).send("Server timeout error");
    }
}

const GetCanciones2 = async (req, res) => 
{
    try {
        const { id } = req.params;

        const cancion = await Canciones.findById(id);
        return res.status(200).json(cancion);
    } catch (err) 
    {
        return res.status(500).send("Ocurrio un error en el servidor");
    }
}

const PostCanciones = async (req, res) => 
{
    try 
    {
        const { cancion, artista, album, anio, pais } = req.body;
        const newCancion = new Canciones({ cancion, artista, album, anio, pais });
        await newCancion.save();

        res.status(201).json(newCancion);
    } catch (err) 
    {
        return res.status(500).send("Ocurrio un error en el servidor");
    }
}

const PutCanciones = async (req, res) => 
{
    try 
    {
        const { id } = req.params;

        const { estado, ...data } = req.body;

        const cancion = await Canciones.findByIdAndUpdate(id, data, { new: true });
        return res.status(200).json(cancion);
    } catch (err) 
    {
        return res.status(500).send("Ocurrio un error en el servidor");
    }
}

const DeleteCanciones = async (req, res) => 
{
    try 
    {
        const { id } = req.params;

        const cancion = await Canciones.findByIdAndUpdate(id, { activo: false }, { new: true });
        return res.status(200).json(cancion);
    } catch (err) 
    {
        return res.status(500).send("Ocurrio un error en el servidor");
    }
}

module.exports = 
{
    GetCanciones, GetCanciones2, PostCanciones, PutCanciones, DeleteCanciones
}