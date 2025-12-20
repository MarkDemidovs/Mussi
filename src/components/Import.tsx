type ImportProps = {
    onImport: (files: FileList) => void;
};

export default function Import({ onImport }: ImportProps) {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const files = (e.target as HTMLFormElement).audioInput.files;
        if (files && files.length) {
            onImport(files);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="audioInput">Please submit MP3, OGG, or WAV files.</label>
            <input type="file" name="audioInput" id="audioInput" accept="audio/*" multiple />
            <br />
            <button type="submit">Import</button>
        </form>
    );
}
