<template>
  <div class="row">
    <div class="col-md-12">

      <h5 class="caption">Шаблоны</h5>

      <label>Договор</label>
      <div class="input-group">
        <input type="text" class="form-control" placeholder="Договор" v-model.trim="files.contract">
        <span class="input-group-btn">
          <button class="btn btn-info" type="button" @click="openDialogFile(appData, 0)"><span class="glyphicon glyphicon-file" aria-hidden="true"></span></button>
        </span>
      </div>

      <label>Спецификация</label>
      <div class="input-group">
        <input type="text" class="form-control" placeholder="Спецификация" v-model.trim="files.specification">
        <span class="input-group-btn">
          <button class="btn btn-info" type="button" @click="openDialogFile(appData, 1)"><span class="glyphicon glyphicon-file" aria-hidden="true"></span></button>
        </span>
      </div>

      <label>Талон на сборку мебели</label>
      <div class="input-group">
        <input type="text" class="form-control" placeholder="Талон на сборку мебели" v-model.trim="files.coupon">
        <span class="input-group-btn">
          <button class="btn btn-info" type="button" @click="openDialogFile(appData, 2)"><span class="glyphicon glyphicon-file" aria-hidden="true"></span></button>
        </span>
      </div>

      <label>Талон доставки</label>
      <div class="input-group">
        <input type="text" class="form-control" placeholder="Талон доставки" v-model.trim="files.deliveryCoupon">
        <span class="input-group-btn">
          <button class="btn btn-info" type="button" @click="openDialogFile(appData, 3)"><span class="glyphicon glyphicon-file" aria-hidden="true"></span></button>
        </span>
      </div>

      <h5 class="caption">Директория для сохранения документов</h5>

      <label>Директория для сохранения документов</label>
      <div class="input-group">
        <input type="text" class="form-control" placeholder="Директория для сохранения документов"
               v-model.trim="savePath">
        <span class="input-group-btn">
          <button class="btn btn-info" type="button" @click="openDialogDir"><span class="glyphicon glyphicon-folder-open" aria-hidden="true"></span></button>
        </span>
      </div>

      <br>

      <button type="submit" class="btn btn-success" @click="saveSettings">Сохранить параметры</button>
    </div>
  </div>
</template>

<script>
  import path from 'path'
  import fs from 'fs'

  const {dialog} = require('electron').remote

  export default {
    name: 'settings',
    data () {
      return {
        files: {
          contract: '',
          specification: '',
          coupon: '',
          deliveryCoupon: ''
        },
        savePath: '',
        appName: 'OSV',
        appData: ''
      }
    },
    methods: {
      saveSettings () {
        const config = path.resolve(this.appData, 'config.json')
        let json = {
          contract: this.files.contract,
          specification: this.files.specification,
          coupon: this.files.coupon
        }
        if (this.savePath.length === 0) {
          json.savePath = path.resolve(this.$electron.remote.app.getPath('documents'), this.appName)
        } else json.savePath = this.savePath

        let data = JSON.stringify(json)
        fs.writeFileSync(config, data)
      },
      openDialogFile (defaultPath, model) {
        dialog.showOpenDialog({
          defaultPath,
          filters: [
            {name: 'Документ Word (docx)', extensions: ['docx']},
            {name: 'Все файлы', extensions: ['*']}
          ],
          properties: ['openFile']
        }, filePaths => {
          if (!filePaths) return
          switch (model) {
            case 0:
              this.files.contract = filePaths[0]
              break
            case 1:
              this.files.specification = filePaths[0]
              break
            case 2:
              this.files.coupon = filePaths[0]
              break
            case 3:
              this.files.deliveryCoupon = filePaths[0]
              break
          }
        })
      },
      openDialogDir () {
        const documents = path.resolve(this.$electron.remote.app.getPath('documents'), this.appName)
        dialog.showOpenDialog({
          defaultPath: documents,
          properties: ['openDirectory']
        }, filePaths => {
          if (!filePaths) return
          this.savePath = filePaths[0]
        })
      }
    },
    mounted: function () {
      const appData = this.$electron.remote.app.getPath('appData')
      this.appData = path.resolve(appData, this.appName)
      const documents = path.resolve(this.$electron.remote.app.getPath('documents'), this.appName)

      // Проверяем есть ли файл конфигурации, если нет, то создаем
      const config = path.resolve(this.appData, 'config.json')

      if (fs.existsSync(config)) {
        let json = fs.readFileSync(config)
        let cfg = JSON.parse(json)
        this.files.contract = cfg.contract || ''
        this.files.specification = cfg.specification || ''
        this.files.coupon = cfg.coupon || ''
        this.files.deliveryCoupon = cfg.deliveryCoupon || ''
        this.savePath = cfg.savePath || documents
      }
    }
  }
</script>
