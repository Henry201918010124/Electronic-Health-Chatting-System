<template>
  <div
    class="card"
    style="margin-right: 1rem;margin-left: 2rem;margin-top: 1rem;flex: 0 0 25%;">
    <div class="card-img text-center">
      <img style="width: 50%" :src="avatar" alt="" />
    </div>
    <div class="card-info">
      <p class="text-title">{{ name }}</p>

      <p class="text-body mb-2">
        <el-tooltip effect="light" :content="hospital" placement="bottom">
          <b>{{ hospital|ellipsis(20) }}</b>
        </el-tooltip>
        <el-tag effect="dark" type="info" size="small" class="ml-3 mt-1">{{
          level
        }}</el-tag>
      </p>
      <el-popover effect="light" :content="description" placement="bottom"  :title="name" width="200" trigger="hover">
        <p class="text-body mb-2" slot="reference">{{ description | ellipsis(100) }}</p>
      </el-popover>
    </div>
    <div class="card-footer">
      <span class="text-title">￥{{ price }}</span>
      <div class="card-button" @click="askDoctor(doctorId, price)">
        <i class="fa fa-comment fa-fw"></i>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Card",
  props: {
    level: {
      type: String,
      default: "III A",
    },
    hospital: {
      type: String,
      default: "Card Hospital",
    },
    name: {
      type: String,
      default: "Card Title",
    },
    subtitle: {
      type: String,
      default: "Card Subtitle",
    },
    avatar: {
      type: String,
      default: "mdi-account",
    },
    price: {
      type: Number,
      default: 0,
    },
    description: {
      type: String,
      default: "Card Description",
    },
    doctorId: {
      type: Number,
      default: 0,
    },
  },
  methods: {
    askDoctor(did, price) {
      if (this.$store.state.balance < this.price) {
        this.$message.error("Balance not enough!");
        return;
      }
      this.$emit("askDoctor", did, price);
    },
  },
};
</script>
<style scoped>
.card {
  width: 190px;
  height: 100%;
  padding: 0.8em;
  min-width: 0 !important;
  background: #f5f5f5;
  overflow: visible;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
}

.card-img {
  background-color: #a6ffc4;
  height: 40%;
  width: 100%;
  border-radius: 0.5rem;
  transition: 0.3s ease;
}

.card-info {
  padding-top: 10%;
}

svg {
  width: 20px;
  height: 20px;
}

.card-footer {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 10px;
  border-top: 1px solid #ddd;
}

/*Text*/
.text-title {
  font-weight: 900;
  font-size: 1.2em;
  line-height: 1.5;
}

.text-body {
  font-size: 0.9em;
  padding-bottom: 10px;
}

/*Button*/
.card-button {
  border: 1px solid #252525;
  display: flex;
  padding: 0.3em;
  cursor: pointer;
  border-radius: 50px;
  transition: 0.3s ease-in-out;
}

/*Hover*/
.card-img:hover {
  transform: translateY(-25%);
  box-shadow: rgba(226, 196, 63, 0.25) 0px 13px 47px -5px,
    rgba(180, 71, 71, 0.3) 0px 8px 16px -8px;
}

.card-button:hover {
  border: 1px solid #a6ffc4;
  background-color: #a6ffc4;
}
</style>