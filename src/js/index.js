import { fetchBreeds, fetchCatByBreed } from "./cat-api";

const catInfoDiv = document.querySelector('.cat-info');
const breedSelect = document.querySelector(".breed-select");
const loaderElement = document.querySelector(".loader");
const errorElement = document.querySelector(".error");

loaderElement.style.display = "block";
errorElement.style.display = "none";
breedSelect.style.display = "none";

fetchBreeds()
  .then(breeds => {
    loaderElement.style.display = "none"; 
    breedSelect.style.display = "block"; 

    const fragmentElement = document.createDocumentFragment();

    breeds.forEach(breed => {
      const optionElement = document.createElement("option");
      optionElement.value = breed.id;
      optionElement.textContent = breed.name;
      fragmentElement.append(optionElement);
    });

    breedSelect.innerHTML = '';
    breedSelect.append(fragmentElement);

    breedSelect.addEventListener("change", () => {
      loaderElement.style.display = "block"; 

      fetchCatByBreed(breedSelect.value)
        .then(post => {
          catInfoDiv.innerHTML = '';

          const imgElement = document.createElement("img");
          imgElement.src = post.url;
          imgElement.alt = post.name;
          catInfoDiv.append(imgElement);

          const catTextContainer = document.createElement("div");

          const title = document.createElement("h2");
          title.textContent = post.breeds[0].name;
          catTextContainer.append(title);

          const descriptionParagraph = document.createElement("p");
          descriptionParagraph.textContent = post.breeds[0].description;
          catTextContainer.append(descriptionParagraph);

          const temperamentParagraph = document.createElement("p");
          temperamentParagraph.innerHTML = `<strong>Temperament:</strong> ${post.breeds[0].temperament}`;
          catTextContainer.append(temperamentParagraph);

          catInfoDiv.append(catTextContainer);

          loaderElement.style.display = "none"; 
        })
        .catch(err => {
          console.error(err);
          errorElement.style.display = "block";
          loaderElement.style.display = "none";
        });
    });

    fetchCatByBreed(breedSelect.value);
  })
  .catch(err => {
    console.error(err);
    errorElement.style.display = "block";
    loaderElement.style.display = "none";
    breedSelect.style.display = "none"; 
  });