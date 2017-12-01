var path=Editor.projectPath+'/packages/outline/template/cpp/';

var fs=require('fs');

var textOrigin=fs.readFileSync(path+'templete_rootDeclare.hpp').toString();
var sign='//templete';
var defineend='//defineend';
function getInit(name){
    var start=textOrigin.indexOf(defineend);
    var end=textOrigin.indexOf(sign);
    var textInit=textOrigin.substring(start+defineend.length,end);
    textInit=textInit.replace(/\/\*nodeName\*\//g,name);
    return textInit;
}

var attrStr=textOrigin.substring(textOrigin.indexOf(sign)+sign.length);
var attrNames=['x','y','width','height','anchorX','anchorY','scale','rotation','opacity','visible','zOrder','key','value','colorR','colorG','colorB'];
var attrs={};
var start=attrStr.indexOf('outline_');
var nameIndex=0;
while(start>=0){
    var end=attrStr.indexOf('=',start)+1;
    var str=attrStr.substring(start,end);
    attrs[attrNames[nameIndex]]=str;
    nameIndex++;
    attrStr=attrStr.substring(end);
    start=attrStr.indexOf('outline_');
}

function addAttr(name,value,nodeName){
    var str=attrs[name];
    str=str.replace(/\/\*nodeName\*\//,nodeName);
    str+=value+';';
    return str;
}

module.exports.getRootDeclare2=(instance)=>{
    var text='';
    var init=getInit(instance.name);
    instance.attrs.forEach((attr)=>{
        init+='            '+addAttr(attr.name,attr.value,attr.nodeName)+'\n';
    });
    text+=init+'\n';
    return text;
};

module.exports.getRootDeclare1=(name)=>{
    var textInit=textOrigin.substring(0,textOrigin.indexOf(';')+1);
    textInit=textInit.replace(/\/\*nodeName\*\//,name);
    name=name.substring(0,1).toUpperCase()+name.substring(1);
    textInit=textInit.replace(/\/\*UnodeName\*\//,name);
    return textInit;
};