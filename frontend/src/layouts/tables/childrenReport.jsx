import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import SoftBox from "components/SoftBox";
import PlatformSettings from 'layouts/profile/components/PlatformSettings';
import ProfileInfoCard from 'examples/Cards/InfoCards/ProfileInfoCard';
import Header from './Header';
import { getChildren, getChildrenUsageById } from 'api/parent';
import SoftTypography from 'components/SoftTypography';
import GradientLineChart from 'examples/Charts/LineCharts/GradientLineChart';
import gradientLineChartData from 'layouts/dashboard/data/gradientLineChartData';
import Icon from "@mui/material/Icon";
import typography from "assets/theme/base/typography";


const ChildReport = () => {
    const { size } = typography;
    const userId = useParams().childId;
    const [report, setReport] = useState();
    const [children, setChildren] = useState();
    useEffect(() => {
        const fetch = async () => {
            await getChildrenUsageById(userId).then((res) => {
                setReport(res);
            });
            await getChildren(userId).then((result) => {
                setChildren(result);
            });
        }
        fetch();
    }, []);
    return (
        <DashboardLayout>
            <Header profile={children} />
            <br />
            <SoftTypography component="label" variant="h2" fontWeight="bold" mt={10}>
                Child Report
            </SoftTypography>
            <SoftBox mt={5} mb={3} >
                <Grid container spacing={3}>
                    <Grid item xs={12} md={4} xl={4}>
                        <ProfileInfoCard title="Usage Information" profile={children} />
                    </Grid>
                    <Grid item xs={12} md={8} xl={8}>
                        <GradientLineChart
                            title="Usage Report Overview"
                            description={
                                <SoftBox display="flex" alignItems="center">
                                    <SoftBox fontSize={size.lg} color="success" mb={0.3} mr={0.5} lineHeight={0}>
                                        <Icon className="font-bold">arrow_upward</Icon>
                                    </SoftBox>
                                    <SoftTypography variant="button" color="text" fontWeight="medium">
                                        4% more{" "}
                                        <SoftTypography variant="button" color="text" fontWeight="regular">
                                            in 2021
                                        </SoftTypography>
                                    </SoftTypography>
                                </SoftBox>
                            }
                            height="20.25rem"
                            chart={gradientLineChartData}
                        />
                    </Grid>
                </Grid>
            </SoftBox>

        </DashboardLayout >
    )
}

export default ChildReport;