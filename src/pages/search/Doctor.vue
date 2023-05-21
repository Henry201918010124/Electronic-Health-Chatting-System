<template>
  <div>
    <h3>Doctor Search Result</h3>
    <h4>Keyword: {{ keyword }}</h4>
    <Card
      v-for="doctor in doctors"
      :key="doctor.id"
      :name="doctor.name"
      :avatar="doctor.avatar"
      :price="doctor.price"
      :description="doctor.description"
      :level="doctor.level"
      :hospital="doctor.hospital"
      :doctorId="doctor.id"
      @askDoctor="askDoctor"
    ></Card>
  </div>
</template>
<script>
import { searchDoctor } from "../../api/infos";
import Card from "../../components/Card.vue";
export default {
  components: { Card },
  name: "DoctorSearch",
  data() {
    return {
      keyword: this.$route.query.keyword,
      doctors: [],
    };
  },
  methods: {
    askDoctor(did, price) {
      this.$router.push({
        path: "/",
        query: {
          doctorId: did,
          price: price,
        },
      });
    },
  },
  mounted() {
    searchDoctor({ keyword: this.keyword }).then((res) => {
      console.log(res);
      this.doctors = res.doctors;
    });
  },
};
</script>