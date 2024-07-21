/**
 * Anime Page:
 * -Retrieves Anime Data from API
 * -Displays Anime Data in Grid or List View
 */

import { Container } from "react-bootstrap";

function AnimePage() {
    return (
        <Container className="pt-4 pb-3">
            {/* Example of Card Grid React Bootstrap (20 items) */}
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-4">
                {Array.from(Array(20).keys()).map(index => (
                    <div className="col" key={index}>
                        <div className="card">
                            <img
                                src="https://via.placeholder.com/150"
                                className="card-img-top"
                                alt="..."
                            />
                            <div className="card-body">
                                <h5 className="card-title">
                                    Card title {index + 1}
                                </h5>
                                <p className="card-text">
                                    Some quick example text to build on the card
                                    title and make up the bulk of the card's
                                    content.
                                </p>
                                <a href="#" className="btn btn-primary">
                                    Go somewhere
                                </a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </Container>
    );
}

export default AnimePage;
