import BlogDetails from "@/components/blog/blog-details";
import BlogSearchFilter from "@/components/blog/blog-search-filter";
import CreatePost from "@/components/blog/create-post";
import DeletePost from "@/components/blog/delete-post";
import AppDialog from "@/components/dialog";
import LayoutBoard from "@/components/layout/layout-board";
import { BrandColor } from "@/constants/color";
import { Flex } from "@chakra-ui/react";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import { AppContext } from "./_app";

type Props = {};

const OurBlog = (props: Props) => {
  const { setError, refresh, userID, community, setRefresh } = useContext(AppContext);

  const router = useRouter();

  const [editPost, setEditPost] = React.useState<boolean>(false);
  const [deletePost, setDeletePost] = React.useState<boolean>(false);
  const [blogDetails, setBlogDetails] = React.useState({
    blogID: "",
    community: "",
    title: "",
    description: "",
  });

  const [blogs, setBlogs] = React.useState<any[]>([]);

  const getBlog = async () => {
    try {
      const config = {
        params: {
          userID,
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

  const onDelete = async (blogID: string) => {
    try {
      const res = await axios.delete("http://localhost:5000/blog/" + blogID);
      console.log(res);
      setDeletePost(false);
      setRefresh((prev) => !prev);
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

  React.useEffect(() => {
    getBlog();
  }, [refresh, userID, community]);

  React.useEffect(() => {
    if (userID == undefined) {
      router.push("/");
    }
  }, [userID]);

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
              key={blog.username}
              bgColor={BrandColor.White}
              width={"100%"}
              borderRadius={index == 0 ? "16px 16px 0px 0px" : "0px"}
              borderTopRightRadius={index == 0 ? "16px" : "0px"}
              borderTopLeftRadius={index == 0 ? "16px" : "0px"}
              borderBottomStartRadius={blogs.length == index + 1 ? "16px" : "0px"}
              borderBottomEndRadius={blogs.length == index + 1 ? "16px" : "0px"}
            >
              <BlogDetails
                modify
                key={blog.blogID}
                blogID={blog.blogID}
                username={blog.username}
                community={blog.community}
                title={blog.title}
                descriptions={blog.description}
                comments={blog.comments ?? []}
                onEdit={() => {
                  setEditPost(true);
                  setBlogDetails({
                    blogID: blog.blogID,
                    community: blog.community,
                    title: blog.title,
                    description: blog.description,
                  });
                }}
                onDelete={() => {
                  setDeletePost(true);
                  setBlogDetails({
                    blogID: blog.blogID,
                    community: blog.community,
                    title: blog.title,
                    description: blog.description,
                  });
                }}
              />
            </Flex>
          ))}
          <AppDialog open={editPost} setOpen={setEditPost} sx={{ width: "90vw", maxWidth: "685px" }}>
            <CreatePost
              isEdit
              onClose={() => setEditPost(false)}
              blogID={blogDetails.blogID}
              community={blogDetails.community}
              title={blogDetails.title}
              description={blogDetails.description}
            />
          </AppDialog>
          <AppDialog open={deletePost} setOpen={setDeletePost} sx={{ width: "90vw", maxWidth: "400px" }}>
            <DeletePost onClose={() => setDeletePost(false)} onDelete={() => onDelete(blogDetails.blogID)} />
          </AppDialog>
        </Flex>
      </Flex>
    </LayoutBoard>
  );
};

export default OurBlog;
