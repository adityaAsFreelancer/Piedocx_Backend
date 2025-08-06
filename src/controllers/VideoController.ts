// src/controllers/VideoController.ts
import { Video } from '../Entities/Video.entity';
import { Playlist } from '../Entities/Playlist.entity';

export const addVideoToPlaylist = async (req: any, res: any) => {
  const { playlistId, title, url, duration } = req.body;

  try {
    const playlist = await Playlist.findOneBy({ id: playlistId });
    if (!playlist) return res.status(404).json({ message: 'Playlist not found' });

    const video = Video.create({ title, url, playlist });
    await video.save();

    return res.status(201).json(video);
  } catch (err) {
    return res.status(500).json({ message: 'Failed to add video', error: err });
  }
};
