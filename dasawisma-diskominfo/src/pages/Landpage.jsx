import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Statistic from "../components/Statistic";
import ServerApi from "../helper/ServerApi";

export default function Landpage(){
    const [dataRw, setDataRw] = useState([])

    const getRw = async()=>{
        const response = await fetch(`${ServerApi}totalRw`,{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${localStorage.getItem("access_token")}`
            }
        })
        const data = await response.json()
        console.log(data)
        setDataRw(data)
    }
    useEffect(()=>{
        getRw()
    },[])

    return(
        <>
        <Hero/>
        <Statistic data={dataRw}/>
        <Footer/>
        </>
    )
}