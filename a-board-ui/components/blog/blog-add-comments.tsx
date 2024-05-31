import { BrandColor } from "@/constants/color";
import { AppContext } from "@/pages/_app";
import { Flex } from "@chakra-ui/react";
import { Button, TextField, Typography } from "@mui/material";
import axios, { AxiosError } from "axios";
import { useContext, useState } from "react";

type Props = {
  blogID: string;
};

const BlogAddComments = ({ blogID }: Props) => {
  const { userID, setError, setRefresh } = useContext(AppContext);

  const [add, setAdd] = useState<boolean>(false);

  const [comment, setComment] = useState<string>();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setComment(event.target.value);
  };

  const onAddComments = () => {
    setAdd(true);
  };
  const onPost = async () => {
    if (`${blogID}`?.length == 0 || `${userID}`?.length == 0 || comment?.length == 0) {
      alert("Please provide complete information.");
      return;
    }

    try {
      const body = {
        blogID,
        userID,
        comment,
      };
      const res = await axios.post("http://localhost:5000/blog-comment", body);
      console.log(res);
      setRefresh((prev) => !prev);
      setComment(undefined);
      setAdd(false);
    } catch (error) {
      const err = error as AxiosError;
      console.log(err.response?.data);
      setError({
        open: true,
        message: JSON.stringify(err),
      });
      alert(JSON.stringify(err.response?.data));
    }
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
      disabled={userID == undefined}
      onClick={onAddComments}
    >
      <Typography
        fontStyle={"Inter"}
        fontSize={"14px"}
        fontWeight={500}
        color={userID == undefined ? BrandColor.Grey100 : BrandColor.Success}
      >
        Add Comments
      </Typography>
    </Button>
  );
};

export default BlogAddComments;
