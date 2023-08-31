async function domExtracter(){
    const mainUrl=document.getElementById('urltoscan').value;
    const response1= await fetch('/domain',{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({Domain:mainUrl})
    });
    if(response1.ok){
        const report=await response.json();
        displayReport(report);
    }
    else{
        console.error("Error finding the domain");
    }
    const response2= await fetch('/domain2',{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({Domain:mainUrl})
    });
    if(response1.ok){
        const report=await response.json();
        displayReport(report);
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