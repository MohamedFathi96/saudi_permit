<template>
  <NuxtLayout name="auth-layout">
    <!-- Header -->
    <div class="text-center mb-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
      <p class="text-gray-600">Sign in to your account to continue</p>
    </div>

    <!-- Login Form -->
    <form class="space-y-5" @submit="onSubmit">
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
          v-model="password"
          label="Password"
          type="password"
          placeholder="Enter your password"
          :error="errors.password"
        />
      </div>

      <!-- Remember Me & Forgot Password -->
      <div class="flex items-center justify-between text-sm">
        <label class="flex items-center gap-2 cursor-pointer">
          <input
            v-model="rememberMe"
            type="checkbox"
            class="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
          />
          <span class="text-gray-700">Remember me</span>
        </label>
        <a href="#" class="text-primary hover:text-primary-dark font-medium"> Forgot password? </a>
      </div>

      <!-- Submit Button -->
      <UiButton type="submit" variant="secondary" size="lg" class="w-full" :disabled="isSubmitting">
        {{ isSubmitting ? "Signing In..." : "Sign In" }}
      </UiButton>
    </form>

    <!-- Divider -->
    <div class="relative my-6">
      <div class="absolute inset-0 flex items-center">
        <div class="w-full border-t border-gray-300" />
      </div>
      <div class="relative flex justify-center text-sm">
        <span class="px-4 bg-white text-gray-500">or continue with</span>
      </div>
    </div>

    <!-- Social Login -->
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

    <!-- Sign Up Link -->
    <p class="text-center text-sm text-gray-600 mt-6">
      Don't have an account?
      <NuxtLink to="/auth/register" class="text-primary hover:text-primary-dark font-medium"> Sign up </NuxtLink>
    </p>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { loginSchema } from "../schemas";
import type { LoginFormData } from "../schemas";

const { defineField, handleSubmit, errors, isSubmitting } = useForm({
  validationSchema: toTypedSchema(loginSchema),
  initialValues: {
    email: "",
    password: "",
    rememberMe: false,
  },
  validateOnMount: false,
});

const [email] = defineField("email");
const [password] = defineField("password");
const [rememberMe] = defineField("rememberMe");

const onSubmit = handleSubmit(async (values: LoginFormData) => {
  try {
    console.log("Login form submitted:", values);
    // TODO: Implement login API call
    // await loginUser(values);
  } catch (error) {
    console.error("Login error:", error);
  }
});
</script>
