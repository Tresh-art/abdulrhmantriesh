<template>
  <div class="bg-[#F8F6F4] min-h-screen font-sans text-[#333]" dir="rtl">
    
    <div v-if="view === 'home'" class="flex flex-col gap-24 lg:gap-32 pb-32">
      
      <nav class="p-8 pb-4 text-center">
        <div class="font-black text-3xl tracking-tighter text-[#3D5A50]">اسم العلامة الخاصة بك</div>
      </nav>

      <div class="w-full max-w-7xl mx-auto px-6 cursor-pointer" @click="openProduct('thermometer')">
        <div class="group">
          <div class="w-full aspect-[16/10] md:aspect-[16/8] lg:aspect-[16/7] overflow-hidden rounded-[3rem] shadow-xl border border-[#E5E0DA]">
            <img src="/footer/12345.avif" class="w-full h-full object-cover transition-transform duration-[4000ms] group-hover:scale-105" />
          </div>
          <div class="mt-12 text-center flex flex-col items-center">
            <h2 class="text-6xl md:text-8xl font-black mb-4 text-[#333] leading-[1.1]">ميزان الحرارة</h2>
            <p class="text-2xl tracking-widest text-[#555] opacity-90 mb-10 font-medium">الدقة في كل درجة</p>
            <div class="px-16 py-5 border-2 border-[#3D5A50] rounded-full text-xl font-black text-[#3D5A50] group-hover:bg-[#3D5A50] group-hover:text-white transition-all duration-500">استكشف المنتج</div>
          </div>
        </div>
      </div>

      <div class="w-full max-w-7xl mx-auto px-6 cursor-pointer" @click="openProduct('product-two')">
        <div class="group">
          <div class="w-full aspect-[16/10] md:aspect-[16/8] lg:aspect-[16/7] overflow-hidden rounded-[3rem] shadow-xl border border-[#E5E0DA]">
            <img src="/footer/678910.avif" class="w-full h-full object-cover transition-transform duration-[4000ms] group-hover:scale-105" />
          </div>
          <div class="mt-12 text-center flex flex-col items-center">
            <h2 class="text-6xl md:text-8xl font-black mb-4 text-[#333] leading-[1.1]">المنتج المميز</h2>
            <p class="text-2xl tracking-widest text-[#555] opacity-90 mb-10 font-medium">فخامة التصميم</p>
            <div class="px-16 py-5 border-2 border-[#3D5A50] rounded-full text-xl font-black text-[#3D5A50] group-hover:bg-[#3D5A50] group-hover:text-white transition-all duration-500">استكشف المنتج</div>
          </div>
        </div>
      </div>

    </div>

    <div v-else-if="view === 'product'" class="animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <nav class="p-8 flex justify-between items-center max-w-7xl mx-auto">
        <button @click="view = 'home'" class="text-[#3D5A50] font-bold text-lg flex items-center gap-3 hover:gap-5 transition-all p-3 px-6 rounded-full hover:bg-[#3D5A50]/10">
          <span>→</span> العودة للرئيسية
        </button>
        </nav>

      <section class="max-w-7xl mx-auto pt-10 px-6 pb-24">
        <div class="flex flex-col lg:flex-row items-start gap-20">
          
          <div class="w-full lg:w-3/5">
            <div class="relative w-full aspect-[4/5] bg-white rounded-[3rem] overflow-hidden shadow-2xl border border-[#E5E0DA] group">
              <img :src="activeProductData.photos[currentIndex]" class="w-full h-full object-cover transition-opacity duration-700" />
              
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
            <h1 class="text-7xl font-black mb-6 text-[#333] leading-[1.1]">{{ activeProductData.title }}</h1>
            <div class="text-5xl font-extrabold text-[#3D5A50] mb-10">{{ activeProductData.price }} د.ل</div>
            <p class="text-2xl leading-relaxed text-[#555] mb-12 font-medium">{{ activeProductData.description }}</p>

            <div id="order-section" class="bg-white p-10 md:p-12 rounded-[3rem] shadow-xl border border-[#E5E0DA]">
              <div v-if="submitted" class="text-center py-10">
                <div class="w-24 h-24 bg-[#A7F3D0] rounded-full flex items-center justify-center mx-auto mb-6 text-4xl">✓</div>
                <h2 class="text-3xl font-bold">تم استلام طلبك!</h2>
                <p class="mt-4 text-gray-500 text-lg">سنتواصل معك خلال 24 ساعة</p>
              </div>

              <form v-else @submit.prevent="handleSubmit" class="space-y-8">
                <input type="hidden" name="form-name" :value="'order-' + activeProduct" />
                
                <h3 class="text-3xl font-bold mb-8 text-center">بيانات التوصيل</h3>
                
                <input required name="name" type="text" placeholder="الاسم بالكامل" class="w-full p-6 bg-[#F8F6F4] rounded-2xl border-none focus:ring-2 focus:ring-[#3D5A50] outline-none text-lg">
                <input required name="phone" type="tel" dir="ltr" placeholder="رقم الهاتف" class="w-full p-6 bg-[#F8F6F4] rounded-2xl border-none focus:ring-2 focus:ring-[#3D5A50] outline-none text-lg text-right">
                
                <select name="city" required v-model="selectedCity" class="w-full p-6 bg-[#F8F6F4] rounded-2xl border-none focus:ring-2 focus:ring-[#3D5A50] outline-none text-lg appearance-none cursor-pointer">
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
                     <div class="flex items-center bg-white rounded-xl border border-[#E5E0DA] overflow-hidden shadow-sm">
                       <button type="button" @click="quantity++" class="w-14 h-14 text-2xl hover:bg-gray-50 active:bg-gray-100 transition-all">+</button>
                       <span class="w-14 text-center font-bold text-xl">{{ quantity }}</span>
                       <button type="button" @click="quantity > 1 ? quantity-- : null" class="w-14 h-14 text-2xl hover:bg-gray-50 active:bg-gray-100 transition-all">-</button>
                     </div>
                   </div>
                   <div class="flex justify-between items-center pt-6 border-t border-[#E5E0DA]">
                     <span class="text-2xl font-bold text-gray-400">الإجمالي</span>
                     <span class="text-4xl font-black text-[#3D5A50]">{{ totalPrice }} د.ل</span>
                   </div>
                </div>

                <button type="submit" class="w-full bg-[#3D5A50] text-white py-8 rounded-[2rem] text-2xl font-black hover:shadow-2xl active:scale-95 transition-all duration-300">
                  تأكيد الطلب الآن
                </button>
                <p class="text-center text-gray-400 font-medium">✓ الدفع عند الاستلام</p>
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

