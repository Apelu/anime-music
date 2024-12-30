// serve react app
// import cors from "cors";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import axios from "axios";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// app.use(cors());
app.use(express.json());

app.use(express.static("../build"));

app.get("/api/animeDownload/subtitle", async (req, res) => {
    // Example: http://192.168.1.228:5000/api/animeDownload//subtitle?seriesFolderName=Tensei%20Kizoku,%20Kantei%20Skill%20de%20Nariagaru%202nd%20Season&episodeNumber=9
    // Return the result from fetching from http://192.168.1.228:5555/api/animeDownload//subtitle?seriesFolderName=Tensei%20Kizoku,%20Kantei%20Skill%20de%20Nariagaru%202nd%20Season&episodeNumber=9

    const seriesFolderName = req.query.seriesFolderName;
    const episodeNumber = req.query.episodeNumber;

    const url = `http://192.168.1.228:5555/api/animeDownload//subtitle?seriesFolderName=${seriesFolderName}&episodeNumber=${episodeNumber}`;

    try {
        // Fetch the file from the external endpoint
        const response = await axios({
            method: "get",
            url: url,
            responseType: "stream",
        });

        // Set the appropriate headers for the response
        res.setHeader("Content-Type", response.headers["content-type"]);
        // res.setHeader(
        //     "Content-Disposition",
        //     `attachment; filename=${getFileNameFromUrl(fileUrl)}`
        // );

        // Pipe the file stream to the response
        response.data.pipe(res);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error forwarding file");
    }
});

app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../build/index.html"));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
