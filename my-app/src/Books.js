import React from "react";
import qs from 'qs';
import ListItems1 from "./ListItems1";
import "./css/bootstrap/css/bootstrap.css";
import tushu from "./img/tushu.jpg";
import renkanshu from "./img/2renkanshu.jpg";
import ibm1 from "./img/ibm1.jpg";
import jimu from "./img/jimu.jpg";

class Books extends React.Component {

  state = {
    username: '',
    role: '',
  };

  componentDidMount = () => {
    //alert(window.location.search.replace('?', '').split('/')[1]);
    if (window.location.search.replace('?', '').split('/')[0].toString() === "admin") {
      this.setState({
        username: window.location.search.replace('?', '').split('/')[2].toString(),
        role: '管理员',
      })
    }
    else{
      this.setState({
        username: window.location.search.replace('?', '').split('/')[2].toString(),
        role: '一般用户',
      })
    }
  };

  render() {

    return (
      <div>
        <div class="row">
          <div class="col-md-1">
            <img alt="Brand" src={tushu} width="100" height="100"></img>
          </div>
          <div class="col-md-9">
            <br />
            <h1 className="title">图书库存列表</h1>
          </div>
          <div class="col-md-1">
            <br />
            <b>当前用户：{this.state.username+"("+this.state.role+")"}</b>
          </div>
          <div class="col-md-1">
            <img alt="Brand" src={jimu} width="150" height="150"></img>
          </div>
        </div>
        <ListItems1 />

        <br />
        <hr />

        <div class="position-relative">
          <div class="shape shape-bottom shape-fluid-x text-dark">
            <svg viewBox="0 0 2880 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M 0 48 h 2980 V0h-720C1442.5 52 720 0 720 0H0v48z" fill="currentColor"/>
            </svg>
          </div>
        </div>


        <footer class="bg-primary">
          <div class="container">
            <div class="row">
              <br />
              <div class="col-12 col-md-4 col-lg-4">
                <div class="d-inline-flex align-items-center link-dark text-decoration-none mb-2 text-muted">
                  <span class="fs-5">
                    <a
                      class="text-gray-700"
                      href="https://www.ibm.com/cn-zh/"
                      target="_blank"
                    >
                      <img
                        src={ibm1}
                        class="list-social-icon"
                        alt="ibm1"
                        width="70"
                        height="50"
                      ></img>
                    </a>
                  </span>
                </div>

                <p class="text-gray-700 mb-2">为您的网站提供可靠的基石。</p>

                <p class="text-gray-700 mb-2">
                  <a
                    class="text-gray-700"
                    href="https://www.ibm.com/cn-zh/"
                    target="_blank"
                  >
                    京ICP备05032905号-3
                  </a>
                </p>

                <ul class="list-unstyled list-inline list-social mb-6 mb-md-0">
                  <li class="list-inline-item list-social-item me-3">
                    <a href="#!" class="text-decoration-none">
                      <img
                        src={renkanshu}
                        class="list-social-icon"
                        alt="2renkanshu"
                        width="100"
                        height="100"
                      ></img>
                    </a>
                  </li>
                </ul>
              </div>
              <div class="col-6 col-md-4 col-lg-2">
                <h6 class="fw-bold text-uppercase text-gray-700">图书分类</h6>

                <ul class="list-unstyled text-muted mb-6 mb-md-8 mb-lg-0">
                  <li class="mb-3">
                    <a href="#!" class="text-reset">
                      政治、法律
                    </a>
                  </li>
                  <li class="mb-3">
                    <a href="#!" class="text-reset">
                      经济、文化
                    </a>
                  </li>
                  <li class="mb-3">
                    <a href="#!" class="text-reset">
                      语言、文字
                    </a>
                  </li>
                  <li class="mb-3">
                    <a href="#!" class="text-reset">
                      文学、艺术
                    </a>
                  </li>
                  <li class="mb-3">
                    <a href="#!" class="text-reset">
                      历史、地理
                    </a>
                  </li>
                  <li class="mb-3">
                    <a href="#!" class="text-reset">
                      天文学、地球科学
                    </a>
                  </li>
                  <li>
                    <a href="#!" class="text-reset">
                      航空航天、交通运输
                    </a>
                  </li>
                </ul>
              </div>
              <div class="col-6 col-md-4 col-lg-2">
                <h6 class="fw-bold text-uppercase text-gray-700">其他分类</h6>

                <ul class="list-unstyled text-muted mb-6 mb-md-8 mb-lg-0">
                  <li class="mb-3">
                    <a
                      href="https://v5.bootcss.com/"
                      target="_blank"
                      class="text-reset"
                    >
                      马克思主义著作
                    </a>
                  </li>
                  <li class="mb-3">
                    <a
                      href="https://v4.bootcss.com/"
                      target="_blank"
                      class="text-reset"
                    >
                      哲学
                    </a>
                  </li>
                  <li class="mb-3">
                    <a
                      href="https://v3.bootcss.com/"
                      target="_blank"
                      class="text-reset"
                    >
                      社会科学
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://v2.bootcss.com/"
                      target="_blank"
                      class="text-reset"
                    >
                      自然科学
                    </a>
                  </li>
                </ul>
              </div>
              <div class="col-6 col-md-4 offset-md-4 col-lg-2 offset-lg-0">
                <h6 class="fw-bold text-uppercase text-gray-700">友链</h6>

                <ul class="list-unstyled text-muted mb-0">
                  <li class="mb-3">
                    <a
                      href="https://www.metlife.com/"
                      target="_blank"
                      class="text-reset"
                    >
                      大都会人寿
                    </a>
                  </li>
                  <li class="mb-3">
                    <a
                      href="https://www.baidu.com/"
                      target="_blank"
                      class="text-reset"
                    >
                      百度
                    </a>
                  </li>
                  <li class="mb-3">
                    <a
                      href="https://react.docschina.org/"
                      target="_blank"
                      class="text-reset"
                    >
                      React
                    </a>
                  </li>
                  <li class="mb-3">
                    <a
                      href="https://vuejs.zcopy.site/"
                      target="_blank"
                      class="text-reset"
                    >
                      Vue
                    </a>
                  </li>
                  <li class="mb-3">
                    <a
                      href="https://spring.io/projects/spring-boot"
                      target="_blank"
                      class="text-reset"
                    >
                      Spring-boot
                    </a>
                  </li>
                  <li class="mb-3">
                    <a
                      href="https://mybatis.org/mybatis-3/zh/getting-started.html"
                      target="_blank"
                      class="text-reset"
                    >
                      Mybatis
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.csdn.net/"
                      target="_blank"
                      class="text-reset"
                    >
                      CSDN
                    </a>
                  </li>
                </ul>
              </div>
              <div class="col-6 col-md-4 col-lg-2">
                <h6 class="fw-bold text-uppercase text-gray-700">版权相关</h6>

                <ul class="list-unstyled text-muted mb-0">
                  <li class="mb-3">
                    <a href="#!" class="text-reset">
                      开源协议
                    </a>
                  </li>
                  <li class="mb-3">
                    <a href="#!" class="text-reset">
                      免责声明
                    </a>
                  </li>
                  <li>
                    <a href="#!" class="text-reset">
                      投诉/建议
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </footer>
      </div>
    );
  }
}

export default Books;
