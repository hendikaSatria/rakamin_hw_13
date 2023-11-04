import { Box, Grid, GridItem, Heading } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Books from "../components/Books";
import { getAllBooks } from "../modules/fetch";

export default function Homepage() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const response = await getAllBooks();
      const booksData = response && response.books ? response.books : response;
      setBooks(booksData);
    };
    fetchBooks();
  }, []);

  return (
    <Box w="100vw">
      {books && books.length > 0 ? (
        <Grid
          templateColumns="repeat(3, 1fr)" 
          gap={6} 
        >
          {books.map((book) => (
            <GridItem key={book.id}>
              <Books {...book} />
            </GridItem>
          ))}
        </Grid>
      ) : (
        <Heading as="h1" size="lg">
          No books recorded
        </Heading>
      )}
    </Box>
  );
}
