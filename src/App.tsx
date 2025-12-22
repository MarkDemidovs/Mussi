import { useEffect, useState } from "react";
import { openDB } from "idb";
import Song from "./components/Song";
import PlayBar from "./components/PlayBar";

const DB_NAME = "local-music";
const STORE_NAME = "songs";

export default function App() {
  const [songList, setSongList] = useState<{ name: string; file: File }[]>([]);
  const [currentSong, setCurrentSong] = useState("");

  useEffect(() => {
    (async () => {
      const db = await openDB(DB_NAME, 1, {
        upgrade(db) {
          db.createObjectStore(STORE_NAME, { keyPath: "name" });
        },
      });
      const allSongs = await db.getAll(STORE_NAME);
      setSongList(allSongs.map(s => ({ name: s.name, file: s.file })));
    })();
  }, []);

  const handleImport = async (files: FileList) => {
    const db = await openDB(DB_NAME, 1);
    const fileArray = Array.from(files);

    for (const file of fileArray) {
      await db.put(STORE_NAME, { name: file.name, file });
    }

    setSongList(prev => [...prev, ...fileArray.map(f => ({ name: f.name, file: f }))]);
  };

  return (
    <>
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const files = (e.target as HTMLFormElement).audioInput.files;
            if (files) handleImport(files);
          }}
        >
          <label htmlFor="audioInput">Select MP3, OGG, or WAV files:</label>
          <input type="file" id="audioInput" name="audioInput" accept="audio/*" multiple />
          <button type="submit">Import</button>
        </form>

        <div>
          {songList.map((song, index) => (
            <div key={index} id="audioFile">
              <Song
                label={song.name.slice(0, -4)}
                audio={URL.createObjectURL(song.file)}
                onPlay={(name: string) => setCurrentSong(name)}
              />

            </div>
          ))}
        </div>
      </div>
      <PlayBar songName={currentSong} />
    </>
  );
}
