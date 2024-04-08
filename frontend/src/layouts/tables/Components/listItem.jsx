/**
=========================================================
* Soft UI Dashboard React - v4.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Icon from "@mui/material/Icon";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftButton from "components/SoftButton";
import { useNavigate } from "react-router-dom";

function ListItem({ name, company, email, vat, noGutter, date, time, childId, analysisId }) {
    const convertDate = (date) => {
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        return new Date(date).toLocaleDateString(undefined, options);
    }

    const convertDateToTime = (date) => {
        const options = { hour: 'numeric', minute: 'numeric', second: 'numeric' };
        return new Date(date).toLocaleTimeString(undefined, options);
    }
    const navigate = useNavigate();
    return (
        <SoftBox
            component="li"
            display="flex"
            justifyContent="space-between"
            alignItems="flex-start"
            bgColor="grey-100"
            borderRadius="lg"
            p={3}
            mb={noGutter ? 0 : 1}
            mt={2}
        >
            <SoftBox width="100%" display="flex" flexDirection="column">
                <SoftBox
                    display="flex"
                    justifyContent="space-between"
                    alignItems={{ xs: "flex-start", sm: "center" }}
                    flexDirection={{ xs: "column", sm: "row" }}
                    mb={2}
                >
                    <SoftTypography variant="button" fontWeight="medium" textTransform="capitalize">
                        {name}
                    </SoftTypography>

                    <SoftBox
                        display="flex"
                        alignItems="center"
                        mt={{ xs: 2, sm: 0 }}
                        ml={{ xs: -1.5, sm: 0 }}
                    >
                        <SoftBox mr={1}>
                            <SoftButton variant="text" color="error" onClick={() => {

                            }}>
                                <Icon>delete</Icon>&nbsp;delete
                            </SoftButton>
                        </SoftBox>
                        <SoftButton variant="text" color="info" onClick={() => {
                            console.log("View Button Clickd!")
                            navigate(`/activity/behavioral-analysis/${childId}/result/${analysisId}`);
                        }}>
                            <Icon>visibility</Icon>&nbsp;view
                        </SoftButton>
                    </SoftBox>
                </SoftBox>
                <SoftBox mb={1} lineHeight={0}>
                    <SoftTypography variant="caption" color="text">
                        Date:&nbsp;{convertDate(date)}
                        <SoftTypography variant="caption" fontWeight="medium" textTransform="capitalize">
                            {company}
                        </SoftTypography>
                    </SoftTypography>
                </SoftBox>
                <SoftBox mb={1} lineHeight={0}>
                    <SoftTypography variant="caption" color="text">
                        Time:&nbsp;{convertDateToTime(time)}
                        <SoftTypography variant="caption" fontWeight="medium">
                            {email}
                        </SoftTypography>
                    </SoftTypography>
                </SoftBox>
            </SoftBox>
        </SoftBox>
    );
}


export default ListItem;
