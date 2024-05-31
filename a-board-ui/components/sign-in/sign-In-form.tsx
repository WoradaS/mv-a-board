import { BrandColor } from "@/constants/color";
import { AppContext } from "@/pages/_app";
import { Flex } from "@chakra-ui/react";
import { Button, TextField, Typography, useMediaQuery } from "@mui/material";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";

type Props = {};

const SignInForm = (props: Props) => {
  const { setUsername: setAccountUsername, setUserID, setError } = useContext(AppContext);

  const router = useRouter();

  const [username, setUsername] = useState<string>();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const onSignIn = async () => {
    if ((username ?? "").trim()?.length == 0) {
      alert("Please provide complete information.");
      return;
    }

    await axios
      .post("http://localhost:5000/user", {
        username,
      })
      .then((res) => {
        console.log(res);
        setAccountUsername(res.data.username);
        setUserID(res.data.id);
        router.push("/");
      })
      .catch((error) => {
        const err = error as AxiosError;
        console.log(err.response?.data);
        setError({
          open: true,
          message: JSON.stringify(err),
        });
        alert(JSON.stringify(err.response?.data));
      });
  };

  useEffect(() => {
    setUserID(undefined);
    setAccountUsername(undefined);
  }, []);

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