// --- VIEW NAVIGATION STATE ---
const view = ref('home')
const activeProduct = ref('thermometer') // Default to first product

// --- GLOBAL STATE ---
const submitted = ref(false)
const currentIndex = ref(0)
const quantity = ref(1)
const selectedCity = ref('')
const customCity = ref('')

// --- PRODUCT DATA (Updated structure) ---
const products = {
  thermometer: {
    title: 'ميزان حرارة رقمي',
    description: 'دقة فائقة وسهولة تامة في الاستخدام. ميزان حرارة مصمم خصيصاً لتلبية احتياجات المطابخ الاحترافية والمنزلية، مع بنية متينة صُممت لتدوم طويلاً.',
    price: 75,
    photos: ['/footer/12345.avif', '/footer/678910.avif', '/footer/1112131415.avif']
  },
  'product-two': {
    title: 'المنتج الفاخر الثاني',
    description: 'وصف حصري يعبر عن جودة هذا المنتج وتفاصيله المذهلة. صُمم هذا المنتج ليوفر لك تجربة فريدة تجمع بين الجمال والوظيفة.',
    price: 150,
    photos: ['/footer/678910.avif', '/footer/12345.avif']
  }
}

// --- DYNAMIC COMPUTED GETTERS ---
const activeProductData = computed(() => products[activeProduct.value])
const totalPrice = computed(() => quantity.value * activeProductData.value.price)

// --- NAVIGATION LOGIC ---
const openProduct = (id) => {
  activeProduct.value = id
  view.value = 'product'
  currentIndex.value = 0
  quantity.value = 1
  submitted.value = false
  selectedCity.value = ''
  customCity.value = ''
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

// --- SLIDER LOGIC ---
const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % activeProductData.value.photos.length
}
const prevSlide = () => {
  currentIndex.value = currentIndex.value === 0 ? activeProductData.value.photos.length - 1 : currentIndex.value - 1
}

// --- SUBMISSION LOGIC ---
const handleSubmit = async (e) => {
  const form = e.target
  const formData = new FormData(form)
  
  if (selectedCity.value === 'مدينة أخرى') {
    formData.set('city', customCity.value)
  }
  
  try {
    // This is the bridge between Vue and the static Netlify form handler
    await fetch("/form-bridge.html", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(formData).toString(),
    })
    
    submitted.value = true
    window.scrollTo({ top: 0, behavior: 'smooth' })
  } catch (error) {
    alert("حدث خطأ في الإرسال، يرجى المحاولة مرة أخرى")
    console.error("Form submission error:", error)
  }
}
</script>

<style scoped>
/* Smooth fade and slide animation for the page switch */
.animate-in {
  animation: fadeIn 0.8s ease-out;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
