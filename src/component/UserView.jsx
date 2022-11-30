import {db} from "../model/db";
import {useLiveQuery} from "dexie-react-hooks";
import Table from "react-bootstrap/Table";
import {Button} from "react-bootstrap";
import {useState} from "react";

export function UserView() {

    let users = useLiveQuery(() => db.tb_user.toCollection().limit(5).toArray());


    // function loadPage() {
    //     setCount(count + 5);
    //     setUsers(db.tb_user.toCollection().limit(count).toArray());
    // }

    if (!users) return null;

    return (
        <div>
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
            <Button variant="link" >Load More</Button>
        </div>
    )
}