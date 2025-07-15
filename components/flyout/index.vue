<script setup lang="ts">
import { ref, computed } from "vue";
import { useFloating, offset, flip, shift, autoUpdate } from "@floating-ui/vue";
import { onClickOutside } from "@vueuse/core";

interface Props {
  triggerAction?: "click" | "hover";
  placement?:
    | "top"
    | "bottom"
    | "left"
    | "right"
    | "top-start"
    | "bottom-start";
}

const props = withDefaults(defineProps<Props>(), {
  triggerAction: "hover",
  placement: "bottom-start",
});

const isVisible = defineModel<boolean>("isVisible", { default: false });

const triggerEl = ref(null);
const floatingEl = ref(null);

const { floatingStyles } = useFloating(triggerEl, floatingEl, {
  placement: computed(() => props.placement),
  whileElementsMounted: autoUpdate,
  middleware: [offset(8), flip(), shift({ padding: 8 })],
});

onClickOutside(floatingEl, () => {
  if (props.triggerAction === "click") {
    isVisible.value = false;
  }
});

const show = () => {
  isVisible.value = true;
};

const hide = () => {
  isVisible.value = false;
};

const toggle = () => {
  isVisible.value = !isVisible.value;
};

const handleClick = () => {
  if (props.triggerAction === "click") {
    toggle();
  }
};

const handleMouseEnter = () => {
  if (props.triggerAction === "hover") {
    show();
  }
};

const handleMouseLeave = () => {
  if (props.triggerAction === "hover") {
    hide();
  }
};

const handleFocus = () => {
  if (props.triggerAction === "hover") {
    show();
  }
};

const handleBlur = () => {
  if (props.triggerAction === "hover") {
    hide();
  }
};
</script>

<template>
  <div class="flyout-container">
    <div
      ref="triggerEl"
      class="flyout-trigger"
      @click="handleClick"
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave"
      @focus="handleFocus"
      @blur="handleBlur"
    >
      <slot name="trigger" />
    </div>
    <div
      v-if="isVisible"
      ref="floatingEl"
      :style="floatingStyles"
      class="flyout-content"
    >
      <slot name="content" />
    </div>
  </div>
</template>

<style scoped>
.flyout-container {
  position: relative;
  display: inline-block;
}

.flyout-content {
  background-color: var(--shade-0);
  border: 1px solid var(--shade-200);
  color: var(--shade-800);
  padding: 0.75rem;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 10;
  width: auto;
}
</style>
