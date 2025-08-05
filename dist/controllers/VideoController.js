"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addVideoToPlaylist = void 0;
const Video_entity_1 = require("../Entities/Video.entity");
const Playlist_entity_1 = require("../Entities/Playlist.entity");
const addVideoToPlaylist = async (req, res) => {
    const { playlistId, title, videoUrl } = req.body;
    try {
        const playlist = await Playlist_entity_1.Playlist.findOneBy({ id: playlistId });
        if (!playlist)
            return res.status(404).json({ message: 'Playlist not found' });
        const video = Video_entity_1.Video.create({ title, videoUrl, playlist });
        await video.save();
        return res.status(201).json(video);
    }
    catch (err) {
        return res.status(500).json({ message: 'Failed to add video', error: err });
    }
};
exports.addVideoToPlaylist = addVideoToPlaylist;
