import {db,resetDatabase} from "../model/db";
import {useLiveQuery} from "dexie-react-hooks";
import Table from "react-bootstrap/Table";
import {Form} from "react-bootstrap";
import {Button, Row, Col} from "react-bootstrap";
import {useState} from "react";

export function UserView() {
    const [count,setCount] = useState(10);
    const [searchText, setSearchText] = useState("");

    let maxCount = useLiveQuery(()=>db.tb_user.count());
    let users = useLiveQuery(() =>
            db.tb_user.toCollection()
                .filter(function (user){
                    return (user.name.indexOf(searchText)!==-1) || (user.email.indexOf(searchText)!==-1)
                })
                .limit(count).toArray(),
        [count,searchText]);


    function loadPage() {
        setCount(count + 10);
    }

    function handleChange(e){
        setSearchText(e.target.value)
        console.log(searchText);
    }

    if (!users) return null;

    return (
        <div>
            <Row className="justify-content-md-start">
                <Col>
                    <Button onClick={()=>resetDatabase()}>Reset Database</Button>
                </Col>
            </Row>

            <br/>
            <br/>
            <Row>
                <Col xs md={{span:3, offset:1}}>
                    <Form.Control type="input" width={3} onChange={(e)=>handleChange(e)}/>
                </Col>
            </Row>
            <br/>
            <Table bordered striped hover>
                <thead>
                <tr>
                    <th>id</th>
                    <th>name</th>
                    <th>email</th>
                    <th>age</th>
                </tr>
                </thead>
                <tbody>
                {
                    users.map(user => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.age}</td>
                        </tr>
                    ))
                }
                </tbody>
            </Table>
            <Row className="justify-content-md-center">
                <Col>
                    <Button variant="link" hidden={count<maxCount?null:true} onClick={()=>loadPage()}>Load More</Button>
                </Col>
            </Row>

        </div>
    )
}