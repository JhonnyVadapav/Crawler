const {crawlPage}=require("./crawler.js")
const {printReport}=require("./report.js")
async function main(){
    if(process.argv.length<3){
        console.log("no website provided");
        process.exit(1);    
    }
    if(process.argv.length>3){
        console.log("tooo many sites provided");
        process.exit(1);    
    }
    const baseURl=process.argv[2];
    console.log(`starting crawl of ${baseURl}`);
    const pages=await crawlPage(baseURl,baseURl,{});
    printReport(pages);
}
main();