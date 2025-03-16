import React from "react";
import { Container, Flex, Text, HStack, Button, useColorMode} from "@chakra-ui/react";
import { Link } from "react-router-dom";

import { BsPlusSquare } from "react-icons/bs";
import {IoMoon} from "react-icons/io5"
import {LuSun} from "react-icons/lu"
import { IoLogOutOutline } from "react-icons/io5";
import { GiShuttlecock } from "react-icons/gi";

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode()

  const logout = () => {
    window.localStorage.clear() // clear all values in local storage
    window.location.href = "./login"
  }
  return (
    <Container maxW={"1140px"} px={4} >
      <Flex
        h={16}
        alignItems={"center"}
        justifyContent={"space-between"}
        flexDir={{ base: "column", sm: "row" }}
      >
        <Flex gap={2}>
          <Text
          bgGradient="linear(to-l, #0a59c2, #08c93c)"
          bgClip="text"
          fontSize={{base: "22", sm: "40"}}
          textAlign="center"
          textTransform="uppercase"
          fontWeight="bold"
        >
          <Link to={"/"}>Yonex Badminton Store </Link>
        </Text>

        <GiShuttlecock size={60} transform="rotate(-130)" color="#8400ff"/>
        </Flex>
        

        <HStack spacing={2} alignItems={"center"}>
          <Link to={"/create"}>
            <Button>
              <BsPlusSquare fontSize={22}/>
            </Button>
          </Link>
          <Button onClick={toggleColorMode}>{colorMode == "light" ? <IoMoon/> : <LuSun/> }</Button>
          <Button onClick={logout}> <IoLogOutOutline size={22}/> &nbsp; Logout</Button>
        </HStack>
      </Flex>
    </Container>
  );
};

export default Navbar;
