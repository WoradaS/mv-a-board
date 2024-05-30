import { BrandColor } from "@/constants/color";
import { communitys } from "@/constants/menu";
import { Flex } from "@chakra-ui/react";
import { Button, IconButton, MenuItem, Select, TextField, Typography, useMediaQuery } from "@mui/material";
import Image from "next/image";
import { useState } from "react";

type Props = {
  onClose: () => void;
  onClick: () => void;
  isEdit?: boolean;
  blogID?: string;
  title?: string;
  community?: string;
  description?: string;
};

const CreatePost = (props: Props) => {
  const {
    onClose,
    onClick,
    isEdit,
    blogID,
    title: defaultTitle = "",
    community: defaultCommunity = "",
    description: defaultDescription = "",
  } = props;
  const desktop = useMediaQuery("(min-width:1024px)");

  const [title, setTitle] = useState<string>(defaultTitle);
  const [community, setCommunity] = useState<string>(defaultCommunity);
  const [description, setDescription] = useState<string>(defaultDescription);

  const handlePost = () => {
    onClick();
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
        // onChange={handleChange}
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
        // onChange={handleChange}
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
        // onChange={handleChange}
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
          onClick={handlePost}
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
