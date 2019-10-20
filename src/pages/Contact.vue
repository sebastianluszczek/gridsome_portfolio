<template>
  <Layout class="contact-layout">
    <h1 class="page-title">Kontakt</h1>
    <p>Jeśli masz jakieś pytania, oferty współpracy lub uwagi do projektów, odezwij się do mnie!</p>    
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
      <div class="contact-info">
        <div class="contact_element">
          <font-awesome :icon="['fas', 'envelope']" class="icon"/>
          <p>luszczeksebastian@gmail.com</p>
        </div>
        <div class="contact_element">
          <font-awesome :icon="['fas', 'mobile-alt']" class="icon"/>
          <p>+48 665-148-668</p>
        </div>
        <div class="contact_element">
          <font-awesome :icon="['fab', 'facebook-messenger']" class="icon"/>
          <p>m.me/luszczeksebastian</p>
        </div>
      </div>
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
.contact-layout {
  .title {
    margin-top: 3rem;
  }

  .contact-grid {
    display: grid;
    grid-template-columns: 2fr 1fr;
    margin-top: 2rem;

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
          outline: none;
          font-family: "Montserrat", sans-serif;
          font-style: italic;
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
      padding: 2rem;
      padding-right: 0;
      font-size: 1rem;
      max-width: 200px;
      .contact_element {
        display: grid;
        grid-template-columns: 10px auto;
        align-items: center;
        margin: 2rem 0;
        p {
          padding-left: 1rem;
          margin-bottom: 1rem;
        }
        .icon {
          color: #333;
          font-size: 3rem;
          justify-self: start;
          align-self: flex-start;
          opacity: 0.15;
        }
      }
    }
  }

  @media (max-width: 800px) {
    .contact-grid {
      grid-template-columns: 1fr;

      .contact-form {
        width: 80%;
        margin: 0 auto;
      }

      .contact-info {
        border: none;
        max-width: 100%;

        .contact_element {
          width: fit-content;
          margin: 2rem auto;
        }
      }
    }
  }
}
</style>
