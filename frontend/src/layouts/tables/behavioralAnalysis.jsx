import SoftBox from 'components/SoftBox'
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout'
import DashboardNavbar from 'examples/Navbars/DashboardNavbar'
import React from 'react'
import AnalysisList from './Components/analysisList'
import AnalysisRules from './Components/analysisRules'

const BehavioralAnalysis = () => {
    // Get the data from the server and display it in the table
    return (
        <>
            <DashboardLayout>
                <DashboardNavbar />
                <AnalysisRules />
                <AnalysisList /> {/** Pass the analysis results  */}
            </DashboardLayout>
        </>
    )
}

export default BehavioralAnalysis