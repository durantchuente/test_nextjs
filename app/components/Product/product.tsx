import React, { useState } from "react";
import { Tr, Td, Flex, Avatar, Box, Text, Checkbox } from "@chakra-ui/react";
import { StarIcon, EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { IconButton, Badge } from "@chakra-ui/react"
import { Product } from "../../models/product.model";

const Stars = (n: number) => {
  let stars = []
  for (let i = 0; i < 5; ++i) {
    if (i < n) stars.push(<StarIcon color="#3399FF" />)
    else stars.push(<StarIcon color="#C0C0C0" />)
  }
  return (
    <div className="Stars">
      {stars}
    </div>
  )
}

const ProductItem = (props: any) => {
  const [showLogin, setShowLogin] = useState(false);
  const product: Product = props.data;
  return (
    <Tr>
        <Td>
          <Flex>
            <Avatar src={product.images[0]} />
            <Box ml='3'>
              <Text fontWeight='bold'>
                {product.title}
              </Text>
              <Text fontSize='sm' color='#808080'>{product.brand}</Text>
            </Box>
          </Flex>
        </Td>
        <Td><Badge colorScheme="gray" px='2' borderRadius='lg'>{product.stock}</Badge></Td>
        <Td>{product.price}$</Td>
        <Td>{product.category}</Td>
        <Td>
          {Stars(Math.round(product.rating))}
        </Td>
        <Td>
        {product.discountPercentage}%
        </Td>
      </Tr>
  );
};

export default ProductItem;