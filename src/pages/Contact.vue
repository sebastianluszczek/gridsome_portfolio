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
        netlify-honeypot="bot-field"
        @submit.prevent="handleSubmit"
      >
        <div class="input-wrapper" :class="{ 'field-error': $v.formData.name.$error }">
          <label for="name">Imię i Nazwisko</label>
          <input type="text" name="name" v-model="formData.name" />
        </div>
        <div class="input-wrapper" :class="{ 'field-error': $v.formData.email.$error }">
          <label for="email">Adres e-mail</label>
          <input type="email" name="email" v-model="formData.email" />
        </div>
        <div class="input-wrapper" :class="{ 'field-error': $v.formData.topic.$error }">
          <label for="topic">Temat</label>
          <input type="text" name="topic" v-model="formData.topic" />
        </div>
        <div class="input-wrapper" :class="{ 'field-error': $v.formData.message.$error }">
          <label for="message">Wiadomość</label>
          <textarea name="message" rows="6" v-model="formData.message"></textarea>
        </div>
        <input name="bot-field" v-show="false" />
        <button class="button" type="submit">Wyślij</button>
        <p class="formStatus" v-if="submitStatus === 'OK'">Dzięki za wiadomość!</p>
        <p class="formStatus" v-if="submitStatus === 'ERROR'">Wypełnij wszystkie wymagane pola.</p>
        <p
          class="formStatus"
          v-if="submitStatus === 'SERVER_ERROR'"
        >Coś poszło nie tak, spróbuj później.</p>
        <p class="formStatus" v-if="submitStatus === 'PENDING'">Wysyłam...</p>
      </form>
      <div class="contact-info"></div>
    </div>
  </Layout>
</template>

<script>
import axios from "axios";
import { required, minLength, email } from "vuelidate/lib/validators";

export default {
  name: "contact",
  data() {
    return {
      formData: {
        email: "",
        name: "",
        topic: "",
        message: ""
      },
      submitStatus: ""
    };
  },
  validations: {
    formData: {
      name: {
        required,
        minLength: minLength(4)
      },
      email: {
        required,
        email
      },
      topic: {
        required,
        minLength: minLength(4)
      },
      message: {
        required,
        minLength: minLength(4)
      }
    }
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
      this.submitStatus = "PENDING";
      const axiosConfig = {
        header: { "Content-Type": "application/x-www-form-urlencoded" }
      };
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.submitStatus = "ERROR";
      } else {
        try {
          const response = await axios.post(
            "/",
            this.encode({
              "form-name": "contact-form",
              ...this.formData
            }),
            axiosConfig
          );
          this.submitStatus = "OK";
        } catch (err) {
          this.submitStatus = "SERVER_ERROR";
        }
      }
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

    .formStatus {
      margin-top: 1rem;
    }

    .input-wrapper {
      width: 100%;
      display: flex;
      flex-direction: column;
      margin: 1rem 0;

      label {
        color: #333;
      }

      input,
      textarea {
        padding: 0.5rem 0;
        border: none;
        border-bottom: 1px solid #000;
      }
      &.field-error {
        label {
          color: #ce0000;
        }

        input,
        textarea {
          border-bottom: 1px solid red;
        }
      }

      .error {
        color: #ce0000;
        font-size: 0.7rem;
      }
    }
  }

  .contact-info {
    border-left: 1px solid #444;
  }
}
</style>
