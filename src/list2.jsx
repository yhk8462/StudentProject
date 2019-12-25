import React from 'react'
 
 
export default class Student extends React.Component{
 
   constructor(props){
       super(props)
       this.state = {
           students: []
       }
   }
 
   componentDidMount(){
       var url = 'https://reqres.in/api/users'
       fetch(url)
           .then(res => res.json())
           .then(json => this.setState({ students: json.data }))
   }
 
   render(){
       return(
       <div>
           <h1>Student Management</h1>
           <h2>Student List</h2>
           <ul>
               {this.state.students.map(s=>
                   <li>{s.id} {s.email}</li>
               )}
           </ul>

       </div>
       )
   }
 
}
