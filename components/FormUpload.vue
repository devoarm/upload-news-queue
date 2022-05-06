<template lang="">
  <div>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>
            อัพโหลดคลิป
          </v-card-title>
          <v-form class="px-2">
            <v-select :items="items" label="ServicePointID"></v-select>
            <v-file-input
              accept="image/*"
              block
              label="File input"
            ></v-file-input>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
    <v-row class="justify-center">
      <v-btn color="primary" elevation="2" class="text-center"> อัพโหลด </v-btn>
      <v-btn elevation="2" class="text-center ml-2"> ล้าง </v-btn>
    </v-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      items: ['ตรวจโรคทั่วไป', 'ห้องยา'],
    }
  },
}
</script>
<style lang=""></style>
