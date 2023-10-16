import React from 'react';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import {
  Box,
  Container,
  Image,
  VStack,
  Center,
  Flex,
  Heading,
  Text,
  Link as ChakraLink,
} from '@chakra-ui/react';


const blogPosts = [
  {
    id: 1,
    title: 'How to Start Blogging',
    content:
      `Starting a blog is an exciting journey into the world of digital expression and communication. To embark on this endeavor, follow these key steps. First, select a niche or topic you're passionate about; this will be the core focus of your blog. Next, choose a blogging platform, such as Blogify, Blogger, or Medium, and set up your blog. Craft high-quality, engaging content that provides value to your target audience. Optimize your posts for search engines (SEO) to increase discoverability.`,
    image: 'https://www.wpbeginner.com/wp-content/uploads/2018/08/blogplatforms.png',
  },
  {
    id: 2,
    title: 'The Art of Writing',
    content:
      'The Art of Writing" is a timeless craft that transcends generations and cultures. It is the skill of transforming thoughts, emotions, and ideas into written words that have the power to inspire, inform, and captivate readers. It involves not only a deep understanding of language but also an innate creativity that allows writers to paint vivid pictures with words, transporting readers to different worlds and perspectives. ',
    image: 'https://content-writing-india.com/blog/wp-content/uploads/2013/05/a59f04e9e0a1069b683184ceb1a51657.png',
  },
];

function Home() {
  return (
    <Box
      backgroundImage="url('https://img.freepik.com/free-photo/blue-surface-with-study-tools_23-2147864592.jpg')"
      backgroundSize="cover"
      backgroundPosition="center"
      minH="100vh"
      py={10}
    >
      <Container maxW="container.lg">
        <Center>
          <Heading as="h1" size="2xl" mb={10}>
            Welcome to Blogify
          </Heading>
        </Center>
        <VStack spacing={4} align="stretch">
          {blogPosts.map((post) => (
            <Center key={post.id}>
             
              <Box
                bg="rgba(255, 255, 255, 0.15)" 
                borderRadius="lg"
                boxShadow="0 4px 6px rgba(0, 0, 0, 0.1)"
                p={4}
                maxW="lg"
                w="80%"
                display="flex"
                alignItems="center"
              >
               
                <Image
                  src={post.image}
                  alt={post.title}
                  width="275px" 
                  height="275px" 
                  objectFit="cover" 
                />
                <Flex direction="column" align="center" ml={4}>
                  <Heading as="h2" size="lg" my={2}>
                    {post.title}
                  </Heading>
                  <Box>
                    <Text>{post.content}</Text>
                  </Box>
                </Flex>
              </Box>
            </Center>
          ))}
          <Center>
            
            <ChakraLink as={Link} to="/Articles">
              <Button className="shared-button">
                Read Articles
              </Button>
            </ChakraLink>
          </Center>
        </VStack>
      </Container>
    </Box>
  );
}

export default Home;
