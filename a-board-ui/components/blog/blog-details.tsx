import { BrandColor } from "@/constants/color";
import { Flex } from "@chakra-ui/react";
import { Avatar, Badge, Chip, IconButton, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";

type Props = {
  blogID: number;
  username: string;
  community: string;
  title: string;
  descriptions: string;
  updateDate?: string;
  comments?: any;
  modify?: boolean;
  fullDetails?: boolean;
  onDelete?: () => void;
  onEdit?: () => void;
};

const BlogDetails = (props: Props) => {
  const {
    blogID,
    username,
    community,
    title,
    descriptions,
    updateDate,
    comments,
    modify,
    fullDetails,
    onDelete,
    onEdit,
  } = props;
  const router = useRouter();
  return (
    <Flex
      direction={"column"}
      padding={fullDetails ? "0px" : "22px 20px"}
      gap={fullDetails ? 16 : 5}
      onClick={fullDetails ? () => {} : () => router.push(`/blog?blogID=${blogID}`)}
    >
      <Flex direction={"column"} gap={15}>
        <Flex justifyContent={"space-between"}>
          <Flex gap={4} alignItems={"center"}>
            <Badge
              invisible={!fullDetails}
              color="success"
              overlap="circular"
              badgeContent=" "
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              sx={{
                "& .MuiBadge-badge": { fontSize: 9, height: 12, minWidth: 12, backgroundColor: BrandColor.Success },
              }}
            >
              {" "}
              <Avatar sx={{ width: fullDetails ? 48 : 31, height: fullDetails ? 48 : 31 }}>{username.charAt(0)}</Avatar>
            </Badge>

            <Typography fontSize={"14px"} color={fullDetails ? BrandColor.Black : BrandColor.Grey300} fontWeight={500}>
              {username}
            </Typography>
            {fullDetails ? (
              <Typography fontSize={"12px"} color={BrandColor.Grey300}>
                5mo. ago
              </Typography>
            ) : null}
          </Flex>
          {modify ? (
            <Flex alignItems={"start"} marginTop={"-8px"} onClick={(e) => e.stopPropagation()}>
              <IconButton aria-label="edit" size="small" onClick={onEdit}>
                <Image src="/edit.svg" width={16} height={16} alt="edit" />
              </IconButton>
              <IconButton aria-label="delete" size="small" onClick={onDelete}>
                <Image src="/delete.svg" width={16} height={16} alt="delete" />
              </IconButton>
            </Flex>
          ) : null}
        </Flex>
        <Chip label={community} sx={{ width: "min-content" }} />
      </Flex>
      <Flex direction={"column"} gap={fullDetails ? 28 : 10}>
        <Flex direction={"column"} gap={fullDetails ? 16 : 2}>
          <Typography fontSize={fullDetails ? "28px" : "16px"} color={"#101828"} fontWeight={700} lineHeight={"24px"}>
            {title}
          </Typography>
          <Typography
            fontSize={"12px"}
            color={"#101828"}
            sx={{
              display: "-webkit-box",
              overflow: "hidden",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: fullDetails ? null : 2,
            }}
          >
            {descriptions}
          </Typography>
        </Flex>
        <Flex gap={9}>
          <Image src="/comments.svg" width={16} height={16} alt="comments" />
          <Typography fontSize={"12px"} color={BrandColor.Grey300}>
            {`${comments.length} Comments`}
          </Typography>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default BlogDetails;
