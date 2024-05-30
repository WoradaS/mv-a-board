import { BrandColor } from "@/constants/color";
import { Flex } from "@chakra-ui/react";
import { Button, TextField, Typography } from "@mui/material";
import { useState } from "react";

type Props = {};

const BlogAddComments = (props: Props) => {
  const [add, setAdd] = useState<boolean>(false);

  const [comment, setComment] = useState<string>();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setComment(event.target.value);
  };

  const onAddComments = () => {
    setAdd(true);
  };
  const onPost = () => {
    setAdd(false);
  };

  if (add) {
    return (
      <Flex direction={"column"} gap={8}>
        <TextField
          id="outlined-required"
          placeholder="What’s on your mind..."
          fullWidth
          multiline
          rows={3}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "8px",
            },
          }}
          value={comment}
          onChange={handleChange}
        />
        <Flex justifyContent={"flex-end"} gap={16}>
          <Button
            variant="outlined"
            color="success"
            fullWidth
            sx={{
              height: "40px",
              maxWidth: "105px",
              borderRadius: "8px",
              textTransform: "none",
              "&:hover": {},
            }}
            onClick={() => setAdd(false)}
          >
            <Typography fontStyle={"Inter"} fontSize={"14px"} fontWeight={500} color={BrandColor.Success}>
              Cancel
            </Typography>
          </Button>
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
            onClick={onPost}
          >
            <Typography fontStyle={"Inter"} fontSize={"14px"} fontWeight={500} color={BrandColor.White}>
              Post
            </Typography>
          </Button>
        </Flex>
      </Flex>
    );
  }
  return (
    <Button
      variant="outlined"
      color="success"
      fullWidth
      sx={{
        height: "40px",
        maxWidth: "132px",
        borderRadius: "8px",
        textTransform: "none",
        "&:hover": {},
      }}
      onClick={onAddComments}
    >
      <Typography fontStyle={"Inter"} fontSize={"14px"} fontWeight={500} color={BrandColor.Success}>
        Add Comments
      </Typography>
    </Button>
  );
};

export default BlogAddComments;
