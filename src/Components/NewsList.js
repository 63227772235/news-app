import { Card, Container, Row, Col } from "react-bootstrap";

import useNewsData from "../hooks/useNewsData";
import { useState } from "react";
import CustomPagination from "./CustomPagination";

// ... (your import statements)

const NewsList = (props) => {
  const { category, searchTerm } = props;
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 4;

  const onPageChange = (pageNumber) => setCurrentPage(pageNumber);

  const { newsData, loading, error } = useNewsData(category, searchTerm);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // Add a check for the existence of newsData before accessing its length property
  const totalArticles = newsData ? newsData.length : 0;
  const totalPages = Math.ceil(totalArticles / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentArticles = newsData ? newsData.slice(startIndex, endIndex) : [];

  return (
    <Container>
      <Row>
        {currentArticles.map((article) => (
          <Col xs={12} md={6} lg={4} key={article.url}>
            <Card>
              <Card.Img src={article.image} variant="top" />
              <Card.Body>
                <Card.Title>{article.title}</Card.Title>
                <Card.Text>{article.description}</Card.Text>
                <Card.Link href={article.url}>Read More</Card.Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <CustomPagination
        currentPage={currentPage}
        totalPages={totalPages}
        handleClick={onPageChange}
      />
    </Container>
  );
};

export default NewsList;
