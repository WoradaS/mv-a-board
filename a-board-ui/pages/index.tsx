import BlogDetails from "@/components/blog/blog-details";
import BlogSearchFilter from "@/components/blog/blog-search-filter";
import LayoutBoard from "@/components/layout/layout-board";
import { BrandColor } from "@/constants/color";
import { Flex } from "@chakra-ui/react";
import axios, { AxiosError } from "axios";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "./_app";

type Props = {};

const Home = (props: Props) => {
  const { setError, community, setCommunity, refresh } = useContext(AppContext);

  const [blogs, setBlogs] = useState<any[]>([]);

  const getBlog = async () => {
    try {
      const config = {
        params: {
          community,
        },
      };
      const res = await axios.get("http://localhost:5000/blog", config);
      console.log(res);
      setBlogs(res.data);
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
  }, [refresh, community]);

  return (
    <LayoutBoard>
      <Flex
        direction={"column"}
        width={"100%"}
        minHeight={"100vh"}
        bgColor={BrandColor.Grey100}
        padding={"16px"}
        gap={20}
      >
        <BlogSearchFilter />
        <Flex direction={"column"} gap={1} width={"100%"}>
          {blogs.map((blog, index) => (
            <Flex
              key={blog.blogID}
              bgColor={BrandColor.White}
              borderRadius={index == 0 ? "16px 16px 0px 0px" : "0px"}
              borderTopRightRadius={index == 0 ? "16px" : "0px"}
              borderTopLeftRadius={index == 0 ? "16px" : "0px"}
              borderBottomStartRadius={blogs.length == index + 1 ? "16px" : "0px"}
              borderBottomEndRadius={blogs.length == index + 1 ? "16px" : "0px"}
            >
              <BlogDetails
                key={blog.blogID}
                blogID={blog.blogID}
                username={blog.username}
                community={blog.community}
                title={blog.title}
                descriptions={blog.description}
                comments={blog.comments ?? []}
              />
            </Flex>
          ))}
        </Flex>
      </Flex>
    </LayoutBoard>
  );
};

export default Home;
