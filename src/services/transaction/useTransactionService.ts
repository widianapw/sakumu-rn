import useBaseService from "../useBaseService";
import { useBottomSheet } from "../../../tmd/providers/BottomSheetProvider";
import { CreateTransactionResponse } from "../../models/transaction/Transaction";

export type CreateTransactionStripeReq = {
  items?: {id: number, quantity: number}[]
}

export default function useTransactionService() {
  const { postAPI } = useBaseService();
  const { showErrorBS } = useBottomSheet();
  const createTransactionStripeAPI = async (req: CreateTransactionStripeReq) => {
    try {
      return await postAPI<CreateTransactionResponse>("payment/intent", req);
    } catch (e) {
      showErrorBS(e);
    }
  };

  return {
    createTransactionStripeAPI
  };
}
