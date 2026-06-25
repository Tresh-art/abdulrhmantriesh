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
        <div class="mt-4 flex flex-wrap justify-center gap-3 text-sm text-[#555]">
          <span class="bg-white border border-[#E5E0DA] rounded-full px-4 py-1.5 font-medium">🚚 توصيل لجميع مدن ليبيا</span>
          <span class="bg-white border border-[#E5E0DA] rounded-full px-4 py-1.5 font-medium">✅ جودة مضمونة</span>
          <span class="bg-white border border-[#E5E0DA] rounded-full px-4 py-1.5 font-medium">🔄 ضمان استرجاع 7 أيام</span>
        </div>
      </nav>

      <div class="w-full max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12">

        <div class="cursor-pointer group" @click="openProduct('thermometer')">
          <div class="w-full overflow-hidden rounded-[2rem] md:rounded-[2.5rem] shadow-xl border border-[#E5E0DA] bg-white aspect-square">
            <img :src="'/footer/pro-1.jpg.jpg'" alt="ميزان الحرارة الاحترافي" loading="lazy" class="w-full h-full object-cover transition-transform duration-[4000ms] group-hover:scale-105" />
          </div>
          <div class="mt-5 md:mt-8 text-center flex flex-col items-center">
            <h2 class="text-2xl md:text-4xl font-black mb-2 md:mb-3 text-[#333] leading-tight">ميزان الحرارة الاحترافي</h2>
            <p class="text-base md:text-lg text-[#555] opacity-70 mb-5 md:mb-7 font-medium leading-relaxed">
              مقاوم للماء، قراءة فورية، مثالي للحوم والشواء والحلويات.
            </p>
            <div class="px-10 md:px-14 py-3 md:py-4 bg-white border border-[#E5E0DA] rounded-2xl text-base md:text-lg font-bold text-[#333] shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1 active:scale-95 group-hover:bg-gray-50">
              استكشف المنتج
            </div>
          </div>
        </div>

        <div class="cursor-pointer group" @click="openProduct('product-two')">
          <div class="w-full overflow-hidden rounded-[2rem] md:rounded-[2.5rem] shadow-xl border border-[#E5E0DA] bg-white aspect-square">
            <img :src="'/footer/basic-1.jpg.jpg'" alt="ميزان حرارة البداية" loading="lazy" class="w-full h-full object-cover transition-transform duration-[4000ms] group-hover:scale-105" />
          </div>
          <div class="mt-5 md:mt-8 text-center flex flex-col items-center">
            <h2 class="text-2xl md:text-4xl font-black mb-2 md:mb-3 text-[#333] leading-tight">ميزان حرارة البداية</h2>
            <p class="text-base md:text-lg text-[#555] opacity-70 mb-5 md:mb-7 font-medium leading-relaxed">
              أول خطوة في رحلتك مع الطبخ الاحترافي. سهل، دقيق، بسعر مناسب.
            </p>
            <div class="px-10 md:px-14 py-3 md:py-4 bg-white border border-[#E5E0DA] rounded-2xl text-base md:text-lg font-bold text-[#333] shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1 active:scale-95 group-hover:bg-gray-50">
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

          <!-- PHOTOS -->
          <div class="w-full lg:w-3/5">
            <div class="relative w-full aspect-[4/5] bg-white rounded-[2.5rem] md:rounded-[3rem] overflow-hidden shadow-2xl border border-[#E5E0DA] group">
              <img :src="activeProductData.photos[currentIndex]" alt="صورة المنتج" class="w-full h-full object-cover transition-opacity duration-700" />
              <button @click="prevSlide" class="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 bg-white/90 w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center shadow-xl opacity-0 group-hover:opacity-100 transition-opacity">❯</button>
              <button @click="nextSlide" class="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 bg-white/90 w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center shadow-xl opacity-0 group-hover:opacity-100 transition-opacity">❮</button>
              <div class="absolute bottom-6 md:bottom-10 left-0 right-0 flex justify-center gap-3">
                <button v-for="(_, i) in activeProductData.photos" :key="i" @click="currentIndex = i"
                  class="h-1.5 rounded-full transition-all duration-500"
                  :class="currentIndex === i ? 'bg-[#3D5A50] w-8 md:w-10' : 'bg-gray-300 w-2 md:w-3'"></button>
              </div>
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
          </div>

          <!-- PRODUCT INFO -->
          <div class="w-full lg:w-2/5 text-right">
            <h1 class="text-4xl md:text-6xl font-black mb-4 md:mb-6 text-[#333] leading-relaxed">{{ activeProductData.title }}</h1>
            <div class="text-3xl md:text-5xl font-extrabold text-[#3D5A50] mb-2 md:mb-3">{{ activeProductData.price }} د.ل</div>

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
                    <span class="font-bold text-[#3D5A50]">{{ activeProductData.price * quantity }} د.ل</span>
                    <span class="text-[#555]">سعر المنتج</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="font-bold text-[#3D5A50]">{{ shippingCost }} د.ل</span>
                    <span class="text-[#555]">رسوم التوصيل</span>
                  </div>
                  <div class="flex justify-between pt-3 border-t border-[#E5E0DA]">
                    <span class="font-black text-xl text-[#333]">{{ activeProductData.price * quantity + shippingCost }} د.ل</span>
                    <span class="font-bold text-[#333]">الإجمالي</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="font-bold">{{ quantity }}</span>
                    <span class="text-[#555]">الكمية</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="font-bold">{{ activeProductData.title }}</span>
                    <span class="text-[#555]">المنتج</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="font-bold">{{ selectedCity }}</span>
                    <span class="text-[#555]">المدينة</span>
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

                <input required v-model="formName" type="text" placeholder="الاسم بالكامل"
                  class="w-full p-5 md:p-6 bg-[#F8F6F4] rounded-2xl border-none focus:ring-2 focus:ring-[#3D5A50] outline-none text-lg">

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

                <!-- CITY SEARCHABLE DROPDOWN -->
                <div class="relative">
                  <input
                    v-model="citySearch"
                    type="text"
                    placeholder="ابحث عن مدينتك..."
                    @focus="showCityDropdown = true"
                    @blur="handleCityBlur"
                    @input="selectedCity = ''; shippingCost = 0"
                    autocomplete="off"
                    class="w-full p-5 md:p-6 bg-[#F8F6F4] rounded-2xl border-none focus:ring-2 focus:ring-[#3D5A50] outline-none text-lg"
                  />
                  <div v-if="selectedCity && shippingCost > 0"
                    class="absolute left-4 top-1/2 -translate-y-1/2 bg-[#3D5A50] text-white text-sm font-bold px-3 py-1 rounded-xl">
                    🚚 {{ shippingCost }} د.ل
                  </div>
                  <div
                    v-if="showCityDropdown && filteredCities.length"
                    class="absolute z-50 w-full mt-2 bg-white border border-[#E5E0DA] rounded-2xl shadow-xl max-h-56 overflow-y-auto"
                  >
                    <div
                      v-for="item in filteredCities"
                      :key="item.name"
                      @mousedown.prevent="selectCity(item)"
                      class="flex items-center justify-between px-6 py-4 text-lg cursor-pointer hover:bg-[#F8F6F4] transition-colors border-b border-[#F0EDE8] last:border-none"
                    >
                      <span class="text-[#3D5A50] font-bold text-sm bg-[#F0F7F4] px-2 py-0.5 rounded-lg">{{ item.price }} د.ل</span>
                      <span>{{ item.name }}</span>
                    </div>
                  </div>
                  <p v-if="cityError" class="text-red-500 text-sm mt-2 text-right">يرجى اختيار مدينة من القائمة</p>
                </div>

                <textarea
                  required
                  v-model="formAddress"
                  placeholder="العنوان بالتفصيل — المنطقة، الشارع، أقرب معلم"
                  rows="3"
                  class="w-full p-5 md:p-6 bg-[#F8F6F4] rounded-2xl border-none focus:ring-2 focus:ring-[#3D5A50] outline-none text-lg resize-none"
                ></textarea>

                <!-- QUANTITY + PRICE BREAKDOWN -->
                <div class="bg-[#F8F6F4] p-6 md:p-8 rounded-3xl space-y-4 md:space-y-5 text-lg">
                  <div class="flex justify-between items-center">
                    <div class="flex items-center bg-white rounded-xl border border-[#E5E0DA] overflow-hidden shadow-sm">
                      <button type="button" @click="quantity++" class="w-12 md:w-14 h-12 md:h-14 text-xl md:text-2xl hover:bg-gray-50 active:bg-gray-100 transition-all">+</button>
                      <span class="w-12 md:w-14 text-center font-bold">{{ quantity }}</span>
                      <button type="button" @click="quantity > 1 ? quantity-- : null" class="w-12 md:w-14 h-12 md:h-14 text-xl md:text-2xl hover:bg-gray-50 active:bg-gray-100 transition-all">-</button>
                    </div>
                    <span class="font-bold">الكمية</span>
                  </div>
                  <div class="border-t border-[#E5E0DA] pt-4 space-y-3">
                    <div class="flex justify-between items-center text-base text-[#555]">
                      <span class="font-semibold">{{ productSubtotal }} د.ل</span>
                      <span>سعر المنتج</span>
                    </div>
                    <div class="flex justify-between items-center text-base">
                      <span v-if="shippingCost > 0" class="font-semibold text-[#555]">{{ shippingCost }} د.ل</span>
                      <span v-else class="text-gray-400 text-sm">اختر مدينتك أولاً</span>
                      <span class="text-[#555]">رسوم التوصيل 🚚</span>
                    </div>
                    <div class="flex justify-between items-center pt-3 border-t border-[#E5E0DA]">
                      <span class="text-3xl md:text-4xl font-black text-[#3D5A50]">
                        {{ shippingCost > 0 ? grandTotal + ' د.ل' : productSubtotal + ' د.ل +🚚' }}
                      </span>
                      <span class="font-bold text-[#333]">الإجمالي</span>
                    </div>
                  </div>
                </div>

                <p v-if="formError" class="text-red-500 text-sm text-center">{{ formError }}</p>

                <button type="submit" :disabled="isSubmitting"
                  class="w-full bg-[#3D5A50] text-white py-6 md:py-8 rounded-[2rem] text-xl md:text-2xl font-black hover:shadow-2xl active:scale-95 transition-all duration-300 disabled:opacity-50">
                  {{ isSubmitting ? 'جاري الإرسال...' : 'تأكيد الطلب الآن' }}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>

    <!-- FOOTER -->
    <footer class="bg-white border-t border-[#E5E0DA]">
      <div class="max-w-6xl mx-auto px-6 py-10 md:py-14 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-right">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0" style="background-color: #3D5A50;">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <ellipse cx="10" cy="14" rx="7" ry="5" fill="white" opacity="0.95"/>
              <rect x="16.5" y="13" width="6" height="2.2" rx="1.1" fill="white" opacity="0.95"/>
            </svg>
          </div>
          <div class="text-right">
            <div class="font-black text-base text-[#333]">المتجر</div>
            <div class="text-xs text-[#777] mt-0.5">أدوات مطبخ احترافية</div>
          </div>
        </div>
        <p class="text-sm text-[#777] max-w-sm leading-relaxed">
          توصيل سريع لجميع مدن ليبيا عبر درب السبيل.
        </p>
        <div class="flex flex-col items-center md:items-end gap-2">
          <a href="tel:+905013681310" class="flex items-center gap-2 text-sm font-bold text-[#3D5A50] hover:underline" dir="ltr">
            📞 +905013681310
          </a>
          <a href="https://wa.me/905013681310" target="_blank" class="flex items-center gap-2 text-sm font-bold hover:underline" style="color:#25D366">
            💬 تواصل عبر واتساب
          </a>
        </div>
      </div>
      <div class="border-t border-[#E5E0DA] py-4 text-center text-xs text-[#AAA]">
        جميع الحقوق محفوظة © {{ new Date().getFullYear() }}
      </div>
    </footer>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const view = ref('home')
