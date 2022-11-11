import React from "react";

const ModalTable = ({ props }) => {
  console.log(onclick);
  return (
    <div>
      <h2>Hello</h2>
      <button onClick={props.onclick}>close</button>
      <div>I am a modal</div>
      <form>
        <input />
        <button>tab navigation</button>
        <button>stays</button>
        <button>inside</button>
        <button>the modal</button>
      </form>
    </div>
  );
};

export default ModalTable;
