import React, {useState} from 'react';
import {Helmet} from 'react-helmet';
import Select from 'react-select'

import Chart from 'components/Chart';
import Layout from 'components/Layout';
import Container from 'components/Container';
import Mapbox from "../components/Mapbox";

const options = [
    {value: 'all', label: 'World'},
    {value: 'Brazil', label: 'Brazil'},
    {value: 'China', label: 'China'},
    {value: 'Japan', label: 'Japan'},
    {value: 'USA', label: 'USA'},
    {value: 'UK', label: 'UK'},
    {value: 'South Korea', label: 'South Korea'}
];


const GraphPage = () => {
    const [selectedValue, setSelectedValue] = useState('all');

    const handleChange = e => {
        setSelectedValue(e.value);
    };

    return (
        <Layout pageName="two">
            <Helmet>
                <title>Graphs</title>
            </Helmet>
            <Container type="content" className="text-center">
                <h2>Graphs of COVID Cases for Countries</h2>
                <Select
                    placeholder={"Select Country"}
                    value={options.find(obj => obj.value === selectedValue)}
                    options={options}
                    onChange={handleChange}
                />
                <Chart country={selectedValue}/>
                <Mapbox/>
            </Container>
        </Layout>
    );
};

export default GraphPage;
