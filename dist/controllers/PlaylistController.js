"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllPlaylists = exports.createPlaylist = void 0;
// src/controllers/PlaylistController.ts
const Playlist_entity_1 = require("../Entities/Playlist.entity");
const createPlaylist = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        yield playlist.save();
        return res.status(201).json(playlist);
    }
    catch (err) {
        return res.status(500).json({ message: 'Failed to create playlist', error: err });
    }
});
exports.createPlaylist = createPlaylist;
const getAllPlaylists = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const playlists = yield Playlist_entity_1.Playlist.find({ relations: ['videos'] });
        return res.json(playlists);
    }
    catch (err) {
        return res.status(500).json({ message: 'Error fetching playlists', error: err });
    }
});
exports.getAllPlaylists = getAllPlaylists;
