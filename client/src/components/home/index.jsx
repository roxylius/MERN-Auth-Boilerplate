import React, {useState,useEffect} from "react";

//import css
import './style.css';

const Home = () => {
    const [data,setData] = useState('');
    const server_url = import.meta.env.VITE_SERVER_URL;

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
        <h1>
                {data ? JSON.stringify(data) : null}
            </h1>
            <h1>
                {data ? "Your Session is Authenticated and Saved on Server!...." : "Your Not Authenticated!...."}
            </h1>    </>);
}

export default Home;