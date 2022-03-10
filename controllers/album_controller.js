// Album controller

const debug = require('debug')('photoapi:album_controller');
const { matchedData, validationResult } = require('express-validator');
const models = require('../models');


// Get all resources
// GET /
const index = async (req, res) => {
    // get specific user with related albums
    const user = await models.User.fetchById(req.user.id, { withRelated: ['albums']});
 
    res.status(200).send({
        status: 'success',
        data: {
            albums: user.related('albums')
        }
    });
}


// Get a specific resource
// GET /:albumId
const show = async (req, res) => {
    // get specific user with related albums
    const user = await models.User.fetchById(req.user.id, { withRelated: ['albums']});
    
    // get related albums from user id and find the specific album
    const album = user.related('albums').find(album => album.id == req.params.albumId);
    
    if (!album) {
        return res.status(404).send({
            status: 'fail',
            message: 'Could not find the album.'
        });
    };

    // get specific album id and the related photos for this album
    const albumId = await models.Album.fetchById(req.params.albumId, { withRelated: ['photos']});

    res.send({
        status: 'success',
        data: {
            albumId
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
        const album = await new models.Album(validData).save();

        debug("New album created: %O", album);

        res.send({
            status: 'success',
            data: {
                album
            }
        });

    } catch (error) {
        res.status(500).send({
            status: 'error',
            message: 'Exception thrown in database when trying to create a new album.',
        });

        throw error;
    }
}


// Update a specific resource
// PUT /:albumId
const update = async (req, res) => {
    // get specific user with related albums
    const user = await models.User.fetchById(req.user.id, { withRelated: ['albums']});

    // make specific user with related albums into a new const called "usersAlbum" and find the request album with id
    const usersAlbum = user.related('albums').find(album => album.id == req.params.albumId);;

    // if the album doesn't exist
    if (!usersAlbum) {
        res.status(404).send({
            status: 'fail',
            message: 'Could not find the album.'
        });

        return;
    };

    // check for validation errors
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).send({ status: 'fail', data: errors.array() });
    }

    // get only validated data
    const validData = matchedData(req);
    validData.user_id = req.user.id;

    try {
        const updatedAlbum = await album.save(validData);
        debug("Album was updated %O", updatedAlbum);

        res.send({
            status: 'success',
            data: {
                album
            }
        });

    } catch (error) {
        res.status(500).send({
            status: 'error',
            message: 'Exception thrown in database when trying to update a new album.',
        });

        throw error;
    }
}


// Store a new resource to album
// POST /albums/:albumId/photos
const attachPhoto = async (req, res) => {
    // check for validation errors
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).send({ status: 'fail', data: errors.array() });
    }

    // get only validated data
    const validData = matchedData(req);
    validData.user_id = req.user.id;

    // get specific user with related albums and photos
    const user = await models.User.fetchById(req.user.id, { withRelated: ['albums', 'photos']});
    // get specific album with related photos
    const album = await models.Album.fetchById(req.params.albumId, { withRelated: ['photos']});

    // make specific user with related albums into a new const called "usersAlbum"
    // find the requested album with id
    const usersAlbum = user.related('albums').find(album => album.id == req.params.albumId);
    // find the requested photo with id
    const usersPhoto = user.related('photos').find(photo => photo.id == validData.photo_id);

    // check if photo exists
    const existingPhoto = album.related('photos').find(photo => photo.id == validData.photo_id);

    if (existingPhoto) {
        return res.send({
            status: 'fail',
            data: "Photo already exists."
        });
    }

    if (!usersAlbum) {
        res.status(403).send({
            status: 'fail',
            data: 'Couldnt find album.'
        });

        return;
    }

    if (!usersPhoto) {
        res.status(403).send({
            status: 'fail',
            data: 'Couldnt find photo.'
        });

        return;
    }
  
	try {
        await album.photos().attach(validData.photo_id);

		res.send({
			status: 'success',
			data: null,
    });

	} catch (error) {
		res.status(500).send({
			status: 'error',
			message: 'Exception thrown in database when attaching a photo to a album.',
		});
        
		throw error;
	}
}

module.exports = {
    index,
    show,
    store,
    update,
    attachPhoto
};