import React, { useState } from 'react'
import Card from "@mui/material/Card";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import { Table } from 'react-bootstrap';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';
import { Button } from 'react-bootstrap';
import { getChildren } from 'api/parent';
import { getRules } from 'Constants';


const AnalysisRules = ({ childId }) => {
    const marks = [
        {
            value: 2,
            label: '2',
        },
        {
            value: 30,
            label: '20',
        },
        {
            value: 60,
            label: '40',
        },
        {
            value: 98,
            label: '98',
        },
    ];
    const [value, setValue] = React.useState([20, 37]);
    const [children, setChildren] = useState();
    const [Rules, setRules] = useState([]);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const [customRules, setCustomRules] = useState(true);
    const handleCheckBox = () => {
        setCustomRules(!customRules);
    };

    const handleSaveRules = () => {

    }



    useEffect(() => {
        // get children by id
        const fetch = async () => {
            await getChildren(childId).then((result) => {
                setCustomRules(result.data.customRules);
                if (result.data.customRules) {
                    setRules(result.data.rules);
                } else {
                    setRules(getRules(result.data.age));
                }
                setChildren(result.data);
            });
        }
        fetch();
    }, [])

    return (
        <>
            <Card id="delete-account" style={{ marginBottom: "20px" }}>
                <SoftBox pt={3} px={2}>
                    <SoftTypography variant="h4" fontWeight="medium" ml={3} mb={3}>
                        Analysis Rules
                    </SoftTypography>

                    <FormControl
                        required
                        component="fieldset"
                        sx={{ m: 3 }}
                        variant="standard"
                        style={{ "marginTop": "10px" }}
                    >
                        <FormGroup>
                            <FormControlLabel
                                control={<Checkbox checked={customRules} onChange={handleCheckBox} />}
                                label="Custom Rules"
                            />
                        </FormGroup>
                    </FormControl>
                    {/* { 
                        
                    } */}
                    {/* maker border darker */}
                    <Table bordered responsive hover style={{ border: "2px solid", pointerEvents: customRules ? "auto" : "none" }}
                    >
                        <thead>
                            <tr>
                                <th>
                                    #
                                </th>
                                <th>
                                    Minimal
                                </th>
                                <th>
                                    Moderate
                                </th>
                                <th>
                                    Extensive
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">
                                    Good Content
                                </th>
                                <td>
                                    0% to 10%
                                </td>
                                <td>
                                    <Typography id="non-linear-slider" gutterBottom>
                                        {value[0]}% to {value[1]}%
                                    </Typography>

                                    <Slider
                                        getAriaLabel={() => 'Temperature range'}
                                        value={value}
                                        defaultValue={20}
                                        onChange={handleChange}
                                        valueLabelDisplay="auto"
                                        disableSwap
                                        min={2}
                                        max={98}
                                        aria-label="Small"
                                        size="small"
                                        marks={marks}
                                    />
                                </td>
                                <td>
                                    80% to 100%
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">
                                    Entertainment <b /> Content
                                </th>
                                <td>
                                    0% to 20%
                                </td>
                                <td>
                                    <Typography id="non-linear-slider" gutterBottom>
                                        {value[0]}% to {value[1]}%
                                    </Typography>
                                    <Slider
                                        getAriaLabel={() => 'Temperature range'}
                                        value={value}
                                        defaultValue={20}
                                        onChange={handleChange}
                                        valueLabelDisplay="auto"
                                        disableSwap
                                        min={2}
                                        max={98}
                                        aria-label="Small"
                                        size="small"
                                        marks={marks}


                                    />
                                </td>
                                <td>
                                    80% to 100%
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">
                                    Inappropriate <b /> Content
                                </th>
                                <td>
                                    0% to 30%
                                </td>
                                <td>
                                    <Typography id="non-linear-slider" gutterBottom>
                                        {value[0]}% to {value[1]}%
                                    </Typography>
                                    <Slider
                                        getAriaLabel={() => 'Temperature range'}
                                        value={value}
                                        defaultValue={20}
                                        onChange={handleChange}
                                        valueLabelDisplay="auto"
                                        disableSwap
                                        min={2}
                                        max={98}
                                        aria-label="Small"
                                        size="small"
                                        marks={marks}


                                    />
                                </td>
                                <td>
                                    80% to 100%
                                </td>
                            </tr>
                        </tbody>
                    </Table>

                    <div style={{ padding: '10px' }}>
                        <Button
                            onClick={handleSaveRules}
                            color="primary"
                        >
                            Save Rules
                        </Button>
                    </div>
                </SoftBox>
            </Card >
        </>
    )
}

export default AnalysisRules;