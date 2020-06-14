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

export const fetchData = async () => {
    try {
        const {data} = await axios.get(`${url}countries`);
        const points = data.map(country => ({
            type: 'Feature',
            coordinates: [
                country.countryInfo.long,
                country.countryInfo.lat
            ]
        }));
        return points;
    } catch (error) {
        console.log("error");
    }
}
