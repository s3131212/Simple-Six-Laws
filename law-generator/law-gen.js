/*
    Copyright
    本程式所使用的法條來源為：https://github.com/kong0107/mojLawSplitJSON
    本程式所使用的注音對照表來源為：https://github.com/openvanilla/McBopomofo/blob/master/Source/Data/BPMFBase.txt
    版權屬於原作者所有
*/

var fs = require('fs');
var path = require('path');

String.prototype.replaceAt = function(index, replacement) {
    return this.substr(0, index) + replacement + this.substr(index + 1);
}

String.prototype.removeStr = function(index, len) {
    return this.substr(0, index) + this.substr(index + len);
}

var BPMFMap = JSON.parse(fs.readFileSync('BPMF.json', 'utf8'));
var Config = JSON.parse(fs.readFileSync('config.json', 'utf8'));
var Obj = {
    "updateTime": (new Date()).toISOString().slice(0,10),
    "Map" : []
};

var source = process.argv[2];
var newlineExceptList = ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十", "廿"];

process.on('exit', function(){
    fs.writeFileSync(path.join(__dirname, '..', 'public', 'laws', 'map.json'), JSON.stringify(Obj, null, 4));
});

fs.readdir(source, function(err, files){
	if(err) {
		console.error("Could not list the directory.", err );
		process.exit(1);
	}

	files.forEach(function(file, index){
		// Make one pass and make the file complete
		if(file.indexOf('.json') == -1){
			return ;
		}

		var sourceFile = path.join(source, file);
		var targetFile = path.join(__dirname, '..', 'public', 'laws', file);

		console.log(file);

		fs.stat(sourceFile, function(error, stat) {
			if(error) {
				console.error("Error stating file.", error );
				return;
			}
			fs.readFile(sourceFile, { encoding: 'utf-8' }, function(err, data){
				if (err) throw err;
				var dataObj = JSON.parse(data.toString());

                /* 檢查是否要包含 */
                if(Config.IncludedLaws.indexOf(dataObj["法規名稱"]) == -1){
                    return;
                }

                Obj.Map.push(file);

                /* 讀取條文 */
				var ClauseArray = [];
				for(var i in dataObj["法規內容"]){
					if(typeof dataObj["法規內容"][i]["條文內容"] !== "undefined"){
						var content = dataObj["法規內容"][i]["條文內容"];

						/* 移除換行 */
						var nlLocation = getIndicesOf('\r\n', content);
						var offset = 0;
						for(var j = 0; j < nlLocation.length; j++){
							if(j != 0){
								if(nlLocation[j] - nlLocation[j - 1] == 32){
									content = content.removeStr(nlLocation[j] - offset, 2);
									offset += 2;
								}else{
									if(content[nlLocation[j] - offset - 1] != "：" && newlineExceptList.indexOf(content[nlLocation[j] - offset + 2]) == -1){
										content = content.removeStr(nlLocation[j] - offset, 2);
										offset += 2;
									}
								}
							}else{
								if(nlLocation[j] == 32){
									content = content.removeStr(nlLocation[j] - offset, 2);
									offset += 2;
								}else{
									if(content[nlLocation[j] - 1] != "：" && newlineExceptList.indexOf(content[nlLocation[j] + 2]) == -1){
										content = content.removeStr(nlLocation[j] - offset, 2);
										offset += 2;
									}
								}
							}
							content = content.replace("\r\n","\\n");
						}

						ClauseArray.push({
							"clauseNo": dataObj["法規內容"][i]["條號"].substring(2, dataObj["法規內容"][i]["條號"].length - 2),
							"clauseContent": content
						});
					}
				}

                /* 產生縮寫 */
                var alias = [];
                alias.push(createBPMF(dataObj["法規名稱"]));
                if(typeof Config.AbbrMap[dataObj["法規名稱"]] !== "undefined"){
                    for(var i in Config.AbbrMap[dataObj["法規名稱"]]){
                        alias.push(Config.AbbrMap[dataObj["法規名稱"]][i]);
                        alias.push(createBPMF(Config.AbbrMap[dataObj["法規名稱"]][i]));
                    }
                }

                /* 統整資料 */
                var lawData = {
                    "name": dataObj["法規名稱"],
                    "alias": alias,
                    "content": ClauseArray
                }

				fs.writeFile(targetFile, JSON.stringify(lawData, null, 4), function (err) {
                    if(err){
                        console.log(err);
                    }else{
                        console.log(dataObj["法規名稱"], '已完成');
                    }
				});
			});
		});
	});
});

function getIndicesOf(searchStr, str) {
    var searchStrLen = searchStr.length;
    if (searchStrLen == 0) {
        return [];
    }
    var startIndex = 0, index, indices = [];
    while ((index = str.indexOf(searchStr, startIndex)) > -1) {
        indices.push(index);
        startIndex = index + searchStrLen;
    }
    return indices;
}

function createBPMF(str){
    var bpmf = '';
    for(var c = 0; c < str.length; c ++){
        if(!isAlpha(str.charAt(c)) && str.charAt(c) != "（" && str.charAt(c) != "）"){
            if(typeof BPMFMap[str.charAt(c)] !== "undefined"){
                bpmf += BPMFMap[str.charAt(c)].charAt(0);
            }else{
                bpmf += str.charAt(c);
                console.log("找不到注音：", str.charAt(c))
            }
        }else{
            bpmf += str.charAt(c);
        }
    }
    return bpmf;
}

function isAlpha(ch){
  return /^[A-Za-z0-9]$/i.test(ch);
}
