import { Card } from "react-bootstrap";

function TimeCard() {
    return (
        <Card
            style={{
                textAlign: "center",
            }}
        >
            <Card.Body>
                <Card.Text className="d-flex justify-content-center">
                    <div className="p-3 pt-1 pb-1">
                        <div>
                            <strong>Total Time</strong>
                        </div>
                        {
                            // TODO: Total Time
                        }
                    </div>
                    <div className="p-3 pt-1 pb-1">
                        <div>
                            <strong>Time Left</strong>
                        </div>
                        {
                            // TODO: Time Left
                        }
                    </div>
                </Card.Text>
            </Card.Body>
        </Card>
    );
}
export default TimeCard;
