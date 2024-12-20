import React, {useState} from "react";

//import css
import './style.css';

const Home = () => {
    const [data,setData] = useState('');

    useEffect(()=>{
        const fetchData = async () => {
            const response = await fetch(server_url+"/api/user",{
                method:"GET",
                credentials:"include",
            });
            console.log({response});
            const body = await response.json();
            console.log({body});
            setData(body);
        }
        fetchData();
    },[])
    return (
    <>
        <h1>hello World</h1>
        <h1 color="red">{data}</h1>
    </>);
}

export default Home;