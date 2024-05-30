import BlogDetails from "@/components/blog/blog-details";
import BlogSearchFilter from "@/components/blog/blog-search-filter";
import CreatePost from "@/components/blog/create-post";
import DeletePost from "@/components/blog/delete-post";
import AppDialog from "@/components/dialog";
import LayoutBoard from "@/components/layout/layout-board";
import { BrandColor } from "@/constants/color";
import { mock_blog } from "@/constants/mock";
import { Flex } from "@chakra-ui/react";
import React from "react";

type Props = {};

const OurBlog = (props: Props) => {
  const [editPost, setEditPost] = React.useState<boolean>(false);
  const [deletePost, setDeletePost] = React.useState<boolean>(false);
  const [blogDetails, setBlogDetails] = React.useState({
    blogID: "",
    community: "",
    title: "",
    descriptions: "",
  });

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
                modify
                key={blog.blogID}
                blogID={blog.blogID}
                username={blog.username}
                community={blog.community}
                title={blog.title}
                descriptions={blog.descriptions}
                comments={blog.comments}
                onEdit={() => {
                  setEditPost(true);
                  setBlogDetails({
                    blogID: blog.blogID,
                    community: blog.community,
                    title: blog.title,
                    descriptions: blog.descriptions,
                  });
                }}
                onDelete={() => {
                  setDeletePost(true);
                  setBlogDetails({
                    blogID: blog.blogID,
                    community: blog.community,
                    title: blog.title,
                    descriptions: blog.descriptions,
                  });
                }}
              />
            </Flex>
          ))}
          <AppDialog open={editPost} setOpen={setEditPost} sx={{ width: "90vw", maxWidth: "685px" }}>
            <CreatePost
              isEdit
              onClose={() => setEditPost(false)}
              onClick={() => {}}
              blogID={blogDetails.blogID}
              community={blogDetails.community}
              title={blogDetails.title}
              description={blogDetails.descriptions}
            />
          </AppDialog>
          <AppDialog open={deletePost} setOpen={setDeletePost} sx={{ width: "90vw", maxWidth: "400px" }}>
            <DeletePost onClose={() => setDeletePost(false)} onDelete={() => {}} />
          </AppDialog>
        </Flex>
      </Flex>
    </LayoutBoard>
  );
};

export default OurBlog;
