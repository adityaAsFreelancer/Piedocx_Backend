"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllPlaylists = exports.createPlaylist = void 0;
const Playlist_entity_1 = require("../Entities/Playlist.entity");
const path_1 = __importDefault(require("path"));
const UploadFilehelper_1 = require("../Helpers/UploadFilehelper"); // adjust path
const createPlaylist = async (req, res) => {
    try {
        const { title, description, progress, lessons, duration, difficulty, color, secondaryColor, } = req.body;
        let thumbnailUrl = '';
        if (req.files && req.files.thumbnail) {
            const fileName = await (0, UploadFilehelper_1.uploadFileHelper)(req.files.thumbnail, path_1.default.join(__dirname, '../../uploads/playlists'), res);
            thumbnailUrl = `/uploads/playlists/${fileName}`;
        }
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
        return res.status(201).json({
            message: 'Playlist created successfully',
            playlist,
        });
    }
    catch (err) {
        console.error(err);
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
