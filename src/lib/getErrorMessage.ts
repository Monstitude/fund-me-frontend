const getErrorMessage = (error: any) => error?.data?.message ?? error?.message ?? "Request Failed";

export default getErrorMessage;
