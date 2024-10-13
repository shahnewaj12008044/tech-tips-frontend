"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useGetAllPosts } from "@/hooks/post-hook";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Thumbnail } from "@/components/thumbnail";
import Loader from "@/components/Loader";
import { useUser } from "@/context/user-provider";
import {
  useGetMyProfile,
  useUserFollow,
  useUserUnfollow,
} from "@/hooks/user-hook";
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  WhatsappIcon,
} from "react-share";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { VoteButton } from "../components/vote-button";
import { CheckCircle } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { useRouter } from "next/navigation";

const Renderer = dynamic(() => import("@/components/renderer"), { ssr: false });

const PostCard = () => {
  const { user } = useUser();
  const [openSharePostId, setOpenSharePostId] = useState<string | null>(null);
  const { data, isLoading, refetch } = useGetAllPosts();
  const { data: userData, refetch: refetchOnSuccess } = useGetMyProfile(user?.email);

  const followMutation = useUserFollow();
  const unfollowMutation = useUserUnfollow();
const router = useRouter()


  useEffect(() => {
    refetch();
  }, [refetch]);

  const toggleShareOptions = (postId: string) => {
    if (openSharePostId === postId) {
      setOpenSharePostId(null);
    } else {
      setOpenSharePostId(postId);
    }
  };

  if (isLoading) return <Loader />;

  return (
    <div className="bg-gray-900 text-white max-w-3xl mx-auto rounded-lg shadow-lg p-6 space-y-8">
      {data?.data?.map((post: any) => {
        const authorUserId = post?.authorId?._id;
        const userIdforFollow = userData?.data?._id;

        const isFollowing = userData?.data?.following?.some(
          (followingUserId: { _id: string }) => followingUserId._id === authorUserId
        );

        const handleFollowToggle = async () => {
          if(!user){
            router.push('/login')
            return
          }
          try {
            if (isFollowing) {
              unfollowMutation.mutate(
                { userId: userIdforFollow, targetId: authorUserId },
                { onSuccess: () => refetchOnSuccess() }
              );
            } else {
              followMutation.mutate(
                { userId: userIdforFollow, targetId: authorUserId },
                { onSuccess: () => refetchOnSuccess() }
              );
            }
          } catch (error) {
            console.error("Error toggling follow status:", error);
          }
        };

        return (
          <div key={post?._id} className="bg-gray-800 text-white p-6 rounded-lg shadow-md transition-transform duration-200 hover:-translate-y-1">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center space-x-4">
                <Avatar className="cursor-pointer rounded-full hover:opacity-75 transition">
                  <AvatarImage src={post?.authorId?.profilePhoto} alt="author" />
                  <AvatarFallback className="bg-sky-500 text-white">
                    {post?.authorId?.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-bold flex items-center">
                    {post?.authorId?.name || "Unknown Author"}
                    {post.authorId?.isVerified && (
                      <CheckCircle className="ml-1 text-green-500" size={12} />
                    )}
                  </p>
                  <p className="text-gray-400 text-sm">
                    {new Date(post.createdAt).toLocaleDateString()} |{" "}
                    <span>{formatDistanceToNow(new Date(post?.createdAt), { addSuffix: true })}</span>
                  </p>
                </div>
              </div>
              {user?._id !== post?.authorId?._id && (
                <Button
                  className={`bg-blue-600 hover:bg-blue-700 text-white rounded-full transition duration-300`}
                  onClick={handleFollowToggle}
                >
                  {isFollowing ? "Unfollow" : "Follow"}
                </Button>
              )}
            </div>

            {/* Post Title */}
            <Link href={`/post-details/${post?._id}`} passHref>
              <p className="mb-4 text-2xl font-semibold cursor-pointer hover:underline">{post?.title}</p>
            </Link>

            {/* Post Content (Shortened) */}
            <Link href={`/post-details/${post?._id}`} passHref>
              <div className="flex flex-col w-full mb-4">
                <Renderer value={post?.content} maxLength={300} />
              </div>
            </Link>

            {/* Post Images */}
            <div className="space-y-4 mb-4">
              {post?.images?.map((imageUrl: any, index: any) => (
                <Thumbnail key={index} url={imageUrl} />
              ))}
            </div>

            {/* Footer */}
            <div className="flex justify-between items-center mt-4">
              <div className="flex items-center space-x-4 text-gray-400">
                {/* Upvote/Downvote */}
                <VoteButton post={post} />

                {/* Comments */}
                <Link href={`/post-details/${post?._id}`} passHref>
                  <div className="flex items-center space-x-2 bg-gray-700 p-2 rounded-full hover:bg-gray-600 transition">
                    <svg
                      aria-hidden="true"
                      className="icon-comment"
                      fill="currentColor"
                      height="20"
                      icon-name="comment-outline"
                      viewBox="0 0 20 20"
                      width="20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="m7.725 19.872a.718.718 0 0 1-.607-.328.725.725 0 0 1-.118-.397V16H3.625A2.63 2.63 0 0 1 1 13.375v-9.75A2.629 2.629 0 0 1 3.625 1h12.75A2.63 2.63 0 0 1 19 3.625v9.75A2.63 2.63 0 0 1 16.375 16h-4.161l-4 3.681a.725.725 0 0 1-.489.191ZM3.625 2.25A1.377 1.377 0 0 0 2.25 3.625v9.75a1.377 1.377 0 0 0 1.375 1.375h4a.625.625 0 0 1 .625.625v2.575l3.3-3.035a.628.628 0 0 1 .424-.165h4.4a1.377 1.377 0 0 0 1.375-1.375v-9.75a1.377 1.377 0 0 0-1.374-1.375H3.625Z"></path>
                    </svg>
                    <span className="text-white text-sm font-normal">{post?.comments.length}</span>
                  </div>
                </Link>

                {/* Share */}
                <div className="relative">
                  <Dialog open={openSharePostId === post?._id} onOpenChange={() => toggleShareOptions(post?._id)}>
                    <DialogTrigger asChild>
                      <button
                        className="flex items-center space-x-2 text-white/70 bg-gray-700 p-2 rounded-full hover:bg-gray-600 transition"
                        onClick={() => toggleShareOptions(post?._id)}
                      >
                        <svg
                          aria-hidden="true"
                          className="icon-share"
                          fill="currentColor"
                          height="20"
                          icon-name="share-new-outline"
                          viewBox="0 0 20 20"
                          width="20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="m18.8 8.286-6.466-7.064a.759.759 0 0 0-1.295.537v3.277C5.623 5.365 1 9.918 1 15.082v2.907h1.274C2.516 15 5.81 12.62 9.834 12.62h1.205v3.226a.757.757 0 0 0 1.295.537l6.466-7.064a.757.757 0 0 0 0-1.06ZM11.785 15.176c-3.165 0-5.935 1.4-7.845 3.697h-.055v-2.87c0-4.245 3.792-7.681 8.073-8.371v4.628c-.047-.012-.094-.018-.141-.018ZM15.653 12.62h-2.631V6.562c.046.014.094.021.141.021a2.17 2.17 0 0 1 2.171 2.171v2.121c-.79-.479-1.777-.884-2.822-1.063V9.619c0-.567.052-1.117.155-1.659l2.65 2.895v2.821c0 .116.008.233.021.348ZM16.111 15.5h1.575c-.058 1.02-1.203 2.484-3.176 3.443a.755.755 0 0 1-.685 0c-1.553-.92-2.233-1.436-2.375-2.249l-.017-.099V15.5h1.258c1.387 0 2.647-.6 3.51-1.625Z"></path>
                        </svg>
                        <span className="text-white">Share</span>
                      </button>
                    </DialogTrigger>
                    <DialogContent>
                      <div className="flex flex-col items-center space-y-4 p-4 bg-gray-800 rounded-lg">
                        <h2 className="text-lg font-semibold">Share this post</h2>
                        <div className="flex space-x-4">
                          <FacebookShareButton url={`${window.location.origin}/post-details/${post?._id}`}>
                            <FacebookIcon size={32} round={true} />
                          </FacebookShareButton>
                          <TwitterShareButton url={`${window.location.origin}/post-details/${post?._id}`}>
                            <TwitterIcon size={32} round={true} />
                          </TwitterShareButton>
                          <LinkedinShareButton url={`${window.location.origin}/post-details/${post?._id}`}>
                            <LinkedinIcon size={32} round={true} />
                          </LinkedinShareButton>
                          <WhatsappShareButton url={`${window.location.origin}/post-details/${post?._id}`}>
                            <WhatsappIcon size={32} round={true} />
                          </WhatsappShareButton>
                        </div>
                        <DialogClose asChild>
                          <Button className="bg-red-600 hover:bg-red-700">Close</Button>
                        </DialogClose>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PostCard;
