import React from "react";

const ListGroup = ({
  items,
  valueProperty,
  textProperty,
  onItemSelect,
  selectedItem,
}) => {
  // const { items, valueProperty, textProperty, onItemSelect, selectedItem } =
  // props;
  return (
    <ul className="list-group">
      {items.map((item) => (
        <li
          key={item[valueProperty]}
          onClick={() => onItemSelect(item)}
          // className="list-group-item"
          className={
            item === selectedItem
              ? "clickable list-group-item active"
              : "clickable list-group-item"
          }
        >
          {item[textProperty]}
        </li>
      ))}
    </ul>
  );
};
ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id",
};

export default ListGroup;
