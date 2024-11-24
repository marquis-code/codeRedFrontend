<template>
  <section class="border-b border-gray-400 lg:h-24">
    <NavigationBar :isMobile="isMobile" @close="isMobile = false" @open="isMobile = true" />
  </section>
  <div class="bg-white">
    <main class="isolate">
      <!-- Hero section -->
      <div data-aos="fade-up" class="relative isolate -z-10 overflow-hidden bg-gradient-to-b from-indigo-100/20">
        <div class="absolute inset-y-0 right-1/2 -z-10 -mr-96 w-[200%] origin-top-right skew-x-[-30deg] bg-white shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 sm:-mr-80 lg:-mr-96" aria-hidden="true"></div>
        <div class="mx-auto max-w-7xl px-6 py-32 sm:py-40 lg:px-8">
          <div class="mx-auto max-w-2xl lg:mx-0 lg:grid lg:max-w-none lg:grid-cols-2 lg:gap-x-16 lg:gap-y-8 xl:grid-cols-1 xl:grid-rows-1 xl:gap-x-8">
            <!-- <h1 class="max-w-2xl text-balance text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl lg:col-span-2 xl:col-auto">We’re changing the way people connect</h1> -->
            <h1 class="max-w-2xl text-balance text-4xl font-semibold tracking-tight text-gray-900 sm:text-7xl lg:col-span-2 xl:col-auto"><span class="text-[#CC1100]">CODE-RED:</span> Saving Lives While Saving time</h1>
            <div class="mt-6 max-w-xl lg:mt-0 xl:col-end-1 xl:row-start-1">
              <div class="text-pretty space-y-3 text-lg text-gray-900 sm:text-xl/8">
               <p class="text-"> Emergencies often come with the challenge of finding immediate healthcare. In Nigeria, delays in locating available hospital beds, connecting with ambulance services, or accessing basic first aid information can be life-threatening.</p>

                <p class="text-">At <span class="text-[#CC1100] font-medium">CODE-RED</span>, we aim to bridge this gap by providing real-time, reliable, and actionable emergency healthcare solutions.</p>
<!--                Emergencies are unpredictable and often come with the challenge of accessing immediate healthcare. In Nigeria, patients and their families face a critical issue—how to locate available hospital beds, connect with ambulance services, or even navigate through basic first aid in moments of crisis. These delays can mean the difference between life and death.-->
              </div>
            </div>
            <img src="@/assets/img/animation.png" alt="" class="mt-10 aspect-[6/5] w-full max-w-lg rounded-2xl object-cover sm:mt-16 lg:mt-0 lg:max-w-none xl:row-span-2 xl:row-end-2 xl:mt-36">
          </div>
        </div>
        <div class="absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-t from-white sm:h-32"></div>
      </div>

      <!-- Timeline section -->
      <div data-aos="fade-up" class="mx-auto -mt-8 max-w-7xl px-6 lg:px-8">
        <div class="mx-auto grid max-w-2xl grid-cols-1 gap-8 overflow-hidden lg:mx-0 lg:max-w-none lg:grid-cols-4">
          <div>
            <time datetime="2021-08" class="flex items-center text-sm/6 font-semibold text-indigo-600">
              <svg viewBox="0 0 4 4" class="mr-4 size-1 flex-none" aria-hidden="true">
                <circle cx="2" cy="2" r="2" fill="currentColor" />
              </svg>
              Aug 2021
              <div class="absolute -ml-2 h-px w-screen -translate-x-full bg-gray-900/10 sm:-ml-4 lg:static lg:-mr-6 lg:ml-8 lg:w-auto lg:flex-auto lg:translate-x-0" aria-hidden="true"></div>
            </time>
            <p class="mt-6 text-lg/8 font-semibold tracking-tight text-gray-900">Founded CODE-RED</p>
            <p class="mt-1 text-base/7 text-gray-600">
              Our journey began with a vision to revolutionize emergency healthcare in Nigeria. We recognized the dire need for a system that connects patients with real-time hospital bed availability and emergency services.
