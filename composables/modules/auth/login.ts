// composables/useOrganizations.ts
import { authApiFactory } from "@/apiFactory/auth";
import { useStorage } from "@vueuse/core";
import Swal from "sweetalert2";
const runtimeData = {
  user: ref({} as any),
  token: ref(""),
  expiry: ref("")
};
const router = useRouter();
const localstorageData = {
  user: useStorage("user", {} as any),
  token: useStorage("token", ""),
  expiry: useStorage("expiry", ""),
};
watch(
  runtimeData.user,
  (val) => {
    Object.keys(val).forEach((key) => {
      localstorageData.user.value[key] = val[key];
    });
  },
  { deep: true }
);

(() => {
  runtimeData.user.value = localstorageData.user.value;
  runtimeData.token.value = localstorageData.token.value;
})();

const loginPayload = ref({
  username: "",
  password: "",
});
export const useLogin = () => {
  const loading = ref(false);
  const handleLogin = async () => {
    loading.value = true;
    try {
      const payload = {
        username: loginPayload.value.username,
        password: loginPayload.value.password,
      };
      const response = await authApiFactory.login(payload);
      console.log(response, "res here");
      runtimeData.user.value = response.data.user;
      localstorageData.token.value = response.data?.token.accessToken;
      localstorageData.expiry.value = response.data?.token.expiresIn
      runtimeData.token.value = response.data?.token;
      useNuxtApp().$toast.success("Welcome back.", {
        autoClose: 5000,
        dangerouslyHTMLString: true,
      });
      useRouter().push("/dashboard");
      return response.data;
    } catch (error) {
      useNuxtApp().$toast.error("Something went wrong!", {
        autoClose: 5000,
        dangerouslyHTMLString: true,
      });
      return error;
    } finally {
      loading.value = false;
    }
  };

  const logOut = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.value) {
        localStorage.clear();
        runtimeData.user.value = null;
        router.push({ path: "/", query: { page: "login" } });
      } else {
        Swal.fire("Cancelled", "Action was cancelled", "info");
      }
    });
  };

  const id = computed({
    get: () => runtimeData?.user?.value?.id ?? "",
    set: () => {},
  });

  const isLoggedIn = computed({
    get: () => {
      if (!runtimeData.token?.value) return false;
      return runtimeData?.user?.value != null || undefined || {};
    },
    set: () => {},
  });

  const userRole = computed({
    get: () => {
      if (!runtimeData.token?.value) return false;
      return runtimeData?.user?.value != null || undefined || {}
        ? runtimeData?.user?.value.role
        : "";
    },
    set: () => {},
  });

  const user = computed({
    get: () => {
      if (!runtimeData.token?.value) return false;
      return runtimeData?.user?.value != null || undefined || {}
        ? runtimeData?.user?.value
        : "";
    },
    set: () => {},
  });
  const isFormEmpty = computed(() => {
    return !!(loginPayload.value.username && loginPayload.value.password);
  });

  return {
    handleLogin,
    localstorageData,
    loginPayload,
    loading,
    isFormEmpty,
    logOut,
    isLoggedIn,
    id,
    userRole,
    user,
  };
};
