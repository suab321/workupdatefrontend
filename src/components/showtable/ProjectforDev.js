import React from 'react';
import Axios from 'axios';
import {DeveloperinProject2} from './DeveloperinProject';
import './showtable.css';


class ProjectforDev extends React.Component{
    constructor(props){
        super(props);
        this.state={data:null,read:false,prodetail:[],showdeveloper:0,tasks:[]};
        this.showtask=this.showtask.bind(this);
        this.mark=this.mark.bind(this);
        this.update=this.update.bind(this);
        this.developer=this.developer.bind(this);
        this.edit=this.edit.bind(this);
        this.input=React.createRef();
        Axios.get('https://enigmatic-brook-34927.herokuapp.com/user',{withCredentials:true}).then(res=>{
            if(res.status===200){
                Axios.get(`https://enigmatic-brook-34927.herokuapp.com/getstatus/${this.props.match.params.proid}`,{headers:{Authorization: `Bearer ${res.data}`}})
                .then(res=>{
                    this.setState({data:res.data[0].currentStatus})
                })
                Axios.get(`https://enigmatic-brook-34927.herokuapp.com/projectdetailfordev/${this.props.match.params.proid}`,{headers:{Authorization: `Bearer ${res.data}`}}).then(res=>{
                    if(res.status===200)
                        this.setState({prodetail:res.data});
                })
            }
        })
    }
    developer(){
        if(this.state.showdeveloper)
            this.setState({showdeveloper:0});
        else
            this.setState({showdeveloper:1});
    }

    update(){
        console.log();
        this.input.current.readOnly=false;
        Axios.get(`https://enigmatic-brook-34927.herokuapp.com/user`,{withCredentials:true}).then(res=>{
            if(res.status===200)
            {
                Axios.put(`https://enigmatic-brook-34927.herokuapp.com/updatestatus/${this.props.match.params.proid}`,{status:`${this.input.current.value}`},{headers:{Authorization: `Bearer ${res.data}`}}).then(res=>{
                    if(res.status === 200||res.status === 304)
                        this.setState({showdeveloper:0})
                })
            }
        })
    }
    showtask(){
        Axios.get(`https://enigmatic-brook-34927.herokuapp.com/getprojectstask/${this.props.match.params.proid}`,{withCredentials:true})
        .then(res=>{
            if(res.status === 200)
                this.setState({tasks:res.data})
        })
        if(this.state.showdeveloper === 2)
            this.setState({showdeveloper:0});
        else
            this.setState({showdeveloper:2});
    }
    edit(){
        this.input.current.readOnly=false;
       this.setState({read:false})
    }
    sort(tasks){
        for(var i=0;i<tasks.length-1;i++){
            for(var j=i+1;j<tasks.length;j++){
                if(tasks[i].iscomplete>tasks[j].iscomplete){
                    var x=tasks[i];
                    tasks[i]=tasks[j];
                    tasks[j]=x;
                }
            }
        }
        return tasks;
    }
    mark(iscomplete,i){
        console.log(iscomplete,i);
       Axios.get('https://enigmatic-brook-34927.herokuapp.com/user',{withCredentials:true}).then(res=>{
           if(res.status === 200){
            Axios.put(`https://enigmatic-brook-34927.herokuapp.com/updateassigntask/${this.props.match.params.proid}/${i._id}`,{task:i.task,enddate:i.enddate,iscomplete:iscomplete,proid:i.proid},{headers:{Authorization: `Bearer ${res.data}`}}).then(res=>{
                this.setState({showdeveloper:0})
            })
           }
       })
    }

