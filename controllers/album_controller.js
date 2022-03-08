// Album controller

const debug = require('debug')('photoapi:album_controller');
const { matchedData, validationResult } = require('express-validator');
const models = require('../models');

// Get all resources
// GET /
const index = async (req, res) => {
    const albums = await models.Album.fetchAll();

    res.send({
        status: 'success',
        data: {
            albums
        }
    });
}

// Get a specific resource
// GET /:albumId
const show = async (req, res) => {
    const album = await new models.Album({ id: req.params.albumId })
        .fetch({ withRelated: ['photos', 'users'] });   // withrelated 'users' will show user info, remove it?

    res.send({
        status: 'success',
        data: {
            album,
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
        const album = await new models.Album(validData).save();
        debug("Created new album successfully: %O", album);

        res.send({
            status: 'success',
            data: {
                album,
            },
        });

    } catch (error) {
        res.status(500).send({
            status: 'error',
            message: 'Exception thrown in database when creating a new album.',
        });
        throw error;
    }
}


// Update a specific resource
// PUT /:albumId
const update = async (req, res) => {
    const albumId = req.params.albumId;

    // make sure album exists
    const album = await new models.Album({ id: albumId }).fetch({ require: false });
    if (!album) {
        debug("Album to update was not found. %o", { id: albumId });

        res.status(404).send({
            status: 'fail',
            data: 'Album Not Found',
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
        const updatedAlbum = await album.save(validData);
        debug("Updated album successfully: %O", updatedAlbum);

        res.send({
            status: 'success',
            data: {
                album,
            },
        });

    } catch (error) {
        res.status(500).send({
            status: 'error',
            message: 'Exception thrown in database when updating a new album.',
        });
        throw error;
    }
}


// Store a new resource to album
// POST /albums/:albumId/photos
const addPhoto = async (req, res) => {
    // check for any validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).send({ status: 'fail', data: errors.array() });
    }
  
    // get only the validated data from request
    const validData = matchedData(req);
  
    // fetch album and photos relation
    const album = await models.Album.fetchById(req.params.albumId, { withRelated: ['photos'] });
  
    // get the album's photos
    const photos = album.related('photos');
  
    // check if the photo is already in the album's list of photos
    const existingPhoto = photos.find(photo => photo.id == validData.photo.id);
  
    // if it already exists, bail
    if (existingPhoto) {
        return res.send({
            status: 'fail',
            data: 'The photo already exists.',
        });
    }

    try {
        const result = await album.photos().attach(validData.photo_id);
        debug("Added photo to album successfully: %O", result);

        res.send({
            status: 'success',
            data: null,
        });

    } catch (error) {
        res.status(500).send({
            status: 'error',
            message: 'Exception thrown in database when trying to add a photo to a album.',
        });
        throw error;
    }
}

module.exports = {
    index,
    show,
    store,
    update,
    addPhoto
};