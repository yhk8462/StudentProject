import React from "react";

const url = "http://localhost:3001/projects/";

export default class Homepage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            projects: []
        };
    }

    fetchData() {
        fetch(url)
            .then(res => res.json())
            .then(json => this.setState({ projects: json }));
    }

    componentDidMount() {
        this.fetchData();
    }

    render() {
        return (
            <div>
                <h1 style={{ fontWeight: "1" }}>Project List</h1>
                <ul>
                    {this.state.projects.map(s => (
                        <li>
                            {s.sId} {s.sName} {s.sYear} {s.cId} {s.cName} {s.sem} {s.aName} {s.aDes} {s.aPer} {s.tech} {s.scope} {s.des} {s.company} {s.app} {s.photoURL}
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}