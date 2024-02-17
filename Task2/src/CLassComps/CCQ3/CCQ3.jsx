// CCQ3.js
import React, { Component } from "react";
import "./CCQ3.css";

export default class CCQ3 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: "100%"
    };
  }

  tblClick = () => {
    console.log("tblClick");
    this.setState({ width: "50%" });
  };

  tblDoubleClick = () => {
    console.log("doubleClick");
    this.setState({ width: "100%" });
  };

  render() {
    const tableClass = this.state.width == "50%" ? "table-half-width" : "table-full-width";

    return (
      <div>
        <table className={tableClass} onClick={this.tblClick} onDoubleClick={this.tblDoubleClick}>
          <tbody>
            <tr>
              <td>Row 1, Cell 1</td>
              <td>Row 1, Cell 2</td>
              <td>Row 1, Cell 3</td>
            </tr>
            <tr>
              <td>Row 2, Cell 1</td>
              <td>Row 2, Cell 2</td>
              <td>Row 2, Cell 3</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
