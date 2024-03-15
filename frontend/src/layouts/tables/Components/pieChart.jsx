import SoftBox from 'components/SoftBox'
import React from 'react'
import CanvasJSReact from '@canvasjs/react-charts';

const PieChart = ({ options }) => {
    console.log(options)
    var CanvasJSChart = CanvasJSReact.CanvasJSChart;
    return (
        <SoftBox p={2}>
            <CanvasJSChart options={options} />
        </SoftBox>
    )


}

export default PieChart;

