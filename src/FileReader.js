import React, { useState, useRef } from 'react';
// import DisplayComponent from './Display';
import DetailsComponent from './DetailsComponent';

const FileReaderComponent = () => {
    const [jsonData, setJsonData] = useState(null);
    const downloadLinkRef = useRef();

    const handleFileChange = (event) => {
        const file = event.target.files[0];

        if (file) {
            const reader = new FileReader();

            reader.onload = (e) => {
                const fileContent = e.target.result;
                const parsedData = JSON.parse(fileContent);
                setJsonData(parsedData);
            };

            reader.readAsText(file);
        }
    };

    const saveData = () => {
        console.log("data updated!");

        const dataStr = JSON.stringify(jsonData, null, 2); // format JSON nicely
        const blob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);

        downloadLinkRef.current.href = url;
        downloadLinkRef.current.download = 'updated-data.json';
        downloadLinkRef.current.click();
    }

    return (
        <div className="container" style={{ marginTop: '50px' }}>
            <div className='group'>
                <input type="file" onChange={handleFileChange} accept=".json" />
                {jsonData && (
                    <button onClick={saveData}>Quit</button>
                )}

            </div>

            {jsonData && (
                <>
                    {/* <DisplayComponent jsonData={jsonData} /> */}
                    <DetailsComponent jsonData={jsonData} />
                    <a ref={downloadLinkRef} style={{ display: 'none' }}>Download</a>
                </>


            )}
        </div>


    );
};

export default FileReaderComponent;
