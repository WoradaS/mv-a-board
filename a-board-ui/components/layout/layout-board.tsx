import LayoutMenu from "@/components/layout/layout-menu";
import { BrandColor } from "@/constants/color";
import { Flex } from "@chakra-ui/react";
import { useMediaQuery } from "@mui/material";

type Props = {
  children: JSX.Element;
  startWidth?: string;
  centerWidth?: string;
  endWidth?: string;
};

const LayoutBoard = (props: Props) => {
  const { children, startWidth = "20%", centerWidth = "70%", endWidth = "20%" } = props;

  const desktop = useMediaQuery("(min-width:1025px)");

  if (!desktop) {
    return children;
  }
  return (
    <Flex bgColor={BrandColor.Grey100}>
      <Flex width={startWidth} padding={"16px"}>
        <LayoutMenu />
      </Flex>
      <Flex width={centerWidth}>{children}</Flex>
      <Flex width={endWidth}></Flex>
    </Flex>
  );
};

export default LayoutBoard;
