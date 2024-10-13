import { useState, useEffect } from "react";
import { useUser } from "@/context/user-provider";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Loader } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useGetMyProfile, useUpdateProfile } from "@/hooks/user-hook";
import { toast } from "sonner";
import { motion } from "framer-motion"; 
import { CheckCircle, Facebook } from "lucide-react";
import envConfig from "@/config";

const ProfileCard = () => {
  const { user, isLoading } = useUser();
  const { data: userData, refetch } = useGetMyProfile(user?.email);
  const { mutate: updateProfile } = useUpdateProfile();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false); 

  useEffect(() => {
    if (userData) {
      setName(userData?.data?.name || "");
      setEmail(userData?.data?.email || "");
      setImagePreview(userData?.data?.profilePhoto || "");
    }
  }, [userData]);

  if (isLoading)
    return (
      <Loader className="size-4 mx-auto animate-spin text-muted-foreground" />
    );

  const avatarFallback = userData?.data?.name?.charAt(0).toUpperCase() || "U";

  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    try {
      let imageUrl = imagePreview;

      if (imagePreview && imagePreview !== userData?.data?.profilePhoto) {
        const formData = new FormData();
        const fileInput = document.getElementById("fileInput") as HTMLInputElement;
        const file = fileInput?.files?.[0];
        if (file) {
          formData.append("file", file);
          if (envConfig.uploadPreset) {
            formData.append("upload_preset", envConfig.uploadPreset);
          } else {
            throw new Error("Upload preset is not defined");
          }
          if (envConfig.cloudName) {
            formData.append("cloud_name", envConfig.cloudName);
          } else {
            throw new Error("Cloud name is not defined");
          }

          const response = await axios.post(
            `https://api.cloudinary.com/v1_1/${envConfig.cloudName}/image/upload`,
            formData,
            {
              headers: { "Content-Type": "multipart/form-data" },
            }
          );
          imageUrl = response.data.secure_url;
        }
      }

      const updateData = {
        name,
        email,
        profilePhoto: imageUrl,
      };

      if (userData) {
        const email = userData?.data?.email;
        if (email) {
          updateProfile(
            { email, userData: updateData },
            {
              onSuccess: () => {
                refetch();
                setIsDialogOpen(false); 
              },
            }
          );
        } else {
          console.error("Email is undefined");
        }
      } else {
        console.error("userData is undefined");
      }
    } catch (error) {
      console.error("Error saving profile:", error);
      toast.error("Failed to save profile");
    }
  };

  return (
    <div className="bg-gray-100 shadow-md p-8 rounded-lg w-full max-w-xl mx-auto mt-10">
      <div className="flex flex-col md:flex-row items-center justify-between">
        <div className="flex flex-col items-center md:flex-row">
          <motion.div
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3 }}
            className="w-32 h-32 rounded-full overflow-hidden border-4 border-indigo-600"
          >
            <Avatar className="w-full h-full">
              <AvatarImage
                src={userData?.data?.profilePhoto || ""}
                alt="User Avatar"
                className="object-cover w-full h-full"
              />
              <AvatarFallback className="bg-indigo-600 text-white text-2xl">
                {avatarFallback}
              </AvatarFallback>
            </Avatar>
          </motion.div>
          <div className="ml-0 md:ml-6 mt-4 md:mt-0 text-center md:text-left">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-2xl font-bold flex items-center text-gray-800"
            >
              {userData?.data?.name || "User Name"}
              {userData?.data?.isVerified === true ? <CheckCircle className="ml-2 text-green-500" size={20} /> : null}
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-gray-600"
            >
              {userData?.data?.email || "user@example.com"}
            </motion.p>
          </div>
        </div>

        <div className="flex mt-6 md:mt-0 gap-6">
          <div className="text-center">
            <p className="text-lg font-semibold text-gray-800">{userData?.data?.followers?.length}</p>
            <p className="text-gray-500">Followers</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-semibold text-gray-800">{userData?.data?.following?.length}</p>
            <p className="text-gray-500">Following</p>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2 rounded-full">Edit Profile</Button>
          </DialogTrigger>
          <DialogContent className="bg-white rounded-lg shadow-lg p-6">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold">Edit Profile</DialogTitle>
            </DialogHeader>
            <div className="space-y-6">
              <div className="flex flex-col items-center">
                <Image
                  src={imagePreview || userData?.data?.profilePhoto || ""}
                  width={120}
                  height={120}
                  alt="Image Preview"
                  className="w-40 h-40 rounded-full border-4 cursor-pointer border-indigo-500"
                  onClick={() => document.getElementById("fileInput")?.click()}
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  id="fileInput"
                  className="hidden"
                />
              </div>

              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <Button onClick={handleSave} className="bg-indigo-600 text-white">Update Profile</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default ProfileCard;
