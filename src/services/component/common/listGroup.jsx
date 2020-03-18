import React from 'react';

const ListGroup = (props) => {
    const {
        items, 
        textProperty, 
        valueProperty, 
        onItemSelect,
        selectedItem
    } = props;

    return (
    <ul className="list-group">

       {items.map(item =>(<li 
       onClick = {() => onItemSelect(item)}
       key = {item[valueProperty]}
       className= {item === selectedItem ? "list-group-item active" : "list-group-item"}
         >

        {item[textProperty]}

        </li>))}
    </ul>
    );
};

ListGroup.defaultProps = {
    textProperty: 'name',
    valueProperty: '_id'
}
 
export default ListGroup;
// {/* <ul class="list-group">
//   <li class="list-group-item">Cras justo odio</li>
//   <li class="list-group-item">Dapibus ac facilisis in</li>
//   <li class="list-group-item">Morbi leo risus</li>
//   <li class="list-group-item">Porta ac consectetur ac</li>
//   <li class="list-group-item">Vestibulum at eros</li>
// </ul> */}