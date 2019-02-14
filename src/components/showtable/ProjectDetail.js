import React from 'react'
import Axios from 'axios';
import {DeveloperinProject1} from './DeveloperinProject';
import {Redirect} from 'react-router';

class ProjectDetail extends React.Component{
    constructor(props){
        super(props);
        this.mark=this.mark.bind(this);
        this.developer=this.developer.bind(this);
        this.state={data:[],showdeveloper:false,type:"",redirect:false};
        Axios.get('https://enigmatic-brook-34927.herokuapp.com/user',{withCredentials:true})
        .then(res=>{
            if(res.status===200){
                Axios.get(`https://enigmatic-brook-34927.herokuapp.com/projectdetail/${this.props.match.params.id}`,{headers:{Authorization: `Bearer ${res.data}`}})
                .then(res=>{
                    if(res.status=200)
                        this.setState({data:res.data,type:res.data.type});
                })
            }
        })
    }

    mark(type){
        Axios.get('https://enigmatic-brook-34927.herokuapp.com/user',{withCredentials:true}).then(res=>{
            Axios.put(`https://enigmatic-brook-34927.herokuapp.com/updateprojectstatus/${this.props.match.params.id}`,{type},{headers:{Authorization: `Bearer ${res.data}`}})
            .then(res=>{
                if(res.data){
                    this.setState({redirect:true});
                }
            })
        })
    }

    developer(){
        if(this.state.showdeveloper)
            this.setState({showdeveloper:false});
        else
            this.setState({showdeveloper:true});
    }

