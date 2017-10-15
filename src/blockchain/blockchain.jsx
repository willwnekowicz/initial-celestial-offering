import ReactTable from "react-table";
import React from 'react';
import 'react-table/react-table.css'

export default class BlockchainTable extends React.Component {
    constructor(props) {
        super(props);
    }

render() {
    const data = [{
        name: 'Tanner Linsley',
        age: 26,
    },
        {
            name: 'Tanner Linsley',
            age: 26,
        },
        {
            name: 'Tanner Linsley',
            age: 26,
        }]

    const columns = [{
        Header: 'Name',
        accessor: 'name',
        // Cell: d => d.name
    }, {
        Header: 'Age',
        accessor: 'age',
        // Cell: d => d.age
    }];

       return <ReactTable data={data} columns={columns}/>
}
}