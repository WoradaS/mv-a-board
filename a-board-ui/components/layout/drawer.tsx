import { BrandColor } from "@/constants/color";
import { Flex } from "@chakra-ui/react";
import { IconButton, SwipeableDrawer } from "@mui/material";
import Image from "next/image";
import LayoutMenu from "./layout-menu";

type Props = {
  open: boolean;
  setDrawer: (open: boolean) => void;
};

const AppDrawer = (props: Props) => {
  const { open, setDrawer } = props;
  return (
    <SwipeableDrawer
      anchor={"right"}
      open={open}
      onOpen={() => setDrawer(true)}
      onClose={() => setDrawer(false)}
      PaperProps={{
        sx: {
          backgroundColor: BrandColor.Green500,
          width: "80vw",
        },
      }}
    >
      <Flex direction={"column"} gap={36} alignContent={"flex-start"} padding={"32px 16px"}>
        <IconButton
          aria-label="arrow-left"
          size="small"
          sx={{ width: 24, height: 24 , margin: "8px"}}
          onClick={() => setDrawer(false)}
        >
          <Image src="/arrow-left.svg" width={18} height={14} alt="arrow-left" />
        </IconButton>
        <LayoutMenu darkThem />
      </Flex>
    </SwipeableDrawer>
  );
};

export default AppDrawer;
