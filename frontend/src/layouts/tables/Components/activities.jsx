import SoftBox from 'components/SoftBox';
import React, { useEffect } from 'react'
import SoftPagination from 'components/SoftPagination';
import Icon from "@mui/material/Icon";
import Card from "@mui/material/Card";
import Table from 'examples/Tables/Table';
import SoftTypography from 'components/SoftTypography';
import authorsTableData, { Author, Function } from '../data/authorsTableData';
import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { useParams } from 'react-router-dom';
import "./App.css";
import { Categories } from 'data';
import SoftBadge from 'components/SoftBadge';
import { getActivitiesByDate } from 'api/parent';
import entry from "assets/images/entry.png";


const Activities = ({ date }) => {
    // Get the data from passing the conditions and convert it to authorsTableData format
    const columns = [
        { name: "Request", align: "left" },
        { name: "Category", align: "left" },
        { name: "Access", align: "center" },
        { name: "Timestamp", align: "center" },
    ];
    const getTimeAndDate = (date) => {
        // set random time for testing but keep the date same
        let d = new Date(date);
        d.setHours(Math.floor(Math.random() * 24));
        d.setMinutes(Math.floor(Math.random() * 60));
        d.setSeconds(Math.floor(Math.random() * 60));

        let time = d.toLocaleTimeString();
        let date1 = d.toLocaleDateString();
        return `${date1} ${time}`;
    }


    const [rows, setRows] = useState([]);
    const childId = useParams().childId;
    const [category, setCategories] = useState('all');
    const handleCategoryChange = (e) => {
        setCategories(e.target.value);
    }
    const [access, setAccess] = useState('all');
    const handleAccessChange = (e) => {
        setAccess(e.target.value);
    }
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const fetchData = async () => {
            const { data } = await getActivitiesByDate(childId, date, category, access, currentPage);
            console.log(data);
            const newRows = data.activities.map((row) => {
                return {
                    Request: <Author image={entry} name={row.request} />,
                    Category: <Function job={row.category} />,
                    Access: (
                        <SoftBadge variant="gradient" badgeContent={row.access} color={row.access === "Allowed" ? "success" : row.access === "Partially Allowed" ? "primary" : "error"} size="xs" container />
                    ),
                    Timestamp: (
                        <SoftTypography variant="caption" color="secondary" fontWeight="medium">
                            {getTimeAndDate(row.date)}
                        </SoftTypography>
                    ),

                }
            })
            setTotalPages(data.totalPages);
            setRows(newRows);
        }
        fetchData();
    }, [category, access, date, currentPage]);
    return (
        <div>
            <div className="outer">
                <div className='inner'>
                    <SoftTypography variant="h4">Accees:</SoftTypography>&nbsp;
                    <Form.Select value={access} onChange={handleAccessChange}>
                        <option value="all">All</option>
                        <option value="Allowed">Allowed</option>
                        <option value="Not Allowed">Not Allowed</option>
                    </Form.Select>
                </div>
                <div className='inner'>
                    <SoftTypography variant="h4">Category:</SoftTypography>&nbsp;
                    <Form.Select value={category} onChange={handleCategoryChange}>
                        <option value="all">All</option>
                        {
                            Categories && Categories.map((category, index) => {
                                return <option value={category} key={index}>{category}</option>
                            })
                        }
                    </Form.Select>
                </div>
            </div>

            <SoftBox>
                <Card>
                    <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
                        <SoftTypography variant="h6">Activities table</SoftTypography>
                    </SoftBox>
                    <SoftBox
                        sx={{
                            "& .MuiTableRow-root:not(:last-child)": {
                                "& td": {
                                    borderBottom: ({ borders: { borderWidth, borderColor } }) =>
                                        `${borderWidth[1]} solid ${borderColor}`,
                                },
                            },
                        }}
                    >
                        <Table columns={columns} rows={rows} />
                    </SoftBox>
                </Card>
            </SoftBox>
            <SoftBox p={1} left>
                <SoftPagination >
                    <SoftPagination item onClick={() => {
                        setCurrentPage((currentPage - 1 > 0) ? currentPage - 1 : 1)
                    }}>
                        <Icon>keyboard_arrow_left</Icon>
                    </SoftPagination>
                    {
                        Array.from({ length: totalPages }, (_, index) => {
                            return (
                                <SoftPagination key={index} item active={currentPage === index + 1} onClick={() => setCurrentPage(index + 1)}>
                                    {index + 1}
                                </SoftPagination>
                            )
                        })

                    }
                    <SoftPagination item onClick={() => {
                        setCurrentPage((currentPage + 1 <= totalPages) ? currentPage + 1 : totalPages)
                    }}>
                        <Icon>keyboard_arrow_right</Icon>
                    </SoftPagination>
                </SoftPagination>
            </SoftBox>
        </div>
    )
}

export default Activities;