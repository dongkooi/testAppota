import React,{Component} from 'react';
import {
  ComposedChart, Line, Area, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  Legend,
} from 'recharts';
import axios from 'axios';
const moment = require('moment')
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      datas: [],
    }
  }
  
  componentDidMount() {
    axios.get(`https://dev.cong.appwifi.com/stat/client`)
      .then(res => {
        const data = res.data.data;
        for(let i=0; i<=data.length; i++){
          this.setState({
            datas: [ ...this.state.datas,
              {
              'site': data[i].site,
              'Dung lượng': data[i].num_sta,
              'Số Lượng': data[i].wlan_bytes,
              'time': moment(data[i].time).format('DD/MM/YYYY hh:mm:ss')
              }]
            })
          }
        }
      )
      .catch(error => console.log(error));
  }
  
  render() {
    return (
        <ComposedChart
        width={1000}
        height={500}
        data={this.state.datas}
        style={{
          position: 'absolute', left: '50%', top: '50%',
          transform: 'translate(-50%, -50%)'
          }}>
        <CartesianGrid stroke="#f5f5f5" />
        <XAxis dataKey="time" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="Số Lượng" barSize={30} fill="#413ea0" />
        <Line type="monotone" dataKey="Dung lượng" stroke="#ff7300" />
      </ComposedChart>
    );
  }
}
