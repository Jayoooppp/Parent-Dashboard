import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from "react-router-dom";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import SoftBox from "components/SoftBox";
import PlatformSettings from 'layouts/profile/components/PlatformSettings';
import ProfileInfoCard from 'examples/Cards/InfoCards/ProfileInfoCard';
import Header from './Header';
import { getChildren, getUsageByChildren } from 'api/parent';

import SoftTypography from 'components/SoftTypography';
import GradientLineChart from 'examples/Charts/LineCharts/GradientLineChart';
import gradientLineChartData from 'layouts/dashboard/data/gradientLineChartData';
import Icon from "@mui/material/Icon";
import typography from "assets/theme/base/typography";
import CategoryWise from './Components/categoryWise';
import PieChart from './Components/pieChart';
import Activities from './Components/activities';
import SoftButton from 'components/SoftButton';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { customData } from 'layouts/dashboard/data/gradientLineChartData';
import { getLast5DaysUsage } from 'api/parent';

const ChildReport = () => {
    const { size } = typography;
    const childId = useParams().childId;
    const [report, setReport] = useState();
    const [totalUsage, setTotalUsage] = useState();
    const [categoryWiseUsage, setCategoryWiseUsage] = useState([]);
    const [children, setChildren] = useState();
    const [date, setDate] = useState(new Date());
    const [loading, setLoading] = useState(true);
    const [usageReport, setUsageReport] = useState([]);



    useEffect(() => {
        const fetch = async () => {
            await getUsageByChildren(childId, date).then((res) => {
                setTotalUsage(res.data.totalUsage);
                setCategoryWiseUsage(res.data.categoryWiseUsageArray);
                let options_data = [];
                res.data.categoryWiseUsageArray.map((category) => {
                    options_data.push({ y: Math.ceil((category.usage / res.data.totalUsage) * 100), label: category.name })
                })
                // setOptions({ ...options, data: [{ dataPoints: options_data }] });
                options.data[0].dataPoints = options_data;
                setOptions({ ...options });
                setLoading(false);
            }).catch((err) => {
                console.log(err);
            });
            await getChildren(childId).then((result) => {
                setChildren(result.data);
            });
            await getLast5DaysUsage(childId).then((result) => {
                let labels = [];
                let datasets = [{
                    label: "Usage",
                    color: "info",
                    data: []

                }];
                result?.data.map((child) => {
                    labels.push(new Date(child.date).toLocaleDateString());
                    datasets[0].data.push(Math.floor(child.totalUsage / 60) + (child.totalUsage % 60) * 0.01);
                })
                setUsageReport({ labels, datasets });
            })
        }
        fetch();
    }, [childId, date]);


    const [options, setOptions] = useState({
        theme: "light1", // "light1", "dark1", "dark2"
        title: {
            text: "Category Wise Usage Report Graph"
        },
        data: [{
            type: "pie",
            indexLabel: "{label}: {y} %",
            dataPoints: []
        }]
    });




    {/* Pass the date in all the components such that when date will change component will also get updated*/ }
    if (loading) {
        return (
            <>
                <DashboardLayout>
                    <Box sx={{ display: 'flex' }}>
                        <CircularProgress />
                    </Box>
                </DashboardLayout>
            </>
        )
    } else {
        return (
            <>

                <DashboardLayout>
                    <Header profile={children} />
                    <br />


                    <SoftTypography component="label" variant="h1" fontWeight="bold" mt={5}>
                        Child Report
                    </SoftTypography>
                    <SoftBox mt={5} mb={3} >
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={4} xl={4}>
                                <ProfileInfoCard title="Usage Information" profile={children} date={date} setDate={setDate} totalUsage={totalUsage} />
                            </Grid>
                            <Grid item xs={12} md={8} xl={8}>
                                <GradientLineChart
                                    title="Usage Report Overview"
                                    description={
                                        <SoftBox display="flex" alignItems="center">
                                            <SoftBox fontSize={size.lg} color="success" mb={0.3} mr={0.5} lineHeight={0}>
                                                {/* <Icon className="font-bold">arrow_upward</Icon> */}
                                            </SoftBox>
                                            <SoftTypography variant="button" color="text" fontWeight="medium">
                                                {/* 4% more{" "}
                                                <SoftTypography variant="button" color="text" fontWeight="regular">
                                                    in 2021
                                                </SoftTypography> */}
                                            </SoftTypography>
                                        </SoftBox>
                                    }
                                    height="20.25rem"
                                    chart={usageReport}
                                />
                            </Grid>
                        </Grid>
                    </SoftBox>
                    {/* Usage Report Category Wise */}
                    <SoftBox mt={5} mb={3}>
                        <Card>
                            <SoftTypography component="label" variant="h2" fontWeight="bold" p={3}>
                                Category Wise Report
                            </SoftTypography>
                            <CategoryWise categoryWiseUsage={categoryWiseUsage} totalUsage={totalUsage} mb={2} />
                            <PieChart options={options} />
                        </Card>
                    </SoftBox>


                    {/* Activites of the user */}
                    <SoftBox mt={5} mb={3}>
                        <SoftTypography component="label" variant="h2" fontWeight="bold" p={3}>
                            Child Activities
                        </SoftTypography>
                        <Activities date={date} />
                    </SoftBox>


                    {/* Behavioral Analysis */}
                    <div style={{ textAlign: "center", justifyContent: "center", cursor: "pointer" }}>
                        <SoftButton variant="gradient" color="secondary" >
                            <Link to={`/activity/behavioral-analysis/${childId}`}>
                                <SoftTypography component="label" variant="h4" fontWeight="bold">
                                    Behavioral Analysis&nbsp;
                                    <Icon>forward</Icon>
                                </SoftTypography>
                            </Link>
                        </SoftButton>
                    </div>

                </DashboardLayout>
            </>
        )
    }
}

export default ChildReport;