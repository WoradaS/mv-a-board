import BlogDetails from "@/components/blog/blog-details";
import BlogSearchFilter from "@/components/blog/blog-search-filter";
import LayoutBoard from "@/components/layout/layout-board";
import { BrandColor } from "@/constants/color";
import { mock_blog } from "@/constants/mock";
import { Flex } from "@chakra-ui/react";

type Props = {};

const Home = (props: Props) => {
  return (
    <LayoutBoard>
      <Flex direction={"column"} minHeight={"100vh"} bgColor={BrandColor.Grey100} padding={"16px"} gap={20}>
        <BlogSearchFilter />
        <Flex direction={"column"} gap={1}>
          {mock_blog.map((blog, index) => (
            <Flex
              key={blog.username}
              bgColor={BrandColor.White}
              borderRadius={index == 0 ? "16px 16px 0px 0px" : "0px"}
              borderTopRightRadius={index == 0 ? "16px" : "0px"}
              borderTopLeftRadius={index == 0 ? "16px" : "0px"}
              borderBottomStartRadius={mock_blog.length == index + 1 ? "16px" : "0px"}
              borderBottomEndRadius={mock_blog.length == index + 1 ? "16px" : "0px"}
            >
              <BlogDetails
                key={blog.blogID}
                blogID={blog.blogID}
                username={blog.username}
                community={blog.community}
                title={blog.title}
                descriptions={blog.descriptions}
                comments={blog.comments}
              />
            </Flex>
          ))}
        </Flex>
      </Flex>
    </LayoutBoard>
  );
};

export default Home;
