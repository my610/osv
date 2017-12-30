<template>
  <nav class="aside">
    <ul>
      <router-link active-class="active" tag="li" to="/">
        <a title="Новый документ"><span class="glyphicon glyphicon-book" aria-hidden="true"></span></a>
      </router-link>
      <router-link active-class="active" tag="li" to="/settings">
        <a title="Настройки"><span class="glyphicon glyphicon-cog" aria-hidden="true"></span></a>
      </router-link>
    </ul>
  </nav>
</template>

<script>
  export default {
    methods: {}
  }
</script>

<style>
  nav.aside {
    /*  ширна произвольная, не стесняйтесь экспериментировать */
    width: 64px;
    min-width: 64px;
    /* фиксируем и выставляем высоту панели на максимум */
    height: 100%;
    position: fixed;
    top: 0;
    bottom: 0;
    margin: 0;
    /* сдвигаем (прячем) панель относительно левого края страницы */
    left: 0;
    /* внутренние отступы */
    padding: 5px;
    /* плавный переход смещения панели */
    -webkit-transition: left 0.3s;
    -moz-transition: left 0.3s;
    transition: left 0.3s;
    /* определяем цвет фона панели */
    background: #164f69;
    /* поверх других элементов */
    z-index: 2000;
    /* Тень */
    box-shadow: 4px 0px 20px 0px rgba(0, 0, 0, 0.5);
    -moz-box-shadow: 4px 0px 20px 0px rgba(0, 0, 0, 0.5);
    -webkit-box-shadow: 4px 0px 20px 0px rgba(0, 0, 0, 0.5);
    overflow-y: auto;
  }

  /**
   * профиксим баг в Android <= 4.1.2
   * см: http://timpietrusky.com/advanced-checkbox-hack
   */

  body {
    -webkit-animation: bugfix infinite 1s;
  }

  @-webkit-keyframes bugfix {
    to {
      padding: 0;
    }
  }

  /**
   * позаботьтимся о средних и маленьких экранах
   * мобильных устройств
   */

  @media screen and (min-width: 320px) {
    html,
    body {
      margin: 0;
      overflow-x: hidden;
    }
  }

  @media screen and (max-width: 320px) {
    html,
    body {
      margin: 0;
      overflow-x: hidden;
    }

    .nav {
      width: 100%;
      box-shadow: none
    }
  }

  /**
   * формируем непосредственно само меню
   * используем неупорядоченный список для пунктов меню
   * прикрутим трансфомации и плавные переходы
   */

  .aside > ul {
    display: block;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .aside > ul > li {
    line-height: 2.5;
    text-align: center;
  }

  /**
   * оформление ссылок пунктов меню
   */
  li.active > a {
    color: #149bdf;
  }

  .aside > ul > li:last-child > a {
    /*position: absolute;*/
    /*bottom: 10px;*/
    /*left: 0px;*/

  }

  .aside > ul > li > a {
    display: inline-block;
    position: relative;
    /*padding: 0;*/
    font-family: 'Open Sans', sans-serif;
    font-weight: 300;
    font-size: 1.0em;
    color: #dadada;
    width: 100%;
    text-decoration: none;
    /* плавный переход */
    -webkit-transition: color .5s ease, transform .5s ease;
    -moz-transition: color .5s ease, transform .5s ease;
    transition: color .5s ease, transform .5s ease;
  }

  /**
   * состояние ссылок меню при наведении
   */

  .aside > ul > li > a:hover,
  .aside > ul > li > a:focus {
    color: white;
    /*padding-left: 5px;*/
    background-color: #0a6aa1;
    -webkit-transform: scale(1.0);
    -moz-transform: scale(1.0);
    -o-transform: scale(1.0);
  }

  /**
   * линия подчеркивания ссылок меню
   */

  .aside > ul > li > a:before {
    content: '';
    display: block;
    position: absolute;
    right: 0;
    bottom: 0;
    height: 1px;
    width: 100%;
    -webkit-transition: width 0s ease;
    transition: width 0s ease;
  }

  .aside > ul > li > a:after {
    content: '';
    display: block;
    position: absolute;
    left: 0;
    bottom: 0;
    height: 1px;
    width: 100%;
    background: #0a6aa1;
    -webkit-transition: width .5s ease;
    transition: width .5s ease;
  }

  /**
   * анимируем линию подчеркивания
   * ссылок при наведении
   */

  .aside > ul > li > a:hover:before {
    width: 0%;
    background: #1176a1;
    -webkit-transition: width .5s ease;
    transition: width .5s ease;
  }

  .aside > ul > li > a:hover:after {
    width: 0%;
    background: transparent;
    -webkit-transition: width 0s ease;
    transition: width 0s ease;
  }
</style>
