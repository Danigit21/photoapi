// Photo Controller

const debug = require('debug')('photoapi:photo_controller');
const { matchedData, validationResult } = require('express-validator');
const models = require('../models');

// Get all resources
// Get /
const index = async (req, res) => {
    // get specific user with related photos
    const user = await models.User.fetchById(req.user.id, { withRelated: ['photos']});

    res.send({
        status: 'success',
        data: {
            photos: user.related('photos')
        }
    });
}
 

// Get a specific resource
// GET /:photoId
const show = async (req, res) => {
    // get specific user with related photos
    const user = await models.User.fetchById(req.user.id, { withRelated: ['photos']});

    // get related photos from user id and find the specific photo
    const photos = user.related('photos').find(photo => photo.id == req.params.photoId);

    if (!photos) {
        return res.status(404).send({
            status: 'fail',
            message: 'Photo could not be found',
        });
    };

    // get specific photo id and the related album for this photo
    const photoId = await models.Photo.fetchById(req.params.photoId, { withRelated: ['albums']});

    res.send({
        status: 'success',
        data: {
            photos: photoId
        }
    });
}
 

// Store a new resource
// POST /
const store = async (req, res) => {
    // check for validation errors
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).send({ status: 'fail', data: errors.array() });
    }

    // get only validated data
    const validData = matchedData(req);
    validData.user_id = req.user.id;

    try {
        const photo = await new models.Photo(validData).save();

        debug("New photo created: %O", photo);

        res.send({
            status: 'success',
            data: {
                photo
            }
        });

    } catch (error) {
        res.status(500).send({
            status: 'error',
            message: 'Exception thrown in database when trying create a new photo.',
        });

        throw error;
    }
}


// Update a specific resource
// PUT /:photoId
const update = async (req, res) => {
    // get specific user with related photos
    const user = await models.User.fetchById(req.user.id, { withRelated: ['photos']});

    // make specific user with related photos into a new const called "usersPhoto" and find the request album with id
    const usersPhoto = user.related('photos').find(photo => photo.id == req.params.photoId);
    
    // check if photo exists
    const photoId = await models.Photo.fetchById(req.params.photoId);

    if (!usersPhoto) {
        debug("The photo could not be found %o", { id: photoId });

        res.status(404).send({
            status: 'fail',
            data: 'Could not find the photo.'
        });

        return;
    }

    // check for validation errors
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        return res.status(422).send({ status: 'fail', data: errors.array() });
    }

    // get only validated data
    const validData = matchedData(req);
    validData.user_id = req.user.id;

    try {
        const updatedPhoto = await photo.save(validData);
        debug("Photo was updated %O", updatedPhoto);

        res.send({
            status: 'success',
            data: {
                photo
            }
        });

    } catch (error) {
        res.status(500).send({
            status: 'error',
            message: 'Exception thrown in database when trying to update a new photo.',
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