const activeProduct = ref('thermometer')
const submitted = ref(false)
const currentIndex = ref(0)
const quantity = ref(1)
const formName = ref('')
const formPhone = ref('')
const formAddress = ref('')
const phoneError = ref(false)
const formError = ref('')
const isSubmitting = ref(false)

// City search
const citySearch = ref('')
const selectedCity = ref('')
const shippingCost = ref(0)
const showCityDropdown = ref(false)
const cityError = ref(false)

// Darb Al Sabil prices
const allCities = [
  { name: 'داخل طرابلس', price: 15 },
  { name: 'انجيلة', price: 20 },
  { name: 'الكريمية', price: 20 },
  { name: 'الماية', price: 20 },
  { name: 'الزاوية', price: 20 },
  { name: 'المطرد', price: 20 },
  { name: 'القره بولي', price: 20 },
  { name: 'قماطة', price: 20 },
  { name: 'قصر خيار', price: 20 },
  { name: 'الخمس', price: 20 },
  { name: 'زليتن', price: 20 },
  { name: 'السواني', price: 25 },
  { name: 'الزهراء', price: 25 },
  { name: 'الساعدية', price: 25 },
  { name: 'العزيزية', price: 25 },
  { name: 'السبيعة', price: 25 },
  { name: 'قصر بن غشير', price: 25 },
  { name: 'سوق الخميس مسبحل', price: 25 },
  { name: 'حلة الفرجان', price: 25 },
  { name: 'وادي الربيع', price: 25 },
  { name: 'الباعيش', price: 25 },
  { name: 'سوق السبت', price: 25 },
  { name: 'طرابلس', price: 25 },
  { name: 'مسلاتة', price: 25 },
  { name: 'غريان', price: 25 },
  { name: 'ورشفانة', price: 30 },
  { name: 'صرمان', price: 30 },
  { name: 'صبراتة', price: 30 },
  { name: 'زوارة', price: 30 },
  { name: 'العجيلات', price: 30 },
  { name: 'الجميل', price: 30 },
  { name: 'راقدالين', price: 30 },
  { name: 'زلطن', price: 30 },
  { name: 'ترهونة', price: 30 },
  { name: 'بني وليد', price: 30 },
  { name: 'سرت', price: 30 },
  { name: 'هراوة', price: 30 },
  { name: 'النوفلية', price: 30 },
  { name: 'بن جواد', price: 30 },
  { name: 'راس لانوف', price: 30 },
  { name: 'اجدابيا', price: 30 },
  { name: 'بنغازي', price: 30 },
  { name: 'هون', price: 35 },
  { name: 'سوكنة', price: 35 },
  { name: 'الودان', price: 35 },
  { name: 'الجفرة', price: 35 },
  { name: 'توكرة', price: 35 },
  { name: 'المرج', price: 35 },
  { name: 'البيضاء', price: 35 },
  { name: 'قمينس', price: 35 },
  { name: 'سلوق', price: 35 },
  { name: 'الاصابعة', price: 35 },
  { name: 'الرابطة', price: 35 },
  { name: 'القواليش', price: 35 },
  { name: 'العوينة', price: 35 },
  { name: 'القلعة', price: 35 },
  { name: 'يفرن', price: 35 },
  { name: 'مزدة', price: 35 },
  { name: 'الشويرف', price: 35 },
  { name: 'الفريات', price: 35 },
  { name: 'سبها', price: 35 },
  { name: 'راس أجدير', price: 40 },
  { name: 'زلة', price: 40 },
  { name: 'شحات', price: 40 },
  { name: 'سوسة', price: 40 },
  { name: 'درنة', price: 40 },
  { name: 'القبة', price: 40 },
  { name: 'طبرق', price: 40 },
  { name: 'الرجبان', price: 40 },
  { name: 'جادو', price: 40 },
  { name: 'كاباو', price: 40 },
  { name: 'الرقيعات', price: 40 },
  { name: 'براك', price: 40 },
  { name: 'الشاطي', price: 40 },
  { name: 'تيجي', price: 45 },
  { name: 'بدر', price: 45 },
  { name: 'الجوش', price: 45 },
  { name: 'أوباري', price: 45 },
  { name: 'ام الارانب', price: 45 },
  { name: 'وادي عتبة', price: 45 },
  { name: 'مرزق', price: 45 },
  { name: 'القطرون', price: 45 },
  { name: 'امساعد', price: 50 },
  { name: 'غات', price: 50 },
  { name: 'جالو', price: 50 },
  { name: 'اوجلة', price: 50 },
  { name: 'الواحات', price: 50 },
  { name: 'الكفرة', price: 50 },
]

