import React from 'react'
import Chart from 'react-google-charts'


const PieChart = (props) => {
    const pieData = [
        ['Name', 'data'],
        ['Total Budget', props.budget],
        ['Total Expense', props.result],
        
    ]
    const pieOptions = {
        title: 'My Expenses ',
        pieHole: 0,
    }
    return (
        <div className="container mt-5">
            <h2>Expenses Pie Chart</h2>
            <Chart
                width={'600px'}
                height={'320px'}
                chartType="PieChart"
                loader={<div>Loading Chart</div>}
                data={pieData}
                options={pieOptions}
                
            />
        </div>
    )
}

export default PieChart