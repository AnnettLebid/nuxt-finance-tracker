<template>
  <div>
    <div class="mb-4">
      <UFormGroup class="w-full">
        <UAvatar :src="url" size="3xl" />
      </UFormGroup>
    </div>

    <div class="mb-4">
      <UFormGroup
        label="New avatar"
        class="w-full"
        name="avatar"
        help="After choosing an image click Save to actually upload the new avatar"
      >
        <UInput type="file" ref="fileInput" />
      </UFormGroup>
    </div>

    <UButton
      type="submit"
      color="black"
      variant="solid"
      label="Save"
      :loading="uploading"
      :disabled="uploading"
      @click="saveAvatar"
    />
  </div>
</template>

<script setup>
const supabase = useSupabaseClient();
const user = useSupabaseUser();

const { toastSuccess, toastError } = useAppToast();
const { url } = useAvatarUrl();

const uploading = ref(false);
const fileInput = ref();
console.log(user.value.user_metadata.avatar_url);

const saveAvatar = async () => {
  const file = fileInput.value.input.files[0];

  if (!file) {
    toastError({ title: "Select a file to upload" });
    return;
  }

  const fileExtension = file.name.split(".").pop();
  const fileName = `${Math.random()}.${fileExtension}`;

  try {
    uploading.value = true;

    const currentAvatarUrl = user.value.user_metadata?.avatar_url;

    const { error } = await supabase.storage
      .from("avatars")
      .upload(fileName, file);

    if (error) throw error;

    await supabase.auth.updateUser({
      data: {
        avatar_url: fileName,
      },
    });

    if (currentAvatarUrl) {
      const { error } = await supabase.storage
        .from("avatars")
        .remove([currentAvatarUrl]);
      if (error) throw error;
    }

    fileInput.value.input.value = null;

    toastSuccess({
      title: "Avatar uploaded",
    });
  } catch (error) {
    toastError({
      title: "Error uploading avatar",
      description: error.message,
    });
  } finally {
    uploading.value = false;
  }
};
</script>
