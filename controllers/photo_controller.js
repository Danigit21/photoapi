// Photo Controller

const debug = require('debug')('photoapi:photo_controller');
const models = require('../models');
const { matchedData, validationResult } = require('express-validator');

// Get all resources
// Get /
const index = async (req, res) => {
    const all_photos = await models.Photo.fetchAll();

    res.send({
        status: 'success',
        data: {
            photos: all_photos
        }
    });
}
 

// Get a specific resource
// GET /:photoId
const show = async (req, res) => {
    const photo = await new models.Photo({ id: req.params.photoId })
        .fetch({ withRelated: ['album', 'users'] });

    res.send({
        status: 'success',
        data: {
            photo
        }
    });
}
 

// Store a new resource
// POST /
const store = async (req, res) => {
    const data = {
        title: req.body.title,
        url: req.body.url,
        comment: req.body.comment
    };

    try {
        const photo = await new models.Photo(photo).save();
        debug("Created new photo successfully: %O", photo);

        res.send({
            status: 'success',
            data: {
                photo
            },
        });

    } catch (error) {
        res.status(500).send({
            status: 'error',
            message: 'Exception thrown in database when creating a new photo.',
        });
        throw error;
    }
}


// Update a specific resource
// POST /:photoId
const update = (req, res) => {
    res.status(405).send({
        status: 'fail',
        message: 'Method Not Allowed.',
    });
}
 
module.exports = {
    index,
    show,
    store,
    update
}