import {
  getAllPayments,
  premiumPayment,
  getMyPayments,
} from "@/services/premium-payment-services";
import { PremiumPayment } from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

export const usePremiumPayment = () => {
  return useMutation<any, Error, PremiumPayment>({
    mutationKey: ["CREATE_POST"],
    mutationFn: async (userData) => await premiumPayment(userData),
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useGetAllPayments = () => {
  return useQuery({
    queryKey: ["GET_ALL_PAYMENTS"],
    queryFn: async () => await getAllPayments(),
  });
};

export const useGetMyPayment = (userId: any) => {
  return useQuery({
    queryKey: ["GET_MY_PAYMENTS"],
    queryFn: async () => await getMyPayments(userId),
  });
};