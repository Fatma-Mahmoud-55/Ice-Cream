import React from 'react';

const GoogleDriveImage = ({ url }) => {
    const extractFileId = (url) => {
        const match = url.match(/[-\w]{25,}/);
        return match ? match[0] : null;
    };
    const fileId = extractFileId(url);

    return (
        <div>
            {fileId && (
                <img
                    src={`https://drive.google.com/uc?export=view&id=${fileId}`}
                    alt="Google Drive Image"
                />
            )}
        </div>
    );
};

export default GoogleDriveImage;
