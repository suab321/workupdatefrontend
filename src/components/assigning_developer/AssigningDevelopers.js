import React from 'react';
import ReactTable from 'react-table';
import checkboxHOC from "react-table/lib/hoc/selectTable";
import "react-table/react-table.css";
import Axios from 'axios';
import {Redirect} from 'react-router';

const CheckboxTable=new checkboxHOC(ReactTable);

class AssigningDeveloper extends React.Component{
    constructor(props){
        super(props);
        this.state={
          data:[],
          developers:[],
          selection:[],
          selectAll:false,
          redirect:false
        };
        this.fetchData=this.fetchData.bind(this);
          
    }
    fetchData(){
        Axios.get('https://young-ocean-54472.herokuapp.com/user',{withCredentials:true}).then(res=>{
            if(res.status===200){
                Axios.get(`https://young-ocean-54472.herokuapp.com/get_all_developers/${this.props.match.params.proid}`,{headers:{Authorization: `Bearer ${res.data}`}})
                .then(res=>{
                    this.setState({data:res.data});
                })
                Axios.get(`https://young-ocean-54472.herokuapp.com/getdeveloperinproject/${this.props.match.params.proid}`).then(res=>{
                  if(res.status===200)
                    this.setState({developers:res.data.developers});
                })
            }
        })
    }


    toggleSelection = (key, shift, row) => {
      let selection = [...this.state.selection];
      const keyIndex = selection.indexOf(key);
      if (keyIndex >= 0) {
        selection = [
          ...selection.slice(0, keyIndex),
          ...selection.slice(keyIndex + 1)
        ];
      } else {
        selection.push(key);
      }
      this.setState({ selection });
    };

    toggleAll = () => {
    
      const selectAll = this.state.selectAll ? false : true;
      const selection = [];
      if (selectAll) {
        const wrappedInstance = this.checkboxTable.getWrappedInstance();
        const currentRecords = wrappedInstance.getResolvedState().sortedData;
        currentRecords.forEach(item => {
          selection.push(item._original._id);
        });
      }
      this.setState({ selectAll, selection });
    };
  
    isSelected = key => {
      //console.log(key);
     
      return this.state.selection.includes(key);
    };
  
    logSelection = () => {
      this.setState({redirect:true});
      console.log(this.state.selection);
      Axios.get('https://young-ocean-54472.herokuapp.com/user',{withCredentials:true}).then(res=>{
        if(res.status===200){
          Axios.put(`https://young-ocean-54472.herokuapp.com/assigndevelopers/${this.props.match.params.proid}`,{developers:this.state.selection},{headers:{Authorization: `Bearer ${res.data}`}})
        }
      })
    };
   
  
    render() {
      const { toggleSelection, toggleAll, isSelected, logSelection } = this;
      const { data , selectAll } = this.state;


      const checkboxProps = {
        selectAll,
        isSelected,
        toggleSelection,
        toggleAll,
        selectType: "checkbox",
      };

        if(!this.state.redirect){
        return (
          <div style={{width:"80%",margin:"5em 15%"}}>
          <h1>{this.props.match.params.id}</h1>
          <button onClick={logSelection}>Involve them</button>
            <CheckboxTable style={{textAlign:"center"}}
                ref={r => this.checkboxTable = r}
              columns={[
                {
                  Header: "Name",
                  accessor:"name",
                  width:130
                },
                {
                  Header: "ContactNo.",
                  accessor:"contactNo",
                  width:100
                },
                {
                  Header: 'Skills',
                  accessor:"skills"
                }
              ]}
              data={data}
              onFetchData={this.fetchData}
              {...checkboxProps}
            />
            <br />
          </div>
        )
          }
          else{
            return(
            <Redirect to="/admindashboard"/>
            )
          }
      }
}
export default AssigningDeveloper;