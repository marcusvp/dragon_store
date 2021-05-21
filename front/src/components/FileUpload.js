import React, { useCallback, useEffect, useState } from "react";
import UploadService from "../services/file_upload_service";
import MessageBox from "./MessageBox";

export default function FileUpload(props) {
  const [selectedFiles, setSelectedFiles] = useState(undefined);
  const [message, setMessage] = useState("");
  const { setImage, shouldUpload, setshouldUpload } = props;

  const upload = useCallback(() => {
    let currentFile = selectedFiles[0];

    UploadService.upload(currentFile, (event) => {})
      .then((response) => {
        setMessage(response.data.message);
        setImage(response.data);
        return UploadService.getFiles();
      })
      .then((files) => {
        console.log(files);
      })
      .catch(() => {
        setMessage("could not upload the file");
      });
    setSelectedFiles(undefined);
    setshouldUpload(false);
  });

  useEffect(() => {
    console.log(selectedFiles);
    if (shouldUpload && selectedFiles) {
      upload();
    }
  }, [selectedFiles, shouldUpload, upload]);

  const selectFile = (event) => {
    setSelectedFiles(event.target.files);
    setImage(event.target.files[0].name);
  };

  return (
    <div className="upload">
      <div>
        <label className="button">
          <input type="file" onChange={selectFile} />
        </label>
        {message && <MessageBox>{message}</MessageBox>}
      </div>
    </div>
  );
}
