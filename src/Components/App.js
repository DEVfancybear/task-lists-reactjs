import React, { Component } from "react";
import "./../App.css";
import Header from "./Header";
import Search from "./Search";
import TableData from "./TableData";
import AddUser from "./AddUser";
import DataUser from "./Data.json";

const uuidv1 = require("uuid/v1");

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hienThiForm: false,
      data: DataUser,
      searchText: "",
      editUserStatus: false,
      userEditObject: {}
    };
  }

  deleteUser = idUser => {
    var tempData = this.state.data.filter(item => item.id !== idUser);
    this.setState({
      data: tempData
    });
  };
   // kiểm tra truyền props giữa component cha và con
  // thongBao = () => {
  //   console.log("ket noi thanh cong");
  // };
  // đổi trạng thái form ẩn/hiện khi click nút đóng mở
  // cập nhật dữ liệu sau khi chỉnh sửa vào data
  getUserEditInfoApp = info => {
    this.state.data.forEach((value, key) => {
      if (value.id === info.id) {
        value.name = info.name;
        value.tel = info.tel;
        value.Permission = info.Permission;
      }
    });
  };
  editUser = user => {
    this.setState({
      userEditObject: user
    });
  };
   //thay đổi trạng thái sửa người dùng
  changeEditUserStatus = () => {
    this.setState({
      editUserStatus: !this.state.editUserStatus
    });
  };
  getNewUserData = (name, tel, Permission) => {
    var item = {};
    item.id = uuidv1();
    item.name = name;
    item.tel = tel;
    item.Permission = Permission;
    //đẩy dữ lieuj vào trong state
    var items = this.state.data;
    items.push(item);
    //set lại state của data
    this.setState({
      data: items
    });
    // console.log('ket noi ok ok ');
    // console.log(this.state.data);
  };
  // conponents con chuyền cho cha phải có tham số
  getTextSearch = dl => {
    //lưu giá trị nhận được vào state
    this.setState({
      searchText: dl
    });
  };

  doiTrangThai = () => {
    this.setState({
      hienThiForm: !this.state.hienThiForm
    });
  };

  render() {
    var ketqua = [];
    this.state.data.forEach(item => {
      // kiểm tra khác -1 tức là tìm thấy kết quả tìm kiếm
      if (
        item.name.toLowerCase().indexOf(this.state.searchText.toLowerCase()) !==
        -1
      ) {
        //đẩy kết quả tìm được vào mảng đã tạo
        ketqua.push(item);
      }
    });
    //  console.log(ketqua);
    return (
      <div>
        <Header />
        <div className="searchForm">
          <div className="container">
            <div className="row">
              <Search
                getUserEditInfoApp={info => this.getUserEditInfoApp(info)}
                userEditObject={this.state.userEditObject}
                checkConnectProps={dl => this.getTextSearch(dl)}
                ketNoi={() => this.doiTrangThai()}
                hienThiForm={this.state.hienThiForm}
                editUserStatus={this.state.editUserStatus}
                changeEditUserStatus={() => this.changeEditUserStatus()}
              />
              <TableData
                deleteUser={idUser => this.deleteUser(idUser)}
                changeEditUserStatus={() => this.changeEditUserStatus()}
                editFun={user => this.editUser(user)}
                dataUserProps={ketqua}
              />
              <AddUser
                add={(name, tel, Permission) =>
                  this.getNewUserData(name, tel, Permission)
                }
                hienThiForm={this.state.hienThiForm}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
