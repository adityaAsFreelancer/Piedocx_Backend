"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllPlaylists = exports.createPlaylist = void 0;
// src/controllers/PlaylistController.ts
const Playlist_entity_1 = require("../Entities/Playlist.entity");
const createPlaylist = async (req, res) => {
    const { title, description, thumbnailUrl, progress, lessons, duration, difficulty, color, secondaryColor, } = req.body;
    try {
        const playlist = Playlist_entity_1.Playlist.create({
            title,
            description,
            thumbnailUrl,
            progress,
            lessons,
            duration,
            difficulty,
            color,
            secondaryColor,
        });
        await playlist.save();
        return res.status(201).json(playlist);
    }
    catch (err) {
        return res.status(500).json({ message: 'Failed to create playlist', error: err });
    }
};
exports.createPlaylist = createPlaylist;
const getAllPlaylists = async (_req, res) => {
    try {
        const playlists = await Playlist_entity_1.Playlist.find({ relations: ['videos'] });
        return res.json(playlists);
    }
    catch (err) {
        return res.status(500).json({ message: 'Error fetching playlists', error: err });
    }
};
exports.getAllPlaylists = getAllPlaylists;
