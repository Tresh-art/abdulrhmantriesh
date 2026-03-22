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
        <h2 class="text-3xl font-bold text-center mb-10">إتمام الطلب</h2>
        
        <div class="space-y-8">
          <div class="space-y-2">
            <label class="block text-sm font-bold opacity-70 mr-2">الاسم بالكامل</label>
            <input type="text" class="w-full p-5 bg-[#F5F1EE] border-none rounded-2xl focus:ring-2 focus:ring-[#3D2E28] outline-none transition-all placeholder:opacity-30" placeholder="اكتب اسمك هنا...">
          </div>
          
          <div class="space-y-2">
            <label class="block text-sm font-bold opacity-70 mr-2">رقم الهاتف</label>
            <input type="tel" dir="ltr" class="w-full p-5 bg-[#F5F1EE] border-none rounded-2xl focus:ring-2 focus:ring-[#3D2E28] outline-none transition-all text-right placeholder:opacity-30" placeholder="09X-XXXXXXX">
          </div>

          <div class="space-y-2">
            <label class="block text-sm font-bold opacity-70 mr-2">المدينة</label>
            <select class="w-full p-5 bg-[#F5F1EE] border-none rounded-2xl focus:ring-2 focus:ring-[#3D2E28] outline-none transition-all appearance-none cursor-pointer">
              <option>طرابلس</option>
              <option>بنغازي</option>
              <option>مصراتة</option>
              <option>الزاوية</option>
            </select>
          </div>

          <button class="w-full bg-[#3D2E28] text-[#F5F1EE] py-6 rounded-2xl text-2xl font-bold mt-6 hover:shadow-2xl transition-all active:scale-[0.98]">
            تأكيد الطلب
          </button>
          
          <p class="text-center text-sm opacity-50 font-medium">
            الدفع نقداً عند استلام المنتج (COD)
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
const scrollToForm = () => {
  const el = document.getElementById('order-form');
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' });
  }
};
</script>
