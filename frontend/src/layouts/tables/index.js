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

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import { useState, useEffect } from "react";
// Soft UI Dashboard React components
import { useNavigate } from "react-router-dom";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Table from "examples/Tables/Table";
import MiniStatisticsCard from "examples/Cards/StatisticsCards/MiniStatisticsCard";

// Data
import projectsTableData from "layouts/tables/data/projectsTableData";
import { Childrens } from "data";
import boxShadow from "assets/theme/functions/boxShadow";

function Tables() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile"))?.user)
  const { columns: prCols, rows: prRows } = projectsTableData;
  const navigate = useNavigate();
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("profile"))?.user)
    if (!user) {
      navigate("/signIn")
    }
  }, [])
  const minToHourAndMin = (min) => {
    let hours = Math.floor(min / 60);
    let minutes = min % 60;
    return `${hours}h ${minutes}m`;
  }
  return (
    <>
      <DashboardLayout>
        <DashboardNavbar />
        <SoftBox py={3}>
          <SoftBox x mb={3}>
            <Card>

              <Grid container spacing={3}>
                {
                  Childrens.map((child) => {
                    return (
                      <Grid item xs={12} sm={6} md={6} key={child.id}>
                        <div style={{ margin: "20px", cursor: "pointer" }} onClick={() => {
                          navigate(`/activity/${child.id}`)
                        }}>
                          <MiniStatisticsCard
                            title={{ text: `${child.name} | ${child.age} | ${child.gender}` }}
                            count={`Usage : ${minToHourAndMin(child.usage)}`}
                            icon={{ color: "info", component: `${child.gender === "Male" ? "boy" : "girl"}` }}

                          />
                        </div>
                      </Grid>
                    )
                  }
                  )}
              </Grid>
            </Card>

          </SoftBox>
        </SoftBox>

      </DashboardLayout>
    </>
  );
}

export default Tables;
