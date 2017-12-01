var path=Editor.projectPath+'/packages/outline/template/cpp/';  //改文件夹的绝对路径

var fs=require('fs');

var templete_origin_path=path+'template_hpp.hpp';               //模板文件的路径

//获取模板文件的auto generate内的内容
module.exports.getContentTemplate=function(){                   
    var text=fs.readFileSync(templete_origin_path).toString();
    var marker_start='//auto generate begin';
    var startIndex=text.indexOf(marker_start)+marker_start.length;
    var marker_end='//auto generate end';
    var endIndex=text.indexOf(marker_end);
    var content=text.substring(startIndex,endIndex);
    return content;
};


//更新auto generate内的内容，若未创建，则创建
module.exports.setContent=function(nodeName,content,filepath){
    if(filepath==='out'){
        filepath=Editor.projectPath+'/out';
        if(!fs.existsSync(filepath))
            fs.mkdirSync(filepath);
        filepath+='/'+nodeName+'.hpp';
    }else if(filepath===''){
        Editor.log('please input your dst hpp path');
    }
    var isFirst=!fs.existsSync(filepath);
    if(isFirst){
        nodeName=nodeName.toUpperCase()+'_H';
        var textOrigin=fs.readFileSync(templete_origin_path).toString();
        textOrigin=textOrigin.replace(/\/\*define_h\*\//g,nodeName);
        fs.writeFile(filepath,textOrigin,(err)=>{
            if(err){
                Editor.error('dst hpp path is error\n'+err);
            }else{
                write();
            }
        });
    }else
        write();
    function write(){
        Editor.log(filepath);
        var text=fs.readFileSync(filepath).toString();
        var marker_start='//auto generate begin';
        var head=text.substring(0,text.indexOf(marker_start)+marker_start.length+1);
        var marker_end='//auto generate end';
        var tail=text.substring(text.indexOf(marker_end));
        var newText=head+content+tail;
        fs.writeFile(filepath,newText,(err)=>{
            if(err)
                console.log(err);
        });
    }
};

//添加每个节点的结构体定义
module.exports.insertStructDefinition=function(content,structDefinition1,structDefinition2){
    var newContent=content.replace(/\/\*struct_definition1\*\//,structDefinition1);
    newContent=newContent.replace(/\/\*struct_definition2\*\//,structDefinition2);
    return newContent;
};

//添加根节点初始化
module.exports.insertRootDeclare=function(content,rootDeclare1,rootDeclare2){
    var newContent=content.replace(/\/\*root_declare1\*\//,rootDeclare1);
    newContent=newContent.replace(/\/\*root_declare2\*\//,rootDeclare2);
    return newContent;
};

//添加每个节点的初始化
module.exports.insertInstanceInit=function(content,instanceInit){
    var newContent=content.replace(/\/\*initInstance\*\//,instanceInit);
    return newContent;
};

//添加每个节点的父子关系
module.exports.insertRelation=function(content,outlineInit){
    var newContent=content.replace(/\/\*initRelation\*\//,outlineInit);
    return newContent;
};
