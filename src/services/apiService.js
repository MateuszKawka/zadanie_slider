const GET_IMAGES_URL = `https://zadanie.madebykawka.pl/wp-json/wp/v2/posts/`;

export const fetchImages = async () => {
  try {
    const response = await fetch(GET_IMAGES_URL);
    const data = await response.json();
    return data;
  } catch (e) {
    console.error(e);
  }
};
