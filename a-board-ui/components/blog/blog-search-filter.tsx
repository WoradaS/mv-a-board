import { BrandColor } from "@/constants/color";
import { Flex } from "@chakra-ui/react";
import { Button, InputAdornment, MenuItem, Select, SelectChangeEvent, TextField, Typography } from "@mui/material";
import Image from "next/image";
import React, { useContext } from "react";
import AppDialog from "../dialog";
import CreatePost from "./create-post";
import { AppContext } from "@/pages/_app";
import { communitys } from "@/constants/menu";

type Props = {};

const BlogSearchFilter = (props: Props) => {
  const { userID, community, setCommunity } = useContext(AppContext);

  const [search, setSearch] = React.useState("");
  const [createPost, setCreatePost] = React.useState<boolean>(false);

  const handleChangeFilter = (event: SelectChangeEvent) => {
    setCommunity(event.target.value);
  };
  const handleChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  return (
    <Flex justifyContent={"space-between"}>
      <TextField
        id="outlined-required"
        placeholder="Search"
        fullWidth
        value={search}
        onChange={handleChangeSearch}
        sx={{
          "& .MuiOutlinedInput-root": {
            height: "40px",
            borderRadius: "8px",
            borderColor: BrandColor.White,
          },
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Image src="/search.svg" width={20} height={20} alt="home" />
            </InputAdornment>
          ),
        }}
      />
      <Flex gap={10} marginLeft={"20px"}>
        <Select
          id="demo-simple-select-standard"
          defaultValue=""
          value={community}
          onChange={handleChangeFilter}
          displayEmpty
          sx={{
            width: "128px",
            height: "40px",
            borderRadius: "8px",
            boxShadow: "none",
            ".MuiOutlinedInput-notchedOutline": { border: 0 },
          }}
        >
          <MenuItem value="">Community</MenuItem>
          {communitys.map((c) => (
            <MenuItem value={c} key={c}>
              {c}
            </MenuItem>
          ))}
        </Select>
        <Button
          variant="contained"
          color="success"
          fullWidth
          disabled={userID == undefined}
          sx={{
            height: "40px",
            width: "105px",
            backgroundColor: BrandColor.Success,
            borderRadius: "8px",
            textTransform: "none",
            "&:hover": {
              backgroundColor: BrandColor.Success,
            },
          }}
          onClick={() => setCreatePost(true)}
        >
          <Typography fontStyle={"Inter"} fontSize={"14px"} fontWeight={500} color={BrandColor.White}>
            Create +
          </Typography>
        </Button>
        <AppDialog open={createPost} setOpen={setCreatePost} sx={{ width: "90vw", maxWidth: "685px" }}>
          <CreatePost onClose={() => setCreatePost(false)} />
        </AppDialog>
      </Flex>
    </Flex>
  );
};

export default BlogSearchFilter;
