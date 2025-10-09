import React, { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import './styleTicket.css';

function MyDropzone() {
    const [files, setFiles] = useState([]);

    const onDrop = useCallback((acceptedFiles) => {
        // Add unique id to each file for tracking
        const filesWithId = acceptedFiles.map(file => ({
            ...file,
            id: Math.random().toString(36).substr(2, 9)
        }));

        setFiles(prevFiles => [...prevFiles, ...filesWithId]);
    }, []);

    const removeFile = (fileId) => {
        setFiles(prevFiles => prevFiles.filter(file => file.id !== fileId));
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    const formatFileSize = (bytes) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    const checkFileName = (fileName) => {
        if (!fileName || fileName.lastIndexOf('.') === -1 || fileName.lastIndexOf('.') === 0) {
            return ''; // Or handle as an error/unknown extension
        }
        return fileName.split('.').pop();
    }

    const getFileIcon = (fileName) => {

        const extension = checkFileName(fileName);

        /*if (['pdf'].includes(extension)) return 'PDF';
        if (['doc', 'docx'].includes(extension)) return 'DOC';
        if (['xls', 'xlsx'].includes(extension)) return 'XLS';*/
        if (['jpg', 'jpeg', 'png', 'gif', 'svg'].includes(extension)) return 'IMG';
        /* if (['mp4', 'mov', 'avi', 'wmv'].includes(extension)) return 'VID';
         if (['mp3', 'wav', 'ogg'].includes(extension)) return 'AUD'; */

        return extension;
    };

    return (
        <div className="container">
            <header>
                <h1>React Dropzone File Upload</h1>
                <p className="subtitle">Drag & drop files or click to browse</p>
            </header>

            <div className="content">
                <div
                    {...getRootProps()}
                    className={`dropzone ${isDragActive ? 'active' : ''}`}
                >
                    <input {...getInputProps()} />
                    <p>{isDragActive ? 'Drop the files here...' : 'Drag & drop files here, or click to select files'}</p>
                    <span className="browse-btn">Browse files</span>
                </div>

                <div className="file-list">
                    <h3>Uploaded Files ({files.length})</h3>

                    {files.length === 0 ? (
                        <div className="empty-state">
                            <p>No files uploaded yet</p>
                            <p>Files you upload will appear here</p>
                        </div>
                    ) : (
                        files.map(file => (
                            <div key={file.id} className="file-item">
                                <div className="file-icon">
                                    {getFileIcon(file.name)}
                                </div>
                                <div className="file-info">
                                    <div className="file-name">{file.name}</div>
                                    <div className="file-size">{formatFileSize(file.size)}</div>
                                </div>
                                <button
                                    className="remove-btn"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        removeFile(file.id);
                                    }}
                                >
                                    Remove
                                </button>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default MyDropzone;