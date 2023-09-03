import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams,Link } from 'react-router-dom';
import {
  Box,
  Table,
  Tbody,
  Thead,
  Th,
  Tr,
  Td,
  Link as ChakraLink,
  Button,
} from '@chakra-ui/react';
import './categories.css';

const ShowCategory = () => {
  const [category, setCategory] = useState(null);
  const { categoryId } = useParams();
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/v1/categories/${categoryId}`)
      .then((response) => {
        console.log('API Response:', response.data);
        setCategory(response.data);

        const articleData = response.data.included
          .filter((item) => item.type === 'article')
          .map((article) => ({
            id: article.id,
            title: article.attributes.title,
            description: article.attributes.description,
          }));
        setArticles(articleData);
      })
      .catch((error) => {
        console.error('Error fetching category:', error);
      });
  }, [categoryId]);

  if (!category) {
    return <p>Loading...</p>;
  }

  return (
    <Box className="shared-background" p={4}>
      <Box className="glassmorphic-box">
        <h1 className="mt-4">{category.data.attributes.name}</h1>
        <h3>Articles in {category.data.attributes.name}</h3>

        <Table variant="simple" size="sm" bgColor="transparent">
        <Thead>
            <Tr>
              <Th>Title</Th>
              <Th>Description</Th>
              <Th>Show</Th>
            </Tr>
          </Thead>
          <Tbody>
            {articles.map((article) => (
              <Tr key={article.id}>
                <Td>{article.title}</Td>
                <Td>{article.description}</Td>
                <Td>
                  <ChakraLink as={Link} to={`/ShowArticle/${article.id}`}>
                    <Button variant="solid" colorScheme="green" size="sm" className='shared-button'>
                      Show Article
                    </Button>
                  </ChakraLink>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
};

export default ShowCategory;
