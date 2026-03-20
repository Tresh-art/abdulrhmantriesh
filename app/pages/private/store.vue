<template>
  <div class="store-page bg-white min-h-screen py-12 px-6" dir="rtl">
    <div class="max-w-3xl mx-auto">
      
      <header class="text-center mb-12">
        <h1 class="text-4xl font-bold mb-2">متجر الحلويات</h1>
        <p class="text-gray-500">الدفع عند الاستلام فقط (Libya COD)</p>
      </header>

      <div class="grid gap-8 mb-16">
        <div class="product-card border rounded-2xl p-4 flex flex-col md:flex-row gap-6 shadow-sm">
          <div class="w-full md:w-48 h-48 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0">
             <img src="/cookies.jpg" alt="Product" class="w-full h-full object-cover">
          </div>
          
          <div class="flex-grow">
            <h2 class="text-2xl font-bold mb-2">بوكس الكوكيز المشكل</h2>
            <p class="text-gray-600 mb-4">كوكيز طازجة محضرة يدوياً. البوكس يحتوي على 6 قطع كبيرة.</p>
            <span class="text-2xl font-bold text-green-600">45 LYD</span>
          </div>
        </div>
      </div>

      <section class="bg-gray-50 p-8 rounded-3xl border border-gray-200">
        <h2 class="text-2xl font-bold mb-6 text-center">طلب شراء سريع</h2>
        
        <form name="orders" method="POST" data-netlify="true" class="space-y-4">
          <input type="hidden" name="form-name" value="orders" />

          <div>
            <label class="block mb-1 font-medium">الاسم الكامل</label>
            <input type="text" name="name" required class="w-full p-3 rounded-lg border border-gray-300">
          </div>

          <div>
            <label class="block mb-1 font-medium">رقم الهاتف</label>
            <input type="tel" name="phone" placeholder="09XXXXXXXX" required class="w-full p-3 rounded-lg border border-gray-300">
          </div>

          <div>
            <label class="block mb-1 font-medium">المدينة</label>
            <select name="city" class="w-full p-3 rounded-lg border border-gray-300">
              <option>طرابلس</option>
              <option>بنغازي</option>
              <option>مصراتة</option>
              <option>مدينة أخرى</option>
            </select>
          </div>

          <div class="pt-4">
            <button type="submit" class="w-full bg-black text-white py-4 rounded-xl font-bold text-lg">
              تأكيد الطلب
            </button>
          </div>
        </form>
      </section>

    </div>
  </div>
</template>

<style scoped>
/* This ensures the page looks clean even if global styles are missing */
.store-page {
  font-family: sans-serif;
}
</style>
