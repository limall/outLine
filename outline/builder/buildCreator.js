var util=require ('./util');

/**
 * @method buildOneCreator 生成一个creator的lua代码
 * @param {"Object"} outline 一个outline
 * @returns {string} 一个creator的lua代码
 */
function buildOneCreator(outline){
    var pname=util.getPName(outline);
    var creatorName=util.firstCaseUp(pname);
    var outlineName='outline_'+pname;
    var luaCode='local '+creatorName+'={};';
    luaCode+='Base.createCreator('+outlineName+','+creatorName+')\n';
    
    var userDatas=outline.extraData.userDatas;
    userDatas.forEach(function(userData){
        var code=creatorName+'.'+userData.UserDataName+'={\n';
        for(var propName in userData){
            if(propName!=='UserDataName'){
                code+='    '+propName+'='+userData[propName]+',\n'
            }
        }
        code+='}\n'
        luaCode+=code+'\n';
    });
    return luaCode;
}

/**
 * @method buildCreators 生成多个creator的lua代码
 * @param {"Array"} outline 多个outline
 * @returns {string} 多个creator的lua代码
 */
module.exports.buildCreators=function(outlines){
    var luaCode='';
    outlines.forEach(function(outline){
        luaCode+=buildOneCreator(outline)+'\n';
    });
    return luaCode;
}