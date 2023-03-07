import Table from "react-bootstrap/Table";
//import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import {useState, useEffect} from "react";
import "./App.css";

//Default input values
const newItemDefaultValue = 
{
  name: "",
  address: "",
  amount: ""
}


function App() {
  //useStates and useEffects
  const[newItemValue, setNewItemValue] = useState(newItemDefaultValue)
  const[items, setItems] = useState([])
  
  //Returns info from the database
  const getValueList = () =>
  {
    fetch("http://localhost:3004/items")
    .then((rep) => rep.json())
    .then((allItems) =>
    {
      setItems(allItems)
    })
  }

  useEffect(() =>
  {
    const runInterval = setInterval(() =>
    {
      getValueList()
    }, 500)
    return () => clearInterval(runInterval)
  }, [])

  return (
    <div>
      <div className='container'>
          <Container className="mb-3">
          <Form 
          className="item__input"
          onSubmit={(event) =>
          {
            //Prevents page from refreshing after input, saves an item into the database
            event.preventDefault()
            fetch("http://localhost:3004/items",
            {
              method: "POST",
              headers:
              [
                ["Content-Type", "application/json"],
                ["Accept", "application/json"],
                ["Content-Type", "application/json"],
                ["Access-Control-Allow-Origin", "*"]
              ],
              body: JSON.stringify(newItemValue)
            })
            .then((rep) => rep.json())
            .then((addedItem) =>
            {
              setItems([...items, addedItem])
            })
            //Empties the input
            setNewItemValue(newItemDefaultValue)
          }}>
            <Row>
              <Col xs={9}>
                <Form.Group className="item__group">
                  <Form.Label>Nosaukums</Form.Label>
                  <Form.Control
                  type="text"
                  placeholder="Nosaukums"
                  value={newItemValue.name}
                  onChange=
                  {
                    (event) =>
                    {
                      const updatedNewItemValue = 
                      {
                        ...newItemValue,
                        name: event.target.value
                      }
                      getValueList()
                      setNewItemValue(updatedNewItemValue)
                    }
                  }
                  required="required"
                  ></Form.Control>
                </Form.Group>

                <Form.Group className="item__group">
                  <Form.Label>Atrašānās vieta</Form.Label>
                  <Form.Control
                  type="text"
                  placeholder="Atrašanās vieta"
                  value={newItemValue.address}
                  onChange=
                  {
                    (event) =>
                    {
                      const updatedNewItemValue = 
                      {
                        ...newItemValue,
                        address: event.target.value
                      }

                      setNewItemValue(updatedNewItemValue)
                    }
                  }
                  required="required"
                  ></Form.Control>
                </Form.Group>

                <Form.Group className="item__group">
                  <Form.Label>Daudzums</Form.Label>
                  <Form.Control
                  type="text"
                  placeholder="Daudzums"
                  value={newItemValue.amount}
                  onChange=
                  {
                    (event) =>
                    {
                      const updatedNewItemValue = 
                      {
                        ...newItemValue,
                        amount: event.target.value
                      }

                      setNewItemValue(updatedNewItemValue)
                    }
                  }
                  required="required"
                  ></Form.Control>
                </Form.Group>
              </Col>
              <Col xs={3}>
                <button variant="primary" className="item__button">Pievienot</button>
              </Col>
            </Row>
            </Form> 
          </Container>
    <Table striped bordered hover className='table'>
    <thead>
        <tr>
          <th>Nosaukums</th>
          <th>Atrašanās vieta</th>
          <th>Daudzums</th>
        </tr>
      </thead>
      <tbody className="item__list">
        {Array.from(items).map((item, index) =>
        {
          return(
            <tr key={Math.random()}>
              <td>{item.name}</td>
              <td>{item.address}</td>
              <td>{item.amount}</td>
            </tr>
          )
        })}
      </tbody>
    </Table>
      </div>
    </div>
  );
}

export default App;
