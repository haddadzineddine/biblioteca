import { Box, Button, Card, CardBody, CardFooter, CardHeader, CircularProgress, CircularProgressLabel, FormControl, FormErrorMessage, FormHelperText, Grid, GridItem, HStack, Heading, Highlight, Image, Input, Link, Text, VStack, useToast } from "@chakra-ui/react";
import { Icon } from '@chakra-ui/react';
import { AiFillAmazonCircle } from 'react-icons/ai';
import { FiExternalLink, FiBookOpen } from 'react-icons/fi';
import { useRef, useState } from "react";
import { Book } from "../types/book";
import { BookService } from "../services/book.service";

export const Library = () => {

    const currentBook: Book | null = BookService.getCurrentBook();
    const leftBooks: Book[] = BookService.getLeftBooks();

    const [page, setPage] = useState(currentBook ? BookService.getCurrentPage(currentBook) : 0);
    const [isError, setIsError] = useState(false);

    const [leftBooksToRead, setLeftBooksToRead] = useState<Book[]>(leftBooks);
    const [currentReadingBook, setCurrentReadingBook] = useState<Book | null>(currentBook);

    const inputRef = useRef<HTMLInputElement>(null);
    const toast = useToast();

    const getPageCompletionPercentage = () => {
        if (!currentReadingBook) {
            return 0;
        }

        return Math.round((page / currentReadingBook.pages) * 100);
    }

    const handlePageChange = () => {

        if (!currentReadingBook) {
            return;
        }

        const pageValue = inputRef.current?.valueAsNumber || 0;

        if (pageValue <= 0 || pageValue > currentReadingBook.pages) {
            return setIsError(true);
        }

        setIsError(false);
    };
    const setCurrentPage = () => {
        if (!currentReadingBook) {
            return;
        }

        const pageValue = inputRef.current?.valueAsNumber || 0;
        setPage(pageValue);

        BookService.setCurrentPage(pageValue, currentReadingBook);
        inputRef.current && (inputRef.current.value = '');

        toast({
            title: "Page updated.",
            description: "Your current page has been updated.",
            status: "success",
            position: "bottom-right",
            duration: 3000,
        });
    }

    const selectBook = (book: Book) => {
        BookService.setCurrentBook(book);
        setLeftBooksToRead(BookService.getLeftBooks());

        setCurrentReadingBook(book);
        setPage(BookService.getCurrentPage(book));
    };

    const completeBook = (book: Book) => {
        BookService.markAsRead(book);
        console.log(BookService.getLeftBooks());
        setLeftBooksToRead(BookService.getLeftBooks());
        setCurrentReadingBook(null);

        toast({
            title: "Book completed.",
            description: "The book has been marked as completed.",
            status: "success",
            position: "bottom-right",
            duration: 3000,
        });
    }

    return (
        <VStack>
            <Box w={{ base: "100%", md: "85%" }} pb={12}>
                <HStack justifyContent={'space-between'} p={6} borderBottom={'1px'} w={'full'} >
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

                    {
                        currentReadingBook ? (
                            <Grid borderRadius={4} templateColumns='repeat(auto-fill, minmax(450px, 1fr))' gap={6} >
                                <GridItem >
                                    <Card borderRadius={4} height={'full'}>

                                        <CardHeader>
                                            <HStack justifyContent={'space-between'} gap={12} alignItems={'start'} p={2} borderRadius={4}>
                                                <Heading fontSize={'2xl'} fontWeight={'bold'}>
                                                    {currentReadingBook.title}
                                                </Heading>

                                                <HStack gap={2}>
                                                    <Link pt={2} href={currentReadingBook.link} isExternal>
                                                        <Icon w={6} height={6} as={AiFillAmazonCircle} />
                                                    </Link>
                                                    <Link pt={2} href={currentReadingBook.localLink} isExternal>
                                                        <Icon w={6} height={6} as={FiExternalLink} />
                                                    </Link>
                                                </HStack>

                                            </HStack>

                                        </CardHeader>
                                        <CardBody>
                                            <Image h={'22rem'} w={'18rem'} src={currentReadingBook.picture} />
                                            <Text fontWeight={'semibold'} my={2}>{currentReadingBook.author}</Text>
                                        </CardBody>
                                        <CardFooter>
                                            <Text>{currentReadingBook.description}</Text>
                                        </CardFooter>
                                    </Card>
                                </GridItem>
                                <GridItem >
                                    <Card borderRadius={4} >

                                        <CardHeader>
                                            <HStack justifyContent={'space-between'} gap={12} alignItems={'center'} p={2} borderRadius={4}>
                                                <Heading fontSize={'2xl'} fontWeight={'bold'}>
                                                    Status
                                                </Heading>

                                                <Button onClick={() => completeBook(currentReadingBook)} px={8} variant={'outline'} colorScheme="green" size={'sm'}>Completed</Button>
                                            </HStack>
                                        </CardHeader>
                                        <CardBody>
                                            <HStack justifyContent={'space-between'} alignItems={'center'}>
                                                <Box>
                                                    <Text fontWeight={'semibold'} my={2}>Current Page : {page}</Text>
                                                    <Text fontWeight={'semibold'} my={2}>Total Pages : {currentReadingBook.pages}</Text>

                                                    <FormControl isInvalid={isError}>
                                                        <HStack gap={4} mt={8} >
                                                            <Input ref={inputRef} onChange={handlePageChange} required w={24} size={'sm'} type={'number'} placeholder="Page" />
                                                            <Button isDisabled={isError} onClick={setCurrentPage} px={8} variant={'outline'} colorScheme="green" size={'sm'}>Save</Button>
                                                        </HStack>

                                                        <Box mt={6}>
                                                            {!isError ? (
                                                                <FormHelperText>Enter the page you are currently reading.</FormHelperText>
                                                            ) : (
                                                                <FormErrorMessage>Page must be between 1 and {currentReadingBook.pages}</FormErrorMessage>
                                                            )}
                                                        </Box>
                                                    </FormControl>
                                                </Box>

                                                <Box>
                                                    <CircularProgress value={getPageCompletionPercentage()} color='green.400' size={'12rem'}>
                                                        <CircularProgressLabel>
                                                            {
                                                                getPageCompletionPercentage() + '%'
                                                            }
                                                        </CircularProgressLabel>
                                                    </CircularProgress>
                                                </Box>
                                            </HStack>
                                        </CardBody>
                                        <CardFooter>
                                        </CardFooter>
                                    </Card>
                                </GridItem>



                            </Grid>
                        ) : (
                            <Card borderRadius={4} w={1 / 3}>
                                <CardHeader>
                                    <HStack justifyContent={'space-between'} gap={12} alignItems={'center'} p={2} borderRadius={4}>
                                        <Heading fontSize={'2xl'} fontWeight={'bold'}>
                                            No book selected
                                        </Heading>
                                    </HStack>
                                </CardHeader>
                                <CardBody>
                                    <Text fontWeight={'semibold'} my={2}>Select a book from the list to start reading.</Text>
                                </CardBody>
                            </Card>
                        )
                    }
                </Box>

                <Box mt={8}>
                    <Heading fontSize={'2xl'} fontWeight={'bold'} my={12}>
                        <Highlight query={'Next to Read'} styles={{ px: '1', py: '1', bg: 'red.100' }}>
                            Next to Read
                        </Highlight>
                    </Heading>

                    <Grid templateColumns='repeat(auto-fit, minmax(450px, 1fr))' gap={6} columnGap={12} borderRadius={4}>
                        {
                            leftBooksToRead.length > 0 ? (
                                leftBooksToRead.map((book) => (
                                    <GridItem key={book.id}>
                                        <Card borderRadius={4} height={'full'}>

                                            <CardHeader>
                                                <HStack justifyContent={'space-between'} gap={12} alignItems={'start'} p={2} borderRadius={4}>
                                                    <Heading fontSize={'2xl'} fontWeight={'bold'}>
                                                        {book.title}
                                                    </Heading>

                                                    <Button px={8} onClick={() => selectBook(book)} variant={'outline'} colorScheme="green" size={'sm'}>Select</Button>

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
                            ) : (
                                <Card borderRadius={4}>
                                    <CardHeader>
                                        <HStack justifyContent={'space-between'} gap={12} alignItems={'center'} p={2} borderRadius={4}>
                                            <Heading fontSize={'2xl'} fontWeight={'bold'}>
                                                No books left to read
                                            </Heading>
                                        </HStack>
                                    </CardHeader>
                                    <CardBody>
                                        <Text fontWeight={'semibold'} my={2}>You have no books left to read.</Text>
                                    </CardBody>
                                </Card>
                            )
                        }
                    </Grid>
                </Box>
            </Box>
        </VStack>
    );
};