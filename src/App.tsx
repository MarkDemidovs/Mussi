import { useState } from "react";

export default function App() {
  const [songList, setSongList] = useState<File[]>([]);

  const handleImport = (files: FileList) => {
    setSongList(prev => [...prev, ...Array.from(files)]);
  };

  return (
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
          <div key={index}>
            <p>{song.name}</p>
            <audio controls src={URL.createObjectURL(song)} />
          </div>
        ))}
      </div>
    </div>
  );
}
