<template>
  <div class="row">
    <div class="col-md-12">
      <h5 class="caption">Основные сведенья</h5>

      <form>
        <div class="form-group">
          <label>Фамилия</label>
          <input type="text" class="form-control" placeholder="Фамилия"
                 v-model.trim="client.firstName">
        </div>

        <div class="form-group">
          <label>Имя</label>
          <input type="text" class="form-control" placeholder="Имя" v-model.trim="client.lastName">
        </div>

        <div class="form-group">
          <label>Отчество</label>
          <input type="text" class="form-control" placeholder="Отчество"
                 v-model.trim="client.patronymic">
        </div>

        <div class="form-group">
          <label>Дата рождения</label>
          <input type="text" class="form-control" placeholder="Дата рождения"
                 v-model.trim="client.birthday">
        </div>
      </form>

      <h5 class="caption">Паспорт</h5>

      <form class="form-inline">

        <div class="form-group">
          <input type="text" class="form-control col-md-4" placeholder="Серия"
                 v-model.trim="client.doc.series" minlength="4" maxlength="4">
        </div>

        <div class="form-group">
          <input type="text" class="form-control col-md-4" placeholder="Номер"
                 v-model.trim="client.doc.number" minlength="6" maxlength="6">
        </div>

        <div class="form-group">
          <input type="text" class="form-control col-md-4" placeholder="Выдан"
                 v-model.trim="client.doc.date">
        </div>

      </form>

      <br>

      <div class="form-group">
        <label>Адрес регистрации</label>
        <input type="text" class="form-control" placeholder="Адрес регистрации" v-model.trim="client.doc.address">
      </div>

      <h5 class="caption">Прочие сведенья</h5>

      <div class="form-group">
        <label>Адрес проживания</label>
        <input type="text" class="form-control" placeholder="Адрес проживания" v-model.trim="client.address">
      </div>

      <div class="form-group">
        <label>Место работы</label>
        <input type="text" class="form-control" placeholder="Место работы" v-model.trim="client.placeWork">
      </div>

      <div class="form-group">
        <label>Сотовый телефон</label>
        <input type="tel" class="form-control" placeholder="Сотовый телефон" v-model.trim="client.phone.cell">
      </div>

      <div class="form-group">
        <label>Домашний телефон</label>
        <input type="tel" class="form-control" placeholder="Домашний телефон" v-model.trim="client.phone.home">
      </div>

      <div class="form-group">
        <label>Рабочий телефон</label>
        <input type="tel" class="form-control" placeholder="Рабочий телефон" v-model.trim="client.phone.work">
      </div>

      <h5 class="caption">Время и условия доставки</h5>

      <div class="form-group">
        <input type="text" class="form-control" placeholder="Время и условия доставки"
               v-model.trim="client.termsOfDelivery">
      </div>

      <h5 class="caption">Приобретаемый товар</h5>

      <table class="table table-striped table-hover table-condensed">
        <thead>
        <tr>
          <th width="45">#</th>
          <th>Наименование товара</th>
          <th width="100">Цвет</th>
          <th width="100">Цена (руб.)</th>
          <th width="100">Кол-во</th>
          <th width="75">Скидка</th>
          <th width="50"></th>
        </tr>
        </thead>
        <tbody>

        <tr v-for="(item, index) in client.products" :key="item.id">

          <td>{{index + 1}}</td>
          <td><input type="text" class="form-control" placeholder="Наименование товара" v-model.trim="item.name"></td>
          <td><input type="text" class="form-control" placeholder="Цвет" v-model.trim="item.color"></td>
          <td><input type="text" class="form-control text-right" placeholder="руб." v-model.number="item.price"></td>
          <td><input type="number" min="0" class="form-control text-right" placeholder="шт."
                     v-model.number="item.count"></td>
          <td><input type="number" min="0" max="100" class="form-control text-right" placeholder="%"
                     v-model.number="item.discount"></td>
          <td class="text-right">
            <button type="submit" class="btn btn-warning" title="Удалить" @click="deleteProduct(index)">X</button>
          </td>
        </tr>

        <tr class="info">
          <td colspan="2">
            <button type="submit" class="btn btn-success btn-sm" title="Добавить" @click="addProduct"><span
              class="glyphicon glyphicon-plus" aria-hidden="true"></span></button>
          </td>
          <td class="text-right"><b>Итого:</b></td>
          <td class="text-center"><b>{{clientPrice}} руб.</b></td>
          <td><b style="padding-left: 25px;">{{clientCount}} шт.</b></td>
          <td colspan="2"><b style="padding-left: 25px;">{{client.discount.toFixed(2)}} руб.</b></td>
        </tr>
        </tbody>
      </table>

      <div class="checkbox">
        <label><input type="checkbox" v-model="client.need.contract">Договор </label>
      </div>

      <div class="checkbox">
        <label> <input type="checkbox" v-model="client.need.specification">Спецификация</label>
      </div>

      <div class="checkbox">
        <label> <input type="checkbox" v-model="client.need.coupon">Талон на сборку мебели</label>
      </div>

      <div class="checkbox">
        <label> <input type="checkbox" v-model="client.need.deliveryCoupon">Талон доставки</label>
      </div>

      <button type="submit" class="btn btn-default" @click="generateDocs">Сформировать документы</button>
    </div>

    <modal name="runner-tasks" :width="350" height="auto">
      <h5 class="modal-caption"><b>Генерация документов</b></h5>

      <div class="row">
        <div class="col-md-10 col-md-offset-1 col-xs-10 col-xs-offset-1" style="margin-bottom: 20px;">
          <button v-if="client.need.contract" class="btn btn-default btn-block btn-xs"
                  v-bind:disabled="!client.done.contract"
                  @click="openFile(dst.contract)"
                  title="Открыть документ">
            <span v-show="!client.done.contract" class="loading"></span>
            <span v-show="client.done.contract" class="glyphicon glyphicon-ok" aria-hidden="true"></span> Договор
          </button>

          <button v-if="client.need.specification" class="btn btn-default btn-block btn-xs"
                  v-bind:disabled="!client.done.specification"
                  @click="openFile(dst.specification)" title="Открыть документ">
            <span v-show="!client.done.specification" class="loading"></span>
            <span v-show="client.done.specification" class="glyphicon glyphicon-ok" aria-hidden="true"></span>
            Спецификация
          </button>

          <button v-if="client.need.coupon" class="btn btn-default btn-block btn-xs"
                  v-bind:disabled="!client.done.coupon"
                  @click="openFile(dst.coupon)"
                  title="Открыть документ">
            <span v-show="!client.done.coupon" class="loading"></span>
            <span v-show="client.done.coupon" class="glyphicon glyphicon-ok" aria-hidden="true"></span>
            Талон на сборку мебели
          </button>

          <button v-if="client.need.deliveryCoupon" class="btn btn-default btn-block btn-xs"
                  v-bind:disabled="!client.done.deliveryCoupon"
                  @click="openFile(dst.deliveryCoupon)" title="Открыть документ">
            <span v-show="!client.done.deliveryCoupon" class="loading"></span>
            <span v-show="client.done.deliveryCoupon" class="glyphicon glyphicon-ok" aria-hidden="true"></span>
            Талон доставки
          </button>
        </div>
      </div>

    </modal>
  </div>
