export const useApiCall = () => {
  const call = async (
    apiCall: () => Promise<any>,
    onSuccess: (data: any) => void,
    onError?: (err?: any) => void
  ) => {
    try {
      const response = await apiCall();
      const { status } = response;
      switch (status) {
        case 200:
        case 201:
        case 202:
          onSuccess(response);
          break;
        default:
          if (onError) onError();
          break;
      }
    } catch (err) {
      if (onError) onError(err);
    }
  };

  return { call };
};
