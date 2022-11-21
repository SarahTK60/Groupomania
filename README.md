<a name="readme-top"></a>




<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/SarahTK60/Groupomania">
    <img src="images/logoGroupomania.png" alt="Logo" width="600" height="150">
  </a>

  <h3 align="center">Groupomania</h3>

</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Sommaire</summary>
  <ol>
    <li>
      <a href="#about-the-project">Présentation</a>
      <ul>
        <li><a href="#specifications">Cahier des charges</a></li>
        <li><a href="#built-with">Technologies utilisées</a></li>
      </ul>
    </li>
    <li>
      <a href="#installation">Installation</a>
    </li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->
## Présentation

Scénario : Pour améliorer la communication entre collègues, Groupomania souhaite la mise en place d'un réseau social interne pour permettre aux employés de se connaître dans un cadre plus informel.


<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Cahier des charges

<ul>
  <li>Page de connexion
    <ul>
      <li>Possibilité de créer un compte</li>
      <li>Possibilité de se connecter avec email et mot de passe</li>
    </ul>
  </li>
  <li>Page d'accueil
    <ul>
      <li>Publications de tous les utilisateurs listées de façon antéchronologique</li>
      <li>Possibilité pour l'utilisateur de créer une publication, de la modifier et de la supprimer</li>
      <li>Une publication doit pouvoir contenir du texte et une image</li>
      <li>Un utilisateur doit pouvoir "liker" une publication une seule fois</li>
    </ul>
  </li>
  <li>Compte administrateur
    <ul>
      <li>Un utilisateur "administrateur" doit pouvoir modifier et supprimer les publications de tous les utilisateurs dans un but de modération</li>
    </ul>
  </li>
  <li>UI
    <ul>
      <li>Le site doit être responsive</li>
      <li>Police d'écriture Lato</li>
      <li>S'inspirer de la palette de l'entreprise
        <ul>
          <li>#FD2D01</li>
          <li>#FFD7D7</li>
          <li>#4E5166</li>
        </ul>
      </li>
      </ul>
  </li>
  <li>Normes
    <ul>
      <li>Respect du WCAG</li>
      <li>Sécurisation des données de connexions</li>
    </ul>
  </li>
</ul>


### Technologies utilisées

* [![MongoDB][MongoDB.com]][Mongodb-url]
* [![NodeJS][Nodejs.org]][Node-url]
* [![ExpressJS][ExpressJS.com]][Express-url]
* [![React][React.js]][React-url]
* [![Bootstrap][Bootstrap.com]][Bootstrap-url]


<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Installation



1. Cloner le repo
   ```sh
   git clone https://github.com/SarahTK60/Groupomania
   ```

2. Préparer l'environnement et la base de données

    Créer un cluster sur MongoAtlas.

    Un échantillon de données vous a été fourni (Un fichier de données au format json importable sur mongoAtlas et des fichiers images dans le backend).

    Des fichiers .env à compléter avec vos variables d'environnement sont fournis.

4. Se placer dans le dossier backend à partir d'un terminal
   ```sh
   cd backend
   ```
5. Installer NPM et les modules Node du Backend
   ```sh
   npm install
   ```
6. Démarrer le serveur
   ```sh
   npm start
   ```
   ou
   ```sh
   nodemon server
   ```

7. Se placer dans le dossier frontend à partir d'un terminal
   ```sh
   cd backend
   ```
8. Installer les modules Node du Frontend
   ```sh
   npm install
   ```
9. Démarrer l'application
   ```sh
   npm start
   ```
   ou
   ```sh
   nodemon server
   ```
<p align="right">(<a href="#readme-top">back to top</a>)</p>




<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[product-screenshot]: images/capture.png
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
[MongoDB.com]: https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white
[Mongodb-url]: https//mongodb.com
[ExpressJS.com]: https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white
[Express-url]: https://express.js
[Nodejs.org]: https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white
[Node-url]: https://nodejs.org
