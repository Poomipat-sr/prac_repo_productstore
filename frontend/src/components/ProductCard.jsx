import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Heading,
  HStack,
  IconButton,
  Image,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useColorModeValue,
  useDisclosure,
  useToast,
  ModalFooter,
  VStack,
  ModalBody,
  Input,
  Button,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useProductStore } from "../store/product";

const ProductCard = ({ product }) => {
  const [updatedProduct, setUpdatedProduct] = useState(product);
  const textColor = useColorModeValue("gray.600", "gray.200");
  const bg = useColorModeValue("white", "gray.800");
  const { deleteProduct } = useProductStore();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleDeleteProduct = async (pid) => {
    const { success, message } = await deleteProduct(pid);
    if (!success) {
      toast({
        title: "Error",
        description: message,
        status: "error",
        isClosable: true,
      });
    } else {
      toast({
        title: "Success",
        description: message,
        status: "success",
        isClosable: true,
      });
    }
  };

  const { updateProduct } = useProductStore();
  const handleUpdateProduct = async (pid, updatedProduct) => {
    const {success, message} = await updateProduct(pid, updatedProduct);
    onClose();
    if (!success) {
        toast({
          title: "Error",
          description: message,
          status: "error",
          isClosable: true,
        });
      } else {
        toast({
          title: "Success",
          description: message,
          status: "success",
          isClosable: true,
        });
      }
  };
  return (
    <Box
      shadow="lg"
      rounded="lg"
      overflow="hidden"
      _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
      bg={bg}
    >
      <Image
        src={product.image}
        alt={product.name}
        h={48}
        w="full"
        objectFit="cover"
      ></Image>

      <Box p={4}>
        <Heading as="h3" size="md" mb={2}>
          {product.name}
        </Heading>
        <Text fontWeight="bold" fontSize="xl" color={textColor} mb={4}>
          {product.price}
        </Text>

        <HStack spacing={2}>
          <IconButton
            icon={<EditIcon />}
            color="blue"
            onClick={onOpen}
          ></IconButton>
          <IconButton
            icon={<DeleteIcon />}
            onClick={() => handleDeleteProduct(product._id)}
            color="red"
          ></IconButton>
        </HStack>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay>
          <ModalContent>
            <ModalHeader>Update Product</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <VStack spacing={4}>
                <Input
                  placeholder="Product Name"
                  name="name"
                  value={updatedProduct.name}
                  onChange={(e) =>
                    setUpdatedProduct({
                      ...updatedProduct,
                      name: e.target.value,
                    })
                  }
                />
                <Input
                  onChange={(e) =>
                    setUpdatedProduct({
                      ...updatedProduct,
                      price: e.target.value,
                    })
                  }
                  placeholder="Price"
                  name="price"
                  type="number"
                  value={updatedProduct.price}
                />
                <Input
                  onChange={(e) =>
                    setUpdatedProduct({
                      ...updatedProduct,
                      image: e.target.value,
                    })
                  }
                  placeholder="Image URL"
                  name="image"
                  value={updatedProduct.image}
                />
              </VStack>
            </ModalBody>

            <ModalFooter>
              <Button
                colorScheme="blue"
                mr={3}
                onClick={() => handleUpdateProduct(product._id, updatedProduct)}
              >
                Update
              </Button>
              <Button variant="ghost" onClick={onClose}>
                Cancel
              </Button>
            </ModalFooter>
          </ModalContent>
        </ModalOverlay>
      </Modal>
    </Box>
  );
};

export default ProductCard;
