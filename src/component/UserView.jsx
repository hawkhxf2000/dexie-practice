import {db,resetDatabase} from "../model/db";
import {useLiveQuery} from "dexie-react-hooks";
import Table from "react-bootstrap/Table";
import {Button, Row, Col} from "react-bootstrap";
import {useState} from "react";

export function UserView() {
    const [count,setCount] = useState(10);

    let maxCount = useLiveQuery(()=>db.tb_user.count());
    console.log(maxCount);
    let users = useLiveQuery(() => db.tb_user.toCollection().limit(count).toArray(),
        [count]);


    function loadPage() {
        setCount(count + 10);
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