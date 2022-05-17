<template lang="">
  <div>
    <v-form ref="form" class="px-2" @submit.prevent="uploadFile">
      <v-alert type="success" :value="alertTrue">เพิ่มสำเร็จ</v-alert>
      <v-alert type="error" :value="alertFalse">ผิดพลาด</v-alert>
      <v-row>
        <v-col cols="12">
          <v-card class="pa-2">
            <v-card-title> อัพโหลดคลิป </v-card-title>
            <v-text-field
              label="Service point ID"
              :rules="textFieldRules"
              hide-details="auto"
              v-model="servicePoint"
              prepend-icon="mdi-desktop-classic"
            ></v-text-field>
            <v-file-input
              accept="video/mp4,video/x-m4v,video/*,image/*"
              block
              :rules="fileFieldRules"
              label="File Upload"
              v-model="file"
            ></v-file-input>
          </v-card>
        </v-col>
      </v-row>
      <v-row class="justify-center">
        <v-btn color="primary" elevation="2" class="text-center" type="submit">
          อัพโหลด
        </v-btn>
        <v-btn elevation="2" class="text-center ml-2"> ล้าง </v-btn>
      </v-row>
    </v-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      file: null,
      servicePoint: '',
      textFieldRules: [(v) => !!v || 'กรุณากรอก Service Point ID'],
      fileFieldRules: [(v) => !!v || 'กรุณากรอกเลือกไฟล์'],
      alertTrue: false,
      alertFalse: false,
      typeAlert: '',
      msgAlert: '',
    }
  },
  methods: {
    async uploadFile() {
      if (this.$refs.form.validate()) {
        console.log(this.file)
        const formData = new FormData()
        formData.append('media', this.file)
        const file = await this.$axios.$post(
          `/upload/${this.servicePoint}`,
          formData
        )
        if (file.status) {
          this.alertTrue = true
          this.alertFalse = false
          this.$refs.form.reset()
          setTimeout(() => {
            this.alertTrue = false
          }, 5000)
        } else {
          this.alertTrue = false
          this.alertFalse = true
        }
      }
    },
  },
}
</script>
<style lang=""></style>
