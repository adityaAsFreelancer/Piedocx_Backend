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
exports.addVideoToPlaylist = void 0;
const Video_entity_1 = require("../Entities/Video.entity");
const Playlist_entity_1 = require("../Entities/Playlist.entity");
const addVideoToPlaylist = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { playlistId, title, videoUrl } = req.body;
    try {
        const playlist = yield Playlist_entity_1.Playlist.findOneBy({ id: playlistId });
        if (!playlist)
            return res.status(404).json({ message: 'Playlist not found' });
        const video = Video_entity_1.Video.create({ title, videoUrl, playlist });
        yield video.save();
        return res.status(201).json(video);
    }
    catch (err) {
        return res.status(500).json({ message: 'Failed to add video', error: err });
    }
});
exports.addVideoToPlaylist = addVideoToPlaylist;
