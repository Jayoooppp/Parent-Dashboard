import SoftBox from 'components/SoftBox'
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout'
import DashboardNavbar from 'examples/Navbars/DashboardNavbar'
import React from 'react'
import AnalysisList from './Components/analysisList'
import AnalysisRules from './Components/analysisRules'
import { Link, useParams } from 'react-router-dom';
import SoftButton from 'components/SoftButton'
import SoftTypography from 'components/SoftTypography'
import { Icon } from '@mui/material'
import axios from 'axios'
import { performBehavioralAnalysis } from 'api/parent'
import { useNavigate } from 'react-router-dom'
const BehavioralAnalysis = () => {
    // Get the data from the server and display it in the table
    const childId = useParams().childId;
    const navigate = useNavigate();

    const handleAnalysis = async () => {
        // Perform the analysis
        const res = await performBehavioralAnalysis(childId);
        if (res.data._id) {
            navigate(`result/${res.data._id}`);
        } else {
            alert("Analysis failed")
        }

    }

    return (
        <>
            <DashboardLayout>
                <DashboardNavbar />
                <AnalysisRules childId={childId} />
                <div onClick={handleAnalysis} style={{ textAlign: "center", justifyContent: "center", marginBottom: '20px' }}>
                    <SoftButton variant="gradient" color="secondary" style={{ cursor: 'pointer' }}>
                        <SoftTypography component="label" variant="h5" fontWeight="bold" >
                            Perform Behavioral Analysis&nbsp;
                            <Icon>forward</Icon>
                        </SoftTypography>
                    </SoftButton>
                </div>
                <AnalysisList childId={childId} /> {/** Pass the analysis results  */}
            </DashboardLayout >
        </>
    )
}

export default BehavioralAnalysis