</template>

<script>
  import docxRender from '../libs/docxRender'
  import path from 'path'
  import fs from 'fs'
  import {rubles} from 'rubles'
  import {shell} from 'electron'

  export default {
    name: 'client',
    data () {
      return {
        savePath: '',
        appName: 'OSV',
        client: {
          firstName: '',
          lastName: '',
          patronymic: '',
          birthday: '',
          address: '',
          placeWork: '',
          termsOfDelivery: '',
          products: [],
          price: 0.0,
          discount: 0.0,
          count: 0,
          doc: {series: '', number: '', date: '', address: ''},
          phone: {home: '', work: '', cell: ''},
          need: {contract: true, specification: true, coupon: true, deliveryCoupon: true},
          done: {contract: false, specification: false, coupon: false, deliveryCoupon: false}
        },
        files: {contract: '', specification: '', coupon: '', deliveryCoupon: ''},
        dst: {contract: '', specification: '', coupon: '', deliveryCoupon: ''}
      }
    },
    methods: {
      openFile (fileName) {
        shell.openItem(fileName)
      },
      addProduct () {
        this.client.products.push({name: '', color: '', price: 0, count: 0, discount: 0})
      },
      deleteProduct (index) {
        this.client.products.splice(index, 1)
      },
      generateDocs () {
        const appData = this.$electron.remote.app.getPath('appData')
        const documents = path.resolve(this.$electron.remote.app.getPath('documents'), this.appName)
        const config = path.resolve(appData, this.appName, 'config.json')

        this.client.done.specification = this.client.done.contract = this.client.done.coupon = this.client.done.deliveryCoupon = false

        this.$modal.show('runner-tasks')

        let data = {
          address: this.client.address,
          fullName: `${this.client.firstName} ${this.client.lastName} ${this.client.patronymic}`,
          shortName: `${this.client.firstName} ${this.client.lastName[0]}.${this.client.patronymic[0]}.`,
          termsOfDelivery: this.client.termsOfDelivery,
          birthday: this.client.birthday,
          products: this.client.products,
          phone: this.client.phone,
          totalPrice: this.client.price,
          textPrice: rubles(this.client.price),
          doc: this.client.doc,
          placeWork: this.client.placeWork
        }

        data.products.forEach((item, index) => {
          item.index = index + 1
        })

        if (fs.existsSync(config)) {
          let json = fs.readFileSync(config)
          let cfg = JSON.parse(json)
          this.files.contract = cfg.contract || ''
          this.files.specification = cfg.specification || ''
          this.files.coupon = cfg.coupon || ''
          this.files.deliveryCoupon = cfg.deliveryCoupon || ''
          this.savePath = cfg.savePath || documents
        }

        if (this.client.need.contract) {
          // setTimeout(() => {
          //   this.client.done.contract = true
          // }, 1500)
          const src = this.files.contract
          const dst = path.resolve(this.savePath, `${data.doc.series}_${data.doc.number}_contract.docx`)
          this.dst.contract = dst
          try {
            docxRender(src, dst, data)
            this.client.done.contract = true
          } catch (e) {
            console.log(e.message)
          }
        }

        if (this.client.need.specification) {
          const src = this.files.specification
          const dst = path.resolve(this.savePath, `${data.doc.series}_${data.doc.number}_spec.docx`)
          this.dst.specification = dst
          try {
            docxRender(src, dst, data)
            this.client.done.specification = true
          } catch (e) {
            console.log(e.message)
          }
        }

        if (this.client.need.coupon) {
          const src = this.files.coupon
          const dst = path.resolve(this.savePath, `${data.doc.series}_${data.doc.number}_coupon.docx`)
          this.dst.coupon = dst
          try {
            docxRender(src, dst, data)
            this.client.done.coupon = true
          } catch (e) {
            console.log(e.message)
          }
        }

        if (this.client.need.deliveryCoupon) {
          const src = this.files.deliveryCoupon
          const dst = path.resolve(this.savePath, `${data.doc.series}_${data.doc.number}_сoupon_2.docx`)
          this.dst.deliveryCoupon = dst
          try {
            docxRender(src, dst, data)
            this.client.done.deliveryCoupon = true
          } catch (e) {
            console.log(e.message)
          }
        }
      }
    },
    computed: {
      clientCount () {
        this.client.count = 0
        this.client.products.forEach(item => {
          this.client.count += item.count
        })
        return this.client.count
      },
      clientPrice () {
        this.client.price = this.client.discount = 0.0
        this.client.products.forEach(item => {
          let price = item.price * item.count
          let discount = (price * item.discount / 100)
          this.client.price += price - discount
          this.client.discount += discount
        })
        return this.client.price.toFixed(2)
      }
    }
  }
</script>

<style>
  .v--modal-overlay {
    background: rgba(0, 0, 0, 0.5);
  }
  h5.caption {
    color: #428bca;
    font-family: 'Times New Roman', Times, serif;
    font-size: 2em;
    font-weight: normal;
    line-height: 120%;
    border-bottom: 1px solid #ccc;
    padding: 0 0 0.1em 0;
    margin: 0 0 15px;
  }

  h5.modal-caption{
    border-bottom: 1px solid rgb(204, 204, 204);
    color: white;
    margin-top: 0;
    padding: 7px;
    background-color: #164f69;
  }
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  .loading {
    border-radius: 50%;
    width: 16px;
    height: 16px;
    float: left;
    margin-right: 5px;
    border: .25rem solid rgba(13, 52, 255, 0.2);
    border-top-color: rgb(34, 37, 255);
    animation: spin 1s infinite linear;
  }
</style>
