import React from "react";
import "./style.css";
import { ButtonToolbar, Button, Container, Row, Col, Card} from 'react-bootstrap'

const url = "http://localhost:3001/projects/";

export default class Homepage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            projects: [],
            search: '',
            course: '', _id:'',
            sId: '', sName: '', sYear: '', cId: '', cName: '', sem: '', aName: '', aDes: '', aPer: '', tech: '', scope: '', des: '', company: '', app: '',
            addNew: true
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
    //-----------------------------------------Admin functions--------------------------------------
    handleChange(e) {
        var obj = {}
        obj[e.target.name] = e.target.value
        this.setState(obj)
    }
    save() {
        if (this.state.addNew === true) {
            fetch(url, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ _id: this.state._id, sId: this.state.sId, sName: this.state.sName, sYear: this.state.sYear, cId: this.state.cId, cName: this.state.cName, sem: this.state.sem, aName: this.state.aName, aDes: this.state.aDes, aPer: this.state.aPer, tech: this.state.tech, scope: this.state.scope, des: this.state.des, company: this.state.company, app: this.state.app })
            }).then(json => this.fetchData())
        }
        else {
            fetch(url+ this.state._id, {
                method: 'put',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ _id: this.state._id,sId: this.state.sId, sName: this.state.sName, sYear: this.state.sYear, cId: this.state.cId, cName: this.state.cName, sem: this.state.sem, aName: this.state.aName, aDes: this.state.aDes, aPer: this.state.aPer, tech: this.state.tech, scope: this.state.scope, des: this.state.des, company: this.state.company, app: this.state.app })        
            }).then(json => this.fetchData())
        }

    }

    add(_id, sId, sName, sYear, cId, cName, sem, aName, aDes, aPer, tech, scope, des, company, app) {
        this.setState({ _id:'',sId: '', sName: '', sYear: '', cId: '', cName: '', sem: '', aName: '', aDes: '', aPer: '', tech: '', scope: '', des: '', company: '', app: '', addNew: true })
    }
    edit(_id,sId, sName, sYear, cId, cName, sem, aName, aDes, aPer, tech, scope, des, company, app) {
        this.setState({ _id: _id,sId: sId, sName: sName, sYear: sYear, cId: cId, cName: cName, sem: sem, aName: aName, aDes: aDes, aPer: aPer, tech: tech, scope: scope, des: des, company: company, app: app,addNew: false })
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
                    variant="primary"
                    href="/"
                    style={{ position: 'absolute', right: '10px', top: '10px' }}>
                    Home
                </Button>
                <Row className="header" style={{ marginTop: '20px', marginLeft: '10px' }}>

                    <p style={{ fontWeight: '1', fontSize: '20px', marginRight: '10px' }}>Student Id/Name: </p>

                    <div className="active-pink-3 active-pink-4">
                        <input className="form-control" type="text" placeholder="Search" aria-label="Search"
                            value={this.state.search}
                            onChange={this.updateSearch.bind(this)}
                            style={{ width: '180px', height: '33px' }} />
                    </div>

                    <p style={{ fontWeight: '1', fontSize: '20px', marginRight: '10px', marginLeft: '10px' }}>Course: </p>

                    <select
                        className="select-box--container"
                        value={this.state.course}
                        onChange={this.handleChangeCourse}
                    >
                        <option>COSC</option>
                        {uniqueCouse.map(course => (
                            <option value={course.cId} style={{ padding: '10px' }}>
                                {course.cId}
                            </option>
                        ))}
                    </select>

                </Row>

                <h1 style={{ fontWeight: "1", marginLeft: '10px' }}>Project List</h1>
                <Row style={{marginLeft:'20px'}}>
                    <Col md={6}>
                        {filterFinal.map(s => (
                            <Card bg="light" border="primary" style={{ fontWeight: '1', marginBottom: '10px', marginTop: '20px'}}>
                                <Card.Header className="text-center" style={{fontWeight:'bold'}}>Id: {s.sId}</Card.Header>
                                <div style={{padding:'10px'}}>
                                    <p><p className="text">Student Name: </p>{s.sName}</p>
                                    <p><p className="text">Student Year: </p>{s.sYear}</p>
                                    <p><p className="text">Semester: </p>{s.sem}</p>
                                    <p><p className="text">Course Id: </p>{s.cId}</p>
                                    <p><p className="text">Course Name: </p>{s.cName}</p>
                                    <p><p className="text">Assginment Percentage: </p>{s.aPer}</p>
                                    <p><p className="text">Assginment Description: </p>{s.aDes}</p>
                                    <p><p className="text">Scope: </p>{s.scope}</p>
                                    <p><p className="text">Tech used: </p>{s.tech}</p>
                                    <p><p className="text">Description: </p>{s.des}</p>
                                    <p><p className="text">Company: </p>{s.company}</p>
                                    <p><p className="text">App availability: </p>{s.app}</p>
                                </div>
                                <ButtonToolbar style={{ marginLeft: '580px', marginBottom: '10px'}}>
                                    <Button variant="warning" onClick={this.edit.bind(this, s._id, s.sId, s.sName, s.sYear, s.cId, s.cName, s.sem, s.aName, s.aDes, s.aPer, s.tech, s.scope, s.des, s.company, s.app)}>
                                        Edit
                                    </Button>
                                    <Button variant="danger" style={{marginLeft:'10px'}}>
                                        Delete
                                    </Button>
                                </ButtonToolbar>

                            </Card>
                        ))}
                    </Col>
                    <Col md={6} >
                        <h3 style={{marginTop:'20px',fontWeight:'1'}}>Edit Project</h3>
                        <div >
                            id: <input type="text" id="_id" name="_id" value={this.state._id}
                                onChange={this.handleChange.bind(this)} />
                            <br></br><br></br>
                            Student id: <input type="text" id="sId" name="sId" value={this.state.sId}
                                onChange={this.handleChange.bind(this)} />
                            <br></br><br></br>
                            Student Name: <input type="text" id="sName" name="sName" value={this.state.sName}
                                onChange={this.handleChange.bind(this)} />
                            <br></br><br></br>
                            Year: <input type="text" id="sYear" name="sYear" value={this.state.sYear}
                                onChange={this.handleChange.bind(this)} />
                            <br></br><br></br>
                            Course id: <input type="text" id="cId" name="cId" value={this.state.cId}
                                onChange={this.handleChange.bind(this)} />
                            <br></br><br></br>
                            Course Name: <input type="text" id="cName" name="cName" value={this.state.cName}
                                onChange={this.handleChange.bind(this)} />
                            <br></br><br></br>
                            Semester: <input type="text" id="sem" name="sem" value={this.state.sem}
                                onChange={this.handleChange.bind(this)} />
                            <br></br><br></br>
                            Assignment Name: <input type="text" id="aName" name="aName" value={this.state.aName}
                                onChange={this.handleChange.bind(this)} />
                            <br></br><br></br>
                            Assignment Description: <input type="text" id="aDes" name="aDes" value={this.state.aDes}
                                onChange={this.handleChange.bind(this)} />
                            <br></br><br></br>
                            Percentage: <input type="text" id="aPer" name="aPer" value={this.state.aPer}
                                onChange={this.handleChange.bind(this)} />
                            <br></br><br></br>
                            Technology used: <input type="text" id="tech" name="tech" value={this.state.tech}
                                onChange={this.handleChange.bind(this)} />
                            <br></br><br></br>
                            Scope: <input type="text" id="scope" name="scope" value={this.state.scope}
                                onChange={this.handleChange.bind(this)} />
                            <br></br><br></br>
                            Description: <input type="text" id="des" name="des" value={this.state.des}
                                onChange={this.handleChange.bind(this)} />
                            <br></br><br></br>
                            Company: <input type="text" id="company" name="company" value={this.state.company}
                                onChange={this.handleChange.bind(this)} />
                            <br></br><br></br>
                            App availability: <input type="text" id="app" name="app" value={this.state.app}
                                onChange={this.handleChange.bind(this)} />
                            <br></br><br></br>
                            


                            <ButtonToolbar style={{ marginBottom: '100px' }}>
                                <Button variant="primary" onClick={this.save.bind(this)} style={{ marginRight: '10px' }}>Update</Button>
                                <Button variant="primary" onClick={this.add.bind(this)}>Clear</Button>
                            </ButtonToolbar>
                        </div>
                        <br></br>
                    </Col>
                </Row>
            </div>
        );
    }
}