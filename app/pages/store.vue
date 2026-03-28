<template>
  <div class="bg-[#F8F6F4] min-h-screen font-sans text-[#333]" dir="rtl">
    
    <div v-if="view === 'home'" class="flex flex-col pb-40">
      
      <nav class="pt-10 pb-2 text-center">
        <div class="font-bold text-2xl tracking-wide text-[#3D5A50] opacity-50">قائمة المنتجات</div>
      </nav>

      <div class="flex flex-col gap-20 mt-4">
        
        <div class="w-full max-w-4xl mx-auto px-6">
          <div class="flex flex-col items-center">
            <div @click="openProduct('thermometer')" class="w-full cursor-pointer rounded-[2.5rem] overflow-hidden shadow-sm border border-[#E5E0DA] bg-white">
              <img src="/footer/12345.avif" class="w-full h-auto block" alt="Product 1" />
            </div>
            
            <div class="mt-8 text-center w-full">
              <h2 class="text-4xl md:text-5xl font-black mb-3 text-[#333] leading-[1.4]">ميزان الحرارة</h2>
              <p class="text-xl text-[#555] mb-8 font-medium opacity-70">الدقة في كل درجة</p>
              
              <button 
                @click="openProduct('thermometer')"
                class="inline-block px-14 py-4 bg-white text-[#333] border border-[#E5E0DA] rounded-2xl text-xl font-bold shadow-sm hover:bg-gray-50 transition-all active:scale-95"
              >
                استكشف المنتج
              </button>
            </div>
          </div>
        </div>

        <div class="w-full max-w-4xl mx-auto px-6">
          <div class="flex flex-col items-center">
            <div @click="openProduct('product-two')" class="w-full cursor-pointer rounded-[2.5rem] overflow-hidden shadow-sm border border-[#E5E0DA] bg-white">
              <img src="/footer/678910.avif" class="w-full h-auto block" alt="Product 2" />
            </div>
            
            <div class="mt-8 text-center w-full">
              <h2 class="text-4xl md:text-5xl font-black mb-3 text-[#333] leading-[1.4]">المنتج المميز</h2>
              <p class="text-xl text-[#555] mb-8 font-medium opacity-70">فخامة التصميم</p>
              
              <button 
                @click="openProduct('product-two')"
                class="inline-block px-14 py-4 bg-white text-[#333] border border-[#E5E0DA] rounded-2xl text-xl font-bold shadow-sm hover:bg-gray-50 transition-all active:scale-95"
              >
                استكشف المنتج
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>

    <div v-else-if="view === 'product'" class="animate-in">
      <nav class="p-8 flex justify-start max-w-7xl mx-auto">
        <button @click="view = 'home'" class="text-[#3D5A50] font-bold text-lg flex items-center gap-3 p-3 px-6 rounded-xl bg-white shadow-sm border border-[#E5E0DA]">
          <span>→</span> العودة للرئيسية
        </button>
      </nav>

      <section class="max-w-7xl mx-auto px-6 pb-24">
        <div class="flex flex-col lg:flex-row items-start gap-12">
          
          <div class="w-full lg:w-3/5">
            <div class="relative w-full aspect-[4/5] bg-white rounded-[2.5rem] overflow-hidden shadow-xl border border-[#E5E0DA]">
              <img :src="activeProductData.photos[currentIndex]" class="w-full h-full object-cover" />
              <button @click="prevSlide" class="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 w-12 h-12 rounded-full shadow-md">❯</button>
              <button @click="nextSlide" class="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 w-12 h-12 rounded-full shadow-md">❮</button>
            </div>
          </div>

          <div class="w-full lg:w-2/5 text-right">
            <h1 class="text-5xl font-black mb-4 text-[#333] leading-[1.4]">{{ activeProductData.title }}</h1>
            <div class="text-4xl font-extrabold text-[#3D5A50] mb-8">{{ activeProductData.price }} د.ل</div>
            <p class="text-xl leading-relaxed text-[#555] mb-10">{{ activeProductData.description }}</p>

            <div class="bg-white p-8 rounded-[2.5rem] shadow-lg border border-[#E5E0DA]">
              <form v-if="!submitted" @submit.prevent="handleSubmit" class="space-y-5">
                <input required name="name" type="text" placeholder="الاسم بالكامل" class="w-full p-5 bg-[#F8F6F4] rounded-xl outline-none border-none focus:ring-1 focus:ring-[#3D5A50]">
                <input required name="phone" type="tel" dir="ltr" placeholder="رقم الهاتف" class="w-full p-5 bg-[#F8F6F4] rounded-xl outline-none border-none focus:ring-1 focus:ring-[#3D5A50] text-right">
                
                <select name="city" required v-model="selectedCity" class="w-full p-5 bg-[#F8F6F4] rounded-xl outline-none cursor-pointer">
                  <option value="" disabled>اختر المدينة</option>
                  <option value="طرابلس">طرابلس</option>
                  <option value="بنغازي">بنغازي</option>
                  <option value="مصراتة">مصراتة</option>
                </select>

                <div class="bg-[#F8F6F4] p-6 rounded-2xl flex justify-between items-center">
                  <span class="font-bold">الإجمالي:</span>
                  <span class="text-3xl font-black text-[#3D5A50]">{{ totalPrice }} د.ل</span>
                </div>

                <button type="submit" class="w-full bg-[#3D5A50] text-white py-6 rounded-2xl text-xl font-black shadow-lg active:scale-95 transition-all">
                  تأكيد الطلب
                </button>
              </form>
              <div v-else class="text-center py-10">
                <div class="text-5xl mb-4">✓</div>
                <h2 class="text-2xl font-bold">تم استلام طلبك!</h2>
              </div>
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

const products = {
  thermometer: {
    title: 'ميزان حرارة رقمي',
    description: 'دقة فائقة وسهولة تامة في الاستخدام للمطابخ الاحترافية والمنزلية.',
    price: 75,
    photos: ['/footer/12345.avif', '/footer/678910.avif']
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
  submitted.value = true
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<style scoped>
.animate-in {
  animation: fadeIn 0.5s ease-out;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
