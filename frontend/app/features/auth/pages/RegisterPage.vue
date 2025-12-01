<template>
  <NuxtLayout name="auth-layout">
    <!-- Header -->
    <div class="text-center mb-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-2">Create Account</h1>
      <p class="text-gray-600">Sign up to get started</p>
    </div>

    <!-- Register Form -->
    <form class="space-y-5" @submit="onSubmit">
      <div>
        <UiInput
          v-model="fullName"
          label="Full Name"
          type="text"
          placeholder="Enter your full name"
          :error="errors.fullName"
        />
      </div>

      <div>
        <UiInput
          v-model="email"
          label="Email Address"
          type="email"
          placeholder="Enter your email"
          :error="errors.email"
        />
      </div>

      <div>
        <UiInput
          v-model="phone"
          label="Phone Number"
          type="tel"
          placeholder="Enter your phone number"
          :error="errors.phone"
        />
      </div>

      <div>
        <UiInput
          v-model="password"
          label="Password"
          type="password"
          placeholder="Create a password"
          :error="errors.password"
        />
      </div>

      <div>
        <UiInput
          v-model="confirmPassword"
          label="Confirm Password"
          type="password"
          placeholder="Confirm your password"
          :error="errors.confirmPassword"
        />
      </div>

      <!-- Terms & Conditions -->
      <div>
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
        <p v-if="errors.agreeToTerms" class="mt-1 text-sm text-red-600">
          {{ errors.agreeToTerms }}
        </p>
      </div>

      <!-- Submit Button -->
      <UiButton type="submit" variant="secondary" size="lg" class="w-full" :disabled="isSubmitting">
        {{ isSubmitting ? "Creating Account..." : "Create Account" }}
      </UiButton>
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
      <UiButton variant="outline" size="md">
        <Icon name="mdi:google" class="w-5 h-5 mr-2" />
        Google
      </UiButton>
      <UiButton variant="outline" size="md">
        <Icon name="mdi:github" class="w-5 h-5 mr-2" />
        GitHub
      </UiButton>
    </div>

    <!-- Sign In Link -->
    <p class="text-center text-sm text-gray-600 mt-6">
      Already have an account?
      <NuxtLink to="/auth/login" class="text-primary hover:text-primary-dark font-medium"> Sign in </NuxtLink>
    </p>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { registerSchema } from "../schemas";
import type { RegisterFormData } from "../schemas";

// useForm and toTypedSchema are auto-imported by @vee-validate/nuxt module
const { defineField, handleSubmit, errors, isSubmitting } = useForm({
  validationSchema: toTypedSchema(registerSchema),
  initialValues: {
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  },
});

const [fullName] = defineField("fullName");
const [email] = defineField("email");
const [phone] = defineField("phone");
const [password] = defineField("password");
const [confirmPassword] = defineField("confirmPassword");
const [agreeToTerms] = defineField("agreeToTerms");

const onSubmit = handleSubmit(async (values: RegisterFormData) => {
  try {
    console.log("Register form submitted:", values);
    // TODO: Implement registration API call
    // await registerUser(values);
  } catch (error) {
    console.error("Registration error:", error);
  }
});
</script>