    render(){
        if(this.state.showdeveloper === 1){
            console.log(this.state.prodetail.developers);
        return(
            <div>
            <div style={{marginTop:'7em'}}></div>
             <div style={{textAlign:"center",display:"flex",justifyContent:"center"}}><h4>Name of the project :</h4>
                 <h4 style={{color:"red"}}>{this.state.prodetail.name}</h4> 
                </div><br/>
                <div style={{textAlign:"center",display:"flex",justifyContent:"center"}}><h4>Details of the project :</h4>
                 <h4 style={{color:"red"}}>{this.state.prodetail.details}</h4> 
                  </div><br/>
                  <div style={{textAlign:"center",display:"flex",justifyContent:"center"}}><button onClick={this.developer}>Click to hide</button>
                  </div><br/>
                  <DeveloperinProject2 style={{justifyContent:"center"}} proid={this.props.match.params.proid}/>   
                </div>
          )
        }
        else if(this.state.showdeveloper === 0){
            return(
                <div>
                <div style={{marginTop:'7em'}}></div>
                <div style={{textAlign:"center",display:"flex",justifyContent:"center"}}><h4>Name of the project :</h4>
                 <h4 style={{color:"red"}}>{this.state.prodetail.name}</h4> 
                </div><br/>
                      <div style={{textAlign:"center",display:"flex",justifyContent:"center"}}><h4>Details of the project :</h4>
                 <h4 style={{color:"red"}}>{this.state.prodetail.details}</h4> 
                  </div><br/>
                      <div style={{textAlign:"center",display:"flex",justifyContent:"center"}}><button onClick={this.showtask}>Click to see tasks assigned</button>
                      </div><br/>
                      <div style={{textAlign:"center",display:"flex",justifyContent:"center"}}><button onClick={this.developer}>Click to see the developers of project</button>
                      </div><br/>
                <div>
                    <label>Status</label>
                    <input type="text" ref={this.input} readOnly={true} placeholder={this.state.data} />
                    <button onClick={this.edit}>Click to edit your status</button>
                    <button onClick={this.update}>Set Status</button>  
                </div>
            </div>
            )
        }
        else{
            var tasks=this.state.tasks;
            tasks=this.sort(tasks);
            var task;
            if(tasks.length === 0){
                task=<h1 style={{textAlign:'center'}}>NO TASK IS ASSIGNED</h1>
            }
            else{
             task=tasks.map(i=>{
                if(i.iscomplete){
                    return(
                        <div className="task_card" style={{background:'green'}}>
                        <h3>Completed Tasks</h3>
                            <div style={{justifyContent:"flex"}}>
                                <h6>task:</h6>{i.task}
                                <h6>endate:</h6>{i.enddate}<br/><br/>
                                <button style={{textAlign:"right"}} onClick={()=>{this.mark(0,i)}}>mark as incomplete</button>
                            </div>
                            {/* <div style={{justifyContent:"flex"}}>
                                
                            </div> */}
                        </div>
                    )
                }
                else{
                    return(
                        <div className="task_card" style={{background:'red'}}>
                        <h3>Yet To be Finished Tasks</h3>
                            <div style={{justifyContent:"flex"}}>
                                <h6>task:</h6>{i.task}
                            </div>
                            <div style={{justifyContent:"flex"}}>
                                <h6>endate:</h6>{i.enddate}<br/><br/>
                                <button style={{textAlign:"right"}} onClick={()=>{this.mark(1,i)}}>mark as complete</button>
                            </div>
                        </div>
                    )
                }
            })
        }
            return(<div style={{marginTop:'7em'}}>
            <div style={{marginTop:"7em",justifyContentL:"center"}}>
            <div style={{textAlign:"center",display:"flex",justifyContent:"center"}}><h4>Name of the project :</h4>
                 <h4 style={{color:"red"}}>{this.state.prodetail.name}</h4> 
                </div><br/>
                  <div style={{textAlign:"center",display:"flex",justifyContent:"center"}}><h4>Details of the project :</h4>
                 <h4 style={{color:"red"}}>{this.state.prodetail.details}</h4> 
                  </div> <br/>
                  <div style={{textAlign:"center",display:"flex",justifyContent:"center"}}><button onClick={this.showtask}>Click to hide</button>
                  </div><br/>
                  {task}
                </div>
            </div>
            )
        }
    }
}
export default ProjectforDev;
