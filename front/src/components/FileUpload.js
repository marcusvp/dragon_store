import React, { useEffect, useState } from "react";
import UploadService from "../services/file_upload_service";
import MessageBox from "./MessageBox";

export default function FileUpload() {
  const [selectedFiles, setSelectedFiles] = useState(undefined);
  const [currentFile, setCurrentFile] = useState(undefined);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("");
  const [fileInfos, setFileInfos] = useState([]);

  useEffect(() => {
    UploadService.getFiles().then((response) => {
      setFileInfos(response.data);
    });
  }, []);

  const selectFile = (event) => {
    setSelectedFiles(event.target.files);
  };

  const upload = () => {
    let currentFile = selectedFiles[0];

    setProgress(0);
    setCurrentFile(currentFile);

    UploadService.upload(currentFile, (event) => {
      setProgress(Math.round((100 * event.loaded) / event.total));
    })
      .then((response) => {
        setMessage(response.data.message);
        return UploadService.getFiles();
      })
      .then((files) => {
        setFileInfos(files.data);
      })
      .catch(() => {
        setProgress(0);
        setMessage("could not upload the file");
        setCurrentFile(undefined);
      });
    setSelectedFiles(undefined);
  };

  return (
    <div className="upload">
      <div>
        <label className="button">
          <input type="file" onChange={selectFile} />
        </label>

        <button className="button" disabled={!selectedFiles} onClick={upload}>
          upload
        </button>
      </div>

      {message && <MessageBox>{message}</MessageBox>}

      <ul>
        <h1>list of files</h1>
        {fileInfos &&
          fileInfos.map((file, index) => (
            <li key={index}>
              <a href={file.url}>{file.name}</a>
            </li>
          ))}
      </ul>
    </div>
  );
}
