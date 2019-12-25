import React from 'react'

const url = 'http://localhost:27017/projects'

export default class list extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            projects: [],

        }

    }


    fetchData() {
        fetch(url)
            .then(res => res.json())
            .then(json => this.setState({ projects: json }))
    }

    componentWillMount() {
        this.fetchData()
    }


    render() {
        return (
            <div>
                <h1 style={{fontWeight:'1'}}>Project List</h1>
                <ul>
                    {this.state.projects.map(s =>
                        <li>{s.sId}</li>
                    )}
                </ul>
            </div>
        )
    }

}
