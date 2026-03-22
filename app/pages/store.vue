<template>
  <div class="min-h-screen bg-white py-16 px-6" dir="rtl">
    <div class="max-w-xl mx-auto border p-8 rounded-3xl shadow-sm">
      
      <div class="text-center mb-10">
        <h1 class="text-3xl font-bold mb-2">طلب شراء كوكيز</h1>
        <p class="text-gray-500">الدفع عند الاستلام (COD)</p>
      </div>

      <form name="orders" method="POST" data-netlify="true" class="space-y-6">
        <input type="hidden" name="form-name" value="orders" />

        <div>
          <label class="block mb-2 font-medium">الاسم الكامل</label>
          <input type="text" name="customer" required class="w-full p-3 rounded-xl border border-gray-200 bg-gray-50">
        </div>

        <div>
          <label class="block mb-2 font-medium">رقم الهاتف</label>
          <input type="tel" name="phone" required class="w-full p-3 rounded-xl border border-gray-200 bg-gray-50">
        </div>

        <div>
          <label class="block mb-2 font-medium">المدينة</label>
          <select name="city" class="w-full p-3 rounded-xl border border-gray-200 bg-gray-50">
            <option>طرابلس</option>
            <option>بنغازي</option>
            <option>مصراتة</option>
            <option>مدينة أخرى</option>
          </select>
        </div>

        <button type="submit" class="w-full bg-black text-white py-4 rounded-2xl font-bold text-lg">
          إرسال الطلب
        </button>
      </form>

    </div>
  </div>
</template>
