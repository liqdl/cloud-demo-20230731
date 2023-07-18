import React from "react";
import axios from "axios"
import { render } from "react-dom";

class Panel extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
        books: []
    }
  }
    state = {
        active: false,
        callback: () => {},
        number: '',
        name: '',
        class1: '',
        quantity: '',
        note:'',
        status:true
      };


      handleChange = e => {
        const value = e.target.value;
        const name = e.target.name;
        this.setState({
          [name]: value
        });
      };

      open = options => {
        const { callback} = options;
        this.setState({
          active: true,
          callback: callback,
        });
      };

      close = data => {
        this.setState({
          active: false
        });
        axios.update('http://localhost:8080/getStorage1',{
            params:{
              book:data
            }
        })
        this.state.callback(data);
      };


      submit = (event) => {
        event.preventDefault();
        const form = new FormData(event.target);		    
        axios.post('http://localhost:8080/postStorage1',form)
          .then(response => {
              window.open("http://localhost:3000")
        this.close();

        }
        ).catch(err => {
            console.log(err);
        })
      }
      
    render() {

        const _class = {
            true: 'panel-wrapper active',
            false: 'panel-wrapper'
          };
        return (<div className={_class[this.state.active]}>
            <div className="over-layer"></div>
            <div className="panel">
            <div className="head">
            <span className="close" onClick={this.close}>
              ×
            </span>
            <div className="inventory">
        <p className="title has-text-centered">确认信息</p>

        <meta http-equiv="Access-Control-Allow-Origin" content="*"></meta>

          <div className="field is-grouped is-grouped-centered">
            <div className="control">
            {this.state.status?<button className="button is-link" >修改</button>:""}
            </div>
            <div className="control">
              <button
                className="button"
                type="button"
                onClick={this.close}
              >
                取消
              </button>
            </div>
          </div>

      </div>    
            </div>
            </div>
        </div>);
    }

        
}

const _div = document.createElement('div')
document.body.appendChild(_div);
const _panel = render(<Panel />, _div)
export default _panel;
