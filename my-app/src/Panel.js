import React from "react";
import axios from "axios";
import { render } from "react-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class Panel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
    };
  }
  state = {
    active: false,
    callback: () => {},
    id: 0,
    number: "",
    name: "",
    class1: "",
    quantity: "",
    note: "",
    status: "",
  };

  handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    //alert('value:'+value);

    //alert('name:'+name);

    this.setState({
      [name]: value,
    });
  };

  open = (options) => {
    const { callback, id, number, name, class1, quantity, note, status } =
      options;
    this.setState({
      active: true,
      callback: callback,
      id: id,
      number: number,
      name: name,
      class1: class1,
      quantity: quantity,
      note: note,
      status: status,
    });

    //alert("id:" + this.state.id);
  };

  close = (data) => {
    this.setState({
      active: false,
    });
    axios.update("http://localhost:8080/getStorage1", {
      params: {
        book: data,
      },
    });
    this.state.callback(data);
  };

  submit = (event) => {
    event.preventDefault();
    const form = new FormData(event.target);

    //alert(this.state.number);
    // alert({number:this.state.number, name:this.state.name,
    //   class1:this.state.class1, quantity:this.state.quantity, note:this.state.note});
    //alert("form:"+form);

    if (this.state.status === "add") {
      axios
        .post("http://localhost:10010/book/addBook", form)
        .then((response) => {
          toast.success("图书记录追加成功!")
          //alert("add end");

          //window.open("http://localhost:3000")
          //this.close();
          window.setTimeout(()=>{window.location.href = "http://localhost:3000";},1000)
        })
        .catch((err) => {
          toast.success("图书记录追加失败!")
          console.log(err);
        });
    } else {
      axios
        .post("http://localhost:10010/book/postStorage1", form)
        .then((response) => {
          toast.success("图书记录修改成功!");

          //this.close();
          window.setTimeout(()=>{window.location.href = "http://localhost:3000";},1000)
          //window.open("http://localhost:3000")

        })
        .catch((err) => {
          toast.success("图书记录修改失败!");
          console.log(err);
        });
    }
  };

  render() {
    const _class = {
      true: "panel-wrapper active",
      false: "panel-wrapper",
    };
    return (
      <div className={_class[this.state.active]}>
        <div className="over-layer"></div>
        <div className="panel">
          <div className="head">
            <span className="close" onClick={this.close}>
              ×
            </span>
            <div className="inventory">
              <p className="title has-text-centered">图书详细信息</p>
              <form method="post" onSubmit={this.submit}>
                <meta
                  http-equiv="Access-Control-Allow-Origin"
                  content="*"
                ></meta>
                <div className="field">
                  <div className="control">
                    <label className="label">图书编号</label>
                    <input
                      type="text"
                      className="input"
                      name="number"
                      value={this.state.number}
                      onChange={this.handleChange}
                    />

                    <input type="hidden" name="id" value={this.state.id} />
                  </div>
                </div>
                <div className="field">
                  <div className="control">
                    <label className="label">图书名称</label>
                    <input
                      type="text"
                      className="input"
                      name="name"
                      value={this.state.name}
                      onChange={this.handleChange}
                    />
                  </div>
                </div>
                <div className="field">
                  <div className="control">
                    <label className="label">图书类型</label>
                    <input
                      type="text"
                      className="input"
                      name="class1"
                      value={this.state.class1}
                      onChange={this.handleChange}
                    />
                  </div>
                </div>
                <div className="field">
                  <div className="control">
                    <label className="label">库存数量</label>
                    <input
                      type="text"
                      className="input"
                      name="quantity"
                      value={this.state.quantity}
                      onChange={this.handleChange}
                    />
                  </div>
                </div>
                <div className="field">
                  <div className="control">
                    <label className="label">图书简介</label>
                    <textarea
                      className="textarea"
                      name="note"
                      value={this.state.note}
                      onChange={this.handleChange}
                    />
                  </div>
                </div>
                <div className="field is-grouped is-grouped-centered">
                  <div className="control">
                    {this.state.status === "add" ? (
                      <button id="btn" className="button is-link">
                        追加
                      </button>
                    ) : this.state.status === "update" ? (
                      <button className="button is-link">修改</button>
                    ) : (
                      ""
                    )}
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
              </form>
            </div>
          </div>
        </div>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </div>
    );
  }
}

const _div = document.createElement("div");
document.body.appendChild(_div);
const _panel = render(<Panel />, _div);
export default _panel;
