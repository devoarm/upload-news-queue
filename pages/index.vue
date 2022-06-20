<template>
  <div>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="6">
        <FormUpload />
      </v-col>
    </v-row>
    <v-row justify="center" align="center">
      <v-col cols="6">
        <ListNews></ListNews>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
}
</script>
