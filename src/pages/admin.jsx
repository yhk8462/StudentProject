import React from "react";
import "./style.css";
import { ButtonToolbar, Button, Container, Row, Col, Card} from 'react-bootstrap'

const url = 'https://cors-anywhere.herokuapp.com/'+"https://node-api.azurewebsites.net/projects/";

export default class Homepage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            projects: [],
            search: '',
            course: '', _id:'',
            sId: '', sName: '', sYear: '', cId: '', cName: '', sem: '', aName: '', aDes: '', aPer: '', tech: '', scope: '', des: '', company: '', app: '',photoURL:'',
            error:'',
            addNew: true
        };
    }
    validate = () => {
        let error= '';
        let sNameError='';
        let sYearError = '';
        let cIdError = '';
        let cNameError = '';
        let semError = '';
        let aNameError = '';
        let aDesError = '';
        let aPerError = '';
        let techError = '';
        let scopeError = '';
        let desError = '';
        let companyError = '';
        let appError = '';
        let photoURLError = '';

        if(!this.state.sId){
            error = "*This field is empty";
        }
        if (!this.state.sName) {
            sNameError = "*This field is empty";
        }
        if (!this.state.sYear) {
            sYearError = "*This field is empty";
        }
        if (!this.state.cId) {
            cIdError = "*This field is empty";
        }
        if (!this.state.cName) {
            cNameError = "*This field is empty";
        }
        if (!this.state.sem) {
            semError = "*This field is empty";
        }
        if (!this.state.aName) {
            aNameError = "*This field is empty";
        }
        if (!this.state.aDes) {
            aDesError = "*This field is empty";
        }
        if (!this.state.aPer) {
            aPerError = "*This field is empty";
        }
        if (!this.state.tech) {
            techError = "*This field is empty";
        }
        if (!this.state.scope) {
            scopeError = "*This field is empty";
        }
        if (!this.state.des) {
            desError = "*This field is empty";
        }
        if (!this.state.company) {
            companyError = "*This field is empty";
        }
        if (!this.state.app) {
            appError = "*This field is empty";
        }
        if (!this.state.photoURL) {
            photoURLError = "*This field is empty";
        }

        if (error || sNameError || sYearError || cIdError || cNameError || semError || aNameError || aDesError || aPerError || techError || scopeError || desError || companyError || appError || photoURLError){
            this.setState({ error, sNameError, sYearError, cIdError, cNameError, semError, aNameError, aDesError, aPerError, techError, scopeError, desError, companyError, appError, photoURLError});
            return false 
        }
        return true
    }
    handleSubmit = event => {
        event.preventDefault();
        const isValid = this.validate();
        if (isValid){
            console.log(this.state);
        }
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
    delete(id) {
        if (window.confirm('Do you want to delete?')) {
            fetch(url + id, {
                method: 'delete',
            }).then(json => this.fetchData())

        }

    }

    handleChange(e) {
        var obj = {}
        obj[e.target.name] = e.target.value
        this.setState(obj)
    }
    save(data) {
        if (this.state.addNew === true) {
            fetch(url, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ sId: this.state.sId, sName: this.state.sName, sYear: this.state.sYear, cId: this.state.cId, cName: this.state.cName, sem: this.state.sem, aName: this.state.aName, aDes: this.state.aDes, aPer: this.state.aPer, tech: this.state.tech, scope: this.state.scope, des: this.state.des, company: this.state.company, app: this.state.app, photoURL: this.state.photoURL })
            }).then(json => this.fetchData())
        }
        else {
            fetch(url + data, {
                method: 'put',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ _id: this.state._id, sId: this.state.sId, sName: this.state.sName, sYear: this.state.sYear, cId: this.state.cId, cName: this.state.cName, sem: this.state.sem, aName: this.state.aName, aDes: this.state.aDes, aPer: this.state.aPer, tech: this.state.tech, scope: this.state.scope, des: this.state.des, company: this.state.company, app: this.state.app, photoURL: this.state.photoURL })        
            }).then(json => this.fetchData())
        }

    }

    add( sId, sName, sYear, cId, cName, sem, aName, aDes, aPer, tech, scope, des, company, app, photoURL) {
        this.setState({ sId: '', sName: '', sYear: '', cId: '', cName: '', sem: '', aName: '', aDes: '', aPer: '', tech: '', scope: '', des: '', company: '', app: '', photoURL:'',addNew: true })
    }
    edit(_id,sId, sName, sYear, cId, cName, sem, aName, aDes, aPer, tech, scope, des, company, app,photoURL) {
        this.setState({ _id: _id,sId: sId, sName: sName, sYear: sYear, cId: cId, cName: cName, sem: sem, aName: aName, aDes: aDes, aPer: aPer, tech: tech, scope: scope, des: des, company: company, app: app,photoURL: photoURL,addNew: false })
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

                <h1 style={{ fontWeight: "1", marginLeft: '40px'}}>Project List</h1>
                <Row style={{marginLeft:'20px'}}>
                    <Col md={6}>
                        {filterFinal.map(s => (
                            <Card bg="light" border="primary" style={{ fontWeight: '1', marginBottom: '10px', marginTop: '20px'}}>
                                <Card.Header className="text-center" style={{fontWeight:'bold'}}>Id: {s.sId}</Card.Header>
                                <Card.Img variant="top" src={s.photoURL} style={{width:'400px',marginTop:'10px',marginLeft:'Auto',marginRight:'Auto'}}/>
                                <div style={{padding:'10px'}}>
                                    <div><p className="text">Student Name: </p>{s.sName}</div>
                                    <div><p className="text">Student Year: </p>{s.sYear}</div>
                                    <div><p className="text">Semester: </p>{s.sem}</div>
                                    <div><p className="text">Course Id: </p>{s.cId}</div>
                                    <div><p className="text">Course Name: </p>{s.cName}</div>
                                    <div><p className="text">Assginment Percentage: </p>{s.aPer}</div>
                                    <div><p className="text">Assginment Description: </p>{s.aDes}</div>
                                    <div><p className="text">Scope: </p>{s.scope}</div>
                                    <div><p className="text">Tech used: </p>{s.tech}</div>
                                    <div><p className="text">Description: </p>{s.des}</div>
                                    <div><p className="text">Company: </p>{s.company}</div>
                                    <div><p className="text">App availability: </p>{s.app}</div>
                              
                                </div>
                                <ButtonToolbar style={{ marginLeft: '10px', marginBottom: '10px'}}>
                                    <Button variant="warning" onClick={this.edit.bind(this, s._id, s.sId, s.sName, s.sYear, s.cId, s.cName, s.sem, s.aName, s.aDes, s.aPer, s.tech, s.scope, s.des, s.company, s.app, s.photoURL)}>
                                        Edit
                                    </Button>
                                    <Button variant="danger" style={{ marginLeft: '10px' }} onClick={this.delete.bind(this, s._id)}>
                                        Delete
                                    </Button>
                                </ButtonToolbar>

                            </Card>
                        ))}
                    </Col>
                    <Col md={6} >
                        <div className="editbox">
                        <h3 style={{marginTop:'20px',fontWeight:'1',marginBottom:'20px'}}>Update/Add Project</h3>
                        
                            <form onSubmit={this.handleSubmit}>
                            <div>
                                Student id: <input type="text" id="sId" name="sId" 
                                value={this.state.sId}
                                    onChange={this.handleChange.bind(this)} />
                                <div style={{color:'red'}}>{this.state.error}</div>
                                <br></br>

                                Student Name: <input type="text" id="sName" name="sName" 
                                value={this.state.sName}
                                    onChange={this.handleChange.bind(this)} />
                                    <div style={{ color: 'red' }}>{this.state.sNameError}</div>
                                    <br></br>

                                Year: <input type="text" id="sYear" name="sYear" 
                                value={this.state.sYear}
                                    onChange={this.handleChange.bind(this)} />
                                    <div style={{ color: 'red' }}>{this.state.sYearError}</div>
                                    <br></br>

                                Course id: <input type="text" id="cId" name="cId" 
                                value={this.state.cId}
                                    onChange={this.handleChange.bind(this)} />
                                    <div style={{ color: 'red' }}>{this.state.cIdError}</div>
                                    <br></br>
                                Course Name: <input type="text" id="cName" name="cName" 
                                value={this.state.cName}
                                    onChange={this.handleChange.bind(this)} />
                                    <div style={{ color: 'red' }}>{this.state.cNameError}</div>
                                    <br></br>
                                Semester: <input type="text" id="sem" name="sem" 
                                value={this.state.sem}
                                    onChange={this.handleChange.bind(this)} />
                                    <div style={{ color: 'red' }}>{this.state.semError}</div>
                                    <br></br>
                                Assignment Name: <input type="text" id="aName" name="aName" 
                                value={this.state.aName}
                                    onChange={this.handleChange.bind(this)} />
                                    <div style={{ color: 'red' }}>{this.state.aNameError}</div>
                                    <br></br>
                                Assignment Description: <input type="text" id="aDes" name="aDes" 
                                value={this.state.aDes}
                                    onChange={this.handleChange.bind(this)} />
                                    <div style={{ color: 'red' }}>{this.state.aDesError}</div>
                                    <br></br>
                                Percentage: <input type="text" id="aPer" name="aPer" 
                                value={this.state.aPer}
                                    onChange={this.handleChange.bind(this)} />
                                    <div style={{ color: 'red' }}>{this.state.aPerError}</div>
                                    <br></br>
                                Technology used: <input type="text" id="tech" name="tech" 
                                value={this.state.tech}
                                    onChange={this.handleChange.bind(this)} />
                                    <div style={{ color: 'red' }}>{this.state.techError}</div>
                                    <br></br>
                                Scope: <input type="text" id="scope" name="scope" 
                                value={this.state.scope}
                                    onChange={this.handleChange.bind(this)} />
                                    <div style={{ color: 'red' }}>{this.state.scopeError}</div>
                                    <br></br>
                                Description: <input type="text" id="des" name="des" 
                                value={this.state.des}
                                    onChange={this.handleChange.bind(this)} style={{ width: '400px'}}/>
                                    <div style={{ color: 'red' }}>{this.state.desError}</div>
                                    <br></br>
                                Company: <input type="text" id="company" name="company" 
                                value={this.state.company}
                                    onChange={this.handleChange.bind(this)} />
                                    <div style={{ color: 'red' }}>{this.state.companyError}</div>
                                    <br></br>
                                App availability: <input type="text" id="app" name="app" 
                                value={this.state.app}
                                    onChange={this.handleChange.bind(this)} />
                                    <div style={{ color: 'red' }}>{this.state.appError}</div>
                                    <br></br>
                                Image URL: <input type="text" id="photoURL" name="photoURL" 
                                value={this.state.photoURL}
                                    onChange={this.handleChange.bind(this)} style={{ width: '500px' }}/>
                                    <div style={{ color: 'red' }}>{this.state.hotoURLError}</div>
                                    <br></br>

                                <ButtonToolbar style={{ marginBottom: '100px' }}>
                                    <Button variant="primary" onClick={this.save.bind(this, this.state._id)} style={{ marginRight: '10px' }}>Update</Button>
                                    <Button variant="primary" onClick={this.add.bind(this)} style={{ marginRight: '10px'}} >Clear</Button>
                                    
                                    <Button variant="primary" type="submit" onClick={this.save.bind(this)}>Add</Button>
                                </ButtonToolbar>
                            </div>
                            </form>
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}