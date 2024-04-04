import React, { useEffect, useState } from 'react'
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
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import { updateChildren } from 'api/parent';


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
    const [rules, setRules] = useState([]);
    const [loading, setLoading] = useState(true);

    const handleChange = (newValue, index) => {
        console.log(newValue, index);
        rules[index][1] = newValue[0] - 1;
        rules[index][2] = newValue[1];
        setRules([...rules]);
    };

    const [customRules, setCustomRules] = useState(true);
    const handleCheckBox = () => {
        if (customRules) {
            setRules(getRules(children?.age));
        } else {
            setRules(children?.rules);
        }
        setCustomRules(!customRules);
    };

    const handleSaveRules = async () => {
        setLoading(true);
        await updateChildren(childId, { rules: rules, customRules: customRules }).then((result) => {
            setChildren(result.data);
            setLoading(false);
        }).catch((error) => {
            console.log(error);
        }
        )

    }




    useEffect(() => {
        // get children by id
        const fetch = async () => {
            await getChildren(childId).then((result) => {
                console.log(result);
                setCustomRules(result.data.customRules);
                if (result.data.customRules) {
                    setRules(result.data.rules);
                } else {
                    setRules(getRules(result.data.age));
                }
                setChildren(result.data);
                setLoading(false);
            }).catch((error) => {
                console.log(error);
            });
        }
        fetch();
    }, [])
    console.log(rules);


    if (loading) {
        return (
            <>
                <DashboardLayout>
                    <Box sx={{ display: 'flex' }}>
                        <CircularProgress />
                    </Box>
                </DashboardLayout>
            </>
        )
    } else {
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
                                        Inappropriate Content
                                    </th>
                                    <td>
                                        {rules[0][0]}% to {rules[0][1]}%
                                    </td>
                                    <td>
                                        <Typography id="non-linear-slider" gutterBottom>
                                            {rules[0][1] + 1}% to {rules[0][2]}%
                                        </Typography>

                                        <Slider
                                            getAriaLabel={() => 'Temperature range'}
                                            value={[rules[0][1] + 1, rules[0][2]]}
                                            defaultValue={20}
                                            onChange={(event) => {
                                                handleChange(event.target.value, 0)
                                            }}
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
                                        {rules[0][2] + 1}% to 100%
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row">
                                        Entertainment <b /> Content
                                    </th>
                                    <td>
                                        {rules[1][0]}% to {rules[1][1]}%
                                    </td>
                                    <td>
                                        <Typography id="non-linear-slider" gutterBottom>
                                            {rules[1][1] + 1}% to {rules[1][2]}%
                                        </Typography>
                                        <Slider
                                            getAriaLabel={() => 'Temperature range'}
                                            value={[rules[1][1] + 1, rules[1][2]]}
                                            defaultValue={20}
                                            onChange={(event) => {
                                                handleChange(event.target.value, 1)
                                            }}
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
                                        {rules[1][2] + 1}% to 100%
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row">
                                        Good <b /> Content
                                    </th>
                                    <td>
                                        {rules[2][0]}% to {rules[2][1]}%
                                    </td>
                                    <td>
                                        <Typography id="non-linear-slider" gutterBottom>
                                            {rules[2][1] + 1}% to {rules[2][2]}%
                                        </Typography>
                                        <Slider
                                            getAriaLabel={() => 'Temperature range'}
                                            value={[rules[2][1] + 1, rules[2][2]]}
                                            defaultValue={20}
                                            onChange={(event) => {
                                                handleChange(event.target.value, 2)
                                            }}
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
                                        {rules[2][2] + 1}% to 100%
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
}

export default AnalysisRules;