const filteredCities = computed(() => {
  const q = citySearch.value.trim()
  if (!q) return allCities
  return allCities.filter(c => c.name.includes(q))
})

const selectCity = (item) => {
  selectedCity.value = item.name
  shippingCost.value = item.price
  citySearch.value = item.name
  showCityDropdown.value = false
  cityError.value = false
}

const handleCityBlur = () => {
  setTimeout(() => { showCityDropdown.value = false }, 150)
}

const products = {
  thermometer: {
    title: 'ميزان الحرارة الاحترافي',
    description: 'مقاوم للماء بالكامل IP67 — يمكن غسله تحت الماء مباشرة. مسبار من الفولاذ المقاوم للصدأ آمن تماماً للطعام. قراءة فورية في 2-4 ثواني بدقة ±1 درجة. مدى قياس واسع من -50 إلى 300 درجة يغطي كل احتياجاتك — من الشواء والحوم إلى الحلويات والشوكولاتة والقلي العميق. تصميم قابل للطي يحمي المسبار ويدوم طويلاً.',
    price: 75,
    photos: [
      '/footer/pro-1.jpg.jpg',
      '/footer/pro-2.jpg.jpg',
      '/footer/pro-3.jpg.jpg',
      '/footer/pro-4.jpg.jpg',
      '/footer/pro-5.jpg.jpg'
    ],
    forWho: [
      'تهتم بطهي اللحوم بالدرجة الصحيحة',
      'تحضر الحلويات والشوكولاتة وتحتاج دقة عالية',
      'تريد أداة احترافية تدوم لسنوات',
      'تطبخ بشكل منتظم وتريد الأفضل'
    ]
  },
  'product-two': {
    title: 'ميزان حرارة البداية',
    description: 'أول خطوة في رحلتك مع الطبخ الاحترافي. سهل الاستخدام، دقيق، ومدى قياسه من -50 إلى 300 درجة. مناسب للحوم، الحليب، الزيت، والحلويات. كل ما تحتاجه بسعر في متناول الجميع.',
    price: 35,
    photos: [
      '/footer/basic-1.jpg.jpg',
      '/footer/basic-2.jpg.jpg',
      '/footer/basic-3.jpg.jpg',
      '/footer/basic-4.jpg.jpg',
      '/footer/basic-5.jpg.jpg'
    ],
    forWho: [
      'تبدأ لأول مرة باستخدام ميزان الحرارة في الطبخ',
      'تريد تجربة الفرق قبل الاستثمار في أداة أغلى',
      'تطبخ بشكل عرضي ولا تحتاج ميزان احترافي',
      'تريد هدية عملية بسعر مناسب'
    ]
  }
}

