//Imports
const router = require('express').Router();
const FilmsController = require('../controllers/FilmsController');

//Endpoint-FilmController methods links
router.get('/', async(req, res) => {
    try {
        res.json(await FilmsController.clone())
    } catch(error) {
        return res.status(500).json({
            message: error.message
        })
    }
});
router.get('/all', async(req, res) => {
    try {
        res.json(await FilmsController.getAll())
    } catch(error) {
        return res.status(500).json({
            message: error.message
        })
    }
});
router.post('/', async(req, res) => {
    try {
        let title = req.body.title;
        let synopsis = req.body.synopsis;
        let adult = req.body.adult;
        let popularity = req.body.popularity;
        let image = req.body.image;
        let parArr = [title, synopsis, adult, popularity, image];
        res.json(await FilmsController.register(...parArr))
    } catch(error) {
        return res.status(500).json({
            message: error.message
        })
    }
});
router.delete('/', async(req, res) => {
    try {
        res.json(await FilmsController.deleteAll());
    
    } catch(error) {
        return res.status(500).json({
            message: error.message
        })
    }
})
router.get('/title', async(req, res) => {
    try {
        let search = req.query.arg;
        res.json(await FilmsController.APIgetByTitle(search))

    } catch(error) {
        return res.status(500).json({
            message: error.message
        })
    }
});
router.get('/toprated', async(req, res) => {
    try {
        res.json(await FilmsController.APItopRated())

    } catch(error) {
        return res.status(500).json({
            message: error.message
        })
    }
});
router.get('/amount', async(req, res) => {
    try {
        res.json(await FilmsController.getAmount())

    } catch(error) {
        return res.status(500).json({
            message: error.message
        })
    }
});
router.get('/custom', async(req, res) => {
    try {
        let arg = req.query.arg
        res.json(await FilmsController.searchByTerm(arg))

    } catch(error) {
        return res.status(500).json({
            message: error.message
        })
    }
});
router.get('/:id', async(req, res) => {
    try {
        let id = req.params.id
        res.json(await FilmsController.APIgetById(id))

    } catch(error) {
        return res.status(500).json({
            message: error.message
        })
    }
});

//Export
module.exports = router;