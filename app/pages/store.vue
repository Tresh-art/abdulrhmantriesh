<template>
  <div class="bg-[#F8F6F4] min-h-screen font-sans text-[#333]" dir="rtl">
    <section class="max-w-6xl mx-auto pt-20 px-6 pb-24">
      <div class="flex flex-col md:flex-row items-start gap-16">
        
        <div class="w-full md:w-1/2">
          <div 
            class="relative w-full h-[500px] md:h-[600px] bg-white rounded-3xl overflow-hidden shadow-sm border border-[#E5E0DA] group"
            @touchstart="handleTouchStart"
            @touchend="handleTouchEnd"
          >
            <img 
              :src="thermometerPhotos[currentIndex]" 
              alt="ميزان حرارة رقمي" 
              class="w-full h-full object-cover transition-opacity duration-300"
            />
            
            <button @click="nextSlide" class="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-[#333] w-10 h-10 rounded-full flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity active:scale-95">
              <span class="text-xl leading-none">❮</span>
            </button>
            <button @click="prevSlide" class="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-[#333] w-10 h-10 rounded-full flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity active:scale-95">
              <span class="text-xl leading-none">❯</span>
            </button>

            <div class="absolute bottom-6 left-0 right-0 flex justify-center gap-2">
              <button 
                v-for="(_, index) in thermometerPhotos" 
                :key="index"
                @click="goToSlide(index)"
                class="h-2 rounded-full transition-all duration-300"
                :class="currentIndex === index ? 'bg-[#3D5A50] w-6' : 'bg-gray-300 w-2 hover:bg-gray-400'"
              ></button>
            </div>
          </div>
        </div>

        <div class="w-full md:w-1/2 text-right pt-6">
          <h1 class="text-6xl font-extrabold mb-10 leading-tight">ميزان حرارة <br/>رقمي</h1>
          
          <div class="flex items-center gap-4 mb-10">
            <span class="text-5xl font-extrabold text-[#3D5A50]">{{ unitPrice }} د.ل</span>
            <span class="text-gray-400 line-through text-2xl">110 د.ل</span>
          </div>

          <p class="text-xl leading-relaxed text-[#555] mb-12">
            دقة فائقة وسهولة تامة في الاستخدام. ميزان حرارة مصمم خصيصاً لتلبية احتياجات المطابخ الاحترافية والمنزلية، مع بنية متينة صُممت لتدوم طويلاً.
          </p>

          <button 
            @click="scrollToForm"
            class="bg-[#3D5A50] text-[#F5F1EE] px-16 py-6 rounded-2xl text-2xl font-extrabold transition-all duration-200 hover:shadow-xl active:scale-[0.97] hover:bg-[#3D5A50]/90"
          >
            اطلب الآن
          </button>
        </div>
      </div>
    </section>

    <section id="order-form" class="max-w-3xl mx-auto py-24 px-6">
      <div class="bg-white p-12 md:p-16 rounded-[3rem] shadow-lg border border-[#E5E0DA]">
        
        <div v-if="submitted" class="text-center py-10 transition-all duration-500">
          <div class="w-32 h-32 bg-[#A7F3D0] rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
            <span class="text-7xl text-[#065F46]">✓</span>
          </div>
          <h2 class="text-4xl font-bold mb-4">تم استلام طلبك بنجاح!</h2>
          <p class="text-xl text-[#555]">سنتواصل معك قريباً لتأكيد تفاصيل التوصيل. شكراً لثقتكم.</p>
        </div>

        <form 
          v-else
          name="thermometer-orders" 
          method="POST" 
          data-netlify="true" 
          data-netlify-honeypot="bot-field"
          @submit.prevent="handleSubmit"
          class="space-y-8"
        >
          <input type="hidden" name="form-name" value="thermometer-orders" />
          <input type="hidden" name="quantity" :value="quantity" />
          <input type="hidden" name="total_price" :value="totalPrice + ' د.ل'" />
          
          <p class="hidden" style="display: none;">
            <label>Don’t fill this out: <input name="bot-field" /></label>
          </p>

          <h2 class="text-4xl font-bold text-center mb-12">بيانات التوصيل</h2>
          
          <div class="space-y-3">
            <label class="block text-sm font-semibold opacity-70 mr-2">الاسم بالكامل</label>
            <input required name="name" type="text" class="w-full p-6 bg-[#F8F6F4] border border-[#E5E0DA] rounded-2xl focus:ring-2 focus:ring-[#3D5A50] focus:border-[#3D5A50] outline-none transition-all placeholder:text-gray-400" placeholder="اكتب اسمك هنا...">
          </div>
          
          <div class="space-y-3">
            <label class="block text-sm font-semibold opacity-70 mr-2">رقم الهاتف</label>
            <input required name="phone" type="tel" dir="ltr" class="w-full p-6 bg-[#F8F6F4] border border-[#E5E0DA] rounded-2xl focus:ring-2 focus:ring-[#3D5A50] focus:border-[#3D5A50] outline-none transition-all placeholder:text-gray-400 text-right" placeholder="09X-XXXXXXX">
          </div>

          <div class="space-y-3">
            <label class="block text-sm font-semibold opacity-70 mr-2">المدينة</label>
            <div class="relative">
              <select name="city" required v-model="selectedCity" class="w-full p-6 bg-[#F8F6F4] border border-[#E5E0DA] rounded-2xl focus:ring-2 focus:ring-[#3D5A50] focus:border-[#3D5A50] outline-none transition-all appearance-none cursor-pointer text-[#333]">
                <option value="" disabled selected>اختر المدينة</option>
                <option value="طرابلس">طرابلس</option>
                <option value="بنغازي">بنغازي</option>
                <option value="مصراتة">مصراتة</option>
                <option value="الزاوية">الزاوية</option>
                <option value="مدينة أخرى">مدينة أخرى</option>
              </select>
              <span class="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-xl">▼</span>
            </div>
            
            <div v-if="selectedCity === 'مدينة أخرى'" class="pt-2 transition-all duration-300">
              <input 
                v-model="customCity" 
                type="text" 
                required 
                class="w-full p-6 bg-white border-2 border-[#3D5A50]/30 rounded-2xl focus:ring-2 focus:ring-[#3D5A50] focus:border-[#3D5A50] outline-none transition-all placeholder:text-gray-400" 
                placeholder="الرجاء كتابة اسم مدينتك هنا..."
              >
            </div>
          </div>

          <div class="space-y-3">
            <label class="block text-sm font-semibold opacity-70 mr-2">العنوان بالتفصيل</label>
            <textarea required name="address" rows="3" class="w-full p-6 bg-[#F8F6F4] border border-[#E5E0DA] rounded-2xl focus:ring-2 focus:ring-[#3D5A50] focus:border-[#3D5A50] outline-none transition-all resize-none placeholder:text-gray-400" placeholder="اسم الشارع، رقم المنزل، أو علامة دالة..."></textarea>
          </div>

          <div class="bg-[#F8F6F4] p-6 rounded-2xl border border-[#E5E0DA] mt-8">
            <div class="flex items-center justify-between mb-4">
              <span class="font-bold text-lg">الكمية المطلوبة:</span>
              <div class="flex items-center bg-white rounded-xl border border-[#E5E0DA] shadow-sm overflow-hidden">
                <button type="button" @click="incrementQuantity" class="w-12 h-12 flex items-center justify-center text-2xl hover:bg-gray-50 active:bg-gray-100 transition-colors text-[#3D5A50]">+</button>
                <span class="w-12 text-center font-bold text-xl">{{ quantity }}</span>
                <button type="button" @click="decrementQuantity" class="w-12 h-12 flex items-center justify-center text-2xl hover:bg-gray-50 active:bg-gray-100 transition-colors text-gray-500" :class="{'opacity-50 cursor-not-allowed': quantity === 1}">-</button>
              </div>
            </div>
            <div class="flex items-center justify-between pt-4 border-t border-[#E5E0DA]">
              <span class="font-bold text-xl text-gray-500">الإجمالي:</span>
              <span class="font-extrabold text-3xl text-[#3D5A50]">{{ totalPrice }} د.ل</span>
            </div>
          </div>

          <button type="submit" class="w-full bg-[#3D5A50] text-[#F5F1EE] py-7 rounded-2xl text-2xl font-extrabold mt-6 hover:shadow-xl transition-all duration-200 active:scale-[0.98] hover:bg-[#3D5A50]/90 flex items-center justify-center gap-3">
            <span>تأكيد الطلب بـ {{ totalPrice }} د.ل</span>
            <span class="text-xl">←</span>
          </button>
          
          <div class="flex items-center justify-center gap-2 mt-4 text-sm font-medium text-center text-[#555] bg-[#F8F6F4]/50 py-3 rounded-full border border-[#E5E0DA]/50">
            <span class="text-[#3D5A50] font-bold">✓</span> الدفع نقداً عند الاستلام
          </div>
        </form>

      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const submitted = ref(false)

