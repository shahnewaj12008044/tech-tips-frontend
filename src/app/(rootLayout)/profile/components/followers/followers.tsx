import { useUser } from "@/context/user-provider";
import { useGetMyProfile } from "@/hooks/user-hook";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { motion } from "framer-motion";

export const Followers = () => {
  const { user } = useUser();
  const { data: userData } = useGetMyProfile(user?.email);

  const followers = userData?.data?.followers || [];
  
  if (!followers.length) {
    return <p className="text-center text-gray-500">You have no followers yet.</p>;
  }

  return (
    <div className="max-w-6xl mx-auto p-8">
      <h2 className="text-4xl font-extrabold text-center mb-12 text-gray-900">Your Followers</h2>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {followers.map((follower: any, index: number) => (
          <motion.div
            key={follower.id}
            className="group bg-white border border-gray-200 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition duration-300 flex flex-col items-center text-center"
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 300, delay: index * 0.1, duration: 0.4 }}
          >
            {/* Follower Avatar */}
            <motion.div
              className="h-20 w-20 mb-6 flex items-center justify-center overflow-hidden rounded-full bg-gradient-to-r from-purple-500 to-blue-500"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.8 }}
            >
              <Avatar>
                <AvatarImage src={follower.profilePhoto} alt={follower.name} />
                <AvatarFallback className="bg-gray-300 text-white text-2xl">
                  {follower.name?.charAt(0)}
                </AvatarFallback>
              </Avatar>
            </motion.div>

            {/* Follower Name */}
            <h3 className="font-semibold text-xl text-gray-900 group-hover:text-blue-600 transition duration-150">
              {follower.name}
            </h3>

            {/* Follow Back Button */}
            <motion.button
              className="mt-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-5 py-2.5 rounded-full font-medium hover:from-indigo-600 hover:to-blue-700 transition duration-200"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              Follow Back
            </motion.button>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};
