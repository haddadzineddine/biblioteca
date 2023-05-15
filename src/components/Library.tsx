import { Box, Button, Card, CardBody, CardFooter, CardHeader, Grid, GridItem, HStack, Heading, Highlight, Image, Link, Text } from "@chakra-ui/react";
import { Icon } from '@chakra-ui/react';
import { AiFillAmazonCircle } from 'react-icons/ai';
import { FiExternalLink, FiBookOpen } from 'react-icons/fi';
import { useState, useEffect } from "react";
import { Book } from "../types/book";
import { books } from "../data/books";

export const Library = () => {

    const [booksToRead, setBooksToRead] = useState<Book[]>(books);
    const [nextBook, setNextBook] = useState<Book>(books[0]);

    const selectBook = (book: Book) => {
        setBooksToRead(booksToRead.filter((b) => b.id !== book.id));
        setNextBook(book);
    };

    useEffect(() => {
        selectBook(books[0]);
    });

    return (
        <Box px={16} py={8}>
            <HStack justifyContent={'space-between'} p={4} borderBottom={'1px'} >
                <HStack alignItems={'center'}>
                    <FiBookOpen size={24} />
                    <Heading fontSize={'2xl'} fontWeight={'bold'}>
                        Biblioteca
                    </Heading>
                </HStack>

                <HStack gap={6}>
                    <Link>
                        <Heading fontSize={'lg'} fontWeight={'bold'}>Books</Heading>
                    </Link>
                    <Link>
                        <Heading fontSize={'lg'} fontWeight={'normal'}>Podcasts</Heading>
                    </Link>
                </HStack>


            </HStack>

            <Box mt={8}>
                <Heading fontSize={'2xl'} fontWeight={'bold'} my={12}>
                    <Highlight query={'Current Reading'} styles={{ px: '1', py: '1', bg: 'orange.100' }}>
                        Current Reading
                    </Highlight>
                </Heading>

                <Grid templateColumns='repeat(3, 1fr)' gap={6} columnGap={4}>
                    {

                        <GridItem>
                            <Card w={'25rem'} h={'45rem'} borderRadius={4}>

                                <CardHeader>
                                    <HStack justifyContent={'space-between'} alignItems={'center'} p={2} borderRadius={4}>
                                        <Heading fontSize={'2xl'} fontWeight={'bold'}>
                                            {nextBook.title}
                                        </Heading>

                                        <HStack gap={2}>
                                            <Link pt={2} href={nextBook.link} isExternal>
                                                <Icon w={6} height={6} as={AiFillAmazonCircle} />
                                            </Link>
                                            <Link pt={2} href={nextBook.localLink} isExternal>
                                                <Icon w={6} height={6} as={FiExternalLink} />
                                            </Link>
                                        </HStack>

                                    </HStack>

                                </CardHeader>
                                <CardBody>
                                    <Image h={'22rem'} w={'18rem'} src={nextBook.picture} />
                                    <Text fontWeight={'semibold'} my={2}>{nextBook.author}</Text>
                                </CardBody>
                                <CardFooter>
                                    <Text>{nextBook.description}</Text>
                                </CardFooter>
                            </Card>
                        </GridItem>

                    }
                </Grid>
            </Box>

            <Box mt={8}>
                <Heading fontSize={'2xl'} fontWeight={'bold'} my={12}>
                    <Highlight query={'Next to Read'} styles={{ px: '1', py: '1', bg: 'red.100' }}>
                        Next to Read
                    </Highlight>
                </Heading>

                <Grid templateColumns='repeat(3, 1fr)' gap={6} columnGap={4}>
                    {
                        booksToRead.map((book) => (
                            <GridItem>
                                <Card w={'25rem'} h={'45rem'} borderRadius={4}>

                                    <CardHeader>
                                        <HStack justifyContent={'space-between'} alignItems={'center'} p={2} borderRadius={4}>
                                            <Heading fontSize={'2xl'} fontWeight={'bold'}>
                                                {book.title}
                                            </Heading>

                                            <Button onClick={() => selectBook(book)} variant={'outline'} colorScheme="green" size={'sm'}>Select</Button>

                                        </HStack>

                                    </CardHeader>
                                    <CardBody>
                                        <Image h={'22rem'} w={'18rem'} src={book.picture} />
                                        <Text fontWeight={'semibold'} my={2}>{book.author}</Text>
                                    </CardBody>
                                    <CardFooter>
                                        <Text>{book.description}</Text>
                                    </CardFooter>
                                </Card>
                            </GridItem>
                        ))
                    }
                </Grid>
            </Box>
        </Box>
    );
};