
import Card from "@mui/material/Card";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Billing page components
import ListItem from "./listItem";
import { useEffect, useState } from "react";
import { getBehavioralAnalysis } from "api/parent";
function AnalysisList({ childId }) {
    //fetch previous analysis of the children from the database 
    const [prevAnalysis, setPrevAnalysis] = useState([]);
    useEffect(() => {
        const fetch = async () => {
            const data = await getBehavioralAnalysis(childId);
            setPrevAnalysis(data.data);
        }

        fetch();
    }, [childId])
    return (
        <Card id="delete-account">
            <SoftBox pt={3} px={2}>
                <SoftTypography variant="h4" fontWeight="medium" ml={3}>
                    Previous Analysis
                </SoftTypography>
            </SoftBox>
            <SoftBox pt={1} pb={2} px={2}>
                <SoftBox component="ul" display="flex" flexDirection="column" p={0} m={0}>

                    {
                        prevAnalysis.map((analysis, index) => {
                            return (
                                <ListItem
                                    key={index}
                                    name="Behvaorial Analysis"
                                    date={analysis.date}
                                    time={analysis.date}
                                    analysisId={analysis._id}
                                    childId={childId}
                                />
                            )
                        })
                    }



                    <ListItem
                        name="Behavioral Analysis"
                        date="March 17, 2024"
                        time="10:30 AM"
                    />
                    <ListItem
                        name="Behavioral Analysis"
                        date="January 28, 2024"
                        time="01:56 PM"
                    />
                    <ListItem
                        name="Behavioral Analysis"
                        date="February 12, 2024"
                        time="09:00 AM"
                    />
                </SoftBox>
            </SoftBox>
        </Card>
    );
}

export default AnalysisList;