<!--              We launched CODE-RED to address the urgent need for streamlined emergency healthcare access in Nigeria. Our mission was clear: save lives by reducing the time it takes for individuals to find the care they need.-->
            </p>
          </div>
          <div>
            <time datetime="2021-12" class="flex items-center text-sm/6 font-semibold text-indigo-600">
              <svg viewBox="0 0 4 4" class="mr-4 size-1 flex-none" aria-hidden="true">
                <circle cx="2" cy="2" r="2" fill="currentColor" />
              </svg>
              Secured Initial Funding
              <div class="absolute -ml-2 h-px w-screen -translate-x-full bg-gray-900/10 sm:-ml-4 lg:static lg:-mr-6 lg:ml-8 lg:w-auto lg:flex-auto lg:translate-x-0" aria-hidden="true"></div>
            </time>
            <p class="mt-6 text-lg/8 font-semibold tracking-tight text-gray-900">Secured $65m in funding</p>
            <p class="mt-1 text-base/7 text-gray-600">
              With unwavering support from our investors, we raised $65 million to bring our vision to life. This funding enabled us to lay the groundwork for a platform that bridges gaps in emergency response.
<!--              Provident quia ut esse. Vero vel eos repudiandae aspernatur. Cumque minima impedit sapiente a architecto nihil-->
              .</p>
          </div>
          <div>
            <time datetime="2022-02" class="flex items-center text-sm/6 font-semibold text-indigo-600">
              <svg viewBox="0 0 4 4" class="mr-4 size-1 flex-none" aria-hidden="true">
                <circle cx="2" cy="2" r="2" fill="currentColor" />
              </svg>
              Feb 2022
              <div class="absolute -ml-2 h-px w-screen -translate-x-full bg-gray-900/10 sm:-ml-4 lg:static lg:-mr-6 lg:ml-8 lg:w-auto lg:flex-auto lg:translate-x-0" aria-hidden="true"></div>
            </time>
            <p class="mt-6 text-lg/8 font-semibold tracking-tight text-gray-900">Released beta</p>
            <p class="mt-1 text-base/7 text-gray-600">
              Our beta launch was a milestone, introducing users to real-time hospital bed availability, ambulance connections, and interactive maps. Feedback from early adopters helped refine our offerings.
<!--              Sunt perspiciatis incidunt. Non necessitatibus aliquid. Consequatur ut officiis earum eum quia facilis. Hic deleniti dolorem quia et.-->
            </p>
          </div>
          <div>
            <time datetime="2022-12" class="flex items-center text-sm/6 font-semibold text-indigo-600">
              <svg viewBox="0 0 4 4" class="mr-4 size-1 flex-none" aria-hidden="true">
                <circle cx="2" cy="2" r="2" fill="currentColor" />
              </svg>
              Dec 2022
              <div class="absolute -ml-2 h-px w-screen -translate-x-full bg-gray-900/10 sm:-ml-4 lg:static lg:-mr-6 lg:ml-8 lg:w-auto lg:flex-auto lg:translate-x-0" aria-hidden="true"></div>
            </time>
            <p class="mt-6 text-lg/8 font-semibold tracking-tight text-gray-900">Global launch of product</p>
            <p class="mt-1 text-base/7 text-gray-600">
              We went live with our full platform, reaching communities across Nigeria. This marked the beginning of a new era in emergency healthcare, empowering users with access to critical resources at their fingertips.


              <!--              Ut ipsa sint distinctio quod itaque nam qui. Possimus aut unde id architecto voluptatem hic aut pariatur velit.-->
            </p>
          </div>
        </div>
      </div>

      <!-- Logo cloud -->
      <div data-aos="fade-up" class="mx-auto mt-32 max-w-7xl sm:mt-40 sm:px-6 lg:px-8">
        <div class="relative isolate overflow-hidden bg-gray-900 px-6 py-24 text-center shadow-2xl sm:rounded-3xl sm:px-16">
          <h2 class="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl">Our customers love us</h2>
          <p class="mx-auto mt-6 max-w-xl text-lg/8 text-gray-300">
            We are proud to have earned the trust and admiration of our users and partners. Every testimonial and success story reminds us why we started this journey—to save lives and improve healthcare outcomes. Your satisfaction fuels our mission to innovate and deliver the best solutions for emergency care.
