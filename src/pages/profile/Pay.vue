<template>
  <div>
    <el-table :data="list" style="width: 100%">
      <el-table-column prop="doctor" label="Doctor" width="180">
      </el-table-column>
      <el-table-column prop="time" label="Date" width="180"> </el-table-column>
      <el-table-column prop="spend" label="Costs"> </el-table-column>
      <el-table-column prop="status" label="Status"> </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { payList } from "../../api/messages";
export default {
  data() {
    return {
      list: [],
    };
  },
  mounted() {
    payList().then((res) => {
      this.list = res.data;
    });
  },
};
</script>