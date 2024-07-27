import { db } from "@assets/firebaseConfig";
import { useEffect, useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import {
    collection,
    doc,
    DocumentData,
    getDoc,
    getDocs,
    query,
    QueryDocumentSnapshot,
    setDoc,
    where,
} from "firebase/firestore";
import {
    BackgroundItem,
    BackgroundKey,
    BackgroundType,
} from "@features/background/constants";

export function FirebaseTest() {
    const [text, setText] = useState("");

    const handleSubmit = async () => {
        // Add a new document in collection "cities"
        await setDoc(doc(db, "cities", "LA"), {
            name: "Los Angeles",
            state: "CA",
            country: "USA",
        });
    };

    const [displayText, setDisplayText] = useState("");

    return (
        <Container>
            <h1>Firebase Test</h1>
            <p>{displayText}</p>
            <Form.Control
                type="text"
                value={text}
                onChange={e => setText(e.target.value)}
            />
            <Button onClick={handleSubmit}>Submit</Button>
        </Container>
    );
}
