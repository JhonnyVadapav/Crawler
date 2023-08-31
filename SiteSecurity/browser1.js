async function domExtracter(){
    const mainUrl=document.getElementById('urltoscan').value;
    const mainUrlObj=new URL(mainUrl);
    const domain=mainUrlObj.hostname;
    const response1= await fetch('/domain',{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({Domain:mainUrl})
    });
    if(response1.ok){
        const report1=await response1.json();
        displayReport(report1);
    }
    else{
        console.error("Error finding the domain");
    }
    const response2= await fetch('/domain',{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({Domain:mainUrl})
    });
    if(response2.ok){
        const report2=await response2.json();
        displayReport(report2);
    }
    else{
        console.error("Error finding the domain");
    }
}
function displayReport(report){
    const dataVisualization = document.getElementById('data-visualization');
    dataVisualization.innerHTML = '<pre>' + JSON.stringify(report, null, 2) + '</pre>';
}
document.querySelector('button').addEventListener('click', domExtracter);