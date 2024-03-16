import SoftBox from 'components/SoftBox'
import React from 'react'
import Grid from "@mui/material/Grid";
import MiniStatisticsCard from 'examples/Cards/StatisticsCards/MiniStatisticsCard'
const minToHourAndMin = (min, total) => {
    let hours = Math.floor(min / 60);
    let minutes = min % 60;
    return `${hours}h ${minutes}m (${(min / total) * 100} %)`;
}

const CategoryWise = ({ report }) => {
    return (
        <SoftBox p={2} mb={2}>
            <Grid container spacing={3} justify="center">
                {
                    report?.categories && report?.categories.map((data, i) => {
                        return (
                            <Grid item xs={6} sm={6} md={4} key={i}>
                                <div>
                                    <MiniStatisticsCard
                                        title={{ text: data.name, fontweight: "bold" }}
                                        count={`Usage : ${minToHourAndMin(data.usage, report?.totalUsage)}`}
                                        icon={{ color: "dark", component: "paid" }}
                                        bgColor="light"

                                    />
                                </div>
                            </Grid>
                        )
                    }
                    )}
            </Grid>

        </SoftBox>
    )
}

export default CategoryWise