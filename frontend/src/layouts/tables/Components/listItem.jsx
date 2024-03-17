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

function ListItem({ name, company, email, vat, noGutter }) {
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
                            navigate("/activity/behavioral-analysis/1/result/1");
                        }}>
                            <Icon>visibility</Icon>&nbsp;view
                        </SoftButton>
                    </SoftBox>
                </SoftBox>
                <SoftBox mb={1} lineHeight={0}>
                    <SoftTypography variant="caption" color="text">
                        Company Name:&nbsp;&nbsp;&nbsp;
                        <SoftTypography variant="caption" fontWeight="medium" textTransform="capitalize">
                            {company}
                        </SoftTypography>
                    </SoftTypography>
                </SoftBox>
                <SoftBox mb={1} lineHeight={0}>
                    <SoftTypography variant="caption" color="text">
                        Email Address:&nbsp;&nbsp;&nbsp;
                        <SoftTypography variant="caption" fontWeight="medium">
                            {email}
                        </SoftTypography>
                    </SoftTypography>
                </SoftBox>
                <SoftTypography variant="caption" color="text">
                    VAT Number:&nbsp;&nbsp;&nbsp;
                    <SoftTypography variant="caption" fontWeight="medium">
                        {vat}
                    </SoftTypography>
                </SoftTypography>
            </SoftBox>
        </SoftBox>
    );
}


export default ListItem;
