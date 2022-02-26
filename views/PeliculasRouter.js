//Importo la clase express y la guardo en la variable express (siempre igual)
const express = require('express');
//ejecuto el método Router() de express (siempre igual)
const router = express.Router();
//Importo el fichero UsuariosController y lo guardo en la variable UsuariosController. Luego habrá que crearlo.
const PeliculasController = require('../controllers/PeliculasController');

//Enlazo método(CRUD), endpoint y función. (Explicación en UsuariosRouter)
//http://localhost:3000/peliculas
//Copia 10k películas al azar de TMDB cogiendo los campos necesarios para nuestra BBDD
router.get('/', PeliculasController.clona);

//http://localhost:3000/peliculas
//Registrar una película nueva
router.post('/', PeliculasController.registra);

//http://localhost:3000/peliculas (DELETE)
//Borra todas las pelculas de nuestra BBDD
router.delete('/', PeliculasController.borraTodas)

//http://localhost:3000/peliculas/titulo?criterio=tituloPelicula
//Traer peliculas de TMDB por titulo usando query
router.get('/titulo', PeliculasController.APItraePorTitulo);




//http://localhost:3000/peliculas
//Coge las películas más votadas de TMDB (5 primeras páginas)
router.get('/toprated', PeliculasController.APItopRated);


//http://localhost:3000/peliculas/cantidad
//Muestra el número total de películas que hay registradas en nuestra BBDD
router.get('/cantidad', PeliculasController.muestraCantidad);


//http://localhost:3000/peliculas/idPeliculaEnTMDB GET
//Traer datos de una pelicula buscándola por su id de TMDB usando params
//OJO! Si este endpoint lo pusiésemos arriba por ejemplo de el de buscar por titulo, JS al leer la URL cree que 'titulo' es un id y da fallo.
//Es por ello que al usar params hay que tener cuidado de no ponerlos en endpoints comunes o ponerlos al final del todo del xxxRouter
router.get('/:id', PeliculasController.APItraePorId);

//Exporto router para que pueda ser importado desde otros ficheros una vez ha ejecutado la lógica de éste(siempre igual)
module.exports = router;