import { BrandColor } from "@/constants/color";
import { communitys } from "@/constants/menu";
import { AppContext } from "@/pages/_app";
import { Flex } from "@chakra-ui/react";
import { Button, IconButton, MenuItem, Select, TextField, Typography, useMediaQuery } from "@mui/material";
import axios, { AxiosError } from "axios";
import Image from "next/image";
import { useContext, useState } from "react";

type Props = {
  onClose: () => void;
  isEdit?: boolean;
  blogID?: string;
  title?: string;
  community?: string;
  description?: string;
};

const CreatePost = (props: Props) => {
  const {
    onClose,
    isEdit,
    blogID,
    title: defaultTitle = "",
    community: defaultCommunity = "",
    description: defaultDescription = "",
  } = props;

  const { userID, setError, setRefresh } = useContext(AppContext);

  const desktop = useMediaQuery("(min-width:1024px)");

  const [title, setTitle] = useState<string>(defaultTitle);
  const [community, setCommunity] = useState<string>(defaultCommunity);
  const [description, setDescription] = useState<string>(defaultDescription);

  const handlePost = async () => {
    try {
      const body = {
        userID,
        community,
        title,
        description,
      };
      const res = await axios.post("http://localhost:5000/blog", body);
      console.log(res);
      setRefresh((prev) => !prev);
      onClose();
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

  const handlePut = async () => {
    try {
      const body = {
        userID,
        community,
        title,
        description,
      };
      const res = await axios.patch("http://localhost:5000/blog/" + blogID, body);
      console.log(res);
      setRefresh((prev) => !prev);
      onClose();
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

  const handleComplete = () => {
    if (title?.length == 0 || community?.length == 0 || description?.length == 0) {
      alert("Please provide complete information.");
      return;
    }

    if (!isEdit) {
      handlePost();
    } else {
      handlePut();
    }
  };

  return (
    <Flex direction={"column"} padding={"16px"} gap={"14px"} width={"90vw"} maxWidth={"685px"}>
      <Flex justifyContent={"space-between"} width={"100%"}>
        <Typography fontSize={"24px"} fontWeight={600}>
          {isEdit ? "Edit Post" : "Create Post"}
        </Typography>
        <IconButton
          color="inherit"
          aria-label="close"
          sx={{ width: 24, height: 24, marginLeft: "16px" }}
          onClick={onClose}
        >
          <Image src="/close.svg" width={24} height={24} alt="close" />
        </IconButton>
      </Flex>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        placeholder="Choose a community"
        displayEmpty
        value={community}
        fullWidth
        onChange={(e) => setCommunity(e.target.value)}
        sx={{
          height: "40px",
          borderRadius: "8px",
          boxShadow: "none",
          maxWidth: desktop ? "195px" : "685px",
          ".MuiOutlinedInput-notchedOutline": { borderColor: BrandColor.Success },
          color: BrandColor.Success,
          textAlign: "center",
        }}
      >
        <MenuItem value={""}>Choose a community</MenuItem>
        {communitys.map((community) => (
          <MenuItem value={community} key={community}>
            {community}
          </MenuItem>
        ))}
      </Select>
      <TextField
        id="outlined-required"
        placeholder="Title"
        fullWidth
        sx={{
          maxWidth: "685px",
          "& .MuiOutlinedInput-root": {
            height: "44px",
            backgroundColor: BrandColor.White,
            borderRadius: "8px",
          },
        }}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <TextField
        id="outlined2-required"
        placeholder="What’s on your mind..."
        fullWidth
        sx={{
          maxWidth: "685px",
          "& .MuiOutlinedInput-root": {
            backgroundColor: BrandColor.White,
            borderRadius: "8px",
          },
        }}
        rows={10}
        multiline
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <Flex direction={desktop ? "row" : "column"} justifyContent={"flex-end"} gap={"14px"}>
        <Button
          variant="outlined"
          color="success"
          fullWidth
          sx={{
            height: "40px",
            maxWidth: desktop ? "105px" : null,
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
          color="success"
          fullWidth
          sx={{
            height: "40px",
            maxWidth: desktop ? "105px" : null,
            backgroundColor: BrandColor.Success,
            borderRadius: "8px",
            textTransform: "none",
            "&:hover": {
              backgroundColor: BrandColor.Success,
            },
          }}
          onClick={handleComplete}
        >
          <Typography fontStyle={"Inter"} fontSize={"14px"} fontWeight={500} color={BrandColor.White}>
            {isEdit ? "Confirm" : "Post"}
          </Typography>
        </Button>
      </Flex>
    </Flex>
  );
};

export default CreatePost;
