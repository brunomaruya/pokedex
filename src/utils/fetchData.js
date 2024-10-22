export const fetchData = async (apiCall, setLoading, setData, setError) => {
  setLoading(true);
  try {
    const data = await apiCall();
    setData(data);
  } catch (error) {
    setError(error);
  } finally {
    setLoading(false);
  }
};
