import React from 'react';
import { Row, Col } from 'antd';
const css = require("../../../css/article-index.css")
import { Divider } from 'antd';
import {myfetch} from "../../fetch/myfetch";

export default class ArticleIndex extends React.Component {
    constructor() {
        super();
        this.state = {
            title: "我是标题",
            content: `魏晋南北朝是继春秋、战国之后，中国历史上第二个社会大变动的时期。二者之不同在于春秋、战国时期为封建解体和国家形成的过渡阶段，是一个由分而合的过程；魏晋南北朝是在大一统的汉帝国灭亡后的分裂时期。由于政治环境的混乱、儒学的衰微与玄学的兴盛、道教佛学的传布等等因素，造就这个时期独特的文学品味和风气[14]。这时的散文大抵上追求“美”，讲求形式，注重辞藻，而个人情感加重许多，这一时期的风格，倾向于精致细腻，与先秦、汉代恢宏壮阔的散文大为不同，而是以代表此文风，来表现出山水之美[15]。山水是自然的，政治、经济、社会是人为的。面对人为种种混乱和黑暗，文人从山水之美寻找寄托、慰籍[16]。
            此一时期的散文作品，有北魏郦道元的《水经注》和杨衒之的《洛阳伽蓝记》为代表[15]。《水经注》文字精美、文笔流畅，呈现雄奇秀丽的山水景色，生动而有韵味，对于后代的山水游记影响极为深远[15]；《洛阳伽蓝记》描述洛阳的佛寺园林，文字简洁，辞采丰美，而记述详实，反映当代的社会面貌和豪门、僧尼的淫侈生活[15]。其他的山水小品，皆是字句秀丽，意境高远，趣味隽永，充分表现出此一时期文人的心态`,
            pictures: ["http://127.0.0.1:5000/static/uploads/article/UBwDsUGG7jfKAPYt.jpg"],
            createAt: "2018-09-09",
            authorName: "nautilis Zheng",
        }
    }
    componentDidMount(){
        myfetch("GET", "http://127.0.0.1:5000/api/v1/article/" + this.props.match.params.id, null).then(json =>{
            console.log(json);
            this.setState({
                title: json.article.title,
                content: json.article.content,
                createAt: json.article.date_created,
                authorName: json.article.username
            })
        })
    }
    render() {
        return (
            <Row>
                <Col span={4} />
                <Col span={16}>
                  <div>
                    <div className="title">
                      <h2>{this.state.title}</h2>
                      <span>{this.state.createAt}</span><span className="author">{this.state.authorName}</span>
                    </div>
                    <Divider className="divider"/>
                    <div className="article-content">
                      <p>{this.state.content}</p>
                    </div>
                    <div className="picture">
                      <img src={this.state.pictures[0]}/>
                    </div>
                  </div>
                </Col>
                <Col span={4} />
            </Row>
        );
    }
}