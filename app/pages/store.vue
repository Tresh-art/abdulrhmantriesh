<form 
  name="thermometer-orders" 
  method="POST" 
  data-netlify="true" 
  data-netlify-honeypot="bot-field"
  @submit.prevent="handleSubmit"
  class="space-y-6"
>
  <input type="hidden" name="form-name" value="thermometer-orders" />
  
  <p class="hidden">
    <label>Don’t fill this out: <input name="bot-field" /></label>
  </p>

  <h2 class="text-3xl font-bold text-center mb-10">بيانات التوصيل</h2>
  
  <div class="space-y-2">
    <label class="block text-sm font-bold opacity-70 mr-2">الاسم بالكامل</label>
    <input required name="name" type="text" class="w-full p-5 bg-[#F5F1EE] border-none rounded-2xl outline-none" placeholder="اكتب اسمك هنا...">
  </div>
  
  <div class="space-y-2">
    <label class="block text-sm font-bold opacity-70 mr-2">رقم الهاتف</label>
    <input required name="phone" type="tel" dir="ltr" class="w-full p-5 bg-[#F5F1EE] border-none rounded-2xl outline-none text-right" placeholder="09X-XXXXXXX">
  </div>

  <div class="space-y-2">
    <label class="block text-sm font-bold opacity-70 mr-2">العنوان بالتفصيل</label>
    <textarea required name="address" rows="3" class="w-full p-5 bg-[#F5F1EE] border-none rounded-2xl outline-none resize-none" placeholder="اسم الشارع، رقم المنزل..."></textarea>
  </div>

  <button type="submit" class="w-full bg-[#3D2E28] text-[#F5F1EE] py-6 rounded-2xl text-2xl font-bold mt-4 shadow-lg">
    تأكيد الطلب
  </button>
</form>
