import React, { useEffect, useState } from 'react'
// import { analysisResult } from 'data';
import SoftBox from 'components/SoftBox';
import SoftTypography from 'components/SoftTypography';
import Grid from "@mui/material/Grid";
import MiniStatisticsCard from 'examples/Cards/StatisticsCards/MiniStatisticsCard';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import { useParams } from 'react-router-dom';
import { getBehavioralAnalysisById } from 'api/parent';

const Result = () => {
    const convertDate = (date) => {
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        return new Date(date).toLocaleDateString(undefined, options);
    }

    const convertDateToTime = (date) => {
        const options = { hour: 'numeric', minute: 'numeric', second: 'numeric' };
        return new Date(date).toLocaleTimeString(undefined, options);
    }
    const analysisId = useParams().analysisId;


    const [analysisResult, setAnalysisResult] = useState({});
    useEffect(() => {
        const fetch = async () => {
            const data = await getBehavioralAnalysisById(analysisId);
            setAnalysisResult(data.data);
        }
        fetch();
    }, [analysisId])
    console.log(analysisResult)



    return (
        <DashboardLayout>
            <DashboardNavbar />
            <SoftBox p={2} mb={2}>
                <SoftTypography component="label" variant="h2" fontWeight="bold" p={3}>
                    Analysis Results
                </SoftTypography>
                <SoftTypography component="label" variant="h2" fontWeight="bold" p={3}>
                    {convertDate(analysisResult.date)} - {convertDateToTime(analysisResult.date)}
                </SoftTypography>

                <Grid container spacing={3} justify="center">
                    {
                        // analysisResult?.analysis is object not array so we can't use map function on it
                        analysisResult?.analysis && Object.keys(analysisResult.analysis).map((key, i) => {
                            return (
                                <Grid item xs={6} sm={6} md={4} key={i}>
                                    <div>
                                        <MiniStatisticsCard
                                            title={{ text: key, fontweight: "bold" }}
                                            count={analysisResult.analysis[key]}
                                            icon={{ color: "dark", component: "language" }}
                                            bgColor={analysisResult.analysis[key] === "Extensive" ? "error" : analysisResult.analysis[key] === "Moderate" ? "warning" : "success"}

                                        />
                                    </div>
                                </Grid>
                            )
                        }
                        )
                    }

                </Grid>

            </SoftBox>
        </DashboardLayout>
    )
}

export default Result;