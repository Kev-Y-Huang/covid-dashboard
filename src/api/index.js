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

const fetchCountryData = async () => {
    try {
        const {data} = await axios.get(`${url}jhucsse`);
        const points = data.reduce((points, country) => {
            if (!(country.country === "US" || country.coordinates.latitude === "")) {
                points.push({
                    name: country.province ? country.province + ', ' + country.country : country.country,
                    cases: country.stats.confirmed,
                    coordinates: [
                        parseFloat(country.coordinates.longitude),
                        parseFloat(country.coordinates.latitude)
                    ]
                });
            }
            return points;
        }, []);
        return points;
    } catch (error) {
        console.log("error");
    }
};

const fetchUSCountyData = async () => {
    try {
        const {data} = await axios.get(`${url}jhucsse/counties`);

        const points = data.reduce((points, county) => {
            if (county.coordinates.latitude !== "") {
                points.push({
                    name: county.county + ', ' + county.province + ', ' + county.country,
                    cases: county.stats.confirmed,
                    coordinates: [
                        parseFloat(county.coordinates.longitude),
                        parseFloat(county.coordinates.latitude)
                    ]
                });
            }
            return points;
        }, []);
        return points;
    } catch (error) {
        console.log("error");
    }
};

export const fetchData = async () => {
    try {
        const other = await fetchCountryData();
        const us = await fetchUSCountyData();
        return other.concat(us);
    } catch (error) {
        console.log("error");
    }
}
