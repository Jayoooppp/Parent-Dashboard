import React from 'react'
import { analysisResults } from 'data';
import SoftBox from 'components/SoftBox';
import SoftTypography from 'components/SoftTypography';
import Grid from "@mui/material/Grid";
import MiniStatisticsCard from 'examples/Cards/StatisticsCards/MiniStatisticsCard';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';

const Result = () => {
    const convertDate = (date) => {
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        return new Date(date).toLocaleDateString(undefined, options);
    }

    const convertDateToTime = (date) => {
        const options = { hour: 'numeric', minute: 'numeric', second: 'numeric' };
        return new Date(date).toLocaleTimeString(undefined, options);
    }
    console.log(analysisResults)
    return (
        <DashboardLayout>
            <DashboardNavbar />
            <SoftBox p={2} mb={2}>
                <SoftTypography component="label" variant="h2" fontWeight="bold" p={3}>
                    Analysis Results
                </SoftTypography>
                <SoftTypography component="label" variant="h2" fontWeight="bold" p={3}>
                    {convertDate(analysisResults.date)} - {convertDateToTime(analysisResults.date)}
                </SoftTypography>

                <Grid container spacing={3} justify="center">
                    {
                        analysisResults?.analysis && analysisResults?.analysis.map((data, i) => {
                            return (
                                <Grid item xs={6} sm={6} md={4} key={i}>
                                    <div>
                                        <MiniStatisticsCard
                                            title={{ text: data.key, fontweight: "bold" }}
                                            count={`Analysis : ${data.value}`}
                                            icon={{ color: "dark", component: "attachment" }}
                                            bgColor={data.value === "Extensive" ? "error" : data.value === "Moderate" ? "warning" : "success"}
                                        />
                                    </div>
                                </Grid>
                            )
                        }
                        )}
                </Grid>

            </SoftBox>
        </DashboardLayout>
    )
}

export default Result;