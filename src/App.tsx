import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import {
  HStack, PinInput, PinInputField, useDisclosure, Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  Box,
  useToast,
} from '@chakra-ui/react'

import SplachScreen from "./components/SplachScreen";

const App = () => {

  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const toast = useToast();

  const check = (value: string) => {
    if (value.length === 4) {
      if (value === '1234') {
        onClose();
        toast.closeAll();
        toast({
          position: 'bottom-right',
          title: 'Welcome',
          description: "You are logged in",
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        navigate('/library');
      } else {
        toast.closeAll();
        toast({
          title: 'An error occurred',
          description: "Code is not correct",
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    }
  };

  useEffect(() => {
    setTimeout(() => {
      onOpen();
    }, 3000);
  });

  return (
    <Box>
      <SplachScreen />

      {
        isOpen ? <Modal isOpen={isOpen} onClose={onClose} >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Library Code</ModalHeader>
            <ModalBody>
              <HStack mb={4}>
                <PinInput onChange={check}>
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                </PinInput>
              </HStack>
            </ModalBody>


          </ModalContent>
        </Modal> : null
      }
    </Box>
  );
};

export default App;