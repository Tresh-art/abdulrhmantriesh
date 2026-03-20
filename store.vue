<template>
  <div class="max-w-4xl mx-auto p-6 py-12">
    <header class="text-center mb-12">
      <h1 class="text-4xl font-bold mb-4">متجر الحلويات</h1>
      <p class="text-gray-600">طلب مباشر - الدفع عند الاستلام (Cash on Delivery)</p>
    </header>

    <div class="grid md:grid-cols-2 gap-8 mb-16">
      <div class="bg-white border rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
        <img src="/images/cookies-classic.jpg" alt="Classic Cookies" class="w-full h-64 object-cover">
        <div class="p-6">
          <h3 class="text-2xl font-bold mb-2">بوكس كوكيز كلاسيكي</h3>
          <p class="text-gray-600 mb-4">12 قطعة من الكوكيز الغنية بقطع الشوكولاتة والزبدة البنية.</p>
          <div class="flex justify-between items-center">
            <span class="text-xl font-bold text-green-700">45 LYD</span>
            <span class="bg-gray-100 px-3 py-1 rounded-full text-sm">متوفر</span>
          </div>
        </div>
      </div>
      </div>

    <section class="bg-gray-50 p-8 rounded-3xl border border-dashed border-gray-300">
      <h2 class="text-2xl font-bold mb-6 text-center">معلومات الطلب</h2>
      
      <form name="store-orders" method="POST" data-netlify="true" class="space-y-6">
        <input type="hidden" name="form-name" value="store-orders" />
        
        <div class="grid md:grid-cols-2 gap-4">
          <div>
            <label class="block mb-2 font-medium">الاسم الثلاثي</label>
            <input type="text" name="customer-name" required class="w-full p-3 rounded-xl border focus:ring-2 focus:ring-black outline-none">
          </div>
          <div>
            <label class="block mb-2 font-medium">رقم الهاتف (للتواصل)</label>
            <input type="tel" name="customer-phone" placeholder="09X-XXXXXXX" required class="w-full p-3 rounded-xl border focus:ring-2 focus:ring-black outline-none">
          </div>
        </div>

        <div>
          <label class="block mb-2 font-medium">المدينة</label>
          <select name="city" class="w-full p-3 rounded-xl border outline-none">
            <option>طرابلس</option>
            <option>بنغازي</option>
            <option>مصراتة</option>
            <option>الزاوية</option>
            <option>مدينة أخرى</option>
          </select>
        </div>

        <div>
          <label class="block mb-2 font-medium">العنوان بالتفصيل (أقرب نقطة دالة)</label>
          <textarea name="address" rows="3" class="w-full p-3 rounded-xl border outline-none"></textarea>
        </div>

        <button type="submit" class="w-full bg-black text-white py-4 rounded-xl font-bold text-lg hover:bg-gray-800 transition-colors">
          إرسال الطلب الآن
        </button>
      </form>
    </section>
  </div>
</template>
