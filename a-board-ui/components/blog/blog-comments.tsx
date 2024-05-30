import { BrandColor } from "@/constants/color";
import { Flex } from "@chakra-ui/react";
import { Avatar, Typography } from "@mui/material";

type Props = {
  username: string;
  comments: string;
  updateDate: string;
};

const BlogComments = (props: Props) => {
  const { username, comments, updateDate } = props;
  return (
    <Flex gap={10}>
      <Avatar sx={{ width: 40, height: 40 }}>{username.charAt(0)}</Avatar>
      <Flex direction={"column"} gap={8}>
        <Flex gap={10} alignItems={"center"}>
          <Typography fontSize={"14px"} color={BrandColor.Black} fontWeight={600}>
            {username}
          </Typography>
          <Typography fontSize={"12px"} color={BrandColor.Green300}>
            1mo. ago
          </Typography>
        </Flex>
        <Typography fontSize={"12px"} color={BrandColor.Black}>
          {comments}
        </Typography>
      </Flex>
    </Flex>
  );
};

export default BlogComments;
