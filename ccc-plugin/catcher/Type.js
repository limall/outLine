/**
 * 本文件用来获取值的数据类型
 */

function isVec2(value){
    return value instanceof cc.Vec2;
}

function isSize(value){
    return value instanceof cc.Size;
}

function isColor(value){
    return value instanceof cc.Color;
}

function isBool(value){
    var valueStr=''+value;
    return valueStr==='true' || valueStr==='false';
}

function getNumberType(value){
    if(value===undefined||value===null)
        return null;

    var numChars=['0','1','2','3','4','5','6','7','8','9','.','-'];

    var dotNum=0;
    var fuNum=0;
    var isNum=true;

    var valueStr=''+value;
    if(valueStr==='')
        return null;

    for(var i=0;i<valueStr.length;i++){
        var char=valueStr.charAt(i);
        if(char==numChars[10])
            dotNum++;
        if(char==numChars[11])
            fuNum++;
        var charIsNum=false;
        for(var j=0;j<numChars.length;j++){
            if(numChars[j]===char)
                charIsNum=true;
        }
        if(!charIsNum)
            isNum=false;
    }

    if(fuNum>0){
        if(valueStr.indexOf('-')!==0||fuNum!==1)
            isNum=false;
    }
    
    if(isNum){
        if(dotNum===0)
            return 'int';
        else if(dotNum===1)
            return 'float';
    }
}

function isInt(value){
    var type=getNumberType(value);
    if(type==='int')
        return true;
    else
        return false;
}

function isFloat(value){
    var type=getNumberType(value);
    if(type==='float')
        return true;
    else
        return false;
}

function isSpriteFrame(value){
    var toReturn=value instanceof cc.SpriteFrame;
    if (!toReturn && value && value.isSpriteFrame){
        toReturn=true;
    }
    return toReturn;
}

function isFont(value){
    return value instanceof cc.Font;
}

function isArray(value){
    return value instanceof Array;
}


module.exports = function(value){
    if(isVec2(value)){
        return 'vec2';
    }else if(isBool(value)){
        return 'bool';
    }else if(isInt(value)){
        return 'int';
    }else if(isFloat(value)){
        return 'float';
    }else if(isSize(value)){
        return 'size';
    }else if(isSpriteFrame(value)){
        return 'spriteFrame';
    }else if(isColor(value)){
        return 'color';
    }else if(isFont(value)){
        return 'font';
    }else if(value===null){
        return 'null'
    }else
        return 'string';
}
