import axios from 'axios';

// api_url = 'https://documenter.getpostman.com/view/11144369/Szf6Z9B3?version=latest'



const url = 'https://corona.lmao.ninja/v2/historical/';

export const fetchData = async(country) => {
    try {
        const {data} = await axios.get(`${url}${country}?lastdays=all`);
        return data;
    } catch (error) {
        console.log("error");
    }
};
