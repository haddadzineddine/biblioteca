import { Image } from "@chakra-ui/react";
import bgImage from '../assets/images/books.jpg';

const SplachScreen = () => {
    return (
        <Image w={'100vw'} h={'100vh'} fit={'cover'} src={bgImage} />
    );
};

export default SplachScreen;