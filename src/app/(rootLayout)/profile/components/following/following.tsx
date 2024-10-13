import { useUser } from "@/context/user-provider";
import { useGetMyProfile } from "@/hooks/user-hook";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { motion } from "framer-motion";

export const Following = () => {
  const { user } = useUser();
  const { data: userData } = useGetMyProfile(user?.email);

  const following = userData?.data?.following || [];
  if (!following.length) {
    return (
      <p className="text-center text-gray-500">You have no following yet.</p>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-900 rounded-lg shadow-xl">
      <h2 className="text-4xl font-extrabold text-center text-white mb-12">
        Following
      </h2>
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {following.map((follower: any, index: number) => (
          <motion.div
            key={follower.id}
            className="group bg-gradient-to-b from-gray-800 to-gray-700 rounded-xl p-8 shadow-lg hover:shadow-2xl transition duration-300 flex flex-col items-center space-y-4"
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              type: "spring",
              stiffness: 300,
              delay: index * 0.1,
              duration: 0.4,
            }}
          >
            {/* Follower Avatar */}
            <motion.div
              className="h-20 w-20 mb-4 flex items-center justify-center rounded-full overflow-hidden border-4 border-blue-500"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.8 }}
            >
              <Avatar className="h-full w-full">
                <AvatarImage
                  src={follower.profilePhoto}
                  alt={follower.name}
                  className="object-cover"
                />
                <AvatarFallback className="bg-gray-500 text-white text-2xl">
                  {follower.name?.charAt(0)}
                </AvatarFallback>
              </Avatar>
            </motion.div>
            {/* Follower Name */}
            <h3 className="text-lg font-semibold text-gray-200 group-hover:text-blue-400 transition duration-150">
              {follower.name}
            </h3>
            {/* Action Button */}
            <motion.button
              className="bg-blue-600 text-white px-6 py-3 rounded-full font-bold text-sm hover:bg-blue-500 transition duration-200"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              Unfollow
            </motion.button>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};
