import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ProjectCard from '../components/project-card/ProjectCard.js';
import PersonalCard from '../components/personal-card/PersonalCard.js';
import ProjectCard2 from '../components/project-card/ProjectCard2.js';
import '../components/global/global.scss';
import {TABS, TABINFO, PERSONALTAB} from './constants.js';


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      tab: 0,
      sidebar:false,
    }
    this.scrollTarget = React.createRef();
    this.addLike = this.addLike.bind(this);
  }

  componentDidMount(){
    // this.getLikes()
    // .then(res => {
    //   res.data.forEach((target) => {
    //     this.setState({[target.id]: target.count});
    //   })
    // })
  }

  async getLikes(){
    const response = await fetch('/allLikes');
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  }

  addLike(id){
    Promise.resolve(this.setState({[id]: this.state[id] + 1}))
    .then(() => this.updateLikes({id, count: this.state[id]}))

  }

  async updateLikes(data){
    const response = await fetch("/like",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  }

  constructNav(){
    let navCont = [];
    for(var i = 0; i < TABS.length; i++){
      const tabNum = i;
      navCont.push(
        <h2 key={"tab-"+tabNum} className={this.state.tab === i ? " active nav-item": "nav-item"} onClick={() => this.changeTab(tabNum)}>{TABS[tabNum]}</h2>
      );
    }
    return (<div className="nav-strip">{navCont}</div>)
  }

  constructSideBar(){
    let sbCont = [];
    for(var i = 0; i < TABS.length; i++){
      const tabNum = i;
      sbCont.push(
        <h2 key={"sidetab-"+tabNum} className={this.state.tab === i ? "side-active side-item": "side-item"} onClick={() => {this.changeTab(tabNum);this.closeSidebar()}}>{TABS[tabNum]}</h2>
      );
    }

    return (
      <div className={ this.state.sidebar ? "sidebar-container": "sidebar-container sidebar-container-hidden"}>
        <div className="sidebar ">
          {sbCont}
        </div>
      </div>
    )
  }


  constructTab(index){

    const currentTab = TABS[index];
    let tabCont = [];
    let info = TABINFO[TABS[index]];
    let count = 0;

    if(currentTab === "Personal"){
      count = 0;
      PERSONALTAB.forEach((item) => {
        const c = count;
        tabCont.push(
          <PersonalCard key={currentTab+"-"+count} id={currentTab+"-"+c} title={item.title} descriptions={item.descriptions}/>
        );
        count++;
      });
      return (
        <div className="personal-container" ref={this.scrollTarget}>
          {tabCont}
        </div>
      )
    }
    else if(currentTab === "Work"){
      count = 0;
      info.forEach((item) => {
        tabCont.push(<ProjectCard details={item} id={currentTab+"-"+count} likes={this.state[currentTab+"-"+count]}  key={currentTab+"-"+count} addLike={this.addLike}/>)
        count++;
      })
      return <div className="container" ref={this.scrollTarget}><h1 className="mobile-title">Work</h1>{tabCont}</div>;
    }
    else{
      count = 0;
      info.forEach((item) => {
        tabCont.push(<ProjectCard2 details={item} id={currentTab+"-"+count} likes={this.state[currentTab+"-"+count]}  key={currentTab+"-"+count} addLike={this.addLike} />);
        count++;
      })
      return <div className="container" ref={this.scrollTarget}><h1 className="mobile-title">Projects</h1>{tabCont}</div>;
    }
  }

  openSidebar(){
    this.setState({
      sidebar: true
    });
  }

  closeSidebar(){
    this.setState({
      sidebar: false
    });
  }

  changeTab(index){
    Promise.resolve(this.setState({tab: index}))
      .then(() => this.scrollToTarget())
  }

  scrollToTarget(){
    const domNode = ReactDOM.findDOMNode(this.scrollTarget.current);
    window.scrollTo({ top: domNode.offsetTop, left:0, behavior: "smooth"})
  }

  render() {
    return (
      <div className="app">
        {this.constructSideBar()}
        <div className={this.state.sidebar ? "overlay" : "overlay overlay-hidden"} onClick={() => this.closeSidebar()}></div>
        <div className="mobile-hamburger-container">
          <div className="mobile-hamburger" onClick={()=> this.openSidebar()}></div>
        </div>
        <header>
        <div className="profile-container">

        </div>
          <div className="text-container">
            <h1 className="title">Thomas Wong</h1>
            <h3 className="description">Developer, Dancer, Dreamer</h3>
            <h3>{this.state.response}</h3>
          </div>

        </header>
        {this.constructNav()}
        {this.constructTab(this.state.tab)}
        <footer>
          <p>Made with <img className="heart" src="../static/img/heart.png" alt="Heart" align="top"/> by Thomas Wong using ReactJs</p>
          <p>(Aug, 2018)</p>
        </footer>
      </div>
    );
  }
}

export default App;
