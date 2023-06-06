import React, { useState, useEffect } from 'react';
import NumberChooser from './NumberPicker';
// import ImageZoom from './ImageInteract';
// import ReactImageZoom from 'react-image-zoom';
// import ThingMap from './image';
// import Zoom from 'react-img-zoom';
import { MapInteractionCSS } from 'react-map-interaction';

const DetailsComponent = ({ jsonData }) => {
    // const url = "https://blogs.smithsonianmag.com/smartnews/files/2012/11/544f0cc8686bd978ffa143777db1f287.jpeg";
    //Cup/Disk_Ratio
    const dropdown1 = [0.0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0]
    //Image_Quality_Vocab.Name
    const dropdown2 = ["Good", "Bad"]
    //Diagnosis_Image_Vocab.Name
    const dropdown3 = ["No Glaucoma", "Suspected Glaucoma"]

    const [currentIndex, setCurrentIndex] = useState(0);
    const currentObject = jsonData[currentIndex];

    const [imageUrl, setImageUrl] = useState(currentObject['URL']);
    const [selectedValue1, setSelectedValue1] = useState(currentObject['Cup/Disk_Ratio']);
    const [selectedValue2, setSelectedValue2] = useState(currentObject['Image_Quality_Vocab.Name']);
    const [selectedValue3, setSelectedValue3] = useState(currentObject['Diagnosis_Image_Vocab.Name']);
    const [comments, setComments] = useState(currentObject['Comments']);

    const [isPanelVisible, setPanelVisibility] = useState(false);


    useEffect(() => {
        // console.log("initiate new object");
        setImageUrl(currentObject['URL']);
        // console.log("image:", imageUrl);
        setSelectedValue1(currentObject['Cup/Disk_Ratio']);
        setSelectedValue2(currentObject['Image_Quality_Vocab.Name']);
        // console.log("current 1:", currentObject['Cup/Disk_Ratio']);
        // setSelectedValue3(currentObject['Diagnosis_Image_Vocab.Name']);
        if (currentObject['Diagnosis_Image_Vocab.Name'] === '') {
            // console.log("initial value3")
            const initialValue3 = currentObject['Cup/Disk_Ratio'] > 0.7 ? "Suspected Glaucoma" : "No Glaucoma";
            currentObject['Diagnosis_Image_Vocab.Name'] = initialValue3;
            setSelectedValue3(initialValue3);
            // console.log("*1:", currentObject['Cup/Disk_Ratio']);
            // console.log("*3:", initialValue3);
        } else {
            setSelectedValue3(currentObject['Diagnosis_Image_Vocab.Name']);
        }
        setComments(currentObject['Comments']);
    }, [currentObject]);



    // useEffect(() => {
    //     console.log("value3 updates comments(", selectedValue3, ")");
    //     if ((selectedValue1 > 0.7 && selectedValue3 == "No Glaucoma") | (selectedValue1 <= 0.7 && selectedValue3 == "Suspected Glaucoma")) {
    //         console.log("add comments!");
    //         if (currentObject['Comments'] == undefined) {
    //             setComments('');
    //         } else if (currentObject['Comments'] != '') {
    //             setComments(currentObject['Comments']);
    //         } else {
    //             setComments('');
    //         }

    //     } else {
    //         console.log("no comments.")
    //         setComments(undefined);
    //     }

    // }, [selectedValue3, currentObject]);

    const showNextObject = () => {
        saveAndShowData();
        setCurrentIndex((prevIndex) => (prevIndex + 1) % jsonData.length);
        setPanelVisibility(false);
    };

    const showPreviousObject = () => {
        saveAndShowData();
        setCurrentIndex((prevIndex) => prevIndex === 0 ? jsonData.length - 1 : prevIndex - 1);
        setPanelVisibility(false);
    };

    const saveAndShowData = () => {
        jsonData[currentIndex]['Cup/Disk_Ratio'] = selectedValue1;
        jsonData[currentIndex]['Image_Quality_Vocab.Name'] = selectedValue2;
        jsonData[currentIndex]['Diagnosis_Image_Vocab.Name'] = selectedValue3;
        if (comments === undefined) {
            delete jsonData[currentIndex]['Comments'];
        } else {
            jsonData[currentIndex]['Comments'] = comments;
        }

        console.log("#", currentIndex);
        console.log("1:", jsonData[currentIndex]['Cup/Disk_Ratio'])
        console.log("2:", jsonData[currentIndex]['Image_Quality_Vocab.Name'])
        console.log("3:", jsonData[currentIndex]['Diagnosis_Image_Vocab.Name'])
        if (comments) {
            console.log("4:", jsonData[currentIndex]['Comments'])
        }
    }
    //#1-0.8-no
    //#2-0.9-no
    const handleValue1Change = (event) => {
        const selectedValue = event.target.value;
        setSelectedValue1(selectedValue);

        console.log("value1 change:", event.target.value);

        const updatedValue3 = selectedValue > 0.7 ? "Suspected Glaucoma" : "No Glaucoma";
        setSelectedValue3(updatedValue3);
        console.log("value1(", selectedValue, ")updates value3(", selectedValue3, ")");

        if ((selectedValue <= 0.7 && updatedValue3 === "No Glaucoma") | (selectedValue > 0.7 && updatedValue3 === "Suspected Glaucoma")) {
            console.log("no comments.")
            setComments(undefined);

        } else {
            console.log("add comments!")
            setComments('');
        }
    }

    const handleValue2Change = (event) => {
        const selectedValue = event.target.value;
        setSelectedValue2(selectedValue);

        console.log("value2 change:", event.target.value);
    }

    const handleValue3Change = (event) => {
        const selectedValue = event.target.value;
        setSelectedValue3(selectedValue);

        console.log("value3 change:", selectedValue);

        console.log("value3 updates comments(", selectedValue, ")");
        if ((selectedValue1 > 0.7 && selectedValue === "No Glaucoma") | (selectedValue1 <= 0.7 && selectedValue === "Suspected Glaucoma")) {
            console.log("add comments!");
            if (currentObject['Comments'] === undefined) {
                setComments('');
            } else if (currentObject['Comments'] !== '') {
                setComments(currentObject['Comments']);
            } else {
                setComments('');
            }

        } else {
            console.log("no comments.")
            setComments(undefined);
        }

        // console.log("value3 updates comments(", selectedValue, ")");
        // if ((selectedValue1 > 0.7 && selectedValue == "No Glaucoma") | (selectedValue1 <= 0.7 && selectedValue == "Suspected Glaucoma")) {
        //     console.log("add comments!")
        //     setComments('');
        // } else {
        //     console.log("no comments.")
        //     setComments(undefined);
        // }
    }

    const handleTextareaChange = (event) => {
        const updatedComments = event.target.value;
        setComments(updatedComments);

        console.log("comments change:", updatedComments);
    };

    const handleShowPanel = () => {
        setPanelVisibility(true);
    }

    const numbers = Array(jsonData.length).fill(0);
    const handleSelect = (number) => {
        const index = number - 1;
        setCurrentIndex(index);

    };

    // const props = { width: 400, scale: 1.8, zoomPosition: "original", zoomWidth: 300, img: { imageUrl }, height: 300 };


    return (


        <div className="container">
            <div className="group">
                <div className='vertical-items'>
                    <button onClick={handleShowPanel}>
                        {currentIndex + 1}/{jsonData.length}
                    </button>
                    {isPanelVisible && (
                        <NumberChooser data={numbers} onSelect={handleSelect} />
                    )}
                </div>



                <button onClick={showPreviousObject}>Previous</button>
                <button onClick={showNextObject}>Next</button>


            </div>
            <table className="center">
                <tbody>
                    <tr key="image">
                        <td>Image</td>
                        <td>
                            <div className='image-container'>
                                <MapInteractionCSS>
                                    <img src={imageUrl} alt='eye-ball' />
                                </MapInteractionCSS>
                                {/* <Zoom
                                    img={imageUrl}
                                    zoomScale={3}
                                    width={300}
                                    height={300}
                                /> */}
                            </div>

                            {/* <ThingMap url={imageUrl} /> */}

                            {/* <ReactImageZoom {...props} alt="Image" class="image-class" scale="1.8" /> */}
                            {/* <ImageZoom imageUrl={imageUrl} /> */}
                            {/* <img src={imageUrl} alt="Placeholder" class="image-class" /> */}
                        </td>
                    </tr>
                    <tr key="Cup/Disk_Ratio">
                        <td>Cup/Disk_Ratio</td>
                        <td>
                            <select value={selectedValue1} onChange={handleValue1Change}>
                                {dropdown1.map((option) => (
                                    <option key={option} value={option}>
                                        {/* {option === selectedValue2 ? `${option}` : option} */}
                                        {option}
                                    </option>
                                ))}
                            </select>
                        </td>
                    </tr>


                    <tr key="Image_Quality">
                        <td>Image_Quality:</td>
                        <td>
                            <select value={selectedValue2} onChange={handleValue2Change}>
                                {dropdown2.map((option) => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                        </td>
                    </tr>

                    <tr key="Diagnosis">
                        <td>Diagnosis:</td>
                        <td>
                            <select value={selectedValue3} onChange={handleValue3Change}>
                                {dropdown3.map((option) => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                        </td>
                    </tr>
                    {comments !== undefined && (
                        <>
                            <tr key="Comment">
                                <td>Comments:</td>
                                <td>
                                    <textarea placeholder="Explain your decision here ..." value={comments}
                                        onChange={handleTextareaChange}></textarea>
                                </td>
                            </tr>
                        </>
                    )}


                </tbody>
            </table>
        </div>


    );
}

export default DetailsComponent;