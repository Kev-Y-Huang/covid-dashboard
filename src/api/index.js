import axios from 'axios';

// api_url = 'https://documenter.getpostman.com/view/11144369/Szf6Z9B3?version=latest'



const url = 'https://corona.lmao.ninja/v2/historical/';

export const fetchData = async(country) => {
    try {
        const {data: {timeline: {cases, deaths, recovered}}} = await axios.get(`${url}${country}?lastdays=all`);
        return {cases, deaths, recovered};
    } catch (error) {
        console.log("error");
    }
};
