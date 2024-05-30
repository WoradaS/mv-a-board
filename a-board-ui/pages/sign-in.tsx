import SignInForm from "@/components/sign-in/sign-In-form";
import SignInIcon from "@/components/sign-in/sign-In-Icon";
import { BrandColor } from "@/constants/color";
import { Flex } from "@chakra-ui/react";
import { useMediaQuery } from "@mui/material";

type Props = {};

const SignIn = (props: Props) => {
  const desktop = useMediaQuery("(min-width:1024px)");
  return (
    <Flex
      width={"100%"}
      minHeight={"100vh"}
      height={"100vh"}
      bgColor={BrandColor.Green500}
      flexDirection={desktop ? "row" : "column-reverse"}
    >
      <SignInForm />
      <SignInIcon />
    </Flex>
  );
};

export default SignIn;
