import React, { Component } from "react";
import TableDataRow from "./TableDataRow";

class TableData extends Component {
  deleteButtonClick = idUser => {
    //deleteUser
    this.props.deleteUser(idUser);
  };
  // lấy dữ liệu từ file json -hiển thị ra table
  mappingDataUser = () =>
    this.props.dataUserProps.map((value, key) => (
      <TableDataRow
        deleteButtonClick={idUser => this.deleteButtonClick(idUser)}
        changeEditUserStatus={() => this.props.changeEditUserStatus()}
        editFunClick={user => this.props.editFun(value)}
        userName={value.name}
        key={key}
        stt={key}
        tel={value.tel}
        permission={value.Permission}
        id={value.id}
      />
    ));

  // this.props.editFun

  render() {
    //   c2:  let mappingUserData = this.props.DataTable.map((item, index) => {
    //     return (
    //       <TableDataRow
    //         deleteButtonClick={idUser => this.deleteButtonClick(idUser)}
    //         changeEditUserStatus={() => this.props.changeEditUserStatus()}
    //         editFunClick={user => this.props.editFun(item)}
    //         key={index}
    //         KaiId={item.id}
    //         phone={item.phone}
    //         desc={item.decentralization}
    //         id={item.id}
    //       >
    //         {item.name}
    //       </TableDataRow>
    //     );
    //   });
    return (
      <div className="col">
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>STT</th>
              <th>Tên </th>
              <th>Điện thoại </th>
              <th>Quyền </th>
              <th>Thao tác </th>
            </tr>
          </thead>
          <tbody>{this.mappingDataUser()}</tbody>
        </table>
      </div>
    );
  }
}

export default TableData;
