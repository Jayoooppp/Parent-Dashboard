import SoftBox from 'components/SoftBox'
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout'
import DashboardNavbar from 'examples/Navbars/DashboardNavbar'
import React from 'react'
import AnalysisList from './Components/analysisList'

const BehavioralAnalysis = () => {
    // Get the data from the server and display it in the table
    return (
        <>
            <DashboardLayout>
                <DashboardNavbar />
                <AnalysisList /> {/** Pass the analysis results  */}
            </DashboardLayout>
        </>
    )
}

export default BehavioralAnalysis