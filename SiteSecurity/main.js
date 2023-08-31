const{UrlChecker}=require("./checker.js");
function main(){
    if(process.argv.length<3){
        console.log("no website provided");
    }
    if(process.argv.length>3){
        console.log("too many argumetns");
    }
    else{
        const baseURl=process.argv[2];
        UrlChecker(baseURl).then(data=>{
            if(data){
                console.log("Security reports :",data);
            }
        })
    }
}
main();