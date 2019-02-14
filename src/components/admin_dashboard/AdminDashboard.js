import React from 'react';
import Axios from 'axios';
import {Button} from 'react-bootstrap';
import {ShowTable1} from '../showtable/ShowTable';

class AdminDashboard extends React.Component{
    constructor(props){
        super(props);
        this.state={name:"",error:"",type:""};
        Axios.get('https://young-ocean-54472.herokuapp.com/user',{withCredentials:true}).then(res=>{
            if(res.status===200){
                Axios.get(`https://young-ocean-54472.herokuapp.com/cancreate`,{headers:{Authorization: `Bearer ${res.data}`}}).then(res=>{
                    if(res.data==="yes"){
                        this.setState({error:res.data})
                    }
            })
           }
        })
            Axios.get('https://young-ocean-54472.herokuapp.com/user',{withCredentials:true}).then(res=>{
                if(res.status===200){
                    Axios.get(`https://young-ocean-54472.herokuapp.com/name`,{headers:{Authorization: `Bearer ${res.data}`}})
                    .then(res=>this.setState({name:res.data.user.name}))
                }
            })
    }

    selected(){
        console.log("yes");
    }

    render(){
        console.log(this.state.error)
        if(this.state.error!=="yes"){
            return(
                <div style={{marginTop:"7em",justifyContent:"center"}}>
                    <h1 style={{textAlign:"center"}}>You are not an Admin</h1>
                </div>
            )
        }
    else{
        if(this.state.type===""){
         return(
                <div style={{marginTop:"7em",justifyContent:"center"}}>
                    <h1 style={{textAlign:"center"}}>Welcome home {this.state.name}</h1>
                    <div style={{paddingLeft:"2%"}}>
                    <Button onClick={()=>{this.setState({type:"ongoing"})}} bsStyle="danger">Ongoing</Button>
                    <Button onClick={()=>{this.setState({type:"completed"})}} bsStyle="success">Completed</Button>
                    </div>
                    <div style={{textAlign:'right',paddingRight:'5%'}}><Button href="/all_developer" bsStyle="info">
                        Click to see all the developers
                        </Button></div>
                </div>
            )
         }
         else{
            return(
                <div style={{marginTop:"7em",justifyContent:"center"}}>
                    <h1 style={{textAlign:"center"}}>Welcome home {this.state.name}</h1>
                    <div style={{paddingLeft:"2%"}}>
                    <Button onClick={()=>{this.setState({type:"ongoing"})}} bsStyle="danger">Ongoing</Button>
                    <Button onClick={()=>{this.setState({type:"completed"})}} bsStyle="success">Completed</Button>
                    <div style={{textAlign:'right'}}><Button href="/all_developer" bsStyle="info">
                        Click to see all the developers
                        </Button></div>
                    </div>
                    <ShowTable1 selected={this.selected} type={this.state.type}/>
                </div>
               )
            }
        }
    }
}
export default AdminDashboard;