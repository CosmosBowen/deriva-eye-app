import React from 'react';


const SliderComponent = ({ maxNum, onSelect, value }) => {
    // const [value, setValue] = useState(1);

    const handleChange = (event) => {
        const number = event.target.value;
        // setValue(Number(number));
        onSelect(Number(number));
        console.log("Slider change to: ", number)
    };

    return (
        <input
            type="range"
            min="1"
            max={maxNum}
            value={value}
            onChange={handleChange}
            style={{ width: '100%' }}
            className="custom-slider"
        />
    );
};

export default SliderComponent;