const activeProductData = computed(() => products[activeProduct.value])
const productSubtotal = computed(() => quantity.value * activeProductData.value.price)
const grandTotal = computed(() => productSubtotal.value + shippingCost.value)

const openProduct = (id) => {
  activeProduct.value = id
  view.value = 'product'
  currentIndex.value = 0
  quantity.value = 1
  submitted.value = false
  formName.value = ''
  formPhone.value = ''
  formAddress.value = ''
  citySearch.value = ''
  selectedCity.value = ''
  shippingCost.value = 0
  phoneError.value = false
  cityError.value = false
  formError.value = ''
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % activeProductData.value.photos.length
}
const prevSlide = () => {
  currentIndex.value = currentIndex.value === 0 ? activeProductData.value.photos.length - 1 : currentIndex.value - 1
}

const handleSubmit = async () => {
  phoneError.value = false
  cityError.value = false
  formError.value = ''

  const cleanPhone = formPhone.value.replace(/[\s\-+]/g, '')
  // must be at least 9 digits, all numeric, and not all the same digit
  const isAllSame = /^(\d)\1+$/.test(cleanPhone)
  if (cleanPhone.length < 9 || !/^\d+$/.test(cleanPhone) || isAllSame) {
    phoneError.value = true
    return
  }

  if (!selectedCity.value) {
    cityError.value = true
    return
  }

  isSubmitting.value = true

  try {
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({
        access_key: 'aec1084b-17ee-4867-8abc-7bcaa8d580b0',
        subject: `طلب جديد: ${activeProductData.value.title}`,
        from_name: 'متجر عبدالرحمن طريش',
        الاسم: formName.value,
        الهاتف: formPhone.value,
        المدينة: selectedCity.value,
        العنوان: formAddress.value,
        المنتج: activeProductData.value.title,
        الكمية: quantity.value,
        'سعر المنتج': `${productSubtotal.value} د.ل`,
        'رسوم التوصيل': `${shippingCost.value} د.ل`,
        'الإجمالي الكامل': `${grandTotal.value} د.ل`
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
