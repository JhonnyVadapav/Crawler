const express=require('express');
const path =require('path');
const{UrlChecker}=require("./checker.js");
const{domainReport}=require("./checker.js");
const app=express();
const port=4000;

app.use(express.json());
app.use(express.static(path.join(__dirname,'./')));

app.post('/domain',async (req,res)=>{
    try{
        const mainUrl=req.body.Domain;

        if(!mainUrl){
            return res.status(400).json();
       }
       console.log("Searching about the domain");
       const record=await UrlChecker(mainUrl);
       res.json(record);
    }
    catch(err){
        console.log(`Error in reporting ${err.message}`);
    }
});
app.post('/domain2',async (req,res)=>{
    try{
        const mainUrl=req.body.Domain;  
        const url=new URL(mainUrl);
        const domain=url.host;
        if(!mainUrl){
            return res.status(400).json();
       }
       console.log("Searching about the domain");
       const record=await domainReport(domain);
       res.json(record);
    }
    catch(err){
        console.log(`Error in reporting ${err.message}`);
    }
});
app.listen(port,()=>{
    console.log(`Server is running on ${port}`)
});