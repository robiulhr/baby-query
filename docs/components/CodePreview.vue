<template>
  <div>
    <div class="code-preview__code">
      <slot name="code"></slot>
    </div>

    <div class="code-preview__result">
      <slot name="result"></slot>
    </div>
  </div>
</template>

<style scoped>
.code-preview__code {
  margin-bottom: 1rem;
  background-color: #f7f7f7;
  padding: 1rem;
  border-radius: 5px;
  font-family: monospace;
  overflow-x: scroll;
}

.code-preview__result {
  background-color: #f7f7f7;
  padding: 1rem;
  border-radius: 5px;
}
</style>
