<template>
  <div class="bg-[#F8F6F4] min-h-screen font-sans text-[#333]" dir="rtl">
    
    <div v-if="view === 'home'" class="flex flex-col gap-32 pb-40">
      
      <nav class="pt-12 pb-6 text-center">
        <div class="font-black text-3xl tracking-tighter text-[#3D5A50] opacity-30">PRODUCT SHOWCASE</div>
      </nav>

      <div class="w-full max-w-5xl mx-auto px-6">
        <div class="flex flex-col items-center">
          <div @click="openProduct('thermometer')" class="w-full cursor-pointer rounded-[3rem] overflow-hidden shadow-sm border border-[#E5E0DA] bg-white">
            <img src="/footer/12345.avif" class="w-full h-auto block transition-transform duration-[3000ms] hover:scale-105" alt="Product 1" />
          </div>
          
          <div class="mt-10 text-center w-full">
            <h2 class="text-6xl md:text-7xl font-black mb-4 text-[#333]">ميزان الحرارة</h2>
            <p class="text-2xl text-[#555] mb-10 font-medium opacity-80">الدقة في كل درجة</p>
            <button 
              @click="openProduct('thermometer')"
              class="inline-block px-20 py-6 bg-[#3D5A50] text-white rounded-full text-2xl font-black shadow-lg hover:shadow-2xl transition-all active:scale-95 active:bg-[#2A3F38]"
            >
              استكشف المنتج
            </button>
          </div>
        </div>
      </div>

      <div class="w-full max-w-5xl mx-auto px-6">
        <div class="flex flex-col items-center">
          <div @click="openProduct('product-two')" class="w-full cursor-pointer rounded-[3rem] overflow-hidden shadow-sm border border-[#E5E0DA] bg-white">
            <img src="/footer/678910.avif" class="w-full h-auto block transition-transform duration-[3000ms] hover:scale-105" alt="Product 2" />
          </div>
          
          <div class="mt-10 text-center w-full">
            <h2 class="text-6xl md:text-7xl font-black mb-4 text-[#333]">المنتج المميز</h2>
            <p class="text-2xl text-[#555] mb-10 font-medium opacity-80">فخامة التصميم</p>
            <button 
              @click="openProduct('product-two')"
              class="inline-block px-20 py-6 bg-[#3D5A50] text-white rounded-full text-2xl font-black shadow-lg hover:shadow-2xl transition-all active:scale-95 active:bg-[#2A3F38]"
            >
              استكشف المنتج
            </button>
          </div>
        </div>
      </div>

    </div>

    <div v-else-if="view === 'product'" class="animate-in">
      <nav class="p-8 flex justify-start max-w-7xl mx-auto">
        <button @click="view = 'home'" class="text-[#3D5A50] font-bold text-xl flex items-center gap-3 p-4 px-8 rounded-full bg-white shadow-sm border border-[#E5E0DA] hover:bg-gray-50 transition-all">
          <span>→</span> العودة للرئيسية
        </button>
      </nav>

      <section class="max-w-7xl mx-auto pt-4 px-6 pb-24">
        <div class="flex flex-col lg:flex-row items-start gap-16">
          
          <div class="w-full lg:w-3/5">
            <div class="relative w-full aspect-[4/5] bg-white rounded-[3rem] overflow-hidden shadow-2xl border border-[#E5E0DA] group">
              <img :src="activeProductData.photos[currentIndex]" class="w-full h-full object-cover transition-opacity duration-500" />
              
              <button @click="prevSlide" class="absolute right-6 top-1/2 -translate-y-1/2 bg-white/90 w-14 h-14 rounded-full flex items-center justify-center shadow-xl opacity-0 group-hover:opacity-100 transition-opacity">❯</button>
              <button @click="nextSlide" class="absolute left-6 top-1/2 -translate-y-1/2 bg-white/90 w-14 h-14 rounded-full flex items-center justify-center shadow-xl opacity-0 group-hover:opacity-100 transition-opacity">❮</button>

              <div class="absolute bottom-10 left-0 right-0 flex justify-center gap-3">
                <button v-for="(_, i) in activeProductData.photos" :key="i" @click="currentIndex = i" 
                  class="h-1.5 rounded-full transition-all duration-500"
                  :class="currentIndex === i ? 'bg-[#3D5A50] w-10' : 'bg-gray-300 w-3'"></button>
              </div>
            </div>
          </div>

          <div class="w-full lg:w-2/5 text-right">
            <h1 class="text-7xl font-black mb-4 text-[#333]">{{ activeProductData.title }}</h1>
            <div class="text-5xl font-extrabold text-[#3D5A50] mb-8">{{ activeProductData.price }} د.ل</div>
            <p class="text-2xl leading-relaxed text-[#555] mb-12">{{ activeProductData.description }}</p>

            <div class="bg-white p-10 rounded-[3rem] shadow-xl border border-[#E5E0DA]">
              <div v-if="submitted" class="text-center py-10">
                <div class="w-24 h-24 bg-[#A7F3D0] rounded-full flex items-center justify-center mx-auto mb-6 text-4xl">✓</div>
                <h2 class="text-3xl font-bold">تم استلام طلبك!</h2>
              </div>

              <form v-else @submit.prevent="handleSubmit" class="space-y-6">
                <h3 class="text-2xl font-bold mb-6 text-center border-b pb-4">بيانات التوصيل</h3>
                <input required name="name" type="text" placeholder="الاسم بالكامل" class="w-full p-6 bg-[#F8F6F4] rounded-2xl outline-none border-none focus:ring-2 focus:ring-[#3D5A50] text-lg">
                <input required name="phone" type="tel" dir="ltr" placeholder="رقم الهاتف" class="w-full p-6 bg-[#F8F6F4] rounded-2xl outline-none border-none focus:ring-2 focus:ring-[#3D5A50] text-lg text-right">
                
                <select name="city" required v-model="selectedCity" class="w-full p-6 bg-[#F8F6F4] rounded-2xl outline-none cursor-pointer text-lg">
                  <option value="" disabled>اختر المدينة</option>
                  <option value="طرابلس">طرابلس</option>
                  <option value="بنغازي">بنغازي</option>
                  <option value="مصراتة">مصراتة</option>
                  <option value="مدينة أخرى">مدينة أخرى</option>
                </select>

                <div v-if="selectedCity === 'مدينة أخرى'">
                  <input v-model="customCity" type="text" required class="w-full p-6 bg-white border-2 border-[#3D5A50]/20 rounded-2xl" placeholder="اكتب مدينتك هنا...">
                </div>

                <div class="bg-[#F8F6F4] p-8 rounded-3xl space-y-6">
                   <div class="flex justify-between items-center">
                     <span class="text-xl font-bold">الكمية</span>
                     <div class="flex items-center bg-white rounded-xl border overflow-hidden">
                       <button type="button" @click="quantity++" class="w-14 h-14 text-2xl hover:bg-gray-100">+</button>
                       <span class="w-14 text-center font-bold text-xl">{{ quantity }}</span>
                       <button type="button" @click="quantity > 1 ? quantity-- : null" class="w-14 h-14 text-2xl hover:bg-gray-100">-</button>
                     </div>
                   </div>
                   <div class="flex justify-between items-center pt-6 border-t border-[#E5E0DA]">
                     <span class="text-xl font-bold text-gray-400">الإجمالي</span>
                     <span class="text-4xl font-black text-[#3D5A50]">{{ totalPrice }} د.ل</span>
                   </div>
                </div>

                <button type="submit" class="w-full bg-[#3D5A50] text-white py-8 rounded-[2rem] text-2xl font-black hover:shadow-2xl transition-all active:scale-95">
                  تأكيد الطلب
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const view = ref('home')
const activeProduct = ref('thermometer')
const submitted = ref(false)
const quantity = ref(1)
const currentIndex = ref(0)
const selectedCity = ref('')
const customCity = ref('')

