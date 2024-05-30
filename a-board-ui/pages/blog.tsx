import BlogAddComments from "@/components/blog/blog-add-comments";
import BlogComments from "@/components/blog/blog-comments";
import BlogDetails from "@/components/blog/blog-details";
import LayoutBoard from "@/components/layout/layout-board";
import { BrandColor } from "@/constants/color";
import { mock_blog } from "@/constants/mock";
import { Flex } from "@chakra-ui/react";
import { IconButton, useMediaQuery } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";

type Props = {};

const Blog = (props: Props) => {
  const router = useRouter();
  const { blogID } = router.query;
  const ID = Number(blogID);
  const desktop = useMediaQuery("(min-width:1024px)");

  return (
    <LayoutBoard centerWidth="80%" endWidth="0px">
      <Flex
        direction={"column"}
        minHeight={"100vh"}
        width={"100%"}
        gap={40}
        bgColor={BrandColor.White}
        padding={desktop?"32px 20% 32px 10%":"32px"}
      >
        <IconButton
          aria-label="back"
          size="small"
          sx={{ width: "44px", height: "44px", backgroundColor: BrandColor.Green100 }}
          onClick={() => router.back()}
        >
          <Image src="/back.svg" width={24} height={24} alt="back" />
        </IconButton>
        <Flex direction={"column"} gap={24}>
          <BlogDetails
            key={mock_blog[ID].blogID}
            blogID={mock_blog[ID].blogID}
            username={mock_blog[ID].username}
            community={mock_blog[ID].community}
            title={mock_blog[ID].title}
            descriptions={mock_blog[ID].descriptions}
            comments={mock_blog[ID].comments}
            fullDetails
          />
          <BlogAddComments />
          {mock_blog[ID].comments.map((comment) => (
            <BlogComments
              key={comment.username}
              username={comment.username}
              comments={comment.comments}
              updateDate={comment.updateDate}
            />
          ))}
        </Flex>
      </Flex>
    </LayoutBoard>
  );
};

export default Blog;
