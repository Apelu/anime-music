import TheUltimateDropdown from "@ui/TheUltimateDropdown";
import { Card } from "react-bootstrap";

function StackedCard(props: any) {
    const {
        label = "Placeholder",
        value,
        onClick = () => alert("Clicked"),
    } = props;
    return (
        <Card
            style={{
                cursor: "pointer",
                padding: "0px 8px",
            }}
        >
            <div
                style={{
                    marginBottom: "-4px",
                    fontSize: "0.7em",
                }}
            >
                <strong>{label}</strong>
            </div>
            <TheUltimateDropdown />
        </Card>
    );
}

export default StackedCard;
