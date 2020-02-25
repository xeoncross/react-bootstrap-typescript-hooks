import { useState, useEffect, useReducer } from "react";
import axios, { AxiosRequestConfig, AxiosPromise, AxiosError } from "axios";
import { useToken } from "./TokenContext";

interface props {
  isLoading: boolean;
  error: Error;
  data: any;
}

interface actiontype {
  type: string;
  payload?: any;
}

const dataFetchReducer = (state: props, action: actiontype) => {
  switch (action.type) {
    case "FETCH_INIT":
      return { ...state, isLoading: true, error: false };
    case "FETCH_SUCCESS":
      return {
        isLoading: false,
        error: false,
        data: action.payload
      };
    case "FETCH_FAILURE":
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    default:
      throw new Error("Invalid Data API Action");
  }
};

// const useDataApi = (method: AxiosRequestConfig["method"], initialUrl: string, requestData: any, initialData: any) => {

const useDataApi = <T extends object = object>(
  method: AxiosRequestConfig["method"],
  initialUrl: string,
  requestData: any,
  initialData: any
): [{ isLoading: boolean; error: any; data: any }, (url: string) => void] => {
  const [url, setUrl] = useState(initialUrl);
  const { token }: any = useToken();

  const [state, dispatch] = useReducer(dataFetchReducer, {
    isLoading: false,
    error: false,
    data: initialData
  });

  useEffect(() => {
    let didCancel = false;

    const fetchData = async () => {
      dispatch({ type: "FETCH_INIT" });

      const config: AxiosRequestConfig = {
        // baseURL: process.env.REACT_APP_API_ENDPOINT!,
        method,
        url,
        data: requestData,
        timeout: 4000,
        headers: {
          common: {
            "Content-Type": "application/json"
            // Authorization: token && `Bearer ${token}`
          }
        }
      };

      try {
        const result = await axios(config);

        if (!didCancel) {
          dispatch({ type: "FETCH_SUCCESS", payload: result.data });
        }
      } catch (error) {
        
        console.log(
          "fetchData",
          error
        );

        // Todo
        // if (isAxiosError(error)) {
          
          let payload = error.message;
          // if (error.response) {
          //   payload = error.response.data;
          // }

          if (!didCancel) {
            dispatch({ type: "FETCH_FAILURE", payload });
          }
        
        // }
      }
    };

    if (url) {
      fetchData();
    }

    return () => {
      // TODO support https://github.com/axios/axios#cancellation
      didCancel = true;
    };
  }, [url, initialUrl, requestData, token, method]);

  return [state, setUrl];
};


function isAxiosError(error: any): error is AxiosError {
  return (error as AxiosError).isAxiosError !== undefined;
}

export default useDataApi;
