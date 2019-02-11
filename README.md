# 簡易小六法
這是一個很簡單的法條查詢工具，不同於市面上其他小六法的 App，都是一路點下去，此專案希望能夠用簡單打幾個字就能夠快速找到目標法條，試圖簡化整個搜尋程序，取代厚重的紙本小六法和難用的 App。  

## 使用方式
舉例來說，民法第 979-1 條可以用以下方式查詢（中文與數字之間的空格亦可省略）：  
* `民法 979-1`
* `民 979-1`
* `民 979 1`
* `ㄇㄈ 979 1`
* `ㄇ 979 1`
其中 `ㄇㄈ` 是民（ㄇㄧㄣˊ）法（ㄈㄚˇ）的注音首字，若同個注音會對應多個法典（如刑法與憲法都是 ㄒㄈ），則會匹配到第一條。  
支援常見法典簡稱（如 `中華民國刑法 = 刑法`、`刑事訴訟法 = 刑訴`、`社會秩序維護法 = 社維法`）。  
若全名、注音、簡稱皆沒有找到匹配的法典，則會去尋找名稱最接近的法條，例如 `性平教` 會找到最接近的 `性別平等教育法`。  

## 離線使用
本程式為 Progressive Web App，支援離線使用（Service Worker），直接加到主畫面即可使用。  

## Build
```npm run-script build
```

## 更新法條
``` # 第一次執行
git clone git@github.com:kong0107/mojLawSplitJSON.git
# 之後
git pull

node /path/to/this/project/law-generator/law-gen.js /path/to/kong0107/mojLawSplitJSON/FalVMingLing

# 記得要 build
npm run-script build
```
P.S. `react-scripts` is required.  

## 授權
此程式由 [Allen Chou](https://allenchou.cc) 製作，以 MIT License 釋出。  
網址：[https://laws.allenchou.cc](https://laws.allenchou.cc)  
Pull Requests Welcome!

## 資料來源
本程式所使用的資源來自於下述網站 / 專案：  
法條 JSON 檔：[kong0107/mojLawSplitJSON](https://github.com/kong0107/mojLawSplitJSON)  
漢字注音對照表：[小麥注音輸入法](https://github.com/openvanilla/McBopomofo/blob/master/Source/Data/BPMFBase.txt)  
Icon：[Font Awesome](https://fontawesome.com/)  
Tocus UI：[https://tocas-ui.com/](https://tocas-ui.com/)  
React：[https://reactjs.org/](https://reactjs.org/)
