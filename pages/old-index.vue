<template>
  <main>
   <Header />
    <HeroSection />
    <SearchBar id="search" class="mb-3" />
    <HospitalsList class="" />
    <Services id="features" />
    <HotLine id="hotlines" />
    <ContactUs />
  <Footer />
  </main>
</template>
x
<style scoped>
.card-overlay {
  background-color: rgba(
    128,
    90,
    213,
    0.5
  ); /* Purple background with some opacity */
}

.card-overlay:hover {
  background-color: rgba(128, 90, 213, 1); /* Full opacity on hover */
}
</style>
