<script setup>
import { ref } from 'vue'

const submitted = ref(false)

const scrollToForm = () => {
  document.getElementById('order-form')?.scrollIntoView({ behavior: 'smooth' })
}

const handleSubmit = async (e) => {
  const form = e.target
  const formData = new FormData(form)

  try {
    // Send the AJAX request to the root path
    await fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(formData).toString(),
    })
    
    // Show the success UI
    submitted.value = true
    
    // Smooth scroll back to the success message
    window.scrollTo({ top: 0, behavior: 'smooth' })
  } catch (error) {
    alert("حدث خطأ في الإرسال، يرجى المحاولة مرة أخرى")
    console.error("Form submission error:", error)
  }
}
</script>
