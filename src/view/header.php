<div class="global-nav">
  <div class="left-menu">
    <a href="" class="logo"><img src="images/logo_192px.svg" alt="SOCILAMEDIA"></a>
    <div class="container-header">
      <input type="text" maxlength="12" placeholder="Rechercher" class="searchbar" />
      <img src="images/search_24px.svg" alt="search icon" class="button" style="opacity:0.3 ;" />
    </div>
  </div>
  <nav class="main-menu">
    <ul>
      <li><a href="#"><div><img class="icone-nav" src="images/icone-home.svg" alt="icone-nav home"></div><span>Accueil</span></a></li>
      <li><a href="/pro-main/evenements.php"><div><img class="icone-nav"  src="images/icone-evenements.svg" alt="icone-nav evenements"></div><span>Evenements</span></a></li>
      <li><a href="#"><div><img class="icone-nav" src="images/icone-messagerie.svg" alt="icone-nav home"></div><span>Messagerie</span></a></li>
      <li><a href="#"><div><img class="icone-nav" src="images/icone-metiers.svg" alt="icone-nav metier"></div><span>Metiers</span></a></li>
      <li><a href="#"><div><img class="icone-nav" src="images/icone-notification.svg" alt="icone-nav notification"></div><span>Notification</span></a></li>
      <li><a href="profile.php"><div><img class="icone-nav" src="images/user-photo.svg" alt="icone-nav profil"></div><img src="images/chevron-down.svg" width="10px" style="margin-top: 3px;"></a></li>
    </ul>
  </nav>
</div>

<style>
/***************/
/* SECTION CSS */
/***************/

/* HEADER */

header .global-nav{
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px;
}

.left-menu{
  display: flex;
  align-items: center;
}

.main-menu ul{
  display: flex;
}

.main-menu ul li{
  margin: 0px 5px;
}

.main-menu ul li a{
  text-decoration:none;
  color:black;
  align-items: center;
  display: flex;
  flex-direction: column;
  padding: 5px 25px;
  border-radius: 5px;
  transition: background-color 0.3s ;
}
.main-menu .icone-nav{
    width: 25px;
}

.main-menu ul li a:hover{
  background-color:#373a8918 ;
}

.main-menu  span{
  font-size: 14px;
}

.container-header {
  width: 10rem;
  height: 2.5rem;
  margin: 0 0.8rem;
  position: relative;
}

.searchbar {
  font-size: 1rem;
  width: 6rem;
  height: 0.1rem;
  border: none;
  outline: none;
  border-radius: 0.5rem;
  padding: 1.2rem 2rem;
  transition: all 0.2s;
  background-color: rgba(5, 6, 40, 0.08);
}
.searchbar:focus {
  width: 11rem;
}

.button {
  height: 2rem;
  position: absolute;
  top: 0.28rem;
  right: 0.1rem;
  transition: all 0.2s;
}
.button:hover {
  cursor: pointer;
}
.searchbar:focus + .button {
  height: 2.2rem;
  top: 0.2rem;
  right: -5rem;
}

.searchbar::placeholder {
  font-size: 1rem;
  opacity: 0.3;
}

.poster{
  width: 512px;
}
</style>