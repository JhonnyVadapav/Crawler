const {NormalizeURL}=require("./crawler.js"); //calling the functions
const {getUrlsFromHtml}=require( "./crawler.js");
const{test,expect}=require("@jest/globals"); //calling from package.json

// we create the normalize URL to allow us to create the base 
//URL out of different URLS
//Eg , https://boot.dev http://boot.dev is the same thing as it points out to boot.dev
test('NormalizeURL strip protocol',()=>{
    const input ='https://blog.boot.dev/path';
    const actual=NormalizeURL(input);
    const expected='blog.boot.dev/path';
    expect(actual).toEqual(expected);
})
test('NormalizeURL strip slash protocol',()=>{
    const input ='https://blog.boot.dev/path/';
    const actual=NormalizeURL(input);
    const expected='blog.boot.dev/path';
    expect(actual).toEqual(expected);
})
test('NormalizeURL capital protocol',()=>{
    const input ='https://BLOG.boot.dev/path';
    const actual=NormalizeURL(input);
    const expected='blog.boot.dev/path';
    expect(actual).toEqual(expected);
})
test('NormalizeURL strip http protocol',()=>{
    const input ='http://blog.boot.dev/path';
    const actual=NormalizeURL(input);
    const expected='blog.boot.dev/path';
    expect(actual).toEqual(expected);
})
test('getUrlsFromHtml absolute',()=>{
    const inputHtmlbody =`
    <html>
        <body>
            <a href="https://blog.boot.dev/">
            </a>
        </body>
    </html>
    `;
    const baseURl="https://blog.boot.dev/path"
    const actual=getUrlsFromHtml(inputHtmlbody,baseURl);
    const expected=["https://blog.boot.dev/"];
    expect(actual).toEqual(expected);
})
test('getUrlsFromHtml relative',()=>{
    const inputHtmlbody =`
    <html>
        <body>
            <a href="/path/">
            </a>
        </body>
    </html>
    `;
    const baseURl="https://blog.boot.dev"
    const actual=getUrlsFromHtml(inputHtmlbody,baseURl);
    const expected=["https://blog.boot.dev/path/"];
    expect(actual).toEqual(expected);
})
test('getUrlsFromHtml relative + absolute',()=>{
    const inputHtmlbody =`
    <html>
        <body>
            <a href="/home/">
            </a>
            <a href="https://blog.boot.dev/path/">
            </a>
        </body>
    </html>
    `;
    const baseURl="https://blog.boot.dev"
    const actual=getUrlsFromHtml(inputHtmlbody,baseURl);
    const expected=["https://blog.boot.dev/home/","https://blog.boot.dev/path/"];
    expect(actual).toEqual(expected);
})
test('getUrlsFromHtml invalid',()=>{
    const inputHtmlbody =`
    <html>
        <body>
            <a href="invalid">
            </a>
        </body>
    </html>
    `;
    const baseURl="https://blog.boot.dev"
    const actual=getUrlsFromHtml(inputHtmlbody,baseURl);
    const expected=[];
    expect(actual).toEqual(expected);
})
