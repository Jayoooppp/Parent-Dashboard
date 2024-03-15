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

// react-routers components
import { Link } from "react-router-dom";

// prop-types is library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Tooltip from "@mui/material/Tooltip";
import Icon from "@mui/material/Icon";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Soft UI Dashboard React base styles
import colors from "assets/theme/base/colors";
import typography from "assets/theme/base/typography";
import DatePicker from "react-datepicker";

import { useNavigate } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import { useState } from "react";
import "./style.css";
function ProfileInfoCard({ title, info, social, profile }) {
  const labels = [];
  const values = [];
  const { socialMediaColors } = colors;
  const { size } = typography;

  // 15/03/2024 to 15 March 2024
  const convertDate = (date) => {
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return new Date(date).toLocaleDateString(undefined, options);
  }


  const [date, setDate] = useState(new Date());
  const usage = 1234;
  const navigate = useNavigate();


  return (
    <Card sx={{ height: "80%" }}>
      <SoftBox display="flex" justifyContent="space-between" alignItems="center" pt={2} px={2}>
        <SoftTypography variant="h4" fontWeight="hard" textTransform="capitalize">
          {title}
        </SoftTypography>
      </SoftBox>
      <SoftBox p={2}>
        <SoftBox>
          <SoftTypography variant="h5" fontWeight="hard" textAlign="justify">
            Date:
          </SoftTypography>
          <SoftBox p={1}>
            <DatePicker
              selected={date}
              onChange={(date) => setDate(date)}
              wrapperClassName="datePicker" />
          </SoftBox>
        </SoftBox>
      </SoftBox>
      <SoftBox p={2}>
        <SoftTypography >Internt Usage of <b>{profile?.name}</b> is </SoftTypography>
        <SoftTypography ><b>{Math.floor(usage / 60)}</b> Hrs <b>{usage % 60}</b> Min</SoftTypography>
        <SoftTypography >on <b>{convertDate(date)}</b> </SoftTypography>
      </SoftBox>
      <SoftTypography
        component="a"
        href="#"
        variant="button"
        color="text"
        fontWeight="medium"
        p={2}
        sx={{
          mt: "auto",
          mr: "auto",
          display: "inline-flex",
          alignItems: "center",
          cursor: "pointer",

          "& .material-icons-round": {
            fontSize: "1.125rem",
            transform: `translate(2px, -0.5px)`,
            transition: "transform 0.2s cubic-bezier(0.34,1.61,0.7,1.3)",
          },

          "&:hover .material-icons-round, &:focus  .material-icons-round": {
            transform: `translate(6px, -0.5px)`,
          },
        }}
        onClick={() => {
          navigate("/#categories");
        }}
      >
        Show More
        <Icon sx={{ fontWeight: "bold" }}>arrow_forward</Icon>
      </SoftTypography>
    </Card >
  );
}


export default ProfileInfoCard;
