const LAW_NOT_FOUND = -1, CLAUSE_NOT_FOUND = -1, CLAUSE_NOT_SPECIFIED = -2;
export class laws {
    constructor(){
        this.lawData = [];
        var parent = this;
        fetch('laws/map.json', { method: 'get' })
        .then(function(response) {
            return response.json();
        }).then(function(lawMap) {
            for(var i in lawMap["Map"]){
                fetch('laws/' + lawMap["Map"][i], { method: 'get' })
                .then(function(response) {
                    return response.json();
                }).then(function(json) {
                    parent.lawData.push(json);
                }).catch(function(err) {
                    // Error :(
                })
            }
            parent.updateTime = lawMap["updateTime"];
        }).catch(function(err) {
            // Error :(
        })
    }

    getLaw(lawIndex, clauseIndex){
        return {
            name: this.lawData[lawIndex].name,
            clauseNo:this.lawData[lawIndex].content[clauseIndex].clauseNo,
            content: this.lawData[lawIndex].content[clauseIndex].clauseContent,
            nextStatus: (this.lawData[lawIndex].content.length == clauseIndex + 1) ? 0 : 1,
            prevStatus: (clauseIndex == 0) ? 0 : 1,
        }
    }

    searchLaw(rawString){
        /* 尋找法條名稱是否存在（名稱或簡稱完全符合） */
        var lawName = rawString.replace(/[0-9-]/g, '').replace(/\s/g, '');
        var lawIndex = LAW_NOT_FOUND, clauseIndex = CLAUSE_NOT_FOUND;
        for(var i in this.lawData){
            if(this.lawData[i].name === lawName || this.lawData[i].alias.indexOf(lawName) !== -1){
                lawIndex = i;
                break;
            }
        }

        /* 如果剛剛沒找到東西，再尋找最接近的名稱（只有唯一匹配時才繼續處理） */
        if(lawIndex == LAW_NOT_FOUND){
            var count = 0, tempLawIndex = LAW_NOT_FOUND, maxLCSratio = 0;
            for(var i in this.lawData){
                if((this.LCS(this.lawData[i].name, lawName).length / lawName.length).toFixed(2) > maxLCSratio){
                    maxLCSratio = (this.LCS(this.lawData[i].name, lawName).length / lawName.length).toFixed(2);
                    tempLawIndex = i;
                    count = 1;
                }else if((this.LCS(this.lawData[i].name, lawName).length / lawName.length).toFixed(2) == maxLCSratio){
                    count ++;
                }
            }
            if(count == 1){ // 唯一匹配，繼續搜尋條文編號
                lawIndex = tempLawIndex;
            }
        }

        if(lawIndex != LAW_NOT_FOUND){
            clauseIndex = this.searchClause(rawString, lawIndex); // 如果存在就去找條文編號是否存在
        }

        return {
            "lawIndex": lawIndex,
            "clauseIndex": clauseIndex,
            "lawName": (lawIndex != LAW_NOT_FOUND) ? this.lawData[lawIndex].name : LAW_NOT_FOUND
        };
    }

    searchClause(rawString, lawIndex){
        var clauseIndex = CLAUSE_NOT_FOUND, clauseIndex = CLAUSE_NOT_FOUND;

        if(rawString.match(/(\d+(?:(?: |-)\d+)*)/g,'') == null){
            return CLAUSE_NOT_SPECIFIED;
        }

        var clauseNo = rawString.match(/(\d+(?:(?: |-)\d+)*)/g,'')[0].replace(' ','-');

        for(var i in this.lawData[lawIndex].content){
            if(this.lawData[lawIndex].content[i].clauseNo == clauseNo){
                clauseIndex = i;
                break;
            }
        }
        return clauseIndex;
    }

    getLastUpdate(){
        return this.updateTime;
    }

    LCS(a, b) {
        var m = a.length, n = b.length,
            C = [], i, j;
        for (i = 0; i <= m; i++) C.push([0]);
        for (j = 0; j < n; j++) C[0].push(0);
        for (i = 0; i < m; i++)
            for (j = 0; j < n; j++)
                C[i+1][j+1] = a[i] === b[j] ? C[i][j]+1 : Math.max(C[i+1][j], C[i][j+1]);
        return (function bt(i, j) {
            if (i*j === 0) { return ""; }
            if (a[i-1] === b[j-1]) { return bt(i-1, j-1) + a[i-1]; }
            return (C[i][j-1] > C[i-1][j]) ? bt(i, j-1) : bt(i-1, j);
        }(m, n));
    }
}
