import { ref, watch } from "vue";
import { useStorage } from "@vueuse/core";
const user = ref(null);

const runtimeData = {
  auth: ref(),
  user: ref({} as any),
  token: ref(""),
  // tempOtp: ref(''),
};
const localStorageData = {
  auth: ref(),
  user: useStorage("user", {} as any),
  token: useStorage("token", ""),
  // tempOtp: useStorage('tempOtp', '')
};

const error = ref<string | null>(null);

// Guard against null or undefined runtimeData.user.value
watch(
  runtimeData.user,
  (val) => {
    if (val && typeof val === "object") {
      Object.keys(val).forEach((key) => {
        localStorageData.user.value[key] = val[key];
      });
    }
  },
  { deep: true }
);

(() => {
  runtimeData.auth.value = localStorageData.auth.value;
  runtimeData.user.value = localStorageData.user.value;
  runtimeData.token.value = localStorageData.token.value;
})();

export const REDIRECT_URL = import.meta.env.VITE_REDIRECT_URL as string;

export const useUser = () => {
  const id = computed({
    get: () => runtimeData?.auth?.value?.id ?? "",
    set: () => {},
  });


  const isLoggedIn = computed({
    get: () => {
      if (!runtimeData.token?.value) return false;
      return (
        runtimeData?.user?.value != null &&
        typeof runtimeData.user.value === "object"
      );
    },
    set: () => {},
  });

  const isEmailVerified = computed(() => {
    return runtimeData?.user?.value.isEmailVerified;
  });

  const logOut = () => {
    localStorage.clear();
    runtimeData.user.value = null;
    // location.href = '/login'
  };

  const setToken = (token: string) => {
    runtimeData.token.value = token;
    localStorageData.token.value = token;
  };
  const createUser = (user: any) => {
    runtimeData.user.value = user?.user;
    localStorageData.token.value = user?.accessToken;
    runtimeData.token.value = user?.token?.token;
  };

  // const updateUser = (user: any) => {
  //   runtimeData.user.value = user;
  //   localStorageData.user.value = user;
  // };

  const updateUser = (user: any) => {
    if (user) {
      if (user.firstName) {
        runtimeData.user.value.firstName = user.firstName;
        localStorageData.user.value.firstName = user.firstName;
      }
      if (user.lastName) {
        runtimeData.user.value.lastName = user.lastName;
        localStorageData.user.value.lastName = user.lastName;
      }
      if (user.email) {
        runtimeData.user.value.email = user.email;
        localStorageData.user.value.email = user.email;
      }
    }
  };

  return {
    id,
    isLoggedIn,
    isEmailVerified,
    createUser,
    ...runtimeData,
    logOut,
    updateUser,
    setToken
  };
};
