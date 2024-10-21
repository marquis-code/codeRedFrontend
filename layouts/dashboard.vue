<template>
  <div>
    <!-- Off-canvas menu for mobile, show/hide based on off-canvas menu state. -->
    <div class="relative z-50 lg:hidden" role="dialog" aria-modal="true" v-if="isOpen">
      <!--
      Off-canvas menu backdrop, show/hide based on off-canvas menu state.

      Entering: "transition-opacity ease-linear duration-300"
        From: "opacity-0"
        To: "opacity-100"
      Leaving: "transition-opacity ease-linear duration-300"
        From: "opacity-100"
        To: "opacity-0"
    -->
      <div class="fixed inset-0 bg-gray-900/80"></div>

      <div class="fixed inset-0 flex">
        <!--
        Off-canvas menu, show/hide based on off-canvas menu state.

        Entering: "transition ease-in-out duration-300 transform"
          From: "-translate-x-full"
          To: "translate-x-0"
        Leaving: "transition ease-in-out duration-300 transform"
          From: "translate-x-0"
          To: "-translate-x-full"
      -->
        <div class="relative mr-16 flex w-full max-w-xs flex-1">
          <!--
          Close button, show/hide based on off-canvas menu state.

          Entering: "ease-in-out duration-300"
            From: "opacity-0"
            To: "opacity-100"
          Leaving: "ease-in-out duration-300"
            From: "opacity-100"
            To: "opacity-0"
        -->
          <div class="absolute left-full top-0 flex w-16 justify-center pt-5">
            <button @click="isOpen = false" type="button" class="-m-2.5 p-2.5">
              <span class="sr-only">Close sidebar</span>
              <svg class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- Sidebar component, swap this element with another sidebar if you like -->
          <div class="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4">
            <div class="flex h-16 shrink-0 items-center">
              <img class="h-12 w-auto" src="@/assets/icons/homepod-black.svg" alt="Your Company">
            </div>
            <nav class="flex flex-1 flex-col">
              <ul role="list" class="flex flex-1 flex-col gap-y-7">
                <li>
                  <ul role="list" class="-mx-2 space-y-1">
                    <li>
                      <!-- Current: "bg-gray-50 text-indigo-600", Default: "text-gray-700 hover:text-indigo-600 hover:bg-gray-50" -->
                      <NuxtLink to="/dashboard" @click.prevent="isOpen = false"
                        class="bg-gray-50 text-indigo-600 group flex gap-x-3 rounded-md p-2 py-3 text-sm leading-6 font-semibold">
                        <svg class="h-6 w-6 shrink-0" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                          stroke="currentColor" aria-hidden="true">
                          <path stroke-linecap="round" stroke-linejoin="round"
                            d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                        </svg>
                        Dashboard
                      </NuxtLink>
                    </li>
                    <li>
                      <NuxtLink to="/dashboard/users" @click.prevent="isOpen = false"
                        class="text-gray-700 hover:text-indigo-600 hover:bg-gray-50 group flex gap-x-3 rounded-md p-2 py-3 text-sm leading-6 font-semibold">
                        <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M10.5391 10C11.5336 10 12.4875 9.60491 13.1907 8.90165C13.894 8.19839 14.2891 7.24456 14.2891 6.25C14.2891 5.25544 13.894 4.30161 13.1907 3.59835C12.4875 2.89509 11.5336 2.5 10.5391 2.5C9.5445 2.5 8.59067 2.89509 7.88741 3.59835C7.18415 4.30161 6.78906 5.25544 6.78906 6.25C6.78906 7.24456 7.18415 8.19839 7.88741 8.90165C8.59067 9.60491 9.5445 10 10.5391 10ZM13.0391 6.25C13.0391 6.91304 12.7757 7.54893 12.3068 8.01777C11.838 8.48661 11.2021 8.75 10.5391 8.75C9.87602 8.75 9.24014 8.48661 8.7713 8.01777C8.30245 7.54893 8.03906 6.91304 8.03906 6.25C8.03906 5.58696 8.30245 4.95107 8.7713 4.48223C9.24014 4.01339 9.87602 3.75 10.5391 3.75C11.2021 3.75 11.838 4.01339 12.3068 4.48223C12.7757 4.95107 13.0391 5.58696 13.0391 6.25ZM18.0391 16.25C18.0391 17.5 16.7891 17.5 16.7891 17.5H4.28906C4.28906 17.5 3.03906 17.5 3.03906 16.25C3.03906 15 4.28906 11.25 10.5391 11.25C16.7891 11.25 18.0391 15 18.0391 16.25ZM16.7891 16.245C16.7878 15.9375 16.5966 15.0125 15.7491 14.165C14.9341 13.35 13.4003 12.5 10.5391 12.5C7.67656 12.5 6.14406 13.35 5.32906 14.165C4.48156 15.0125 4.29156 15.9375 4.28906 16.245H16.7891Z"
                            fill="#09090F" />
                        </svg>
                        Users
                      </NuxtLink>
                    </li>
                    <li>
                      <NuxtLink to="/dashboard/pods" @click.prevent="isOpen = false"
                        class="text-gray-700 hover:text-indigo-600 hover:bg-gray-50 group flex gap-x-3 rounded-md p-2 py-3 text-sm leading-6 font-semibold">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M18 15L19 15" stroke="#667085" stroke-width="1.5" stroke-linecap="round"
                            stroke-linejoin="round" />
                          <path d="M9 15H15" stroke="#667085" stroke-width="1.5" stroke-linecap="round"
                            stroke-linejoin="round" />
                          <path d="M6 15H5" stroke="#667085" stroke-width="1.5" stroke-linecap="round"
                            stroke-linejoin="round" />
                          <path d="M5 12H19" stroke="#667085" stroke-width="1.5" stroke-linecap="round"
                            stroke-linejoin="round" />
                          <path d="M5 9H19" stroke="#667085" stroke-width="1.5" stroke-linecap="round"
                            stroke-linejoin="round" />
                          <path
                            d="M21 6H3C2.44772 6 2 6.44772 2 7V17C2 17.5523 2.44772 18 3 18H21C21.5523 18 22 17.5523 22 17V7C22 6.44772 21.5523 6 21 6Z"
                            stroke="#667085" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        Pods
                      </NuxtLink>
                    </li>
                    <li>
                      <NuxtLink to="/dashboard/notify" @click.prevent="isOpen = false"
                        class="text-gray-700 hover:text-indigo-600 hover:bg-gray-50 group flex gap-x-3 rounded-md p-2 py-3 text-sm leading-6 font-semibold">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                          stroke="#4a4a4a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                          <path d="M22 17H2a3 3 0 0 0 3-3V9a7 7 0 0 1 14 0v5a3 3 0 0 0 3 3zm-8.27 4a2 2 0 0 1-3.46 0">
                          </path>
                        </svg>
                        Notify
                      </NuxtLink>
                    </li>
                    <li>
                      <a href="#" @click.prevent="isOpen = false"
                        class="text-gray-700 hover:text-indigo-600 hover:bg-gray-50 group flex gap-x-3 rounded-md p-2 py-3 text-sm leading-6 font-semibold">
                        <!-- <svg class="h-6 w-6 shrink-0 text-gray-400 group-hover:text-indigo-600" fill="none"
                        viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round"
                          d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75" />
                      </svg> -->
                        <img src="https://homepod-admin.netlify.app/_nuxt/img/ad.add5ead.svg" />
                        Ad Service
                      </a>
                    </li>
                    <li>
                      <NuxtLink to="/dashboard/admin" @click.prevent="isOpen = false"
                        class="text-gray-700 hover:text-indigo-600 hover:bg-gray-50 group flex gap-x-3 rounded-md p-2 py-3 text-sm leading-6 font-semibold">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <g clip-path="url(#clip0_7_35209)">
                            <path
                              d="M8.34525 12.0861C9.52823 11.4541 10.4661 10.4449 11.0098 9.21889C11.5535 7.99282 11.6719 6.62023 11.3461 5.31918C11.0204 4.01813 10.2692 2.86325 9.21187 2.03804C8.15457 1.21283 6.85183 0.764618 5.51062 0.764618C4.16941 0.764618 2.86666 1.21283 1.80937 2.03804C0.75207 2.86325 0.000870943 4.01813 -0.324881 5.31918C-0.650632 6.62023 -0.53225 7.99282 0.0114563 9.21889C0.555163 10.4449 1.49301 11.4541 2.67598 12.0861C0.564663 12.6605 -1.32102 13.8657 -2.72897 15.5406C-2.82324 15.6518 -2.86948 15.7959 -2.85752 15.9412C-2.84555 16.0864 -2.77636 16.221 -2.66516 16.3153C-2.55397 16.4096 -2.40987 16.4558 -2.26458 16.4439C-2.11929 16.4319 -1.9847 16.3627 -1.89042 16.2515C-0.984473 15.1694 0.147753 14.2991 1.42648 13.7019C2.70521 13.1048 4.09933 12.7953 5.51062 12.7953C6.9219 12.7953 8.31602 13.1048 9.59475 13.7019C10.8735 14.2991 12.0057 15.1694 12.9117 16.2515C12.9634 16.312 13.0277 16.3605 13.1001 16.3935C13.1726 16.4266 13.2513 16.4434 13.3309 16.4429C13.4603 16.441 13.5853 16.3961 13.6864 16.3153C13.7961 16.2201 13.8643 16.0857 13.8762 15.9409C13.8881 15.7962 13.8429 15.6524 13.7502 15.5406C12.3422 13.8657 10.4566 12.6605 8.34525 12.0861ZM0.588742 6.78146C0.588742 5.808 0.877405 4.85641 1.41823 4.04701C1.95905 3.23761 2.72774 2.60676 3.6271 2.23424C4.52645 1.86171 5.51608 1.76424 6.47083 1.95415C7.42558 2.14407 8.30257 2.61283 8.99091 3.30117C9.67924 3.9895 10.148 4.8665 10.3379 5.82125C10.5278 6.776 10.4304 7.76562 10.0578 8.66498C9.68531 9.56433 9.05446 10.333 8.24506 10.8738C7.43567 11.4147 6.48407 11.7033 5.51062 11.7033C4.20525 11.7033 2.95336 11.1848 2.03032 10.2617C1.10729 9.33872 0.588742 8.08682 0.588742 6.78146ZM18.1981 10.8648L17.6604 10.5549C17.7453 10.2323 17.7453 9.89314 17.6604 9.57052L18.1981 9.26062C18.2604 9.22471 18.3149 9.1769 18.3587 9.1199C18.4024 9.06291 18.4345 8.99786 18.4532 8.92845C18.4718 8.85905 18.4766 8.78666 18.4672 8.71542C18.4578 8.64417 18.4345 8.57547 18.3986 8.51323C18.3627 8.45099 18.3149 8.39643 18.2579 8.35266C18.2009 8.3089 18.1359 8.2768 18.0665 8.25818C17.9971 8.23956 17.9247 8.23479 17.8534 8.24414C17.7822 8.2535 17.7135 8.2768 17.6512 8.31271L17.1135 8.6226C16.8765 8.39033 16.585 8.22112 16.2658 8.13041V7.51062C16.2658 7.36558 16.2082 7.22648 16.1056 7.12392C16.0031 7.02137 15.864 6.96375 15.7189 6.96375C15.5739 6.96375 15.4348 7.02137 15.3323 7.12392C15.2297 7.22648 15.1721 7.36558 15.1721 7.51062V8.13041C14.8529 8.22112 14.5614 8.39033 14.3244 8.6226L13.7867 8.31271C13.7244 8.2768 13.6557 8.2535 13.5845 8.24414C13.5132 8.23479 13.4408 8.23956 13.3714 8.25818C13.302 8.2768 13.237 8.3089 13.18 8.35266C13.123 8.39643 13.0752 8.45099 13.0393 8.51323C13.0034 8.57547 12.9801 8.64417 12.9707 8.71542C12.9613 8.78666 12.9661 8.85905 12.9847 8.92845C13.0034 8.99786 13.0355 9.06291 13.0792 9.1199C13.123 9.1769 13.1775 9.22471 13.2398 9.26062L13.7775 9.57052C13.6926 9.89314 13.6926 10.2323 13.7775 10.5549L13.2398 10.8648C13.1354 10.9249 13.0537 11.0178 13.0075 11.1291C12.9613 11.2404 12.9532 11.3638 12.9844 11.4802C13.0155 11.5966 13.0843 11.6995 13.1799 11.7728C13.2756 11.8461 13.3927 11.8858 13.5132 11.8856C13.6088 11.8831 13.7025 11.8581 13.7867 11.8127L14.3244 11.5028C14.5614 11.7351 14.8529 11.9043 15.1721 11.995V12.6148C15.1721 12.7598 15.2297 12.8989 15.3323 13.0015C15.4348 13.104 15.5739 13.1617 15.7189 13.1617C15.864 13.1617 16.0031 13.104 16.1056 13.0015C16.2082 12.8989 16.2658 12.7598 16.2658 12.6148V11.995C16.585 11.9043 16.8765 11.7351 17.1135 11.5028L17.6512 11.8127C17.7354 11.8581 17.8291 11.8831 17.9247 11.8856C18.0452 11.8858 18.1623 11.8461 18.258 11.7728C18.3536 11.6995 18.4224 11.5966 18.4535 11.4802C18.4847 11.3638 18.4766 11.2404 18.4304 11.1291C18.3842 11.0178 18.3025 10.9249 18.1981 10.8648ZM15.7189 10.9742C15.5387 10.9742 15.3625 10.9207 15.2126 10.8206C15.0627 10.7204 14.9459 10.5781 14.8769 10.4115C14.8079 10.245 14.7898 10.0617 14.825 9.88489C14.8602 9.70808 14.947 9.54568 15.0745 9.41821C15.2019 9.29074 15.3643 9.20393 15.5411 9.16876C15.7179 9.13359 15.9012 9.15164 16.0677 9.22063C16.2343 9.28961 16.3766 9.40644 16.4768 9.55633C16.577 9.70621 16.6304 9.88244 16.6304 10.0627C16.6304 10.3044 16.5344 10.5363 16.3634 10.7072C16.1925 10.8781 15.9607 10.9742 15.7189 10.9742Z"
                              fill="#667085" />
                          </g>
                          <path
                            d="M8.5 10.5C9.49456 10.5 10.4484 10.1049 11.1517 9.40165C11.8549 8.69839 12.25 7.74456 12.25 6.75C12.25 5.75544 11.8549 4.80161 11.1517 4.09835C10.4484 3.39509 9.49456 3 8.5 3C7.50544 3 6.55161 3.39509 5.84835 4.09835C5.14509 4.80161 4.75 5.75544 4.75 6.75C4.75 7.74456 5.14509 8.69839 5.84835 9.40165C6.55161 10.1049 7.50544 10.5 8.5 10.5ZM11 6.75C11 7.41304 10.7366 8.04893 10.2678 8.51777C9.79893 8.98661 9.16304 9.25 8.5 9.25C7.83696 9.25 7.20107 8.98661 6.73223 8.51777C6.26339 8.04893 6 7.41304 6 6.75C6 6.08696 6.26339 5.45107 6.73223 4.98223C7.20107 4.51339 7.83696 4.25 8.5 4.25C9.16304 4.25 9.79893 4.51339 10.2678 4.98223C10.7366 5.45107 11 6.08696 11 6.75ZM16 16.75C16 18 14.75 18 14.75 18H2.25C2.25 18 1 18 1 16.75C1 15.5 2.25 11.75 8.5 11.75C14.75 11.75 16 15.5 16 16.75ZM14.75 16.745C14.7487 16.4375 14.5575 15.5125 13.71 14.665C12.895 13.85 11.3612 13 8.5 13C5.6375 13 4.105 13.85 3.29 14.665C2.4425 15.5125 2.2525 16.4375 2.25 16.745H14.75Z"
                            fill="#667085" />
                          <defs>
                            <clipPath id="clip0_7_35209">
                              <rect width="7" height="8.16667" fill="white" transform="translate(12 5.83334)" />
                            </clipPath>
                          </defs>
                        </svg>
                        Admin
                      </NuxtLink>
                    </li>

                    <li>
                      <NuxtLink to="/dashboard/configuration" @click.prevent="isOpen = false"
                        class="text-gray-700 hover:text-indigo-600 hover:bg-gray-50 group flex gap-x-3 rounded-md p-2 py-3 text-sm leading-6 font-semibold">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M11.667 15L17.5003 15" stroke="#667085" stroke-width="1.5" stroke-linecap="round"
                            stroke-linejoin="round" />
                          <path d="M2.5 15H4.16667" stroke="#667085" stroke-width="1.5" stroke-linecap="round"
                            stroke-linejoin="round" />
                          <path
                            d="M6.25033 17.0833C7.40092 17.0833 8.33366 16.1506 8.33366 15C8.33366 13.8494 7.40092 12.9167 6.25033 12.9167C5.09973 12.9167 4.16699 13.8494 4.16699 15C4.16699 16.1506 5.09973 17.0833 6.25033 17.0833Z"
                            stroke="#667085" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                          <path d="M16.667 10H17.5003" stroke="#667085" stroke-width="1.5" stroke-linecap="round"
                            stroke-linejoin="round" />
                          <path d="M2.5 10H8.33333" stroke="#667085" stroke-width="1.5" stroke-linecap="round"
                            stroke-linejoin="round" />
                          <path
                            d="M13.7503 12.0833C14.9009 12.0833 15.8337 11.1506 15.8337 9.99999C15.8337 8.8494 14.9009 7.91666 13.7503 7.91666C12.5997 7.91666 11.667 8.8494 11.667 9.99999C11.667 11.1506 12.5997 12.0833 13.7503 12.0833Z"
                            stroke="#667085" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                          <path d="M10.833 5H17.4997" stroke="#667085" stroke-width="1.5" stroke-linecap="round"
                            stroke-linejoin="round" />
                          <path d="M2.5 5H3.33333" stroke="#667085" stroke-width="1.5" stroke-linecap="round"
                            stroke-linejoin="round" />
                          <path
                            d="M8.75033 7.08332C9.90092 7.08332 10.8337 6.15058 10.8337 4.99999C10.8337 3.8494 9.90092 2.91666 8.75033 2.91666C7.59973 2.91666 6.66699 3.8494 6.66699 4.99999C6.66699 6.15058 7.59973 7.08332 8.75033 7.08332Z"
                            stroke="#667085" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        Configuration
                      </NuxtLink>
                    </li>
                  </ul>
                </li>
                <li class="mt-auto">
                  <a href="#" @click.prevent="logOut"
                    class="group -mx-2 flex gap-x-3 rounded-md p-2 py-3 text-sm font-semibold leading-6 text-gray-700 bg-[#0cb0bd]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 24 24" fill="none"
                      stroke="#d0021b" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5M13.8 12H3" />
                    </svg>
                    {{ username }}
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>

    <!-- Static sidebar for desktop -->
    <div class="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
      <!-- Sidebar component, swap this element with another sidebar if you like -->
      <div class="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6 pb-4">
        <div class="flex h-16 shrink-0 items-center">
          <img class="h-8 w-auto" src="@/assets/icons/homepod-black.svg" alt="Your Company">
        </div>
        <nav class="flex flex-1 flex-col">
          <ul role="list" class="flex flex-1 flex-col gap-y-7">
            <li>
              <ul role="list" class="-mx-2 space-y-4">
                <li>
                  <!-- Current: "bg-gray-50 text-indigo-600", Default: "text-gray-700 hover:text-indigo-600 hover:bg-gray-50" -->
                  <NuxtLink to="/dashboard"
                    class="flex w-full text-gray-700 items-center gap-x-3 no-underline rounded-md px-3 py-2.5 leading-loose">
                    <svg class="h-6 w-6 shrink-0" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                      stroke="currentColor" aria-hidden="true">
                      <path stroke-linecap="round" stroke-linejoin="round"
                        d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                    </svg>
                    Dashboard
                  </NuxtLink>
                </li>
                <li>
                  <NuxtLink to="/dashboard/users"
                    class="flex w-full text-gray-700 items-center gap-x-3 no-underline rounded-md px-3 py-2.5 leading-loose">
                    <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M10.5391 10C11.5336 10 12.4875 9.60491 13.1907 8.90165C13.894 8.19839 14.2891 7.24456 14.2891 6.25C14.2891 5.25544 13.894 4.30161 13.1907 3.59835C12.4875 2.89509 11.5336 2.5 10.5391 2.5C9.5445 2.5 8.59067 2.89509 7.88741 3.59835C7.18415 4.30161 6.78906 5.25544 6.78906 6.25C6.78906 7.24456 7.18415 8.19839 7.88741 8.90165C8.59067 9.60491 9.5445 10 10.5391 10ZM13.0391 6.25C13.0391 6.91304 12.7757 7.54893 12.3068 8.01777C11.838 8.48661 11.2021 8.75 10.5391 8.75C9.87602 8.75 9.24014 8.48661 8.7713 8.01777C8.30245 7.54893 8.03906 6.91304 8.03906 6.25C8.03906 5.58696 8.30245 4.95107 8.7713 4.48223C9.24014 4.01339 9.87602 3.75 10.5391 3.75C11.2021 3.75 11.838 4.01339 12.3068 4.48223C12.7757 4.95107 13.0391 5.58696 13.0391 6.25ZM18.0391 16.25C18.0391 17.5 16.7891 17.5 16.7891 17.5H4.28906C4.28906 17.5 3.03906 17.5 3.03906 16.25C3.03906 15 4.28906 11.25 10.5391 11.25C16.7891 11.25 18.0391 15 18.0391 16.25ZM16.7891 16.245C16.7878 15.9375 16.5966 15.0125 15.7491 14.165C14.9341 13.35 13.4003 12.5 10.5391 12.5C7.67656 12.5 6.14406 13.35 5.32906 14.165C4.48156 15.0125 4.29156 15.9375 4.28906 16.245H16.7891Z"
                        fill="#09090F" />
                    </svg>

                    Users
                  </NuxtLink>
                </li>
                <li>
                  <NuxtLink to="/dashboard/pods"
                    class="flex w-full text-gray-700 items-center gap-x-3 no-underline rounded-md px-3 py-2.5 leading-loose">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M18 15L19 15" stroke="#667085" stroke-width="1.5" stroke-linecap="round"
                        stroke-linejoin="round" />
                      <path d="M9 15H15" stroke="#667085" stroke-width="1.5" stroke-linecap="round"
                        stroke-linejoin="round" />
                      <path d="M6 15H5" stroke="#667085" stroke-width="1.5" stroke-linecap="round"
                        stroke-linejoin="round" />
                      <path d="M5 12H19" stroke="#667085" stroke-width="1.5" stroke-linecap="round"
                        stroke-linejoin="round" />
                      <path d="M5 9H19" stroke="#667085" stroke-width="1.5" stroke-linecap="round"
                        stroke-linejoin="round" />
                      <path
                        d="M21 6H3C2.44772 6 2 6.44772 2 7V17C2 17.5523 2.44772 18 3 18H21C21.5523 18 22 17.5523 22 17V7C22 6.44772 21.5523 6 21 6Z"
                        stroke="#667085" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>

                    Pods
                  </NuxtLink>
                </li>
                <li>
                  <NuxtLink to="/dashboard/notify"
                    class="flex w-full text-gray-700 items-center gap-x-3 no-underline rounded-md px-3 py-2.5 leading-loose">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                      stroke="#4a4a4a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M22 17H2a3 3 0 0 0 3-3V9a7 7 0 0 1 14 0v5a3 3 0 0 0 3 3zm-8.27 4a2 2 0 0 1-3.46 0">
                      </path>
                    </svg>

                    Notify
                  </NuxtLink>
                </li>
                <li>
                  <NuxtLink to="/dashboard/admin"
                    class="flex w-full text-gray-700 items-center gap-x-3 no-underline rounded-md px-3 py-2.5 leading-loose">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g clip-path="url(#clip0_7_35209)">
                        <path
                          d="M8.34525 12.0861C9.52823 11.4541 10.4661 10.4449 11.0098 9.21889C11.5535 7.99282 11.6719 6.62023 11.3461 5.31918C11.0204 4.01813 10.2692 2.86325 9.21187 2.03804C8.15457 1.21283 6.85183 0.764618 5.51062 0.764618C4.16941 0.764618 2.86666 1.21283 1.80937 2.03804C0.75207 2.86325 0.000870943 4.01813 -0.324881 5.31918C-0.650632 6.62023 -0.53225 7.99282 0.0114563 9.21889C0.555163 10.4449 1.49301 11.4541 2.67598 12.0861C0.564663 12.6605 -1.32102 13.8657 -2.72897 15.5406C-2.82324 15.6518 -2.86948 15.7959 -2.85752 15.9412C-2.84555 16.0864 -2.77636 16.221 -2.66516 16.3153C-2.55397 16.4096 -2.40987 16.4558 -2.26458 16.4439C-2.11929 16.4319 -1.9847 16.3627 -1.89042 16.2515C-0.984473 15.1694 0.147753 14.2991 1.42648 13.7019C2.70521 13.1048 4.09933 12.7953 5.51062 12.7953C6.9219 12.7953 8.31602 13.1048 9.59475 13.7019C10.8735 14.2991 12.0057 15.1694 12.9117 16.2515C12.9634 16.312 13.0277 16.3605 13.1001 16.3935C13.1726 16.4266 13.2513 16.4434 13.3309 16.4429C13.4603 16.441 13.5853 16.3961 13.6864 16.3153C13.7961 16.2201 13.8643 16.0857 13.8762 15.9409C13.8881 15.7962 13.8429 15.6524 13.7502 15.5406C12.3422 13.8657 10.4566 12.6605 8.34525 12.0861ZM0.588742 6.78146C0.588742 5.808 0.877405 4.85641 1.41823 4.04701C1.95905 3.23761 2.72774 2.60676 3.6271 2.23424C4.52645 1.86171 5.51608 1.76424 6.47083 1.95415C7.42558 2.14407 8.30257 2.61283 8.99091 3.30117C9.67924 3.9895 10.148 4.8665 10.3379 5.82125C10.5278 6.776 10.4304 7.76562 10.0578 8.66498C9.68531 9.56433 9.05446 10.333 8.24506 10.8738C7.43567 11.4147 6.48407 11.7033 5.51062 11.7033C4.20525 11.7033 2.95336 11.1848 2.03032 10.2617C1.10729 9.33872 0.588742 8.08682 0.588742 6.78146ZM18.1981 10.8648L17.6604 10.5549C17.7453 10.2323 17.7453 9.89314 17.6604 9.57052L18.1981 9.26062C18.2604 9.22471 18.3149 9.1769 18.3587 9.1199C18.4024 9.06291 18.4345 8.99786 18.4532 8.92845C18.4718 8.85905 18.4766 8.78666 18.4672 8.71542C18.4578 8.64417 18.4345 8.57547 18.3986 8.51323C18.3627 8.45099 18.3149 8.39643 18.2579 8.35266C18.2009 8.3089 18.1359 8.2768 18.0665 8.25818C17.9971 8.23956 17.9247 8.23479 17.8534 8.24414C17.7822 8.2535 17.7135 8.2768 17.6512 8.31271L17.1135 8.6226C16.8765 8.39033 16.585 8.22112 16.2658 8.13041V7.51062C16.2658 7.36558 16.2082 7.22648 16.1056 7.12392C16.0031 7.02137 15.864 6.96375 15.7189 6.96375C15.5739 6.96375 15.4348 7.02137 15.3323 7.12392C15.2297 7.22648 15.1721 7.36558 15.1721 7.51062V8.13041C14.8529 8.22112 14.5614 8.39033 14.3244 8.6226L13.7867 8.31271C13.7244 8.2768 13.6557 8.2535 13.5845 8.24414C13.5132 8.23479 13.4408 8.23956 13.3714 8.25818C13.302 8.2768 13.237 8.3089 13.18 8.35266C13.123 8.39643 13.0752 8.45099 13.0393 8.51323C13.0034 8.57547 12.9801 8.64417 12.9707 8.71542C12.9613 8.78666 12.9661 8.85905 12.9847 8.92845C13.0034 8.99786 13.0355 9.06291 13.0792 9.1199C13.123 9.1769 13.1775 9.22471 13.2398 9.26062L13.7775 9.57052C13.6926 9.89314 13.6926 10.2323 13.7775 10.5549L13.2398 10.8648C13.1354 10.9249 13.0537 11.0178 13.0075 11.1291C12.9613 11.2404 12.9532 11.3638 12.9844 11.4802C13.0155 11.5966 13.0843 11.6995 13.1799 11.7728C13.2756 11.8461 13.3927 11.8858 13.5132 11.8856C13.6088 11.8831 13.7025 11.8581 13.7867 11.8127L14.3244 11.5028C14.5614 11.7351 14.8529 11.9043 15.1721 11.995V12.6148C15.1721 12.7598 15.2297 12.8989 15.3323 13.0015C15.4348 13.104 15.5739 13.1617 15.7189 13.1617C15.864 13.1617 16.0031 13.104 16.1056 13.0015C16.2082 12.8989 16.2658 12.7598 16.2658 12.6148V11.995C16.585 11.9043 16.8765 11.7351 17.1135 11.5028L17.6512 11.8127C17.7354 11.8581 17.8291 11.8831 17.9247 11.8856C18.0452 11.8858 18.1623 11.8461 18.258 11.7728C18.3536 11.6995 18.4224 11.5966 18.4535 11.4802C18.4847 11.3638 18.4766 11.2404 18.4304 11.1291C18.3842 11.0178 18.3025 10.9249 18.1981 10.8648ZM15.7189 10.9742C15.5387 10.9742 15.3625 10.9207 15.2126 10.8206C15.0627 10.7204 14.9459 10.5781 14.8769 10.4115C14.8079 10.245 14.7898 10.0617 14.825 9.88489C14.8602 9.70808 14.947 9.54568 15.0745 9.41821C15.2019 9.29074 15.3643 9.20393 15.5411 9.16876C15.7179 9.13359 15.9012 9.15164 16.0677 9.22063C16.2343 9.28961 16.3766 9.40644 16.4768 9.55633C16.577 9.70621 16.6304 9.88244 16.6304 10.0627C16.6304 10.3044 16.5344 10.5363 16.3634 10.7072C16.1925 10.8781 15.9607 10.9742 15.7189 10.9742Z"
                          fill="#667085" />
                      </g>
                      <path
                        d="M8.5 10.5C9.49456 10.5 10.4484 10.1049 11.1517 9.40165C11.8549 8.69839 12.25 7.74456 12.25 6.75C12.25 5.75544 11.8549 4.80161 11.1517 4.09835C10.4484 3.39509 9.49456 3 8.5 3C7.50544 3 6.55161 3.39509 5.84835 4.09835C5.14509 4.80161 4.75 5.75544 4.75 6.75C4.75 7.74456 5.14509 8.69839 5.84835 9.40165C6.55161 10.1049 7.50544 10.5 8.5 10.5ZM11 6.75C11 7.41304 10.7366 8.04893 10.2678 8.51777C9.79893 8.98661 9.16304 9.25 8.5 9.25C7.83696 9.25 7.20107 8.98661 6.73223 8.51777C6.26339 8.04893 6 7.41304 6 6.75C6 6.08696 6.26339 5.45107 6.73223 4.98223C7.20107 4.51339 7.83696 4.25 8.5 4.25C9.16304 4.25 9.79893 4.51339 10.2678 4.98223C10.7366 5.45107 11 6.08696 11 6.75ZM16 16.75C16 18 14.75 18 14.75 18H2.25C2.25 18 1 18 1 16.75C1 15.5 2.25 11.75 8.5 11.75C14.75 11.75 16 15.5 16 16.75ZM14.75 16.745C14.7487 16.4375 14.5575 15.5125 13.71 14.665C12.895 13.85 11.3612 13 8.5 13C5.6375 13 4.105 13.85 3.29 14.665C2.4425 15.5125 2.2525 16.4375 2.25 16.745H14.75Z"
                        fill="#667085" />
                      <defs>
                        <clipPath id="clip0_7_35209">
                          <rect width="7" height="8.16667" fill="white" transform="translate(12 5.83334)" />
                        </clipPath>
                      </defs>
                    </svg>
                    Admin
                  </NuxtLink>
                </li>
                <li>
                  <NuxtLink to="/dashboard/configuration"
                    class="text-gray-700 hover:text-indigo-600 hover:bg-gray-50 group flex gap-x-3 rounded-md p-2 py-3 text-sm leading-6 font-semibold">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M11.667 15L17.5003 15" stroke="#667085" stroke-width="1.5" stroke-linecap="round"
                        stroke-linejoin="round" />
                      <path d="M2.5 15H4.16667" stroke="#667085" stroke-width="1.5" stroke-linecap="round"
                        stroke-linejoin="round" />
                      <path
                        d="M6.25033 17.0833C7.40092 17.0833 8.33366 16.1506 8.33366 15C8.33366 13.8494 7.40092 12.9167 6.25033 12.9167C5.09973 12.9167 4.16699 13.8494 4.16699 15C4.16699 16.1506 5.09973 17.0833 6.25033 17.0833Z"
                        stroke="#667085" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                      <path d="M16.667 10H17.5003" stroke="#667085" stroke-width="1.5" stroke-linecap="round"
                        stroke-linejoin="round" />
                      <path d="M2.5 10H8.33333" stroke="#667085" stroke-width="1.5" stroke-linecap="round"
                        stroke-linejoin="round" />
                      <path
                        d="M13.7503 12.0833C14.9009 12.0833 15.8337 11.1506 15.8337 9.99999C15.8337 8.8494 14.9009 7.91666 13.7503 7.91666C12.5997 7.91666 11.667 8.8494 11.667 9.99999C11.667 11.1506 12.5997 12.0833 13.7503 12.0833Z"
                        stroke="#667085" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                      <path d="M10.833 5H17.4997" stroke="#667085" stroke-width="1.5" stroke-linecap="round"
                        stroke-linejoin="round" />
                      <path d="M2.5 5H3.33333" stroke="#667085" stroke-width="1.5" stroke-linecap="round"
                        stroke-linejoin="round" />
                      <path
                        d="M8.75033 7.08332C9.90092 7.08332 10.8337 6.15058 10.8337 4.99999C10.8337 3.8494 9.90092 2.91666 8.75033 2.91666C7.59973 2.91666 6.66699 3.8494 6.66699 4.99999C6.66699 6.15058 7.59973 7.08332 8.75033 7.08332Z"
                        stroke="#667085" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>

                    Configuration
                  </NuxtLink>
                </li>
              </ul>
            </li>
            <!-- <li>
              <div class="text-xs font-semibold leading-6 text-gray-400">Your teams</div>
              <ul role="list" class="-mx-2 mt-2 space-y-1">
                <li>
                  <a href="#"
                    class="text-gray-700 hover:text-indigo-600 hover:bg-gray-50 group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold">
                    <span
                      class="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium bg-white text-gray-400 border-gray-200 group-hover:border-indigo-600 group-hover:text-indigo-600">H</span>
                    <span class="truncate">Heroicons</span>
                  </a>
                </li>
                <li>
                  <a href="#"
                    class="text-gray-700 hover:text-indigo-600 hover:bg-gray-50 group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold">
                    <span
                      class="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium bg-white text-gray-400 border-gray-200 group-hover:border-indigo-600 group-hover:text-indigo-600">T</span>
                    <span class="truncate">Tailwind Labs</span>
                  </a>
                </li>
                <li>
                  <a href="#"
                    class="text-gray-700 hover:text-indigo-600 hover:bg-gray-50 group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold">
                    <span
                      class="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium bg-white text-gray-400 border-gray-200 group-hover:border-indigo-600 group-hover:text-indigo-600">W</span>
                    <span class="truncate">Workcation</span>
                  </a>
                </li>
              </ul>
            </li> -->
            <li class="mt-auto">
              <a href="#" @click.prevent="logOut"
                class="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-700 hover:bg-gray-50 hover:text-indigo-600">
                <svg class="h-6 w-6 shrink-0 text-gray-400 group-hover:text-indigo-600" fill="none" viewBox="0 0 24 24"
                  stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Logout
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>

    <div class="lg:pl-72">
      <div
        class="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
        <button @click="isOpen = true" type="button" class="-m-2.5 p-2.5 text-gray-700 lg:hidden">
          <span class="sr-only">Open sidebar</span>
          <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
            aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </button>

        <!-- Separator -->
        <div class="h-6 w-px bg-gray-200 lg:hidden" aria-hidden="true"></div>

        <div class="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
          <form class="relative flex flex-1" action="#" method="GET">
            <label for="search-field" class="sr-only">Search</label>
            <svg class="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-gray-400" viewBox="0 0 20 20"
              fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd"
                d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                clip-rule="evenodd" />
            </svg>
            <input id="search-field"
              class="block h-full w-full border-0 py-0 pl-8 pr-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm"
              placeholder="Search..." type="search" name="search">
          </form>
          <div class="flex items-center gap-x-4 lg:gap-x-6">
            <button type="button" class="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500">
              <span class="sr-only">View notifications</span>
              <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
              </svg>
            </button>

            <!-- Separator -->
            <div class="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-200" aria-hidden="true"></div>

            <!-- Profile dropdown -->
            <div class="relative">
              <button type="button" class="-m-1.5 flex items-center p-1.5" id="user-menu-button" aria-expanded="false"
                aria-haspopup="true">
                <span class="sr-only">Open user menu</span>
                <img class="h-8 w-8 rounded-full bg-gray-50"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt="">
                <span class="hidden lg:flex lg:items-center">
                  <span class="ml-4 text-sm font-semibold leading-6 text-gray-900" aria-hidden="true">{{ username
                    }}</span>
                  <svg class="ml-2 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fill-rule="evenodd"
                      d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                      clip-rule="evenodd" />
                  </svg>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <main class="py-10">
        <div class="px-4 sm:px-6 lg:px-8">

          <slot />
        </div>
      </main>
      <CoreSearchModal :isOpen="isSearchModalOpen" @update:isOpen="isSearchModalOpen = $event" />
    </div>
  </div>

</template>

<script setup lang="ts">
import { useKeyboardShortcut } from '@/composables/core/useKeyboardShortcut';
import { useLogin } from '@/composables/auth/login'
const { localstorageData, logOut } = useLogin()
const isOpen = ref(false)

const username = computed(() => {
  return Object.keys(localstorageData.user.value).length ? `${localstorageData.user.value.firstname} ${localstorageData.user.value.lastname}` : ''
})

const isSearchModalOpen = ref(false);

useKeyboardShortcut(() => {
  isSearchModalOpen.value = true;
});

</script>

<style scoped>
.router-link-exact-active {
  background-color: #0ba9b9;
  color: white
}
</style>@/composables/modules/auth/login