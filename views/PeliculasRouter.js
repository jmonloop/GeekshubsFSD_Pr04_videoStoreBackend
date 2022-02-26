//Importo la clase express y la guardo en la variable express (siempre igual)
const router = require('express').Router();
//Importo el fichero UsuariosController y lo guardo en la variable UsuariosController. Luego habrá que crearlo.
const PeliculasController = require('../controllers/PeliculasController');

//Enlazo método(CRUD), endpoint y función. (Explicación en UsuariosRouter)
//http://localhost:3000/peliculas
// Copia 500 películas al azar de TMDB adaptando los campos necesarios para nuestra BBDD
router.get('/', async(req, res) => {
    try {
        res.json(await PeliculasController.clona())
    } catch(error) {
        return res.status(500).json({
            message: error.message
        })
    }
});

//http://localhost:3000/peliculas
//Registrar una película nueva
router.post('/', async(req, res) => {
    try {
        //Capturo las variables que llegan por el json de body
        let title = req.body.title;
        let synopsis = req.body.synopsis;
        let adult = req.body.adult;
        let popularity = req.body.popularity;
        let image = req.body.image;

        //Las guardo en un array
        let parArr = [title, synopsis, adult, popularity, image];

        //Las meto como parámetros usando spread
        res.json(await PeliculasController.registra(...parArr))
    } catch(error) {
        return res.status(500).json({
            message: error.message
        })
    }
});

//http://localhost:3000/peliculas (DELETE)
//Borra todas las pelculas de nuestra BBDD
router.delete('/', async(req, res) => {
    try {
        res.json(await PeliculasController.borraTodas());
    
    } catch(error) {
        return res.status(500).json({
            message: error.message
        })
    }
})

//http://localhost:3000/peliculas/titulo?criterio=tituloPelicula
//Traer peliculas de TMDB por titulo usando query
router.get('/titulo', async(req, res) => {
    try {
        //En la variable busqueda guardamos lo que llega por query, es decir:
        //http://localhost:3000/peliculas/titulo?criterio=TITULO
        let busqueda = req.query.criterio;
        res.json(await PeliculasController.APItraePorTitulo(busqueda))

    } catch(error) {
        return res.status(500).json({
            message: error.message
        })
    }
});




//http://localhost:3000/peliculas
//Coge las películas más votadas de TMDB (5 primeras páginas)
// router.get('/toprated', PeliculasController.APItopRated);


//http://localhost:3000/peliculas/cantidad
//Muestra el número total de películas que hay registradas en nuestra BBDD
// router.get('/cantidad', PeliculasController.muestraCantidad);


//http://localhost:3000/peliculas/idPeliculaEnTMDB GET
//Traer datos de una pelicula buscándola por su id de TMDB usando params
//OJO! Si este endpoint lo pusiésemos arriba por ejemplo de el de buscar por titulo, JS al leer la URL cree que 'titulo' es un id y da fallo.
//Es por ello que al usar params hay que tener cuidado de no ponerlos en endpoints comunes o ponerlos al final del todo del xxxRouter
// router.get('/:id', PeliculasController.APItraePorId);

//Exporto router para que pueda ser importado desde otros ficheros una vez ha ejecutado la lógica de éste(siempre igual)
module.exports = router;