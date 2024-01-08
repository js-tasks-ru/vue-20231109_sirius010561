<template>
  <div class="image-uploader">
    <label class="image-uploader__preview" :class="{ 'image-uploader__preview-loading': loading }"
      :style="imgUrl ? `--bg-url: url(${imgUrl})` : ''">
      <span class="image-uploader__text">{{ message }}</span>
      <input ref="input" v-bind="$attrs" type="file" accept="image/*" class="image-uploader__input" @click="onClick"
        @change="onChange" />
    </label>
  </div>
</template>

<script>
export default {
  name: 'UiImageUploader',
  inheritAttrs: false,
  emits: ['remove', 'upload', 'error', 'select'],
  data() {
    return {
      loading: false,
      imgUrl: this.preview,
    }
  },
  props: {
    preview: {
      type: String,
    },
    uploader: {
      type: Function,
    }
  },
  computed: {
    message() {
      if (this.loading === true) {
        return 'Загрузка...';
      } else if (this.imgUrl && this.imgUrl.length > 0) {
        return 'Удалить изображение';
      } else {
        return 'Загрузить изображение';
      }
    }
  },
  methods: {
    onClick(event) {
      if (this.imgUrl && this.imgUrl.length > 0) {
        event.preventDefault();
        this.$refs.input.value = "";
        this.imgUrl = null;
        this.$emit('remove');
      }
    },
    onChange(event) {
      const uploadFile = event.target.files[0];
      this.$emit('select', uploadFile);
      if (!this.uploader) {
        this.imgUrl = URL.createObjectURL(uploadFile);
      } else {
        this.loading = true;
        this.uploader(uploadFile).then(
          result => {
            this.imgUrl = result.image;
            this.$emit('upload', result);
          }, error => {
            this.$refs.input.value = "";
            this.imgUrl = null;
            this.$emit('error', error);
          }
        ).finally(() => {
          this.loading = false;
        })
      }
    }
  }
};
</script>

<style scoped>
.image-uploader {
}

.image-uploader__input {
  opacity: 0;
  height: 0;
}

.image-uploader__preview {
  --bg-url: var(--default-cover);
  background-size: cover;
  background-position: center;
  background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), var(--bg-url);
  border: 2px solid var(--blue-light);
  border-radius: 8px;
  transition: 0.2s border-color;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 512px;
  height: 228px;
}

.image-uploader__text {
  color: var(--white);
  font-family: 'Nunito', sans-serif;
  font-weight: 600;
  font-size: 20px;
  line-height: 28px;
}

.image-uploader__preview:hover {
  border-color: var(--blue);
}

.image-uploader__preview.image-uploader__preview-loading {
  cursor: no-drop;
}
</style>
