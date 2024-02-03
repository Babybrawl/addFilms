function addMovie() {
    const title = document.getElementById('title').value;
    const image = document.getElementById('image').value;
    const link = document.getElementById('link').value;
    const tag = document.getElementById('tag').value;
    const description = document.getElementById('description').value;
  
    const movieData = {
      title: title,
      image: image,
      link: link,
      tag: tag,
      description: description,
    };
  
    // Envoyer les données au serveur
    fetch('/addMovie', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(movieData),
    })
    .then(response => response.json())
    .then(data => {
      alert(data.message);
    })
    .catch(error => {
      console.error('Erreur:', error);
      alert('Une erreur s\'est produite lors de l\'ajout du film.');
    });
  }
  