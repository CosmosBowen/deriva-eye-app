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
    const element1Ref = useRef(null);
    const element2Ref = useRef(null);
    const element3Ref = useRef(null);
    const commentsRef = useRef(null);

    //Cup/Disk_Ratio
    const dropdown1 = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9]
    //Image_Quality_Vocab.Name
    const dropdown2 = ["Good", "Bad"]
    //Diagnosis_Image_Vocab.Name
    const dropdown3 = ["No Glaucoma", "Suspected Glaucoma"]

    // const [sliderValue, setSliderValue] = useState(1);
    const numberMax = jsonData.length;
    const handleSliderChange = (value) => {
        setCurrentIndex(value - 1);
    };


    // const numbers = Array(jsonData.length).fill(0);
    // const handleSelect = (number) => {
    //     const index = number - 1;
    //     setCurrentIndex(index);

    // };

    const [currentIndex, setCurrentIndex] = useState(0);
    let currentObject = jsonData[currentIndex];
    console.log("Whatever...", currentIndex)
    const url = 'http://localhost:3001/hatrac/images/scans/subject/1000355/observation/1440097/image/14360314/cee45653be1a0ad4462eb7d9f216871e.jpg';
    // const imageUrl = 'http://localhost:3001/images/scans/subject/1000355/observation/1440097/image/14360314/cee45653be1a0ad4462eb7d9f216871e.jpg';

    const [imageUrl, setImageUrl] = useState(currentObject['URL']);
    // const [imageUrl, setImageUrl] = useState(currentObject['URL']);
    const [selectedValue1, setSelectedValue1] = useState(currentObject['Cup/Disk_Ratio']);
    const [selectedValue2, setSelectedValue2] = useState(currentObject['Image_Quality_Vocab.Name']);
    const [selectedValue3, setSelectedValue3] = useState(currentObject['Diagnosis_Image_Vocab.Name']);
    const [comments, setComments] = useState(currentObject['Comments']);
    const [showComments, setShowComments] = useState(
        (currentObject['Comments'] === undefined | currentObject['Comments'] === '') ? false : true
    )


    setImageUrl(currentObject['URL']);
    // setImageUrl(currentObject['URL']);
    // console.log("image:", imageUrl);
    setSelectedValue1(currentObject['Cup/Disk_Ratio']);
    setSelectedValue2(currentObject['Image_Quality_Vocab.Name']);
    // console.log("current 1:", currentObject['Cup/Disk_Ratio']);
    // setSelectedValue3(currentObject['Diagnosis_Image_Vocab.Name']);
    if (currentObject['Diagnosis_Image_Vocab.Name'] === '') {
        // console.log("initial value3")
        const initialValue3 = currentObject['Cup/Disk_Ratio'] >= 0.6 ? "Suspected Glaucoma" : "No Glaucoma";
        currentObject['Diagnosis_Image_Vocab.Name'] = initialValue3;
        setSelectedValue3(initialValue3);
        // console.log("*1:", currentObject['Cup/Disk_Ratio']);
        // console.log("*3:", initialValue3);
    } else {
        setSelectedValue3(currentObject['Diagnosis_Image_Vocab.Name']);
    }

    if (currentObject['Comments'] === undefined | currentObject['Comments'] === '') {
        setShowComments(false)
    } else {
        setShowComments(true)
        setComments(currentObject['Comments']);
    }

    // console.log("#NOW ", currentIndex);
    // console.log("#1:", jsonData[currentIndex]['Cup/Disk_Ratio'])
    // console.log("#2:", jsonData[currentIndex]['Image_Quality_Vocab.Name'])
    // console.log("#3:", jsonData[currentIndex]['Diagnosis_Image_Vocab.Name'])
    // console.log("#4:", jsonData[currentIndex]['Comments'])
    // console.log("#5:", showComments)

    // if (comments) {
    // if (jsonData[currentIndex]['Comments']) {
    //     console.log("4:", jsonData[currentIndex]['Comments'])
    // }

    const [isPanelVisible, setPanelVisibility] = useState(true);

    const [, forceUpdate] = useState('')

    // useEffect(() => {
    //     currentObject = jsonData[currentIndex];
    //     console.log("USE EFFECT....")
    //     // console.log("initiate new object");
    //     setImageUrl(currentObject['URL']);
    //     // setImageUrl(currentObject['URL']);
    //     // console.log("image:", imageUrl);
    //     setSelectedValue1(currentObject['Cup/Disk_Ratio']);
    //     setSelectedValue2(currentObject['Image_Quality_Vocab.Name']);
    //     // console.log("current 1:", currentObject['Cup/Disk_Ratio']);
    //     // setSelectedValue3(currentObject['Diagnosis_Image_Vocab.Name']);
    //     if (currentObject['Diagnosis_Image_Vocab.Name'] === '') {
    //         // console.log("initial value3")
    //         const initialValue3 = currentObject['Cup/Disk_Ratio'] >= 0.6 ? "Suspected Glaucoma" : "No Glaucoma";
    //         currentObject['Diagnosis_Image_Vocab.Name'] = initialValue3;
    //         setSelectedValue3(initialValue3);
    //         // console.log("*1:", currentObject['Cup/Disk_Ratio']);
    //         // console.log("*3:", initialValue3);
    //     } else {
    //         setSelectedValue3(currentObject['Diagnosis_Image_Vocab.Name']);
    //     }

    //     if (currentObject['Comments'] === undefined | currentObject['Comments'] === '') {
    //         setShowComments(false)
    //     } else {
    //         setShowComments(true)
    //         setComments(currentObject['Comments']);
    //     }
    // }, [currentIndex]);



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
        console.log("trigger showNextObject")
        saveAndShowData();
        setCurrentIndex((prevIndex) => (prevIndex + 1) % jsonData.length);
        // if (sliderValue < maxNum) {
        //     setSliderValue(sliderValue + 1);
        // } else {
        //     setSliderValue(1);
        // }

        // setPanelVisibility(false);
    };

    const showPreviousObject = () => {
        console.log("trigger showPreviousObject")
        saveAndShowData();
        setCurrentIndex((prevIndex) => prevIndex === 0 ? jsonData.length - 1 : prevIndex - 1);
        // if (sliderValue > 1) {
        //     setSliderValue(sliderValue - 1);
        // } else {
        //     setSliderValue(numberMax);
        // }

        // setPanelVisibility(false);
    };

    const saveAndShowData = () => {
        // jsonData[currentIndex]['Cup/Disk_Ratio'] = element1Ref.current.value;
        // jsonData[currentIndex]['Image_Quality_Vocab.Name'] = element2Ref.current.value;
        // jsonData[currentIndex]['Diagnosis_Image_Vocab.Name'] = element3Ref.current.value;
        console.log("saveAndShowData:")
        console.log("saved indec:", currentIndex);
        console.log("value1:", selectedValue1)
        console.log("value2:", selectedValue2)
        console.log("value3:", selectedValue3)


        jsonData[currentIndex]['Cup/Disk_Ratio'] = element1Ref.current.value;
        jsonData[currentIndex]['Image_Quality_Vocab.Name'] = element2Ref.current.value;
        jsonData[currentIndex]['Diagnosis_Image_Vocab.Name'] = element3Ref.current.value;
        if (showComments) {
            jsonData[currentIndex]['Comments'] = commentsRef.current.value;
        } else {
            jsonData[currentIndex]['Comments'] = '';
        }
        // jsonData[currentIndex]['Cup/Disk_Ratio'] = selectedValue1;
        // jsonData[currentIndex]['Image_Quality_Vocab.Name'] = selectedValue2;
        // jsonData[currentIndex]['Diagnosis_Image_Vocab.Name'] = selectedValue3;
        // if (showComments) {
        //     jsonData[currentIndex]['Comments'] = comments;
        // } else {
        //     jsonData[currentIndex]['Comments'] = '';
        // }

        console.log("#saved ", currentIndex);
        console.log("#1:", jsonData[currentIndex]['Cup/Disk_Ratio'])
        console.log("#2:", jsonData[currentIndex]['Image_Quality_Vocab.Name'])
        console.log("#3:", jsonData[currentIndex]['Diagnosis_Image_Vocab.Name'])
        console.log("#4:", jsonData[currentIndex]['Comments'])
        console.log("#5:", showComments)


        // if (comments) {
        // if (jsonData[currentIndex]['Comments'] !== '' && currentIndex['Comments'] !== undefined) {
        //     console.log("4:", jsonData[currentIndex]['Comments'])
        // }

    }
    //#1-0.8-no
    //#2-0.9-no
    const handleValue1Change = (event) => {
        const selectedValue = event.target.value;
        setSelectedValue1(selectedValue);
        console.log("value 1 handle change:\nselectedValue:", selectedValue, "\nref:", element1Ref.current.value);

        // console.log("value1 change:", event.target.value);

        const updatedValue3 = selectedValue >= 0.6 ? "Suspected Glaucoma" : "No Glaucoma";
        setSelectedValue3(updatedValue3);
        // console.log("value1(", selectedValue, ")updates value3(", selectedValue3, ")");

        if ((selectedValue < 0.6 && updatedValue3 === "No Glaucoma") | (selectedValue >= 0.6 && updatedValue3 === "Suspected Glaucoma")) {
            console.log("no comments.")
            setComments('');
            setShowComments(false);

        } else {
            console.log("add comments!")
            setComments('');
            setShowComments(true);
        }
        // forceUpdate();
    }

    //Image Quality
    const handleValue2Change = (event) => {
        const selectedValue = event.target.value;
        setSelectedValue2(selectedValue);

        console.log("value 2 handle change:\nselectedValue:", selectedValue, "\nref:", element2Ref.current.value);
        // console.log("value2 change:", event.target.value);

        // forceUpdate();
    }

    //Diaognosis
    const handleValue3Change = (event) => {
        const selectedValue = event.target.value;
        setSelectedValue3(selectedValue);

        console.log("value 3 handle change:\nselectedValue:", selectedValue, "\nref:", element3Ref.current.value);
        // console.log("value3 change:", selectedValue);

        // console.log("value3 updates comments(", selectedValue, ")");
        if ((element1Ref.current.value >= 0.6 && selectedValue === "No Glaucoma") | (element1Ref.current.value < 0.6 && selectedValue === "Suspected Glaucoma")) {
            setShowComments(true);
            setComments('');
        } else {
            setShowComments(false);
            setComments('');
        }
        // forceUpdate();
        // if ((element1Ref.current.value >= 0.6 && selectedValue === "No Glaucoma") | (element1Ref.current.value < 0.6 && selectedValue === "Suspected Glaucoma")) {
        //     console.log("add comments!");
        //     if (currentObject['Comments'] === undefined | currentObject['Comments'] === '') {
        //         console.log("no preassigned comments")
        //         setShowComments(true);
        //         setComments('');
        //     } else if (currentObject['Comments'] !== '') {
        //         setComments(currentObject['Comments']);
        //     } else {
        //         setComments('');
        //     }

        // } else {
        //     console.log("no comments.")
        //     setComments(undefined);
        // }

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

    // const handleShowPanel = () => {
    //     setPanelVisibility(true);
    // }


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
        console.log('Trigger1:', v)
        element1Ref.current.value = v;
        handleValue1Change({ target: { value: v } })
        // setSelectedValue1(v)
        // forceUpdate();
    }
    const setValue2AndTrigger = (v) => {
        element2Ref.current.value = v;
        handleValue2Change({ target: { value: v } })
        // setSelectedValue2(v)
        // forceUpdate();

    }
    const setValue3AndTrigger = (v) => {
        element3Ref.current.value = v;
        handleValue3Change({ target: { value: v } })
        // setSelectedValue3(v)
        // forceUpdate();

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

                    <table className="center">
                        <tbody>
                            <tr key="image">
                                <td></td>
                                <td>
                                    <div className='image-container'>
                                        <MapInteractionCSS>
                                            {/* <ImageComponent imageUrl={imageUrl} /> */}
                                            <img className="myImage" src={imageUrl} alt='eye-ball' />
                                        </MapInteractionCSS>
                                        {/* <Zoom
                                        img={imageUrl}
                                        zoomScale={3}
                                        width="100%"
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
                                    <select value={selectedValue1} onChange={handleValue1Change} ref={element1Ref}>
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
                                    <select value={selectedValue3} onChange={handleValue3Change} ref={element3Ref}>
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
                                    <select value={selectedValue2} onChange={handleValue2Change} ref={element2Ref}>
                                        {dropdown2.map((option) => (
                                            <option key={option} value={option}>
                                                {option}
                                            </option>
                                        ))}
                                    </select>
                                </td>
                            </tr>

                            {showComments && (
                                <>
                                    <tr key="Comment">
                                        <td>Comments</td>
                                        <td>
                                            <textarea placeholder="Explain your decision here ..." value={comments}
                                                onChange={handleTextareaChange} ref={commentsRef}></textarea>
                                        </td>
                                    </tr>
                                </>
                            )}


                        </tbody>
                    </table>
                    {/* <div className="group">
                        <button onClick={showNextObject}>Next</button>
                    </div> */}

                    <div className="group">
                        <div className='vertical-items'>
                            <button>
                                {currentIndex + 1}/{jsonData.length}
                            </button>
                            <SliderComponent maxNum={numberMax} onSelect={handleSliderChange} value={currentIndex
                                + 1} />
                            {/* {isPanelVisible && (
                                <SliderComponent maxNum={numberMax} onSelect={handleSliderChange} />
                                // <NumberChooser data={numbers} onSelect={handleSelect} />
                            )} */}
                        </div>



                        <button onClick={showPreviousObject}>Previous</button>
                        <button onClick={showNextObject}>Next</button>


                    </div>

                </div>
            </HotKeys>
        </div>

    );
}

export default DetailsComponent;