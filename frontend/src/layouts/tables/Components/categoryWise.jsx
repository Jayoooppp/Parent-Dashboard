import SoftBox from 'components/SoftBox'
import React from 'react'
import Grid from "@mui/material/Grid";
import MiniStatisticsCard from 'examples/Cards/StatisticsCards/MiniStatisticsCard'
const minToHourAndMin = (min, total) => {
    let hours = Math.floor(min / 60);
    let minutes = min % 60;
    return `${hours}h ${minutes}m (${Math.ceil((min / total) * 100)} %)`;
}

const CategoryWise = ({ categoryWiseUsage, totalUsage }) => {
    return (
        <SoftBox p={2} mb={2}>
            <Grid container spacing={3} justify="center">
                {
                    categoryWiseUsage && categoryWiseUsage.map((data, i) => {
                        return (
                            <Grid item xs={6} sm={6} md={4} key={i}>
                                <div>
                                    <MiniStatisticsCard
                                        title={{ text: data.name, fontweight: "bold" }}
                                        count={`Usage : ${minToHourAndMin(data.usage, totalUsage)}`}
                                        icon={{ color: "dark", component: "language" }}
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