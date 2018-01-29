import React from 'react';
import { Table } from 'react-bootstrap';

const DimensionTable = ({ system }) => (
    <Table striped bordered condensed responsive>
        <thead>
            <tr>
                <th>Dimension</th>
                <th>Range</th>
                <th>Description</th>
                <th>Q</th>
                <th>WF</th>
                <th>Range</th>
            </tr>
        </thead>
        <tbody>
            {
                Object.keys(system).map(key => tableMap(key, system[key]))
            }
        </tbody>
    </Table>
);

const tableMap = (key, data) => {
    const rows = [];
    let currentRange = 0;
    let currentTotalRange = 0;
    const dimension = key.charAt(0).toUpperCase() + key.slice(1);
    const firstLetter = dimension.charAt(0);
    data.forEach((row, idx) => {
        rows.push(
            <tr key={idx}>
                <td>{idx == 0 ? dimension : null}</td>
                <td>{firstLetter}{currentRange + 1}:{firstLetter}{currentRange + row.quantity}</td>
                <td>{row.description}</td>
                <td>{row.quantity}</td>
                <td>{row.weight}</td>
                <td>{currentTotalRange + 1}:{currentTotalRange + row.quantity * row.weight}</td>
            </tr>
        )
        currentTotalRange += row.quantity * row.weight;
        currentRange += + row.quantity;
    })
    return rows;
}

export default DimensionTable;