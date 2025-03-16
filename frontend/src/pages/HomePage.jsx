import React, { useEffect, useState } from 'react';
import { Container, VStack, Text, SimpleGrid } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useProductStore } from '../store/product';
import ProductCard from '../components/ProductCard';

const HomePage = () => {
  const { fetchProducts, products } = useProductStore();
  const [loading, setLoading] = useState(true); // To track loading state

  useEffect(() => {
    fetchProducts().then(() => setLoading(false)); // Fetch products and then stop loading
  }, [fetchProducts]);

  console.log("products", products);

  return (
    <Container maxW="container.xl" py={12}>
      <VStack spacing={8}>
        <Text
          fontSize={"30"}
          fontWeight={"bold"}
          bgGradient={"linear(to-r, cyan.400, green.400)"}
          bgClip={"text"}
          textAlign={"center"}
        >
          Current Products🏸
        </Text>

        {/* Show loading spinner or message while fetching products */}
        {loading ? (
          <Text>Loading products...</Text>
        ) : (
          <>
            <SimpleGrid
              columns={{
                base: 1,
                md: 2,
                lg: 3,
              }}
              spacing={10}
              w={"full"}
            >
              {products.length > 0 ? (
                products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))
              ) : (
                <Text>No products found.</Text>
              )}
            </SimpleGrid>

            {/* Show message if no products found */}
            {products.length === 0 && (
              <Text
                fontSize={"xl"}
                fontWeight={"bold"}
                bgGradient={"linear(to-r, cyan.400, green.400)"}
                bgClip={"text"}
                color={"gray.500"}
                textAlign={"center"}
              >
                No Products Found 🛒😒 <br />
                <Link to={"/create"}>
                  <Text as="span" color={"blue.500"} _hover={{ textDecoration: "underline" }}>
                    Create a product
                  </Text>
                </Link>
              </Text>
            )}
          </>
        )}
      </VStack>
    </Container>
  );
};

export default HomePage;























// import React, { useEffect } from 'react'
// import {Container, VStack, Text, textDecoration, SimpleGrid} from '@chakra-ui/react'
// import { Link } from 'react-router-dom'
// import { useProductStore } from '../store/product'
// import ProductCard from '../components/ProductCard'

// const HomePage = () => {
//   const {fetchProducts, products} = useProductStore()

//   useEffect(() => {
//     fetchProducts()
//   }, [fetchProducts])
  
//   console.log("products", products)

//   return (
//     <Container maxW='container.xl' py={12}>
//       <VStack spacing={8}>
//         <Text
//         fontSize={"30"}
//         fontWeight={"bold"}
//         bgGradient={"linear(to-r, cyan.400, green.400"}
//         bgClip={"text"}
//         textAlign={"center"}
//         >
//           Current Products🏸
//         </Text>

//         <SimpleGrid
//           columns={{
//             base: 1, 
//             md: 2,
//             lg: 3
//           }}
//           spacing={10}
//           w={"full"}
//         >
//           {products.map((product) => (
//             <ProductCard key={product._id} product={product}></ProductCard>
//           ))

//           }
//         </SimpleGrid>
//         <Text
//         fontSize={"xl"}
//         fontWeight={"bold"}
//         bgGradient={"linear(to-r, cyan.400, green.400"}
//         bgClip={"text"}
//         color={"gray.500"}
//         textAlign={"center"}
//         >
//           No Products Found 🛒😒 <br />
//           <Link to={"/create"}>
//             <Text as='span' color={"blue.500"} _hover={{ textDecoration: "underline"}}>
//               Create a product
//             </Text>
//           </Link>
//         </Text>

//       </VStack>
//     </Container>
//   )
// }

// export default HomePage