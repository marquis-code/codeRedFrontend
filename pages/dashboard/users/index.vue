<template>
  <main>
    <div v-if="!loading && usersList.length" class="px-4 sm:px-6 lg:px-8">
      <div class="sm:flex sm:items-center">
        <div class="sm:flex-auto">
          <h1 class="text-base font-semibold leading-6 text-gray-900">Users</h1>
          <p class="mt-2 text-sm text-gray-700">A list of all the users in your account including their name, title,
            email
            and role.</p>
        </div>
        <div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button type="button"
            class="block rounded-md bg-indigo-600 px-3 py-1.5 text-center text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Add
            user</button>
        </div>
      </div>
      <div class="mt-8 flow-root">
        <div v-if="tableView === 'list'" class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <UsersTable v-if="usersList.length && !loading" :usersList="usersList" :loadingUsers="loading"
            @selectedUser="handleSelectedUser" />
          <CoreEmptyState v-if="usersList.length <= 0 && !loading" title="No User available"
            desc="Get started by creating a new user." />
          <LoadingSpinner v-if="loading" />
        </div>
      </div>
    </div>
    <div class="w-full" v-if="loading && !usersList.length">
      <div class="h-[500px] w-full bg-slate-300 rounded-2xl animate-pulse"></div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { useFetchUsers } from '@/composables/user/fetch'
const { fetchUsers, usersList, loading } = useFetchUsers()
import Datepicker from 'vue3-datepicker'
const tableView = ref("list")
const selectedUser = ref({}) as any

const selectedPeople = ref([])
const indeterminate = computed(() => selectedPeople.value.length > 0 && selectedPeople.value.length < usersList.length)
definePageMeta({
  layout: 'dashboard'
})

const handleSelectedUser = (data: any) => {
  selectedUser.value = data
}
fetchUsers()
</script>
