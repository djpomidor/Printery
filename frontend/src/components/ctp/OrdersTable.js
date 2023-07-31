import React, { Component } from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

// const getItems = [ 'cell 1', 'cell 2', 'cell 3', 'cell 4', 'cell 5'] ;

// fake data generator
const getItems = count =>
  Array.from({ length: count }, (v, k) => k).map(k => ({
    id: `id-${k}`,
    number: `item ${k}`,
    name: "name",
    number_of_lists: "number_of_lists",
    tirage: "tirage",
    color: "color",
    paper: "paper"
  }));
  console.log("!!", getItems(10))

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",

  // change background colour if dragging
  background: isDragging ? "lightgreen" : "white",

  // styles we need to apply on draggables
  ...draggableStyle
});

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? "lightblue" : "white",
  padding: grid,
  width: 'auto'
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: getItems(10)
    };
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  onDragEnd(result) {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const items = reorder(
      this.state.items,
      result.source.index,
      result.destination.index
    );

    this.setState({
      items
    });
  }

  // Normally you would want to split things out into separate components.
  // But in this example everything is just done in one place for simplicity
  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <table className="table borderd"
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
            >
		          {/* <thead>
			          <tr>
			          	<td colspan="2" />
			          	<td>
			          		№ заказа
			          	</td>
			          	<td>
			          		Название
			          	</td>
			          	<td>
			          		кол-во п.л.
			          	</td>
			          	<td>
			          		тираж
			          	</td>
			          	<td>
			          		красочность
			          	</td>
			          	<td>
			          		бумага
			          	</td>
			          </tr>
		          </thead> */}
              <tbody>
                {this.state.items.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided, snapshot) => (
                      <tr
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={getItemStyle(
                          snapshot.isDragging,
                          provided.draggableProps.style
                        )}
                      >
                        <td style={{ width: "120px" }}>{item.number}</td>
                        <td style={{ width: "120px" }}>{item.name}</td>
                        <td style={{ width: "120px" }}>{item.tirage}</td>
                        <td style={{ width: "120px" }}>{item.color}</td>
                        <td style={{ width: "120px" }}>{item.paper}</td>
                      </tr>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </tbody>
            </table>
          )}
        </Droppable>
      </DragDropContext>
    );
  }
}

export default App;