import React, { useState, useEffect, useRef } from 'react';
// import NumberChooser from './NumberPicker';

// import ImageZoom from './ImageInteract';
// import ReactImageZoom from 'react-image-zoom';
// import ThingMap from './image';
// import Zoom from 'react-img-zoom';
import { MapInteractionCSS } from 'react-map-interaction';
// import ImageComponent from './ImageComponent';
import SliderComponent from './NumberSlider';
import { HotKeys } from 'react-hotkeys'

const DetailsComponent = ({ jsonData }) => {
    const imageRef = useRef(null);
    const element1Ref = useRef(null);
    const element2Ref = useRef(null);
    const element3Ref = useRef(null);
    const commentsRef = useRef(null);

    //Cup/Disk_Ratio
    const dropdown1 = [0.0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0]
    //Image_Quality_Vocab.Name
    const dropdown2 = ["Good", "Bad"]
    //Diagnosis_Image_Vocab.Name
    const dropdown3 = ["No Glaucoma", "Suspected Glaucoma"]

    // const [sliderValue, setSliderValue] = useState(1);
    const numberMax = jsonData.length;
    const handleSliderChange = (value) => {
        setCurrentIndex(value - 1);
    };

    const [currentIndex, setCurrentIndex] = useState(0);
    const currentObject = jsonData[currentIndex];
    console.log("currentObject:", currentObject);

    if (imageRef.current && element1Ref.current && element2Ref.current && element3Ref.current && commentsRef.current && currentObject) {
        imageRef.current.src = currentObject['URL'];
        element1Ref.current.value = currentObject['Cup/Disk_Ratio'];
        element2Ref.current.value = currentObject['Image_Quality_Vocab.Name'];
        // element3Ref.current.value = currentObject['Diagnosis_Image_Vocab.Name'];
        if (currentObject['Diagnosis_Image_Vocab.Name'] === '') {
            const initialValue3 = currentObject['Cup/Disk_Ratio'] >= 0.6 ? "Suspected Glaucoma" : "No Glaucoma";
            currentObject['Diagnosis_Image_Vocab.Name'] = initialValue3;
            element3Ref.current.value = initialValue3;
        } else {
            element3Ref.current.value = currentObject['Diagnosis_Image_Vocab.Name'];
        }
        commentsRef.current.value = currentObject['Comments'];
    }



    // const [imageUrl, setImageUrl] = useState(currentObject['URL']);
    // const [selectedValue1, setSelectedValue1] = useState(currentObject['Cup/Disk_Ratio']);
    // const [selectedValue2, setSelectedValue2] = useState(currentObject['Image_Quality_Vocab.Name']);
    // const [selectedValue3, setSelectedValue3] = useState(currentObject['Diagnosis_Image_Vocab.Name']);
    // const [comments, setComments] = useState(currentObject['Comments']);


    const [, forceUpdate] = useState('')

    useEffect(() => {
        //initiate new object
        console.log("use Effect---currentObject:", currentObject);
        currentObject = jsonData[currentIndex];
        if (imageRef.current && element1Ref.current && element2Ref.current && element3Ref.current && commentsRef.current && currentObject) {
            // if (imageRef.current && element1Ref.current && element2Ref.current && element3Ref.current && commentsRef.current) {
            imageRef.current.src = currentObject['URL'];
            element1Ref.current.value = currentObject['Cup/Disk_Ratio'];
            element2Ref.current.value = currentObject['Image_Quality_Vocab.Name'];
            // setImageUrl(currentObject['URL']);
            // setSelectedValue1(currentObject['Cup/Disk_Ratio']);
            // setSelectedValue2(currentObject['Image_Quality_Vocab.Name']);
            if (currentObject['Diagnosis_Image_Vocab.Name'] === '') {
                const initialValue3 = currentObject['Cup/Disk_Ratio'] >= 0.6 ? "Suspected Glaucoma" : "No Glaucoma";
                currentObject['Diagnosis_Image_Vocab.Name'] = initialValue3;
                element3Ref.current.value = initialValue3;
                // setSelectedValue3(initialValue3);
            } else {
                element3Ref.current.value = currentObject['Diagnosis_Image_Vocab.Name'];
                // setSelectedValue3(currentObject['Diagnosis_Image_Vocab.Name']);
            }
            commentsRef.current.value = currentObject['Comments'];
            // setComments(currentObject['Comments']);
        }

    }, [currentIndex]);

    const showNextObject = () => {
        saveAndShowData();
        setCurrentIndex((prevIndex) => (prevIndex + 1) % jsonData.length);
    };

    const showPreviousObject = () => {
        saveAndShowData();
        setCurrentIndex((prevIndex) => prevIndex === 0 ? jsonData.length - 1 : prevIndex - 1);
    };

    const saveAndShowData = () => {
        jsonData[currentIndex]['Cup/Disk_Ratio'] = element1Ref.current.value;
        jsonData[currentIndex]['Image_Quality_Vocab.Name'] = element2Ref.current.value;
        jsonData[currentIndex]['Diagnosis_Image_Vocab.Name'] = element3Ref.current.value;
        // if (comments === undefined) {
        if (commentsRef.current.value === undefined) {
            delete jsonData[currentIndex]['Comments'];
        } else {
            jsonData[currentIndex]['Comments'] = commentsRef.current.value;
        }

        console.log("#current ", currentIndex);
        console.log("#1:", jsonData[currentIndex]['Cup/Disk_Ratio'])
        console.log("#2:", jsonData[currentIndex]['Image_Quality_Vocab.Name'])
        console.log("#3:", jsonData[currentIndex]['Diagnosis_Image_Vocab.Name'])
        // if (comments) {
        if (commentsRef.current.value) {
            console.log("4:", jsonData[currentIndex]['Comments'])
        }
    }
    //#1-0.8-no
    //#2-0.9-no
    const handleValue1Change = (event) => {
        const selectedValue = event.target.value;
        element1Ref.current.value = selectedValue;
        // setSelectedValue1(selectedValue);

        console.log("value1 change:", event.target.value);

        const updatedValue3 = selectedValue >= 0.6 ? "Suspected Glaucoma" : "No Glaucoma";
        element3Ref.current.value = updatedValue3;
        // setSelectedValue3(updatedValue3);

        console.log("value1(", selectedValue, ")updates value3(", element3Ref.current.value, ")");

        if ((selectedValue < 0.6 && updatedValue3 === "No Glaucoma") | (selectedValue >= 0.6 && updatedValue3 === "Suspected Glaucoma")) {
            console.log("no comments.")
            commentsRef.current.value = undefined;
            // setComments(undefined);

        } else {
            console.log("add comments!")
            commentsRef.current.value = '';
            // setComments('');
        }
        forceUpdate();
    }

    const handleValue2Change = (event) => {
        const selectedValue = event.target.value;
        element2Ref.current.value = selectedValue;
        // setSelectedValue2(selectedValue);

        console.log("value2 change:", event.target.value);
        forceUpdate();
    }

    const handleValue3Change = (event) => {
        const selectedValue = event.target.value;
        element3Ref.current.value = selectedValue;
        // setSelectedValue3(selectedValue);

        console.log("value3 change:", selectedValue);

        console.log("value3 updates comments(", selectedValue, ")");
        if ((element1Ref.current.value >= 0.6 && selectedValue === "No Glaucoma") | (element1Ref.current.value < 0.6 && selectedValue === "Suspected Glaucoma")) {
            console.log("add comments!");
            if (currentObject['Comments'] === undefined) {
                commentsRef.current.value = '';
                // setComments('');
            } else if (currentObject['Comments'] !== '') {
                commentsRef.current.value = currentObject['Comments'];
                // setComments(currentObject['Comments']);
            } else {
                commentsRef.current.value = '';
                // setComments('');

            }

        } else {
            console.log("no comments.")
            commentsRef.current.value = undefined;
            // setComments(undefined);
        }

        forceUpdate();
    }

    const handleTextareaChange = (event) => {
        const updatedComments = event.target.value;
        commentsRef.current.value = updatedComments;
        // setComments(updatedComments);

        console.log("comments change:", updatedComments);
    };


    ////////////////////////////////////////////////////////////////////////////////////////
    // Add Hotkeys Support
    ////////////////////////////////////////////////////////////////////////////////////////
    const keyMap = {
        // Navigation
        CTRL_N: 'ctrl+n', // next
        CTRL_P: 'ctrl+p', // previous

        // C/D controls
        NUM1: '1', // c/d 0.1
        NUM2: '2', // c/d 0.2
        NUM3: '3', // c/d 0.3
        NUM4: '4', // c/d 0.4
        NUM5: '5', // c/d 0.5
        NUM6: '6', // c/d 0.6
        NUM7: '7', // c/d 0.7
        NUM8: '8', // c/d 0.8
        NUM9: '9', // c/d 0.9

        // Quality controls
        QUALG: 'g', // quality good
        QUALB: 'b', // quality bad

        // Diagnosis controls
        DIAGN: 'w', // no glaucoma ("without glaucoma")
        DIAGS: 's' // suspected glaucoma
    };

    const handleCtrlN = showNextObject
    const handleCtrlP = showPreviousObject

    const setValue1AndTrigger = (v) => {
        // setSelectedValue1(v)
        handleValue1Change({ target: { value: v } })
    }
    const setValue2AndTrigger = (v) => {
        // setSelectedValue2(v)
        handleValue2Change({ target: { value: v } })
    }
    const setValue3AndTrigger = (v) => {
        // setSelectedValue3(v)
        handleValue3Change({ target: { value: v } })
    }

    const handle1 = () => { setValue1AndTrigger("0.1") }
    const handle2 = () => { setValue1AndTrigger("0.2") }
    const handle3 = () => { setValue1AndTrigger("0.3") }
    const handle4 = () => { setValue1AndTrigger("0.4") }
    const handle5 = () => { setValue1AndTrigger("0.5") }
    const handle6 = () => { setValue1AndTrigger("0.6") }
    const handle7 = () => { setValue1AndTrigger("0.7") }
    const handle8 = () => { setValue1AndTrigger("0.8") }
    const handle9 = () => { setValue1AndTrigger("0.9") }

    const handleG = () => { setValue2AndTrigger("Good") }
    const handleB = () => { setValue2AndTrigger("Bad") }

    const handleW = () => { setValue3AndTrigger("No Glaucoma") }
    const handleS = () => { setValue3AndTrigger("Suspected Glaucoma") }

    const handlers = {
        CTRL_N: handleCtrlN,
        CTRL_P: handleCtrlP,

        NUM1: handle1, // c/d 0.1
        NUM2: handle2, // c/d 0.2
        NUM3: handle3, // c/d 0.3
        NUM4: handle4, // c/d 0.4
        NUM5: handle5, // c/d 0.5
        NUM6: handle6, // c/d 0.6
        NUM7: handle7, // c/d 0.7
        NUM8: handle8, // c/d 0.8
        NUM9: handle9, // c/d 0.9

        // Quality controls
        QUALG: handleG, // quality good
        QUALB: handleB, // quality bad

        // Diagnosis controls
        DIAGN: handleW, // no glaucoma ("without glaucoma")
        DIAGS: handleS // glaucoma
    };


    // const props = { width: 400, scale: 1.8, zoomPosition: "original", zoomWidth: 300, img: { imageUrl }, height: 300 };


    return (
        <div className='container-box'>
            <HotKeys keyMap={keyMap} handlers={handlers}>

                <div className="container">
                    <div className="group">
                        <div className='vertical-items'>
                            <button>
                                {currentIndex + 1}/{jsonData.length}
                            </button>
                            <SliderComponent maxNum={numberMax} onSelect={handleSliderChange} value={currentIndex
                                + 1} />
                        </div>



                        <button onClick={showPreviousObject}>Previous</button>
                        <button onClick={showNextObject}>Next</button>


                    </div>
                    <table className="center">
                        <tbody>
                            <tr key="image">
                                <td></td>
                                <td>
                                    <div className='image-container'>
                                        <MapInteractionCSS>
                                            {/* <img className="myImage" src={imageUrl} alt='eye-ball' /> */}
                                            <img className="myImage" alt='eye-ball' ref={imageRef} />
                                        </MapInteractionCSS>

                                    </div>
                                </td>
                            </tr>
                            <tr key="Cup/Disk_Ratio">
                                <td>Cup/Disk_Ratio</td>
                                <td>
                                    <select onChange={handleValue1Change} ref={element1Ref}>
                                        {dropdown1.map((option) => (
                                            <option key={option} value={option}>
                                                {/* {option === selectedValue2 ? `${option}` : option} */}
                                                {option}
                                            </option>
                                        ))}
                                    </select>
                                </td>
                            </tr>


                            <tr key="Diagnosis">
                                <td>Diagnosis</td>
                                <td>
                                    <select onChange={handleValue3Change} ref={element3Ref}>
                                        {dropdown3.map((option) => (
                                            <option key={option} value={option}>
                                                {option}
                                            </option>
                                        ))}
                                    </select>
                                </td>
                            </tr>

                            <tr key="Image_Quality">
                                <td>Image_Quality</td>
                                <td>
                                    <select onChange={handleValue2Change} ref={element2Ref} >
                                        {dropdown2.map((option) => (
                                            <option key={option} value={option}>
                                                {option}
                                            </option>
                                        ))}
                                    </select>
                                </td>
                            </tr>

                            {commentsRef.current.value !== undefined && (
                                <>
                                    <tr key="Comment">
                                        <td>Comments</td>
                                        <td>
                                            <textarea placeholder="Explain your decision here ..."
                                                onChange={handleTextareaChange} ref={commentsRef} ></textarea>
                                        </td>
                                    </tr>
                                </>
                            )}


                        </tbody>
                    </table>
                    {/* <div className="group">
                        <button onClick={showNextObject}>Next</button>
                    </div> */}

                </div>
            </HotKeys>
        </div>

    );
}

export default DetailsComponent;