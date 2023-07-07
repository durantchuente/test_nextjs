"use client";
import "./DataTable.css";

import { Table, Thead, Tbody, Tr, Th, Tfoot, Flex, Box, Text, Checkbox, Spacer, Spinner, Center, Td, Heading, Input, InputLeftElement, InputGroup } from "@chakra-ui/react";
import { Product } from "../../models/product.model";
import ProductItem from "../Product/product";
import { useEffect, useState } from "react";
import { Produts } from "@/app/services/app.service";
import { Result } from "@/app/interfaces/result.interface";
import ReactPaginate from "react-paginate";
import { Search2Icon } from "@chakra-ui/icons";


const DataTable = (props: any) => {
  const [productsTotal, setProductItemsTotal] = useState<number>();
  const [products, setProductItems] = useState<Product[] | null>(null);
  const [limit, setLimit] = useState<number>(10);
  const [skip, setSkip] = useState<number>();
  const [pageCount, setPageCount] = useState<number>(1);
  const [result, setResult] = useState<Result>();

  // Invoke when user click to request another page.
  const handlePageClick = (event: any) => {
    if(result) getDatas(event.selected, result)
  };
  
  useEffect(() => {
    Produts.getProducts()
      .then((datas) => {
        setResult(datas)
        setProductItems(datas.products);
        setPageCount(Math.ceil(datas.total / datas.limit))
        setLimit(datas.limit)
        setSkip(datas.skip)
        setProductItemsTotal(datas.total)
      })
      .catch((err) => {});
  return () => {};
  }, []);

  const search = (value: string)=>{
      Produts.searchProducts(value)
      .then((datas) => {
        setResult(datas)
        setProductItems(datas.products);
        setPageCount(Math.ceil(datas.total / datas.limit))
        setLimit(datas.limit)
        setSkip(datas.skip)
        setProductItemsTotal(datas.total)
      })
      .catch((err) => {});
  }

  const getDatas = (page: number, datas: Result)=>{
    Produts.getProducts(limit, (limit * page))
      .then((datas) => {
        setProductItems(datas.products);
        setLimit(datas.limit)
        setSkip(datas.skip)
        setProductItemsTotal(datas.total)
      })
      .catch((err) => {});
  }
  

  return (
    <><Flex>
      <Box p='4'>
        <Heading as='h4' size='md'>
          Produits
        </Heading>
      </Box>
      <Spacer />
      <Box p='4'>
        <InputGroup size='md'>
          <Input
            pl='3.5rem'
            type='search'
            placeholder='Recherche' 
            onChange={e => search(e.target.value)} />
          <InputLeftElement width='4.5rem'>
            <Search2Icon aria-label="search" />
          </InputLeftElement>
        </InputGroup>
      </Box>
    </Flex><Table variant='simple'>
        <Thead>
          <Tr>
            <Th>Nom</Th>
            <Th>Stock</Th>
            <Th>Prix</Th>
            <Th>Catégorie</Th>
            <Th>Note</Th>
            <Th>Réduction</Th>
          </Tr>
        </Thead>
        <Tbody>
          {products ? '' : (<Tr>
            <Td colSpan={6}>
              <Center h='100px' w='full'>
                <Spinner size='xl' />
              </Center>
            </Td>
          </Tr>)}

          {products ? products.map((user: Product) => (
            <ProductItem key={user.id} data={user} />
          )) : ''}
        </Tbody>
        <Tfoot>
          <Tr>
            <Th colSpan={6}>
              <Flex>
                <Box p='4'>
                  <Text>
                    Affichant {limit} produits sur {pageCount} pages de {productsTotal} resultats
                  </Text>
                </Box>
                <Spacer />
                <Box p='4'>
                  <ReactPaginate
                    breakLabel="..."
                    nextLabel="suivant >"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={5}
                    pageCount={pageCount}
                    previousLabel="< précédent"
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    previousLinkClassName="page-link"
                    nextClassName="page-item"
                    nextLinkClassName="page-link"
                    breakClassName="page-item"
                    breakLinkClassName="page-link"
                    containerClassName="pagination"
                    activeClassName="active"
                    renderOnZeroPageCount={null} />
                </Box>
              </Flex>
            </Th>
          </Tr>

        </Tfoot>
      </Table></>
  );
};

export {DataTable};