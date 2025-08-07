document.getElementById("searchForm").addEventListener("submit", async function (event) {
  event.preventDefault();

  const cuisine = document.getElementById("cuisine").value;
  const ambiance = document.getElementById("ambiance").value;
  const dietary = document.getElementById("dietary").value;
  const isOpen = document.getElementById("isOpen").value;

  const params = new URLSearchParams();

  if (cuisine) params.append("cuisine", cuisine);
  if (ambiance) params.append("ambiance", ambiance);
  if (dietary) params.append("dietary_options", dietary);
  if (isOpen !== "") params.append("is_open", isOpen);

  const url = `http://localhost:8000/api?${params.toString()}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = "";

    if (data.length === 0) {
      resultsDiv.innerHTML = "<p class='text-red-500'>No destinations found.</p>";
      return;
    }

    data.forEach(item => {
      const card = document.createElement("div");
      card.className = "bg-pink-100 p-4 rounded border";

      const tags = item.tags && item.tags.length > 0 ? 
        item.tags.join(', ') : 
        'No tags';

      card.innerHTML = `
        <h2 class="text-xl font-semibold text-green-700">${item.name}</h2>
        <p><strong>Cuisine:</strong> ${item.cuisine}</p>
        <p><strong>Ambiance:</strong> ${item.ambiance || 'Not specified'}</p>
        <p><strong>Open:</strong> ${item.is_open ? "Yes" : "No"}</p>
        <p><strong>Rating:</strong> ${item.rating}⭐ (${item.number_of_reviews} reviews)</p>
        <p><strong>Dietary Options:</strong> ${item.dietary_options && item.dietary_options.length > 0 ? item.dietary_options.join(', ') : 'None'}</p>
        <p><strong>Tags:</strong> <span class="text-sm italic">${tags}</span></p>
      `;

      resultsDiv.appendChild(card);
    });

  } catch (error) {
    console.error("Error fetching data:", error);
    document.getElementById("results").innerHTML = "<p class='text-red-500'>Something went wrong!</p>";
  }
});
