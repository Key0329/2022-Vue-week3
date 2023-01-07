const app = {
  data() {
    return {
      user: {
        username: "",
        password: "",
      },
      apiUrl: "https://vue3-course-api.hexschool.io/v2",
    };
  },
  methods: {
    login() {
      axios
        .post(`${this.apiUrl}/admin/signin`, this.user)
        .then((res) => {
          // console.log(res);
          const { token, expired } = res.data;
          document.cookie = `hexVueWeek3Token=${token};expires=${new Date(
            expired
          )};`;
          window.location = "products.html";
        })
        .catch((err) => {
          // console.log(err.response);
          alert(err.response.data.message);
        });
    },
  },
};

Vue.createApp(app).mount("#app");
