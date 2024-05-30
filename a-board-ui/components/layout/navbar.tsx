import { BrandColor } from "@/constants/color";
import { Flex } from "@chakra-ui/react";
import { AppBar, Avatar, Button, Container, IconButton, Typography, useMediaQuery } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import AppDrawer from "./drawer";

type Props = {};

const Navbar = (props: Props) => {
  const router = useRouter();
  const desktop = useMediaQuery("(min-width:1025px)");

  const [username, setUsername] = useState<string | null>();
  const [drawer, setDrawer] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setUsername(sessionStorage?.getItem("username"));
    }
  }, []);
  
  if (router.pathname == "/sign-in") return null;

  return (
    <AppBar position="static" sx={{ bgcolor: BrandColor.Green500 }}>
      <Container sx={{ padding: "10px 32px" }}>
        <Flex width={"100%"} justifyContent={"space-between"} alignItems={"center"}>
          <Image src="/brand-white.svg" width={69} height={24} alt="brand-white" />
          <Flex alignItems={"center"}>
            {(username ?? "")?.length > 0 ? (
              <Flex alignItems={"center"} gap={20}>
                <Avatar sx={{ width: 40, height: 40 }}>{username?.charAt(0)}</Avatar>
                <Typography fontSize={"16px"} color={BrandColor.White}>
                  {username} {router.pathname}
                </Typography>
              </Flex>
            ) : (
              <Button
                variant="contained"
                color="success"
                fullWidth
                sx={{
                  height: "40px",
                  maxWidth: "105px",
                  backgroundColor: BrandColor.Success,
                  borderRadius: "8px",
                  textTransform: "none",
                  "&:hover": {
                    backgroundColor: BrandColor.Success,
                  },
                }}
                onClick={() => router.push("/sign-in")}
              >
                <Typography fontStyle={"Inter"} fontSize={"14px"} fontWeight={500} color={BrandColor.White}>
                  Sign in
                </Typography>
              </Button>
            )}

            {desktop ? null : (
              <IconButton
                color="inherit"
                aria-label="menu"
                sx={{ width: 24, height: 24, marginLeft: "16px" }}
                onClick={() => setDrawer(true)}
              >
                <Image src="/menu.svg" width={18} height={12} alt="menu" />
              </IconButton>
            )}
          </Flex>
        </Flex>
        <AppDrawer open={drawer} setDrawer={setDrawer} />
      </Container>
    </AppBar>
  );
};

export default Navbar;
