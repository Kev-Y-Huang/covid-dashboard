import React, {useState} from 'react';
import {Helmet} from 'react-helmet';
import Select from 'react-select'

import Layout from 'components/Layout';
import Container from 'components/Container';
import CountryChart from '../components/CountryChart';
import StateChart from '../components/StateChart';

let countryOptions = [
    {value: 'all', label: 'World'}
];

const countriesData = require("../assets/data/countries.json");

countriesData.forEach(country => countryOptions.push({
    value: country.name,
    label: country.name
}));

let stateOptions = [];

const statesData = require("../assets/data/states.json");

statesData.forEach(state => stateOptions.push({
    value: state.abbreviation,
    label: state.name
}));


const GraphPage = () => {
    const [selectedCountryValue, setSelectedCountryValue] = useState('all');

    const handleCountryChange = e => {
        setSelectedCountryValue(e.value);
    };
    const [selectedStateValue, setSelectedStateValue] = useState('AL');

    const handleStateChange = e => {
        setSelectedStateValue(e.value);
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
                    value={countryOptions.find(obj => obj.value === selectedCountryValue)}
                    options={countryOptions}
                    onChange={handleCountryChange}
                />
                <CountryChart country={selectedCountryValue}/>
                <h2>Graphs of COVID Cases for States</h2>
                <Select
                    placeholder={"Select State"}
                    value={stateOptions.find(obj => obj.value === selectedStateValue)}
                    options={stateOptions}
                    onChange={handleStateChange}
                />
                <StateChart state={selectedStateValue} sort={'cumulative'}/>
                <StateChart state={selectedStateValue} sort={'daily'}/>
            </Container>
        </Layout>
    );
};

export default GraphPage;
