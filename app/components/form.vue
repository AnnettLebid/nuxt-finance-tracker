<template>
  <form>
    <div class="flex flex-col">
      <div class="text-xl">
        <h1>Contact us</h1>
        <hr />
        <!-- <form-group
          v-model="formData.name"
          label="Name"
          placeholder="Enter name"
          type="text"
        /> -->
        <!-- <base-input v-model="formData.name" /> -->
        <!-- {{ formData.name }} -->

        <div class="mb-3">
          <label for="email">Email</label>
          <input
            type="email"
            id="email"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            v-model="formData.email"
          />
        </div>

        <div class="mb-3">
          <label for="subject">Subject</label>
          <input
            type="text"
            id="subject"
            class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            v-model="formData.subject"
          />
        </div>

        <div class="mb-3">
          <label for="message">Message</label>
          <textarea
            class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            rows="3"
            id="message"
            v-model="formData.message"
          ></textarea>
        </div>

        <div class="mb-3">
          <h5>Want more spam ?</h5>
          <div class="flex items-center border border-red-300 gap-2">
            <input
              class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
              type="checkbox"
              v-model="formData.newsletter"
              id="newsletter"
            />
            <label class="form-check-label" for="newsletter">
              Newsletter
            </label>
            <div>|{{ formData.newsletter }}</div>
          </div>
          <div class="flex items-center gap-2 border-red-500 border">
            <input
              class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
              type="checkbox"
              v-model="formData.promotions"
              id="promotions"
            />
            <label class="form-check-label" for="newsletter">
              Promotions
            </label>
            <div>|{{ formData.promotions }}</div>
          </div>
        </div>

        <div class="mb-3">
          <h5>What are you ?</h5>
          <div class="form-check">
            <input
              class="form-check-input"
              type="radio"
              id="human"
              value="human"
              name="origin"
            />
            <label class="form-check-label" for="human"> Human </label>
          </div>
          <div class="form-check">
            <input
              class="form-check-input"
              type="radio"
              id="alien"
              value="alien"
              name="origin"
            />
            <label class="form-check-label" for="alien"> Alien </label>
          </div>
        </div>
        <div class="flex gap-3">
          <div>Receive newsletter</div>
          <!-- v-model="formData.receiveNewsletter" -->
          <!-- <toggle-input
            :value="formData.receiveNewsletter"
            @input="
              (newValue) => {
                console.log('newValue', newValue);
                receiveNewsletter = receiveNewsletter = newValue;
              }
            "
          /> -->
        </div>
        <button
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          @click.prevent="submitForm"
        >
          Submit
        </button>
      </div>
    </div>
  </form>
</template>

<script setup>
const formData = ref({
  name: "",
  email: "",
  subject: "",
  message: "",
  newsletter: false,
  promotions: false,
  receiveNewsletter: false,
});

watch(
  () => formData.value,
  (newVal, oldVal) => {
    console.log("form", newVal);
    console.log(oldVal);
  }
);

const submitForm = () => {
  console.log(JSON.stringify(formData));
};
</script>
