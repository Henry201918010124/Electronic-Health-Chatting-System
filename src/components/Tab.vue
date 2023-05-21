<template>
  <div class="d-flex flex-wrap">
    <div class="mr-3rem mt-5 tab">
      {{ department.name }}
    </div>
  </div>
</template>
<script>
export default {
    data() {
        return {
            departments: [],
        };
    },
};
</script>
<style scoped>
</style>