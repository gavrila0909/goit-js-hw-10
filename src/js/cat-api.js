import axios from "axios";
axios.defaults.headers.common["x-api-key"] = "live_qVTcP9NWwbdimthCOjqMLghAzEaUk2B9y6sMEaErr1Ste6EtxNScMgZEx7aTHaaT";

export function fetchBreeds() {
  return axios.get("https://api.thecatapi.com/v1/breeds123")
    .then(res => res.data)
    .catch(err => console.error(err));
}

export function fetchCatByBreed(breedId) {
  return axios(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then(res => res.data[0])
    .catch(err => console.error(err));
}