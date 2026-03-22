<template>
  <div class="bg-[#F5F1EE] min-h-screen font-sans text-[#3D2E28]" dir="rtl">
    <section class="max-w-6xl mx-auto pt-16 px-6">
      <div class="flex flex-col md:flex-row items-center gap-16">
        
        <div class="w-full md:w-1/2 relative group">
          <div class="bg-white p-4 rounded-2xl shadow-sm border border-[#E5E0DA]">
            <img 
              src="https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=1000&auto=format&fit=crop" 
              alt="Professional Thermometer" 
              class="w-full h-[500px] object-cover rounded-xl transition-transform duration-700 group-hover:scale-[1.03]"
            />
          </div>
          <div class="absolute -top-4 -right-4 bg-[#3D2E28] text-white px-6 py-2 rounded-full font-bold shadow-lg">
            الأكثر مبيعاً
          </div>
        </div>

        <div class="w-full md:w-1/2 text-right">
          <h1 class="text-5xl font-extrabold mb-6 leading-tight">ميزان الحرارة <br/>الرقمي المتطور</h1>
          
          <div class="flex items-center gap-4 mb-8">
            <span class="text-4xl font-bold text-[#3D2E28]">75 د.ل</span>
            <span class="text-gray-400 line-through text-xl">110 د.ل</span>
          </div>

          <p class="text-xl leading-relaxed text-[#5A4A42] mb-10">
            دقة احترافية في ثوانٍ معدودة. صُمم هذا الجهاز ليكون رفيقك المثالي في المنزل، مع شاشة LED واضحة وسهولة فائقة في الاستخدام.
          </p>

          <button 
            @click="scrollToForm"
            class="bg-[#3D2E28] text-[#F5F1EE] px-14 py-5 rounded-xl text-2xl font-bold transition-all hover:opacity-90 active:scale-95 shadow-lg"
          >
            اطلب الآن
          </button>
        </div>
      </div>
    </section>

    <section id="order-form" class="max-w-2xl mx-auto py-24 px-6">
      <div class="bg-white p-12 rounded-[2rem] shadow-sm border border-[#E5E0DA]">
        
        <div v-if="submitted" class="text-center py-10 transition-all duration-500">
          <div class="w-24 h-24 bg-[#A7F3D0] rounded-full flex items-center justify-center mx-auto mb-6">
            <span class="text-5xl text-[#065F46]">✓</span>
          </div>
          <h2 class="text-3xl font-bold mb-2">تم استلام طلبك!</h2>
          <p class="text-[#5A4A42]">سنتواصل معك قريباً لتأكيد التوصيل.</p>
        </div>

        <form 
          v-else
          name="thermometer-orders" 
          method="POST" 
          data-netlify="true" 
          data-netlify-honeypot="bot-field"
          @submit.prevent="handleSubmit"
          class="space-y-6"
        >
          <input type="hidden" name="form-name" value="thermometer-orders" />
          <h2 class="text-3xl font-bold text-center mb-10">بيانات التوصيل</h2>
          
          <div class="space-y-2">
            <label class="block text-sm font-bold opacity-70 mr-2">الاسم بالكامل</label>
            <input required name="name" type="text" class="w-full p-5 bg-[#F5F1EE] border-none rounded-2xl focus:ring-2 focus:ring-[#3D2E28] outline-none transition-all" placeholder="اكتب اسمك هنا...">
          </div>
          
          <div class="space-y-2">
            <label class="block text-sm font-bold opacity-70 mr-2">رقم الهاتف</label>
            <input required name="phone" type="tel" dir="ltr" class="w-full p-5 bg-[#F5F1EE] border-none rounded-2xl focus:ring-2 focus:ring-[#3D2E28] outline-none transition-all text-right" placeholder="09X-XXXXXXX">
          </div>

          <div class="space-y-2">
            <label class="block text-sm font-bold opacity-70 mr-2">المدينة</label>
            <select name="city" class="w-full p-5 bg-[#F5F1EE] border-none rounded-2xl focus:ring-2 focus:ring-[#3D2E28] outline-none transition-all appearance-none cursor-pointer">
              <option>طرابلس</option>
              <option>بنغازي</option>
              <option>مصراتة</option>
              <option>الزاوية</option>
              <option>مدينة أخرى</option>
            </select>
          </div>

          <div class="space-y-2">
            <label class="block text-sm font-bold opacity-70 mr-2">العنوان بالتفصيل</label>
            <textarea required name="address" rows="3" class="w-full p-5 bg-[#F5F1EE] border-none rounded-2xl focus:ring-2 focus:ring-[#3D2E28] outline-none transition-all resize-none" placeholder="اسم الشارع، رقم المنزل، أو علامة دالة..."></textarea>
          </div>

          <button type="submit" class="w-full bg-[#3D2E28] text-[#F5F1EE] py-6 rounded-2xl text-2xl font-bold mt-4 hover:shadow-2xl transition-all active:scale-[0.98]">
            تأكيد الطلب
          </button>
          
          <p class="text-center text-sm opacity-50 font-medium">الدفع نقداً عند الاستلام (COD)</p>
        </form>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const submitted = ref(false)

const scrollToForm = () => {
  document.getElementById('order-form')?.scrollIntoView({ behavior: 'smooth' })
}

const handleSubmit = async (e) => {
  const form = e.target
  const formData = new FormData(form)
  
  // This is the important part you were missing:
  const body = new URLSearchParams(formData)
  body.set("form-name", "thermometer-orders") 

  try {
    await fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: body.toString(),
    })
    submitted.value = true
    window.scrollTo({ top: 0, behavior: 'smooth' })
  } catch (error) {
    alert("حدث خطأ في الإرسال، يرجى المحاولة مرة أخرى")
  }
}
<form ...>
  <p class="hidden">
    <label>Don’t fill this out if you're human: <input name="bot-field" /></label>
  </p>
  </form>
