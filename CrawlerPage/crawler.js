const {JSDOM}=require('jsdom');

async function crawlPage(baseURl,currentUrl,pages){  //to check if the current url is even a path of the main url
    const baseURlObj=new URL(baseURl);
    const currentUrlObj=new URL(currentUrl);
    if(baseURlObj.hostname!==currentUrlObj.hostname){
        return pages;
    }
    const normalizedUrl=NormalizeURL(currentUrl);
    if(pages[normalizedUrl]>0){  //to tell how many times we have visited a page
        pages[normalizedUrl]++;
        return pages;
    }
    pages[normalizedUrl]=1;
    console.log(`Currently crawling ${currentUrl}`);
    try{
    const response=await fetch(currentUrl);
    if(response.status>399){
        console.log(`error in fetch with status code in page ${response.status} on page ${currentUrl}`);
        return pages;
    }
    if(!response.headers.get("content-type").includes("text/html")){
        console.log(`error in fetch header as content is in ${response.headers.get("content-type")} on page ${currentUrl}`);
    }
    const htmlBody=await response.text();
    const nextURLs=getUrlsFromHtml(htmlBody,baseURl);
    for(const nxtUrl of nextURLs){  
        pages=await crawlPage(baseURl,nxtUrl,pages);
    }
}
    catch(err){
        console.log(`error in fetch:[${err.message}] while crawling ${currentUrl}`);
    }
    return pages;
}
function getUrlsFromHtml(htmlBody,baseURl){
    const urls=[];
    const dom=new JSDOM(htmlBody);
    const linkElements=dom.window.document.querySelectorAll('a');
    for(const elements of linkElements){
        if(elements.href.slice(0,1)==='/'){
            // this is the relative url
            try{
                const urlObj=new URL(`${baseURl}${elements.href}`);
                urls.push(urlObj.href);
            }
            catch(err){
                console.log(err.message);
            }
        }
        else{
            try{
                const urlObj=new URL(elements.href);
                urls.push(urlObj.href);
            }
            catch(err){
                console.log(err.message);
            }
        }
    }
    return urls;
}

//input sanitation
function NormalizeURL(urlString){
    const urlObj=new URL(urlString);
    const hostPath= `${urlObj.hostname}${urlObj.pathname}`
    if(hostPath.length>0 && hostPath.slice(-1) ==='/'){
        return hostPath.slice(0,-1);
    }
    else{
        return hostPath;
    }
}
/*module.exports makes the function available to other files
that require it*/
module.exports={
    NormalizeURL,
    getUrlsFromHtml,
    crawlPage
}