var path = require("path");
var fs = require("fs");

var allSidebar = {}
var pathName=path.resolve(__dirname,'../','pages/')
var files=fs.readdirSync(pathName)

for (var i=0; i<files.length; i++)
{   
    var currentPath=path.resolve(pathName+'/'+files[i]+'/sidebar.js')
    if(fs.existsSync(currentPath)){
        var sidebar = require(currentPath);
        allSidebar={
            ...sidebar,
            ...allSidebar
        }
    }

} 
// console.log(allSidebar)

module.exports = allSidebar