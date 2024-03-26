
import Card from "@mui/material/Card";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Billing page components
import ListItem from "./listItem";
function AnalysisList() {
    return (
        <Card id="delete-account">
            <SoftBox pt={3} px={2}>
                <SoftTypography variant="h4" fontWeight="medium" ml={3}>
                    Previous Analysis
                </SoftTypography>
            </SoftBox>
            <SoftBox pt={1} pb={2} px={2}>
                <SoftBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
                    <ListItem
                        name="oliver liam"
                        date="March 17, 2023"
                        time="10:30 AM"
                    />
                    <ListItem
                        name="lucas harper"
                        date="January 28, 2024"
                        time="01:56 PM"
                    />
                    <ListItem
                        name="ethan james"
                        date="February 12, 2024"
                        time="09:00 AM"
                    />
                </SoftBox>
            </SoftBox>
        </Card>
    );
}

export default AnalysisList;
