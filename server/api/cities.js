let express = require('express');
const Cities = require('../models/cities')

let router = express.Router()


router.get('/', (req, res, err) => {
    Cities.retrieveAll((err, cities) => {
        if (err) {
            return res.json(err)
        }
        return res.json(cities)
    });
});

router.post('/', (req, res, err) => {
    let city = req.body.city;
    Cities.insert(city, (err, result) => {
        if (err) {
            return res.json(err)
        }
        return res.json(result)
    });
});

module.exports = router;