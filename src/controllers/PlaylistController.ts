import { Playlist } from '../Entities/Playlist.entity';
import path from 'path';
import { uploadFileHelper } from '../Helpers/UploadFilehelper'; // adjust path

export const createPlaylist = async (req: any, res: any) => {
  try {
    const {
      title,
      description,
      progress,
      lessons,
      duration,
      difficulty,
      color,
      secondaryColor,
    } = req.body;

    let thumbnailUrl = '';
    if (req.files && req.files.thumbnail) {
      const fileName = await uploadFileHelper(
        req.files.thumbnail,
        path.join(__dirname, '../../uploads/playlists'),
        res
      );
      thumbnailUrl = `/uploads/playlists/${fileName}`;
    }

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

    return res.status(201).json({
      message: 'Playlist created successfully',
      playlist,
    });
  } catch (err) {
    console.error(err);
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
