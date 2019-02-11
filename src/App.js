import React, { Component } from 'react';
import './App.css';
import * as lawMap from './law.js';

const LAW_NOT_FOUND = -1, CLAUSE_NOT_FOUND = -1, CLAUSE_NOT_SPECIFIED = -2;

class LawContainer extends Component {
    render(){
        return (
            <div className="ts heading centered slate attached">
                <span className="header lawName">{this.props.name}</span>
                <span className="description lawContent">{this.props.content}</span>
            </div>
        );
    }
}
class Modal extends Component {
    render(){
        if(this.props.show){
            return (
                <div className="ts modals dimmer active">
                    <dialog id="closableModal" className="ts large modal" open="open">
                        <div className="content">
                            <h1>簡易小六法</h1>
                            <p>這是一個很簡單的法條查詢工具，不同於市面上其他小六法的 App，都是一路點下去，此專案希望能夠用簡單打幾個字就能夠快速找到目標法條，試圖簡化整個搜尋程序，取代厚重的紙本小六法和難用的 App。</p>

                            <h3>使用方式</h3>
                            <p>舉例來說，<code>民法第 979-1 條</code>可以用以下方式查詢（中文與數字之間的空格可省略）：</p>
                            <ul>
                                <li>民法 979-1</li>
                                <li>民 979-1</li>
                                <li>民 979 1</li>
                                <li>ㄇㄈ 979 1</li>
                                <li>ㄇ 979 1</li>
                            </ul>
                            <p>其中 <code>ㄇㄈ</code> 是民（ㄇㄧㄣˊ）法（ㄈㄚˇ）的注音首字，若同個注音會對應多個法典（如刑法與憲法都是 ㄒㄈ），則會匹配到第一條。</p>
                            <p>支援常見法典簡稱（如 <code>中華民國刑法 = 刑法</code>、<code>刑事訴訟法 = 刑訴</code>、<code>社會秩序維護法 = 社維法</code>）。</p>
                            <p>若全名、注音、簡稱皆沒有找到匹配的法典，則會去尋找名稱最接近的法條，例如 <code>性平教</code> 會找到最接近的 <code>性別平等教育法</code>。</p>
                            <p>法條更新時間：<code>{this.props.updateTime}</code></p>

                            <h3>離線使用</h3>
                            <p>若您希望能離線使用此程式，可以將此網頁加入主畫面，即可離線使用。詳情可以搜尋 "Add website to home screen" 或是「加入主畫面 iPhone / Android」。</p>

                            <h3>關於此程式</h3>
                            <p>此程式由 <a href="https://allenchou.cc">Allen Chou</a> 製作，以 MIT License 釋出。<br />
                            網址：<a href="https://laws.allenchou.cc">https://laws.allenchou.cc</a><br />
                            GitHub: <a href="https://github.com/s3131212/Simple-Six-Laws">s3131212/Simple-Six-Laws</a><br />
                            <i>Pull Requests Welcome!</i></p>

                            <h3>資料來源</h3>
                            <p>本程式所使用的資源來自於下述網站：</p>
                            <ul>
                                <li>法條 JSON 檔：<a href="https://github.com/kong0107/mojLawSplitJSON">kong0107/mojLawSplitJSON</a></li>
                                <li>漢字注音對照表：<a href="https://github.com/openvanilla/McBopomofo/blob/master/Source/Data/BPMFBase.txt">小麥注音輸入法</a></li>
                                <li>Icon：<a href="https://fontawesome.com/">Font Awesome</a></li>
                                <li>Tocus UI：<a href="https://tocas-ui.com/">https://tocas-ui.com/</a></li>
                                <li>React：<a href="https://reactjs.org/">https://reactjs.org/</a></li>
                            </ul>
                        </div>
                        <div className="actions">
                            <button className="ts positive button" onClick={ () => this.props.onClose() }>
                                關閉
                            </button>
                        </div>
                    </dialog>
                </div>
            );
        }else{
            return (<div></div>);
        }
    }
}
class PrevButton extends Component {
    render() {
        if(!this.props.available)
            return (
                <div className="ts inverted button disabled">上一條</div>
            );
        else
            return (
                <div className="ts inverted button" onClick={ () =>
                    this.props.setClause(this.props.lawIndex, parseInt(this.props.clauseIndex) - 1)
                }>上一條</div>
            );
    }
}

class NextButton extends Component {
    render() {
        if(!this.props.available)
            return (
                <div className="ts negative button disabled">下一條</div>
            );
        else
            return (
                <div className="ts negative button" onClick={ () =>
                    this.props.setClause(this.props.lawIndex, parseInt(this.props.clauseIndex) + 1)
                }>下一條</div>
            );
    }
}

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            name: '',
            content: '',
            clauseNo: '',
            clauseIndex: CLAUSE_NOT_SPECIFIED,
            lawIndex: LAW_NOT_FOUND,
            prevStatus: 0,
            nextStatus: 0,
            helpActive: false
        };
        this.law = new lawMap.laws();
        this.handleChange = this.handleChange.bind(this);
        this.setClause = this.setClause.bind(this);
    }

    handleChange(event) {
        this.setState({ value: event.target.value });

        var search = this.law.searchLaw(event.target.value);
        this.setClause(search["lawIndex"], search["clauseIndex"], search["lawName"]);
    }

    setClause(lawIndex, clauseIndex, lawName){
        if(lawIndex == LAW_NOT_FOUND){
            this.setState({
                name: "",
                content: "",
                prevStatus: 0,
                nextStatus: 0
            });
            return;
        }
        if(clauseIndex == CLAUSE_NOT_FOUND){
            this.setState({
                name: "",
                content: lawName + "沒有此條",
                prevStatus: 0,
                nextStatus: 0
            });
            return;
        }
        if(clauseIndex == CLAUSE_NOT_SPECIFIED){
            this.setState({
                name: "",
                content: "正在搜尋" + lawName,
                prevStatus: 0,
                nextStatus: 0
            });
            return;
        }

        var lawData = this.law.getLaw(lawIndex, clauseIndex);

        this.setState({
            lawIndex: lawIndex,
            clauseIndex: clauseIndex,
            name: lawData.name + " 第 " + lawData.clauseNo + " 條",
            nextStatus: lawData.nextStatus,
            prevStatus: lawData.prevStatus,
            content: lawData.content.split("\\n").map(function(item, idx) {
                return (
                    <div key={idx}>
                    {item}
                    </div>
                )
            })
        });

    }

    render() {
        return (
            <div className="ts container">
            <Modal show={this.state.helpActive} onClose={() => this.setState({helpActive: false})} updateTime={this.law.getLastUpdate()} />
                <div className="ts centered secondary">
                    <form className="ts form" onSubmit={e => { e.preventDefault(); }}>
                        <div className="field">
                            <input type="text" placeholder="法律名稱" onChange={this.handleChange} value={this.state.value} />
                        </div>
                    </form>
                </div>
                <div className="ts hidden divider"></div>
                <LawContainer name={this.state.name} content={this.state.content} />
                <div className="ts fluid bottom attached buttons" id="navButton">
                    <PrevButton setClause={this.setClause} lawIndex={this.state.lawIndex} clauseIndex={this.state.clauseIndex} available={this.state.prevStatus} />
                    <div className="ts button" onClick={ () =>
                        this.setState({helpActive: true})
                    }>幫助</div>
                    <NextButton setClause={this.setClause} lawIndex={this.state.lawIndex} clauseIndex={this.state.clauseIndex} available={this.state.nextStatus}/>
                </div>
            </div>
        );
    }
}

export default App;