    render(){
        console.log(this.state.type)
        if(this.state.redirect){
                return(
                <Redirect to='/admindashboard'/>
                )
        }
        else if(this.state.showdeveloper){
            if(this.state.type === "completed"){
                return(
                    <div style={{marginTop:"7em",justifyContentL:"center"}}>
                      <div style={{textAlign:"center",display:"flex",justifyContent:"center"}}><h4>Name of the project :</h4>
                     <h4 style={{color:"red"}}>{this.state.data.name}</h4> 
                      </div><br/>
                      <div style={{textAlign:"center",display:"flex",justifyContent:"center"}}><h4>Details of the project :</h4>
                     <h4 style={{color:"red"}}>{this.state.data.details}</h4> 
                      </div> <br/>
                      <div style={{textAlign:"center",display:"flex",justifyContent:"center"}}><h4>Start Date of the project :</h4>
                     <h4 style={{color:"red"}}>{this.state.data.startdate}</h4> 
                      </div>  <br/>
                      <div style={{textAlign:"center",display:"flex",justifyContent:"center"}}><h4>End Date of the project :</h4>
                     <h4 style={{color:"red"}}>{this.state.data.enddate}</h4> 
                      </div><br/>
                      <div style={{textAlign:"center",display:"flex",justifyContent:"center"}}><h4>Project Type :</h4>
                     <h4 style={{color:"red"}}>{this.state.type}</h4> 
                      </div><br/>
                      <div style={{textAlign:"center",display:"flex",justifyContent:"center"}}><button onClick={this.developer}>Click to Hide</button>
                      </div><br/>
                      <div style={{textAlign:"center",display:"flex",justifyContent:"center"}}><button onClick={()=>this.mark('ongoing')}>Mark as Ongoing</button></div><br/>
                      <div style={{textAlign:"center",display:"flex",justifyContent:"center"}}><a href={`/assign/${this.props.match.params.id}`}><p>Click to Add more Developer</p></a>
                      </div><br/>
                      <DeveloperinProject1 style={{justifyContent:"center"}} proid={this.props.match.params.id}/>   
                    </div>
                    )
            }
            else if(this.state.type === "ongoing"){
                return(
                    <div style={{marginTop:"7em",justifyContentL:"center"}}>
                      <div style={{textAlign:"center",display:"flex",justifyContent:"center"}}><h4>Name of the project :</h4>
                     <h4 style={{color:"red"}}>{this.state.data.name}</h4> 
                      </div><br/>
                      <div style={{textAlign:"center",display:"flex",justifyContent:"center"}}><h4>Details of the project :</h4>
                     <h4 style={{color:"red"}}>{this.state.data.details}</h4> 
                      </div> <br/>
                      <div style={{textAlign:"center",display:"flex",justifyContent:"center"}}><h4>Start Date of the project :</h4>
                     <h4 style={{color:"red"}}>{this.state.data.startdate}</h4> 
                      </div>  <br/>
                      <div style={{textAlign:"center",display:"flex",justifyContent:"center"}}><h4>End Date of the project :</h4>
                     <h4 style={{color:"red"}}>{this.state.data.enddate}</h4> 
                      </div><br/>
                      <div style={{textAlign:"center",display:"flex",justifyContent:"center"}}><h4>Project Type :</h4>
                     <h4 style={{color:"red"}}>{this.state.type}</h4> 
                      </div><br/>
                      <div style={{textAlign:"center",display:"flex",justifyContent:"center"}}><button onClick={this.developer}>Click to hide</button>
                      </div><br/>
                     <div style={{textAlign:"center",display:"flex",justifyContent:"center"}}><button onClick={()=>this.mark('completed')}>Mark as completed</button></div><br/>
                      <div style={{textAlign:"center",display:"flex",justifyContent:"center"}}><a href={`/assign/${this.props.match.params.id}`}><p>Click to Add more Developer</p></a>
                      </div><br/>
                      <DeveloperinProject1 style={{justifyContent:"center"}} proid={this.props.match.params.id}/>   
                    </div>
                    )
                }
        }
        
        else{
            if(this.state.type === "completed"){
                return(
                    <div style={{marginTop:"7em",justifyContentL:"center"}}>
                      <div style={{textAlign:"center",display:"flex",justifyContent:"center"}}><h4>Name of the project :</h4>
                     <h4 style={{color:"red"}}>{this.state.data.name}</h4> 
                      </div><br/>
                      <div style={{textAlign:"center",display:"flex",justifyContent:"center"}}><h4>Details of the project :</h4>
                     <h4 style={{color:"red"}}>{this.state.data.details}</h4> 
                      </div> <br/>
                      <div style={{textAlign:"center",display:"flex",justifyContent:"center"}}><h4>Start Date of the project :</h4>
                     <h4 style={{color:"red"}}>{this.state.data.startdate}</h4> 
                      </div>  <br/>
                      <div style={{textAlign:"center",display:"flex",justifyContent:"center"}}><h4>End Date of the project :</h4>
                     <h4 style={{color:"red"}}>{this.state.data.enddate}</h4> 
                      </div><br/>
                      <div style={{textAlign:"center",display:"flex",justifyContent:"center"}}><h4>Project Type :</h4>
                     <h4 style={{color:"red"}}>{this.state.type}</h4> 
                      </div><br/>
                      <div style={{textAlign:"center",display:"flex",justifyContent:"center"}}><button onClick={this.developer}>Click to Show developer</button>
                      </div><br/>
                      <div style={{textAlign:"center",display:"flex",justifyContent:"center"}}><button onClick={()=>this.mark('ongoing')}>Mark as ongoing</button></div><br/>
                      <div style={{textAlign:"center",display:"flex",justifyContent:"center"}}><a href={`/assign/${this.props.match.params.id}`}><p>Click to Add more Developer</p></a>
                      </div><br/>
                    </div>
                    )
            }
            else if(this.state.type === "ongoing"){
                return(
                    <div style={{marginTop:"7em",justifyContentL:"center"}}>
                      <div style={{textAlign:"center",display:"flex",justifyContent:"center"}}><h4>Name of the project :</h4>
                     <h4 style={{color:"red"}}>{this.state.data.name}</h4> 
                      </div><br/>
                      <div style={{textAlign:"center",display:"flex",justifyContent:"center"}}><h4>Details of the project :</h4>
                     <h4 style={{color:"red"}}>{this.state.data.details}</h4> 
                      </div> <br/>
                      <div style={{textAlign:"center",display:"flex",justifyContent:"center"}}><h4>Start Date of the project :</h4>
                     <h4 style={{color:"red"}}>{this.state.data.startdate}</h4> 
                      </div>  <br/>
                      <div style={{textAlign:"center",display:"flex",justifyContent:"center"}}><h4>End Date of the project :</h4>
                     <h4 style={{color:"red"}}>{this.state.data.enddate}</h4> 
                      </div><br/>
                      <div style={{textAlign:"center",display:"flex",justifyContent:"center"}}><h4>Project Type :</h4>
                        <h4 style={{color:"red"}}>{this.state.type}</h4> 
                      </div><br/>
                      <div style={{textAlign:"center",display:"flex",justifyContent:"center"}}><button onClick={this.developer}>Click to See developers</button>
                      </div><br/>
                      <div style={{textAlign:"center",display:"flex",justifyContent:"center"}}><button onClick={()=>this.mark('completed')}>Mark as completed</button></div><br/>
                      <div style={{textAlign:"center",display:"flex",justifyContent:"center"}}><a href={`/assign/${this.props.match.params.id}`}><p>Click to Add more Developer</p></a>
                      </div><br/>
                    </div>
                    )
                }
          }
          return(<></>)
    }
}
export default ProjectDetail;