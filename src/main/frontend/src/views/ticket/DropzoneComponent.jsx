import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import './styleTicket.css';
import { Typography } from '@mui/material';

const baseStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#eeeeee',
    borderStyle: 'dashed',
    backgroundColor: '#fafafa',
    color: '#bdbdbd',
    transition: 'border .3s ease-in-out'
};

const activeStyle = {
    borderColor: '#2196f3'
};

const acceptStyle = {
    borderColor: '#00e676'
};

const rejectStyle = {
    borderColor: '#ff1744'
};

function DropzoneComponent({setFiles, files}) {
    

    const onDrop = useCallback(acceptedFiles => {
        setFiles(acceptedFiles.map(file => Object.assign(file, {
            preview: URL.createObjectURL(file)
        })));
    }, []);

    const {
        getRootProps,
        getInputProps,
        isDragActive,
        isDragAccept,
        isDragReject
    } = useDropzone({
        onDrop,
        accept: {
            'image/jpeg': ['.jpeg', '.jpg'],
            'image/png': ['.png']
        }
    });

    const style = useMemo(() => ({
        ...baseStyle,
        ...(isDragActive ? activeStyle : {}),
        ...(isDragAccept ? acceptStyle : {}),
        ...(isDragReject ? rejectStyle : {})
    }), [
        isDragActive,
        isDragReject,
        isDragAccept
    ]);

    const removeFile = (name) => {
        console.log("name ", name)
        setFiles(prevFiles => prevFiles.filter(file => file.name !== name));
    };

    const formatFileSize = (bytes) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    const thumbs = files.map(file => (

        <div className="content">
            <div className="file-list">
                <h3>Uploaded Files ({files.length})</h3>
            </div>
            <div key={file.name}>
                {files.length === 0 ? (
                    <div className="empty-state">
                        <p>No files uploaded yet</p>
                        <p>Files you upload will appear here</p>
                    </div>
                ) : (
                    files.map(file => (
                        <div key={file.id} className="file-item">
                            <div className="file-info">
                                <div className="file-name">{file.name}</div>
                                <div className="file-size">{formatFileSize(file.size)}</div>
                                <div><img
                                    src={file.preview}
                                    alt={file.name}
                                    style={{ height: 100, width: 100 }}
                                /></div>
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
    ));

    // clean up
    useEffect(() => () => {
        files.forEach(file => URL.revokeObjectURL(file.preview));
    }, [files]);

    return (
        <div className="container">

            <div className="content">
                <div
                    {...getRootProps()}
                    className={`dropzone ${isDragActive ? 'active' : ''}`}
                >
                    <input {...getInputProps()} />
                    <p>{isDragActive ? 'Drop the files here...' : 'Drag & drop files here, or click to select files Only .jpeg, .jpg, and .png images will be accepted'}</p>
                    <span className="browse-btn">Browse files</span>
                </div>

                <div className="file-list">
                    <h3>Fichiers téléchargés ({files.length})</h3>

                    {files.length === 0 ? (
                        <div className="empty-state">
                            <Typography variant='h4'>Aucun fichier téléchargé pour l'instant</Typography>
                            <Typography variant='h5'>les fichiers téléchargés apparaitront ici</Typography>
                        </div>
                    ) : (
                        files.map(file => (
                            <div key={file.name} className="file-item">
                                <div className="file-info">
                                    <div className="file-name">{file.name}</div>
                                    <div className="file-size">{formatFileSize(file.size)}</div>
                                    <div><img
                                        src={file.preview}
                                        alt={file.name}
                                        style={{ height: 100, width: 100 }}
                                    /></div>
                                </div>
                                <button
                                    className="remove-btn"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        console.log('idset ', file.name)
                                        removeFile(file.name);
                                    }}
                                >
                                    Supprimer
                                </button>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}

export default DropzoneComponent;