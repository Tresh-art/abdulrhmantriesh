<template>
  <div class="bg-[#F5F1EE] min-h-screen font-sans text-[#3D2E28]" dir="rtl">
    <section class="max-w-6xl mx-auto pt-16 px-6 flex flex-col md:flex-row items-center gap-12">
      <div class="w-full md:w-1/2">
        <div class="bg-white p-4 rounded-2xl shadow-sm border border-[#E5E0DA]">
          <img src="https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=1000&auto=format&fit=crop" class="w-full h-[400px] object-cover rounded-xl" />
        </div>
      </div>
      <div class="w-full md:w-1/2 text-right">
        <h1 class="text-4xl font-extrabold mb-4">ميزان الحرارة الرقمي</h1>
        <p class="text-2xl font-bold mb-6">75 د.ل</p>
        <button @click="scrollToForm" class="bg-[#3D2E28] text-white px-10 py-4 rounded-xl font-bold">اطلب الآن</button>
      </div>
    </section>

    <section id="order-form" class="max-w-2xl mx-auto py-20 px-6">
      <div class="bg-white p-10 rounded-3xl shadow-sm border border-[#E5E0DA]">
        
        <div v-if="submitted" class="text-center py-10">
          <h2 class="text-3xl font-bold">✅ تم استلام طلبك!</h2>
          <p class="mt-4">سنتواصل معك قريباً.</p>
        </div>

        <form v-else name="thermometer-orders" method="POST" data-netlify="true" @submit.prevent="handleSubmit">
          <input type="hidden" name="form-name" value="thermometer-orders" />
          
          <div class="space-y-4">
            <input required name="name" type="text" placeholder="الاسم بالكامل" class="w-full p-4 bg-[#F5F1EE] rounded-xl outline-none" />
            <input required name="phone" type="tel" placeholder="رقم الهاتف" class="w-full p-4 bg-[#F5F1EE] rounded-xl outline-none text-right" />
            <textarea required name="address" rows="3" placeholder="العنوان بالتفصيل" class="w-full p-4 bg-[#F5F1EE] rounded-xl outline-none resize-none"></textarea>
            <button type="submit" class="w-full bg-[#3D2E28] text-white py-5 rounded-xl text-xl font-bold">تأكيد الطلب</button>
          </div>
        </form>

      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const submitted = ref(false)

const scrollToForm = () => {
  document.getElementById('order-form').scrollIntoView({ behavior: 'smooth' })
}

const handleSubmit = async (e) => {
  const form = e.target
  const formData = new FormData(form)
  
  try {
    await fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(formData).toString(),
    })
    // FIXED LINE: Ensure the success message shows up
    submitted.value = true
  } catch (error) {
    alert("Error sending order")
  }
}
</script>
