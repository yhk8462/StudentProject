import React, { Component, useState, useEffect } from 'react';

function ProjectDetail({ match }) {
    useEffect(() => {
        fetchItem()
        console.log(match)
    }, []);
    const [item, setItem] = useState({});
    const fetchItem = async () => {
        const fetchItem = await fetch(`http://localhost:3001/projects/${match.params.id}`);
        const item = await fetchItem.json();
        setItem(item)
        console.log(item);

    };
    return (
        <div>
            <h1>{item.sId}</h1>
        </div>
    )
}
export default ProjectDetail;