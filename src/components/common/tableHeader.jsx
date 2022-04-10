import React, { Component } from "react";

class TableHeader extends Component {
  raiseSort = (path) => {
    // console.log("handleSort:", path);
    const sortColumn = { ...this.props.sortColumn };
    // console.log("path:", path);
    // console.log("pre sortColumn:", sortColumn);

    if (sortColumn.path === path) {
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
      // console.log("if sortColumn:", sortColumn);
    } else {
      sortColumn.path = path;
      sortColumn.order = "asc"; //this make avoid newCol to be 'desc' for first time onClick

      // console.log("else sortColumn:", sortColumn);
    }
    this.props.onSort(sortColumn);
  };

  render() {
    return (
      <thead>
        <tr>
          {this.props.columns.map((column) => (
            <th
              key={column.lable || column.key}
              onClick={() => this.raiseSort(column.path)}
            >
              {column.lable}
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
