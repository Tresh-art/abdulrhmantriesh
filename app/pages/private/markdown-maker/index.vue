<script setup>
import { ref, computed } from 'vue'

/* ---------------- STATE ---------------- */

const title = ref('')
const category = ref('')
const description = ref('')
const videoUrl = ref('')
const prepTime = ref('')
const servings = ref('')
const difficulty = ref('')
const calories = ref('')
const protein = ref('')
const carbs = ref('')
const fat = ref('')
const ingredients = ref([''])
const steps = ref([{ title: '', content: '' }])
const chefTip = ref('')

const confirmed = ref(false)

/* ---------------- HELPERS ---------------- */

function slugify(text) {
    return text
        .toString()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')
}

function randomString(length = 8) {
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789'
    let result = ''
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return result
}

const generatedSlug = computed(() =>
    title.value ? slugify(title.value) : ''
)

const suggestedImageName = computed(() =>
    randomString(10) + '.jpg/png/jpeg'
)

/* ---------------- DYNAMIC FIELDS ---------------- */

function addIngredient() {
    ingredients.value.push('')
}

function addStep() {
    steps.value.push({ title: '', content: '' })
}

/* ---------------- VALIDATION ---------------- */

const isValid = computed(() => {
    return (
        title.value &&
        category.value &&
        description.value &&
        prepTime.value &&
        servings.value &&
        difficulty.value &&
        ingredients.value.filter(i => i.trim() !== '').length > 0 &&
        steps.value.filter(s => s.title && s.content).length > 0
    )
})

/* ---------------- MARKDOWN GENERATION ---------------- */

const markdownOutput = computed(() => {
    if (!confirmed.value) return ''

    return `---
title: "${title.value}"
category: "${category.value}"
description: "${description.value}"
videoUrl: "${videoUrl.value}"
prepTime: ${prepTime.value}
servings: ${servings.value}
difficulty: "${difficulty.value}"
image: "/food-images/${suggestedImageName.value}"

macros:
  calories: ${calories.value}
  protein: ${protein.value}
  carbs: ${carbs.value}
  fat: ${fat.value}

ingredients:
${ingredients.value
            .filter(i => i.trim() !== '')
            .map(i => `  - "${i}"`)
            .join('\n')}

steps:
${steps.value
            .filter(s => s.title && s.content)
            .map(
                s => `  - title: "${s.title}"
    content: |
      ${s.content.replace(/\n/g, '\n      ')}`
            )
            .join('\n\n')}

chefTip: |
  ${chefTip.value.replace(/\n/g, '\n  ')}
---
`
})

function confirmData() {
    if (!isValid.value) return
    confirmed.value = true
}
</script>

<template>
    <div class="min-h-screen bg-accent px-4 py-6 text-softblack">
        <div class="max-w-md mx-auto space-y-6">

            <h1 class="text-2xl font-bold text-primary text-center my-4 py-4">
                صانع الوصفات
            </h1>

            <!-- BASIC INFO -->
            <div class="space-y-3">
                <input v-model="title" placeholder="عنوان الوصفة"
                    class="w-full p-3 rounded-lg bg-hardwhite border border-graytext" />

                <input v-model="category" placeholder="فئة (حلويات مثلا)"
                    class="w-full p-3 rounded-lg bg-hardwhite border border-graytext" />

                <textarea v-model="description" placeholder="وصف بسيط"
                    class="w-full p-3 rounded-lg bg-hardwhite border border-graytext" />

                <input v-model="videoUrl" placeholder="رابط فيديو"
                    class="w-full p-3 rounded-lg bg-hardwhite border border-graytext" />

                <input v-model="prepTime" type="number" placeholder="وقت التجهيز (دقائق)"
                    class="w-full p-3 rounded-lg bg-hardwhite border border-graytext" />

                <input v-model="servings" type="number" placeholder="الحصة (2،3،4...)"
                    class="w-full p-3 rounded-lg bg-hardwhite border border-graytext" />

                <input v-model="difficulty" placeholder="الصعوبة (سهل / متوسط / صعب)"
                    class="w-full p-3 rounded-lg bg-hardwhite border border-graytext" />
            </div>

            <!-- MACROS -->
            <div class="space-y-2 mt-4">
                <h2 class="text-lg font-semibold text-secondary">ماكروز بالعدد فقط (إختياري)</h2>
                <input v-model="calories" type="number" placeholder="سعرات حرارية"
                    class="w-full p-3 rounded-lg bg-hardwhite border border-graytext" />
                <input v-model="protein" type="number" placeholder="بروتين"
                    class="w-full p-3 rounded-lg bg-hardwhite border border-graytext" />
                <input v-model="carbs" type="number" placeholder="كربوهيدرات"
                    class="w-full p-3 rounded-lg bg-hardwhite border border-graytext" />
                <input v-model="fat" type="number" placeholder="دهون"
                    class="w-full p-3 rounded-lg bg-hardwhite border border-graytext" />
            </div>

            <!-- INGREDIENTS -->
            <div class="space-y-2 mt-4">
                <h2 class="text-lg font-semibold text-secondary">المقادير</h2>
                <div v-for="(item, index) in ingredients" :key="index">
                    <input v-model="ingredients[index]" placeholder="مقدار"
                        class="w-full p-3 rounded-lg bg-hardwhite border border-graytext mb-2" />
                </div>
                <button @click="addIngredient" class="text-highlight font-semibold">
                    + إضافة مقدار
                </button>
            </div>

            <!-- STEPS -->
            <div class="space-y-3">
                <h2 class="text-lg font-semibold text-secondary">طريقة التحضير</h2>
                <div v-for="(step, index) in steps" :key="index" class="space-y-2 mt-4">
                    <input v-model="step.title" placeholder="عنوان الخطوة"
                        class="w-full p-3 rounded-lg bg-hardwhite border border-graytext" />
                    <textarea v-model="step.content" placeholder="محتوى الخطوة"
                        class="w-full p-3 rounded-lg bg-hardwhite border border-graytext" />
                </div>
                <button @click="addStep" class="text-highlight font-semibold mb-4">
                    + إضافة خطوة
                </button>
            </div>

            <!-- CHEF TIP -->
            <div>
                <h2 class="text-lg font-semibold text-secondary mb-4 mt-4">نصائح الشيف (إختياري)</h2>
                <textarea v-model="chefTip" placeholder="نصيحة إختيارية..."
                    class="w-full p-3 rounded-lg bg-hardwhite border border-graytext" />
            </div>

            <!-- GENERATED INFO -->
            <div class="bg-hardwhite p-4 rounded-lg border-2 border-highlight text-sm space-y-1 mt-6">
                <p><strong>إسم مقترح للصورة:</strong><br> {{ suggestedImageName }}</p>
            </div>

            <!-- CONFIRM BUTTON -->
            <button @click="confirmData" :disabled="!isValid" :class="[
                'w-full p-3 my-6 rounded-lg font-semibold bg-primary text-hardwhite transition-colors',
                isValid.value? 'bg-primary hover:bg-primary-dark' : 'bg-gray-600'
            ]">
                تأكيد و صنع ملف ماركداون
            </button>

            <!-- OUTPUT -->
            <div v-if="confirmed">
                <h2 class="text-lg font-semibold text-primary mt-6 mb-2">
                    إنسخه و إستعمله:
                </h2>
                <textarea :value="markdownOutput" rows="20" readonly dir="ltr"
                    class="w-full p-3 text-left rounded-lg bg-hardwhite text-softblack text-sm mb-12 h-full" />
            </div>

        </div>
    </div>
</template>