// Data tracking for the custom city logic
const selectedCity = ref('')
const customCity = ref('')

// Photos
const thermometerPhotos = [
  '/H426a766f44894b18887f0a825cb36703p.jpg'
]

// --- PRICING & QUANTITY LOGIC ---
const unitPrice = 75 
const quantity = ref(1)

const totalPrice = computed(() => {
  return quantity.value * unitPrice
})

const incrementQuantity = () => {
  quantity.value++
}

const decrementQuantity = () => {
  if (quantity.value > 1) {
    quantity.value--
  }
}
// --------------------------------

// --- SLIDER LOGIC ---
const currentIndex = ref(0)
let touchStartX = 0
let touchEndX = 0

const nextSlide = () => {
  currentIndex.value = currentIndex.value === thermometerPhotos.length - 1 ? 0 : currentIndex.value + 1
}

const prevSlide = () => {
  currentIndex.value = currentIndex.value === 0 ? thermometerPhotos.length - 1 : currentIndex.value - 1
}

const goToSlide = (index) => {
  currentIndex.value = index
}

const handleTouchStart = (e) => {
  touchStartX = e.changedTouches[0].screenX
}

const handleTouchEnd = (e) => {
  touchEndX = e.changedTouches[0].screenX
  handleSwipe()
}

const handleSwipe = () => {
  if (touchEndX < touchStartX - 50) nextSlide()
  if (touchEndX > touchStartX + 50) prevSlide()
}
// --------------------

const scrollToForm = () => {
  document.getElementById('order-form')?.scrollIntoView({ behavior: 'smooth' })
}

const handleSubmit = async (e) => {
  const form = e.target
  const formData = new FormData(form)

  // THE MAGIC FIX:
  // If they selected "Another City" and typed a custom city, 
  // we replace the 'city' data with whatever they typed before sending it to Netlify!
  if (selectedCity.value === 'مدينة أخرى' && customCity.value.trim() !== '') {
    formData.set('city', customCity.value)
  }

  try {
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
