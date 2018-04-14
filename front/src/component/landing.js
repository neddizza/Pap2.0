/**
 * Created by Teerapat on 8/8/2017.
 */

import React, {Component} from 'react';
import { BarChart, ScatterChart } from 'react-d3';

var scatterData = [
    {
        name: "series1",
        values: [ { x: 0, y: 20 }, { x: 24, y: 10 } ]
    },
    {
        name: "series3",
        values: [ { x: 70, y: 82 },  { x: 76, y: 82 } ]
    }
];


class Landing extends Component {
    render() {
        return (
            <div>
                Landing krub


                <ScatterChart
                    data={scatterData}
                    width={500}
                    height={400}
                    title="Scatter Chart"
                />
            </div>
        );
    }
}


export default Landing;
