import { reportsApiFactory } from "@/apiFactory/reports";

export const useFetchReportedUsers = () => {
  const reportedUsersList = ref([]);
  const loading = ref(false);
  const fetchReportedUsers = async () => {
    loading.value = true;
    try {
      const response = await reportsApiFactory.getReportedUsers();
      reportedUsersList.value = response.data;
    } catch (error: any) {
      useNuxtApp().$toast.error(error.message, {
        autoClose: 5000,
        dangerouslyHTMLString: true,
      });
      return error;
    } finally {
      loading.value = false;
    }
  };

  return { fetchReportedUsers, reportedUsersList, loading };
};
