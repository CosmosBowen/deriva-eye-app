import React, { useEffect, useState } from 'react';
import axios from 'axios';

const YourComponent = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const givenUrl = '/ermrest/catalog/eye-ai/attribute/Image_Dataset:=eye-ai:Image_Dataset/Dataset=68X4/Image:=eye-ai:Image/Diagnosis:=eye-ai:Diagnosis/Diagnosis_Tag=M7NW/Image:RID,Image:URL,Image:Filename,Image:Length,Image:Image,Diagnosis:Cup%2FDisk_Ratio';
            const givenUrl0 = '/ermrest/catalog/eye-ai/entity/Image_Dataset:=eye-ai:Image_Dataset/Dataset=68X4/Image:=eye-ai:Image/Diagnosis:=eye-ai:Diagnosis/Diagnosis_Tag=M7NW';
            const url = 'http://localhost:3001' + givenUrl;

            try {
                const response = await axios.get(url);

                setData(response.data);

                console.log("Fetched data:", response.data);
            } catch (error) {
                console.error('Failed to fetch data:', error);
            }
        };

        fetchData();
    }, []);  // empty dependency array means this effect runs once on mount

    return (
        <div>
            {/* Here you can use your data */}
            {/* This is just a simple example, you might want to do something more sophisticated */}
            {data ? <div>Data: {JSON.stringify(data)}</div> : 'Loading...'}
        </div>
    );
};

export default YourComponent;