<!--            Aliquip reprehenderit incididunt amet quis fugiat ut velit. Sit occaecat labore proident cillum in nisi adipisicing officia excepteur tempor deserunt-->
            .</p>
          <div class="mx-auto mt-20 grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-12 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 sm:gap-y-14 lg:max-w-4xl lg:grid-cols-5">
            <img class="col-span-2 max-h-12 w-full object-contain lg:col-span-1" src="https://tailwindui.com/plus/img/logos/158x48/transistor-logo-white.svg" alt="Transistor" width="158" height="48">
            <img class="col-span-2 max-h-12 w-full object-contain lg:col-span-1" src="https://tailwindui.com/plus/img/logos/158x48/reform-logo-white.svg" alt="Reform" width="158" height="48">
            <img class="col-span-2 max-h-12 w-full object-contain lg:col-span-1" src="https://tailwindui.com/plus/img/logos/158x48/tuple-logo-white.svg" alt="Tuple" width="158" height="48">
            <img class="col-span-2 max-h-12 w-full object-contain sm:col-start-2 lg:col-span-1" src="https://tailwindui.com/plus/img/logos/158x48/savvycal-logo-white.svg" alt="SavvyCal" width="158" height="48">
            <img class="col-span-2 col-start-2 max-h-12 w-full object-contain sm:col-start-auto lg:col-span-1" src="https://tailwindui.com/plus/img/logos/158x48/statamic-logo-white.svg" alt="Statamic" width="158" height="48">
          </div>
          <div class="absolute -top-24 right-0 -z-10 transform-gpu blur-3xl" aria-hidden="true">
            <div class="aspect-[1404/767] w-[87.75rem] bg-gradient-to-r from-[#80caff] to-[#4f46e5] opacity-25" style="clip-path: polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)"></div>
          </div>
        </div>
      </div>

      <!-- Team section -->
      <div data-aos="fade-up" class="mx-auto mt-32 max-w-7xl px-6 sm:mt-40 lg:px-8">
        <div class="mx-auto max-w-2xl lg:mx-0">
          <h2 class="text-pretty text-4xl font-semibold tracking-tight  sm:text-5xl">Our team</h2>
          <p class="mt-6 text-lg/8 text-gray-800">We’re a dynamic group of individuals who are passionate about what we do and dedicated to delivering the best results for our clients. Every member contributes their expertise to ensure our platform serves as a lifeline during emergencies. .</p>
        </div>
        <ul role="list" class="mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 xl:grid-cols-4">
          <li>
            <img class="aspect-[14/13] w-full rounded-2xl object-cover" src="@/assets/img/ceo.jpeg" alt="">
            <h3 class="mt-6 text-lg/8 font-semibold tracking-tight ">Anita Orji</h3>
            <p class="text-base/7 text-gray-800">Co-Founder / CEO</p>
            <p class="text-sm/6 text-gray-500">Lagos, Nigeria</p>
          </li>

          <li>
            <img class="aspect-[14/13] w-full rounded-2xl object-cover" src="@/assets/img/coo2.jpeg" alt="">
            <h3 class="mt-6 text-lg/8 font-semibold tracking-tight ">Oluwakemi Ifedoyin</h3>
            <p class="text-base/7 text-gray-800">Co-Founder / COO</p>
            <p class="text-sm/6 text-gray-500">Lagos, Nigeria</p>
          </li>

          <li>
            <img class="aspect-[14/13] w-full rounded-2xl object-cover" src="@/assets/img/cto.jpg" alt="">
            <h3 class="mt-6 text-lg/8 font-semibold tracking-tight ">Marquis Abah</h3>
            <p class="text-base/7 text-gray-800">CTO (Chief Technology Officer)</p>
            <p class="text-sm/6 text-gray-500">Lagos, Nigeria</p>
          </li>

          <li>
            <img class="aspect-[14/13] w-full rounded-2xl object-cover" src="@/assets/img/people1.jpeg" alt="">
            <h3 class="mt-6 text-lg/8 font-semibold tracking-tight ">Chioma Ileka</h3>
            <p class="text-base/7 text-gray-800">Head Of Marketing</p>
            <p class="text-sm/6 text-gray-500">Lagos, Nigeria</p>
          </li>
        </ul>
      </div>

      <!-- Stats -->
      <div data-aos="fade-up" class="mx-auto mt-32 max-w-7xl px-6 sm:mt-40 lg:px-8">
        <div class="mx-auto max-w-2xl lg:mx-0">
          <h2 class="text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">We approach work as a place to make the world better</h2>
          <p class="mt-6 text-base/7 text-gray-600">Diam nunc lacus lacus aliquam turpis enim. Eget hac velit est euismod lacus. Est non placerat nam arcu. Cras purus nibh cursus sit eu in id. Integer vel nibh.</p>
        </div>
        <div class="mx-auto mt-16 flex max-w-2xl flex-col gap-8 lg:mx-0 lg:mt-20 lg:max-w-none lg:flex-row lg:items-end">
          <div class="flex flex-col-reverse justify-between gap-x-16 gap-y-8 rounded-2xl bg-gray-50 p-8 sm:w-3/4 sm:max-w-md sm:flex-row-reverse sm:items-end lg:w-72 lg:max-w-none lg:flex-none lg:flex-col lg:items-start">
            <p class="flex-none text-3xl font-bold tracking-tight text-gray-900">250k</p>
            <div class="sm:w-80 sm:shrink lg:w-auto lg:flex-none">
              <p class="text-lg font-semibold tracking-tight text-gray-900">Users on the platform</p>
              <p class="mt-2 text-base/7 text-gray-600">Hundreds of thousands of users have joined us on this journey, relying on our platform for timely healthcare information and emergency resources.</p>
            </div>
          </div>
          <div class="flex flex-col-reverse justify-between gap-x-16 gap-y-8 rounded-2xl bg-gray-900 p-8 sm:flex-row-reverse sm:items-end lg:w-full lg:max-w-sm lg:flex-auto lg:flex-col lg:items-start lg:gap-y-44">
            <p class="flex-none text-3xl font-bold tracking-tight text-white">$8.9 billion</p>
            <div class="sm:w-80 sm:shrink lg:w-auto lg:flex-none">
              <p class="text-lg font-semibold tracking-tight text-white">We’re proud that our customers have made over $8 billion in total revenue.</p>
              <p class="mt-2 text-base/7 text-gray-400">Through our platform, users have unlocked critical healthcare solutions, resulting in significant societal and financial benefits.

              </p>
            </div>
          </div>
          <div class="flex flex-col-reverse justify-between gap-x-16 gap-y-8 rounded-2xl bg-indigo-600 p-8 sm:w-11/12 sm:max-w-xl sm:flex-row-reverse sm:items-end lg:w-full lg:max-w-none lg:flex-auto lg:flex-col lg:items-start lg:gap-y-28">
            <p class="flex-none text-3xl font-bold tracking-tight text-white">401,093</p>
            <div class="sm:w-80 sm:shrink lg:w-auto lg:flex-none">
              <p class="text-lg font-semibold tracking-tight text-white">Transactions this year</p>
              <p class="mt-2 text-base/7 text-indigo-200">Every interaction on our platform translates to lives impacted—be it finding an available bed, securing ambulance services, or learning life-saving first aid techniques.</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Content section -->
      <div data-aos="fade-up" class="mx-auto mt-32 max-w-7xl px-6 sm:mt-40 lg:px-8 pb-20">
        <div class="mx-auto flex max-w-2xl flex-col items-end justify-between gap-16 lg:mx-0 lg:max-w-none lg:flex-row">
          <div class="w-full lg:max-w-lg lg:flex-auto">
            <h2 class="text-pretty text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">We’re always looking for awesome people to join us</h2>
            <p class="mt-6 text-xl/8 text-gray-600">
              Are you passionate about making a difference? Join a team dedicated to transforming emergency healthcare. Together, we’ll create solutions that save lives and make care accessible to everyone.
