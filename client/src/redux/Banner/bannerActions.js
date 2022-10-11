import {
    FETCH_BANNERS_REQUEST,
    FETCH_BANNERS_SUCCESS,
    FETCH_BANNERS_FAILURE,
  } from "./bannerActionTypes";
  import { BANNERS_URL } from "../../api_constants";
  import axios from 'axios';

  
  export const fetchBannersRequest = () => {
    return {
      type: FETCH_BANNERS_REQUEST,
    };
  };
  
  export const fetchBannersSuccess = (banners) => {
    return {
      type: FETCH_BANNERS_SUCCESS,
      payload: banners,
    };
  };
  
  export const fetchBannersFailure = (error) => {
    return {
      type: FETCH_BANNERS_FAILURE,
      payload: error,
    };
  };
  
  export const fetchBanners = () => {
    return (dispatch) => {
      dispatch(fetchBannersRequest());
      axios(BANNERS_URL)
        .then((res) => {
          dispatch(fetchBannersSuccess(res.data));
        })
        .catch((err) => {
          dispatch(fetchBannersFailure(err));
        });
    };
  };
  