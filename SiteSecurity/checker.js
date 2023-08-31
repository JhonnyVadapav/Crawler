const { default: axios } = require("axios");
const { application, json } = require("express");
require('dotenv').config();
const Api_Key=process.env.Api_key;
async function UrlChecker(baseUrl){
    const apiUrl="https://www.virustotal.com/api/v3/urls";
    const options={
        method:"POST",
        url:apiUrl,
        headers:{
            'x-apikey':Api_Key,
            accept:'application/json',
            'content-type':'application/x-www-form-urlencoded'
        },
        data:{
            url:baseUrl
        }
    };
    try{
        const response=await axios.request(options);
        const data=urlAnalysis(response.data.data.id);
        return data;
    }
    catch(err){
        console.log(`error in checking the security : ${err.message}`);
    }
}
async function urlAnalysis(id){
    const Api_url=`https://www.virustotal.com/api/v3/analyses/${id}`;
    const options={
        method:'GET',
        url:Api_url,
        headers:{
            accept:'application/json',
            "x-apikey":Api_Key
        }
    };
    try{
        const response=await axios.request(options);
        return response.data.data.attributes.stats;
    }
    catch(err){
        console.log(`Error during analysis: ${err.message}`);
    }
}
async function domainReport(domain){
    const apiUrl=`https://www.virustotal.com/api/v3/domains/${domain}`;
    options={
        method:'GET',
        url:apiUrl,
        headers:{
            'x-apikey':Api_Key,
            accept:'application/json'
        }
    };
    try{
        const response=await axios.request(options);
        return response.data.data.attributes.last_analysis_results;
    }
    catch(err){
        console.log(`Error while domain scan: ${err.message}`);
    }
}
module.exports={
    UrlChecker,
    domainReport    
}