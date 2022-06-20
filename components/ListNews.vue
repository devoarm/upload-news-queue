<template lang="">
  <div>
    <v-row justify="center" align="center">
      <v-col v-for="i in img" :key="i.id" cols="6">
        <v-card elevation="2" outlined shaped>
          <v-card-title>{{ i.service_point }}</v-card-title>
          <v-card-text>
            <v-img :src="i.url"> </v-img>
          </v-card-text>
          <v-card-actions>
            <v-btn text color="red" @click="delImg(i.id)"> ลบ </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      img: [],
    }
  },
  mounted() {
    this.fetchNews()
  },
  methods: {
    delImg(id) {
      this.$swal({
        title: 'ต้องการลบรูป หรือไม่?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'ตกลง',
        cancelButtonText: 'ยกเลิก',        
      }).then(async (result) => {
        console.log(result);
        /* Read more about isConfirmed, isDenied below */
        if (result.value) {
          await this.$axios.$delete(`news/${id}`)
          this.fetchNews()
        }
      })
    },
    async fetchNews() {
      const res = await this.$axios.$get('news')
      this.img = res
    },
  },
}
</script>
<style lang=""></style>
