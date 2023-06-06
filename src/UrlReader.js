import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

import DetailsComponent from './DetailsComponent';

const UrlReaderComponent = () => {

    const [jsonData, setJsonData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const givenUrl = '/ermrest/catalog/eye-ai/attribute/Image_Dataset:=eye-ai:Image_Dataset/Dataset=68X4/Image:=eye-ai:Image/Diagnosis:=eye-ai:Diagnosis/Diagnosis_Tag=M7NW/Image:RID,Image:URL,Image:Filename,Image:Length,Image:Image,Diagnosis:Cup%2FDisk_Ratio';
            // const givenUrl0 = '/ermrest/catalog/eye-ai/entity/Image_Dataset:=eye-ai:Image_Dataset/Dataset=68X4/Image:=eye-ai:Image/Diagnosis:=eye-ai:Diagnosis/Diagnosis_Tag=M7NW';
            const url = 'http://localhost:3001' + givenUrl;

            try {
                const response = await axios.get(url);

                setJsonData(response.data);

                console.log("Fetched data:", response.data);
            } catch (error) {
                console.error('Failed to fetch data:', error);
            }
        };

        fetchData();
    }, []);  // empty dependency array means this effect runs once on mount


    const downloadLinkRef = useRef();



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
        <div className="container" style={{ marginTop: '15px' }}>
            <iframe src="https://www.w3schools.com" title="W3Schools Free Online Web Tutorials">
            </iframe>
            <div className='group'>
                {jsonData && (
                    <button onClick={saveData} style={{ marginRight: '50px' }}>Quit</button>
                )}
            </div>

            {jsonData && (
                <>
                    <DetailsComponent jsonData={jsonData} />
                    <a ref={downloadLinkRef} style={{ display: 'none' }}>Download</a>
                </>


            )}
        </div>


    );
};

export default UrlReaderComponent;
