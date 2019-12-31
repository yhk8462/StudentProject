import React from "react";
import { MDBCol } from "mdbreact";
import SelectBox from './select';
import "./style.css";

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
    
        let fileredProjects = this.state.projects.filter(
            s => {
                return s.sId.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
            }
        );
        const uniqueCouse = this.getUnique(this.state.projects, "cId");
        const courses = this.state.projects;
        const course = this.state.course;
        const filterDropdown = courses.filter(function (result) {
            return result.cId === course;
        });

        return (
            <div>
                <div>
                    <MDBCol style={{ marginLeft: '10px', fontWeight: '1', fontSize: '20px' }}>
                        <div className="active-pink-3 active-pink-4 mb-4">
                            Student Id: <input className="form-control" type="text" placeholder=" Search" aria-label="Search" 
                            value={this.state.search} 
                            onChange={this.updateSearch.bind(this)} 
                            style={{width:'150px', height:'32px',}}/>
                        </div>
                    </MDBCol>
                    <div style={{ display: 'inline-block' }}>
                        <select
                            className="select-box--container"
                            value={this.state.course}
                            onChange={this.handleChangeCourse}
                        >
                            {uniqueCouse.map(course => (
                                <option value={course.cId}>
                                    {course.cId}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <h1 style={{ fontWeight: "1", marginLeft: '10px' }}>Project List</h1>

                <div>
                    {filterDropdown.map(s => (
                        <div style={{ margin: "10px" }}>
                            <p>
                                {s.cId} {s.sId} {s.sName}
                            </p>
                        </div>
                    ))}
                </div>

                <div>
                    {fileredProjects.map(s => (
                        <div style={{ display: 'inline-block', padding: '20px' }}>
                            <img src={s.photoURL} width="300" />
                            <p>
                                {s.cId} {s.sId} {s.sName}
                            </p>
                            
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}