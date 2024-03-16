import SoftBox from 'components/SoftBox';
import React from 'react'
import SoftPagination from 'components/SoftPagination';
import Icon from "@mui/material/Icon";
import Card from "@mui/material/Card";
import Table from 'examples/Tables/Table';
import SoftTypography from 'components/SoftTypography';
import authorsTableData from '../data/authorsTableData';
import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import "./App.css";
import { Categories } from 'data';

const Activities = () => {
    // Get the data from passing the conditions and convert it to authorsTableData format
    const { columns, rows } = authorsTableData;
    const [category, setCategories] = useState('all');
    const handleCategoryChange = (e) => {
        setCategories(e.target.value);
    }
    const [access, setAccess] = useState('all');
    const handleAccessChange = (e) => {
        setAccess(e.target.value);
    }

    const totalPages = 5;
    const entriesPerPage = 10;
    const [currentPage, setCurrentPage] = useState(1);
    return (
        <div>
            <div className="outer">
                <div className='inner'>
                    <SoftTypography variant="h4">Accees:</SoftTypography>&nbsp;
                    <Form.Select value={access} onChange={handleAccessChange}>
                        <option value="all">All</option>
                        <option value="allowed">Allowed</option>
                        <option value="not allowed">Not Allowed</option>
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