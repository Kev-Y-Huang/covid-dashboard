import axios from 'axios';

// api_url = 'https://documenter.getpostman.com/view/11144369/Szf6Z9B3?version=latest'

const url = 'https://corona.lmao.ninja/v2/';

export const fetchHistData = async (country) => {
    try {
        if (country === 'all') {
            const {data: {cases, deaths, recovered}} = await axios.get(`${url}historical/${country}?lastdays=all`);
            return {cases, deaths, recovered};
        } else {
            const {data: {timeline: {cases, deaths, recovered}}} = await axios.get(`${url}historical/${country}?lastdays=all`);
            return {cases, deaths, recovered};
        }
    } catch (error) {
        console.log("error");
    }
};

const fetchCountryData = async (type) => {
    try {
        const {data} = await axios.get(`${url}jhucsse`);
        return data.reduce((points, country) => {
            if (!(country.country === "US" || country.coordinates.latitude === "")) {
                points.push({
                    name: country.province ? country.province + ', ' + country.country : country.country,
                    cases: country.stats[type],
                    coordinates: [
                        parseFloat(country.coordinates.longitude),
                        parseFloat(country.coordinates.latitude)
                    ]
                });
            } else if (type === 'recovered' && country.country === "US" && country.province === 'Recovered') {
                points.push({
                    name: country.country,
                    cases: country.stats[type],
                    coordinates: [-98.5795, 39.8283]
                });
            }
            return points;
        }, []);
    } catch (error) {
        console.log("error");
    }
};

const fetchUSCountyData = async (type) => {
    try {
        const {data} = await axios.get(`${url}jhucsse/counties`);
        return data.reduce((points, county) => {
            if (county.coordinates.latitude !== "") {
                points.push({
                    name: county.county + ', ' + county.province + ', ' + county.country,
                    cases: county.stats[type],
                    coordinates: [
                        parseFloat(county.coordinates.longitude),
                        parseFloat(county.coordinates.latitude)
                    ]
                });
            }
            return points;
        }, []);
    } catch (error) {
        console.log("error");
    }
};

export const fetchData = async (type) => {
    try {
        let other = await fetchCountryData(type);
        if (type !== 'recovered') {
            const us = await fetchUSCountyData(type);
            other = other.concat(us);
        }
        return other;
    } catch (error) {
        console.log("error");
    }
};
