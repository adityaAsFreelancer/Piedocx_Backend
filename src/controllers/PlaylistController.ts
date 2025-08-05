// src/controllers/PlaylistController.ts
import { Playlist } from '../Entities/Playlist.entity';

export const createPlaylist = async (req: any, res: any) => {
  const {
    title,
    description,
    thumbnailUrl,
    progress,
    lessons,
    duration,
    difficulty,
    color,
    secondaryColor,
  } = req.body;

  try {
    const playlist = Playlist.create({
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
  } catch (err) {
    return res.status(500).json({ message: 'Failed to create playlist', error: err });
  }
};

export const getAllPlaylists = async (_req: any, res: any) => {
  try {
    const playlists = await Playlist.find({ relations: ['videos'] });
    return res.json(playlists);
  } catch (err) {
    return res.status(500).json({ message: 'Error fetching playlists', error: err });
  }
};
