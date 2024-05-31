import BlogAddComments from "@/components/blog/blog-add-comments";
import BlogComments from "@/components/blog/blog-comments";
import BlogDetails from "@/components/blog/blog-details";
import LayoutBoard from "@/components/layout/layout-board";
import { BrandColor } from "@/constants/color";
import { mock_blog } from "@/constants/mock";
import { Flex } from "@chakra-ui/react";
import { IconButton, useMediaQuery } from "@mui/material";
import axios, { AxiosError } from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState, useEffect, useContext } from "react";
import { AppContext } from "./_app";

type Props = {};

const Blog = (props: Props) => {
  const { setError, refresh } = useContext(AppContext);

  const router = useRouter();
  const { blogID } = router.query;
  const ID = Number(blogID);
  const desktop = useMediaQuery("(min-width:1024px)");
  const [blog, setBlog] = useState<any>({});

  const getBlog = async () => {
    try {
      const res = await axios.get("http://localhost:5000/blog/" + ID);
      console.log(res);
      setBlog(res.data);
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

  useEffect(() => {
    getBlog();
  }, [refresh]);

  return (
    <LayoutBoard centerWidth="80%" endWidth="0px">
      <Flex
        direction={"column"}
        minHeight={"100vh"}
        width={"100%"}
        gap={40}
        bgColor={BrandColor.White}
        padding={desktop ? "32px 20% 32px 10%" : "32px"}
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
            key={blog?.blogID}
            blogID={blog?.blogID}
            username={blog?.username}
            community={blog?.community}
            title={blog?.title}
            descriptions={blog?.description}
            comments={blog?.comments ?? []}
            fullDetails
          />
          <BlogAddComments blogID={blog?.blogID} />
          {(blog?.comments ?? []).map((comment: any) => (
            <BlogComments
              key={comment.username}
              username={comment.username}
              comments={comment.comment}
              updateDate={comment.updateDate}
            />
          ))}
        </Flex>
      </Flex>
    </LayoutBoard>
  );
};

export default Blog;
