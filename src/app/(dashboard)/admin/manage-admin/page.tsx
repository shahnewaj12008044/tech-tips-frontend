"use client";
import { useGetAllUsers } from "@/hooks/user-hook";
import DataTable from "./components/data-table";
import { motion } from "framer-motion";
import Loader from "@/components/Loader";
import { columns } from "./components/columns";
import { AddAdmin } from "./components/add-admin";
const ManageAdmin = () => {
  const { data, refetch, isLoading } = useGetAllUsers();
  const getAllAdmin = data?.data?.filter((user: any) => user.role === "admin");
  if (isLoading) return <Loader />;
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <AddAdmin refetch={refetch} />
      </motion.div>
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <DataTable columns={columns} data={getAllAdmin} />
      </motion.div>
    </motion.div>
  );
};
export default ManageAdmin;
