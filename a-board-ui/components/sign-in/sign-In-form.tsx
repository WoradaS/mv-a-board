import { BrandColor } from "@/constants/color";
import { Flex } from "@chakra-ui/react";
import { Button, TextField, Typography, useMediaQuery } from "@mui/material";
import { useRouter } from "next/router";
import React, { useState } from "react";

type Props = {};

const SignInForm = (props: Props) => {
  const router = useRouter();

  const [username, setUsername] = useState<string>();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const onSignIn = () => {
    sessionStorage?.setItem("username", username ?? "");
    router.push("/");
  };

  return (
    <Flex
      direction={"column"}
      width={"100%"}
      height={"100%"}
      sx={{
        justifyContent: "center",
        justifyItems: "center",
        alignItems: "center",
        alignContent: "center",
        padding: "16px",
      }}
    >
      <Flex direction={"column"} gap={"42px"} width={"100%"} maxWidth={"384px"}>
        <Typography
          fontStyle={"Inter"}
          fontSize={"28px"}
          fontWeight={600}
          color={BrandColor.White}
          align="left"
          maxWidth={"384px"}
        >
          Sign in
        </Typography>
        <Flex direction={"column"} gap={"20px"} alignItems={"center"}>
          <TextField
            id="outlined-required"
            placeholder="Username"
            fullWidth
            sx={{
              // maxWidth: "384px",
              "& .MuiOutlinedInput-root": {
                height: "44px",
                maxWidth: "384px",
                backgroundColor: BrandColor.White,
                borderRadius: "8px",
              },
            }}
            value={username}
            onChange={handleChange}
          />
          <Button
            variant="contained"
            color="success"
            fullWidth
            sx={{
              height: "44px",
              // maxWidth: "384px",
              backgroundColor: BrandColor.Success,
              borderRadius: "8px",
              textTransform: "none",
              "&:hover": {
                backgroundColor: BrandColor.Success,
              },
            }}
            onClick={onSignIn}
          >
            <Typography fontStyle={"Inter"} fontSize={"14px"} fontWeight={500} color={BrandColor.White}>
              Sign in
            </Typography>
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default SignInForm;