<!--              Diam nunc lacus lacus aliquam turpis enim. Eget hac velit est euismod lacus. Est non placerat nam arcu. Cras purus nibh cursus sit eu in id.-->
            </p>
            <img src="https://images.unsplash.com/photo-1606857521015-7f9fcf423740?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1344&h=1104&q=80" alt="" class="mt-16 aspect-[6/5] w-full rounded-2xl bg-gray-50 object-cover lg:aspect-auto lg:h-[34.5rem]">
          </div>
          <div class="w-full lg:max-w-xl lg:flex-auto">
            <h3 class="sr-only">Job openings</h3>
            <ul class="-my-8 divide-y divide-gray-100">
<!--              <li class="py-8">-->
<!--                <dl class="relative flex flex-wrap gap-x-3">-->
<!--                  <dt class="sr-only">Role</dt>-->
<!--                  <dd class="w-full flex-none text-lg font-semibold tracking-tight text-gray-900">-->
<!--                    <a href="#">-->
<!--                      UI/UX Designer-->
<!--                      <span class="absolute inset-0" aria-hidden="true"></span>-->
<!--                    </a>-->
<!--                  </dd>-->
<!--                  <dt class="sr-only">Description</dt>-->
<!--                  <dd class="mt-2 w-full flex-none text-base/7 text-gray-600">-->
<!--                    Collaborate with the team to design seamless user experiences for our emergency healthcare platform.-->
<!--                  </dd>-->
<!--                  <dt class="sr-only">Location</dt>-->
<!--                  <dd class="mt-4 flex items-center gap-x-3 text-base/7 text-gray-500">-->
<!--                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#417505" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="10" r="3"/><path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 6.9 8 11.7z"/></svg>-->
<!--&lt;!&ndash;                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="10" r="3"/><path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 6.9 8 11.7z"/></svg>&ndash;&gt;-->
<!--                    Lagos, Nigeria (Remote-friendly)-->
<!--                  </dd>-->
<!--                </dl>-->
<!--              </li>-->
              <li class="py-8">
                <dl class="relative flex flex-wrap gap-x-3">
                  <dt class="sr-only">Role</dt>
                  <dd class="w-full flex-none text-lg font-semibold tracking-tight text-gray-900">
                    <a href="#">
                      Backend Engineer (Nest Js)
                      <span class="absolute inset-0" aria-hidden="true"></span>
                    </a>
                  </dd>
                  <dt class="sr-only">Description</dt>
                  <dd class="mt-2 w-full flex-none text-base/7 text-gray-600">
                    Build and optimize the backend services that power our real-time updates and emergency connections.
                  </dd>
                  <dt class="sr-only">Location</dt>
                  <dd class="mt-4 flex items-center gap-x-3 text-base/7 text-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#417505" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="10" r="3"/><path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 6.9 8 11.7z"/></svg>
