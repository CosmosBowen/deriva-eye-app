import axios from 'axios';
import { useEffect, useState } from 'react';

const ImageComponent = ({ imageUrl }) => {
    const [imgSrc, setImgSrc] = useState(null);
    // const imageUrl = 'https://dev.eye-ai.org/hatrac/images/scans/subject/1000355/observation/1440097/image/14360314/cee45653be1a0ad4462eb7d9f216871e.jpg';

    useEffect(() => {
        const fetchImage = async () => {

            try {
                const response = await axios.get(imageUrl, {
                    responseType: 'blob',  // get data as a Blob which is suitable for images
                });

                // Create an object URL for the blob
                const imageSrc = URL.createObjectURL(response.data);

                setImgSrc(imageSrc);

                console.log("setImgSrc:", setImgSrc);
            } catch (error) {
                console.error('Failed to fetch image:', error);
            }
        };

        fetchImage();
    }, [imgSrc]);

    return (
        <div className='image-container'>
            {imgSrc ? <img className="myImage" src={imgSrc} alt="My Fetched Image" /> : 'Loading...'}
        </div>
    );
};

export default ImageComponent;
