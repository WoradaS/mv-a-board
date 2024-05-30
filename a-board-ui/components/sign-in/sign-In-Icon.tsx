import { BrandColor } from "@/constants/color";
import { Flex } from "@chakra-ui/react";
import { useMediaQuery } from "@mui/material";
import Image from "next/image";

type Props = {};

const SignInIcon = (props: Props) => {
  const desktop = useMediaQuery("(min-width:1025px)");

  return (
    <Flex
      direction={"column"}
      width={"100%"}
      height={"100%"}
      bgColor={BrandColor.Green300}
      sx={{
        justifyContent: "center",
        alignItems: "center",
        borderRadius: desktop ? "36px 0px 0px 36px" : "0px 0px 36px 36px",
        gap: desktop ? "42px" : "27px",
      }}
    >
      <Image src="/notebook.svg" width={desktop ? 299.61 : 171.46} height={desktop ? 230 : 131.62} alt="notebook" />
      <Image src="/brand-white.svg" width={desktop ? 96 : 83} height={24} alt="brand-white" />
    </Flex>
  );
};

export default SignInIcon;
