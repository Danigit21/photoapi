// Photo Controller

const debug = require('debug')('photoapi:photo_controller');
const { matchedData, validationResult } = require('express-validator');
const models = require('../models');

// Get all resources
// Get /
const index = async (req, res) => {
    const photos = await models.Photo.fetchAll();

    res.send({
        status: 'success',
        data: {
            photos,
        }
    });
}
 

// Get a specific resource
// GET /:photoId
const show = async (req, res) => {
    const photo = await new models.Photo({ id: req.params.photoId })
        .fetch();   // remove withrelated to remove unnecessary info "{ withRelated: ['albums', 'users'] }"

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
    // check for any validation errors
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).send({ status: 'fail', data: errors.array() });
    }

    // get only the validated data from the request
    const validData = matchedData(req);

    try {
        const photo = await new models.Photo(validData).save();
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
// PUT /:photoId
const update = async (req, res) => {
    const photoId = req.params.photoId;

    // check if album with certain ID exists
    const photo = await new models.Photo({ id: photoId }).fetch({ require: false });

    if (!photo) {
        debug("The photo to update could not be found. %o", { id: photoId });

        res.status(404).send({
        status: 'fail',
        data: 'Photo not found',
        });

        return;
    }

    // check for any validation errors
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        return res.status(422).send({ status: 'fail', data: errors.array() });
    }

    // get only the validated data from the request
    const validData = matchedData(req);

    try {
        const updatedPhoto = await photo.save(validData);
        debug("Updated photo successfully: %O", updatedPhoto);

        res.send({
        status: 'success',
        data: {
            photo
        }
        });

    } catch (error) {
        res.status(500).send({
        status: 'error',
        message: 'Exception thrown in database when updating photo.',
        });
        throw error;
    }
}
 
module.exports = {
    index,
    show,
    store,
    update
};