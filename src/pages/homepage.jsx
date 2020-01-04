import React from "react";
import "./style.css";
import { ButtonToolbar, Button, Container, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import Pagination from './paginations.jsx';

const url = "http://localhost:3001/projects/";

export default class Homepage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            projects: [],
            search: '',
            course: ''
        };
    }

    onChangePage(pages) {
        this.setState({ pages: pages })
    }
    updateSearch(event) {
        this.setState({ search: event.target.value })
        console.log(event.target.value);
    }

    handleChangeCourse = event => {
        this.setState({ course: event.target.value });
    };

    fetchData() {
        fetch(url)
            .then(res => res.json())
            .then(json => {
                this.setState({ projects: json })
            });
    }

    getUnique(arr, comp) {
        const unique = arr
            .map(e => e[comp])
            .map((e, i, final) => final.indexOf(e) === i && i)
            .filter(e => arr[e])
            .map(e => arr[e]);
        return unique;
    }

    componentDidMount() {
        this.fetchData();
    }

    render() {
        //{s.sId} {s.sName} {s.sYear} {s.cId} {s.cName} {s.sem} {s.aName} {s.aDes} {s.aPer} {s.tech} {s.scope} {s.des} {s.company} {s.app} {s.photoURL}
        const uniqueCouse = this.getUnique(this.state.projects, "cId");
        const course = this.state.course;
        
        const projects = this.state.projects.filter(
            s => {
                return s.cId.startsWith(course);
            }
        );
        let filterFinal = projects.filter(
            s => {
                return s.sId.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1 || s.sName.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
            }
        );
        

        return (
            <div>
                <Button 
                    variant="warning" 
                    href="/admin"
                    style={{position:'absolute', right:'10px',top:'10px'}}>
                    Admin
                </Button>
                <Row className="header" style={{ marginTop: '20px', marginLeft:'10px'}}>

                    <p style={{ fontWeight: '1', fontSize: '20px', marginRight: '10px'}}>Student Id/Name: </p>

                    <div className="active-pink-3 active-pink-4">
                        <input className="form-control" type="text" placeholder="Search" aria-label="Search" 
                        value={this.state.search} 
                        onChange={this.updateSearch.bind(this)} 
                        style={{ width: '180px', height: '33px'}}/>
                    </div>

                    <p style={{fontWeight:'1', fontSize:'20px',marginRight:'10px',marginLeft:'10px'}}>Course: </p>

                    <select
                        className="select-box--container"
                        value={this.state.course}
                        onChange={this.handleChangeCourse}
                    >
                        <option>COSC</option>
                        {uniqueCouse.map(course => (
                            <option value={course.cId} style={{padding:'10px'}}>
                                {course.cId}
                            </option>
                        ))}
                    </select>

                </Row>

                <h1 style={{ fontWeight: "1", marginLeft: '10px'}}>Project List</h1>
                <div>
                    {filterFinal.map(s => (
                        <div style={{ display: 'inline-block', padding: '20px' }}>
                            <img src={s.photoURL} width="300" />
                            <p style={{fontWeight:'1'}}>
                                {s.cId} {s.sId} {s.sName}
                            </p>
                            <Link to={`/projects/${s._id}`}>   
                                <Button variant="primary">
                                    Details
                                </Button>
                            </Link>
                            
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}