new Vue({
  el: "#app",
  vuetify: new Vuetify(),
  data: {
    placeholderArr: ["What is Paris like?", "Search Country"],
    placeholder: "",
    placeholderIndex: 0,
    baseUrl: "https://restcountries.eu/rest/v2",
    hasCountry: false,
    hasCountryMoreInfo: false,
    moreCountryInfo: {},
    countryName: "",
    aboutCountry: "",
    btnMoreInfoTxt: "More Info",
  },
  methods: {
    searchCountry(country, moreInfo = false) {
      this.changePlaceholder();

      this.fetchCountry(country, moreInfo);
    },
    fetchCountry(country, moreInfo = false) {
      if (country.length < 1) return true;
      let request = `${this.baseUrl}/name/${country}`;
      fetch(request)
        .then((response) => {
          return response.json();
        })
        .then((response) => {
          return response[0];
        })
        .then((response) => {
          this.hasCountry = true;
          this.countryName = response.name;
          this.aboutCountry = `${response.name}, is an ${
            response.region
          } country located in ${
            response.subregion
          } with a population of about ${numeral(response.population).format(
            0.0
          )}. Its Capital city is ${response.capital}. `;

          if (moreInfo) {
            this.hasCountryMoreInfo = true;
            this.btnMoreInfoTxt = "Less Info";
            this.moreCountryInfo.population = numeral(
              response.population
            ).format(0.0);
            this.moreCountryInfo.region = response.region;
            this.moreCountryInfo.subregion = response.subregion;

            let countryCurrency = [];
            response.currencies.forEach((currency) => {
              countryCurrency.push(currency.name);
            });
            this.moreCountryInfo.currency = countryCurrency.toString();
          } else {
            this.hasCountryMoreInfo = false;
            this.btnMoreInfoTxt = "More Info";
            this.hasCountryMoreInfo = false;
          }
        })
        .catch((error) => {
          console.log(`Error ${error}`);
        });
    },
    changePlaceholder() {
      if (this.placeholderIndex === 0) {
        this.placeholder = this.placeholderArr[1];
        this.placeholderIndex = 1;
      } else {
        this.placeholder = this.placeholderArr[0];
        this.placeholderIndex = 0;
      }
    },
  },
  mounted() {
    this.placeholder = this.placeholderArr[0];
    this.placeholderIndex = 0;
  },
});