const products = {
  thermometer: {
    title: 'ميزان حرارة رقمي',
    description: 'دقة فائقة وسهولة تامة في الاستخدام للمطابخ الاحترافية والمنزلية.',
    price: 75,
    photos: ['/footer/12345.avif', '/footer/678910.avif', '/footer/1112131415.avif']
  },
  'product-two': {
    title: 'المنتج الفاخر الثاني',
    description: 'جودة عالمية وتصميم عصري يناسب احتياجاتكم اليومية.',
    price: 150,
    photos: ['/footer/678910.avif', '/footer/12345.avif']
  }
}

const activeProductData = computed(() => products[activeProduct.value])
const totalPrice = computed(() => quantity.value * activeProductData.value.price)

const openProduct = (id) => {
  activeProduct.value = id
  view.value = 'product'
  currentIndex.value = 0
  quantity.value = 1
  submitted.value = false
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % activeProductData.value.photos.length
}
const prevSlide = () => {
  currentIndex.value = currentIndex.value === 0 ? activeProductData.value.photos.length - 1 : currentIndex.value - 1
}

const handleSubmit = async (e) => {
  const form = e.target
  const formData = new FormData(form)
  if (selectedCity.value === 'مدينة أخرى') formData.set('city', customCity.value)
  
  try {
    await fetch("/form-bridge.html", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(formData).toString(),
    })
    submitted.value = true
    window.scrollTo({ top: 0, behavior: 'smooth' })
  } catch (error) {
    alert("حدث خطأ، حاول مرة أخرى")
  }
}
</script>

<style scoped>
.animate-in {
  animation: fadeIn 0.6s ease-out forwards;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
