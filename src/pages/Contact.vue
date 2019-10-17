<template>
  <Layout>
    <h1 class="page-title">Kontakt</h1>
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatem aliquam quod mollitia? Accusamus neque adipisci quibusdam tempora animi cumque laborum voluptatum atque at dolorem, minima nam? Officiis voluptates nobis rem expedita dolor accusamus exercitationem temporibus fugit, mollitia ad reprehenderit ipsum quasi maiores eos in obcaecati est minima ex veritatis deleniti.</p>
    <div class="contact-grid">
      <form
        class="contact-form"
        name="contact-form"
        method="POST"
        data-netlify="true"
        @submit.prevent="handleSubmit"
      >
        <div class="input-wrapper">
          <label for="name">Imię i Nazwisko</label>
          <input type="text" name="name" v-model="formData.name" />
        </div>
        <div class="input-wrapper">
          <label for="email">Adres e-mail</label>
          <input type="email" name="email" v-model="formData.email" />
        </div>
        <div class="input-wrapper">
          <label for="topic">Temat</label>
          <input type="text" name="topic" v-model="formData.topic" />
        </div>
        <div class="input-wrapper">
          <label for="message">Wiadomość</label>
          <textarea name="message" rows="6" v-model="formData.message"></textarea>
        </div>
        <button class="button" type="submit">Wyślij</button>
      </form>
      <div class="contact-info"></div>
    </div>
  </Layout>
</template>

<script>
import axios from "axios";
export default {
  name: "contact",
  data() {
    return {
      formData: {
        email: "",
        name: "",
        topic: "",
        message: ""
      }
    };
  },
  methods: {
    encode(data) {
      return Object.keys(data)
        .map(
          key => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`
        )
        .join("&");
    },
    async handleSubmit() {
      const axiosConfig = {
        header: { "Content-Type": "application/x-www-form-urlencoded" }
      };
      try {
        const response = await axios.post(
          "/",
          this.encode({
            "form-name": "contact-form",
            ...this.formData
          }),
          axiosConfig
        );
        console.log(response);
      } catch (err) {
        console.log(err);
      }

      this.formData.name = "";
      this.formData.email = "";
      this.formData.topic = "";
      this.formData.message = "";
    }
  }
};
</script>

<style lang="scss">
.title {
  margin-top: 3rem;
}

.contact-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  margin-top: 4rem;

  .contact-form {
    width: 90%;

    .input-wrapper {
      width: 100%;
      display: flex;
      flex-direction: column;
      margin: 1rem 0;

      input,
      textarea {
        padding: 0.5rem 0;
        border: none;
        border-bottom: 1px solid #444;
      }
    }
  }

  .contact-info {
    border-left: 1px solid #444;
  }
}
</style>
