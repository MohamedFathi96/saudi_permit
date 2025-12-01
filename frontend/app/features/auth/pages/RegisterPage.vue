<template>
  <NuxtLayout name="auth-layout">
    <!-- Header -->
    <div class="text-center mb-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-2">Create Account</h1>
      <p class="text-gray-600">Sign up to get started</p>
    </div>

    <!-- Register Form -->
    <form class="space-y-5" @submit.prevent>
      <Input v-model="fullName" label="Full Name" type="text" placeholder="Enter your full name" />

      <Input v-model="email" label="Email Address" type="email" placeholder="Enter your email" />

      <Input v-model="phone" label="Phone Number" type="tel" placeholder="Enter your phone number" />

      <Input v-model="password" label="Password" type="password" placeholder="Create a password" />

      <Input v-model="confirmPassword" label="Confirm Password" type="password" placeholder="Confirm your password" />

      <!-- Terms & Conditions -->
      <div class="flex items-start gap-2">
        <input
          v-model="agreeToTerms"
          type="checkbox"
          class="w-4 h-4 mt-1 rounded border-gray-300 text-primary focus:ring-primary"
        />
        <label class="text-sm text-gray-700">
          I agree to the
          <a href="#" class="text-primary hover:text-primary-dark font-medium"> Terms of Service </a>
          and
          <a href="#" class="text-primary hover:text-primary-dark font-medium"> Privacy Policy </a>
        </label>
      </div>

      <!-- Submit Button -->
      <Button variant="primary" size="lg" class="w-full"> Create Account </Button>
    </form>

    <!-- Divider -->
    <div class="relative my-6">
      <div class="absolute inset-0 flex items-center">
        <div class="w-full border-t border-gray-300" />
      </div>
      <div class="relative flex justify-center text-sm">
        <span class="px-4 bg-white text-gray-500">or sign up with</span>
      </div>
    </div>

    <!-- Social Sign Up -->
    <div class="grid grid-cols-2 gap-3">
      <Button variant="outline" size="md">
        <Icon name="mdi:google" class="w-5 h-5 mr-2" />
        Google
      </Button>
      <Button variant="outline" size="md">
        <Icon name="mdi:github" class="w-5 h-5 mr-2" />
        GitHub
      </Button>
    </div>

    <!-- Sign In Link -->
    <p class="text-center text-sm text-gray-600 mt-6">
      Already have an account?
      <NuxtLink to="/auth/login" class="text-primary hover:text-primary-dark font-medium"> Sign in </NuxtLink>
    </p>
  </NuxtLayout>
</template>

<script setup lang="ts">
import Input from "~/components/ui/Input.vue";
import Button from "~/components/ui/Button.vue";

const fullName = ref("");
const email = ref("");
const phone = ref("");
const password = ref("");
const confirmPassword = ref("");
const agreeToTerms = ref(false);
</script>