<!--                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="10" r="3"/><path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 6.9 8 11.7z"/></svg>-->
                    Lagos, Nigeria (Hybrid)
                  </dd>
                </dl>
              </li>
              <li class="py-8">
                <dl class="relative flex flex-wrap gap-x-3">
                  <dt class="sr-only">Role</dt>
                  <dd class="w-full flex-none text-lg font-semibold tracking-tight text-gray-900">
                    <a href="#">
                      Mobile Developer (React Native)
                      <span class="absolute inset-0" aria-hidden="true"></span>
                    </a>
                  </dd>
                  <dt class="sr-only">Description</dt>
                  <dd class="mt-2 w-full flex-none text-base/7 text-gray-600">
                    Develop high-performance mobile applications ensuring users access real-time emergency services on the go.
                  </dd>
                  <dt class="sr-only">Location</dt>
                  <dd class="mt-4 flex items-center gap-x-3 text-base/7 text-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#417505" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="10" r="3"/><path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 6.9 8 11.7z"/></svg>
<!--                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#417505" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="10" r="3"/><path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 6.9 8 11.7z"/></svg>-->
                    Remote (Nigeria-based)
                  </dd>
                </dl>
              </li>
              <li class="py-8">
                <dl class="relative flex flex-wrap gap-x-3">
                  <dt class="sr-only">Role</dt>
                  <dd class="w-full flex-none text-lg font-semibold tracking-tight text-gray-900">
                    <a href="#">
                      DevOps Engineer
                      <span class="absolute inset-0" aria-hidden="true"></span>
                    </a>
                  </dd>
                  <dt class="sr-only">Description</dt>
                  <dd class="mt-2 w-full flex-none text-base/7 text-gray-600">
                    Manage our cloud infrastructure and ensure smooth deployments for our critical healthcare platform.
                  </dd>
                  <dt class="sr-only">Location</dt>
                  <dd class="mt-4 flex items-center gap-x-3 text-base/7 text-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#417505" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="10" r="3"/><path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 6.9 8 11.7z"/></svg>
<!--                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="10" r="3"/><path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 6.9 8 11.7z"/></svg>-->
                    Lagos, Nigeria (Remote-friendly)
                  </dd>
                </dl>
              </li>
              <li class="py-8 mb-10">
                <dl class="relative flex flex-wrap gap-x-3">
                  <dt class="sr-only">Role</dt>
                  <dd class="w-full flex-none text-lg font-semibold tracking-tight text-gray-900">
                    <a href="#">
                      Data Scientist
                      <span class="absolute inset-0" aria-hidden="true"></span>
                    </a>
                  </dd>
                  <dt class="sr-only">Description</dt>
                  <dd class="mt-2 w-full flex-none text-base/7 text-gray-600">
                    Analyze and optimize data to improve emergency response times and healthcare accessibility.
                  </dd>
                  <dt class="sr-only">Location</dt>
                  <dd class="mt-4 flex items-center gap-x-3 text-base/7 text-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#417505" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="10" r="3"/><path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 6.9 8 11.7z"/></svg>
<!--                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="10" r="3"/><path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 6.9 8 11.7z"/></svg>-->
                    Lagos, Nigeria (Remote-friendly)
                  </dd>
                </dl>
              </li>
            </ul>
          </div>

        </div>
      </div>
    </main>
  </div>
<FooterSection />
</template>

<script setup lang="ts">
const isMobile = ref(false)
</script>