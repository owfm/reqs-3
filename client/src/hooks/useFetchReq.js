import { useState, useEffect } from "react";
import Axios from "axios";
import store from "store";
import { fetchReqsFailure } from "actions/reqs";
import emitSnackbar from "actions/snackbar";

const { dispatch } = store;

const useFetchReq = id => {
  console.log("inside UseFetchReq");
  const [requisition, setRequisition] = useState();

  useEffect(() => {
    (async id => {
      try {
        const response = await Axios.get(`/reqs/${id}`);
        setRequisition(response.data.data);
      } catch (error) {
        dispatch(emitSnackbar("Something went wrong! " + error.message));
        dispatch(fetchReqsFailure(error));
      }
    })(id);
  }, [id]);
  console.log(requisition);
  return requisition;
};

export default useFetchReq;
