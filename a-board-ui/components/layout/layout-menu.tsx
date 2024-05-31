import { BrandColor } from "@/constants/color";
import { AppContext } from "@/pages/_app";
import { Flex } from "@chakra-ui/react";
import { Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import { useContext } from "react";
type Props = {
  darkThem?: boolean;
};

const LayoutMenu = (props: Props) => {
  const { userID } = useContext(AppContext);

  const { darkThem } = props;

  const router = useRouter();

  return (
    <Flex direction={"column"} gap={4}>
      <Flex gap={12} alignItems={"center"} padding={"8px 12px"} onClick={() => router.push("/")} cursor={"point"}>
        <Image src={darkThem ? "/home-white.svg" : "/home.svg"} width={24} height={24} alt="home" />
        <Typography fontSize={"16px"} color={darkThem ? BrandColor.White : BrandColor.Green500} fontWeight={700}>
          Home
        </Typography>
      </Flex>
      {userID != undefined ? (
        <Flex
          gap={12}
          alignItems={"center"}
          padding={"8px 12px"}
          onClick={() => router.push("/our-blog")}
          cursor={"point"}
        >
          <Image src={darkThem ? "/our-blog-white.svg" : "/our-blog.svg"} width={24} height={24} alt="our-blog" />
          <Typography fontSize={"16px"} color={darkThem ? BrandColor.White : BrandColor.Green500} fontWeight={700}>
            Our Blog
          </Typography>
        </Flex>
      ) : null}
    </Flex>
  );
};

export default LayoutMenu;
