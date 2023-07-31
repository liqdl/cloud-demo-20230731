import React from "react";
import axios from "axios";
import Panel from "./Panel";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//import { Modal, Button } from 'react-bootstrap';
import "./css/mycss.css";
import "./css/bootstrap/css/bootstrap.css";

class ListItems1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      booksBackup: [],
      showModal: false,

      //当前页号
      currentPage: 1,
      //每页的条数
      pagesSize: 5,
      //总数据条数
      totalPages: 0,

      id: 0,
      number: "",
      name: "",
      class1: "",
      quantity: "",
      note: "",

      //username:this.props.username,
    };
  }

  onKeyDownchange = (e) => {

    if(parseInt(this.state.pagesSize) <= 0){
      this.state.pagesSize = 1
    }

    if(e.keyCode == 13) {
      this.setState({
        //总数据条数
        totalPages:(this.state.booksBackup.length + parseInt(this.state.pagesSize) - 1) / parseInt(this.state.pagesSize)
      });

      this.pageUpdate(1);

      toast.warn("每页显示数量变为"+parseInt(this.state.pagesSize)+"件!");
    }

    sessionStorage.setItem("pagesSize",this.props.username + "/" + parseInt(this.state.pagesSize));
  };

  handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    this.setState({
      [name]: value,
    });
  };

  viewItem = (id, number, name, class1, quantity, note) => {
    Panel.open({
      callback: (data) => {
        // console.log('Products Data: ', data);
      },
      id: id,
      number: number,
      name: name,
      class1: class1,
      quantity: quantity,
      note: note,
      status: false,
    });
  };

  updateItem = (id, number, name, class1, quantity, note) => {
    Panel.open({
      callback: (data) => {
        // console.log('Products Data: ', data);
      },
      id: id,
      number: number,
      name: name,
      class1: class1,
      quantity: quantity,
      note: note,
      status: "update",
    });
  };

  addItem = (id, number, name, class1, quantity, note) => {
    Panel.open({
      callback: (data) => {
        // console.log('Products Data: ', data);
      },
      id: id,
      number: number,
      name: name,
      class1: class1,
      quantity: quantity,
      note: note,
      status: "add",
    });
  };

  deleteItem = (id, number) => {
    // alert('delete');
    // if (this.confirm("Are you sure you want to delete")==false){
    //     return;
    // }

    //this.setState({ showModal: true })
    //   <Modal show={this.state.showModal} onHide={() => this.setState({ showModal: false })} centered>
    //   <Modal.Header closeButton>
    //     <Modal.Title>确认</Modal.Title>
    //   </Modal.Header>
    //   <Modal.Body>本条记录确认删除吗？</Modal.Body>
    //   <Modal.Footer>
    //     <Button onClick={() => this.setState({ showModal: false })}>关闭</Button>
    //   </Modal.Footer>
    // </Modal>

    axios
      .delete("http://localhost:10010/book/deleteStorage1", {
        params: {
          id: id,
        },
      })
      .then((response) => {
        console.log(number);
        //alert("id:" + id + "number:" + number);
        // const { books } = this.state;
        // const listItem = books.filter((item) => item.key !== number);
        // this.setState({
        //   books: listItem,
        //   //booksBackup: listItem,
        // });

        toast.success("图书记录删除成功!");
        setTimeout(() =>{window.location.href = "http://localhost:3000";},1000);
        //this.close();
  
        //按照第一页进行设定
        this.pageUpdate(this.state.totalPages);
      })
      .catch((error) => {
        console.log(error);
        toast.error("图书记录删除失败!");
      });
  };

  pageUpdate = (page) => {

    //alert("pageUpdate:" + page);
    //alert("id:" + id + "number:" + number);
    const { booksBackup } = this.state;

    // books.map((item) => {
    //   alert("itemkey:" + item.key);
    // });
    //alert("pageUpdate-booksBackup:" + booksBackup.length);

    const listItem = booksBackup.filter(
      (item, index) =>
        index >= (page - 1) * this.state.pagesSize &&
        index < page * this.state.pagesSize
    );
    this.setState({
      books: listItem,
      currentPage: page,
    });
  };

  pagePrevious = () => {
    let currentPageTemp = this.state.currentPage - 1;

    if (currentPageTemp <= 0) {
      currentPageTemp = 1;
    }

    this.setState({
      currentPage: currentPageTemp,
    });

    //按照第一页进行设定
    this.pageUpdate(currentPageTemp);

    //alert("currentPageTemp:" + currentPageTemp);
  };

  pageNext = () => {

    if(parseInt(this.state.pagesSize) >=this.state.booksBackup.length){
      return
    }

    let currentPageTemp = this.state.currentPage + 1;

    if (currentPageTemp > this.state.totalPages) {
      currentPageTemp = this.state.totalPages;
    }

    this.setState({
      currentPage: currentPageTemp,
    });

    //按照第一页进行设定
    this.pageUpdate(currentPageTemp);

    //alert("currentPageTemp:" + currentPageTemp);
  };

  pageClear = () => {
    this.setState({ number: "", name: "", class1: "", quantity: "", note: "" });
  };

  getBookByCondition = (event) => {
    event.preventDefault();
    const form = new FormData(event.target);

    // alert("1:" + form.get("id"));
    // alert("2:" + form.get("name"));
    // alert("3:" + form.get("number"));
    // alert("4:" + form.get("class1"));
    // alert("5:" + form.get("quantity"));
    // alert("6:" + form.get("note"));
    //const form = new FormData(this.form);

    let role;
    let token;
    let url = window.location.search;

    // 2
    if (url !== "") {
      let tokenAndRole = url.split("?")[1];
      role = tokenAndRole.split("/")[0];
      token = tokenAndRole.split("/")[1];
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
    } else {
      let getSToken = localStorage.getItem("token");
      if (getSToken == null) {
        window.location.href = "http://localhost:1000";
      } else {
        role = localStorage.getItem("role");
        token = getSToken;
      }
    }
    let showElem = false;
    if (role === "admin") {
      showElem = true;
    }
    axios.defaults.headers.common["token"] = token;
    // axios
    //   .get("http://localhost:8080/book/getStorageByCondition", {
    //     params: {
    //       name: form.get("name"),
    //       number: form.get("number"),
    //       class1: form.get("class1"),
    //       quantity: form.get("quantity"),
    //       note: form.get("note"),
    //     },
    //   })
    axios
      .get("http://localhost:10010/book/getStorageByCondition", {
        params: {
          name: form.get("name"),
          number: form.get("number"),
          class1: form.get("class1"),
          quantity: form.get("quantity"),
          note: form.get("note"),
        },
      })
      .then((response) => {
        const listData = response.data;

        //alert("seach number:" + listData.length);

        const listItems1 = listData.map((data) => (
          <tr key={data.number}>
            <td width="170px">{data.number}</td>
            <td width="170px">{data.name}</td>
            <td width="50px">{data.class1}</td>
            <td width="170px">{data.quantity}</td>
            <td width="170px">{data.note}</td>
            <td width="50px">
              <button
                class="btn btn-info"
                type="button"
                onClick={this.viewItem.bind(
                  this,
                  data.id,
                  data.number,
                  data.name,
                  data.class1,
                  data.quantity,
                  data.note
                )}
              >
                查看
              </button>
            </td>
            {showElem ? (
              <td width="50px">
                <button
                  class="btn btn-success"
                  type="button"
                  onClick={this.updateItem.bind(
                    this,
                    data.id,
                    data.number,
                    data.name,
                    data.class1,
                    data.quantity,
                    data.note
                  )}
                >
                  修改
                </button>
              </td>
            ) : null}
            {showElem ? (
              <td width="50px">
                <button
                  class="btn btn-danger"
                  type="button"
                  onClick={this.deleteItem.bind(this, data.id, data.number)}
                >
                  删除
                </button>
              </td>
            ) : null}
            {showElem ? (
              <td width="50px">
                <button
                  class="btn btn-primary"
                  type="button"
                  onClick={this.addItem.bind(
                    this,
                    data.id,
                    data.number,
                    data.name,
                    data.class1,
                    data.quantity,
                    data.note
                  )}
                >
                  追加
                </button>
              </td>
            ) : null}
          </tr>
        ));

        //alert("-1:" + listItems1.length);

        //this.setState({
        //books: listItems1,
        //booksBackup: listItems1,
        //总数据条数
        // totalPages:
        //   (listItems1.length + this.state.pagesSize - 1) /
        //   this.state.pagesSize,
        //});

        this.state.booksBackup = listItems1;
        this.state.booksBackup = listItems1;
        this.state.totalPages =
        Math.floor((listItems1.length + this.state.pagesSize - 1) / this.state.pagesSize);

        // alert("books:" + this.State.books.length);
        //alert("--booksBackup1:" + this.state.booksBackup);
        // alert("totalPages:" + this.State.totalPages);

        //alert("-2");
        //按照第一页进行设定
        this.pageUpdate(1);
        //alert("-3");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  componentDidMount = () => {
    let role;
    let token;
    let url = window.location.search;

    // 2
    if (url !== "") {
      let tokenAndRole = url.split("?")[1];
      role = tokenAndRole.split("/")[0];
      token = tokenAndRole.split("/")[1];
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
    } else {
      let getSToken = localStorage.getItem("token");
      if (getSToken == null) {
        window.location.href = "http://localhost:1000";
      } else {
        role = localStorage.getItem("role");
        token = getSToken;
      }
    }
    let showElem = false;
    if (role === "admin") {
      showElem = true;
    }
    axios.defaults.headers.common["token"] = token;

    //1
    // let showElem = true;
    // axios
    //   .get("http://localhost:8080/book/getStorage1", {
    axios
      .get("http://localhost:10010/book/getStorage1", {
        // axios.post('http://localhost:10010/book/postStorage1/',{
        // headers:{'token':token}
        // params:{token}
        // options:{headers}
      })
      .then((response) => {
        const listData = response.data;
        const listItems1 = listData.map((data) => (
          <tr key={data.number}>
            <td width="170px">{data.number}</td>
            <td width="170px">{data.name}</td>
            <td width="50px">{data.class1}</td>
            <td width="170px">{data.quantity}</td>
            <td width="170px">{data.note}</td>
            <td width="50px">
              <button
                class="btn btn-info"
                type="button"
                onClick={this.viewItem.bind(
                  this,
                  data.id,
                  data.number,
                  data.name,
                  data.class1,
                  data.quantity,
                  data.note
                )}
              >
                查看
              </button>
            </td>
            {showElem ? (
              <td width="50px">
                <button
                  class="btn btn-success"
                  type="button"
                  onClick={this.updateItem.bind(
                    this,
                    data.id,
                    data.number,
                    data.name,
                    data.class1,
                    data.quantity,
                    data.note
                  )}
                >
                  修改
                </button>
              </td>
            ) : null}
            {showElem ? (
              <td width="50px">
                <button
                  class="btn btn-danger"
                  type="button"
                  onClick={this.deleteItem.bind(this, data.id, data.number)}
                >
                  删除
                </button>
              </td>
            ) : null}
            {showElem ? (
              <td width="50px">
                <button
                  class="btn btn-primary"
                  type="button"
                  onClick={this.addItem.bind(
                    this,
                    data.id,
                    data.number,
                    data.name,
                    data.class1,
                    data.quantity,
                    data.note
                  )}
                >
                  追加
                </button>
              </td>
            ) : null}
          </tr>
        ));
        this.setState({
          books: listItems1,
          booksBackup: listItems1,
          //总数据条数
          totalPages:
            Math.floor((listItems1.length + this.state.pagesSize - 1) /
            this.state.pagesSize),
        });


        if(sessionStorage.getItem("pagesSize") != null) {
          if(sessionStorage.getItem("pagesSize").split("/")[0]==this.props.username){
            this.setState({
              pagesSize: parseInt(sessionStorage.getItem("pagesSize").split("/")[1]),
            });
          }
        }

        //按照第一页进行设定
        this.pageUpdate(1);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    const { books } = this.state;

    let out = [];
    let outPages = () => {
      for (let i = 1; i <= this.state.totalPages; i++) {
        out.push(
          <li>
            <a href="#" onClick={this.pageUpdate.bind(this, i)}>
              {i}
            </a>
          </li>
        );
      }
      return out;
    };

    return (
      <div>
        <form method="get" onSubmit={this.getBookByCondition}>
          <table className="table is-bordered">
            <tbody>
              <tr>
                <td>
                  <label for="number">编号:</label>
                </td>
                <td>
                  <input
                    type="text"
                    class="form-control"
                    id="number"
                    name="number"
                    placeholder="number"
                    value={this.state.number}
                    onChange={this.handleChange}
                  ></input>
                </td>
              </tr>
              <tr>
                <td>
                  <label for="name">名称:</label>
                </td>
                <td>
                  <input
                    type="text"
                    class="form-control"
                    id="name"
                    name="name"
                    placeholder="name"
                    value={this.state.name}
                    onChange={this.handleChange}
                  ></input>
                </td>
              </tr>
              <tr>
                <td>
                  <label for="class1">分类:</label>
                </td>
                <td>
                  <input
                    type="text"
                    class="form-control"
                    id="class1"
                    name="class1"
                    placeholder="class1"
                    value={this.state.class1}
                    onChange={this.handleChange}
                  ></input>
                </td>
              </tr>
              <tr>
                <td>
                  <label for="quantity">数量:</label>
                </td>
                <td>
                  <input
                    type="text"
                    class="form-control"
                    id="quantity"
                    name="quantity"
                    placeholder="quantity"
                    value={this.state.quantity}
                    onChange={this.handleChange}
                  ></input>
                </td>
              </tr>
              <tr>
                <td>
                  <label for="note">备注:</label>
                </td>
                <td>
                  <input
                    type="text"
                    class="form-control"
                    id="note"
                    name="note"
                    placeholder="note"
                    value={this.state.note}
                    onChange={this.handleChange}
                  ></input>
                </td>
              </tr>
            </tbody>
          </table>

          <div>
            <button type="submit" class="btn btn-primary">
              检索
            </button>
            　
            <button
              type="button"
              class="btn btn-warning"
              onClick={this.pageClear.bind(this)}
            >
              清除
            </button>
          </div>
        </form>

        <br />

        <table className="table is-bordered">
          <tbody>
            <tr class="active">
              <th width="60px">
                <p class="text-center">编号</p>
              </th>
              <th width="170px">
                <p class="text-center">名称</p>
              </th>
              <th width="100px">
                <p class="text-center">分类</p>
              </th>
              <th width="170px">
                <p class="text-center">数量</p>
              </th>
              <th width="270px">
                <p class="text-center">备注</p>
              </th>
              <th colSpan="4" width="350px">
                <p class="text-center">操作</p>
              </th>
            </tr>
            {books}
          </tbody>
        </table>
        <div class="row">
          <div class="col-md-1 col-md-offset-5">
            <nav aria-label="Page navigation">
              <ul class="pagination">
                <li>
                  <a
                    href="#"
                    aria-label="Previous"
                    onClick={this.pagePrevious.bind(this)}
                  >
                    <span aria-hidden="true">&laquo;</span>
                  </a>
                </li>
                {outPages()}
                <li>
                  <a
                    href="#"
                    aria-label="Next"
                    onClick={this.pageNext.bind(this)}
                  >
                    <span aria-hidden="true">&raquo;</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
          <div class="col-md-2 col-md-offset-3 pageHit">※按照<input
                    type="text"
                    placeholder=""
                    class="pageSizeWidth"
                    maxlength="2" 
                    id="pagesSize"
                    name="pagesSize"
                    value={this.state.pagesSize}
                    onChange={this.handleChange}
                    onKeyDown={this.onKeyDownchange}
                  ></input>件进行分页
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

export default ListItems1;
