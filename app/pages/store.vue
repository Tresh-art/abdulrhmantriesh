<template>
  <div class="bg-[#F8F6F4] min-h-screen font-sans text-[#333]" dir="rtl">

    <!-- WhatsApp Floating Button -->
    <a
      href="https://wa.me/905013681310"
      target="_blank"
      class="fixed bottom-6 left-6 z-50 flex items-center justify-center w-16 h-16 rounded-full shadow-2xl transition-transform duration-300 hover:scale-110 active:scale-95"
      style="background-color: #25D366;"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" fill="white">
        <path d="M16 0C7.164 0 0 7.163 0 16c0 2.822.736 5.469 2.027 7.77L0 32l8.454-2.01A15.937 15.937 0 0 0 16 32c8.836 0 16-7.163 16-16S24.836 0 16 0zm0 29.333a13.27 13.27 0 0 1-6.748-1.833l-.484-.287-5.016 1.193 1.234-4.874-.316-.5A13.226 13.226 0 0 1 2.667 16C2.667 8.636 8.636 2.667 16 2.667S29.333 8.636 29.333 16 23.364 29.333 16 29.333zm7.27-9.77c-.398-.199-2.352-1.16-2.717-1.292-.364-.133-.63-.199-.895.199-.266.398-1.03 1.292-1.262 1.558-.232.266-.465.299-.863.1-.398-.2-1.681-.62-3.2-1.974-1.183-1.054-1.981-2.356-2.213-2.754-.232-.398-.025-.613.174-.811.179-.178.398-.465.597-.698.2-.232.266-.398.398-.664.133-.265.067-.498-.033-.697-.1-.2-.895-2.157-1.227-2.953-.322-.775-.65-.67-.895-.682l-.763-.013c-.265 0-.697.1-1.062.498-.364.398-1.393 1.36-1.393 3.317s1.426 3.847 1.625 4.113c.199.265 2.806 4.283 6.798 6.006.95.41 1.692.655 2.27.839.953.304 1.821.261 2.507.158.765-.114 2.352-.961 2.684-1.889.332-.928.332-1.724.232-1.889-.099-.166-.364-.265-.763-.464z"/>
      </svg>
    </a>

    <!-- HOME VIEW -->
    <div v-if="view === 'home'" class="flex flex-col gap-12 md:gap-32 pb-40">
      
      <nav class="pt-12 md:pt-20 px-6 text-center max-w-4xl mx-auto">
        <p class="text-lg md:text-xl leading-relaxed text-[#3D5A50] font-medium opacity-80">
          نوفر لك أحدث أدوات المطبخ الذكية لتجربة طهي احترافية وسهلة.
        </p>
      </nav>

      <div class="w-full max-w-6xl mx-auto px-6 cursor-pointer" @click="openProduct('thermometer')">
        <div class="group">
          <div class="w-full overflow-hidden rounded-[2.5rem] md:rounded-[3rem] shadow-xl border border-[#E5E0DA] bg-[#3D5A50] flex items-center justify-center" style="min-height:400px;">
            <span class="text-white text-2xl font-bold">ميزان الحرارة الاحترافي</span>
          </div>
          <div class="mt-4 md:mt-12 text-center flex flex-col items-center">
            <h2 class="text-4xl md:text-6xl font-black mb-1 md:mb-4 text-[#333] leading-tight">ميزان الحرارة الاحترافي</h2>
            <p class="text-lg md:text-2xl text-[#555] opacity-70 mb-6 md:mb-10 font-medium leading-relaxed max-w-2xl">
              مقاوم للماء، قراءة فورية، مثالي للحوم والشواء والحلويات.
            </p>
            <div class="px-12 md:px-20 py-4 md:py-6 bg-white border border-[#E5E0DA] rounded-2xl text-lg md:text-xl font-bold text-[#333] shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1 active:scale-95 group-hover:bg-gray-50">
              استكشف المنتج
            </div>
          </div>
        </div>
      </div>

      <div class="w-full max-w-6xl mx-auto px-6 cursor-pointer" @click="openProduct('product-two')">
        <div class="group">
          <div class="w-full overflow-hidden rounded-[2.5rem] md:rounded-[3rem] shadow-xl border border-[#E5E0DA] bg-[#333] flex items-center justify-center" style="min-height:400px;">
            <span class="text-white text-2xl font-bold">ميزان حرارة البداية</span>
          </div>
          <div class="mt-4 md:mt-12 text-center flex flex-col items-center">
            <h2 class="text-4xl md:text-6xl font-black mb-1 md:mb-4 text-[#333] leading-tight">ميزان حرارة البداية</h2>
            <p class="text-lg md:text-2xl text-[#555] opacity-70 mb-6 md:mb-10 font-medium leading-relaxed max-w-2xl">
              أول خطوة في رحلتك مع الطبخ الاحترافي. سهل، دقيق، بسعر مناسب.
            </p>
            <div class="px-12 md:px-20 py-4 md:py-6 bg-white border border-[#E5E0DA] rounded-2xl text-lg md:text-xl font-bold text-[#333] shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1 active:scale-95 group-hover:bg-gray-50">
              استكشف المنتج
            </div>
          </div>
        </div>
      </div>

    </div>

    <!-- PRODUCT VIEW -->
    <div v-else-if="view === 'product'" class="animate-in">
      <nav class="p-6 md:p-8 flex justify-start items-center max-w-7xl mx-auto">
        <button @click="view = 'home'" class="text-[#3D5A50] font-bold text-base md:text-lg flex items-center gap-3 hover:gap-5 transition-all p-3 px-6 md:px-8 rounded-full bg-white shadow-sm border border-[#E5E0DA]">
          <span>→</span> العودة للرئيسية
        </button>
      </nav>

      <section class="max-w-7xl mx-auto pt-4 md:pt-6 px-6 pb-24">
        <div class="flex flex-col lg:flex-row items-start gap-12 md:gap-24">
          
          <!-- PHOTO PLACEHOLDER -->
          <div class="w-full lg:w-3/5">
            <div class="relative w-full aspect-[4/5] rounded-[2.5rem] md:rounded-[3rem] overflow-hidden shadow-2xl border border-[#E5E0DA] flex items-center justify-center"
              :style="{ backgroundColor: activeProduct === 'thermometer' ? '#3D5A50' : '#333' }">
              <span class="text-white text-3xl font-bold text-center px-8">{{ activeProductData.title }}</span>
            </div>

            <!-- WHO IS THIS FOR -->
            <div class="mt-10 md:mt-16 bg-white rounded-3xl p-6 md:p-8 border border-[#E5E0DA] shadow-sm">
              <h3 class="text-2xl md:text-3xl font-black mb-6 text-[#333]">هذا المنتج مناسب لك إذا...</h3>
              <ul class="flex flex-col gap-3">
                <li v-for="point in activeProductData.forWho" :key="point" class="flex items-start gap-3 text-[#555] text-lg leading-relaxed">
                  <span class="text-[#3D5A50] font-black text-xl mt-0.5">✓</span>
                  <span>{{ point }}</span>
                </li>
              </ul>
            </div>

            <!-- REVIEWS SECTION -->
            <div class="mt-10 md:mt-16">
              <h3 class="text-2xl md:text-3xl font-black mb-6 text-[#333]">آراء العملاء</h3>
              <div class="flex flex-col gap-4">
                <div v-for="review in activeProductData.reviews" :key="review.name"
                  class="bg-white rounded-3xl p-6 md:p-8 border border-[#E5E0DA] shadow-sm">
                  <div class="flex items-center justify-between mb-3">
                    <span class="font-bold text-lg text-[#333]">{{ review.name }}</span>
                    <span class="text-yellow-400 text-xl">★★★★★</span>
                  </div>
                  <p class="text-[#555] leading-relaxed">{{ review.text }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- PRODUCT INFO -->
          <div class="w-full lg:w-2/5 text-right">
            <h1 class="text-4xl md:text-6xl font-black mb-4 md:mb-6 text-[#333] leading-relaxed">{{ activeProductData.title }}</h1>
            <div class="text-3xl md:text-5xl font-extrabold text-[#3D5A50] mb-2 md:mb-3">{{ activeProductData.price }} د.ل</div>
            
            <!-- SHIPPING BADGE -->
            <div class="inline-block bg-orange-50 border border-orange-200 rounded-xl px-4 py-2 mb-6 text-right">
              <span class="text-orange-600 font-bold text-sm">⚠️ السعر لا يشمل رسوم التوصيل</span>
            </div>

            <!-- TRUST BADGES -->
            <div class="flex flex-wrap gap-3 mb-6 md:mb-8 justify-end">
              <div class="flex items-center gap-2 bg-white border border-[#E5E0DA] rounded-2xl px-4 py-2 text-sm font-medium text-[#555]">
                <span>🚚</span> توصيل خلال 2-5 أيام
              </div>
              <div class="flex items-center gap-2 bg-white border border-[#E5E0DA] rounded-2xl px-4 py-2 text-sm font-medium text-[#555]">
                <span>🔄</span> ضمان استرجاع 7 أيام
              </div>
              <div class="flex items-center gap-2 bg-white border border-[#E5E0DA] rounded-2xl px-4 py-2 text-sm font-medium text-[#555]">
                <span>✅</span> جودة مضمونة
              </div>
            </div>

            <p class="text-xl md:text-2xl leading-relaxed text-[#555] mb-10 md:mb-12 font-medium">{{ activeProductData.description }}</p>

            <!-- ORDER FORM -->
            <div id="order-section" class="bg-white p-8 md:p-12 rounded-[2.5rem] md:rounded-[3rem] shadow-xl border border-[#E5E0DA]">
              
              <!-- SUCCESS STATE -->
              <div v-if="submitted" class="text-center py-6">
                <div class="w-20 md:w-24 h-20 md:h-24 bg-[#A7F3D0] rounded-full flex items-center justify-center mx-auto mb-6 text-3xl md:text-4xl">✓</div>
                <h2 class="text-2xl md:text-3xl font-bold mb-6">تم استلام طلبك!</h2>
                <div class="bg-[#F8F6F4] rounded-3xl p-6 text-right space-y-3 mb-6">
                  <div class="flex justify-between">
                    <span class="text-[#3D5A50] font-bold">{{ activeProductData.price * quantity }} د.ل</span>
                    <span class="text-[#555]">الإجمالي (بدون توصيل)</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="font-bold">{{ quantity }}</span>
                    <span class="text-[#555]">الكمية</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="font-bold">{{ activeProductData.title }}</span>
                    <span class="text-[#555]">المنتج</span>
                  </div>
                  <div class="pt-3 border-t border-[#E5E0DA] text-sm text-[#777] text-center">
                    سيتم التواصل معك خلال 24 ساعة لتأكيد الطلب
                  </div>
                </div>
                <a href="https://wa.me/905013681310" target="_blank"
                  class="flex items-center justify-center gap-3 w-full py-4 rounded-2xl text-white font-bold text-lg"
                  style="background-color: #25D366">
                  تواصل معنا على واتساب
                </a>
              </div>

              <!-- FORM -->
              <form v-else @submit.prevent="handleSubmit" class="space-y-6 md:space-y-8">
                <h3 class="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-center">بيانات التوصيل</h3>
                
                <input required v-model="formName" type="text" placeholder="الاسم بالكامل" class="w-full p-5 md:p-6 bg-[#F8F6F4] rounded-2xl border-none focus:ring-2 focus:ring-[#3D5A50] outline-none text-lg">
                
                <input 
                  required 
                  v-model="formPhone"
                  type="tel" 
                  dir="ltr" 
                  placeholder="رقم الهاتف (10 أرقام على الأقل)" 
                  minlength="10"
                  pattern="[0-9+\s\-]{10,}"
                  class="w-full p-5 md:p-6 bg-[#F8F6F4] rounded-2xl border-none focus:ring-2 focus:ring-[#3D5A50] outline-none text-lg text-right"
                >
                <p v-if="phoneError" class="text-red-500 text-sm text-right -mt-4">رقم الهاتف يجب أن يحتوي على 10 أرقام على الأقل</p>
                
                <select required v-model="selectedCity" class="w-full p-5 md:p-6 bg-[#F8F6F4] rounded-2xl border-none focus:ring-2 focus:ring-[#3D5A50] outline-none text-lg appearance-none cursor-pointer">
                  <option value="" disabled>اختر المدينة</option>
                  <option value="طرابلس">طرابلس</option>
                  <option value="بنغازي">بنغازي</option>
                  <option value="مصراتة">مصراتة</option>
                  <option value="مدينة أخرى">مدينة أخرى</option>
                </select>

                <div v-if="selectedCity === 'مدينة أخرى'">
                  <input v-model="customCity" type="text" required class="w-full p-5 md:p-6 bg-white border-2 border-[#3D5A50]/20 rounded-2xl" placeholder="اكتب مدينتك هنا...">
                </div>

                <textarea 
                  required 
                  v-model="formAddress"
                  placeholder="العنوان بالتفصيل — المنطقة، الشارع، أقرب معلم" 
                  rows="3"
                  class="w-full p-5 md:p-6 bg-[#F8F6F4] rounded-2xl border-none focus:ring-2 focus:ring-[#3D5A50] outline-none text-lg resize-none"
                ></textarea>

                <div class="bg-[#F8F6F4] p-6 md:p-8 rounded-3xl space-y-4 md:space-y-6 text-lg">
                  <div class="flex justify-between items-center">
                    <span class="font-bold">الكمية</span>
                    <div class="flex items-center bg-white rounded-xl border border-[#E5E0DA] overflow-hidden shadow-sm">
                      <button type="button" @click="quantity++" class="w-12 md:w-14 h-12 md:h-14 text-xl md:text-2xl hover:bg-gray-50 active:bg-gray-100 transition-all">+</button>
                      <span class="w-12 md:w-14 text-center font-bold">{{ quantity }}</span>
                      <button type="button" @click="quantity > 1 ? quantity-- : null" class="w-12 md:w-14 h-12 md:h-14 text-xl md:text-2xl hover:bg-gray-50 active:bg-gray-100 transition-all">-</button>
                    </div>
                  </div>
                  <div class="flex justify-between items-center pt-4 md:pt-6 border-t border-[#E5E0DA]">
                    <span class="text-3xl md:text-4xl font-black text-[#3D5A50]">{{ totalPrice }} د.ل</span>
                    <span class="font-bold text-gray-400">الإجمالي (بدون توصيل)</span>
                  </div>
                </div>

                <p v-if="formError" class="text-red-500 text-sm text-center">{{ formError }}</p>

                <button type="submit" :disabled="isSubmitting" class="w-full bg-[#3D5A50] text-white py-6 md:py-8 rounded-[2rem] text-xl md:text-2xl font-black hover:shadow-2xl active:scale-95 transition-all duration-300 disabled:opacity-50">
                  {{ isSubmitting ? 'جاري الإرسال...' : 'تأكيد الطلب الآن' }}
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
const selectedCity = ref('')
const customCity = ref('')
const formName = ref('')
const formPhone = ref('')
const formAddress = ref('')
const phoneError = ref(false)
const formError = ref('')
const isSubmitting = ref(false)

const products = {
  thermometer: {
    title: 'ميزان الحرارة الاحترافي',
    description: 'مقاوم للماء بالكامل IP67 — يمكن غسله تحت الماء مباشرة. مسبار من الفولاذ المقاوم للصدأ آمن تماماً للطعام. قراءة فورية في 2-4 ثواني بدقة ±1 درجة. مدى قياس واسع من -50 إلى 300 درجة يغطي كل احتياجاتك — من الشواء والحوم إلى الحلويات والشوكولاتة والقلي العميق. تصميم قابل للطي يحمي المسبار ويدوم طويلاً.',
    price: 75,
    forWho: [
      'تهتم بطهي اللحوم بالدرجة الصحيحة',
      'تحضر الحلويات والشوكولاتة وتحتاج دقة عالية',
      'تريد أداة احترافية تدوم لسنوات',
      'تطبخ بشكل منتظم وتريد الأفضل'
    ],
    reviews: [
      { name: 'فاطمة المنصوري', text: 'منتج ممتاز! دقيق جداً ومريح الاستخدام. اشتريته للمطبخ المنزلي وما خذلني. التوصيل كان سريع والتغليف محترم.' },
      { name: 'أحمد الزروق', text: 'جربت ميزانات حرارة كثيرة وهذا الأفضل بفرق. يقرأ الحرارة في ثانية واحدة والشاشة واضحة. أنصح فيه بشدة.' },
      { name: 'مريم البوسيفي', text: 'اشتريته لتحضير الشوكولاتة والحلويات. دقته عالية ومناسب جداً للاستخدام الاحترافي في المنزل. شكراً جزيلاً!' }
    ]
  },
  'product-two': {
    title: 'ميزان حرارة البداية',
    description: 'أول خطوة في رحلتك مع الطبخ الاحترافي. سهل الاستخدام، دقيق، ومدى قياسه من -50 إلى 300 درجة. مناسب للحوم، الحليب، الزيت، والحلويات. كل ما تحتاجه بسعر في متناول الجميع.',
    price: 35,
    forWho: [
      'تبدأ لأول مرة باستخدام ميزان الحرارة في الطبخ',
      'تريد تجربة الفرق قبل الاستثمار في أداة أغلى',
      'تطبخ بشكل عرضي ولا تحتاج ميزان احترافي',
      'تريد هدية عملية بسعر مناسب'
    ],
    reviews: [
      { name: 'سارة العبيدي', text: 'منتج رائع وجودة عالية. سعيدة جداً بالشراء وسأطلب مرة أخرى بالتأكيد.' },
      { name: 'خالد الورفلي', text: 'تجربة شراء ممتازة والمنتج يستحق سعره. التوصيل في الوقت المحدد.' },
      { name: 'نور الهداج', text: 'أفضل من توقعاتي! الجودة ممتازة والتغليف احترافي. شكراً لكم.' }
    ]
  }
}

const activeProductData = computed(() => products[activeProduct.value])
const totalPrice = computed(() => quantity.value * activeProductData.value.price)

const openProduct = (id) => {
  activeProduct.value = id
  view.value = 'product'
  quantity.value = 1
  submitted.value = false
  formName.value = ''
  formPhone.value = ''
  formAddress.value = ''
  selectedCity.value = ''
  customCity.value = ''
  phoneError.value = false
  formError.value = ''
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const handleSubmit = async () => {
  phoneError.value = false
  formError.value = ''

  const cleanPhone = formPhone.value.replace(/[\s\-]/g, '')
  if (cleanPhone.length < 10) {
    phoneError.value = true
    return
  }

  const city = selectedCity.value === 'مدينة أخرى' ? customCity.value : selectedCity.value
  isSubmitting.value = true

  try {
    const response = await fetch('https://formspree.io/f/mredrbwn', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        الاسم: formName.value,
        الهاتف: formPhone.value,
        المدينة: city,
        العنوان: formAddress.value,
        المنتج: activeProductData.value.title,
        الكمية: quantity.value,
        الإجمالي: `${totalPrice.value} د.ل (بدون توصيل)`
      })
    })

    if (response.ok) {
      submitted.value = true
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      formError.value = 'حدث خطأ في الإرسال. يرجى المحاولة مرة أخرى.'
    }
  } catch (error) {
    formError.value = 'حدث خطأ في الإرسال. يرجى المحاولة مرة أخرى.'
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
.animate-in {
  animation: fadeIn 0.8s ease-out forwards;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
