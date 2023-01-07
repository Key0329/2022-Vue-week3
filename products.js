let productModal = null;
let delProductModal = null;

const app = {
  data() {
    return {
      apiUrl: "https://vue3-course-api.hexschool.io/v2",
      apiPath: "key0329",
      products: [],
      tempProduct: {
        imagesUrl: [],
      },
      isNew: false,
    };
  },
  mounted() {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)hexVueWeek3Token\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    axios.defaults.headers.common.Authorization = token;
    this.checkAdmin();

    productModal = new bootstrap.Modal(document.querySelector("#productModal"));
    delProductModal = new bootstrap.Modal(
      document.querySelector("#delProductModal")
    );
  },
  methods: {
    checkAdmin() {
      axios
        .post(`${this.apiUrl}/api/user/check`)
        .then(() => {
          this.getData();
        })
        .catch((err) => {
          alert(err.data.message);
          window.location = "login.html";
        });
    },
    getData() {
      axios
        .get(`${this.apiUrl}/api/${this.apiPath}/admin/products`)
        .then((res) => {
          this.products = res.data.products;
          console.log(this.products);
        })
        .catch((err) => {
          alert(err.data.message);
        });
    },
    modelHandler(button, item) {
      if (button === "createBtn") {
        this.tempProduct = {
          imagesUrl: [],
        };
        this.isNew = true;
        productModal.show();
      } else if (button === "editBtn") {
        this.tempProduct = { ...item };
        this.isNew = false;
        productModal.show();
      } else if (button === "deleteBtn") {
        this.tempProduct = { ...item };
        delProductModal.show();
      }
    },
    addImage() {
      this.tempProduct.imagesUrl.push("");
    },
    deleteImage() {
      this.tempProduct.imagesUrl.pop();
    },
    createImage() {
      this.tempProduct.imagesUrl = [];
      this.tempProduct.imagesUrl.push("");
    },
    addNewProduct() {
      const data = this.tempProduct;

      if (
        !this.tempProduct.title ||
        !this.tempProduct.category ||
        !this.tempProduct.unit ||
        !this.tempProduct.price ||
        !this.tempProduct.origin_price
      ) {
        alert("標題 / 分類 / 單位 / 原價 / 售價 為必填欄位");
        return;
      } else {
        axios
          .post(`${this.apiUrl}/api/${this.apiPath}/admin/product`, { data })
          .then((res) => {
            alert(res.data.message);
            this.getData();
            productModal.hide();
          })
          .catch((err) => {
            alert(err.data.message);
          });
      }
    },
    updateProduct() {
      const data = this.tempProduct;
      const id = this.tempProduct.id;

      if (
        !this.tempProduct.title ||
        !this.tempProduct.category ||
        !this.tempProduct.unit ||
        !this.tempProduct.price ||
        !this.tempProduct.origin_price
      ) {
        alert("標題 / 分類 / 單位 / 原價 / 售價 為必填欄位");
        return;
      } else {
        axios
          .put(`${this.apiUrl}/api/${this.apiPath}/admin/product/${id}`, {
            data,
          })
          .then((res) => {
            alert(res.data.message);
            this.getData();
            productModal.hide();
          })
          .catch((err) => {
            alert(err.data.message);
          });
      }
    },
    updateProductHandler() {
      if (this.isNew) {
        this.addNewProduct();
      } else {
        this.updateProduct();
      }

      // 以下為範例更簡潔作法

      // let url = `${this.apiUrl}/api/${this.apiPath}/admin/product`;
      // let http = "post";
      // const data = this.tempProduct;
      // const id = this.tempProduct.id;

      // if (!this.isNew) {
      //   url = `${this.apiUrl}/api/${this.apiPath}/admin/product/${id}`;
      //   http = "put";
      // }

      // axios[http](url, { data })
      //   .then((res) => {
      //     alert(res.data.message);
      //     productModal.hide();
      //     this.getData();
      //   })
      //   .catch((err) => {
      //     alert(err.data.message);
      //   });
    },
    deleteProduct() {
      const id = this.tempProduct.id;
      axios
        .delete(`${this.apiUrl}/api/${this.apiPath}/admin/product/${id}`)
        .then((res) => {
          alert(res.data.message);
          this.getData();
          delProductModal.hide();
        })
        .catch((err) => {
          alert(err.data.message);
        });
    },
  },
};

Vue.createApp(app).mount("#app");
