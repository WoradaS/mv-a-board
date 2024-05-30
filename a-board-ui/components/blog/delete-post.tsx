import { BrandColor } from "@/constants/color";
import { Flex } from "@chakra-ui/react";
import { Button, Typography, useMediaQuery } from "@mui/material";

type Props = {
  onClose: () => void;
  onDelete: () => void;
};

const DeletePost = (props: Props) => {
  const { onClose, onDelete } = props;

  const desktop = useMediaQuery("(min-width:1024px)");

  return (
    <Flex direction={"column"} width={"90vw"} maxWidth={"400px"} padding={"24px 30px"} gap={24}>
      <Flex direction={"column"} gap={8}>
        <Typography fontSize={"18px"} fontWeight={600}>Please confirm if you wish to delete the post</Typography>
        <Typography fontSize={"16px"} fontWeight={500}>Are you sure you want to delete the post? Once deleted, it cannot be recovered.</Typography>
      </Flex>
      <Flex direction={desktop ? "row" : "column"} gap={14}>
        <Button
          variant="outlined"
          color="inherit"
          fullWidth
          sx={{
            height: "40px",
            borderRadius: "8px",
            textTransform: "none",
          }}
          onClick={onClose}
        >
          <Typography fontStyle={"Inter"} fontSize={"14px"} fontWeight={500}>
            Cancel
          </Typography>
        </Button>
        <Button
          variant="contained"
          color="error"
          fullWidth
          sx={{
            height: "40px",
            borderRadius: "8px",
            textTransform: "none",
          }}
          onClick={onDelete}
        >
          <Typography fontStyle={"Inter"} fontSize={"14px"} fontWeight={500} color={BrandColor.White}>
            Delete
          </Typography>
        </Button>
      </Flex>
    </Flex>
  );
};

export default DeletePost;
