const readline = require('readline');


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// pedir al usuario el id 
rl.question('Escribe el id del usuario: ', (sign) => {
  
  fetch(`https://jsonplaceholder.typicode.com/users/${sign}`)
    .then((response) => response.json())
    .then((user) => {
      if (user.id) {
        
        const vect = [user];
        console.log(vect); 

       
        const fullnames = vect.map((user) => user.name + " (" + user.username + ")");
        console.log("Nombres completos y usernames:", fullnames);
      } else {
        console.log('Usuario no encontrado');
      }
      fetch(`https://jsonplaceholder.typicode.com/posts?userId=${sign}`)
      .then((response) => response.json())
      .then((posts) => {
        console.log('Posts del usuario:', posts);
        // 1. Función map: Crear un array de los títulos de los posts
        const postTitles = posts.map((post) => post.title);
        console.log('Títulos de los posts:', postTitles);
          // 2. Función filter: Filtrar posts cuyo título tenga más de 30 caracteres
          const longPosts = posts.filter((post) => post.title.length > 30);
          console.log('Posts con títulos largos:', longPosts);

          // 3. Función reduce: Contar la cantidad total de caracteres en los títulos de los posts
          const totalTitleLength = posts.reduce((acc, post) => acc + post.title.length, 0);
          console.log('Total de caracteres en los títulos:', totalTitleLength);
    })
    
    });
});

